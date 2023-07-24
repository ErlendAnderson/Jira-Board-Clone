describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

/*     it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    }); */

    it('Should create,edit and delete comment successfully', () => {
        const comment = 'I am typing more text here because this way I have time to observe what the program is typing.';
        const comment_edited = 'AGAIN, I AM WRITING QUITE A BIT HERE ONLY TO SEE IF THE PROGRAM IS DOING THE CORRECT THINGS OR ITS FOLLOWING MY MESSED UP CODE AGAIN';

        getIssueDetailsModal().within(() => {
            //Add comment
            //Clicks on the "Add a comment" box
            cy.contains('Add a comment...').click();
            //Types a comment defined above into the box
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            //Clicks on "Save" button and then asserts if the button doesn't exist anymore.
            cy.contains('button', 'Save').click().should('not.exist');
            //Assertion for checking if the comment box exists.
            cy.contains('Add a comment...').should('exist');
            //Assertion for checking if the comment has been added.
            cy.get('[data-testid="issue-comment"]').should('contain', comment);

            //Edit comment
            //Clicks on the first comment "Edit" button and then asserts if edit button is not visible anymore.
            cy.get('[data-testid="issue-comment"]').first().contains('Edit')
                .click().should('not.exist');
            //Clears the old comment and replaces it with the new one.
            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', comment).clear().type(comment_edited);
            //Clicks on the "Save" button and asserts that it doesn't exist anymore.
            cy.contains('button', 'Save').click().should('not.exist');
            //Asserts if "Edit" button is visible on the edited comment and if comment has been edited.
            cy.get('[data-testid="issue-comment"]').should('contain', 'Edit')
                .and('contain', comment_edited);

            //Delete comment
            //Clicks on "Delete button"
            cy.contains('Delete').click();
        });
            //Clicks on the "Delete button" in confirmation window and asserts if it doesn't exist anymore.
            cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment')
                .click().should('not.exist');
            //Assertion for checking if comment has been deleted.
            getIssueDetailsModal().contains(comment_edited).should('not.exist');

    });

/*     it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    }); */
});
