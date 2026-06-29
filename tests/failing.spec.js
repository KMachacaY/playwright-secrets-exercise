const { test, expect } = require('@playwright/test');

test.describe('Intentional Failures - CI Verification', () => {

  test('this test passes - control case', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
    console.log('Control test passed as expected');
  });

  test('FIXED: correct title assertion', async ({ page }) => {
  await page.goto('/');
  console.log('Testing correct title assertion...');
  await expect(page).toHaveTitle(/Playwright/);
});

test('FIXED: element that actually exists', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Get started' });
  await expect(link).toBeVisible();
});

  test('this test also passes - another control case', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
    console.log('Second control test passed as expected');
  });

});