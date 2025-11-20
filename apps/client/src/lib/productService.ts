/**
 * Product service for managing product data
 * Currently uses mock data, but can be easily replaced with real API calls
 */

import type { Product, ProductCategory } from '@/types/product.types'
import { generateMockProducts, filterProducts, getMockCategories } from './mockProducts'

// Generate a consistent set of mock products
// In production, this would be replaced with API calls
const MOCK_PRODUCTS = generateMockProducts(50)

/**
 * Retrieves all products
 */
export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS
}

/**
 * Retrieves a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((product) => product.id === id)
}

/**
 * Retrieves products by category ID
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return filterProducts(MOCK_PRODUCTS, { categoryId })
}

/**
 * Searches products by query string (searches name and description)
 */
export function searchProducts(query: string): Product[] {
  return filterProducts(MOCK_PRODUCTS, { searchQuery: query })
}

/**
 * Retrieves only active products
 */
export function getActiveProducts(): Product[] {
  return filterProducts(MOCK_PRODUCTS, { isActive: true })
}

/**
 * Retrieves all product categories
 */
export function getCategories(): ProductCategory[] {
  return getMockCategories()
}
