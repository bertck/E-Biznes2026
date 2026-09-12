describe('Payments page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('shows amount to pay as 0 when cart is empty', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=payment-amount]').should('contain', '0.00');
        cy.get('[data-cy=payment-amount]').should('be.visible');
        cy.get('[data-cy=card-name-input]').should('have.value', '');
    });

    it('disables the Pay button when cart is empty', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=pay-btn]').should('be.disabled');
        cy.get('[data-cy=pay-btn]').should('be.visible');
        cy.get('[data-cy=pay-btn]').should('contain', 'Pay');
    });

    it('enables the Pay button when cart has items', () => {
        cy.get('[data-cy=add-to-cart-btn]').first().click();
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=pay-btn]').should('not.be.disabled');
        cy.get('[data-cy=payment-amount]').should('not.contain', '0.00');
        cy.get('[data-cy=pay-btn]').should('be.visible');
    });

    it('allows typing a card name', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=card-name-input]').type('Jan Kowalski');
        cy.get('[data-cy=card-name-input]').should('have.value', 'Jan Kowalski');
        cy.get('[data-cy=card-name-input]').invoke('val').should('have.length.greaterThan', 0);
        cy.get('[data-cy=card-name-input]').should('be.visible');
    });

    it('shows a success message after submitting a payment', () => {
        cy.get('[data-cy=add-to-cart-btn]').first().click();
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=card-name-input]').type('Jan Kowalski');
        cy.get('[data-cy=pay-btn]').click();
        cy.get('[data-cy=payment-status]').should('be.visible');
        cy.get('[data-cy=payment-status]').should('contain', 'successfully');
    });
});