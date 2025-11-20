import { describe, it, expect } from 'vitest'
import { paginate, getPageNumbers } from '@/lib/pagination'

describe('paginate', () => {
  const testItems = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

  it('should paginate items correctly for first page', () => {
    const result = paginate(testItems, {
      currentPage: 1,
      totalItems: 50,
      itemsPerPage: 10,
    })

    expect(result.items).toHaveLength(10)
    expect(result.items[0]).toEqual({ id: 1, name: 'Item 1' })
    expect(result.items[9]).toEqual({ id: 10, name: 'Item 10' })
    expect(result.currentPage).toBe(1)
    expect(result.totalPages).toBe(5)
    expect(result.hasNextPage).toBe(true)
    expect(result.hasPreviousPage).toBe(false)
    expect(result.startIndex).toBe(0)
    expect(result.endIndex).toBe(10)
  })

  it('should paginate items correctly for middle page', () => {
    const result = paginate(testItems, {
      currentPage: 3,
      totalItems: 50,
      itemsPerPage: 10,
    })

    expect(result.items).toHaveLength(10)
    expect(result.items[0]).toEqual({ id: 21, name: 'Item 21' })
    expect(result.items[9]).toEqual({ id: 30, name: 'Item 30' })
    expect(result.currentPage).toBe(3)
    expect(result.hasNextPage).toBe(true)
    expect(result.hasPreviousPage).toBe(true)
    expect(result.startIndex).toBe(20)
    expect(result.endIndex).toBe(30)
  })

  it('should paginate items correctly for last page', () => {
    const result = paginate(testItems, {
      currentPage: 5,
      totalItems: 50,
      itemsPerPage: 10,
    })

    expect(result.items).toHaveLength(10)
    expect(result.items[0]).toEqual({ id: 41, name: 'Item 41' })
    expect(result.items[9]).toEqual({ id: 50, name: 'Item 50' })
    expect(result.currentPage).toBe(5)
    expect(result.hasNextPage).toBe(false)
    expect(result.hasPreviousPage).toBe(true)
    expect(result.startIndex).toBe(40)
    expect(result.endIndex).toBe(50)
  })

  it('should handle partial last page correctly', () => {
    const extendedItems = Array.from({ length: 55 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
    }))
    const result = paginate(extendedItems, {
      currentPage: 6,
      totalItems: 55,
      itemsPerPage: 10,
    })

    expect(result.items).toHaveLength(5)
    expect(result.currentPage).toBe(6)
    expect(result.totalPages).toBe(6)
    expect(result.hasNextPage).toBe(false)
    expect(result.hasPreviousPage).toBe(true)
  })

  it('should clamp page number to valid range when too high', () => {
    const result = paginate(testItems, {
      currentPage: 100,
      totalItems: 50,
      itemsPerPage: 10,
    })

    expect(result.currentPage).toBe(5)
    expect(result.hasNextPage).toBe(false)
  })

  it('should clamp page number to valid range when too low', () => {
    const result = paginate(testItems, {
      currentPage: 0,
      totalItems: 50,
      itemsPerPage: 10,
    })

    expect(result.currentPage).toBe(1)
    expect(result.hasPreviousPage).toBe(false)
  })

  it('should handle single page correctly', () => {
    const smallItems = testItems.slice(0, 5)
    const result = paginate(smallItems, {
      currentPage: 1,
      totalItems: 5,
      itemsPerPage: 10,
    })

    expect(result.items).toHaveLength(5)
    expect(result.totalPages).toBe(1)
    expect(result.hasNextPage).toBe(false)
    expect(result.hasPreviousPage).toBe(false)
  })

  it('should handle empty items array', () => {
    const result = paginate([], {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
    })

    expect(result.items).toHaveLength(0)
    expect(result.totalPages).toBe(0)
    expect(result.hasNextPage).toBe(false)
    expect(result.hasPreviousPage).toBe(false)
  })
})

describe('getPageNumbers', () => {
  it('should return all pages when total is less than max visible', () => {
    const pages = getPageNumbers(1, 3, 5)
    expect(pages).toEqual([1, 2, 3])
  })

  it('should return first pages when on first page', () => {
    const pages = getPageNumbers(1, 10, 5)
    expect(pages).toEqual([1, 2, 3, 4, 5])
  })

  it('should return centered pages when in middle', () => {
    const pages = getPageNumbers(5, 10, 5)
    expect(pages).toEqual([3, 4, 5, 6, 7])
  })

  it('should return last pages when near end', () => {
    const pages = getPageNumbers(10, 10, 5)
    expect(pages).toEqual([6, 7, 8, 9, 10])
  })

  it('should handle even max visible count', () => {
    const pages = getPageNumbers(5, 10, 4)
    // With even maxVisible (4), we get 5 pages centered around current page
    expect(pages).toEqual([3, 4, 5, 6, 7])
  })

  it('should return single page when total is 1', () => {
    const pages = getPageNumbers(1, 1, 5)
    expect(pages).toEqual([1])
  })

  it('should handle large page numbers', () => {
    const pages = getPageNumbers(50, 100, 5)
    expect(pages).toEqual([48, 49, 50, 51, 52])
  })
})
