const { test, expect } = require('@playwright/test');

test.describe('Intentional Failures - CI Verification', () => {

  test('this test passes - control case', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
    console.log('Control test passed as expected');
  });

  test('FAILS: wrong title assertion', async ({ page }) => {
    await page.goto('/');
    console.log('Attempting assertion that will fail...');
    await expect(page).toHaveTitle(/This Title Cannot Possibly Exist In Reality/);
  });

  test('FAILS: element does not exist', async ({ page }) => {
    await page.goto('/');
    const missingButton = page.getByRole('button', {
      name: 'This Button Does Not Exist'
    });
    await expect(missingButton).toBeVisible({ timeout: 3000 });
  });

  test('this test also passes - another control case', async ({ page }) => {
    await page.goto('/docs/intro');
    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
    console.log('Second control test passed as expected');
  });

});