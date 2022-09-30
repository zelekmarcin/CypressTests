export class LoginPage
{
    loginPageLoaded(){
        cy.contains('Login')
        cy.get('[data-test="login-button"]').should('be.visible')
    }
    submitEmptyLogin(){
        cy.get('.login-box').find('form').then( form => {
            cy.wrap(form).find('[data-test="username"]').clear().should('be.empty')
            cy.wrap(form).find('[data-test="password"]').clear().should('be.empty')
            cy.wrap(form).submit()
        })
        cy.get('[data-test="error"]').should('contain.text', 'Username is required')

    }

    submitSuccessfullLogin(login, password){

        cy.get('.login-box').find('form').then( form => {
          cy.wrap(form).find('[data-test="username"]').clear().type(login).should('have.value', login)
          cy.wrap(form).find('[data-test="password"]').clear().type(password).should('not.have.value', '')
          cy.wrap(form).find('[data-test="login-button"]').should('be.enabled')
          cy.wrap(form).submit()
        })

        if(login === 'standard_user') {
            cy.url().should('not.eq', Cypress.config().baseUrl)
            cy.getCookie('session-username').should('have.property', 'value', login)
        }

    }    

}

export const onLoginPage = new LoginPage()