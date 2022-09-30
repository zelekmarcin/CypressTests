export class ShopPage
{
    addingSauceLabsBackpackToEmptyCart(){

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('have.text', 'Add to cart').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.text', 'Remove')
        cy.contains('a', '1').should('exist')

    }

    finishOrder(item, price, first, last, zip){
        cy.contains('a', '1').click()
        cy.url().should('eq', (Cypress.config().baseUrl + 'cart.html'))

        cy.contains('a', item).should('exist')
        cy.contains(price)
        
        cy.get('[data-test="checkout"]').click()
        cy.url().should('eq', (Cypress.config().baseUrl + 'checkout-step-one.html'))

        cy.get('[data-test="firstName"]').clear().type(first)
        cy.get('[data-test="lastName"]').clear().type(last)
        cy.get('[data-test="postalCode"]').clear().type(zip)

        cy.get('[data-test="continue"]').click()

        cy.url().should('eq', (Cypress.config().baseUrl + 'checkout-step-two.html'))

        cy.get('[data-test="finish"]').click()
        
        cy.url().should('eq', (Cypress.config().baseUrl + 'checkout-complete.html'))

        cy.contains('THANK YOU FOR YOUR ORDER')
    }
}


export const onShopPage = new ShopPage()