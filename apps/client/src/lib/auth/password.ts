/**
 * Password hashing and verification using Argon2
 * Argon2 is the winner of the Password Hashing Competition and is recommended for secure password storage
 */

import argon2 from 'argon2'

/**
 * Hash a password using Argon2id
 * @param password - Plain text password to hash
 * @returns Promise<string> - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.trim().length === 0) {
    throw new Error('Password cannot be empty')
  }

  try {
    // Argon2id is the recommended variant (hybrid of Argon2i and Argon2d)
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MB
      timeCost: 3, // 3 iterations
      parallelism: 4, // 4 parallel threads
    })

    return hash
  } catch (error) {
    throw new Error(
      `Failed to hash password: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Verify a password against a hash
 * @param hash - The hashed password to verify against
 * @param password - Plain text password to verify
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  if (!password || password.trim().length === 0) {
    return false
  }

  if (!hash || hash.trim().length === 0) {
    return false
  }

  try {
    return await argon2.verify(hash, password)
  } catch (error) {
    // If verification fails for any reason (invalid hash format, etc.), return false
    console.error('Password verification error:', error)
    return false
  }
}
