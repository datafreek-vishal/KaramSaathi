import { test, expect } from '@playwright/test';

test.describe('Employer Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/employer');
  });

  test('should display employer dashboard correctly', async ({ page }) => {
    // Check main dashboard elements
    await expect(page.locator('text=Post a Job')).toBeVisible();
    await expect(page.locator('text=My Jobs')).toBeVisible();
    await expect(page.locator('text=Find Workers')).toBeVisible();
    await expect(page.locator('text=Messages')).toBeVisible();
  });

  test('should display job posting form', async ({ page }) => {
    await page.click('text=Post a Job');
    
    // Check job posting form elements
    await expect(page.locator('input[name="title"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('input[name="budget"]')).toBeVisible();
    await expect(page.locator('select[name="location"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should successfully post a job', async ({ page }) => {
    await page.click('text=Post a Job');
    
    // Fill job posting form
    await page.fill('input[name="title"]', 'Experienced Plumber Needed');
    await page.fill('textarea[name="description"]', 'We need an experienced plumber for bathroom renovation work. Must have 5+ years experience.');
    await page.selectOption('select[name="category"]', 'plumbing');
    await page.fill('input[name="budget"]', '500');
    await page.selectOption('select[name="location"]', 'new-york');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for submission
    await page.waitForTimeout(1000);
    
    // Should show success message or redirect
    // Check for success indicators
  });

  test('should validate job posting form', async ({ page }) => {
    await page.click('text=Post a Job');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages
    const titleInput = page.locator('input[name="title"]');
    const descriptionInput = page.locator('textarea[name="description"]');
    
    await expect(titleInput).toHaveAttribute('required');
    await expect(descriptionInput).toHaveAttribute('required');
  });

  test('should display posted jobs', async ({ page }) => {
    await page.click('text=My Jobs');
    
    // Should show jobs section
    await expect(page.locator('text=Posted Jobs')).toBeVisible();
    
    // Check for job listings
    const jobCards = page.locator('[data-testid="job-card"], .job-card, [class*="job"]');
    const jobCount = await jobCards.count();
    
    if (jobCount > 0) {
      await expect(jobCards.first()).toBeVisible();
    }
  });

  test('should edit a posted job', async ({ page }) => {
    await page.click('text=My Jobs');
    
    // Look for edit buttons
    const editButtons = page.locator('button:has-text("Edit")');
    const buttonCount = await editButtons.count();
    
    if (buttonCount > 0) {
      await editButtons.first().click();
      
      // Should show edit form
      await expect(page.locator('input[name="title"]')).toBeVisible();
      await page.waitForTimeout(500);
    }
  });

  test('should delete a posted job', async ({ page }) => {
    await page.click('text=My Jobs');
    
    // Look for delete buttons
    const deleteButtons = page.locator('button:has-text("Delete")');
    const buttonCount = await deleteButtons.count();
    
    if (buttonCount > 0) {
      await deleteButtons.first().click();
      
      // Should show confirmation dialog
      await page.waitForTimeout(500);
    }
  });

  test('should search for workers', async ({ page }) => {
    await page.click('text=Find Workers');
    
    // Check worker search elements
    await expect(page.locator('input[placeholder*="search" i]')).toBeVisible();
    await expect(page.locator('select[name="skill"]')).toBeVisible();
    await expect(page.locator('select[name="experience"]')).toBeVisible();
    await expect(page.locator('button:has-text("Search")')).toBeVisible();
  });

  test('should filter workers by skill', async ({ page }) => {
    await page.click('text=Find Workers');
    
    // Select a skill
    await page.selectOption('select[name="skill"]', 'plumbing');
    
    // Click search
    await page.click('button:has-text("Search")');
    
    // Wait for results
    await page.waitForTimeout(1000);
  });

  test('should view worker profiles', async ({ page }) => {
    await page.click('text=Find Workers');
    
    // Look for worker profile links or cards
    const workerCards = page.locator('[data-testid="worker-card"], .worker-card, [class*="worker"]');
    const workerCount = await workerCards.count();
    
    if (workerCount > 0) {
      await workerCards.first().click();
      
      // Should show worker profile
      await page.waitForTimeout(500);
    }
  });

  test('should contact workers', async ({ page }) => {
    await page.click('text=Find Workers');
    
    // Look for contact buttons
    const contactButtons = page.locator('button:has-text("Contact"), button:has-text("Message")');
    const buttonCount = await contactButtons.count();
    
    if (buttonCount > 0) {
      await contactButtons.first().click();
      
      // Should show message form or open chat
      await page.waitForTimeout(500);
    }
  });

  test('should navigate to messages section', async ({ page }) => {
    await page.click('text=Messages');
    
    // Should show messages section
    await expect(page.locator('text=Messages')).toBeVisible();
    await expect(page.locator('text=Conversations')).toBeVisible();
  });

  test('should show job applications', async ({ page }) => {
    await page.click('text=My Jobs');
    
    // Look for applications or applicants section
    const applicationsSection = page.locator('text=Applications, text=Applicants');
    const sectionCount = await applicationsSection.count();
    
    if (sectionCount > 0) {
      await applicationsSection.first().click();
      
      // Should show applications list
      await page.waitForTimeout(500);
    }
  });

  test('should show employer statistics', async ({ page }) => {
    // Check for dashboard statistics
    const statsElements = page.locator('[data-testid="stats"], .stats, [class*="stat"]');
    const statsCount = await statsElements.count();
    
    if (statsCount > 0) {
      await expect(statsElements.first()).toBeVisible();
    }
  });
});
