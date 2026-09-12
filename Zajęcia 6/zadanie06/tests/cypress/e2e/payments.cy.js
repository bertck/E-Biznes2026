describe('Payments page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('shows amount to pay as 0 when cart is empty', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=payment-amount]').should('contain', '0.00');
    });

    it('disables the Pay button when cart is empty', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=pay-btn]').should('be.disabled');
    });

    it('enables the Pay button when cart has items', () => {
        cy.get('[data-cy=add-to-cart-btn]').first().click();
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=pay-btn]').should('not.be.disabled');
    });

    it('allows typing a card name', () => {
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=card-name-input]').type('Jan Kowalski');
        cy.get('[data-cy=card-name-input]').should('have.value', 'Jan Kowalski');
    });

    it('shows a success message after submitting a payment', () => {
        cy.get('[data-cy=add-to-cart-btn]').first().click();
        cy.get('[data-cy=nav-payments]').click();
        cy.get('[data-cy=card-name-input]').type('Jan Kowalski');
        cy.get('[data-cy=pay-btn]').click();
        cy.get('[data-cy=payment-status]').should('contain', 'successfully');
    });
});