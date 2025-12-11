Cypress.Commands.add('fillMandatoryFieldsAndSubmit', dados => {
    cy.get("#firstName").type(dados.firstName)
    cy.get("#lastName").type(dados.lastName)
    cy.get('input[id="email"]').type(dados.email)
    cy.get('textarea[name="open-text-area"]').type(dados.texto)
  cy.contains('button', 'Enviar').click()
})