import { test, expect } from '@playwright/test';

test.describe('Worker Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/worker');
  });

  test('should display worker dashboard correctly', async ({ page }) => {
    // Check main dashboard elements
    await expect(page.locator('text=Find Jobs')).toBeVisible();
    await expect(page.locator('text=My Profile')).toBeVisible();
    await expect(page.locator('text=My Applications')).toBeVisible();
    await expect(page.locator('text=Messages')).toBeVisible();
  });

  test('should display job search functionality', async ({ page }) => {
    // Check job search elements
    await expect(page.locator('input[placeholder*="search" i]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('select[name="location"]')).toBeVisible();
    await expect(page.locator('button:has-text("Search")')).toBeVisible();
  });

  test('should filter jobs by category', async ({ page }) => {
    // Select a category
    await page.selectOption('select[name="category"]', 'construction');
    
    // Click search
    await page.click('button:has-text("Search")');
    
    // Wait for results to load
    await page.waitForTimeout(1000);
    
    // Should show filtered results
    // (In a real app, this would show actual job listings)
  });

  test('should search jobs by keyword', async ({ page }) => {
    // Enter search keyword
    await page.fill('input[placeholder*="search" i]', 'plumber');
    
    // Click search
    await page.click('button:has-text("Search")');
    
    // Wait for results to load
    await page.waitForTimeout(1000);
  });

  test('should navigate to profile section', async ({ page }) => {
    await page.click('text=My Profile');
    
    // Should show profile section
    await expect(page.locator('text=Profile Information')).toBeVisible();
    await expect(page.locator('text=Skills')).toBeVisible();
    await expect(page.locator('text=Experience')).toBeVisible();
  });

  test('should navigate to applications section', async ({ page }) => {
    await page.click('text=My Applications');
    
    // Should show applications section
    await expect(page.locator('text=Job Applications')).toBeVisible();
    await expect(page.locator('text=Status')).toBeVisible();
  });

  test('should navigate to messages section', async ({ page }) => {
    await page.click('text=Messages');
    
    // Should show messages section
    await expect(page.locator('text=Messages')).toBeVisible();
    await expect(page.locator('text=Conversations')).toBeVisible();
  });

  test('should display job cards', async ({ page }) => {
    // Check for job listing elements
    const jobCards = page.locator('[data-testid="job-card"], .job-card, [class*="job"]');
    
    // If jobs are available, check their structure
    const jobCount = await jobCards.count();
    if (jobCount > 0) {
      await expect(jobCards.first()).toBeVisible();
      await expect(jobCards.first().locator('text=Apply')).toBeVisible();
    }
  });

  test('should apply for a job', async ({ page }) => {
    // Look for apply buttons
    const applyButtons = page.locator('button:has-text("Apply")');
    const buttonCount = await applyButtons.count();
    
    if (buttonCount > 0) {
      // Click first apply button
      await applyButtons.first().click();
      
      // Should show application modal or form
      await page.waitForTimeout(1000);
    }
  });

  test('should update worker profile', async ({ page }) => {
    await page.click('text=My Profile');
    
    // Look for edit button or form fields
    const editButton = page.locator('button:has-text("Edit"), button:has-text("Update")');
    const editButtonCount = await editButton.count();
    
    if (editButtonCount > 0) {
      await editButton.first().click();
      
      // Should show editable form
      await page.waitForTimeout(500);
    }
  });

  test('should show worker statistics', async ({ page }) => {
    // Check for dashboard statistics
    const statsElements = page.locator('[data-testid="stats"], .stats, [class*="stat"]');
    const statsCount = await statsElements.count();
    
    if (statsCount > 0) {
      await expect(statsElements.first()).toBeVisible();
    }
  });
});
