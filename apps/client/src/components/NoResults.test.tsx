import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NoResults } from './NoResults'

describe('NoResults', () => {
  describe('Message Display', () => {
    it('should display "No results found." when selectedCategory is "all"', () => {
      render(<NoResults selectedCategory="all" />)

      expect(screen.getByText('No results found.')).toBeInTheDocument()
    })

    it('should display category-specific message when category is not "all"', () => {
      render(<NoResults selectedCategory="cat-electronics" />)

      expect(screen.getByText('No results found within selected category.')).toBeInTheDocument()
    })

    it('should display "No Products Found" heading', () => {
      render(<NoResults selectedCategory="all" />)

      expect(screen.getByRole('heading', { name: /no products found/i })).toBeInTheDocument()
    })

    it('should display suggestion text', () => {
      render(<NoResults selectedCategory="all" />)

      expect(screen.getByText(/try adjusting your search or filter criteria/i)).toBeInTheDocument()
    })
  })

  describe('Icon Rendering', () => {
    it('should render search icon', () => {
      const { container } = render(<NoResults selectedCategory="all" />)

      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle different category IDs correctly', () => {
      const { rerender } = render(<NoResults selectedCategory="cat-clothing" />)

      expect(screen.getByText('No results found within selected category.')).toBeInTheDocument()

      rerender(<NoResults selectedCategory="cat-books" />)
      expect(screen.getByText('No results found within selected category.')).toBeInTheDocument()
    })

    it('should handle empty string category', () => {
      render(<NoResults selectedCategory="" />)

      expect(screen.getByText('No results found within selected category.')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have aria-hidden on decorative icon', () => {
      const { container } = render(<NoResults selectedCategory="all" />)

      const icon = container.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have proper heading hierarchy', () => {
      render(<NoResults selectedCategory="all" />)

      const heading = screen.getByRole('heading', { name: /no products found/i })
      expect(heading.tagName).toBe('H3')
    })
  })
})
