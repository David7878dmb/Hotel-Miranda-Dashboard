describe("Login con los parametros correctos", () => {
  it("Carga correctamente", () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:5173/login')
    cy.get('input[data-cy="username"]').type('admin')
    cy.get('input[data-cy="password"]').type('1234')
    cy.get('button[data-cy="login"]').click().then(() => {
        cy.url().should('include', '/')
    })
  })
})