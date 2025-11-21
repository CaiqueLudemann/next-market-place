/**
 * Token generation and hashing utilities
 */

import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

/**
 * Generate a cryptographically secure random token
 * @returns string - Random token
 */
export function generateToken(): string {
  // Generate a UUID v4 + additional random bytes for extra entropy
  const uuid = uuidv4()
  const randomBytes = crypto.randomBytes(32).toString('hex')
  return `${uuid}-${randomBytes}`
}

/**
 * Hash a token using SHA-256
 * We use SHA-256 for tokens (not passwords) because:
 * 1. Tokens are already random and high-entropy
 * 2. We need consistent hashing (same token = same hash)
 * 3. SHA-256 is fast and sufficient for this use case
 * @param token - Token to hash
 * @returns Promise<string> - Hashed token
 */
export async function hashToken(token: string): Promise<string> {
  const hash = crypto.createHash('sha256').update(token).digest('hex')
  return hash
}

/**
 * Verify a token against a hash
 * @param hash - The hashed token
 * @param token - Plain token to verify
 * @returns Promise<boolean> - True if token matches
 */
export async function verifyToken(hash: string, token: string): Promise<boolean> {
  const tokenHash = await hashToken(token)
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(tokenHash))
}
