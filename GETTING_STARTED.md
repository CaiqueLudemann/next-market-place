# 🚀 Getting Started

Welcome to the Next.js Marketplace! This guide will get you up and running in minutes.

## ⚡ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server
pnpm dev

# 3. Open your browser
# http://localhost:3000
```

That's it! You're ready to start developing.

## 🧪 Verify Installation

Run the test suite to ensure everything is working:

```bash
# Run all tests
pnpm test

# All tests should pass ✅
```

## 📂 Project Structure at a Glance

```
next-marketplace/
├── apps/client/          # Next.js 16 application
│   ├── src/app/
│   │   ├── (shop)/      # Customer routes (/shop/*)
│   │   ├── (admin)/     # Admin routes (/admin/*)
│   │   └── api/         # API routes
│   ├── tests/           # Unit tests
│   └── e2e/             # E2E tests
│
└── packages/
    ├── database/        # Database operations
    └── utils/           # Shared utilities
```

## 🎯 Your First Feature (TDD Approach)

Let's create a simple utility function using Test-Driven Development:

### 1. Write the Test First (RED 🔴)

```bash
# Create a test file
touch packages/utils/src/slugify.test.ts
```

```typescript
// packages/utils/src/slugify.test.ts
import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('should convert text to URL-friendly slug', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('should remove special characters', () => {
    expect(slugify('Hello @World!')).toBe('hello-world')
  })
})
```

### 2. Run Tests (Should Fail)

```bash
pnpm nx test utils
# ❌ Tests should fail - function doesn't exist yet
```

### 3. Implement the Function (GREEN 🟢)

```bash
# Create the implementation file
touch packages/utils/src/slugify.ts
```

```typescript
// packages/utils/src/slugify.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Export it
// packages/utils/src/index.ts
export { slugify } from './slugify'
```

### 4. Run Tests Again

```bash
pnpm nx test utils
# ✅ Tests should pass now!
```

### 5. Use in Your App

```typescript
// apps/client/src/app/(shop)/products/page.tsx
import { slugify } from '@marketplace/utils'

const productSlug = slugify('Amazing Product Name')
// Result: 'amazing-product-name'
```

## 📋 Common Commands

```bash
# Development
pnpm dev                # Start Next.js dev server
pnpm build              # Build for production

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Watch mode
pnpm test:e2e           # E2E tests

# Code Quality
pnpm lint               # Lint code
pnpm format             # Format with Prettier
pnpm type-check         # TypeScript check

# Nx Commands
pnpm nx test client     # Test specific project
pnpm nx build client    # Build specific project
pnpm affected:test      # Test only affected
```

## 🎨 Development Workflow

1. **Create a branch**

   ```bash
   git checkout -b feat/your-feature
   ```

2. **Write tests first** (TDD is mandatory!)

   ```bash
   # Write failing test
   pnpm test
   ```

3. **Implement the feature**

   ```bash
   # Make tests pass
   pnpm test
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feat/your-feature
   ```

## 🔧 VSCode Setup

### Install Recommended Extensions

Open VSCode and install the recommended extensions:

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Extensions: Show Recommended Extensions"
3. Click "Install All"

Key extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Vitest
- Playwright

### Enable Format on Save

VSCode settings are already configured in `.vscode/settings.json`. Just open the project and you're good to go!

## 📚 Next Steps

1. **Read the documentation**
   - [README.md](README.md) - Full project overview
   - [docs/TDD.md](docs/TDD.md) - TDD guide (mandatory reading!)
   - [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
   - [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) - Development guide

2. **Explore the codebase**
   - Check out the example components in `apps/client/src/app/`
   - Review the dummy functions in `packages/`
   - Look at the test examples

3. **Start building features**
   - Always start with tests (TDD)
   - Follow the commit conventions
   - Keep code quality high

## 🆘 Troubleshooting

### Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Tests failing

```bash
# Clear cache and reinstall
rm -rf node_modules .nx pnpm-lock.yaml
pnpm install
pnpm test
```

### TypeScript errors

```bash
# Rebuild TypeScript
pnpm type-check

# Check your tsconfig.json extends the base config
```

### Husky hooks not working

```bash
# Reinstall Husky
pnpm exec husky install
chmod +x .husky/*
```

## 💡 Tips

- **Always run tests** before committing
- **Follow TDD** - tests first, then implementation
- **Use Nx** - it's faster than running scripts directly
- **Commit often** - small, focused commits are better
- **Ask questions** - check documentation first, then ask

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

Happy coding! Remember: **Tests First, Code Second!** 🧪➡️💻
