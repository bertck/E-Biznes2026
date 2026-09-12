describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('displays the home page with Products by default', () => {
        cy.contains('h2', 'Products').should('be.visible');
        cy.url().should('eq', 'http://localhost:5173/');
        cy.get('[data-cy=product-list]').should('exist');
        cy.get('[data-cy=nav-products]').should('be.visible');
    });

    it('navigates to Cart page', () => {
        cy.get('[data-cy=nav-cart]').click();
        cy.contains('h2', 'Cart').should('be.visible');
        cy.url().should('include', '/cart');
        cy.get('[data-cy=empty-cart-message]').should('exist');
    });

    it('navigates to Payments page', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.contains('h2', 'Payments').should('be.visible');
        cy.url().should('include', '/payments');
        cy.get('[data-cy=pay-btn]').should('exist');
    });

    it('navigates back to Products page', () => {
        cy.get('[data-cy=nav-cart]').click();
        cy.url().should('include', '/cart');
        cy.get('[data-cy=nav-products]').click();
        cy.contains('h2', 'Products').should('be.visible');
        cy.url().should('eq', 'http://localhost:5173/');
    });

    it('shows the app title and nav links', () => {
        cy.contains('h1', 'Shop').should('be.visible');
        cy.get('[data-cy=nav-products]').should('be.visible');
        cy.get('[data-cy=nav-cart]').should('be.visible');
        cy.get('[data-cy=nav-payments]').should('be.visible');
    });
});