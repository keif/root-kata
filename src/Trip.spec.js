import Trip from "./Trip";

let trip;
let tripDetails = "07:15 07:45 17.3".split(" ");
let tripDetails100mphAve = "07:00 08:00 100".split(" ");
let tripDetails50mphAve = "07:00 08:00 50".split(" ");

describe("Trip Class", () => {

    describe("with a given valid trip", function() {
        beforeEach(() => {
            trip = new Trip(...tripDetails);
        });

        test("generates a trip object", () => {
            expect(trip).toMatchSnapshot();
        });

        test("getDuration returns the calculated drive time for the constructed trip", () => {
            expect(trip.getDuration()).toEqual(0.5);
        });

        test("getAverageSpeed returns the calculated average speed for the contructed trip", () => {
            expect(trip.getAverageSpeed()).toEqual(35);
        });

        test("getMilesDriven returns the calculated distance for the contructed trip", () => {
            expect(trip.getMilesDriven()).toEqual(17.3);
        });

        describe("getIsHighway", () => {
            test("returns if the trip average speed exceeds or equals HIGHWAY_SPEED", () => {
                let tripIsHighway100mph = new Trip(...tripDetails100mphAve);
                let tripIsHighway50mph = new Trip(...tripDetails50mphAve);

                expect(trip.getIsHighway()).toEqual(false);
                expect(tripIsHighway100mph.getIsHighway()).toEqual(true);
                expect(tripIsHighway50mph.getIsHighway()).toEqual(true);
            });
        });
    });

});
