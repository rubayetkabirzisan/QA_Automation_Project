// utils/testData.js
// Centralised test data - no magic values in test files

const USER = {
  firstName: 'Ratul',
  lastName: 'TestUser',
  email: 'ratultest' + Date.now() + '@mailinator.com',
  password: 'SecurePass@123',
};

const UPDATED_PROFILE = {
  firstName: 'RatulUpdated',
  lastName: 'UserUpdated',
  phone: '01799887766',
};

const ADDRESS = {
  firstName: 'Ratul',
  lastName: 'Tester',
  country: 'Bangladesh',
  addressLine1: '123 Mirpur Road',
  addressLine2: 'Apt 4B',
  city: 'Dhaka',
  state: 'Dhaka',
  postcode: '1216',
  phone: '01799887766',
  label: 'Home',
};

const URLS = {
  base: 'https://ratul.staging.dokandev.com',
  register: '/register',
  login: '/login',
  profile: '/customers/profile',
  addresses: '/customers/addresses',
};

module.exports = { USER, UPDATED_PROFILE, ADDRESS, URLS };
