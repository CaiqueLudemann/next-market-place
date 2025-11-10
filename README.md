# 🛍️ Next.js Marketplace

A production-ready white-label marketplace monorepo built with modern web technologies and best practices.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [VSCode Setup](#vscode-setup)

## 🎯 Overview

This monorepo provides a complete marketplace solution with:

- **Customer Portal** (`/shop/*`) - Product browsing, cart, checkout
- **Admin Dashboard** (`/admin/*`) - Product management, user management, analytics
- **Shared Packages** - Reusable utilities and database layer

Built with **Test-Driven Development (TDD)** as a core principle - all features must be tested before implementation.

## 🚀 Tech Stack

| Category              | Technology                        |
| --------------------- | --------------------------------- |
| **Framework**         | Next.js 16 (App Router)           |
| **UI Library**        | React 19                          |
| **Styling**           | TailwindCSS v4                    |
| **Language**          | TypeScript (Strict Mode)          |
| **Monorepo**          | Nx                                |
| **Package Manager**   | pnpm                              |
| **Unit Testing**      | Vitest + Happy-DOM                |
| **Component Testing** | React Testing Library             |
| **E2E Testing**       | Playwright                        |
| **Linting**           | ESLint (Flat Config)              |
| **Formatting**        | Prettier + EditorConfig           |
| **Git Hooks**         | Husky + lint-staged               |
| **Commit Convention** | Conventional Commits + Commitlint |
| **CI/CD**             | GitHub Actions                    |
| **Deployment**        | Vercel                            |

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 22.20.0 ([Download](https://nodejs.org/))
- **pnpm** >= 9.0.0 (Install: `npm install -g pnpm`)
- **Git** ([Download](https://git-scm.com/))

## 🏁 Getting Started

1. **Clone the repository**

   ```bash
   git clone git@github.com:CaiqueLudemann/next-market-place.git
   cd next-marketplace
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp apps/client/.env.example apps/client/.env.local
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   - Main app: [http://localhost:3000](http://localhost:3000)
   - Shop: [http://localhost:3000/shop](http://localhost:3000/shop)
   - Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Project Structure

```
next-marketplace/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml             # Continuous Integration
│       └── e2e.yml            # E2E Tests
│
├── .husky/                     # Git hooks
│   ├── pre-commit             # Lint and format staged files
│   ├── commit-msg             # Validate commit messages
│   └── pre-push               # Run tests before push
│
├── apps/
│   └── client/                # Next.js marketplace application
│       ├── src/
│       │   ├── app/
│       │   │   ├── (shop)/   # Customer-facing routes
│       │   │   ├── (admin)/  # Admin dashboard routes
│       │   │   └── api/      # API routes
│       │   ├── components/   # React components
│       │   ├── lib/          # Utilities and helpers
│       │   └── styles/       # Global styles
│       ├── e2e/              # Playwright E2E tests
│       ├── tests/            # Unit and integration tests
│       ├── public/           # Static assets
│       └── package.json
│
├── packages/
│   ├── database/             # Database layer (Supabase ready)
│   │   └── src/
│   │       ├── index.ts
│       └── index.test.ts
│   └── utils/                # Shared utilities
│       └── src/
│           ├── index.ts
│           └── index.test.ts
│
├── docs/                      # Documentation
│   └── INSTRUCTIONS.md       # AI-friendly development guide
│
├── .editorconfig             # Editor configuration
├── .prettierrc.json          # Prettier configuration
├── eslint.config.js          # ESLint configuration (flat config)
├── tsconfig.base.json        # Base TypeScript configuration
├── nx.json                   # Nx configuration
├── pnpm-workspace.yaml       # pnpm workspaces
└── package.json              # Root package.json
```

## 📜 Available Scripts

### Root Scripts (run from project root)

```bash
# Development
pnpm dev                # Start all apps in development mode
pnpm build              # Build all apps and packages
pnpm start              # Start production build

# Testing
pnpm test               # Run all unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:e2e           # Run E2E tests
pnpm test:coverage      # Run tests with coverage

# Code Quality
pnpm lint               # Lint all projects
pnpm format             # Format code with Prettier
pnpm format:check       # Check code formatting
pnpm type-check         # Type check all projects

# Nx Commands (run only affected projects)
pnpm affected:test      # Test only affected projects
pnpm affected:build     # Build only affected projects
pnpm affected:lint      # Lint only affected projects
```

### Client App Scripts (run from `apps/client/`)

```bash
pnpm dev                # Start Next.js dev server
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Lint client code
pnpm test               # Run unit tests
pnpm test:ui            # Run tests with UI
pnpm e2e                # Run E2E tests
pnpm e2e:ui             # Run E2E tests with UI
```

## 🔄 Development Workflow

### 1. TDD is Non-Negotiable

**All features MUST follow the Red-Green-Refactor cycle:**

1. **Red** - Write a failing test first
2. **Green** - Write minimal code to make the test pass
3. **Refactor** - Improve the code while keeping tests green

See [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) for detailed guidelines.

### 2. Branch Strategy

- `main` - Production branch (protected)
- Feature branches - `feat/feature-name`
- Bug fix branches - `fix/bug-description`

### 3. Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

**Examples:**

```bash
feat(shop): add product filtering by category
fix(admin): correct user role validation
test(utils): add tests for formatCurrency function
docs: update installation instructions
```

### 4. Pull Request Process

1. Create a feature branch from `main`
2. Write tests first (TDD)
3. Implement the feature
4. Ensure all tests pass
5. Create a pull request
6. Wait for CI/CD checks to pass
7. Get code review approval
8. Merge to `main`

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for specific package
pnpm nx test database
```

### E2E Tests (Playwright)

```bash
# Run E2E tests (headless)
pnpm test:e2e

# Run E2E tests with UI
pnpm nx e2e:ui client

# Run E2E tests in headed mode
pnpm nx e2e:headed client
```

### Coverage Thresholds

Minimum coverage requirements (enforced):

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

## 🎨 Code Quality

### Linting

```bash
# Lint all files
pnpm lint

# Lint and auto-fix
pnpm lint --fix

# Lint only affected projects
pnpm affected:lint
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Type Checking

```bash
# Type check all projects
pnpm type-check

# Type check specific project
pnpm nx type-check client
```

## 👥 Contributing

1. Read [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) for detailed guidelines
2. Follow the TDD workflow (mandatory)
3. Ensure all tests pass before submitting PR
4. Follow the commit message convention
5. Update documentation as needed

## 🛠️ VSCode Setup

### Recommended Extensions

Install these extensions for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`)
2. **Prettier** (`esbenp.prettier-vscode`)
3. **EditorConfig** (`editorconfig.editorconfig`)
4. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
5. **TypeScript Error Translator** (`mattpocock.ts-error-translator`)
6. **Vitest** (`vitest.explorer`)
7. **Playwright Test** (`ms-playwright.playwright`)
8. **GitLens** (`eamodio.gitlens`)
9. **Pretty TypeScript Errors** (`yoavbls.pretty-ts-errors`)

### Workspace Settings

The project includes VSCode workspace settings (`.vscode/settings.json`) that:

- Enable format on save
- Configure ESLint and Prettier
- Set up TypeScript preferences
- Configure Tailwind IntelliSense

## 📚 Documentation

- [AI Development Guide](docs/INSTRUCTIONS.md)

## 📝 License

MIT

## 🤝 Support

For issues and questions:

- Create an issue in the GitHub repository
- Check existing documentation in `/docs`

---

Built with ❤️ following TDD principles and modern best practices.
