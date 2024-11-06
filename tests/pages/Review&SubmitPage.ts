import { Page } from '@playwright/test';

export class ReviewPage {
  constructor(private page: Page) {}

  async verifyAnswers() {
    await this.page.locator('span:has-text("Lets get to know you!")').isVisible();
    await this.page.locator('span:has-text("Extracurricular Activities")').isVisible();
    await this.page.locator('span:has-text("High School Information")').isVisible();
    await this.page.locator('span:has-text("Essay")').isVisible();
  }

  async submitApplication() {
    await this.page.click('p:has-text("Submit")');
  }

  async captureApplicationUrl() {
    return this.page.url();
  }

  async verifySubmissionLocked() {
    await this.page.locator('text=Editing not allowed').isVisible();
  }
}