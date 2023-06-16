describe('Fazer uma agenda', () => {
  it('deve ser possível criar uma nova agenda', () => {
    cy.visit('/login');

    cy.get('#email', { timeout: 50000 }).type(
      'teste-icut@tuamaeaquelaursa.com',
    );
    cy.get('#password').type('1234');
    cy.findByText('Entrar').click();

    cy.findByTestId('schedule-0', { timeout: 50000 }).click();
    cy.findByTestId('service-item-0', { timeout: 50000 }).click();
    cy.findByTestId('employee-0', { timeout: 50000 }).click();
    cy.findByTestId('time-0', { timeout: 50000 }).click();

    cy.findByText('Avançar').click();

    cy.findByTestId('payment-0', { timeout: 50000 }).click();
    cy.findByTestId('pay-button', { timeout: 50000 }).click();
    cy.findByText('Confirmar', { timeout: 50000 }).click();
  });
});
