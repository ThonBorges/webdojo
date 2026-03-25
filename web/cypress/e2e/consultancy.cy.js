describe('Formulário de Consultoria', () => {

    it('Consultoria Individual', () => {

        cy.urlEntry('http://localhost:3000');
        cy.loginSubmit('papito@webdojo.com', 'katana123');

        cy.goTo('Formulários', 'Consultoria');

        cy.get('input[placeholder="Digite seu nome completo"]').type('Celthon Borges');
        cy.get('input[placeholder="Digite seu email"]').type('celthonborges@gmail.com');
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('48 991698405')
            .should('have.value', '(48) 99169-8405');

        // //label[text()="Tipo de Consultoria"]/..//select
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('In Company');

    })
})
