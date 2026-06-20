# Playwright Automation Project

A Playwright automation project built around a reusable page object model and end-to-end user flows.

---

## Project Structure

```
playwright-automation-project/
├── pages/
│   ├── RegisterPage.js       ← Registration page object
│   ├── LoginPage.js          ← Login page object
│   ├── ProfilePage.js        ← Profile update page object
│   └── AddressBookPage.js    ← Address book page object
├── tests/
│   └── userFlow.spec.js      ← End-to-end user flow tests
├── utils/
│   └── testData.js           ← Centralised test data
├── playwright.config.js
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** ≥ 18.x  
- **npm** ≥ 9.x

---

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd playwright-automation-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps chromium
```

---

## Running the Tests

### Run all tests (headless)

```bash
npx playwright test
```

### Run all tests (headed — watch the browser)

```bash
npx playwright test --headed
```

### View the HTML report after a run

```bash
npx playwright show-report
```

---

## Test Coverage

| # | Scenario |
|---|----------|
| 1 | Customer registration |
| 2 | Login |
| 3 | Update profile |
| 4 | GitHub repository upload |
| 5 | Add a new address |

> **Note:** Tests run sequentially (workers: 1) because later scenarios depend on the account created in the registration flow. A unique email is generated at runtime (`Date.now()`) so each test run starts fresh.

---

## Key Design Decisions

| Concern | Approach |
|---------|----------|
| **Page Object Model** | All page interactions encapsulated in `/pages` — tests contain zero raw selectors |
| **No `waitForTimeout`** | Playwright's built-in auto-waiting + `expect` timeouts only |
| **Selectors** | `getByRole`, `getByLabel`, `getByText` preferred over CSS selectors |
| **Test data** | Centralised in `utils/testData.js` — single source of truth |
| **Assertions** | Meaningful `expect()` checks after every key action |
| **Pattern** | Arrange–Act–Assert (AAA) in every test block |

---

## Troubleshooting

- **Tests fail on first run?** The staging server can be slow — increase `actionTimeout` / `navigationTimeout` in `playwright.config.js`.
- **Registration fails?** The email `mailinator.com` domain must be accepted by the site. If not, swap the domain in `utils/testData.js`.
- **Address form fields not found?** The address field uses a Google Maps-style autocomplete.
  The POM clicks **"Edit Address Manually"** after entering the address to reveal the
  structured fields (Division, City, Postal Code) before filling them.