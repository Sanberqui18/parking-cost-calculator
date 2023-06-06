/// <reference types="Cypress" />

describe('Validate Edge Cases', () => {
    beforeEach(() => {
        cy.visit("");
        
    });

    it('Non price should be generated when time imputs are empty', () => {
        cy.get("[type='submit']").click();

        cy.get("b").then((message) => {
            let error = message.text();
            
            expect(error).to.eql("ERROR! Enter A Correctly Formatted Date");
        })
    });


    it('Clicking on a Calendar icon opens a calendar pop-up', () => {
        cy.window().then((win) => {
            const stub = cy.stub(win, 'open').as("windowOpen");
        })
        
        //cy.get('[href*="StartingDate"]').click();
        //cy.get("@windowOpen").should("be.called");

    }) 
});