describe('The Collaborator/Team Member Form', () => {
  beforeEach(() => {
    cy.localLogin({ name: 'MINT', role: 'MINT_USER_NONPROD' });
  });

  it('adds a collaborator to model plan', () => {
    cy.clickPlanTableByName('Empty Plan');

    cy.contains('a', 'Edit team').click();

    cy.contains('h1', 'Add model team members');

    cy.get('table').within(() => {
      cy.get('thead').within(() => {
        cy.contains('th', 'Name');
        cy.contains('th', 'Role');
        cy.contains('th', 'Date added');
        cy.contains('th', 'Actions');
      });

      cy.get('tbody').within(() => {
        cy.contains('th', 'MINT Doe');
        cy.contains('td', 'Model Lead');
      });
    });

    cy.contains('a', 'Add team member').click();

    cy.get('#react-select-model-team-cedar-contact-input')
      .click()
      .type('Jerry', { delay: 1000 });

    cy.get('#react-select-model-team-cedar-contact-option-0')
      .contains('Jerry Seinfeld, SF13')
      .click();

    cy.contains('button', 'Add team member').should('be.disabled');

    cy.get('select').select('Evaluation').should('have.value', 'EVALUATION');

    cy.contains('button', 'Add team member').click();

    cy.get('table').within(() => {
      cy.get('tbody').within(() => {
        cy.contains('th', 'Jerry Seinfeld');
        cy.contains('td', 'Evaluation');
      });
    });

    // Edits a collaborator
    cy.clickPlanTableByName('Plan With Collaborators');

    cy.contains('a', 'Edit team').click();

    cy.get('table').within(() => {
      cy.get('tbody').within(() => {
        cy.contains('th', 'BTAL Doe').siblings().contains('a', 'Edit').click();
      });
    });

    cy.get('input').should('be.disabled');

    cy.get('select')
      .should('not.be.disabled')
      .select('Model Team')
      .should('have.value', 'MODEL_TEAM');

    cy.contains('button', 'Update team member').click();

    cy.get('table').within(() => {
      cy.get('tbody').within(() => {
        cy.contains('th', 'BTAL Doe').siblings('td').contains('Model Team');
      });
    });

    // Removes a collaborator
    cy.clickPlanTableByName('Plan With Collaborators');

    cy.contains('a', 'Edit team').click();

    cy.get('table').within(() => {
      cy.get('tbody').within(() => {
        cy.contains('th', 'BTAL Doe')
          .siblings()
          .contains('button', 'Remove')
          .click();
      });
    });

    cy.contains('button', 'Yes, remove team member').click();

    cy.get('table').within(() => {
      cy.get('tbody').within(() => {
        cy.contains('th', 'BTAL Doe').should('not.exist');
      });
    });

    // The Collaborator Access Control
    // attempts to enter a model plan where not a collaborator
    cy.get('[data-testid="signout-link"]').click();

    cy.localLogin({ name: 'ABCD', role: 'MINT_USER_NONPROD' });

    cy.visit('/models');

    cy.get('[data-testid="table"] a')
      .contains('Empty Plan')
      .then($el => {
        cy.wrap($el.attr('href')).as('modelPlanURL');
      });

    cy.get('[data-testid="table"] a').contains('Empty Plan').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.match(/\/models\/.{36}\/read-only\/model-basics/);
    });

    cy.get('@modelPlanURL').then(modelPlanURL => {
      const taskList = modelPlanURL.replace('read-only', 'task-list');
      cy.visit(taskList);
      cy.location().should(loc => {
        expect(loc.pathname).to.match(
          /\/models\/.{36}\/read-only\/model-basics/
        );
      });
    });
  });
});
