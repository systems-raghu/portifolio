import { test, expect } from '@playwright/test';

test('verify home and niche pages', async ({ page }) => {
  await page.goto('http://localhost:4173/');
  await expect(page).toHaveTitle(/raghu.systems — AI Systems Builder/);

  const saasLink = page.locator('text=SaaS & Tech Startups');
  await saasLink.click();

  await expect(page).toHaveURL(/.*solutions\/saas/);
  await expect(page.locator('h1')).toContainText('AI Automation for SaaS');
});
