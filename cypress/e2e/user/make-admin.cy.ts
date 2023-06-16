describe('Cliente', () => {
  it('Deve criar um cliente', () => {
    cy.visit('/admin/register');

    const cpf = '736.968.970-00';
    const cnpj = '94.909.331/0001-92';

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

    cy.get('#corporateName', { timeout: 500000 }).type(
      'Cypress Estabelecimento',
    );
    cy.get('#representativeName', { timeout: 500000 }).type(
      'Cypress Representante',
    );
    cy.get('#cnpj', { timeout: 500000 }).type(cnpj);
    cy.get('#corporateEmail', { timeout: 500000 }).type(
      'corporate@icut.com.br',
    );
    cy.get('#logo', { timeout: 500000 }).type(
      'https://static.vecteezy.com/system/resources/thumbnails/010/403/942/small/gentleman-barber-shop-vintage-logo-design-vector.jpg',
    );

    cy.get('#zipCode', { timeout: 500000 }).type('54792-360');
    cy.get('#street', { timeout: 500000 }).type(
      'Rua Carlos Magalhães de Azevedo',
    );
    cy.get('#number', { timeout: 500000 }).type('123');
    cy.get('#city', { timeout: 500000 }).type('Camaragibe');
    cy.get('#state', { timeout: 500000 }).type('Pernambuco');

    cy.findByTestId('register-button').click();

    cy.url().should('include', '/login');
  });
});
