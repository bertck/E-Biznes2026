describe('Cart page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('shows an empty cart message when nothing is added', () => {
        cy.get('[data-cy=nav-cart]').click();
        cy.get('[data-cy=empty-cart-message]').should('be.visible');
    });

    it('adds a product to the cart', () => {
        cy.get('[data-cy=add-to-cart-btn]').first().click();
        cy.get('[data-cy=nav-cart]').click();
        cy.get('[data-cy=cart-item]').should('have.length', 1);
    });

    it('adds multiple products to the cart', () => {
        cy.get('[data-cy=add-to-cart-btn]').eq(0).click();
        cy.get('[data-cy=add-to-cart-btn]').eq(1).click();
        cy.get('[data-cy=nav-cart]').click();
        cy.get('[data-cy=cart-item]').should('have.length', 2);
    });

    it('displays the correct total price', () => {
        cy.get('[data-cy=product-price]').first().invoke('text').then((price) => {
            cy.get('[data-cy=add-to-cart-btn]').first().click();
            cy.get('[data-cy=nav-cart]').click();
            cy.get('[data-cy=cart-total]').should('contain', parseFloat(price).toFixed(2));
        });
    });

    it('removes empty cart message once a product is added', () => {
        cy.get('[data-cy=add-to-cart-btn]').first().click();
        cy.get('[data-cy=nav-cart]').click();
        cy.get('[data-cy=empty-cart-message]').should('not.exist');
    });
});