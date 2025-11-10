# 🤖 Development Instructions (AI-Friendly)

This document provides clear instructions for AI assistants (Claude, Copilot, etc.) to help developers build features following this project's standards.

## 🎯 Core Principles

### 1. Test-Driven Development (TDD) is Non-Negotiable

**ALWAYS follow the Red-Green-Refactor cycle:**

1. **RED** - Write a failing test that defines the desired behavior
2. **GREEN** - Write the minimal code necessary to make the test pass
3. **REFACTOR** - Improve the code while keeping all tests passing

**Never write production code without a test first.**

## 📋 Project Structure

```
next-marketplace/
├── apps/client/          # Next.js 16 application
│   ├── src/app/
│   │   ├── (shop)/      # Customer routes (route group)
│   │   ├── (admin)/     # Admin routes (route group)
│   │   └── api/         # Next.js API routes
│   ├── tests/           # Unit/integration tests
│   └── e2e/             # Playwright E2E tests
│
└── packages/
    ├── database/        # Database layer (Supabase integration - future)
    └── utils/           # Shared utilities
```

## 🔧 Technology Stack

- **Framework**: Next.js 16 (App Router with Route Groups)
- **UI**: React 19 + TailwindCSS v4
- **Language**: TypeScript (strict mode enabled)
- **Testing**: Vitest + React Testing Library + Playwright
- **Monorepo**: Nx with pnpm workspaces
- **Code Quality**: ESLint (flat config) + Prettier + Husky

## 🚀 Feature Development Workflow

### Step 1: Understand the Requirement

Before writing any code:

- Clarify the feature requirements
- Identify the components/functions needed
- Determine test coverage strategy

### Step 2: Write Tests First (TDD)

**For new utilities/functions:**

```typescript
// packages/utils/src/index.test.ts
import { describe, it, expect } from 'vitest'
import { newUtilityFunction } from './index'

describe('newUtilityFunction', () => {
  it('should handle the basic case', () => {
    const result = newUtilityFunction('input')
    expect(result).toBe('expected output')
  })

  it('should handle edge cases', () => {
    expect(newUtilityFunction('')).toBe('')
    expect(newUtilityFunction(null)).toBe(null)
  })
})
```

**For React components:**

```typescript
// apps/client/tests/components/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, userEvent } from '@testing-library/react'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**For API routes:**

```typescript
// apps/client/tests/api/products.test.ts
import { describe, it, expect } from 'vitest'
import { GET } from '@/app/api/products/route'

describe('GET /api/products', () => {
  it('should return products list', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data.products)).toBe(true)
  })
})
```

### Step 3: Run Tests (Should Fail - RED)

```bash
pnpm test
# Tests should fail because implementation doesn't exist yet
```

### Step 4: Implement the Feature (GREEN)

Write the minimal code to make tests pass:

```typescript
// packages/utils/src/index.ts
export function newUtilityFunction(input: string): string {
  if (!input) return ''
  return `processed: ${input}`
}
```

### Step 5: Verify Tests Pass

```bash
pnpm test
# All tests should now pass
```

### Step 6: Refactor (if needed)

Improve code quality while keeping tests green:

- Extract duplicated logic
- Improve naming
- Add documentation
- Optimize performance

### Step 7: Add E2E Tests (for user-facing features)

```typescript
// apps/client/e2e/shop.spec.ts
import { test, expect } from '@playwright/test'

test('customer can view product catalog', async ({ page }) => {
  await page.goto('/shop')

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  await expect(page.getByTestId('product-grid')).toBeVisible()
})
```

## 📝 Code Style Guidelines

### TypeScript

- **Always use strict mode** (already configured)
- **Use explicit types** for function parameters and returns
- **Avoid `any`** - use proper types or `unknown`
- **Use type imports** for type-only imports

```typescript
// Good
import type { Product } from '@/types'

function getProduct(id: string): Promise<Product> {
  // implementation
}

// Bad
import { Product } from '@/types'

function getProduct(id) {
  // implementation
}
```

### React Components

- **Use functional components** with hooks
- **Destructure props** for clarity
- **Use TypeScript interfaces** for props

```typescript
// Good
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  )
}

// Bad
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### File Naming

- **Components**: PascalCase (`Button.tsx`, `ProductCard.tsx`)
- **Utilities**: camelCase (`formatCurrency.ts`, `validateEmail.ts`)
- **Tests**: Same as source with `.test.ts` or `.spec.ts` suffix
- **Types**: PascalCase (`User.ts`, `Product.ts`)

## 🧪 Testing Guidelines

### Unit Test Coverage

- **Utilities**: 100% coverage expected
- **Components**: Test behavior, not implementation
- **API routes**: Test all success and error paths

### What to Test

✅ **DO test:**

- Public API (exported functions/components)
- User interactions
- Error handling
- Edge cases
- Business logic

❌ **DON'T test:**

- Implementation details
- Third-party libraries
- Simple getters/setters
- CSS styles (use E2E for visual testing)

### Test Organization

```typescript
describe('ComponentName', () => {
  describe('feature A', () => {
    it('should handle case 1', () => {})
    it('should handle case 2', () => {})
  })

  describe('feature B', () => {
    it('should handle case 3', () => {})
  })
})
```

## 🏗️ Architecture Patterns

### Route Groups (Next.js)

```
app/
├── (shop)/          # Customer-facing routes
│   ├── layout.tsx   # Shop layout
│   └── shop/
│       └── page.tsx
│
└── (admin)/         # Admin routes
    ├── layout.tsx   # Admin layout
    └── admin/
        └── page.tsx
```

### API Routes

```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json({ products: [] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
```

### Shared Packages

```typescript
// packages/utils/src/index.ts
export { formatCurrency } from './formatCurrency'
export { capitalize } from './capitalize'

// Usage in apps
import { formatCurrency } from '@marketplace/utils'
```

## 🔄 Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(shop): add product filtering by category
fix(admin): correct user role validation
test(utils): add comprehensive tests for formatCurrency
docs: update API documentation
refactor(database): simplify connection logic
```

### Branch Naming

```bash
feat/add-product-filters
fix/user-role-validation
test/add-utils-tests
docs/update-readme
```

## 🚨 Common Mistakes to Avoid

1. ❌ Writing code before tests
2. ❌ Using `any` type in TypeScript
3. ❌ Skipping error handling
4. ❌ Not testing edge cases
5. ❌ Hardcoding values (use constants/env vars)
6. ❌ Ignoring TypeScript errors
7. ❌ Not following commit conventions
8. ❌ Pushing code without running tests

## ✅ Checklist for New Features

- [ ] Write failing tests first (RED)
- [ ] Implement minimal code (GREEN)
- [ ] Refactor for quality (REFACTOR)
- [ ] Add E2E tests if user-facing
- [ ] Update documentation if needed
- [ ] Run `pnpm lint` and fix issues
- [ ] Run `pnpm type-check` and fix errors
- [ ] Run `pnpm test` - all tests pass
- [ ] Commit with conventional message
- [ ] Create PR with description

## 🎓 Learning Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 💡 Tips for AI Assistants

When helping developers:

1. **Always suggest TDD approach** - tests first, then implementation
2. **Show complete examples** - don't skip test setup
3. **Explain the "why"** - not just the "how"
4. **Consider edge cases** - empty inputs, nulls, errors
5. **Follow project conventions** - use existing patterns
6. **Suggest refactoring** - after tests pass
7. **Recommend documentation** - for complex features

---

Remember: **Test First, Code Second, Refactor Third** - This is the way! 🚀
