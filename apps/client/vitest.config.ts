import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Plugins configuration
  plugins: [
    // Enable React support for JSX/TSX files
    react(),
  ],

  // Resolve configuration for path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@marketplace/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
      '@marketplace/utils': path.resolve(__dirname, '../../packages/utils/src/index.ts'),
    },
  },

  // Test configuration
  test: {
    // Use happy-dom for React component testing
    environment: 'happy-dom',

    // Global test APIs
    globals: true,

    // Setup files
    setupFiles: ['./tests/setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/app/**/*.tsx', // Exclude Next.js pages (tested with E2E)
      ],
    },

    // Include test files
    include: ['tests/**/*.{test,spec}.{ts,tsx}', 'src/**/*.{test,spec}.{ts,tsx}'],
  },
})
