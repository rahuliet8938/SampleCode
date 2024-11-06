import { Page } from '@playwright/test';

export class firstApplicationPage {
  constructor(private page: Page) {}

  async fillRequiredFields() {
    await this.page.fill('input[name="first_name"]', 'John');
    await this.page.fill('input[name="last_name"]', 'Doe');
    await this.page.fill('input[name="email"]', 'john.doe@example.com');
    await this.page.fill('input[name="phone_number"]', '123-456-7890');
  }

  async submit() {
    await this.page.click('button[type="submit"]');
  }

 
}