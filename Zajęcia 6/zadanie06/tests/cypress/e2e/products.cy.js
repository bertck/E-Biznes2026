describe('Products page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('loads and displays a list of products', () => {
        cy.get('[data-cy=product-list]').should('exist');
        cy.get('[data-cy=product-list]').should('be.visible');
        cy.get('[data-cy=product-item]').should('have.length.greaterThan', 0);
        cy.get('[data-cy=product-item]').should('be.visible');
    });

    it('displays product names', () => {
        cy.get('[data-cy=product-name]').should('have.length.greaterThan', 0);
        cy.get('[data-cy=product-name]').first().should('not.be.empty');
        cy.get('[data-cy=product-name]').should('be.visible');
        cy.get('[data-cy=product-name]').first().should('not.contain', 'undefined');
    });

    it('displays product prices', () => {
        cy.get('[data-cy=product-price]').should('have.length.greaterThan', 0);
        cy.get('[data-cy=product-price]').first().should('not.be.empty');
        cy.get('[data-cy=product-price]').should('be.visible');
        cy.get('[data-cy=product-price]').first().invoke('text').then((price) => {
            expect(parseFloat(price)).to.be.greaterThan(0);
        });
    });

    it('displays an "Add to cart" button for each product', () => {
        cy.get('[data-cy=add-to-cart-btn]').should('have.length.greaterThan', 0);
        cy.get('[data-cy=product-item]').then((items) => {
            cy.get('[data-cy=add-to-cart-btn]').should('have.length', items.length);
        });
        cy.get('[data-cy=add-to-cart-btn]').first().should('be.enabled');
        cy.get('[data-cy=add-to-cart-btn]').first().should('contain', 'Add to cart');
    });

    it('does not show an error message when products load correctly', () => {
        cy.contains('Error').should('not.exist');
        cy.contains('Loading products').should('not.exist');
        cy.get('[data-cy=product-list]').should('exist');
        cy.get('[data-cy=product-item]').should('have.length.greaterThan', 0);
    });
});