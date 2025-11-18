'use client'

import { useState } from 'react'
import type { Product } from '@/types/product.types'
import { ProductCard } from '@/components/ProductCard'
import { Pagination } from '@/components/Pagination'
import { paginate } from '@/lib/pagination'

interface ShopClientProps {
  products: Product[]
  itemsPerPage?: number
}

export function ShopClient({ products, itemsPerPage = 12 }: ShopClientProps): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1)

  const paginationResult = paginate(products, {
    currentPage,
    totalItems: products.length,
    itemsPerPage,
  })

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
    // Scroll to top of products section
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-1">All Products</h2>
          <p className="text-neutral-600">
            Showing {paginationResult.startIndex + 1}-{paginationResult.endIndex} of{' '}
            {paginationResult.totalItems} items
          </p>
        </div>

        {/* Filter options placeholder - can be implemented later */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Filters
          </button>
          <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            Sort by
          </button>
        </div>
      </div>

      {/* Product Grid */}
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
  )
}
