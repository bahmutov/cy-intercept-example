# cy-intercept-example
> Cypress v6 network examples using [cy.intercept](https://on.cypress.io/intercept)

```
npm install
npx cypress open
```

See more information at:
- [cy.intercept](https://on.cypress.io/intercept) documentation page
- [Network Requests](https://example.cypress.io/commands/network-requests) example page
- [`cy.intercept` recipe](https://github.com/cypress-io/cypress-example-recipes#stubbing-and-spying)
- [Difference between cy.route and cy.route2](https://glebbahmutov.com/blog/cy-route-vs-route2/) blog post (`cy.route2` was the experimental command name before it became the official `cy.intercept`)

Watch the video of the introduction at [https://youtu.be/_wfKbYQlP_Y](https://youtu.be/_wfKbYQlP_Y)

See [cypress/integration/spec.js](cypress/integration/spec.js), here is a fragment that stubs Ajax call to external domain to fetch three users:

```js
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
```
