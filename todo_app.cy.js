describe('To-Do App', () => {
    beforeEach(() => {
        cy.visit('https://osman-mahmud-antor.github.io/todo-app_in_Cypress/'); // Replace with the actual URL or file path
    });

    it('should load the app correctly', () => {
        cy.contains('To-Do App').should('be.visible'); // Verify the title is visible
        cy.get('#todoInput').should('be.visible'); // Check if the input box is present
        cy.get('#addBtn').should('be.visible'); // Check if the add button is present
    });
    
    
    it('should allow adding a new task', () => {
        cy.get('#todoInput').type('Test Task'); // Enter a task
        cy.get('#addBtn').click(); // Click the add button
        cy.contains('Test Task').should('be.visible'); // Verify the task appears in the list
    });

    
    it('should not allow adding an empty task', () => {
        cy.get('#addBtn').click(); // Click the add button without typing anything
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Task cannot be empty!'); // Verify alert message
        });
    });
    
    
    it('should allow deleting a task', () => {
        cy.get('#todoInput').type('Task to Delete'); // Enter a task
        cy.get('#addBtn').click(); // Add the task
        cy.contains('Task to Delete') // Find the task
            .parent() // Navigate to the parent element (the list item)
            .find('.delete-btn') // Find the delete button
            .click(); // Click the delete button
        cy.contains('Task to Delete').should('not.exist'); // Verify the task is removed
    });

    
    it('should persist tasks across page reloads', () => {
        cy.get('#todoInput').type('Persistent Task'); // Enter a task
        cy.get('#addBtn').click(); // Add the task
        cy.reload(); // Reload the page
        cy.contains('Persistent Task').should('be.visible'); // Verify the task is still visible
    });
    
    
    it('should clear input after adding a task', () => {
        cy.get('#todoInput').type('Clear Input Test'); // Enter a task
        cy.get('#addBtn').click(); // Add the task
        cy.get('#todoInput').should('have.value', ''); // Verify the input is cleared
    });

    

    it('should allow adding multiple tasks', () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3'];
        tasks.forEach((task) => {
            cy.get('#todoInput').type(task);
            cy.get('#addBtn').click();
        });
        tasks.forEach((task) => {
            cy.contains(task).should('be.visible');
        });
    });
    
    
    it('should show the correct number of tasks', () => {
        const tasks = ['Task A', 'Task B'];
        tasks.forEach((task) => {
            cy.get('#todoInput').type(task);
            cy.get('#addBtn').click();
        });
        cy.get('.todo-item').should('have.length', tasks.length); // Verify the number of tasks
    });
    

});
