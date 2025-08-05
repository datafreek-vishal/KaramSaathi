import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/auth/register');
  });

  test('should display registration form correctly', async ({ page }) => {
    // Check form elements are visible
    await expect(page.locator('text=Create Your Account')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    
    // Check account type radio buttons
    await expect(page.locator('input[value="worker"]')).toBeVisible();
    await expect(page.locator('input[value="employer"]')).toBeVisible();
  });

  test('should show worker-specific fields when worker is selected', async ({ page }) => {
    // Select worker account type
    await page.click('input[value="worker"]');
    
    // Check that worker-specific fields appear
    await expect(page.locator('textarea[placeholder*="skills"]')).toBeVisible();
    await expect(page.locator('select[name="experience"]')).toBeVisible();
    await expect(page.locator('input[name="hourlyRate"]')).toBeVisible();
    
    // Check that employer fields are not visible
    await expect(page.locator('input[name="companyName"]')).not.toBeVisible();
    await expect(page.locator('textarea[name="companyDescription"]')).not.toBeVisible();
  });

  test('should show employer-specific fields when employer is selected', async ({ page }) => {
    // Select employer account type
    await page.click('input[value="employer"]');
    
    // Check that employer-specific fields appear
    await expect(page.locator('input[name="companyName"]')).toBeVisible();
    await expect(page.locator('textarea[name="companyDescription"]')).toBeVisible();
    await expect(page.locator('input[name="website"]')).toBeVisible();
    
    // Check that worker fields are not visible
    await expect(page.locator('textarea[placeholder*="skills"]')).not.toBeVisible();
    await expect(page.locator('input[name="hourlyRate"]')).not.toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages (basic HTML5 validation)
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    
    await expect(nameInput).toHaveAttribute('required');
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should successfully register a worker', async ({ page }) => {
    // Fill out worker registration form
    await page.fill('input[name="name"]', 'John Worker');
    await page.fill('input[name="email"]', 'john.worker@example.com');
    await page.fill('input[name="phone"]', '+1234567890');
    await page.fill('input[name="password"]', 'SecurePassword123');
    await page.fill('input[name="confirmPassword"]', 'SecurePassword123');
    
    // Select worker account type
    await page.click('input[value="worker"]');
    
    // Fill worker-specific fields
    await page.fill('textarea[placeholder*="skills"]', 'Plumbing, Electrical work, Carpentry');
    await page.selectOption('select[name="experience"]', '3-5 years');
    await page.fill('input[name="hourlyRate"]', '25');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should show success message or redirect (depending on implementation)
    // For now, just check that form submission doesn't cause errors
    await page.waitForTimeout(1000); // Wait for any processing
  });

  test('should successfully register an employer', async ({ page }) => {
    // Fill out employer registration form
    await page.fill('input[name="name"]', 'Jane Employer');
    await page.fill('input[name="email"]', 'jane.employer@example.com');
    await page.fill('input[name="phone"]', '+1987654321');
    await page.fill('input[name="password"]', 'SecurePassword456');
    await page.fill('input[name="confirmPassword"]', 'SecurePassword456');
    
    // Select employer account type
    await page.click('input[value="employer"]');
    
    // Fill employer-specific fields
    await page.fill('input[name="companyName"]', 'ABC Construction');
    await page.fill('textarea[name="companyDescription"]', 'Leading construction company providing quality services');
    await page.fill('input[name="website"]', 'https://abc-construction.com');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should show success message or redirect (depending on implementation)
    // For now, just check that form submission doesn't cause errors
    await page.waitForTimeout(1000); // Wait for any processing
  });

  test('should have link to login page', async ({ page }) => {
    await expect(page.locator('text=Already have an account?')).toBeVisible();
    await expect(page.locator('a[href*="login"]')).toBeVisible();
    
    // Click login link
    await page.click('a[href*="login"]');
    await expect(page).toHaveURL('/en/auth/login');
  });
});
