import { useState, useMemo } from 'react'
import type { Product } from '@/types/product.types'

export type SortOption = 'default' | 'price-asc' | 'price-desc'

export interface UseProductFilterReturn {
  filteredProducts: Product[]
  selectedCategory: string
  searchQuery: string
  sortBy: SortOption
  handleCategoryChange: (categoryId: string) => void
  handleSearchChange: (query: string) => void
  handleSortChange: (sort: SortOption) => void
}

/**
 * Custom hook for filtering and sorting products
 * @param products - Array of products to filter and sort
 * @returns Filtered/sorted products and control functions
 */
export function useProductFilter(products: Product[]): UseProductFilterReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortOption>('default')

  // Memoized filtered and sorted products
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

    // Sort products
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    }
    // 'default' maintains original order

    return result
  }, [products, selectedCategory, searchQuery, sortBy])

  const handleCategoryChange = (categoryId: string): void => {
    setSelectedCategory(categoryId)
  }

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query)
  }

  const handleSortChange = (sort: SortOption): void => {
    setSortBy(sort)
  }

  return {
    filteredProducts,
    selectedCategory,
    searchQuery,
    sortBy,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
  }
}
