# Claude Code Review Guidelines

This document provides guidelines for Claude AI to review pull requests in this Next.js marketplace monorepo.

## Project Overview

**Type**: White-label marketplace monorepo
**Framework**: Next.js 16 (App Router) + React 19
**Language**: TypeScript (strict mode)
**Styling**: TailwindCSS v4
**Monorepo**: Nx + pnpm workspaces
**Testing**: Vitest + React Testing Library + Playwright

## Core Philosophy

### Test-Driven Development (TDD) is Mandatory

**Every feature MUST follow Red-Green-Refactor:**

1. **RED** - Write failing tests first
2. **GREEN** - Write minimal code to pass tests
3. **REFACTOR** - Improve code while keeping tests green

**Critical**: Production code without tests is unacceptable.

## Code Review Focus Areas

### 1. Test Coverage (Highest Priority)

✅ **Verify:**

- Every new function/component has corresponding tests
- Tests were written BEFORE implementation (check commit history if possible)
- Tests cover happy paths AND edge cases
- Tests follow AAA pattern (Arrange, Act, Assert)
- E2E tests exist for user-facing features

❌ **Flag as Critical:**

- Missing tests for new functionality
- Tests added as an afterthought
- Incomplete test coverage for edge cases
- Tests that test implementation details instead of behavior

**Example of good test:**

```typescript
describe('formatCurrency', () => {
  it('should format cents to USD currency', () => {
    expect(formatCurrency(1299, 'USD')).toBe('$12.99')
  })

  it('should handle zero amount', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00')
  })

  it('should handle negative amounts', () => {
    expect(formatCurrency(-500, 'USD')).toBe('-$5.00')
  })
})
```

### 2. TypeScript Type Safety

✅ **Verify:**

- All function parameters have explicit types
- Return types are declared for functions
- No use of `any` type (use `unknown` if necessary)
- Type imports use `import type` syntax
- Interfaces/types are properly defined

❌ **Flag as Issues:**

- `any` type usage
- Missing parameter types
- Missing return type annotations
- Implicit `any` from missing types
- Type assertions without justification

**Example of good TypeScript:**

```typescript
// Good
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart: (id: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps): JSX.Element {
  // implementation
}

// Bad - avoid this
export function ProductCard(props) {
  // implementation
}
```

### 3. Security Issues

✅ **Check for:**

- SQL injection vulnerabilities
- XSS vulnerabilities (unsanitized user input)
- CSRF protection on mutations
- Exposed secrets or API keys
- Insecure authentication/authorization
- Input validation on API routes

❌ **Flag as Critical:**

- Direct database queries with string concatenation
- `dangerouslySetInnerHTML` without sanitization
- API keys in code
- Missing authentication checks
- Unvalidated user inputs

### 4. Next.js & React Best Practices

✅ **Verify:**

- Server Components vs Client Components used appropriately
- Route groups `(shop)` and `(admin)` respected
- API routes follow proper structure
- Error boundaries implemented
- Loading states handled
- Proper use of Next.js 16 features

❌ **Flag as Issues:**

- Incorrect use of "use client" directive
- API routes with weak error handling
- Missing loading states
- Improper data fetching patterns
- Hydration mismatches

### 5. Code Quality & Maintainability

✅ **Verify:**

- Functions are small and focused (single responsibility)
- Meaningful variable/function names
- No duplicated code
- Error handling is comprehensive
- Comments explain "why", not "what"
- Consistent with existing codebase patterns

❌ **Flag as Issues:**

- Functions longer than 50 lines
- Magic numbers without constants
- Duplicated logic across files
- Poor variable naming (`x`, `temp`, `data`)
- Missing error handling
- Commented-out code

### 6. Performance Considerations

✅ **Look for:**

- Unnecessary re-renders (React)
- Unoptimized images (use next/image)
- Missing memoization where appropriate
- Efficient database queries
- Proper caching strategies

❌ **Flag as Concerns:**

