import {onLoginPage} from "../support/page_objects/loginPage"
import {onShopPage} from "../support/page_objects/shopPage"

const sizes = [[576, 960], [820, 1180], [1920, 1080]]
//TODO: beforeEach hook

describe('SauceDemo', () => {
  sizes.forEach(size => {

    it('login form validation', () => {
      cy.setResolution(size)  
      cy.visit(Cypress.config().baseUrl)
      onLoginPage.loginPageLoaded()
      onLoginPage.submitEmptyLogin()
    })

    it('Success Login', () => {
      cy.setResolution(size)  

      cy.visit(Cypress.config().baseUrl)
      onLoginPage.loginPageLoaded()
      cy.fixture('users.json').its('data.allUsers').then((list) =>{
      list.forEach((user) =>{
        onLoginPage.submitSuccessfullLogin(user.username, user.password)
        cy.visit(Cypress.config().baseUrl)
        })
     })
    })

   it('Success Order', () => {
    cy.setResolution(size)  

    cy.visit(Cypress.config().baseUrl)
    onLoginPage.loginPageLoaded()
    onLoginPage.submitSuccessfullLogin('standard_user', 'secret_sauce')
    onShopPage.addingSauceLabsBackpackToEmptyCart()

    onShopPage.finishOrder('Sauce Labs Backpack', '29.99', 'fist', 'last', '000') //TODO: put items with their price in fixtures

    })

    it('gives random cat fact', () => {   

      cy.request({
          method: 'GET', 
          url: 'https://catfact.ninja/fact', 
          headers: {
              accept: 'application/json'
            },
          
        }).as('catfact').then((response) => {
          cy.log(JSON.stringify(response.body.fact))
          cy.log('length of this fact is ' + response.body.length + ' characters')
         })
  
         cy.get('@catfact').its('status').should('equal', 200)
  
    })
  })
  
})