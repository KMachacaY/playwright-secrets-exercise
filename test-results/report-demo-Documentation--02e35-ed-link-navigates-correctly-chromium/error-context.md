# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: report-demo.spec.js >> Documentation Site Tests >> get started link navigates correctly
- Location: tests\report-demo.spec.js:11:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://playwright.dev/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Documentation Site Tests', () => {
  4  | 
  5  |   test('homepage loads correctly', async ({ page }) => {
  6  |     await page.goto('/');
  7  |     await expect(page).toHaveTitle(/Playwright/);
  8  |     await expect(page.locator('nav')).toBeVisible();
  9  |   });
  10 | 
  11 |   test('get started link navigates correctly', async ({ page }) => {
> 12 |     await page.goto('/');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  13 |     await page.getByRole('link', { name: 'Get started' }).click();
  14 |     await expect(page).toHaveURL(/.*intro/);
  15 |   });
  16 | 
  17 |   test('docs page has installation heading', async ({ page }) => {
  18 |     await page.goto('/docs/intro');
  19 |     await expect(
  20 |       page.getByRole('heading', { name: 'Installation' })
  21 |     ).toBeVisible();
  22 |   });
  23 | 
  24 |   test('page has navigation links', async ({ page }) => {
  25 |     await page.goto('/');
  26 |     const links = page.getByRole('link');
  27 |     const count = await links.count();
  28 |     console.log(`Found ${count} links on the page`);
  29 |     expect(count).toBeGreaterThan(5);
  30 |   });
  31 | 
  32 | });
  33 | 
  34 | test.describe('API Configuration Tests', () => {
  35 | 
  36 |   test('base URL is accessible', async ({ page }) => {
  37 |     const response = await page.goto('/');
  38 |     expect(response.status()).toBe(200);
  39 |   });
  40 | 
  41 |   test('environment variables are readable', async ({ page }) => {
  42 |     const apiUrl = process.env.API_URL || 'https://playwright.dev';
  43 |     console.log(`Test running against: ${apiUrl}`);
  44 |     await page.goto('/');
  45 |     await expect(page).toHaveTitle(/Playwright/);
  46 |   });
  47 | 
  48 | });
```