const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xwbn77',
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
    chromeWebSecurity: false,
    retries: {
      openMode: 1,
      runMode: 1
    }
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reportEnabled: "mochawesome",
    reportDir: 'cypress/results/mochawesome',
    overwrite: false,
    html: false,
    json: true,
  }
});
