# rubaetkabirzishan-weDevs-SQA

---

## Project Structure

```
QA_Automation_Project/
├── pages/
│   ├── RegisterPage.js       ← Task 1 — Registration POM
│   ├── LoginPage.js          ← Task 2 — Login POM
│   ├── ProfilePage.js        ← Task 3 — Update Profile POM
│   └── AddressBookPage.js    ← Task 5 — Add Address POM (Bonus)
├── tests/
│   └── userFlow.spec.js      ← All test cases (Tasks 1–3, 5)
├── utils/
│   └── testData.js           ← Centralised test data (no hardcoded values in tests)
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
git clone https://github.com/<your-username>/QA_Automation_Project.git
cd rubaetkabirzishan-weDevs-SQA
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

## Test Cases

| # | Test Name | Marks |
|---|-----------|-------|
| 1 | Task 1 — Customer Registration | 6 |
| 2 | Task 2 — Login | 4 |
| 3 | Task 3 — Update Profile | 4 |
| 4 | *(GitHub Upload — see repo)* | 6 |
| 5 | Task 5 — Add New Address *(Bonus)* | 5 |

> **Note:** Tests run sequentially (workers: 1) because Tasks 2–5 depend on the account created in Task 1. A unique email is generated at runtime (`Date.now()`) so each test run starts fresh.

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
