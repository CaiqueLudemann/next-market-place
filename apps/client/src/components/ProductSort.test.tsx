import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductSort } from './ProductSort'

describe('ProductSort', () => {
  const mockOnSortChange = vi.fn()

  describe('Component Rendering', () => {
    it('should render sort button with default text', () => {
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })
      expect(button).toBeInTheDocument()
    })

    it('should render dropdown menu when button is clicked', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })
      await user.click(button)

      expect(screen.getByText('Most Expensive')).toBeInTheDocument()
      expect(screen.getByText('Cheapest')).toBeInTheDocument()
    })

    it('should display current sort selection in button text', () => {
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="price-desc" />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Most Expensive')
    })

    it('should display "Cheapest" when price-asc is selected', () => {
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="price-asc" />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Cheapest')
    })
  })

  describe('Sort Selection', () => {
    it('should call onSortChange when "Most Expensive" is clicked', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })
      await user.click(button)

      const mostExpensive = screen.getByText('Most Expensive')
      await user.click(mostExpensive)

      expect(mockOnSortChange).toHaveBeenCalledWith('price-desc')
    })

    it('should call onSortChange when "Cheapest" is clicked', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })
      await user.click(button)

      const cheapest = screen.getByText('Cheapest')
      await user.click(cheapest)

      expect(mockOnSortChange).toHaveBeenCalledWith('price-asc')
    })

    it('should close dropdown after selection', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })
      await user.click(button)

      const mostExpensive = screen.getByText('Most Expensive')
      await user.click(mostExpensive)

      // Dropdown should be closed
      expect(screen.queryByText('Most Expensive')).not.toBeInTheDocument()
    })
  })

  describe('Dropdown Behavior', () => {
    it('should close dropdown when clicking outside', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <ProductSort onSortChange={mockOnSortChange} selectedSort="default" />
          <div data-testid="outside">Outside</div>
        </div>
      )

      const button = screen.getByRole('button', { name: /sort by/i })
      await user.click(button)

      expect(screen.getByText('Most Expensive')).toBeInTheDocument()

      const outside = screen.getByTestId('outside')
      await user.click(outside)

      // Dropdown should be closed
      expect(screen.queryByText('Most Expensive')).not.toBeInTheDocument()
    })

    it('should toggle dropdown when button is clicked multiple times', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })

      // Open
      await user.click(button)
      expect(screen.getByText('Most Expensive')).toBeInTheDocument()

      // Close
      await user.click(button)
      expect(screen.queryByText('Most Expensive')).not.toBeInTheDocument()

      // Open again
      await user.click(button)
      expect(screen.getByText('Most Expensive')).toBeInTheDocument()
    })
  })

  describe('Visual Indicators', () => {
    it('should show checkmark on selected sort option', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="price-desc" />)

      const button = screen.getByRole('button')
      await user.click(button)

      const options = screen.getAllByRole('button')
      const mostExpensiveOption = options.find(
        (opt) => opt.textContent === 'Most Expensive' && opt.getAttribute('aria-current')
      )
      expect(mostExpensiveOption).toHaveAttribute('aria-current', 'true')
    })

    it('should not show checkmark on unselected options', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="price-desc" />)

      const button = screen.getByRole('button')
      await user.click(button)

      const options = screen.getAllByRole('button')
      const cheapestOption = options.find((opt) => opt.textContent === 'Cheapest')
      expect(cheapestOption).not.toHaveAttribute('aria-current', 'true')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })
      expect(button).toHaveAttribute('aria-haspopup', 'true')
    })

    it('should update aria-expanded when dropdown opens/closes', async () => {
      const user = userEvent.setup()
      render(<ProductSort onSortChange={mockOnSortChange} selectedSort="default" />)

      const button = screen.getByRole('button', { name: /sort by/i })

      // Initially closed
      expect(button).toHaveAttribute('aria-expanded', 'false')

      // Open dropdown
      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'true')

      // Close dropdown
      await user.click(button)
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
