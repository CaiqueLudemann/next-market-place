import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getUserByEmail, getUserById, createUser, updateUser, deleteUser } from './users'
import { writeDb } from './db'
import type { User } from '@/types/auth.types'

describe('Users DAL', () => {
  // Clean up before and after each test
  beforeEach(async () => {
    await writeDb<User>('users.json', [])
  })

  afterEach(async () => {
    await writeDb<User>('users.json', [])
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
        country: 'US',
      }

      const user = await createUser(userData)

      expect(user.id).toBeTruthy()
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBe('Test User')
      expect(user.username).toBe('testuser')
      expect(user.passwordHash).toBeTruthy()
      expect(user.passwordHash).not.toBe('SecurePass123!')
      expect(user.emailVerified).toBeNull()
      expect(user.createdAt).toBeTruthy()
      expect(user.updatedAt).toBeTruthy()
    })

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      }

      await createUser(userData)

      await expect(
        createUser({
          ...userData,
          username: 'differentuser',
        })
      ).rejects.toThrow('already exists')
    })

    it('should throw error for duplicate username', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      }

      await createUser(userData)

      await expect(
        createUser({
          ...userData,
          email: 'different@example.com',
        })
      ).rejects.toThrow('already exists')
    })
  })

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      }

      await createUser(userData)
      const user = await getUserByEmail('test@example.com')

      expect(user).toBeTruthy()
      expect(user?.email).toBe('test@example.com')
    })

    it('should return null for non-existent email', async () => {
      const user = await getUserByEmail('nonexistent@example.com')
      expect(user).toBeNull()
    })

    it('should be case-insensitive', async () => {
      await createUser({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      })

      const user = await getUserByEmail('TEST@EXAMPLE.COM')
      expect(user).toBeTruthy()
    })
  })

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const createdUser = await createUser({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      })

      const user = await getUserById(createdUser.id)
      expect(user).toBeTruthy()
      expect(user?.id).toBe(createdUser.id)
    })

    it('should return null for non-existent id', async () => {
      const user = await getUserById('nonexistent-id')
      expect(user).toBeNull()
    })
  })

  describe('updateUser', () => {
    it('should update user fields', async () => {
      const createdUser = await createUser({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      })

      const updated = await updateUser(createdUser.id, {
        name: 'Updated Name',
        phone: '+1234567890',
      })

      expect(updated).toBeTruthy()
      expect(updated?.name).toBe('Updated Name')
      expect(updated?.phone).toBe('+1234567890')
      expect(updated?.email).toBe('test@example.com')
    })

    it('should return null for non-existent user', async () => {
      const updated = await updateUser('nonexistent-id', { name: 'New Name' })
      expect(updated).toBeNull()
    })
  })

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const createdUser = await createUser({
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User',
        username: 'testuser',
      })

      const deleted = await deleteUser(createdUser.id)
      expect(deleted).toBe(true)

      const user = await getUserById(createdUser.id)
      expect(user).toBeNull()
    })

    it('should return false for non-existent user', async () => {
      const deleted = await deleteUser('nonexistent-id')
      expect(deleted).toBe(false)
    })
  })
})
