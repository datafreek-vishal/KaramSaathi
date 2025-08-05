import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/Karam Sathi/);
    
    // Check for key elements
    await expect(page.locator('text=Welcome to Karam Sathi')).toBeVisible();
    await expect(page.locator('text=Find Work')).toBeVisible();
    await expect(page.locator('text=Post Job')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Login button
    await page.click('text=Login');
    
    // Should navigate to login page
    await expect(page).toHaveURL('/en/auth/login');
    await expect(page.locator('text=Sign In to Your Account')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Sign Up button
    await page.click('text=Sign Up');
    
    // Should navigate to register page
    await expect(page).toHaveURL('/en/auth/register');
    await expect(page.locator('text=Create Your Account')).toBeVisible();
  });

  test('should navigate to worker dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Click on Find Work button
    await page.click('text=Find Work');
    
    // Should navigate to worker dashboard
    await expect(page).toHaveURL('/en/worker');
    await expect(page.locator('text=Find Jobs')).toBeVisible();
  });

  test('should navigate to employer dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Click on Post Job button
    await page.click('text=Post Job');
    
    // Should navigate to employer dashboard
    await expect(page).toHaveURL('/en/employer');
    await expect(page.locator('text=Post a Job')).toBeVisible();
  });
});
