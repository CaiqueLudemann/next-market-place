'use client'

import { useState, useEffect, useRef } from 'react'
import type { ProductCategory } from '@/types/product.types'

export interface SearchWithCategoryFilterProps {
  categories: ProductCategory[]
  onSearch: (query: string) => void
  onCategoryChange: (categoryId: string) => void
  initialSearchQuery?: string
  initialSelectedCategory?: string
}

export function SearchWithCategoryFilter({
  categories,
  onSearch,
  onCategoryChange,
  initialSearchQuery = '',
  initialSelectedCategory = 'all',
}: SearchWithCategoryFilterProps): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialSelectedCategory)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle search input changes with debouncing
  useEffect(() => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      onSearch(searchQuery)
    }, 200)

    // Cleanup function to clear timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, onSearch])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value)
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newCategory = event.target.value
    setSelectedCategory(newCategory)
    onCategoryChange(newCategory)
  }

  return (
    <div className="flex items-center gap-0 w-full">
      {/* Category Dropdown */}
      <div className="relative">
        <label htmlFor="category-select" className="sr-only">
          Category filter
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          aria-label="Category filter"
          className="h-[56px] pl-4 pr-10 bg-white border border-r-0 border-neutral-200 rounded-l-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none text-neutral-700 font-medium cursor-pointer hover:bg-neutral-50"
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative flex-1">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            data-testid="search-icon"
            className="w-5 h-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-r-xl shadow-soft focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
        />
      </div>
    </div>
  )
}
