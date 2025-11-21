/**
 * Logout API route
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByToken, deleteSession } from '@/lib/data/sessions'
import { clearSessionCookie } from '@/lib/auth/session'

export async function POST(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('session_token')?.value

    if (sessionToken) {
      // Find and delete the session
      const session = await getSessionByToken(sessionToken)
      if (session) {
        await deleteSession(session.id)
      }
    }

    // Clear the cookie
    await clearSessionCookie()

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
