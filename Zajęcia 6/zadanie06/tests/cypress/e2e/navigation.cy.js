describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('displays the home page with Products by default', () => {
        cy.contains('h2', 'Products').should('be.visible');
    });

    it('navigates to Cart page', () => {
        cy.get('[data-cy=nav-cart]').click();
        cy.contains('h2', 'Cart').should('be.visible');
    });

    it('navigates to Payments page', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.contains('h2', 'Payments').should('be.visible');
    });

    it('navigates back to Products page', () => {
        cy.get('[data-cy=nav-cart]').click();
        cy.get('[data-cy=nav-products]').click();
        cy.contains('h2', 'Products').should('be.visible');
    });

    it('shows the app title', () => {
        cy.contains('h1', 'Shop').should('be.visible');
    });
});