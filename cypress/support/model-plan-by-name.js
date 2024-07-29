Cypress.Commands.add('clickPlanTableByName', planName => {
  cy.visit('/');

  cy.get('[data-testid="all-model-plans-table-wrapper"] a')
    .contains(planName)
    .click();
  cy.url().should('include', '/task-list');
  cy.get('[data-testid="page-loading"]').should('not.exist');
});
