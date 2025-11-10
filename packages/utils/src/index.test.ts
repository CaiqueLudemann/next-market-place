import { describe, it, expect } from 'vitest'
import { formatCurrency, capitalize, truncate } from './index'

describe('Utils Package', () => {
  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      const result = formatCurrency(1234.56)
      expect(result).toBe('$1,234.56')
    })

    it('should format with custom currency', () => {
      const result = formatCurrency(1234.56, 'EUR')
      expect(result).toBe('€1,234.56')
    })

    it('should handle zero amount', () => {
      const result = formatCurrency(0)
      expect(result).toBe('$0.00')
    })

    it('should handle negative amounts', () => {
      const result = formatCurrency(-50)
      expect(result).toBe('-$50.00')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      const result = capitalize('hello')
      expect(result).toBe('Hello')
    })

    it('should handle already capitalized strings', () => {
      const result = capitalize('Hello')
      expect(result).toBe('Hello')
    })

    it('should handle empty strings', () => {
      const result = capitalize('')
      expect(result).toBe('')
    })

    it('should handle single character', () => {
      const result = capitalize('a')
      expect(result).toBe('A')
    })
  })

  describe('truncate', () => {
    it('should truncate long strings', () => {
      const result = truncate('This is a very long string', 10)
      expect(result).toBe('This is a ...')
    })

    it('should not truncate short strings', () => {
      const result = truncate('Short', 10)
      expect(result).toBe('Short')
    })

    it('should handle exact length', () => {
      const result = truncate('Exactly10!', 10)
      expect(result).toBe('Exactly10!')
    })

    it('should handle empty strings', () => {
      const result = truncate('', 10)
      expect(result).toBe('')
    })
  })
})
