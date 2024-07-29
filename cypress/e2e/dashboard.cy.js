///<reference types="Cypress" />

context('M01 - User Logon and Search Merchant Module', () => {
  beforeEach(() => {
    cy.visit('https://vm2-test-dashpay.apollo.com.ph/login/auth');
  });

  it('TC01: S01 - S06 - Search Merchant and Filter by Date', () => {
    // Load credentials
    cy.fixture('sbs_credentials/valid_credentials.json').then((credentials) => {
      // Enter valid username
      cy.get('[id=username]', { timeout: 20000 }).should('be.visible').clear().type("qatest");
      cy.wait(1000);

      // Enter valid password
      cy.get('[id=password]').clear().type("ap0ll0");
      cy.wait(1000);

      // Click login button
      cy.get('.ui-button').click();
      cy.wait(3000);

      // Hover over the Reports module
      cy.get('.jd_menu > :nth-child(1) > a').trigger('mouseover');
      cy.wait(1000);

      // Click on the Dashboard link using contains
      cy.contains('Dashboard').should('be.visible').click({ force: true });
      cy.wait(2000);

      // Verify the URL to ensure correct navigation
      cy.url().should('include', '/dashboard/index');
      cy.wait(2000);

      // Scroll down to the bottom of the page slowly
      cy.scrollTo('bottom', { duration: 15000 });
      cy.wait(2000);

      cy.get('#refresh').click();
      cy.wait(2000);

      // Log out
      cy.get('#loginInfo > a').first().scrollIntoView().should('be.visible').click();
    });
  });
});
