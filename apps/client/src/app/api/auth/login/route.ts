/**
 * Login API route
 */

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/data/users'
import { createSession } from '@/lib/data/sessions'
import { verifyPassword } from '@/lib/auth/password'
import { setSessionCookie } from '@/lib/auth/session'
import { validateLoginForm } from '@/lib/auth/validation'
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/auth/rateLimit'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check rate limit
    const identifier = getClientIdentifier(request)
    const rateLimit = checkRateLimit(identifier, RATE_LIMITS.login)

    if (!rateLimit.success) {
      const resetInMinutes = Math.ceil((rateLimit.resetAt - Date.now()) / 60000)
      return NextResponse.json(
        {
          errors: [
            {
              field: 'general',
              message: `Too many login attempts. Please try again in ${resetInMinutes} minutes.`,
            },
          ],
        },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate input
    const validation = validateLoginForm(body)

    if (!validation.isValid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 })
    }

    // Get user by email
    const user = await getUserByEmail(body.email)

    if (!user) {
      return NextResponse.json(
        { errors: [{ field: 'email', message: 'Invalid email or password' }] },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(user.passwordHash, body.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { errors: [{ field: 'password', message: 'Invalid email or password' }] },
        { status: 401 }
      )
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          errors: [
            {
              field: 'email',
              message:
                'Please verify your email before logging in. Check your inbox for the verification link.',
            },
          ],
        },
        { status: 403 }
      )
    }

    // Create session
    const session = await createSession(user.id)

    // Set session cookie
    await setSessionCookie(session.token, new Date(session.expiresAt))

    // Return success (don't expose password hash)
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
