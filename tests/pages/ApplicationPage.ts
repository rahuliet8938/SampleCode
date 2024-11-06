import { Page } from '@playwright/test';

export class ApplicationPage {
  constructor(private page: Page) {}

  async navigateToProgram() {
    await this.page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship');
  }

  async startApplication() {
    await this.page.click('body > div.m_89ab340.mantine-AppShell-root > main > div.m_7485cace.mantine-Container-root > div > div.m_1b7284a3.mantine-Paper-root > div:nth-child(2) > div.m_4081bf90.mantine-Group-root > a > span > span');
  }

  async fillRequiredFieldsForApplication() {
    await this.page.fill('input[placeholder="Enter your street address"]', 'My Test Address');
    await this.page.fill('input[placeholder="Enter additional street address (e.g. Apt Number)"]', 'Alwar Lines');
    await this.page.fill('input[placeholder="Enter your state"]', 'Alaska');
    await this.page.click('div.mantine-Select-option >> text=Alaska');
    await this.page.fill('input[placeholder="Enter your city"]', 'Alwar');
    await this.page.fill('input[placeholder="Enter your zip code"]', '301025');
    await this.page.fill('input[placeholder="Enter your country"]', 'India');
    await this.page.locator('div.mantine-Select-option[value="India"]').click();
    await this.page.waitForLoadState('load');
    await this.page.click('body > div.m_89ab340.mantine-AppShell-root > div > div > main > div:nth-child(2) > div > div.m_4081bf90.mantine-Group-root > div.m_4081bf90.mantine-Group-root > button > span > span.m_811560b9.mantine-Button-label');
    await this.page.waitForTimeout(2000);
  }
}