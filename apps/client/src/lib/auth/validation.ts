/**
 * Input validation utilities for authentication
 */

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - Contains uppercase letter
 * - Contains lowercase letter
 * - Contains number
 * - Contains special character
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) {
    return false
  }

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
}

/**
 * Validate username
 * Requirements:
 * - 3-20 characters
 * - Alphanumeric and underscore only
 * - Must start with a letter
 */
export function isValidUsername(username: string): boolean {
  if (username.length < 3 || username.length > 20) {
    return false
  }

  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/
  return usernameRegex.test(username)
}

/**
 * Validate full signup form
 */
export function validateSignupForm(data: {
  email: string
  password: string
  confirmPassword: string
  name: string
  username: string
  country?: string
}): ValidationResult {
  const errors: ValidationError[] = []

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' })
  }

  // Validate password
  if (!data.password || data.password.length === 0) {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (!isValidPassword(data.password)) {
    errors.push({
      field: 'password',
      message:
        'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character',
    })
  }

  // Validate password confirmation
  if (data.password !== data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' })
  }

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' })
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' })
  }

  // Validate username
  if (!data.username || data.username.trim().length === 0) {
    errors.push({ field: 'username', message: 'Username is required' })
  } else if (!isValidUsername(data.username)) {
    errors.push({
      field: 'username',
      message:
        'Username must be 3-20 characters, start with a letter, and contain only letters, numbers, and underscores',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate login form
 */
export function validateLoginForm(data: { email: string; password: string }): ValidationResult {
  const errors: ValidationError[] = []

  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' })
  }

  if (!data.password || data.password.length === 0) {
    errors.push({ field: 'password', message: 'Password is required' })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
