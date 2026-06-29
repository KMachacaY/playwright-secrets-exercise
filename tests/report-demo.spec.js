const { test, expect } = require('@playwright/test');

test.describe('Documentation Site Tests', () => {

  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.locator('nav')).toBeVisible();
  });

  test('get started link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
  });

  test('docs page has installation heading', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
  });

  test('page has navigation links', async ({ page }) => {
    await page.goto('/');
    const links = page.getByRole('link');
    const count = await links.count();
    console.log(`Found ${count} links on the page`);
    expect(count).toBeGreaterThan(5);
  });

});

test.describe('API Configuration Tests', () => {

  test('base URL is accessible', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
  });

  test('environment variables are readable', async ({ page }) => {
    const apiUrl = process.env.API_URL || 'https://playwright.dev';
    console.log(`Test running against: ${apiUrl}`);
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });

});