import { test, expect } from '@playwright/test'

/**
 * Example E2E Test
 *
 * This demonstrates the E2E testing setup with Playwright.
 * Following TDD, you'll write E2E tests for critical user journeys.
 */

test.describe('Homepage', () => {
  test('should display the welcome message', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Check if the welcome heading is visible
    await expect(page.getByRole('heading', { name: /Welcome to Marketplace/i })).toBeVisible()
  })

  test('should navigate to shop page', async ({ page }) => {
    await page.goto('/')

    // Click the Shop link
    await page.getByRole('link', { name: /Shop/i }).click()

    // Verify we're on the shop page
    await expect(page).toHaveURL('/shop')
    await expect(page.getByRole('heading', { name: /Shop/i })).toBeVisible()
  })

  test('should navigate to admin page', async ({ page }) => {
    await page.goto('/')

    // Click the Admin link
    await page.getByRole('link', { name: /Admin/i }).click()

    // Verify we're on the admin page
    await expect(page).toHaveURL('/admin')
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible()
  })
})
