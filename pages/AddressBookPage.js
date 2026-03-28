// pages/AddressBookPage.js
const { expect } = require('@playwright/test');

class AddressBookPage {
  constructor(page) {
    this.page = page;
  }

  async goto(baseUrl) {
    await this.page.goto(baseUrl + '/customers/addresses');
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddNewAddress() {
    await this.page.getByRole('button', { name: 'Add New Address', exact: true }).click();
    await expect(this.page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  }

  async fillAddressForm(address) {
    const dialog = this.page.getByRole('dialog');

    // First Name and Last Name
    await dialog.getByRole('textbox', { name: 'First Name *' }).fill(address.firstName);
    await dialog.getByRole('textbox', { name: 'Last Name *' }).fill(address.lastName);

    // Country - react-select combobox
    const countryInput = dialog.getByRole('combobox').first();
    await countryInput.click();
    await countryInput.fill(address.country);
    await this.page.getByText(address.country, { exact: true }).first().click();

    // Click "Edit Address Manually" to skip the autocomplete and reveal structured fields
    await dialog.getByRole('button', { name: /edit address manually/i }).click();

    // Wait for structured fields to appear
    await dialog.getByRole('textbox', { name: 'City *' }).waitFor({ state: 'visible' });

    // Address line 1
    await dialog.getByPlaceholder('Enter address').fill(address.addressLine1);

    // Apartment (optional)
    if (address.apartment) {
      await dialog.getByPlaceholder(/apartment, suite/i).fill(address.apartment);
    }

    // Division - react-select combobox (only visible after "Edit Address Manually")
    if (address.state) {
      const divisionInput = dialog.getByRole('combobox').nth(1);
      await divisionInput.click();
      await divisionInput.fill(address.state);
      await this.page.getByText(address.state, { exact: true }).first().click();
    }

    // City
    await dialog.getByRole('textbox', { name: 'City *' }).fill(address.city);

    // Postal Code (optional)
    if (address.postcode) {
      await dialog.getByRole('textbox', { name: /postal code/i }).fill(address.postcode);
    }

    // Phone *
    await dialog.getByRole('textbox', { name: 'Phone *' }).fill(address.phone);

    // Label for effective delivery
    await dialog.getByRole('textbox', { name: /label|effective delivery/i }).fill(address.label);
  }

  async saveAddress() {
    const dialog = this.page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Save', exact: true }).click();
  }

  async assertAddressSaved() {
    await expect(this.page.getByRole('dialog')).not.toBeVisible({ timeout: 15000 });
  }

  async assertAddressVisible(text) {
    await expect(this.page.getByText(text, { exact: false })).toBeVisible({ timeout: 15000 });
  }
}

module.exports = { AddressBookPage };