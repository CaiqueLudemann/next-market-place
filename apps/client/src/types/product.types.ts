/**
 * Product-related type definitions for the marketplace
 */

export interface Product {
  id: string
  name: string
  description: string
  price: number // Price in cents
  currency: string
  imageUrl: string
  categoryId: string
  sellerId: string
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  parentId: string | null
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductFilter {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  searchQuery?: string
  sellerId?: string
  isActive?: boolean
}

export interface ProductFormData {
  name: string
  description: string
  price: number
  currency: string
  imageUrl: string
  categoryId: string
  stock: number
}
