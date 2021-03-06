describe('The Model Plan General Characteristics Form', () => {
  beforeEach(() => {
    cy.localLogin({ name: 'MINT' });
  });

  it('completes a Model Plan Characteristics', () => {
    cy.clickPlanTableByName('Empty Plan');

    // Clicks the General Charactstics tasklist item
    cy.get('[data-testid="characteristics"]').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.match(
        /\/models\/.{36}\/task-list\/characteristics/
      );
    });

    // Page - /characteristics
    cy.get('[data-testid="model-plan-name"]').contains('for Empty Plan');

    cy.get('#plan-characteristics-is-new-model-no')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-existing-model')
      .type('Complete{downArrow}{enter}')
      .should('have.value', 'Complete Plan');

    cy.get('#plan-characteristics-resembles-existing-model')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-resembles-which-model').within(() => {
      cy.get("input[type='search']")
        .type('advance payment')
        .should('have.value', 'advance payment');
    });

    cy.get('#easi-multiselect__option-1')
      .check({ force: true })
      .should('be.checked');

    cy.get('[data-testid="tag"]').first().contains('Advance Payment ACO Model');

    cy.get('#plan-characteristics-resembles-how-model')
      .type('In every way')
      .should('have.value', 'In every way');

    cy.get('#plan-characteristics-has-component-or-tracks')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-tracks-differ-how')
      .type('In no way')
      .should('have.value', 'In no way');

    cy.contains('button', 'Next').click();

    // Page - /characteristics/key-charactertics

    cy.wait(500);

    cy.get('#plan-characteristics-alternative-payment')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-alternative-payment-MIPS')
      .check({ force: true })
      .should('be.checked');

    cy.get('[data-testid="mandatory-fields-alert"]').contains(
      'In order to be considered by QPP (and to be MIPS or Advanced APM), you will need to collect TINS and NPIs for provider.'
    );

    cy.get('#plan-characteristics-key-characteristics').within(() => {
      cy.get("input[type='search']")
        .type('payment')
        .should('have.value', 'payment');
    });

    cy.get('#easi-multiselect__option-PAYMENT')
      .check({ force: true })
      .should('be.checked');

    cy.get('[data-testid="tag"]').first().contains('Payment Model');

    cy.contains('button', 'Next').click();

    // Page - /characteristics/involvements

    cy.wait(500);

    cy.get('#plan-characteristics-care-coordination-involved')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-care-coordination-description')
      .type('Yes, care coordination is involved in every way')
      .should('have.value', 'Yes, care coordination is involved in every way');

    cy.get('#plan-characteristics-additional-services')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-additional-services-description')
      .type('Yes, additional services are involved in every way')
      .should(
        'have.value',
        'Yes, additional services are involved in every way'
      );

    cy.get('#plan-characteristics-community-partners-involved')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-community-partners-description')
      .type('Yes, community partners are involved in every way')
      .should(
        'have.value',
        'Yes, community partners are involved in every way'
      );

    cy.contains('button', 'Next').click();

    // Page - /characteristics/targets-and-options

    cy.wait(500);

    cy.get('#plan-characteristics-geographies-targeted')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-geographies-type-STATE')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-geographies-applied-to-PARTICIPANTS')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-participation')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-agreement-type-PARTICIPATION')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-agreement-type-OTHER')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-agreement-type-other')
      .type('Just a different agreement type')
      .should('have.value', 'Just a different agreement type');

    cy.get('#plan-characteristics-multiple-participation-needed')
      .check({ force: true })
      .should('be.checked');

    cy.contains('button', 'Next').click();

    // Page - /characteristics/authority

    cy.wait(500);

    cy.get('#plan-characteristics-rulemaking-required')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-rulemaking-required-description')
      .type('Standard rule for next year')
      .should('have.value', 'Standard rule for next year');

    cy.get('#plan-characteristics-authority-allowance-CONGRESSIONALLY_MANDATED')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-waivers-required')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-waiver-types-FRAUD_ABUSE')
      .check({ force: true })
      .should('be.checked');

    cy.get('#plan-characteristics-waiver-types-PROGRAM_PAYMENT')
      .check({ force: true })
      .should('be.checked');

    cy.contains('button', 'Save and start next Model Plan section').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.match(/\/models\/.{36}\/task-list/);
    });

    cy.get('[data-testid="task-list-intake-form-characteristics"]').contains(
      'Completed'
    );
  });
});
