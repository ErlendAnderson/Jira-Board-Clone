describe('Issue time tracking', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
      // System finds modal for creating issue and does next steps inside of it
      cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get('[data-testid="select:reporterId"]').click();
        cy.get('[data-testid="select-option:Pickle Rick"]').click().wait(1000);
        cy.get('input[name="title"]').type('Tasdasdasdasdsad');
        cy.get('button[type="submit"]').click();
      });
    // Assertion for having the issue create window closed
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.reload();
    });
  });
  
  const getTextBox = () => cy.get('[placeholder="Number"]');
  const closeWindow = () => cy.get('[data-testid="icon:close"]');
  const issueName = () => cy.contains('Tasdasdasdasdsad');
  const trackTime = () => cy.get('[data-testid="icon:stopwatch"]');
  const trackTimeWindow = () => cy.get('[data-testid="modal:tracking"]');
  const noTimeLogged = () => cy.contains('No time logged');
 
  it('Add, edit, remove estimation time from issue', () => {
    issueName().click();
    // Open time logging window
    noTimeLogged().should('exist');
    // Click on estimation box
    getTextBox().click().type('10').wait(1000);
    // Close the window
    closeWindow().click();
    issueName().click();
    getTextBox().should('have.value', '10').and('be.visible');

    // EDIT ESTIMATION

    getTextBox().click().clear().type('20').wait(1000);
    // Close the window
    closeWindow().click();
    // Open the window
    issueName().click();
    getTextBox().should('have.value', '20').and('be.visible');

    // REMOVE ESTIMATION

    getTextBox().click().clear().wait(1000);
    // Close the window
    closeWindow().click();
    // Open the window
    issueName().click();
    getTextBox().should('have.value', '').and('be.visible');
  });

  // User can log time
  it('Add/Remove time tracking from issue', () => {
    issueName().click();
    // Open time logging window
    noTimeLogged().should('exist');
    // Click on the stopwatch to log time
    trackTime().click();
    trackTimeWindow().should('be.visible').within(() => {
    // Click on the field and type number
      getTextBox().eq(0).click().type('2');
      getTextBox().eq(1).click().type('5');
      cy.wait(1000);
      // Click on "Done"
      cy.contains('Done').click();
  });
    // Close the window
    closeWindow().click();
    // Reopen issue
    issueName().click();
    // Confirm that hours have been saved
    cy.contains('2h logged').should('be.visible');
    cy.contains('5h remaining').should('be.visible');
    noTimeLogged().should('not.exist');

    // USER CAN REMOVE LOGGED TIME

    trackTime().click();
    trackTimeWindow().should('be.visible').within(() => {
    // Click on the field and type number
      getTextBox().eq(0).click().clear();
      getTextBox().eq(1).click().clear();
      cy.wait(1000);
      // Click on "Done"
      cy.contains('Done').click();
  });
    // Close the window
    closeWindow().click();
    // Reopen issue
    issueName().click();
    // Confirm that hours have been saved
    noTimeLogged().should('exist');
  });
});