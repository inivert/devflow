import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
})

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export async function GET(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    
    try {
      await limiter.check(5, ip) // 5 requests per minute per IP
    } catch {
      return NextResponse.json(
        { verified: false, error: 'Too many requests' },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { verified: false, error: 'No session ID provided' },
        { status: 400 }
      )
    }

    // Validate session ID format to prevent injection attacks
    if (!sessionId.match(/^cs_(test|live)_[a-zA-Z0-9]+$/)) {
      return NextResponse.json(
        { verified: false, error: 'Invalid session ID format' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    // Additional security checks
    if (session.status !== 'complete') {
      return NextResponse.json(
        { verified: false, error: 'Session is not complete' },
        { status: 400 }
      )
    }

    const verified = session.payment_status === 'paid' || session.payment_status === 'no_payment_required'

    if (!verified) {
      return NextResponse.json(
        { verified: false, error: 'Payment not verified' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      verified,
      session: {
        customer_email: session.customer_email,
      }
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { 
        verified: false, 
        error: 'Invalid session'
      }, 
      { status: 400 }
    )
  }
}
