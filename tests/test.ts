import { test, expect } from '@playwright/test';

test('home page', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('heading', { name: 'Cobra Events' })).toBeVisible();
});
