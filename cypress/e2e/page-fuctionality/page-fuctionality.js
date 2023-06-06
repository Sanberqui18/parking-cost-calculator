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

    });
    it('Time used should remain the same', () => {
        let startDate = "06/04/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let endHour = "3:30"


        cy.get("#ParkingLot").select("Valet Parking");

        cy.get("#StartingDate").clear().type(startDate);
        cy.get("#LeavingDate").clear().type(endDate);

        cy.get("#StartingTime").clear().type(startHour);
        cy.get("#LeavingTime").clear().type(endHour);
   

        cy.get("input[name='StartingTimeAMPM'][type='radio']").eq(0).check();
        cy.get("input[name='LeavingTimeAMPM'][type='radio']").eq(1).check();

        cy.get("[type='submit']").click();

        cy.get("#StartingDate").invoke('val').should('eq', startDate);
        cy.get("#LeavingDate").invoke('val').should('eq', endDate);

        cy.get("#StartingTime").invoke('val').should('eq', startHour);
        cy.get("#LeavingTime").invoke('val').should('eq', endHour);

        cy.get("input[name='StartingTimeAMPM'][type='radio']").eq(0).should('be.checked');
        cy.get("input[name='LeavingTimeAMPM'][type='radio']").eq(1).should('be.checked');;

    })
});