import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Configuration
 *
 * Optimized for GitHub Actions to minimize credit usage while maintaining comprehensive E2E testing.
 * See https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI (saves resources)
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration - optimized for CI/CD
  reporter: [
    // Concise output for CI
    ['list'],
    // HTML report for debugging failures
    ['html', { open: 'never' }],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',

    // Collect trace on first retry for debugging
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',

    // Screenshot on failure only
    screenshot: process.env.CI ? 'only-on-failure' : 'off',

    // Video on failure only (saves storage)
    video: process.env.CI ? 'retain-on-failure' : 'off',
  },

  // Configure projects for different browsers
  // Only Chromium on CI to save credits, all browsers locally
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment these for local cross-browser testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    // Timeout for server to start
    timeout: 120 * 1000,
  },
})
