import { test, expect } from '@playwright/test';

test.describe('Complete User Journey', () => {
  test.describe('Worker Journey', () => {
    test('complete worker registration and job search flow', async ({ page }) => {
      // 1. Navigate to homepage
      await page.goto('/');
      await expect(page.locator('text=Welcome to Karam Sathi')).toBeVisible();
      
      // 2. Go to registration
      await page.click('text=Sign Up');
      await expect(page).toHaveURL('/en/auth/register');
      
      // 3. Register as worker
      await page.fill('input[name="name"]', 'John Worker');
      await page.fill('input[name="email"]', 'john.worker@example.com');
      await page.fill('input[name="phone"]', '+1234567890');
      await page.fill('input[name="password"]', 'SecurePassword123');
      await page.fill('input[name="confirmPassword"]', 'SecurePassword123');
      
      await page.click('input[value="worker"]');
      await page.fill('textarea[placeholder*="skills"]', 'Plumbing, Electrical work');
      await page.selectOption('select[name="experience"]', '3-5 years');
      await page.fill('input[name="hourlyRate"]', '25');
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      
      // 4. Navigate to worker dashboard
      await page.goto('/en/worker');
      await expect(page.locator('text=Find Jobs')).toBeVisible();
      
      // 5. Search for jobs
      await page.fill('input[placeholder*="search" i]', 'plumber');
      await page.selectOption('select[name="category"]', 'plumbing');
      await page.click('button:has-text("Search")');
      await page.waitForTimeout(1000);
      
      // 6. View profile
      await page.click('text=My Profile');
      await expect(page.locator('text=Profile Information')).toBeVisible();
      
      // 7. Check applications
      await page.click('text=My Applications');
      await expect(page.locator('text=Job Applications')).toBeVisible();
    });
  });

  test.describe('Employer Journey', () => {
    test('complete employer registration and job posting flow', async ({ page }) => {
      // 1. Navigate to homepage
      await page.goto('/');
      await expect(page.locator('text=Welcome to Karam Sathi')).toBeVisible();
      
      // 2. Go to registration
      await page.click('text=Sign Up');
      await expect(page).toHaveURL('/en/auth/register');
      
      // 3. Register as employer
      await page.fill('input[name="name"]', 'Jane Employer');
      await page.fill('input[name="email"]', 'jane.employer@example.com');
      await page.fill('input[name="phone"]', '+1987654321');
      await page.fill('input[name="password"]', 'SecurePassword456');
      await page.fill('input[name="confirmPassword"]', 'SecurePassword456');
      
      await page.click('input[value="employer"]');
      await page.fill('input[name="companyName"]', 'ABC Construction');
      await page.fill('textarea[name="companyDescription"]', 'Leading construction company');
      await page.fill('input[name="website"]', 'https://abc-construction.com');
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      
      // 4. Navigate to employer dashboard
      await page.goto('/en/employer');
      await expect(page.locator('text=Post a Job')).toBeVisible();
      
      // 5. Post a job
      await page.click('text=Post a Job');
      await page.fill('input[name="title"]', 'Experienced Plumber Needed');
      await page.fill('textarea[name="description"]', 'We need an experienced plumber for renovation work.');
      await page.selectOption('select[name="category"]', 'plumbing');
      await page.fill('input[name="budget"]', '500');
      await page.selectOption('select[name="location"]', 'new-york');
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      
      // 6. View posted jobs
      await page.click('text=My Jobs');
      await expect(page.locator('text=Posted Jobs')).toBeVisible();
      
      // 7. Search for workers
      await page.click('text=Find Workers');
      await page.selectOption('select[name="skill"]', 'plumbing');
      await page.click('button:has-text("Search")');
      await page.waitForTimeout(1000);
    });
  });

  test.describe('Cross-Platform Navigation', () => {
    test('should navigate between all major sections', async ({ page }) => {
      // Start at homepage
      await page.goto('/');
      
      // Test navigation to worker section
      await page.click('text=Find Work');
      await expect(page).toHaveURL('/en/worker');
      
      // Test navigation to employer section
      await page.goto('/');
      await page.click('text=Post Job');
      await expect(page).toHaveURL('/en/employer');
      
      // Test navigation to login
      await page.goto('/');
      await page.click('text=Login');
      await expect(page).toHaveURL('/en/auth/login');
      
      // Test navigation to register
      await page.goto('/');
      await page.click('text=Sign Up');
      await expect(page).toHaveURL('/en/auth/register');
    });
  });

  test.describe('Form Validation and Error Handling', () => {
    test('should handle form validation across all forms', async ({ page }) => {
      // Test login form validation
      await page.goto('/en/auth/login');
      await page.click('button[type="submit"]');
      await expect(page.locator('input[name="identifier"]')).toHaveAttribute('required');
      
      // Test registration form validation
      await page.goto('/en/auth/register');
      await page.click('button[type="submit"]');
      await expect(page.locator('input[name="name"]')).toHaveAttribute('required');
      
      // Test job posting form validation (if accessible)
      await page.goto('/en/employer');
      const postJobButton = page.locator('text=Post a Job');
      const postJobCount = await postJobButton.count();
      
      if (postJobCount > 0) {
        await postJobButton.click();
        await page.click('button[type="submit"]');
        await expect(page.locator('input[name="title"]')).toHaveAttribute('required');
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test homepage on mobile
      await page.goto('/');
      await expect(page.locator('text=Welcome to Karam Sathi')).toBeVisible();
      
      // Test navigation on mobile
      await page.click('text=Login');
      await expect(page).toHaveURL('/en/auth/login');
      
      // Test forms on mobile
      await page.goto('/en/auth/register');
      await expect(page.locator('input[name="name"]')).toBeVisible();
      
      // Ensure forms are usable on mobile
      await page.fill('input[name="name"]', 'Mobile Test User');
      await page.fill('input[name="email"]', 'mobile@test.com');
    });
  });

  test.describe('Performance and Loading', () => {
    test('should load pages within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await expect(page.locator('text=Welcome to Karam Sathi')).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    });
    
    test('should handle navigation without errors', async ({ page }) => {
      // Test rapid navigation
      await page.goto('/');
      await page.click('text=Login');
      await page.click('text=Sign up here');
      await page.click('text=Already have an account?');
      
      // Should end up back at login without errors
      await expect(page).toHaveURL('/en/auth/login');
      await expect(page.locator('text=Sign In to Your Account')).toBeVisible();
    });
  });
});
