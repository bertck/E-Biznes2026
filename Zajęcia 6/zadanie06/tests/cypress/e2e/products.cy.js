describe('Products page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('loads and displays a list of products', () => {
        cy.get('[data-cy=product-item]').should('have.length.greaterThan', 0);
    });

    it('displays product names', () => {
        cy.get('[data-cy=product-name]').first().should('not.be.empty');
    });

    it('displays product prices', () => {
        cy.get('[data-cy=product-price]').first().should('not.be.empty');
    });

    it('displays an "Add to cart" button for each product', () => {
        cy.get('[data-cy=add-to-cart-btn]').should('have.length.greaterThan', 0);
    });

    it('does not show an error message when products load correctly', () => {
        cy.contains('Error').should('not.exist');
    });
});