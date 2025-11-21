import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'
import { generateMockProduct } from '@/lib/mockProducts'
import { formatCurrency } from '@marketplace/utils'

describe('ProductCard', () => {
  const mockProduct = generateMockProduct({
    id: 'test-1',
    name: 'Test Product',
    description: 'A great test product',
    price: 4999, // $49.99
    imageUrl: 'https://example.com/image.jpg',
    stock: 10,
  })

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('should render formatted price', () => {
    render(<ProductCard product={mockProduct} />)

    const formattedPrice = formatCurrency(4999, 'USD')
    expect(screen.getByText(formattedPrice)).toBeInTheDocument()
  })

  it('should render product image with correct src and alt', () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByRole('img', { name: 'Test Product' })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src')
  })

  it('should render product description', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('A great test product')).toBeInTheDocument()
  })

  it('should show "Out of Stock" when stock is 0', () => {
    const outOfStockProduct = generateMockProduct({
      ...mockProduct,
      stock: 0,
    })
    render(<ProductCard product={outOfStockProduct} />)

    expect(screen.getByText(/out of stock/i)).toBeInTheDocument()
  })

  it('should show "In Stock" when stock is available', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText(/in stock/i)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Test Product')
  })

  it('should render as a link to product detail page', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/test-1')
  })
})
