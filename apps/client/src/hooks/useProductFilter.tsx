import { useState, useMemo } from 'react'
import type { Product } from '@/types/product.types'

export interface UseProductFilterReturn {
  filteredProducts: Product[]
  selectedCategory: string
  searchQuery: string
  handleCategoryChange: (categoryId: string) => void
  handleSearchChange: (query: string) => void
}

/**
 * Custom hook for filtering products by category and search query
 * @param products - Array of products to filter
 * @returns Filtered products and filter control functions
 */
export function useProductFilter(products: Product[]): UseProductFilterReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Memoized filtered products - only recalculates when dependencies change
  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by category (if not "all")
    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.categoryId === selectedCategory)
    }

    // Filter by search query (case-insensitive, searches name and description)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [products, selectedCategory, searchQuery])

  const handleCategoryChange = (categoryId: string): void => {
    setSelectedCategory(categoryId)
  }

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query)
  }

  return {
    filteredProducts,
    selectedCategory,
    searchQuery,
    handleCategoryChange,
    handleSearchChange,
  }
}
