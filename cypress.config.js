const { defineConfig } = require("cypress");

module.exports = defineConfig({
  baseUrl: "http://localhost:8000",
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
