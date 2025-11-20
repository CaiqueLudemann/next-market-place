import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProductFilter } from './useProductFilter'
import type { Product } from '@/types/product.types'

describe('useProductFilter', () => {
  const mockProducts: Product[] = [
    {
      id: 'prod-1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless audio',
      price: 9999,
      currency: 'USD',
      imageUrl: 'https://example.com/headphones.jpg',
      categoryId: 'cat-electronics',
      sellerId: 'seller-1',
      stock: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod-2',
      name: 'Smart Watch',
      description: 'Fitness tracking watch',
      price: 19999,
      currency: 'USD',
      imageUrl: 'https://example.com/watch.jpg',
      categoryId: 'cat-electronics',
      sellerId: 'seller-2',
      stock: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod-3',
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton fabric',
      price: 2499,
      currency: 'USD',
      imageUrl: 'https://example.com/tshirt.jpg',
      categoryId: 'cat-clothing',
      sellerId: 'seller-1',
      stock: 20,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'prod-4',
      name: 'Denim Jeans',
      description: 'Stylish denim pants',
      price: 5999,
      currency: 'USD',
      imageUrl: 'https://example.com/jeans.jpg',
      categoryId: 'cat-clothing',
      sellerId: 'seller-3',
      stock: 15,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  describe('Initial State', () => {
    it('should return all products when no filters are applied', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      expect(result.current.filteredProducts).toHaveLength(4)
      expect(result.current.filteredProducts).toEqual(mockProducts)
    })

    it('should have "all" as default category', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      expect(result.current.selectedCategory).toBe('all')
    })

    it('should have empty string as default search query', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      expect(result.current.searchQuery).toBe('')
    })
  })

  describe('Category Filtering', () => {
    it('should filter products by category', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })

      expect(result.current.filteredProducts).toHaveLength(2)
      expect(result.current.filteredProducts[0]?.name).toBe('Wireless Headphones')
      expect(result.current.filteredProducts[1]?.name).toBe('Smart Watch')
    })

    it('should filter products by different category', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleCategoryChange('cat-clothing')
      })

      expect(result.current.filteredProducts).toHaveLength(2)
      expect(result.current.filteredProducts[0]?.name).toBe('Cotton T-Shirt')
      expect(result.current.filteredProducts[1]?.name).toBe('Denim Jeans')
    })

    it('should show all products when "all" category is selected', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      // First filter by category
      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })
      expect(result.current.filteredProducts).toHaveLength(2)

      // Then select "all"
      act(() => {
        result.current.handleCategoryChange('all')
      })
      expect(result.current.filteredProducts).toHaveLength(4)
    })

    it('should return empty array for non-existent category', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleCategoryChange('cat-nonexistent')
      })

      expect(result.current.filteredProducts).toHaveLength(0)
    })
  })

  describe('Search Filtering', () => {
    it('should filter products by name (case-insensitive)', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('headphones')
      })

      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Wireless Headphones')
    })

    it('should filter products by name with different casing', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('WATCH')
      })

      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Smart Watch')
    })

    it('should filter products by description', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('cotton')
      })

      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Cotton T-Shirt')
    })

    it('should filter products by partial name match', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('en')
      })

      // Should match "Denim Jeans"
      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Denim Jeans')
    })

    it('should return empty array when search query has no matches', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('nonexistent')
      })

      expect(result.current.filteredProducts).toHaveLength(0)
    })

    it('should show all products when search query is empty', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      // First apply a search
      act(() => {
        result.current.handleSearchChange('watch')
      })
      expect(result.current.filteredProducts).toHaveLength(1)

      // Then clear the search
      act(() => {
        result.current.handleSearchChange('')
      })
      expect(result.current.filteredProducts).toHaveLength(4)
    })
  })

  describe('Combined Filtering', () => {
    it('should apply both category and search filters together', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      // Filter by electronics category
      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })
      expect(result.current.filteredProducts).toHaveLength(2)

      // Then search for "watch"
      act(() => {
        result.current.handleSearchChange('watch')
      })
      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Smart Watch')
    })

    it('should return empty array when combined filters have no matches', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      // Filter by electronics category
      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })

      // Search for something that doesn't exist in electronics
      act(() => {
        result.current.handleSearchChange('jeans')
      })

      expect(result.current.filteredProducts).toHaveLength(0)
    })

    it('should update results when switching categories with active search', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      // First search for "smart"
      act(() => {
        result.current.handleSearchChange('smart')
      })
      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Smart Watch')

      // Change to clothing category (should have no matches for "smart")
      act(() => {
        result.current.handleCategoryChange('cat-clothing')
      })
      expect(result.current.filteredProducts).toHaveLength(0)

      // Change back to electronics
      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })
      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Smart Watch')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty products array', () => {
      const { result } = renderHook(() => useProductFilter([]))

      expect(result.current.filteredProducts).toHaveLength(0)
    })

    it('should handle search with special characters', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('t-shirt')
      })

      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Cotton T-Shirt')
    })

    it('should trim whitespace from search query', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('  watch  ')
      })

      expect(result.current.filteredProducts).toHaveLength(1)
      expect(result.current.filteredProducts[0]?.name).toBe('Smart Watch')
    })

    it('should handle products with missing or undefined fields gracefully', () => {
      const productsWithUndefined: Product[] = [
        {
          ...mockProducts[0]!,
          description: '',
        },
      ]

      const { result } = renderHook(() => useProductFilter(productsWithUndefined))

      act(() => {
        result.current.handleSearchChange('wireless')
      })

      expect(result.current.filteredProducts).toHaveLength(1)
    })
  })

  describe('State Management', () => {
    it('should update selectedCategory state when handleCategoryChange is called', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      expect(result.current.selectedCategory).toBe('all')

      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })
      expect(result.current.selectedCategory).toBe('cat-electronics')
    })

    it('should update searchQuery state when handleSearchChange is called', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      expect(result.current.searchQuery).toBe('')

      act(() => {
        result.current.handleSearchChange('laptop')
      })
      expect(result.current.searchQuery).toBe('laptop')
    })

    it('should preserve original products array', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSearchChange('watch')
      })

      // Original array should not be mutated
      expect(mockProducts).toHaveLength(4)
    })
  })

  describe('Sorting', () => {
    it('should sort products by price descending (most expensive first)', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSortChange('price-desc')
      })

      expect(result.current.filteredProducts[0]?.name).toBe('Smart Watch') // 19999
      expect(result.current.filteredProducts[1]?.name).toBe('Wireless Headphones') // 9999
      expect(result.current.filteredProducts[2]?.name).toBe('Denim Jeans') // 5999
      expect(result.current.filteredProducts[3]?.name).toBe('Cotton T-Shirt') // 2499
    })

    it('should sort products by price ascending (cheapest first)', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSortChange('price-asc')
      })

      expect(result.current.filteredProducts[0]?.name).toBe('Cotton T-Shirt') // 2499
      expect(result.current.filteredProducts[1]?.name).toBe('Denim Jeans') // 5999
      expect(result.current.filteredProducts[2]?.name).toBe('Wireless Headphones') // 9999
      expect(result.current.filteredProducts[3]?.name).toBe('Smart Watch') // 19999
    })

    it('should maintain default order when sort is "default"', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      act(() => {
        result.current.handleSortChange('default')
      })

      expect(result.current.filteredProducts[0]?.name).toBe('Wireless Headphones')
      expect(result.current.filteredProducts[1]?.name).toBe('Smart Watch')
      expect(result.current.filteredProducts[2]?.name).toBe('Cotton T-Shirt')
      expect(result.current.filteredProducts[3]?.name).toBe('Denim Jeans')
    })

    it('should apply sorting after filtering', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      // Filter by electronics
      act(() => {
        result.current.handleCategoryChange('cat-electronics')
      })

      // Then sort by price ascending
      act(() => {
        result.current.handleSortChange('price-asc')
      })

      expect(result.current.filteredProducts).toHaveLength(2)
      expect(result.current.filteredProducts[0]?.name).toBe('Wireless Headphones') // 9999
      expect(result.current.filteredProducts[1]?.name).toBe('Smart Watch') // 19999
    })

    it('should update sortBy state when handleSortChange is called', () => {
      const { result } = renderHook(() => useProductFilter(mockProducts))

      expect(result.current.sortBy).toBe('default')

      act(() => {
        result.current.handleSortChange('price-desc')
      })
      expect(result.current.sortBy).toBe('price-desc')
    })
  })
})
