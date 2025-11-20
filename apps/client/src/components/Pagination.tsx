'use client'

import { getPageNumbers } from '@/lib/pagination'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps): React.ReactElement | null {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisible)
  const showStartEllipsis = (pageNumbers[0] ?? 1) > 1
  const showEndEllipsis = (pageNumbers[pageNumbers.length - 1] ?? totalPages) < totalPages

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number): void => {
    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 hover:bg-primary-50 hover:text-primary-600 disabled:hover:bg-transparent disabled:hover:text-neutral-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* First Page + Ellipsis */}
      {showStartEllipsis && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className="w-10 h-10 rounded-lg font-medium transition-all duration-200 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
            aria-label="Go to page 1"
          >
            1
          </button>
          <span className="text-neutral-400 px-2" aria-hidden="true">
            ...
          </span>
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            page === currentPage
              ? 'text-white shadow-medium'
              : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
          }`}
          style={
            page === currentPage
              ? {
                  background: 'linear-gradient(to right, rgb(79 70 229), rgb(67 56 202))',
                }
              : undefined
          }
        >
          {page}
        </button>
      ))}

      {/* Last Page + Ellipsis */}
      {showEndEllipsis && (
        <>
          <span className="text-neutral-400 px-2" aria-hidden="true">
            ...
          </span>
          <button
            onClick={() => handlePageClick(totalPages)}
            className="w-10 h-10 rounded-lg font-medium transition-all duration-200 text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 hover:bg-primary-50 hover:text-primary-600 disabled:hover:bg-transparent disabled:hover:text-neutral-700"
      >
        <span className="hidden sm:inline">Next</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}
