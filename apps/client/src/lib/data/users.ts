/**
 * Data Access Layer for User operations
 * This module abstracts all user-related database operations
 */

import { v4 as uuidv4 } from 'uuid'
import { readDb, writeDb, updateRecord, deleteRecord } from './db'
import { hashPassword } from '../auth/password'
import type { User, NewUserInput } from '@/types/auth.types'

const USERS_FILE = 'users.json'

/**
 * Get user by email (case-insensitive)
 * @param email - User email
 * @returns Promise<User | null>
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readDb<User>(USERS_FILE)
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  return user || null
}

/**
 * Get user by ID
 * @param id - User ID
 * @returns Promise<User | null>
 */
export async function getUserById(id: string): Promise<User | null> {
  const users = await readDb<User>(USERS_FILE)
  const user = users.find((u) => u.id === id)
  return user || null
}

/**
 * Get user by username (case-insensitive)
 * @param username - Username
 * @returns Promise<User | null>
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  const users = await readDb<User>(USERS_FILE)
  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase())
  return user || null
}

/**
 * Create a new user
 * @param data - New user data
 * @returns Promise<User> - Created user
 * @throws Error if email or username already exists
 */
export async function createUser(data: NewUserInput): Promise<User> {
  // Check for existing email
  const existingEmail = await getUserByEmail(data.email)
  if (existingEmail) {
    throw new Error('A user with this email already exists')
  }

  // Check for existing username
  const existingUsername = await getUserByUsername(data.username)
  if (existingUsername) {
    throw new Error('A user with this username already exists')
  }

  // Hash the password
  const passwordHash = await hashPassword(data.password)

  const now = new Date().toISOString()

  const newUser: User = {
    id: uuidv4(),
    email: data.email,
    passwordHash,
    name: data.name,
    username: data.username,
    phone: data.phone,
    country: data.country,
    emailVerified: null,
    createdAt: now,
    updatedAt: now,
  }

  const users = await readDb<User>(USERS_FILE)
  users.push(newUser)
  await writeDb(USERS_FILE, users)

  return newUser
}

/**
 * Update a user
 * @param id - User ID
 * @param updates - Fields to update
 * @returns Promise<User | null> - Updated user or null if not found
 */
export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  return await updateRecord<User>(USERS_FILE, (user) => user.id === id, updates)
}

/**
 * Delete a user
 * @param id - User ID
 * @returns Promise<boolean> - True if deleted
 */
export async function deleteUser(id: string): Promise<boolean> {
  return await deleteRecord<User>(USERS_FILE, (user) => user.id === id)
}

/**
 * Mark user email as verified
 * @param userId - User ID
 * @returns Promise<User | null>
 */
export async function verifyUserEmail(userId: string): Promise<User | null> {
  return await updateUser(userId, {
    emailVerified: new Date().toISOString(),
  })
}
