# 🧪 Test-Driven Development (TDD) Guide

## What is TDD?

Test-Driven Development is a software development approach where you write tests **before** writing the actual code. This ensures your code is testable, maintainable, and meets requirements.

## Why TDD?

✅ **Higher code quality** - Tests catch bugs early
✅ **Better design** - Writing tests first leads to better architecture
✅ **Confidence** - Refactor without fear of breaking things
✅ **Documentation** - Tests serve as living documentation
✅ **Faster debugging** - Know exactly what broke and where

## The Red-Green-Refactor Cycle

TDD follows a simple three-step cycle:

### 🔴 RED - Write a Failing Test

Write a test that describes the desired behavior. The test should fail because the feature doesn't exist yet.

```typescript
// packages/utils/src/formatPrice.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('should format price with currency symbol', () => {
    const result = formatPrice(1999, 'USD')
    expect(result).toBe('$19.99')
  })
})
```

**Run the test** - It should fail (RED) ❌

```bash
pnpm test
# ❌ Error: Cannot find module './formatPrice'
```

### 🟢 GREEN - Make it Pass

Write the **minimum code** necessary to make the test pass. Don't worry about perfection yet.

```typescript
// packages/utils/src/formatPrice.ts
export function formatPrice(cents: number, currency: string): string {
  const dollars = cents / 100
  return `$${dollars.toFixed(2)}`
}
```

**Run the test again** - It should pass (GREEN) ✅

```bash
pnpm test
# ✅ Test passed!
```

### 🔵 REFACTOR - Improve the Code

Now that the test passes, improve the code quality while keeping tests green.

```typescript
// packages/utils/src/formatPrice.ts
export function formatPrice(cents: number, currency: string = 'USD'): string {
  const amount = cents / 100

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}
```

**Run tests again** - Still passing ✅

Add more test cases:

```typescript
describe('formatPrice', () => {
  it('should format price with USD currency', () => {
    expect(formatPrice(1999, 'USD')).toBe('$19.99')
  })

  it('should format price with EUR currency', () => {
    expect(formatPrice(1999, 'EUR')).toBe('€19.99')
  })

  it('should handle zero amount', () => {
    expect(formatPrice(0, 'USD')).toBe('$0.00')
  })

  it('should handle large amounts', () => {
    expect(formatPrice(123456789, 'USD')).toBe('$1,234,567.89')
  })
})
```

## TDD Examples in This Project

### Example 1: Utility Function

**Requirement**: Create a function to validate email addresses.

#### Step 1: RED - Write the test

```typescript
// packages/utils/src/validateEmail.test.ts
import { describe, it, expect } from 'vitest'
import { validateEmail } from './validateEmail'

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('should return false for email without @', () => {
    expect(validateEmail('userexample.com')).toBe(false)
  })

  it('should return false for email without domain', () => {
    expect(validateEmail('user@')).toBe(false)
  })
})
```

#### Step 2: GREEN - Implement

```typescript
// packages/utils/src/validateEmail.ts
export function validateEmail(email: string): boolean {
  if (!email) return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

#### Step 3: REFACTOR - Improve

```typescript
// packages/utils/src/validateEmail.ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates an email address format
 * @param email - The email string to validate
 * @returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  return EMAIL_REGEX.test(email.trim())
}
```

### Example 2: React Component

**Requirement**: Create a product card component.

#### Step 1: RED - Write the test

```typescript
// apps/client/tests/components/ProductCard.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 1999,
    image: '/test-image.jpg',
  }

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('should render formatted price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$19.99')).toBeInTheDocument()
  })

  it('should render product image', () => {
    render(<ProductCard product={mockProduct} />)
    const image = screen.getByRole('img', { name: 'Test Product' })
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<ProductCard product={mockProduct} onClick={handleClick} />)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledWith(mockProduct)
  })
})
```

#### Step 2: GREEN - Implement

```typescript
// apps/client/src/components/ProductCard.tsx
import Image from 'next/image'
import { formatPrice } from '@marketplace/utils'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{formatPrice(product.price, 'USD')}</p>
      {onClick && (
        <button onClick={() => onClick(product)}>
          Add to Cart
        </button>
      )}
    </div>
  )
}
```

#### Step 3: REFACTOR - Improve

```typescript
// apps/client/src/components/ProductCard.tsx
import Image from 'next/image'
import { formatPrice } from '@marketplace/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onClick?: (product: Product) => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const handleClick = () => {
    onClick?.(product)
  }

  return (
    <article className="group border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="relative aspect-square mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {product.name}
      </h3>

      <p className="text-xl font-bold text-blue-600 mb-4">
        {formatPrice(product.price, 'USD')}
      </p>

      {onClick && (
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      )}
    </article>
  )
}
```

### Example 3: API Route

**Requirement**: Create an API endpoint to fetch products.

#### Step 1: RED - Write the test

```typescript
// apps/client/tests/api/products/route.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { GET } from '@/app/api/products/route'

