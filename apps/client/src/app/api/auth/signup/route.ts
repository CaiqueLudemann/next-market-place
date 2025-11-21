/**
 * Signup API route
 */

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createUser } from '@/lib/data/users'
import { createVerificationToken } from '@/lib/data/verificationTokens'
import { validateSignupForm } from '@/lib/auth/validation'
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/auth/rateLimit'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check rate limit
    const identifier = getClientIdentifier(request)
    const rateLimit = checkRateLimit(identifier, RATE_LIMITS.signup)

    if (!rateLimit.success) {
      const resetInMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 60000)
      return NextResponse.json(
        {
          errors: [
            {
              field: 'general',
              message: `Too many signup attempts. Please try again in ${resetInMinutes} minutes.`,
            },
          ],
        },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate input
    const validation = validateSignupForm(body)

    if (!validation.isValid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 })
    }

    // Create user
    try {
      const user = await createUser({
        email: body.email,
        password: body.password,
        name: body.name,
        username: body.username,
        phone: body.phone,
        country: body.country,
      })

      // Generate verification token
      const { token } = await createVerificationToken(user.id)

      // In production, send email with verification link
      // For now, log to console
      const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${token}`

      console.log('='.repeat(80))
      console.log('EMAIL VERIFICATION LINK (Development Only):')
      console.log(verificationUrl)
      console.log('='.repeat(80))

      // Return success (don't expose user details)
      return NextResponse.json(
        {
          message: 'User created successfully. Please check your email to verify your account.',
          userId: user.id,
        },
        { status: 201 }
      )
    } catch (error) {
      // Handle duplicate email/username
      if (error instanceof Error && error.message.includes('already exists')) {
        return NextResponse.json(
          { errors: [{ field: 'email', message: error.message }] },
          { status: 409 }
        )
      }

      throw error
    }
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
