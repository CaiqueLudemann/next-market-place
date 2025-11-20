import { describe, it, expect } from 'vitest'
import {
  generateMockProduct,
  generateMockProducts,
  generateMockCategory,
  getMockCategories,
  filterProducts,
} from '@/lib/mockProducts'
import type { Product, ProductFilter } from '@/types/product.types'

describe('mockProducts', () => {
  describe('generateMockProduct', () => {
    it('should generate a product with all required fields', () => {
      const product = generateMockProduct()

      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('description')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('currency')
      expect(product).toHaveProperty('imageUrl')
      expect(product).toHaveProperty('categoryId')
      expect(product).toHaveProperty('sellerId')
      expect(product).toHaveProperty('stock')
      expect(product).toHaveProperty('isActive')
      expect(product).toHaveProperty('createdAt')
      expect(product).toHaveProperty('updatedAt')
    })

    it('should generate a product with valid data types', () => {
      const product = generateMockProduct()

      expect(typeof product.id).toBe('string')
      expect(typeof product.name).toBe('string')
      expect(typeof product.description).toBe('string')
      expect(typeof product.price).toBe('number')
      expect(typeof product.currency).toBe('string')
      expect(typeof product.imageUrl).toBe('string')
      expect(typeof product.categoryId).toBe('string')
      expect(typeof product.sellerId).toBe('string')
      expect(typeof product.stock).toBe('number')
      expect(typeof product.isActive).toBe('boolean')
      expect(product.createdAt).toBeInstanceOf(Date)
      expect(product.updatedAt).toBeInstanceOf(Date)
    })

    it('should generate a product with positive price', () => {
      const product = generateMockProduct()

      expect(product.price).toBeGreaterThan(0)
    })

    it('should generate a product with non-negative stock', () => {
      const product = generateMockProduct()

      expect(product.stock).toBeGreaterThanOrEqual(0)
    })

    it('should generate a product with USD currency by default', () => {
      const product = generateMockProduct()

      expect(product.currency).toBe('USD')
    })

    it('should accept custom overrides', () => {
      const customProduct = generateMockProduct({
        name: 'Custom Product',
        price: 5000,
      })

      expect(customProduct.name).toBe('Custom Product')
      expect(customProduct.price).toBe(5000)
    })
  })

  describe('generateMockProducts', () => {
    it('should generate the specified number of products', () => {
      const products = generateMockProducts(5)

      expect(products).toHaveLength(5)
    })

    it('should generate 10 products by default', () => {
      const products = generateMockProducts()

      expect(products).toHaveLength(10)
    })

    it('should generate products with unique IDs', () => {
      const products = generateMockProducts(20)
      const ids = products.map((p) => p.id)
      const uniqueIds = new Set(ids)

      expect(uniqueIds.size).toBe(products.length)
    })

    it('should generate array of valid products', () => {
      const products = generateMockProducts(3)

      products.forEach((product) => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('price')
        expect(product.price).toBeGreaterThan(0)
      })
    })
  })

  describe('generateMockCategory', () => {
    it('should generate a category with all required fields', () => {
      const category = generateMockCategory()

      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('slug')
      expect(category).toHaveProperty('description')
      expect(category).toHaveProperty('parentId')
    })

    it('should generate a category with valid data types', () => {
      const category = generateMockCategory()

      expect(typeof category.id).toBe('string')
      expect(typeof category.name).toBe('string')
      expect(typeof category.slug).toBe('string')
      expect(typeof category.description).toBe('string')
      expect(category.parentId === null || typeof category.parentId === 'string').toBe(true)
    })

    it('should accept custom overrides', () => {
      const customCategory = generateMockCategory({
        name: 'Electronics',
        slug: 'electronics',
      })

      expect(customCategory.name).toBe('Electronics')
      expect(customCategory.slug).toBe('electronics')
    })
  })

  describe('getMockCategories', () => {
    it('should return an array of categories', () => {
      const categories = getMockCategories()

      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('should return categories with valid structure', () => {
      const categories = getMockCategories()

      categories.forEach((category) => {
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('slug')
      })
    })
  })

  describe('filterProducts', () => {
    const mockProducts: Product[] = [
      generateMockProduct({
        id: '1',
        name: 'Laptop',
        price: 100000,
        categoryId: 'cat1',
        isActive: true,
      }),
      generateMockProduct({
        id: '2',
        name: 'Phone',
        price: 50000,
        categoryId: 'cat2',
        isActive: true,
      }),
      generateMockProduct({
        id: '3',
        name: 'Tablet',
        price: 30000,
        categoryId: 'cat1',
        isActive: false,
      }),
      generateMockProduct({
        id: '4',
        name: 'Laptop Pro',
        price: 150000,
        categoryId: 'cat1',
        isActive: true,
      }),
    ]

    it('should return all products when no filter is provided', () => {
      const filtered = filterProducts(mockProducts, {})

      expect(filtered).toHaveLength(4)
    })

    it('should filter by category ID', () => {
      const filter: ProductFilter = { categoryId: 'cat1' }
      const filtered = filterProducts(mockProducts, filter)

      expect(filtered).toHaveLength(3)
      filtered.forEach((product) => {
        expect(product.categoryId).toBe('cat1')
      })
    })

    it('should filter by minimum price', () => {
      const filter: ProductFilter = { minPrice: 50000 }
      const filtered = filterProducts(mockProducts, filter)

      expect(filtered.length).toBeGreaterThanOrEqual(1)
      filtered.forEach((product) => {
        expect(product.price).toBeGreaterThanOrEqual(50000)
      })
    })

    it('should filter by maximum price', () => {
      const filter: ProductFilter = { maxPrice: 50000 }
      const filtered = filterProducts(mockProducts, filter)

      filtered.forEach((product) => {
        expect(product.price).toBeLessThanOrEqual(50000)
      })
    })

    it('should filter by price range', () => {
      const filter: ProductFilter = { minPrice: 30000, maxPrice: 100000 }
      const filtered = filterProducts(mockProducts, filter)

      filtered.forEach((product) => {
        expect(product.price).toBeGreaterThanOrEqual(30000)
        expect(product.price).toBeLessThanOrEqual(100000)
      })
    })

    it('should filter by search query (case insensitive)', () => {
      const filter: ProductFilter = { searchQuery: 'laptop' }
      const filtered = filterProducts(mockProducts, filter)

      expect(filtered).toHaveLength(2)
      filtered.forEach((product) => {
        expect(product.name.toLowerCase()).toContain('laptop')
      })
    })

    it('should filter by isActive status', () => {
      const filter: ProductFilter = { isActive: true }
      const filtered = filterProducts(mockProducts, filter)

      expect(filtered).toHaveLength(3)
      filtered.forEach((product) => {
        expect(product.isActive).toBe(true)
      })
    })

    it('should apply multiple filters simultaneously', () => {
      const filter: ProductFilter = {
        categoryId: 'cat1',
        minPrice: 50000,
        isActive: true,
      }
      const filtered = filterProducts(mockProducts, filter)

      expect(filtered).toHaveLength(2)
      filtered.forEach((product) => {
        expect(product.categoryId).toBe('cat1')
        expect(product.price).toBeGreaterThanOrEqual(50000)
        expect(product.isActive).toBe(true)
      })
    })

    it('should return empty array when no products match filter', () => {
      const filter: ProductFilter = { searchQuery: 'nonexistent' }
      const filtered = filterProducts(mockProducts, filter)

      expect(filtered).toHaveLength(0)
    })
  })
})
