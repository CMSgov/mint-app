const maxAttempts = 3;

describe('Logging in', () => {
  it(
    'logs in with okta',
    {
      retries: {
        runMode: maxAttempts - 1, // 2 retries when running from `cypress run` (3 total attempts)
        openMode: 0 // 0 retries when running from `cypress open` (1 total attempt)
      }
    },
    () => {
      // Get the current number of retries and sleep before running the test to make sure the One-Time-Password is new
      const currentRetry = cy.state('runnable')._currentRetry; // eslint-disable-line no-underscore-dangle
      if (currentRetry > 0) {
        cy.log(
          `[Attempt ${currentRetry + 1}/${maxAttempts}] Sleeping 30s for OTP`
        );
        cy.wait(30000);
      }
      cy.login();
      cy.location('pathname', { timeout: 20000 }).should(
        'equal',
        '/pre-decisional-notice'
      );
    }
  );

  it('logs in with local auth an verifies NDA', () => {
    cy.localLogin({ name: 'MINT' });
    cy.visit('/');

    cy.get('h1', { timeout: 20000 }).should('have.text', 'Welcome to MINT');

    cy.logout();

    cy.localLogin({ name: 'MINT', role: 'MINT_USER_NONPROD', nda: true });
    cy.visit('/');

    cy.get('h1', { timeout: 20000 }).should('have.text', 'Welcome to MINT');
  });

  it('logs in with local MAC', () => {
    cy.localLogin({ name: 'MACU', role: 'MINT MAC Users' });
    cy.visit('/');

    cy.get('[data-testid="page-loading"]').should('not.exist');

    cy.get('h1', { timeout: 20000 }).should('have.text', 'Welcome to MINT');
  });
});
