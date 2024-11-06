import { Page } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship');
  }

  async signUp(firstName: string, lastName: string, email: string, password: string, phone: string) {
    await this.page.click('body > div.m_89ab340.mantine-AppShell-root > header > header > div > div.m_4081bf90.mantine-Group-root > div:nth-child(3) > a > p');
    await this.page.fill('#login-page__email > label > input', email);
    await this.page.click('#login-page__cta'); 
    await this.page.fill('#onboarding-screen__form-container > form > div:nth-child(2) > label > input', firstName);
    await this.page.fill('#onboarding-screen__form-container > form > div:nth-child(3) > label > input', lastName);
    await this.page.fill('#onboarding-screen__form-container > form > div:nth-child(4) > label > div > input', phone);
    await this.page.fill('#onboarding-screen__form-container > form > div:nth-child(5) > label > input', password);  
    await this.page.check('#onboarding-screen__form-container > form > div:nth-child(7) > div > input');  
    await this.page.click('#onboarding-screen__form-submit > span');
  }

  async generateRandomEmail(){
    const randomString = Math.random().toString(36).substring(2, 15);  // Generate a random string
    const email = `${randomString}@example.com`;  // Append it to the domain
    return email;
  }

}