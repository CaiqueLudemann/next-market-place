/**
 * Mock product data generator for development and testing
 */

import type { Product, ProductCategory, ProductFilter } from '@/types/product.types'

// Mock categories for the marketplace
const MOCK_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    parentId: null,
  },
  {
    id: 'cat-clothing',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Apparel and fashion items',
    parentId: null,
  },
  {
    id: 'cat-home',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home decor and garden supplies',
    parentId: null,
  },
  {
    id: 'cat-books',
    name: 'Books',
    slug: 'books',
    description: 'Books and reading materials',
    parentId: null,
  },
  {
    id: 'cat-sports',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Sports equipment and outdoor gear',
    parentId: null,
  },
]

// Sample product names by category
const PRODUCT_NAMES: Record<string, string[]> = {
  'cat-electronics': [
    'Wireless Headphones',
    'Smart Watch',
    'Laptop Stand',
    'USB-C Hub',
    'Mechanical Keyboard',
    'Webcam HD',
    'Portable Charger',
    'Bluetooth Speaker',
  ],
  'cat-clothing': [
    'Cotton T-Shirt',
    'Denim Jeans',
    'Running Shoes',
    'Winter Jacket',
    'Casual Sneakers',
    'Leather Wallet',
    'Baseball Cap',
    'Yoga Pants',
  ],
  'cat-home': [
    'Coffee Maker',
    'Table Lamp',
    'Throw Pillow',
    'Wall Clock',
    'Plant Pot',
    'Kitchen Knife Set',
    'Candle Set',
    'Bath Towels',
  ],
  'cat-books': [
    'The Great Novel',
    'Programming Guide',
    'Cookbook Collection',
    'History of Art',
    'Science Fiction Anthology',
    'Business Strategy',
    'Travel Guide',
    'Mystery Thriller',
  ],
  'cat-sports': [
    'Yoga Mat',
    'Dumbbell Set',
    'Tennis Racket',
    'Camping Tent',
    'Bicycle Helmet',
    'Water Bottle',
    'Resistance Bands',
    'Running Backpack',
  ],
}

// Sample product descriptions
const DESCRIPTIONS = [
  'High-quality product with excellent durability and performance.',
  'Perfect for everyday use, combining style and functionality.',
  'Premium materials and craftsmanship for lasting value.',
  'Designed with attention to detail and user comfort in mind.',
  'A must-have item for enthusiasts and beginners alike.',
  'Exceptional quality at an affordable price point.',
  'Innovative design meets practical functionality.',
  'Built to last with a focus on sustainability.',
]

// Sample image URLs (using placeholder service)
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800',
  'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
  'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800',
]

/**
 * Generates a single mock product with optional overrides
 */
export function generateMockProduct(overrides: Partial<Product> = {}): Product {
  const categoryKeys = Object.keys(PRODUCT_NAMES)
  const randomCategoryId = categoryKeys[Math.floor(Math.random() * categoryKeys.length)] as string
  const categoryProducts = PRODUCT_NAMES[randomCategoryId] ?? PRODUCT_NAMES['cat-electronics']!
  const randomName = categoryProducts[Math.floor(Math.random() * categoryProducts.length)]!
  const randomDescription = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]!
  const randomImage = PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)]!
  const randomPrice = Math.floor(Math.random() * 50000) + 1000 // $10 to $500
  const randomStock = Math.floor(Math.random() * 100)
  const now = new Date()

  return {
    id: `prod-${Math.random().toString(36).substring(2, 11)}`,
    name: randomName,
    description: randomDescription,
    price: randomPrice,
    currency: 'USD',
    imageUrl: randomImage,
    categoryId: randomCategoryId,
    sellerId: `seller-${Math.random().toString(36).substring(2, 7)}`,
    stock: randomStock,
    isActive: true,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

/**
 * Generates multiple mock products
 */
export function generateMockProducts(count: number = 10): Product[] {
  return Array.from({ length: count }, () => generateMockProduct())
}

/**
 * Generates a single mock category with optional overrides
 */
export function generateMockCategory(overrides: Partial<ProductCategory> = {}): ProductCategory {
  return {
    id: `cat-${Math.random().toString(36).substring(2, 11)}`,
    name: 'Sample Category',
    slug: 'sample-category',
    description: 'A sample category for testing',
    parentId: null,
    ...overrides,
  }
}

/**
 * Returns the predefined mock categories
 */
export function getMockCategories(): ProductCategory[] {
  return MOCK_CATEGORIES
}

/**
 * Filters products based on provided criteria
 */
export function filterProducts(products: Product[], filter: ProductFilter): Product[] {
  let filtered = products

  // Filter by category
  if (filter.categoryId) {
    filtered = filtered.filter((p) => p.categoryId === filter.categoryId)
  }

  // Filter by minimum price
  if (filter.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filter.minPrice!)
  }

  // Filter by maximum price
  if (filter.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filter.maxPrice!)
  }

  // Filter by search query (searches in name and description)
  if (filter.searchQuery) {
    const query = filter.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    )
  }

  // Filter by seller
  if (filter.sellerId) {
    filtered = filtered.filter((p) => p.sellerId === filter.sellerId)
  }

  // Filter by active status
  if (filter.isActive !== undefined) {
    filtered = filtered.filter((p) => p.isActive === filter.isActive)
  }

  return filtered
}
