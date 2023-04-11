const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 2,
      openMode: 0
    },
    supportFile: 'cypress/support/e2e.js',
    baseUrl: "https://google.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
