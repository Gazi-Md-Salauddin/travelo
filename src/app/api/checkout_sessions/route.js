import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import { PRICE_ID } from '@/lib/stripe'

import { getUserSession } from '@/lib/core/session'

export async function POST(req) {
  try {
    const { bookingId } = await req.json();
    const headersList = await headers()
    const origin = headersList.get('origin')

    const priceId = PRICE_ID
    
    const user = await getUserSession()
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1TkzJfLEcXvmPU1EFrtafhGq',
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
    bookingId,
  },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
    });
    return NextResponse.json({url: session.url,})
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}