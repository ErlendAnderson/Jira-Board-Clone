/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //Find delete button on issue detailed view and click it
    IssueModal.findDeleteButton();
    //In confirmation view find the blue "Delete" button on click it.
    IssueModal.confirmDeletion();
    //Assert that issue is not visible in the board.
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it('Should cancel deletion process successfully', () => {
    //Assert that issue detail view modal is visible
    //IssueModal.issueDetailModal.should('exist');
    //Find delete button and click it
    IssueModal.findDeleteButton();
    //Assert that deletion confirmation window is visible
    IssueModal.cancelDeletion();
    //Close issue report window
    IssueModal.closeDetailModal();
    //Assert that issue is visible on the board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});
