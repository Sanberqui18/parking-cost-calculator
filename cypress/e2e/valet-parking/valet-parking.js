/// <reference types="Cypress" />

function convert12To24(time12, ampm = "AM") {
    let [hours, minutes] = time12.split(":");
  
    if (hours === "12") {
      hours = "00";
    }
  
    if (ampm === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
  
    if (ampm === "AM" && hours === "12") {
      hours = "12";
    }
  
    return hours + ":" + minutes;
}
  

function calculateTimeDifference(startDateString, endDateString, startHour = "00:00", endHour = "00:00"){

    let startDateTimeString = startDateString + " " + startHour;
    let endDateTimeString = endDateString + " " + endHour;
    
    let startDateTime = new Date(startDateTimeString);
    let endDateTime = new Date(endDateTimeString);
    
    var timeDiffInMilliseconds = endDateTime - startDateTime;
    var timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60);
    console.log(timeDiffInHours);

    return timeDiffInHours;
}

function timeElapsed(hours) {

    let days = Math.floor(hours / 24);
    let hoursLeft = Math.floor(hours % 24);
    let minutes = Math.floor((hours % 1) * 60);
  
    return {
      days: days,
      hours: hoursLeft,
      minutes: minutes
    };
}

describe('Validate Valet Parking', () => {
    beforeEach(() => {
        cy.visit("");
    });

    it('Day Calculation is correct', () => {

        let startDate = "06/04/2023";
        let endDate = "06/05/2023";

        let timeSpent = calculateTimeDifference(startDate, endDate);
        let summary = timeElapsed(timeSpent);
        let expectedCost;
        
        if(timeSpent > 5 && timeSpent < 24){
            expectedCost = 18;
        }else if(timeSpent >= 24){
            expectedCost = Math.ceil(timeSpent/24) * 18;   
        }else{
            expectedCost = 12;
        }

        cy.get("#ParkingLot").select("Valet Parking");

        cy.get("#StartingDate").clear().type(startDate);
        cy.get("#LeavingDate").clear().type(endDate);

        cy.get("[type='submit']").click();

        cy.get(".SubHead > b").then((value) => {
            let total = value.text().slice(2);
            let cost = parseFloat(total);
            cy.log(cost);
        
            expect(cost).to.eql(expectedCost);
        });

        cy.get(".BodyCopy > b").then(message => {
            const timeString = message.text();
            expect(timeString).to.contains(`(${summary.days} Days, ${summary.hours} Hours, ${summary.minutes} Minutes)`);
        });
    });

    it('PM Hours Calculation is correct', () => {
        
        let startDate = "06/05/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let startAMPM = "PM "

        let endHour = "3:30"
        let endAMPM = "PM "

        let timeSpent;
        let expectedCost;
        

        cy.get("#ParkingLot").select("Valet Parking");

        cy.get("#StartingDate").clear().type(startDate);
        cy.get("#LeavingDate").clear().type(endDate);

        cy.get("#StartingTime").clear().type(startHour);
        let startConverted = convert12To24(startHour, startAMPM);

        cy.get("#LeavingTime").clear().type(endHour);
        let endConverted = convert12To24(endHour, endAMPM);    

        cy.get("input[name='StartingTimeAMPM'][type='radio']").eq(1).check();
        cy.get("input[name='LeavingTimeAMPM'][type='radio']").eq(1).check();

        timeSpent = calculateTimeDifference(startDate, endDate, startConverted, endConverted);
        let summary = timeElapsed(timeSpent);

        if(timeSpent > 5 && timeSpent < 24){
            expectedCost = 18;
        }else if(timeSpent >= 24){
            expectedCost = Math.ceil(timeSpent/24) * 18;   
        }else{
            expectedCost = 12;
        }

        cy.get("[type='submit']").click();

        cy.get(".SubHead > b").then((value) => {
            let total = value.text().slice(2);
            let cost = parseFloat(total);
            cy.log(cost);
        
            expect(cost).to.eql(expectedCost);
        });

        cy.get(".BodyCopy > b").then(message => {
            const timeString = message.text();
            expect(timeString).to.contains(`(${summary.days} Days, ${summary.hours} Hours, ${summary.minutes} Minutes)`);
        });
    });

    it('AM Hours Calculation is correct', () => {
        
        let startDate = "06/05/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let startAMPM = "AM "

        let endHour = "3:30"
        let endAMPM = "AM "

        let timeSpent;
        let expectedCost;
        

        cy.get("#ParkingLot").select("Valet Parking");

        cy.get("#StartingDate").clear().type(startDate);
        cy.get("#LeavingDate").clear().type(endDate);

        cy.get("#StartingTime").clear().type(startHour);
        let startConverted = convert12To24(startHour, startAMPM);

        cy.get("#LeavingTime").clear().type(endHour);
        let endConverted = convert12To24(endHour, endAMPM);    

        cy.get("input[name='StartingTimeAMPM'][type='radio']").eq(0).check();
        cy.get("input[name='LeavingTimeAMPM'][type='radio']").eq(0).check();

        timeSpent = calculateTimeDifference(startDate, endDate, startConverted, endConverted);
        let summary = timeElapsed(timeSpent);

        if(timeSpent > 5 && timeSpent < 24){
            expectedCost = 18;
        }else if(timeSpent >= 24){
            expectedCost = Math.ceil(timeSpent/24) * 18;   
        }else{
            expectedCost = 12;
        }

        cy.get("[type='submit']").click();

        cy.get(".SubHead > b").then((value) => {
            let total = value.text().slice(2);
            let cost = parseFloat(total);
            cy.log(cost);
        
            expect(cost).to.eql(expectedCost);
        });

        cy.get(".BodyCopy > b").then(message => {
            const timeString = message.text();
            expect(timeString).to.contains(`(${summary.days} Days, ${summary.hours} Hours, ${summary.minutes} Minutes)`);
        });
    });

    it('AM & PM Hours Calculation is correct', () => {
        
        let startDate = "06/05/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let startAMPM = "AM"

        let endHour = "3:30"
        let endAMPM = "PM"

        let timeSpent;
        let expectedCost;
        

        cy.get("#ParkingLot").select("Valet Parking");

        cy.get("#StartingDate").clear().type(startDate);
        cy.get("#LeavingDate").clear().type(endDate);

        cy.get("#StartingTime").clear().type(startHour);
        let startConverted = convert12To24(startHour, startAMPM);

        cy.get("#LeavingTime").clear().type(endHour);
        let endConverted = convert12To24(endHour, endAMPM);    

        cy.get("input[name='StartingTimeAMPM'][type='radio']").eq(0).check();
        cy.get("input[name='LeavingTimeAMPM'][type='radio']").eq(1).check();

        timeSpent = calculateTimeDifference(startDate, endDate, startConverted, endConverted);
        let summary = timeElapsed(timeSpent);

        if(timeSpent > 5 && timeSpent < 24){
            expectedCost = 18;
        }else if(timeSpent >= 24){
            expectedCost = Math.ceil(timeSpent/24) * 18;   
        }else{
            expectedCost = 12;
        }

        cy.get("[type='submit']").click();

        cy.get(".SubHead > b").then((value) => {
            let total = value.text().slice(2);
            let cost = parseFloat(total);
            cy.log(cost);
        
            expect(cost).to.eql(expectedCost);
        });

        cy.get(".BodyCopy > b").then(message => {
            const timeString = message.text();
            expect(timeString).to.contains(`(${summary.days} Days, ${summary.hours} Hours, ${summary.minutes} Minutes)`);
        });
    });

    it('Days and hours Calculation is correct', () => {
        
        let startDate = "06/03/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let startAMPM = "AM"

        let endHour = "7:30"
        let endAMPM = "PM"

        let timeSpent;
        let expectedCost;
        

        cy.get("#ParkingLot").select("Valet Parking");

        cy.get("#StartingDate").clear().type(startDate);
        cy.get("#LeavingDate").clear().type(endDate);

        cy.get("#StartingTime").clear().type(startHour);
        let startConverted = convert12To24(startHour, startAMPM);

        cy.get("#LeavingTime").clear().type(endHour);
        let endConverted = convert12To24(endHour, endAMPM);    

        cy.get("input[name='StartingTimeAMPM'][type='radio']").eq(0).check();
        cy.get("input[name='LeavingTimeAMPM'][type='radio']").eq(1).check();

        timeSpent = calculateTimeDifference(startDate, endDate, startConverted, endConverted);
        let summary = timeElapsed(timeSpent);

        if(timeSpent > 5 && timeSpent < 24){
            expectedCost = 18;
        }else if(timeSpent >= 24){
            expectedCost = Math.ceil(timeSpent/24) * 18;   
        }else{
            expectedCost = 12;
        }

        cy.get("[type='submit']").click();

        cy.get(".SubHead > b").then((value) => {
            let total = value.text().slice(2);
            let cost = parseFloat(total);
            cy.log(cost);
        
            expect(cost).to.eql(expectedCost);
        });

        cy.get(".BodyCopy > b").then(message => {
            const timeString = message.text();
            expect(timeString).to.contains(`(${summary.days} Days, ${summary.hours} Hours, ${summary.minutes} Minutes)`);
        });
    });    
});