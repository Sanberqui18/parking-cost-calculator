const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.js",
    baseUrl: "https://www.shino.de/parkcalc/",
    pageLoadTimeout: 5000,
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    video: true,
    videoUploadOnPasses: false,
    retries: {
      openMode: 2,
      runMode: 2
    }

  },
});
