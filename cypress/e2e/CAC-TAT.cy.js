describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') // abre a página antes de cada teste
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
  })

   it.only('preenche os campos obrigatórios e envia o formulário', () => {
    const data ={
      firstName: 'Angelica',
      lastName: 'Silva',
      email: 'angelica@example.com',
      texto: 'Adorei a aplicação!'

    }
    cy.fillMandatoryFieldsAndSubmit(data)

    // 🔎 Verifica se a mensagem de sucesso aparece
    cy.get('.success').should('be.visible')
    cy.get('.success strong').should('contain', 'Mensagem enviada com sucesso.',{delay: 10})
  })

   it('exibe mensagem de erro ao submeter o formulário com um email inválido', () => {
    const text = Cypress._.repeat('Adorei a aplicação, parabéns!', 3)

    cy.get("#firstName").type('Angelica')
    cy.get("#lastName").type('Silva')
    cy.get('input[id="email"]').type('angelica@invalido')
    cy.get('textarea[name="open-text-area"]').type(text, {delay: 10})
    cy.contains('button', 'Enviar').click()

    // 🔎 Verifica se a mensagem de erro aparece
    cy.get('.error').should('be.visible')
    cy.get('.error strong').should('contain', 'Valide os campos obrigatórios!')
  })

  it('mantém o campo de telefone vazio quando valor não-numérico é digitado', () => {
    cy.get("#phone")
      .type('abcdefg') // tenta digitar letras
      .should('have.value', '') // verifica que continua vazio
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
   const text = Cypress._.repeat('Adorei a aplicação, parabéns!', 3)
    cy.get("#firstName").type('Angelica')
    cy.get("#lastName").type('Silva')
    cy.get('input[id="email"]').type('angelica@example.com')
    cy.get('textarea[name="open-text-area"]').type(text, {delay: 10})

    // 🔎 Aqui simulamos que o telefone é obrigatório (ex: marcando checkbox)
    cy.get("#phone-checkbox").check() 

    // Envia o formulário sem preencher o telefone
    cy.contains('button', 'Enviar').click()

    // Verifica se a mensagem de erro aparece
    cy.get('.error').should('be.visible')
    cy.get('.error strong').should('contain', 'Valide os campos obrigatórios!')
  })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[name="firstName"]')
      .type('Angelica')
      .should('have.value', 'Angelica')
      .clear()
      .should('have.value', '')

    cy.get('input[name="lastName"]')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')

      cy.get('input[id="email"]')
      .type('angelica@example.com')
      .should('have.value', 'angelica@example.com')
      .clear()
      .should('have.value', '')

    cy.get("#phone")
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    // Verifica se a mensagem de erro aparece
    cy.get('.error').should('be.visible')
    cy.get('.error strong').should('contain', 'Valide os campos obrigatórios!')
  })

   it('seleciona um produto (YouTube) por seu texto', () => {
    // Seleciona a opção YouTube pelo texto visível
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
   
  })

   it('seleciona um produto (Blog) por seu índice', () => {
    // Seleciona a opção YouTube pelo texto visível
    cy.get('#product').select(1).should('have.value', 'blog')
   
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    // Marca a opção Feedback
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

   it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((service) => {
       cy.wrap(service)
         .check() 
         .should('be.checked')
  })
    })

   it('marca ambos checkboxes, depois desmarca o último', () => {
    // Marca ambos checkboxes
    cy.get('input[type="checkbox"]').check().should('be.checked')
    .last().uncheck().should('not.be.checked')  // Desmarca apenas o último
 
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    // Seleciona o input de upload
    cy.get('#file-upload')
      // Faz o upload do arquivo da pasta fixtures
      .selectFile('cypress/fixtures/example.json')
      // Verifica se o nome do arquivo foi persistido corretamente
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    //simula como se o usuário tivesse arrastado e soltado o arquivo no campo de upload
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        // Verifica se o nome do arquivo foi persistido corretamente
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

 it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    // Carrega a fixture e dá um alias
    cy.fixture('example.json').as('aliasexample')

    // Seleciona o input de upload e usa a fixture pelo alias
    cy.get('#file-upload')
      .selectFile('@aliasexample')
      .should((input) => {
        // Verifica se o nome do arquivo foi persistido corretamente
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')

  })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    // Localiza o link da política de privacidade
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target') // remove o target
      .click(); // clica no link

    // Valida que a URL mudou para a página de política de privacidade
    cy.url().should('include', '/privacy.html');

    // Valida que o título ou algum conteúdo esperado está presente
    cy.contains('CAC TAT - Política de Privacidade').should('be.visible');
  });

  it('testa a página da política de privacidade de forma independente', () => {
    
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target') // remove o target
      .click(); // clica no link


    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')

    cy.get('#title').should('have.text', 'CAC TAT - Política de Privacidade')
    cy.get('#white-background p').should('contain', 'Talking About Testing')

    
  });






})