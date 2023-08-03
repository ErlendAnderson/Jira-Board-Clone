describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  const title = '  Henlo Wolrd  ';
  const description = 'Smol diskriptsion';

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  it("TASK #1: Checks the values in the issue priorities dropdown", () => {
    // Define expected lenght
    const expectedLength = 5;
    // Create empty constant
    let emptyArray = [];
    // Select current value 
    cy.get('[data-testid="select:priority"]').click();
    cy.contains('High').then(($option) => {
      const initialValue = $option.text().trim();
      // Push the value to constant "emptyArray"
      emptyArray.push(initialValue);
      // Log "emptyArray" constant
      cy.log(`Added value: ${emptyArray}, Array length: ${emptyArray.length}`);
      // Get all the options inside the dropdown
      cy.get('[data-testid^="select-option:"]').each(($option) => {
        // Extract and log the text content of each option
        const optionText = $option.text().trim();
        emptyArray.push(optionText);
        cy.log(`Added value: ${optionText}, Array length: ${emptyArray.length}`);
      }).then(() => {
        // Log the final array after the loop is complete
        cy.log('Final Array:', emptyArray);
        // Assert that the array has the expected length
        expect(emptyArray).to.have.length(expectedLength);
      });
    });
  });

  it("TASK #2: Validate reporter name has only characters in it.", () => { 
    cy.get('[data-testid="select:reporter"]').invoke('text').then((text) => {
      // Set constants for better usage. Also regex had to be modified because it did not contain spaces.
      const regex = /^[A-Za-z ]*$/;
      const isValid = regex.test(text);
      // Log to the console the result of validation
      if (expect(isValid).to.be.true){
        cy.log(`Reporter's name is matching the provided regex!`)
      }
      else {
        cy.log(`Reporter's name does not match the specifications!`)
      }
    });
  });
  
  it("TASK #3: Verify if unnecessary spaces are removed.", () => { 
    // I don't know how to skip actions in beforeEach only for this test, so I'm just gonna close the issue creation page.
    // This isn't good practice but I don't know how else to approach this.
    cy.get('[data-testid="icon:close"]').first().click();
    // Assert that issue detail window has been closed
    cy.get('[data-testid="modal:issue-details"]').should('not.exist');
    // Now carry on with creating a new issue
    cy.get('[data-testid="icon:plus"]').click();
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type(description);
      cy.get('input[name="title"]').type(title);
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
    });
    // Asserting that issue creation window is closed and reloading the page
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.reload();
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').click();
    });
    // Removing spaces and updating the issue title
    cy.get('[placeholder="Short summary"]').invoke('text').then((text) => {
      const textTrim = text.trim();
      const unnecessarySpaces = textTrim.includes('   ');
      expect(unnecessarySpaces).to.be.false;
      cy.get('[placeholder="Short summary"]').clear().type(textTrim);
      cy.log(`New issue title: ${textTrim}`);
      cy.log('Closing window');
      cy.get('[data-testid="icon:close"]').first().click();
    });
  });
});