/**
 * Data Access Layer for Verification Token operations
 */

import { v4 as uuidv4 } from 'uuid'
import { readDb, writeDb, deleteRecord } from './db'
import { generateToken, hashToken } from '../auth/tokens'
import type { VerificationToken } from '@/types/auth.types'

const TOKENS_FILE = 'verificationTokens.json'

// Verification token expires after 30 minutes
const TOKEN_DURATION_MS = 30 * 60 * 1000

/**
 * Create a verification token for a user
 * @param userId - User ID
 * @returns Promise<{token: string, record: VerificationToken}>
 */
export async function createVerificationToken(
  userId: string
): Promise<{ token: string; record: VerificationToken }> {
  const plainToken = generateToken()
  const tokenHash = await hashToken(plainToken)

  const now = new Date()
  const expiresAt = new Date(now.getTime() + TOKEN_DURATION_MS)

  const record: VerificationToken = {
    id: uuidv4(),
    userId,
    tokenHash,
    expiresAt: expiresAt.toISOString(),
    createdAt: now.toISOString(),
  }

  const tokens = await readDb<VerificationToken>(TOKENS_FILE)
  tokens.push(record)
  await writeDb(TOKENS_FILE, tokens)

  // Return both the plain token (to send to user) and the record
  return { token: plainToken, record }
}

/**
 * Verify a token and return the associated user ID
 * @param token - Plain verification token
 * @returns Promise<string | null> - User ID if valid, null otherwise
 */
export async function verifyVerificationToken(token: string): Promise<string | null> {
  const tokens = await readDb<VerificationToken>(TOKENS_FILE)
  const tokenHash = await hashToken(token)

  const record = tokens.find((t) => t.tokenHash === tokenHash)

  if (!record) {
    return null
  }

  // Check if token is expired
  if (new Date(record.expiresAt) < new Date()) {
    await deleteVerificationToken(record.id)
    return null
  }

  return record.userId
}

/**
 * Delete a verification token
 * @param id - Token ID
 * @returns Promise<boolean>
 */
export async function deleteVerificationToken(id: string): Promise<boolean> {
  return await deleteRecord<VerificationToken>(TOKENS_FILE, (token) => token.id === id)
}

/**
 * Delete all verification tokens for a user
 * @param userId - User ID
 * @returns Promise<number> - Number of tokens deleted
 */
export async function deleteUserVerificationTokens(userId: string): Promise<number> {
  const tokens = await readDb<VerificationToken>(TOKENS_FILE)
  const userTokens = tokens.filter((t) => t.userId === userId)
  const remaining = tokens.filter((t) => t.userId !== userId)

  await writeDb(TOKENS_FILE, remaining)

  return userTokens.length
}

/**
 * Clean up expired verification tokens
 * @returns Promise<number> - Number of tokens deleted
 */
export async function cleanupExpiredVerificationTokens(): Promise<number> {
  const tokens = await readDb<VerificationToken>(TOKENS_FILE)
  const now = new Date()

  const validTokens = tokens.filter((t) => new Date(t.expiresAt) > now)
  const expiredCount = tokens.length - validTokens.length

  if (expiredCount > 0) {
    await writeDb(TOKENS_FILE, validTokens)
  }

  return expiredCount
}
