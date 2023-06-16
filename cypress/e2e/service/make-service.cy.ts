describe('Serviços', () => {
  it('deve ser possível adicionar um serviço', () => {
    cy.visit('/login');

    cy.get('#email', { timeout: 50000 }).type(
      'teste-icut-company@tuamaeaquelaursa.com',
    );
    cy.get('#password').type('1234');
    cy.findByText('Entrar').click();

    cy.findByTestId('/admin/service').click();

    cy.findByText('Adicionar').click();

    cy.get('#description', { timeout: 500000 }).type('test description');
    cy.get('#value', { timeout: 500000 }).type('25');
    cy.get('#timeDuration', { timeout: 500000 }).select(0);
    cy.get('#typeService', { timeout: 500000 }).select(0);

    cy.findByText('Salvar').click();
    cy.url().should('include', '/admin/service');
  });

  it('deve ser possível remover um serviço', () => {
    cy.visit('/login');

    cy.get('#email', { timeout: 50000 }).type(
      'teste-icut-company@tuamaeaquelaursa.com',
    );
    cy.get('#password').type('1234');
    cy.findByText('Entrar').click();

    cy.findByTestId('/admin/service').click();

    cy.get(
      ':nth-child(1) > .styles_actions__S4fpm > .styles_delete__SInFN',
    ).click();
  });

  it('deve ser possível atualizar um serviço', () => {
    cy.visit('/login');

    cy.get('#email', { timeout: 50000 }).type(
      'teste-icut-company@tuamaeaquelaursa.com',
    );
    cy.get('#password').type('1234');
    cy.findByText('Entrar').click();

    cy.findByTestId('/admin/service').click();

    cy.get(
      ':nth-child(1) > .styles_actions__S4fpm > .styles_primary__EgpAW',
    ).click();

    cy.get('#description').type('update description');

    cy.findByText('Salvar').click();
  });
});
