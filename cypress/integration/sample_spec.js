const selectors = {
  navbar: '.navbar'
}

describe('Testing pages', () => {
  it('Navigate to services page', () => {
    cy.visit('http://localhost:3000')
    // Find a link with an href attribute containing "about" and click it
    cy.get(selectors.navbar).find('a[href*="services"]').click()

    cy.url().should('include', '/services')
  })
  it('Navigate to contact page', () => {
    cy.visit('http://localhost:3000')
    // Find a link with an href attribute containing "about" and click it
    cy.get(selectors.navbar).find('a[href*="contact"]').click()
    cy.url().should('include', '/contact')
  })
})
