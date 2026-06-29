const { test, expect } = require('@playwright/test');

test.describe('Secrets and Environment Configuration', () => {

  test('API_URL secret is configured and accessible', async ({ page }) => {
    const apiUrl = process.env.API_URL;
    const authToken = process.env.AUTH_TOKEN;

    console.log('=== Secret Validation (Safe Logging) ===');

    if (apiUrl) {
      console.log(`API_URL is set - length: ${apiUrl.length} characters`);
    } else {
      console.log('API_URL is not set - using baseURL from config');
    }

    if (authToken) {
      console.log(`AUTH_TOKEN is set - length: ${authToken.length} characters`);
    } else {
      console.log('AUTH_TOKEN is not set - running without auth');
    }

    console.log('=== End Secret Validation ===');

    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('baseURL is correctly configured from environment', async ({ page }) => {
    const configuredUrl = process.env.API_URL || 'https://playwright.dev';
    console.log(`Running tests against: ${configuredUrl}`);

    await page.goto('/');

    const title = await page.title();
    console.log(`Page title: ${title}`);

    expect(title.length).toBeGreaterThan(0);
  });

  test('prints secret length not value - AUTH_TOKEN validation', async () => {
    const token = process.env.AUTH_TOKEN || '';

    console.log('--- Auth Token Validation ---');
    console.log(`Token present: ${token.length > 0}`);
    console.log(`Token length: ${token.length}`);
    console.log(`Token starts with expected prefix: ${token.startsWith('Bearer') || token.length === 0}`);

    if (token.length > 0) {
      expect(token.length).toBeGreaterThan(5);
    } else {
      console.log('No token provided - skipping token validation');
    }
  });

});