import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { essaySelectionPage } from './pages/EssaySelectionPage';
import { firstApplicationPage } from './pages/FirstApplicationPage';
import { TranscriptUploadPage } from './pages/TranscriptUploadPage';
import { extracurricularActivitiesPage } from './pages/ExtracurricularActivitiesPage';
import { ReviewPage } from './pages/Review&SubmitPage';

test('Complete Scholarship Application', async ({ page }) => {

  // Create page object instances
  test.setTimeout(60000); 
  const registrationPage = new RegistrationPage(page);
  const applicationPage = new ApplicationPage(page);
  const page1 = new firstApplicationPage(page);
  const page2 = new extracurricularActivitiesPage(page);
  const page3 = new TranscriptUploadPage(page);
  const page4 = new essaySelectionPage(page);
  const reviewPage = new ReviewPage(page);

  // Step 1: Register New User
  await registrationPage.navigate();
  const randomEmail = await registrationPage.generateRandomEmail();
  console.log(randomEmail);
  await registrationPage.signUp('John', 'Doe', `${randomEmail}`, '*9Q@^u@7?j0X', '8976567678');

  // Step 2: Start Application
  await page.waitForTimeout(5000);
  await applicationPage.navigateToProgram();
  await page.waitForTimeout(2000);
  await applicationPage.startApplication();
  await applicationPage.fillRequiredFieldsForApplication();
  

  // Step 3: Page 2 - Extracurricular Activities
  await page2.AddActivity();
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  await page2.fillExtracurricularActivities('Soccar','10','Hello soccar','Hello master');
  await page2.submit();
  await page2.validateActivityError();  // Ensure error message appears

  for (let i = 0; i < 3; i++) {
    await page.waitForLoadState();
    await page2.AddActivity();
    await page2.fillExtracurricularActivities('Cricket'+`${i}`,'10','Hello soccar','Hello master');
  }
  
  await page.waitForTimeout(2000);
  await page2.submit();
  
  // Step 5: Upload Transcript on Page 3
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  await page3.fillPageDetails('Lords', 'Alwar', 'Streets of alwar', 'Alwar', 'Alaska', '301025', '10', '2021');
  await page3.uploadTranscript();
  await page.waitForTimeout(5000);
  await page3.submit();

  // Step 6: Fill Essay Selection and Answers
  await page4.selectEssays(['Animals', 'School', 'Cars', 'Other']);
  const labelCar = page.locator('label:has-text("Essay about Cars")');
  const labelAnimals = page.locator('label:has-text("Essay about Animals")');
  const labelSchool = page.locator('label:has-text("Essay about School")');
  const labelOther = page.locator('label:has-text("Provide an essay about any topic")'); 
  // Assert that the label is visible

  await page.waitForTimeout(4000);
  await expect(labelCar).toBeVisible();
  await expect(labelAnimals).toBeVisible();
  await expect(labelSchool).toBeVisible();
  await expect(labelOther).toBeVisible();

  await page4.selectEssays(['Cars', 'Other']);

  await page4.fillEssays();
  await page4.submit();

  // Step 7: Review and Submit Application
  await reviewPage.verifyAnswers();
  const applicationUrl = await reviewPage.captureApplicationUrl();
  console.log('Application URL:', applicationUrl);
  await reviewPage.submitApplication();
  await reviewPage.verifySubmissionLocked();
});