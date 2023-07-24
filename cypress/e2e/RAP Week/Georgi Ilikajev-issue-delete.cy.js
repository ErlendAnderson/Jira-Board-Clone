describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      });
    });


//ASSIGNMENT 1

it('Should delete an issue', () => {

    cy.get('[data-testid="icon:trash"]').click();
    cy.contains('Delete issue').click();
    cy.get('[test-dataid="modal:confirm"]').should('not.exist');
    cy.contains('This is an issue of type: Task.').should('not.exist');

    })

    

    //ASSIGNMENT 2

it('Should start deleting an issue, then cancel', () => {

        cy.get('[data-testid="icon:trash"]').click();
        cy.contains('Cancel').click();
        cy.get('[test-dataid="modal:confirm"]').should('not.exist');
        cy.contains('This is an issue of type: Task.').should('be.visible');
    
        })
})
