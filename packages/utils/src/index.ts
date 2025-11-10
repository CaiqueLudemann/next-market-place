/**
 * Utils Package
 *
 * Shared utility functions across the marketplace monorepo.
 */

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param maxLength - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  }
  return str.slice(0, maxLength) + '...'
}
