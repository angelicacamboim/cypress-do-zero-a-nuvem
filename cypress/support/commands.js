// Campos para digitar
Cypress.Commands.add('firstNameType', firstName => {
    cy.get("#firstName").type(firstName)
   
})

Cypress.Commands.add('lastNameType', lastName => {
   cy.get("#lastName").type(lastName)

})

Cypress.Commands.add('emailType', email => {
    cy.get('input[id="email"]').type(email)
})

Cypress.Commands.add('textoType', texto => {
    cy.get('textarea[name="open-text-area"]').type(texto)
})

Cypress.Commands.add('phoneTyp', phone => {
  cy.get("#phone").type(phone) 
})

// Combobox: Produto

Cypress.Commands.add('productSelect', () => {
   cy.get('#product')
})

//Radio button: Tipo de atendimento

Cypress.Commands.add('serviceType', (type) => {
  cy.get(`input[type="radio"][value="${type}"]`).check()
})

//Checkbox: Qual seu meio de contato preferencial?

Cypress.Commands.add('phoneContact', () => {
   cy.get("#phone-checkbox").check()
})

Cypress.Commands.add('emailContact', () => {
   cy.get("#email-checkbox").check()
})

//Adicone um anexo
Cypress.Commands.add('fileSelect', (file) => {
  cy.get('#file-upload').selectFile(file)
})


// Botao: enviar

Cypress.Commands.add('sendButton' , () => {
  cy.contains('button', 'Enviar').click()
})

// Mensagens de sucesso e insucesso

Cypress.Commands.add('successMessage' , () => {
  cy.clock() // congela o relógio do navegador

  cy.get('.success').should('be.visible')
  cy.get('.success strong').should('contain', 'Mensagem enviada com sucesso.')

  cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
  cy.get('.success').should('not.be.visible')

})

Cypress.Commands.add('requiredMessage' , () => {
  cy.clock() // congela o relógio do navegador

  cy.get('.error').should('be.visible')
  cy.get('.error strong').should('contain', 'Valide os campos obrigatórios!')

  cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
  cy.get('.error').should('not.be.visible')
})
   

// Link: politicas de privacidade

Cypress.Commands.add('link' , () => {
  cy.contains('a', 'Política de Privacidade')
})

