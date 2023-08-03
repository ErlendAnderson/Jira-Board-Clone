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
});