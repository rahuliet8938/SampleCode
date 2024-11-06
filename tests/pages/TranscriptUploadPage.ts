import { Page, expect } from '@playwright/test';
import path from 'path';

export class TranscriptUploadPage {
  constructor(private page: Page) {}

  async uploadTranscript() {
    const transcriptPath = path.join(__dirname, '..', 'transcript', 'transcript.zip');
    await this.page.setInputFiles('input[type="file"]', transcriptPath);
  }

  async fillPageDetails(HighSchoolName:string, HighSchoolStreet:string, AdditionalHighSchoolStreet:string,HighSchoolCity:string, 
    HighSchoolState:string, HighSchoolZipCode:string, HighSchoolGPA:string, HighSchoolYear:string) {
      await this.page.setDefaultTimeout(60000);
      await this.page.waitForSelector('input[placeholder="Please enter the name of your current High School"]', { state: 'visible', timeout:60000 });

// Alternatively, you can check explicitly for its state of being enabled and interactable.
      
      const input = await this.page.locator('input[placeholder="Please enter the name of your current High School"]');
      await expect(input).toBeEnabled();  // Ensure the element is enabled
      await input.fill('My High School');
      await this.page.fill('input[placeholder="Enter high school street address"]', HighSchoolStreet);
      await this.page.fill('input[placeholder="Enter additional high school address (e.g. PO Box)"]', AdditionalHighSchoolStreet); 
      await this.page.fill('input[placeholder="Enter high school city"]', HighSchoolCity);  
      await this.page.fill('input[placeholder="Enter high school state"]', HighSchoolState);  
      await this.page.click('div.mantine-Select-option:has-text("Alaska")');
      await this.page.fill('input[placeholder="e.g. 55413"]', HighSchoolZipCode);  
      await this.page.fill('input[placeholder="Enter your current GPA"]', HighSchoolGPA);
      await this.page.fill('input[placeholder="Enter a date"]', HighSchoolYear);  
    }
  
  async submit() {
    await this.page.waitForTimeout(4000);
    await this.page.click('body > div.m_89ab340.mantine-AppShell-root > div > div > main > div:nth-child(2) > div > div.m_4081bf90.mantine-Group-root > div > button:nth-child(2) > span > span.m_811560b9.mantine-Button-label');
  }

 
}