import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PRICE_ID = {
  'green_line': 'price_1TkzJfLEcXvmPU1EFrtafhGq'
}