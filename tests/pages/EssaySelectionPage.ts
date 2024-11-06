import { Page } from '@playwright/test';

export class essaySelectionPage {
  constructor(private page: Page) {}

  async selectEssays(essays: string[]) {
    for (const essay of essays) {
      await this.page.click(`input[type="checkbox"][value="${essay}"]`);
    }
  }

  async fillEssays() {

    await this.page.locator('textarea[placeholder="Long Input"]').nth(0).fill("content");
    await this.page.locator('textarea[placeholder="Long Input"]').nth(1).fill("content"); 
  }

  async submit() {
    await this.page.waitForTimeout(2000);
    await this.page.click('span:has-text("Next Page")');
  }

}