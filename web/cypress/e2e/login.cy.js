describe('Login', ()=> {
  it('Webpage Log on', ()=> {
    cy.urlEntry('http://localhost:3000');

    cy.loginSubmit('papito@webdojo.com', 'katana123');

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito');

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })
})