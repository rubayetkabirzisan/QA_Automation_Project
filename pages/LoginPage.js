// pages/LoginPage.js
// Login page: https://ratul.staging.dokandev.com/login
// Fields: Email, Password
// Submit: "Sign in" (exact match to avoid matching "Sign in with Google")

const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto(baseUrl) {
    await this.page.goto(baseUrl + '/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    // exact: true prevents matching "Sign in with Google"
    await this.page.getByRole('button', { name: 'Sign in', exact: true }).click();
  }

  async assertLoggedIn() {
    // After login, redirected away from /login and login link disappears
    await expect(this.page).not.toHaveURL(/\/login/, { timeout: 20000 });
    await expect(this.page.getByRole('link', { name: 'Login', exact: true })).not.toBeVisible({ timeout: 10000 });
  }

  async assertLoginError() {
    await expect(
      this.page.locator('[role="alert"]:not(#__next-route-announcer__)').first()
    ).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { LoginPage };
