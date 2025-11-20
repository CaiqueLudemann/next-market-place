import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchWithCategoryFilter } from './SearchWithCategoryFilter'
import type { ProductCategory } from '@/types/product.types'

describe('SearchWithCategoryFilter', () => {
  const mockCategories: ProductCategory[] = [
    {
      id: 'cat-electronics',
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices',
      parentId: null,
    },
    {
      id: 'cat-clothing',
      name: 'Clothing',
      slug: 'clothing',
      description: 'Apparel items',
      parentId: null,
    },
  ]

  const mockOnSearch = vi.fn()
  const mockOnCategoryChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render category dropdown with "All" as default option', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const dropdown = screen.getByRole('combobox', { name: /category/i })
      expect(dropdown).toBeInTheDocument()
      expect(dropdown).toHaveValue('all')
    })

    it('should render all categories in the dropdown', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const allOption = screen.getByRole('option', { name: /all/i })
      const electronicsOption = screen.getByRole('option', { name: /electronics/i })
      const clothingOption = screen.getByRole('option', { name: /clothing/i })

      expect(allOption).toBeInTheDocument()
      expect(electronicsOption).toBeInTheDocument()
      expect(clothingOption).toBeInTheDocument()
    })

    it('should render search input field', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'text')
    })

    it('should display search icon in the input field', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchIcon = screen.getByTestId('search-icon')
      expect(searchIcon).toBeInTheDocument()
    })
  })

  describe('Category Selection', () => {
    it('should call onCategoryChange immediately when category is selected', async () => {
      const user = userEvent.setup()

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const dropdown = screen.getByRole('combobox', { name: /category/i })
      await user.selectOptions(dropdown, 'cat-electronics')

      expect(mockOnCategoryChange).toHaveBeenCalledTimes(1)
      expect(mockOnCategoryChange).toHaveBeenCalledWith('cat-electronics')
    })

    it('should update dropdown value when category changes', async () => {
      const user = userEvent.setup()

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const dropdown = screen.getByRole('combobox', { name: /category/i })
      await user.selectOptions(dropdown, 'cat-clothing')

      expect(dropdown).toHaveValue('cat-clothing')
    })

    it('should handle selecting "All" category', async () => {
      const user = userEvent.setup()

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const dropdown = screen.getByRole('combobox', { name: /category/i })
      await user.selectOptions(dropdown, 'cat-electronics')
      await user.selectOptions(dropdown, 'all')

      expect(mockOnCategoryChange).toHaveBeenLastCalledWith('all')
      expect(dropdown).toHaveValue('all')
    })
  })

  describe('Search Input - Debouncing', () => {
    it('should debounce search input by ~200ms', async () => {
      const user = userEvent.setup()

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)

      // Type multiple characters quickly
      await user.type(searchInput, 'laptop')

      // Should not call immediately
      expect(mockOnSearch).not.toHaveBeenCalled()

      // Wait for debounce delay
      await waitFor(
        () => {
          expect(mockOnSearch).toHaveBeenCalledTimes(1)
          expect(mockOnSearch).toHaveBeenCalledWith('laptop')
        },
        { timeout: 300 }
      )
    })

    it('should reset debounce timer on new input', async () => {
      const user = userEvent.setup()

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)

      // Type first character
      await user.type(searchInput, 'l')

      // Wait 100ms (less than debounce delay)
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Type another character (should reset timer)
      await user.type(searchInput, 'a')

      // Wait another 100ms (still less than total debounce)
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Should not have called yet
      expect(mockOnSearch).not.toHaveBeenCalled()

      // Wait for full debounce delay
      await waitFor(
        () => {
          expect(mockOnSearch).toHaveBeenCalledTimes(1)
          expect(mockOnSearch).toHaveBeenCalledWith('la')
        },
        { timeout: 300 }
      )
    })

    it('should call onSearch with empty string when input is cleared', async () => {
      const user = userEvent.setup()

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)

      // Type and wait
      await user.type(searchInput, 'test')
      await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('test'), { timeout: 300 })

      // Clear input
      await user.clear(searchInput)

      await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith(''), { timeout: 300 })
    })
  })

  describe('Controlled Component Behavior', () => {
    it('should accept and display initial search query prop', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
          initialSearchQuery="headphones"
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)
      expect(searchInput).toHaveValue('headphones')
    })

    it('should accept and display initial selected category prop', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
          initialSelectedCategory="cat-electronics"
        />
      )

      const dropdown = screen.getByRole('combobox', { name: /category/i })
      expect(dropdown).toHaveValue('cat-electronics')
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for screen readers', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/search products/i)).toBeInTheDocument()
    })

    it('should have proper ARIA attributes', () => {
      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)
      expect(searchInput).toHaveAttribute('aria-label', 'Search products')

      const dropdown = screen.getByRole('combobox')
      expect(dropdown).toHaveAttribute('aria-label')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty categories array', () => {
      render(
        <SearchWithCategoryFilter
          categories={[]}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const dropdown = screen.getByRole('combobox', { name: /category/i })
      const options = screen.getAllByRole('option')

      // Should only show "All" option
      expect(options).toHaveLength(1)
      expect(dropdown).toHaveValue('all')
    })

    it('should handle very long search queries', async () => {
      const user = userEvent.setup()
      const longQuery = 'a'.repeat(200)

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)
      await user.type(searchInput, longQuery)

      await waitFor(
        () => {
          expect(mockOnSearch).toHaveBeenCalledWith(longQuery)
        },
        { timeout: 300 }
      )
    })

    it('should handle special characters in search query', async () => {
      const user = userEvent.setup()
      const specialQuery = 'test@#$%^&*()'

      render(
        <SearchWithCategoryFilter
          categories={mockCategories}
          onSearch={mockOnSearch}
          onCategoryChange={mockOnCategoryChange}
        />
      )

      const searchInput = screen.getByPlaceholderText(/search products/i)
      await user.type(searchInput, specialQuery)

      await waitFor(
        () => {
          expect(mockOnSearch).toHaveBeenCalledWith(specialQuery)
        },
        { timeout: 300 }
      )
    })
  })
})
