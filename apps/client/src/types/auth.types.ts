/**
 * Authentication and user management types
 */

export interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  username: string
  phone?: string
  country?: string
  emailVerified: string | null
  createdAt: string
  updatedAt: string
}

export interface NewUserInput {
  email: string
  password: string
  name: string
  username: string
  phone?: string
  country?: string
}

export interface Session {
  id: string
  userId: string
  token: string
  expiresAt: string
  createdAt: string
}

export interface VerificationToken {
  id: string
  userId: string
  tokenHash: string
  expiresAt: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SessionData {
  sessionId: string
  userId: string
  user: Omit<User, 'passwordHash'>
}
