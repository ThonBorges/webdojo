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
            .select('Individual');

        // Interagindo com multipla escolha ou checkboxes
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check() // ou da pra usar o .click()
            .should('be.checked');

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked'); // Esse evento é uma dupla verificação pra garantir que a segunda opção (Pessoa jurídica) não será selecionada.

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('12883424705')
            .should('have.value', '128.834.247-05');

        // Criando loop que verifica todas as opções disponiveis e marca todas.    
        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked');
        })

        //Interagindo com input do tipo file hidden, para importar arquivo externo.
        //Importante! O arquivo DEVE estar no diretório fixtures do próprio Cypress.
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/Celthon_Borges_EN.pdf', { force: true });

        //interagindo com a area de texto
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('dasdadasdadasdasdadadadsadadadsadasda!!!!');

        // Preenchimento de texto e pressionando tecla ENTER + verificação por label pai e span filho
        const techs = [
            'Cypress',
            'Postman',
            'Jenkins',
            'JavaScript'
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}');
            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible');
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check();

        cy.contains('button', 'Enviar formulário')
            .click();

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible');
    })
})
