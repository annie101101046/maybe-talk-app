import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import Stripe from 'stripe'

// Force Node.js runtime so we can use the raw body needed for webhook signature verification
export const runtime = 'nodejs'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-01-28.clover' })
}

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET!
}

export async function POST(request: NextRequest) {
  let event: Stripe.Event

  try {
    // Retrieve raw body for signature verification
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('[Webhook] Missing stripe-signature header')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify the webhook signature
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret())
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Webhook] Signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    )
  }

  // Handle relevant Stripe events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.user_id
    const userEmail = session.metadata?.user_email ?? session.customer_email

    if (!userId) {
      console.error('[Webhook] Missing user_id in session metadata', session.id)
      // Return 200 so Stripe doesn't retry — we log the anomaly but cannot process it
      return NextResponse.json({ received: true })
    }

    try {
      // Create Supabase admin client with service role key (bypasses RLS)
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          cookies: {
            getAll() {
              return []
            },
            setAll() {
              // No cookies needed for admin client
            },
          },
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )

      // 1. Update user profile: mark as paid and grant 4 session credits
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          {
            id: userId,
            is_paid: true,
            credits: 4,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )

      if (profileError) {
        console.error('[Webhook] Failed to update profile:', profileError)
        // Return 500 so Stripe retries the webhook
        return NextResponse.json(
          { error: 'Failed to update user profile' },
          { status: 500 }
        )
      }

      // 2. Create a payment record for audit / history
      const { error: paymentError } = await supabase.from('payments').insert({
        user_id: userId,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string | null,
        amount_cents: session.amount_total ?? 25000,
        currency: session.currency ?? 'usd',
        status: 'completed',
        email: userEmail,
        created_at: new Date().toISOString(),
      })

      if (paymentError) {
        console.error('[Webhook] Failed to create payment record:', paymentError)
        // Profile was already updated — log and move on; don't block Stripe retry
      }

      console.log(
        `[Webhook] Payment completed for user ${userId} (session ${session.id})`
      )
    } catch (err) {
      console.error('[Webhook] Unexpected error processing payment:', err)
      return NextResponse.json(
        { error: 'Internal server error processing payment' },
        { status: 500 }
      )
    }
  } else {
    // Log unhandled event types for observability
    console.log(`[Webhook] Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
