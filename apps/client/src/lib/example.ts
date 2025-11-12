/**
 * Example showing how to use workspace packages
 */

import { formatCurrency, capitalize } from '@marketplace/utils'
import { connectDB } from '@marketplace/database'

// Example: Format a price
export function formatPrice(cents: number): string {
  return formatCurrency(cents, 'USD')
}

// Example: Capitalize a string
export function formatName(name: string): string {
  return capitalize(name)
}

// Example: Database connection
export function initializeDatabase(): string {
  return connectDB()
}
