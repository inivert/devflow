import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
  try {
    const { email, password, verificationData } = await request.json()

    // Verify the payment data
    if (!verificationData?.verified || !verificationData?.session) {
      return NextResponse.json(
        { error: 'Invalid payment verification' },
        { status: 400 }
      )
    }

    // Allow test sessions in development
    if (process.env.NODE_ENV === 'development' && verificationData.session.id.startsWith('test_session_')) {
      // TODO: Create user in your database
      // const user = await createUser({ 
      //   email, 
      //   password, 
      //   stripeCustomerId: verificationData.session.customer 
      // })
      return NextResponse.json({ success: true })
    }

    // Double check the payment session for production
    const session = await stripe.checkout.sessions.retrieve(verificationData.session.id)
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      return NextResponse.json(
        { error: 'Payment not verified' },
        { status: 400 }
      )
    }

    // TODO: Create user in your database
    // const user = await createUser({ 
    //   email, 
    //   password, 
    //   stripeCustomerId: session.customer 
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
