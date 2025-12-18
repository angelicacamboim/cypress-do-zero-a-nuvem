import data from '../fixtures/users.json'

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') // abre a página antes de cada teste
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
  })

   it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.firstNameType(data.firstName).lastNameType(data.lastName).emailType(data.email).textoType(data.texto).sendButton();
   
    cy.successMessage();

  })

   it('exibe mensagem de erro ao submeter o formulário com um email inválido', () => {
    cy.firstNameType(data.firstName).lastNameType(data.lastName).emailType(data.email = 'teste@teste').textoType(data.texto).sendButton();
    cy.requiredMessage()
  })

  it('mantém o campo de telefone vazio quando valor não-numérico é digitado', () => {
    cy.phoneTyp('ert').should('have.value', '') // verifica que continua vazio
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.firstNameType(data.firstName).lastNameType(data.lastName).emailType(data.email).textoType(data.texto)
    cy.phoneContact().sendButton();

    cy.requiredMessage()

  })

   it('preenche e limpa os campos nome e sobrenome', () => {
    cy.firstNameType(data.firstName)
      .should('have.value', data.firstName)
      .clear()
      .should('have.value', '')

    cy.lastNameType(data.lastName)
    .should('have.value', data.lastName)
    .clear()
    .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.sendButton().requiredMessage();
  })

   it('seleciona um produto (YouTube) por seu texto', () => {
    cy.productSelect().select('youtube').should('have.value', 'youtube')
   
  })

   it('seleciona um produto (Blog) por seu índice', () => {
    cy.productSelect().select(1).should('have.value', 'blog')
   
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.serviceType('feedback').check().should('be.checked')
  })

   it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((service) => {
       cy.wrap(service).check().should('be.checked')
  })
    })

   it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    .last().uncheck().should('not.be.checked')  // Desmarca apenas o último
 
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.fileSelect('cypress/fixtures/example.json')
      // Verifica se o nome do arquivo foi persistido corretamente
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.fileSelect('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        // Verifica se o nome do arquivo foi persistido corretamente
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

 it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    // Carrega a fixture e dá um alias
    cy.fixture('example.json').as('aliasexample')
    cy.fileSelect('@aliasexample', { action: 'drag-drop' })
    .should((input) => {
    // Verifica se o nome do arquivo foi persistido corretamente
    expect(input[0].files[0].name).to.equal('example.json')
  })
})

 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.link().should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank')

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.link().invoke('removeAttr', 'target') // remove o target
    .click(); // clica no link

    // Valida que a URL mudou para a página de política de privacidade
    cy.url().should('include', '/privacy.html');

    // Valida que o título ou algum conteúdo esperado está presente
    cy.contains('CAC TAT - Política de Privacidade').should('be.visible');
});

  it('testa a página da política de privacidade de forma independente', () => {
    cy.link().invoke('removeAttr', 'target') // remove o target
    .click(); // clica no link

    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')

    cy.get('#title').should('have.text', 'CAC TAT - Política de Privacidade')
    cy.get('#white-background p').should('contain', 'Talking About Testing')
    
  });

   it('digita várias vezes no campo de texto', () => {
    Cypress._.times(3, () => {
      cy.textoType('Teste automatizado!{enter}')
    })})

    it('Rodar teste 3x', () => {
    Cypress._.times(3, () => {
      cy.firstNameType(data.firstName).lastNameType(data.lastName).emailType(data.email).textoType(data.texto).sendButton();
      cy.successMessage();
    })})

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show') //faça aparecer
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide') //esconda novamente
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show') //faça aparecer
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide') // esconder novamente
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.textoType('type olá').invoke('val', 'um texto qualquer').should('have.value', 'um texto qualquer')
  })

 it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .then((response) => {
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        expect(response.body).to.include('CAC TAT')
      })
  })
  it.only('encontra o gato e demonstra que está visível', () => {
    cy.get('#cat') 
      .invoke('show') // força a exibição
      .should('be.visible')

    cy.get('#title')
     .invoke('text', 'CAT TAT') // força a exibição
  })


  })