// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', (username, password, name) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username:username, password:password, name:name
  })
})

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username:username, password:password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogListUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (title, author, url) => {
  const token = JSON.parse(localStorage.getItem('loggedBlogListUser')).token
  const auth = `Bearer ${token}`
  const options = {
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { 'title':title,'author':author,'url':url },
    headers: {
      'Authorization': auth
    } }
  cy.request(options)
  cy.visit('http://localhost:3000')
})
