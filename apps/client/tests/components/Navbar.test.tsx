import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { NavBar } from '../../src/app/(shop)/components/Navbar'

// Mock next/link to render as a regular anchor tag for testing
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('NavBar', () => {
  describe('rendering', () => {
    it('should render the Marketplace heading', () => {
      render(<NavBar />)
      expect(screen.getByRole('heading', { name: 'Marketplace' })).toBeInTheDocument()
    })

    it('should render navigation links', () => {
      render(<NavBar />)
      expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument()
    })

    it('should have correct href attributes for navigation links', () => {
      render(<NavBar />)
      const shopLink = screen.getByRole('link', { name: 'Shop' })
      const cartLink = screen.getByRole('link', { name: 'Cart' })

      expect(shopLink).toHaveAttribute('href', '/shop')
      expect(cartLink).toHaveAttribute('href', '/cart')
    })
  })

  describe('user interactions', () => {
    it('should be clickable for Shop link', async () => {
      const user = userEvent.setup()
      render(<NavBar />)

      const shopLink = screen.getByRole('link', { name: 'Shop' })
      await user.click(shopLink)

      // Verify the link is clickable (doesn't throw error)
      expect(shopLink).toBeInTheDocument()
    })

    it('should be clickable for Cart link', async () => {
      const user = userEvent.setup()
      render(<NavBar />)

      const cartLink = screen.getByRole('link', { name: 'Cart' })
      await user.click(cartLink)

      // Verify the link is clickable (doesn't throw error)
      expect(cartLink).toBeInTheDocument()
    })
  })
})
