// pages/RegisterPage.js
// Register page: https://ratul.staging.dokandev.com/register
// Fields: First Name, Last Name, Email, Password, Confirm Password
// Submit: "Create Account"

const { expect } = require('@playwright/test');

class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async goto(baseUrl) {
    await this.page.goto(baseUrl + '/register');
    await this.page.waitForLoadState('networkidle');
  }

  async fillRegistrationForm(firstName, lastName, email, password) {
    await this.page.getByLabel('First Name').fill(firstName);
    await this.page.getByLabel('Last Name').fill(lastName);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password', { exact: true }).fill(password);
    await this.page.getByLabel('Confirm Password').fill(password);
  }

  async submitRegistration() {
    await this.page.getByRole('button', { name: 'Create Account', exact: true }).click();
  }

  async assertRegistrationSuccess() {
    // After success, site redirects away from /register
    await expect(this.page).not.toHaveURL(/\/register/, { timeout: 20000 });
  }

  async assertNoErrors() {
    // Exclude Next.js route announcer which always has role="alert" but is not a real error
    const errors = this.page.locator('[role="alert"]:not(#__next-route-announcer__), [class*="error-message"], [class*="form-error"]');
    const count = await errors.count();
    if (count > 0) {
      await expect(errors.first()).not.toBeVisible();
    }
  }
}

module.exports = { RegisterPage };
