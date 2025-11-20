'use client'

import { useState, useEffect, useRef } from 'react'
import type { Product, ProductCategory } from '@/types/product.types'
import { ProductCard } from '@/components/ProductCard'
import { Pagination } from '@/components/Pagination'
import { SearchWithCategoryFilter } from '@/components/SearchWithCategoryFilter'
import { NoResults } from '@/components/NoResults'
import { useProductFilter } from '@/hooks/useProductFilter'
import { paginate } from '@/lib/pagination'

interface ShopClientProps {
  products: Product[]
  categories: ProductCategory[]
  itemsPerPage?: number
}

export function ShopClient({
  products,
  categories,
  itemsPerPage = 12,
}: ShopClientProps): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1)

  // Use the custom filter hook
  const {
    filteredProducts,
    selectedCategory,
    searchQuery,
    handleCategoryChange,
    handleSearchChange,
  } = useProductFilter(products)

  // Track previous filter values to detect changes
  const prevFiltersRef = useRef({ selectedCategory, searchQuery })

  // Reset to page 1 only when filters actually change
  useEffect(() => {
    const prevFilters = prevFiltersRef.current
    const filtersChanged =
      prevFilters.selectedCategory !== selectedCategory || prevFilters.searchQuery !== searchQuery

    if (filtersChanged) {
      setCurrentPage(1)
      prevFiltersRef.current = { selectedCategory, searchQuery }
    }
  }, [selectedCategory, searchQuery])

  // Paginate the filtered results
  const paginationResult = paginate(filteredProducts, {
    currentPage,
    totalItems: filteredProducts.length,
    itemsPerPage,
  })

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
    // Scroll to top of products section
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-8">
        <SearchWithCategoryFilter
          categories={categories}
          onSearch={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-1">All Products</h2>
          <p className="text-neutral-600">
            {filteredProducts.length > 0 ? (
              <>
                Showing {paginationResult.startIndex + 1}-{paginationResult.endIndex} of{' '}
                {paginationResult.totalItems} items
              </>
            ) : (
              <>0 items</>
            )}
          </p>
        </div>

        {/* Sort by placeholder */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              Sort by
            </button>
          </div>
        )}
      </div>

      {/* Product Grid or No Results */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up mb-12">
            {paginationResult.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {paginationResult.totalPages > 1 && (
            <div className="mt-12 mb-8">
              <Pagination
                currentPage={paginationResult.currentPage}
                totalPages={paginationResult.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <NoResults selectedCategory={selectedCategory} />
      )}
    </>
  )
}
