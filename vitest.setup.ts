import "@testing-library/jest-dom/vitest";

// Existing suites test the full site; tests/finance-flag.test.tsx covers the flag-off site.
process.env.ENABLE_FINANCE_PAGES = "true";
