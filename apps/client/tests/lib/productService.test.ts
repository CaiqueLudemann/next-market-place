import { describe, it, expect, beforeEach } from 'vitest'
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getActiveProducts,
} from '@/lib/productService'
import type { Product } from '@/types/product.types'

describe('productService', () => {
  describe('getAllProducts', () => {
    it('should return an array of products', () => {
      const products = getAllProducts()

      expect(Array.isArray(products)).toBe(true)
      expect(products.length).toBeGreaterThan(0)
    })

    it('should return products with valid structure', () => {
      const products = getAllProducts()

      products.forEach((product) => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('price')
        expect(product).toHaveProperty('categoryId')
        expect(typeof product.id).toBe('string')
        expect(typeof product.name).toBe('string')
        expect(typeof product.price).toBe('number')
      })
    })

    it('should return consistent products on multiple calls', () => {
      const products1 = getAllProducts()
      const products2 = getAllProducts()

      expect(products1.length).toBe(products2.length)
      expect(products1[0].id).toBe(products2[0].id)
    })
  })

  describe('getProductById', () => {
    it('should return a product when given a valid ID', () => {
      const allProducts = getAllProducts()
      const firstProduct = allProducts[0]
      const foundProduct = getProductById(firstProduct.id)

      expect(foundProduct).toBeDefined()
      expect(foundProduct?.id).toBe(firstProduct.id)
      expect(foundProduct?.name).toBe(firstProduct.name)
    })

    it('should return undefined for non-existent ID', () => {
      const product = getProductById('non-existent-id')

      expect(product).toBeUndefined()
    })

    it('should return product with all required fields', () => {
      const allProducts = getAllProducts()
      const product = getProductById(allProducts[0].id)

      expect(product).toBeDefined()
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('description')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('imageUrl')
    })
  })

  describe('getProductsByCategory', () => {
    it('should return products for a given category', () => {
      const allProducts = getAllProducts()
      const categoryId = allProducts[0].categoryId
      const categoryProducts = getProductsByCategory(categoryId)

      expect(Array.isArray(categoryProducts)).toBe(true)
      categoryProducts.forEach((product) => {
        expect(product.categoryId).toBe(categoryId)
      })
    })

    it('should return empty array for non-existent category', () => {
      const products = getProductsByCategory('non-existent-category')

      expect(products).toEqual([])
    })

    it('should return different products for different categories', () => {
      const allProducts = getAllProducts()
      const category1 = allProducts[0].categoryId
      const category2 = allProducts.find((p) => p.categoryId !== category1)?.categoryId

      if (category2) {
        const products1 = getProductsByCategory(category1)
        const products2 = getProductsByCategory(category2)

        expect(products1.length).toBeGreaterThan(0)
        expect(products2.length).toBeGreaterThan(0)
        expect(products1[0].categoryId).toBe(category1)
        expect(products2[0].categoryId).toBe(category2)
      }
    })
  })

  describe('searchProducts', () => {
    it('should return products matching search query', () => {
      const allProducts = getAllProducts()
      const firstProductName = allProducts[0].name.split(' ')[0].toLowerCase()
      const results = searchProducts(firstProductName)

      expect(results.length).toBeGreaterThan(0)
      results.forEach((product) => {
        const matchesName = product.name.toLowerCase().includes(firstProductName)
        const matchesDescription = product.description.toLowerCase().includes(firstProductName)
        expect(matchesName || matchesDescription).toBe(true)
      })
    })

    it('should be case insensitive', () => {
      const allProducts = getAllProducts()
      const searchTerm = allProducts[0].name.split(' ')[0]
      const lowerResults = searchProducts(searchTerm.toLowerCase())
      const upperResults = searchProducts(searchTerm.toUpperCase())

      expect(lowerResults.length).toBe(upperResults.length)
    })

    it('should return empty array when no matches found', () => {
      const results = searchProducts('xyznonexistentquery123')

      expect(results).toEqual([])
    })

    it('should search in both name and description', () => {
      const allProducts = getAllProducts()
      // Get a word from description
      const descriptionWord = allProducts[0].description.split(' ')[0].toLowerCase()
      const results = searchProducts(descriptionWord)

      expect(results.length).toBeGreaterThan(0)
    })
  })

  describe('getActiveProducts', () => {
    it('should return only active products', () => {
      const activeProducts = getActiveProducts()

      expect(Array.isArray(activeProducts)).toBe(true)
      activeProducts.forEach((product) => {
        expect(product.isActive).toBe(true)
      })
    })

    it('should not include inactive products', () => {
      const activeProducts = getActiveProducts()
      const inactiveProduct = activeProducts.find((p) => !p.isActive)

      expect(inactiveProduct).toBeUndefined()
    })

    it('should return array with valid products', () => {
      const activeProducts = getActiveProducts()

      expect(activeProducts.length).toBeGreaterThan(0)
      activeProducts.forEach((product) => {
        expect(product).toHaveProperty('id')
        expect(product).toHaveProperty('name')
        expect(product.isActive).toBe(true)
      })
    })
  })
})
