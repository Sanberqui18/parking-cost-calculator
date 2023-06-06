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
    
    let timeDiffInMilliseconds = endDateTime - startDateTime;
    let timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60);
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

function costCalculation(hours){
    let spentHours = hours;
    let discountHours = Math.floor(hours/(168));
    console.log(discountHours);

    if(hours % 168 === 0){
        discountHours += 1*24;
    };

    console.log(spentHours);
    console.log(discountHours);

    let totalCost = Math.ceil((spentHours - discountHours)/24) * 12;
    console.log(totalCost);

    return totalCost;
}

describe('Validate Long-Term Garage Parking', () => {
    beforeEach(() => {
        cy.visit("");
    });
   
    it(' 7 Day Calculation is Correct', () => {
        let startDate = "06/04/2023";
        let endDate = "06/07/2023";

        let timeSpent = calculateTimeDifference(startDate, endDate);
        let summary = timeElapsed(timeSpent);
        let expectedCost;
        
        if(timeSpent >= 24){
            expectedCost = costCalculation(timeSpent);
        }else if(timeSpent > 1 && timeSpent < 24){
            expectedCost = Math.ceil(timeSpent) * 2
            if(expectedCost > 12){
                expectedCost = 12;
            }
        }else{
            expectedCost = 2;
        }

        cy.get("#ParkingLot").select("Long-Term Garage Parking");

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
    it(' Day Calculation is Correct', () => {
        let startDate = "06/04/2023";
        let endDate = "06/05/2023";

        let timeSpent = calculateTimeDifference(startDate, endDate);
        let summary = timeElapsed(timeSpent);
        let expectedCost;
        
        if(timeSpent >= 24){
            expectedCost = costCalculation(timeSpent);
        }else if(timeSpent > 1 && timeSpent < 24){
            expectedCost = Math.ceil(timeSpent) * 2
            if(expectedCost > 12){
                expectedCost = 12;
            }
        }else{
            expectedCost = 2;
        }

        cy.get("#ParkingLot").select("Long-Term Garage Parking");

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
    it('PM < 1 Hours Calculation is correct', () => {
        
        let startDate = "06/05/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let startAMPM = "PM "

        let endHour = "3:30"
        let endAMPM = "PM "

        let timeSpent;
        let expectedCost;
        

        cy.get("#ParkingLot").select("Long-Term Garage Parking");

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

        if(timeSpent >= 24){
            expectedCost = costCalculation(timeSpent);
        }else if(timeSpent > 1 && timeSpent < 24){
            expectedCost = Math.ceil(timeSpent) * 2
            if(expectedCost > 12){
                expectedCost = 12;
            }
        }else{
            expectedCost = 2;
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
    it('AM > 1 Hours Calculation is correct', () => {
        
        let startDate = "06/05/2023";
        let endDate = "06/05/2023";

        let startHour = "12:00"
        let startAMPM = "AM "

        let endHour = "12:30"
        let endAMPM = "AM "

        let timeSpent;
        let expectedCost;
        

        cy.get("#ParkingLot").select("Long-Term Garage Parking");

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

        if(timeSpent >= 24){
            expectedCost = costCalculation(timeSpent);
        }else if(timeSpent > 1 && timeSpent < 24){
            expectedCost = Math.ceil(timeSpent) * 2
            if(expectedCost > 12){
                expectedCost = 12;
            }
        }else{
            expectedCost = 2;
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
        

        cy.get("#ParkingLot").select("Long-Term Garage Parking");

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

        if(timeSpent >= 24){
            expectedCost = costCalculation(timeSpent);
        }else if(timeSpent > 1 && timeSpent < 24){
            expectedCost = Math.ceil(timeSpent) * 2
            if(expectedCost > 12){
                expectedCost = 12;
            }
        }else{
            expectedCost = 2;
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