describe('funcionários', () => {
  it('deve ser possível adicionar um funcionário', () => {
    cy.visit('/login');

    cy.get('#email', { timeout: 50000 }).type(
      'teste-icut-company@tuamaeaquelaursa.com',
    );
    cy.get('#password').type('1234');
    cy.findByText('Entrar').click();

    cy.findByTestId('/admin/employee').click();

    cy.findByText('Adicionar').click();

    cy.get('#username', { timeout: 500000 }).type(
      `New employee ${Math.floor(Math.random() * 100)}`,
    );
    cy.get('#firstName', { timeout: 500000 }).type('Cypress');
    cy.get('#lastName', { timeout: 500000 }).type('e2e');
    cy.get('#email', { timeout: 500000 }).type(
      `cypress${Math.floor(Math.random() * 100)}@gmail.com`,
    );
    cy.get('#cpf', { timeout: 500000 }).type('077.867.840-71');
    cy.get('#password', { timeout: 500000 }).type('123456');
    cy.get('#confirmPassword', { timeout: 500000 }).type('123456');
    cy.get('#phones\\.0\\.number', { timeout: 500000 }).type('(11) 99999-9999');
    cy.get('#phones\\.0\\.description', { timeout: 500000 }).type(
      'Celular principal',
    );

    cy.findByText('Salvar').click();

    cy.url().should('include', '/admin/employee');
  });

  it('deve ser possível atualizar um funcionário', () => {
    cy.visit('/login');

    cy.get('#email', { timeout: 50000 }).type(
      'teste-icut-company@tuamaeaquelaursa.com',
    );
    cy.get('#password').type('1234');
    cy.findByText('Entrar').click();

    cy.findByTestId('/admin/employee').click();

    cy.get(
      ':nth-child(2) > .styles_actions__GtspP > .styles_button__8V947',
    ).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000).get('#firstName', { timeout: 500000 }).type('atualizado');
    cy.get('#lastName', { timeout: 500000 }).type(
      `${Math.floor(Math.random() * 100)}`,
    );

    cy.findByText('Salvar').click();
    cy.url().should('include', '/admin/employee');
  });
});
