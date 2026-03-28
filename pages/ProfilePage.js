// pages/ProfilePage.js
// Profile page: https://ratul.staging.dokandev.com/customers/profile

const { expect } = require('@playwright/test');

class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async goto(baseUrl) {
    await this.page.goto(baseUrl + '/customers/profile');
    await this.page.waitForLoadState('networkidle');
  }

  async updateFirstName(firstName) {
    const field = this.page.getByLabel('First Name');
    await field.clear();
    await field.fill(firstName);
  }

  async updateLastName(lastName) {
    const field = this.page.getByLabel('Last Name');
    await field.clear();
    await field.fill(lastName);
  }

  async updatePhone(phone) {
    const field = this.page.getByLabel(/phone/i);
    if (await field.isVisible()) {
      await field.clear();
      await field.fill(phone);
    }
  }

  async saveChanges() {
    await this.page.getByRole('button', { name: /save|update|submit/i }).click();
  }

  async assertSaveSuccess() {
    await expect(
      this.page.locator('[role="alert"], [class*="success"], [class*="toast"], [class*="notification"]').first()
    ).toBeVisible({ timeout: 15000 });
  }

  async assertFirstNameValue(value) {
    await expect(this.page.getByLabel('First Name')).toHaveValue(value);
  }

  async assertLastNameValue(value) {
    await expect(this.page.getByLabel('Last Name')).toHaveValue(value);
  }
}

module.exports = { ProfilePage };
