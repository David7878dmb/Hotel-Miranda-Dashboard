describe("Login con los parametros incorrectos", () => {
    it("Carga incorrectamente", () => {
      cy.viewport(1920, 1080)
      cy.visit('http://localhost:5173/login')
      cy.get('input[data-cy="username"]').type('root')
      cy.get('input[data-cy="password"]').type('56788')
      cy.get('button[data-cy="login"]').click().then(() => {
          cy.url().should('include', '/login')
      })
    })
  })