describe('GET /api/products', () => {
  it('should return 200 status', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
  })

  it('should return array of products', async () => {
    const response = await GET()
    const data = await response.json()

    expect(Array.isArray(data.products)).toBe(true)
  })

  it('should return products with correct structure', async () => {
    const response = await GET()
    const data = await response.json()

    if (data.products.length > 0) {
      const product = data.products[0]
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
    }
  })
})
```

#### Step 2: GREEN - Implement

```typescript
// apps/client/src/app/api/products/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const products = [
    { id: '1', name: 'Product 1', price: 1999 },
    { id: '2', name: 'Product 2', price: 2999 },
  ]

  return NextResponse.json({ products })
}
```

#### Step 3: REFACTOR - Improve

```typescript
// apps/client/src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  image?: string
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database query
    const products: Product[] = await fetchProductsFromDatabase()

    return NextResponse.json({ products, total: products.length }, { status: 200 })
  } catch (error) {
    console.error('Error fetching products:', error)

    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// Placeholder function - will be replaced with real DB query
async function fetchProductsFromDatabase(): Promise<Product[]> {
  return [
    { id: '1', name: 'Product 1', price: 1999 },
    { id: '2', name: 'Product 2', price: 2999 },
  ]
}
```

## Best Practices

### 1. Start Simple

Don't try to test everything at once. Start with the simplest case:

```typescript
// Good - Start simple
it('should add two numbers', () => {
  expect(add(1, 1)).toBe(2)
})

// Then add complexity
it('should handle negative numbers', () => {
  expect(add(-1, 1)).toBe(0)
})
```

### 2. One Assertion Per Test (usually)

```typescript
// Good
it('should return user name', () => {
  expect(user.getName()).toBe('John')
})

it('should return user email', () => {
  expect(user.getEmail()).toBe('john@example.com')
})

// Acceptable for related assertions
it('should create valid user object', () => {
  expect(user.name).toBe('John')
  expect(user.email).toBe('john@example.com')
})
```

### 3. Test Behavior, Not Implementation

```typescript
// Bad - Testing implementation
it('should call fetchData method', () => {
  const spy = vi.spyOn(service, 'fetchData')
  service.getData()
  expect(spy).toHaveBeenCalled()
})

// Good - Testing behavior
it('should return user data', async () => {
  const data = await service.getData()
  expect(data).toEqual({ name: 'John', email: 'john@example.com' })
})
```

### 4. Use Descriptive Test Names

```typescript
// Bad
it('works', () => {})
it('test 1', () => {})

// Good
it('should format price with currency symbol', () => {})
it('should return error when email is invalid', () => {})
it('should disable button when form is submitting', () => {})
```

### 5. Test Edge Cases

Always test:

- Empty inputs (`''`, `[]`, `{}`)
- Null/undefined
- Boundary values (0, -1, max values)
- Error conditions

```typescript
describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5)
  })

  it('should throw error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero')
  })

  it('should handle negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5)
  })
})
```

## Common TDD Patterns

### Arrange-Act-Assert (AAA)

```typescript
it('should add item to cart', () => {
  // Arrange - Set up test data
  const cart = new ShoppingCart()
  const item = { id: '1', name: 'Product', price: 1999 }

  // Act - Perform the action
  cart.addItem(item)

  // Assert - Verify the result
  expect(cart.items).toHaveLength(1)
  expect(cart.items[0]).toEqual(item)
})
```

### Given-When-Then (BDD Style)

```typescript
it('should calculate total price', () => {
  // Given a cart with items
  const cart = new ShoppingCart()
  cart.addItem({ id: '1', price: 1000 })
  cart.addItem({ id: '2', price: 2000 })

  // When calculating total
  const total = cart.getTotal()

  // Then total should be sum of prices
  expect(total).toBe(3000)
})
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test formatPrice.test.ts

# Run tests for specific package
pnpm nx test utils
```

## Summary

✅ **Always write tests first**
✅ **Start with the simplest case**
✅ **Add complexity gradually**
✅ **Refactor only after tests pass**
✅ **Test behavior, not implementation**
✅ **Keep tests simple and focused**

Remember: **RED → GREEN → REFACTOR** is the TDD mantra! 🔴🟢🔵
