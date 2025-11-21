/**
 * Email verification API route
 */

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {
  verifyVerificationToken,
  deleteUserVerificationTokens,
} from '@/lib/data/verificationTokens'
import { verifyUserEmail } from '@/lib/data/users'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 })
    }

    // Verify the token
    const userId = await verifyVerificationToken(token)

    if (!userId) {
      return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 })
    }

    // Mark user as verified
    const user = await verifyUserEmail(userId)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete all verification tokens for this user
    await deleteUserVerificationTokens(userId)

    // Return success
    return NextResponse.json({
      message: 'Email verified successfully. You can now log in.',
      success: true,
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
