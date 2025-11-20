/**
 * Pagination utility functions
 */

export interface PaginationOptions {
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

export interface PaginationResult<T> {
  items: T[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  startIndex: number
  endIndex: number
}

/**
 * Paginate an array of items
 */
export function paginate<T>(items: T[], options: PaginationOptions): PaginationResult<T> {
  const { currentPage, totalItems, itemsPerPage } = options

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Ensure current page is within valid range
  const validPage = Math.max(1, Math.min(currentPage, totalPages))

  // Calculate start and end indices
  const startIndex = (validPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  // Get items for current page
  const paginatedItems = items.slice(startIndex, endIndex)

  return {
    items: paginatedItems,
    currentPage: validPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
    startIndex,
    endIndex,
  }
}

/**
 * Generate page numbers for pagination UI
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const halfVisible = Math.floor(maxVisible / 2)
  let startPage = Math.max(1, currentPage - halfVisible)
  let endPage = Math.min(totalPages, currentPage + halfVisible)

  // Adjust if we're near the start or end
  if (currentPage <= halfVisible) {
    endPage = Math.min(maxVisible, totalPages)
  } else if (currentPage >= totalPages - halfVisible) {
    startPage = Math.max(1, totalPages - maxVisible + 1)
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
}
