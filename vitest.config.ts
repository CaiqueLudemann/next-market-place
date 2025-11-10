import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  // Resolve configuration for path aliases
  resolve: {
    alias: {
      '@marketplace/database': path.resolve(__dirname, './packages/database/src/index.ts'),
      '@marketplace/utils': path.resolve(__dirname, './packages/utils/src/index.ts'),
    },
  },

  // Test configuration
  test: {
    // Use happy-dom as the test environment (lightweight DOM implementation)
    environment: 'happy-dom',

    // Global test APIs (describe, it, expect, etc.) without imports
    globals: true,

    // Setup files to run before each test file
    setupFiles: [],

    // Coverage configuration
    coverage: {
      // Coverage provider
      provider: 'v8',

      // Coverage thresholds - enforce minimum coverage
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },

      // Files to include in coverage
      include: ['apps/*/src/**/*.{ts,tsx}', 'packages/*/src/**/*.ts'],

      // Files to exclude from coverage
      exclude: [
        'node_modules/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/dist/**',
        '**/.next/**',
      ],

      // Reporter formats
      reporter: ['text', 'json', 'html'],
    },

    // Include patterns for test files
    include: ['**/*.{test,spec}.{ts,tsx}'],

    // Exclude patterns
    exclude: ['node_modules', 'dist', '.next', 'build', 'e2e'],
  },
})
