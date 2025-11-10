// ESLint Flat Config (Modern format for ESLint 9+)
// Replaces the legacy .eslintrc.json format

import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Ignore patterns - files/directories to skip linting
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.nx/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },

  // Base JavaScript recommended rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
  },

  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // TypeScript-specific rules

      // Enforce explicit return types on functions (helps with type safety)
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Warn on unused variables (but allow underscore-prefixed vars)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Disallow explicit 'any' types (forces proper typing)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Enforce consistent interface naming (no 'I' prefix)
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],

      // Require consistent use of type imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },

  // React configuration
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // React-specific customizations

      // Disable prop-types (we use TypeScript)
      'react/prop-types': 'off',

      // Allow JSX in .tsx files
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],

      // Enforce React hooks rules (prevents common mistakes)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Require React to be in scope (disabled for React 17+)
      'react/react-in-jsx-scope': 'off',

      // Enforce self-closing for components without children
      'react/self-closing-comp': 'error',

      // Warn on missing keys in lists
      'react/jsx-key': 'warn',
    },
  },

  // Next.js configuration
  {
    files: ['apps/client/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // General JavaScript/TypeScript rules (all files)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Code quality rules

      // Disallow console.log in production code (use proper logging)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Disallow debugger statements
      'no-debugger': 'error',

      // Enforce === instead of ==
      eqeqeq: ['error', 'always'],

      // Disallow var (use const/let)
      'no-var': 'error',

      // Prefer const over let when possible
      'prefer-const': 'error',

      // Require curly braces for all control statements
      curly: ['error', 'all'],

      // Disallow multiple empty lines
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // Enforce consistent spacing
      'object-curly-spacing': ['error', 'always'],

      // Require semicolons (configured via Prettier)
      semi: 'off', // Handled by Prettier
    },
  },
]