- Large bundle sizes
- N+1 query problems
- Unnecessary useEffect dependencies
- Missing React.memo where beneficial
- Blocking synchronous operations

### 7. Monorepo Structure

✅ **Verify:**

- Workspace packages used correctly (`@marketplace/utils`, `@marketplace/database`)
- Dependencies properly declared in package.json
- No circular dependencies
- Shared code in packages, not apps
- Proper exports from packages

❌ **Flag as Issues:**

- Direct imports from other apps
- Duplicated utilities across packages
- Missing package dependencies
- Improper workspace protocol usage

## Review Output Format

Structure your review as follows:

### Critical Issues 🔴

List any issues that MUST be fixed before merge:

- Security vulnerabilities
- Missing tests for new functionality
- Type safety violations
- Breaking changes

### Important Issues 🟡

List issues that should be addressed:

- Code quality problems
- Missing error handling
- Performance concerns
- Incomplete test coverage

### Suggestions 🟢

Optional improvements:

- Refactoring opportunities
- Performance optimizations
- Better naming conventions

### Positive Feedback ✅

Highlight good practices:

- Excellent test coverage
- Clean architecture
- Good type safety
- Performance optimizations

## What NOT to Flag

Skip these (linters handle them):

- ❌ Code formatting (Prettier handles this)
- ❌ Import ordering (ESLint handles this)
- ❌ Semicolons/quotes (configured in Prettier)
- ❌ Indentation (EditorConfig handles this)

## Example Review

```markdown
## Critical Issues 🔴

1. **Missing Tests** (src/utils/validateEmail.ts)
   - New `validateEmail` function has no test coverage
   - Required: Add tests covering valid emails, invalid formats, and edge cases

2. **Type Safety** (src/components/ProductCard.tsx:15)
   - Using `any` type for `product` parameter
   - Fix: Create proper `Product` interface

## Important Issues 🟡

1. **Error Handling** (src/app/api/products/route.ts:20)
   - API route missing try-catch for database operations
   - Could expose internal errors to client

2. **Performance** (src/app/(shop)/products/page.tsx:30)
   - Fetching all products without pagination
   - Consider implementing pagination for better performance

## Suggestions 🟢

1. **Refactoring** (src/components/Button.tsx)
   - Consider extracting variant styles to constants
   - Would improve maintainability

## Positive Feedback ✅

- Excellent test coverage for utility functions (100%)
- Clean component structure following project patterns
- Proper TypeScript usage throughout
- Good error boundary implementation
```

## Decision Framework

### When to BLOCK merge (Critical Issues):

- Missing tests for new functionality
- Security vulnerabilities
- Type safety violations (`any` usage)
- Breaking changes without migration plan
- Exposed secrets/credentials

### When to REQUEST changes (Important):

- Incomplete error handling
- Missing edge case tests
- Performance concerns
- Code quality issues

### When to SUGGEST (Nice to have):

- Refactoring opportunities
- Minor performance improvements
- Documentation additions
- Better naming conventions

## Tone & Communication

- **Be specific**: Reference file paths and line numbers
- **Be constructive**: Explain WHY something is an issue
- **Be educational**: Link to docs when suggesting improvements
- **Be concise**: Focus on issues that matter
- **Be consistent**: Apply same standards across all reviews

## Context Awareness

Consider:

- Is this a draft PR or ready for review?
- Is this a small fix or major feature?
- Are there related PRs that provide context?
- Is the code consistent with the existing codebase?

## Final Checklist

Before finalizing review, verify:

- [ ] Checked for missing tests (TDD compliance)
- [ ] Verified TypeScript type safety
- [ ] Looked for security vulnerabilities
- [ ] Reviewed error handling
- [ ] Checked Next.js/React best practices
- [ ] Considered performance implications
- [ ] Verified monorepo structure compliance
- [ ] Provided specific, actionable feedback

---

**Remember**: The goal is to maintain high code quality while helping developers learn and improve. Focus on critical issues first, be specific with feedback, and recognize good practices.
