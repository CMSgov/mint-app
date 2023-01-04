import { defineConfig } from 'cypress';

export default defineConfig({
  viewportHeight: 800,
  viewportWidth: 1280,
  projectId: 'vc6vw5',
  defaultCommandTimeout: 10000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3005',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
});
