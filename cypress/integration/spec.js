/// <reference types="cypress" />
describe('intercept', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  it('loads users', () => {
    // https://on.cypress.io/route
    // note: cy.server and cy.route is deprecated in Cypress v6
    // cy.server()
    // cy.route('/users?*', 'fixture:users.json').as('users')

    // https://on.cypress.io/intercept
    cy.intercept({
      pathname: '/users',
      query: {
        _limit: '3'
      }
    }, {
        fixture: 'users.json',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
    }).as('users')

    cy.get('#load-users').click()
    cy.wait('@users')

    cy.get('.user').should('have.length', 3)
  })
})
