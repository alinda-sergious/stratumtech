import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, itemName, price, customerName, customerEmail, ...rest } = body
  if (!itemName || !price || !customerEmail) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Calculate 50% deposit (assume price is in USD, as a number or string)
  const priceNumber = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price
  const deposit = Math.round(priceNumber * 0.5 * 100) // Stripe expects cents

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${type === 'car' ? 'Car Rental' : 'Tour Booking'}: ${itemName}`,
              description: `Deposit for ${type === 'car' ? 'car rental' : 'tour'} - 50% upfront`,
            },
            unit_amount: deposit,
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        customerName,
        itemName,
        type,
        ...rest,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-cancelled`,
    })
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 })
  }
} 