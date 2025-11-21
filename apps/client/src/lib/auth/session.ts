/**
 * Session management utilities
 */

import { cookies } from 'next/headers'
import { getSessionByToken } from '../data/sessions'
import { getUserById } from '../data/users'
import type { SessionData } from '@/types/auth.types'

const SESSION_COOKIE_NAME = 'session_token'

/**
 * Get current session from cookies
 * @returns Promise<SessionData | null>
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!sessionToken) {
    return null
  }

  const session = await getSessionByToken(sessionToken)

  if (!session) {
    return null
  }

  const user = await getUserById(session.userId)

  if (!user) {
    return null
  }

  // Don't include password hash in session data
  const { passwordHash: _, ...userWithoutPassword } = user

  return {
    sessionId: session.id,
    userId: user.id,
    user: userWithoutPassword,
  }
}

/**
 * Set session cookie
 * @param token - Session token
 * @param expiresAt - Expiration date
 */
export async function setSessionCookie(token: string, expiresAt: Date): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
