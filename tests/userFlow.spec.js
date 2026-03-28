// tests/userFlow.spec.js
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { ProfilePage } = require('../pages/ProfilePage');
const { AddressBookPage } = require('../pages/AddressBookPage');
const { USER, UPDATED_PROFILE, ADDRESS, URLS } = require('../utils/testData');

// ---------------------------------------------------------------------------
// Task 1 - Customer Registration
// ---------------------------------------------------------------------------
test('Task 1 - Customer Registration: should register a new account successfully', async ({ page }) => {
  // Arrange
  const registerPage = new RegisterPage(page);

  // Act
  await registerPage.goto(URLS.base);
  await registerPage.fillRegistrationForm(
    USER.firstName,
    USER.lastName,
    USER.email,
    USER.password
  );
  await registerPage.submitRegistration();

  // Assert - redirected away from /register, no errors shown
  await registerPage.assertRegistrationSuccess();
  await registerPage.assertNoErrors();
});

// ---------------------------------------------------------------------------
// Task 2 - Login
// ---------------------------------------------------------------------------
test('Task 2 - Login: should log in with registered credentials', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.goto(URLS.base);
  await loginPage.login(USER.email, USER.password);

  // Assert - redirected away from /login
  await loginPage.assertLoggedIn();
});

// ---------------------------------------------------------------------------
// Task 3 - Update Profile
// ---------------------------------------------------------------------------
test('Task 3 - Update Profile: should update account details and save successfully', async ({ page }) => {
  // Arrange - log in first
  const loginPage = new LoginPage(page);
  await loginPage.goto(URLS.base);
  await loginPage.login(USER.email, USER.password);
  await loginPage.assertLoggedIn();

  const profilePage = new ProfilePage(page);

  // Act
  await profilePage.goto(URLS.base);
  await profilePage.updateFirstName(UPDATED_PROFILE.firstName);
  await profilePage.updateLastName(UPDATED_PROFILE.lastName);
  await profilePage.updatePhone(UPDATED_PROFILE.phone);
  await profilePage.saveChanges();

  // Assert - success message visible, fields reflect updated values
  await profilePage.assertSaveSuccess();
  await profilePage.assertFirstNameValue(UPDATED_PROFILE.firstName);
  await profilePage.assertLastNameValue(UPDATED_PROFILE.lastName);
});

// ---------------------------------------------------------------------------
// Task 5 - Add New Address(Bonus)
// ---------------------------------------------------------------------------
test('Task 5 - Add New Address: should add an address and assert it appears in the list', async ({ page }) => {
  // Arrange - log in first
  const loginPage = new LoginPage(page);
  await loginPage.goto(URLS.base);
  await loginPage.login(USER.email, USER.password);
  await loginPage.assertLoggedIn();

  const addressPage = new AddressBookPage(page);

  // Act
  await addressPage.goto(URLS.base);
  await addressPage.clickAddNewAddress();
  await addressPage.fillAddressForm(ADDRESS);
  await addressPage.saveAddress();

  // Assert - success message and address text visible in the list
  await addressPage.assertAddressSaved();
  await addressPage.assertAddressVisible(ADDRESS.addressLine1);
  await addressPage.assertAddressVisible(ADDRESS.city);
});
