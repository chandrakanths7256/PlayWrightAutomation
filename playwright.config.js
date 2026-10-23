const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use:{
    actionTimeout: 10 * 1000, // fill, click, check,...etc.
    navigationTimeout: 30 * 1000, // goto, etc
  },
  timeout: 30_000, // timeout for every test to complete
  expect: {
    timeout: 10_000,
  },
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
});
