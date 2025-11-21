/**
 * Data Access Layer for Session operations
 */

import { v4 as uuidv4 } from 'uuid'
import { readDb, writeDb, deleteRecord } from './db'
import { generateToken } from '../auth/tokens'
import type { Session } from '@/types/auth.types'

const SESSIONS_FILE = 'sessions.json'

// Session expires after 7 days by default
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000

/**
 * Create a new session for a user
 * @param userId - User ID
 * @param durationMs - Optional custom session duration in milliseconds
 * @returns Promise<Session>
 */
export async function createSession(
  userId: string,
  durationMs = SESSION_DURATION_MS
): Promise<Session> {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + durationMs)

  const session: Session = {
    id: uuidv4(),
    userId,
    token: generateToken(),
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString(),
  }

  const sessions = await readDb<Session>(SESSIONS_FILE)
  sessions.push(session)
  await writeDb(SESSIONS_FILE, sessions)

  return session
}

/**
 * Get session by token
 * @param token - Session token
 * @returns Promise<Session | null>
 */
export async function getSessionByToken(token: string): Promise<Session | null> {
  const sessions = await readDb<Session>(SESSIONS_FILE)
  const session = sessions.find((s) => s.token === token)

  if (!session) {
    return null
  }

  // Check if session is expired
  if (new Date(session.expiresAt) < new Date()) {
    // Delete expired session
    await deleteSession(session.id)
    return null
  }

  return session
}

/**
 * Get session by ID
 * @param id - Session ID
 * @returns Promise<Session | null>
 */
export async function getSessionById(id: string): Promise<Session | null> {
  const sessions = await readDb<Session>(SESSIONS_FILE)
  const session = sessions.find((s) => s.id === id)

  if (!session) {
    return null
  }

  // Check if session is expired
  if (new Date(session.expiresAt) < new Date()) {
    await deleteSession(session.id)
    return null
  }

  return session
}

/**
 * Delete a session
 * @param id - Session ID
 * @returns Promise<boolean>
 */
export async function deleteSession(id: string): Promise<boolean> {
  return await deleteRecord<Session>(SESSIONS_FILE, (session) => session.id === id)
}

/**
 * Delete all sessions for a user
 * @param userId - User ID
 * @returns Promise<number> - Number of sessions deleted
 */
export async function deleteUserSessions(userId: string): Promise<number> {
  const sessions = await readDb<Session>(SESSIONS_FILE)
  const userSessions = sessions.filter((s) => s.userId === userId)
  const remaining = sessions.filter((s) => s.userId !== userId)

  await writeDb(SESSIONS_FILE, remaining)

  return userSessions.length
}

/**
 * Clean up expired sessions
 * @returns Promise<number> - Number of sessions deleted
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const sessions = await readDb<Session>(SESSIONS_FILE)
  const now = new Date()

  const validSessions = sessions.filter((s) => new Date(s.expiresAt) > now)
  const expiredCount = sessions.length - validSessions.length

  if (expiredCount > 0) {
    await writeDb(SESSIONS_FILE, validSessions)
  }

  return expiredCount
}
