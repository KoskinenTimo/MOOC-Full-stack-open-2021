describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser('mattimeika', 'password', 'Matti Meikäläinen')
    cy.createUser('uunoturha', 'password', 'Uuno Turhapuro')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username:')
    cy.contains('Password:')
    cy.get('.cancel-button').click()
    cy.should('not.contain', '.login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameInput').type('mattimeika')
      cy.get('#passwordInput').type('password')
      cy.get('#login-button').click()
      cy.contains('Matti Meikäläinen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameInput').type('mattimeika')
      cy.get('#passwordInput').type('salasana')
      cy.get('#login-button').click()
      cy.get('.error')
        .contains('Login details incorrect')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('mattimeika', 'password')
    })

    it('A blog can be created', function() {
      cy.contains('Create A Blog').click()
      cy.get('#title').type('Awsome Blog')
      cy.get('#author').type('Matti Meikäläinen')
      cy.get('#url').type('www.blog.com')
      cy.get('.blog-form').submit()
      cy.get('.blog-list').contains('Awsome Blog Matti Meikäläinen')
    })

    it('A blog can be liked', function() {
      cy.createBlog('Awsome Blog','Matti Meikäläinen','www.blog.com')
      cy.contains('Awsome Blog').parent().find('button').as('showButton')
      cy.get('@showButton').click()
      cy.contains('Likes').find('button').as('likeButton')
      cy.get('@likeButton').click()
      cy.contains('Awsome Blog')
        .parent()
        .should('contain', 'Likes: 1')
    })

    it('A blog can be removed', function() {
      cy.createBlog('Awsome Blog','Matti Meikäläinen','www.blog.com')
      cy.contains('Awsome Blog').parent().find('button').as('showButton')
      cy.get('@showButton').click()
      cy.contains('Awsome Blog').parent().get('.remove-blog-button').click()
    })

    it('A blog cannot be removed if the user logged in is not the creator', function() {
      cy.createBlog('Awsome Blog','Matti Meikäläinen','www.blog.com')
      cy.contains('Log out').click()
      cy.login('uunoturha', 'password')
      cy.contains('Awsome Blog').parent().should('not.contain', '.remove-blog-button')
    })

    it('Blogs are in descending order according to likes', function() {
      cy.createBlog('Awsome Blog 1','Matti Meikäläinen','www.blog1.com')
      cy.contains('Awsome Blog 1').parent().find('button').as('showButton1')
      cy.get('@showButton1').click()
      cy.contains('Likes').find('button').as('likeButton1')
      cy.get('@likeButton1').click()

      cy.createBlog('Awsome Blog 2','Matti Meikäläinen','www.blog2.com')
      cy.contains('Awsome Blog 2').parent().find('button').as('showButton2')
      cy.get('@showButton2').click()
      cy.contains('Likes').find('button').as('likeButton2')
      cy.get('@likeButton2').click().wait(200).click()

      cy.createBlog('Awsome Blog 3','Matti Meikäläinen','www.blog3.com')
      cy.contains('Awsome Blog 3').parent().find('button').as('showButton3')
      cy.get('@showButton3').click()
      cy.contains('Likes').find('button').as('likeButton3')
      cy.get('@likeButton3').click().wait(200).click().wait(200).click()
      cy.visit('http://localhost:3000')

      cy.get('.listTitle').eq(0).should('contain', 'Awsome Blog 3')
      cy.get('.listTitle').eq(1).should('contain', 'Awsome Blog 2')
      cy.get('.listTitle').eq(2).should('contain', 'Awsome Blog 1')
    })
  })
})