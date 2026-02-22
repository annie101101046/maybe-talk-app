import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, { apiVersion: '2026-01-28.clover' })
}

export { getStripe }

const PRODUCT_NAME = '孕期陪伴方案 Pregnancy Support Package'
const AMOUNT_USD_CENTS = 25000 // $250.00 USD

/**
 * Creates a Stripe Checkout session for the $250 pregnancy support package.
 *
 * If STRIPE_PRICE_ID is set in env, it will be used directly.
 * Otherwise, falls back to an inline price definition for the $250 package.
 */
export async function createCheckoutSession(
  userId: string,
  email: string
): Promise<Stripe.Checkout.Session> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    process.env.STRIPE_PRICE_ID
      ? [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ]
      : [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: PRODUCT_NAME,
              },
              unit_amount: AMOUNT_USD_CENTS,
            },
            quantity: 1,
          },
        ]

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: lineItems,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    metadata: {
      userId,
    },
    payment_intent_data: {
      metadata: {
        userId,
      },
    },
  })

  return session
}
