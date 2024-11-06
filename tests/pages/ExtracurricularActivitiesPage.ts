import { Page } from '@playwright/test';

export class extracurricularActivitiesPage {
  constructor(private page: Page) {}

  async fillExtracurricularActivities(ActivityName:string, ActivityYear:string, ActivityText:string,AcitvityInvolvment:string) {
    await this.page.fill('input[placeholder="Short Input"]', ActivityName);
    await this.page.fill('input[placeholder="123"]', ActivityYear);
    await this.page.locator('textarea[placeholder="Long Input"]').nth(0).fill(ActivityText);
    await this.page.locator('textarea[placeholder="Long Input"]').nth(1).fill(AcitvityInvolvment);  
    await this.page.locator('button >> text="Add"').click();
  }

  async submit() {
    await this.page.waitForTimeout(2000);
    await this.page.locator('button >> text="Next Page"').click();
    
     }

  async AddActivity(){
    await this.page.waitForSelector('#form-renderer > div > div > div.m_4081bf90.mantine-Group-root > button > span > span');
    await this.page.click('#form-renderer > div > div > div.m_4081bf90.mantine-Group-root > button > span > span');
  }

  async validateActivityError() {
    await this.page.waitForSelector('text=Please add at least 2 entries');
  }

}