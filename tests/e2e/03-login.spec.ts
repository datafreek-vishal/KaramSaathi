import { test, expect } from '@playwright/test';

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/auth/login');
  });

  test('should display login form correctly', async ({ page }) => {
    // Check form elements are visible
    await expect(page.locator('text=Sign In to Your Account')).toBeVisible();
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check login method toggle
    await expect(page.locator('button:has-text("Phone")')).toBeVisible();
    await expect(page.locator('button:has-text("Email")')).toBeVisible();
  });

  test('should toggle between phone and email login', async ({ page }) => {
    // Initially should show email input
    const identifierInput = page.locator('input[name="identifier"]');
    await expect(identifierInput).toHaveAttribute('type', 'email');
    await expect(identifierInput).toHaveAttribute('placeholder', /email/i);
    
    // Click phone toggle
    await page.click('button:has-text("Phone")');
    
    // Should switch to phone input
    await expect(identifierInput).toHaveAttribute('type', 'tel');
    await expect(identifierInput).toHaveAttribute('placeholder', /phone/i);
    
    // Click email toggle
    await page.click('button:has-text("Email")');
    
    // Should switch back to email input
    await expect(identifierInput).toHaveAttribute('type', 'email');
    await expect(identifierInput).toHaveAttribute('placeholder', /email/i);
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages (basic HTML5 validation)
    const identifierInput = page.locator('input[name="identifier"]');
    const passwordInput = page.locator('input[name="password"]');
    
    await expect(identifierInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should attempt login with email', async ({ page }) => {
    // Fill login form with email
    await page.fill('input[name="identifier"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for any processing
    await page.waitForTimeout(1000);
  });

  test('should attempt login with phone', async ({ page }) => {
    // Switch to phone login
    await page.click('button:has-text("Phone")');
    
    // Fill login form with phone
    await page.fill('input[name="identifier"]', '+1234567890');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for any processing
    await page.waitForTimeout(1000);
  });

  test('should show OTP modal when send OTP is clicked', async ({ page }) => {
    // Fill identifier (email or phone)
    await page.fill('input[name="identifier"]', 'test@example.com');
    
    // Click Send OTP button
    await page.click('button:has-text("Send OTP")');
    
    // Should show OTP modal
    await expect(page.locator('text=Enter OTP')).toBeVisible();
    await expect(page.locator('input[placeholder*="OTP"]')).toBeVisible();
    await expect(page.locator('button:has-text("Verify OTP")')).toBeVisible();
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
  });

  test('should close OTP modal when cancel is clicked', async ({ page }) => {
    // Fill identifier and open OTP modal
    await page.fill('input[name="identifier"]', 'test@example.com');
    await page.click('button:has-text("Send OTP")');
    
    // Verify modal is open
    await expect(page.locator('text=Enter OTP')).toBeVisible();
    
    // Click cancel button
    await page.click('button:has-text("Cancel")');
    
    // Modal should be closed
    await expect(page.locator('text=Enter OTP')).not.toBeVisible();
  });

  test('should validate OTP input', async ({ page }) => {
    // Open OTP modal
    await page.fill('input[name="identifier"]', 'test@example.com');
    await page.click('button:has-text("Send OTP")');
    
    // Try to verify empty OTP
    await page.click('button:has-text("Verify OTP")');
    
    // Check for validation
    const otpInput = page.locator('input[placeholder*="OTP"]');
    await expect(otpInput).toHaveAttribute('required');
  });

  test('should attempt OTP verification', async ({ page }) => {
    // Open OTP modal
    await page.fill('input[name="identifier"]', 'test@example.com');
    await page.click('button:has-text("Send OTP")');
    
    // Fill OTP
    await page.fill('input[placeholder*="OTP"]', '123456');
    
    // Verify OTP
    await page.click('button:has-text("Verify OTP")');
    
    // Wait for any processing
    await page.waitForTimeout(1000);
  });

  test('should have link to registration page', async ({ page }) => {
    await expect(page.locator('text=Don\'t have an account?')).toBeVisible();
    await expect(page.locator('a[href*="register"]')).toBeVisible();
    
    // Click register link
    await page.click('a[href*="register"]');
    await expect(page).toHaveURL('/en/auth/register');
  });

  test('should have forgot password link', async ({ page }) => {
    await expect(page.locator('text=Forgot Password?')).toBeVisible();
    
    // Click forgot password link
    await page.click('text=Forgot Password?');
    
    // Should trigger some action (modal, navigation, etc.)
    await page.waitForTimeout(500);
  });
});
