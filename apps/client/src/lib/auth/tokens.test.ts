import { describe, it, expect } from 'vitest'
import { generateToken, hashToken, verifyToken } from './tokens'

describe('Token Utilities', () => {
  describe('generateToken', () => {
    it('should generate a random token', () => {
      const token = generateToken()

      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(20)
    })

    it('should generate unique tokens', () => {
      const token1 = generateToken()
      const token2 = generateToken()

      expect(token1).not.toBe(token2)
    })
  })

  describe('hashToken', () => {
    it('should hash a token', async () => {
      const token = generateToken()
      const hash = await hashToken(token)

      expect(hash).toBeTruthy()
      expect(hash).not.toBe(token)
    })

    it('should generate consistent hashes for the same token', async () => {
      const token = generateToken()
      const hash1 = await hashToken(token)
      const hash2 = await hashToken(token)

      expect(hash1).toBe(hash2)
    })
  })

  describe('verifyToken', () => {
    it('should verify correct token', async () => {
      const token = generateToken()
      const hash = await hashToken(token)

      const isValid = await verifyToken(hash, token)
      expect(isValid).toBe(true)
    })

    it('should reject incorrect token', async () => {
      const token = generateToken()
      const wrongToken = generateToken()
      const hash = await hashToken(token)

      const isValid = await verifyToken(hash, wrongToken)
      expect(isValid).toBe(false)
    })
  })
})
