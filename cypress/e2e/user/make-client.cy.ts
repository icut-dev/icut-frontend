describe('Cliente', () => {
  it('Deve criar um cliente', () => {
    cy.visit('/register');

    const cpf = '211.017.570-27';

    cy.get('#username', { timeout: 500000 }).type(
      `New employee ${Math.floor(Math.random() * 100)}`,
    );
    cy.get('#firstName', { timeout: 500000 }).type('Cypress');
    cy.get('#lastName', { timeout: 500000 }).type('e2e');
    cy.get('#email', { timeout: 500000 }).type(
      `cypress${Math.floor(Math.random() * 100)}@gmail.com`,
    );
    cy.get('#cpf', { timeout: 500000 }).type(cpf);
    cy.get('#password', { timeout: 500000 }).type('123456');
    cy.get('#confirmPassword', { timeout: 500000 }).type('123456');
    cy.get('#phones\\.0\\.number', { timeout: 500000 }).type('(11) 99999-9999');
    cy.get('#phones\\.0\\.description', { timeout: 500000 }).type(
      'Celular principal',
    );

    cy.findByText('Cadastrar').click();
  });
});
