describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('frontPageRender', () => {
    cy.contains('Destacado')
  })

  it('can logIn', () => {
    cy.get('[data-test-id="btn-login"]').click()
    cy.get('[name="email"]').type('test@gmail.com')
    cy.get('[name="password"]').type('12345678')
    cy.get('[type="submit"]').click()
    cy.contains('Destacado')
  })

  it('can logOut', () => {
    cy.get('[data-test-id="btn-open-profile"]').click()
    cy.get('[data-test-id="btn-logout"]').click()
  })
})
