import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' })
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()

    // Create authenticated Supabase client to verify the user
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options)
              })
            } catch {
              // Safe to ignore in Server Components
            }
          },
        },
      }
    )

    // Verify the user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: '未授權。請先登入。| Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const { origin } = new URL(request.url)

    // Create Stripe Checkout session — $250 USD
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 25000, // $250.00 in cents
            product_data: {
              name: '也許妳想找人聊一聊 — 對談套餐',
              description:
                'Maybe She\'d Like to Talk — 4 sessions with a professional counselor',
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
        user_email: user.email ?? '',
      },
      success_url: `${origin}/dashboard?payment=success`,
      cancel_url: `${origin}/dashboard?payment=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[Checkout] Error creating Stripe session:', error)

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode ?? 500 }
      )
    }

    return NextResponse.json(
      { error: '內部伺服器錯誤。| Internal server error.' },
      { status: 500 }
    )
  }
}
