/// <reference types="Cypress" />

describe('Validate Edge Cases', () => {
    before(() => {
        cy.visit("");
    });

    it('Non price should be generated when time imputs are empty', () => {
        cy.get("[type='submit']").click();

        cy.get("b").then((message) => {
            let error = message.text();
            
            expect(error).to.eql("ERROR! Enter A Correctly Formatted Date");
        })
    });
});