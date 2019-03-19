import Trip from "./Trip";

let trip;
let tripDetails = {
    default: "07:15 07:45 17.3".split(" "),
    ave100mph: "07:00 08:00 100".split(" "),
    ave50mph: "07:00 08:00 50".split(" ")
};

describe("Trip Class", () => {
    describe("with a given valid trip", function() {
        beforeEach(() => {
            trip = new Trip(...tripDetails.default);
        });

        test("generates a trip object", () => {
            expect(trip).toMatchSnapshot();
        });

        test("getAverageSpeed returns the calculated average speed for the contructed trip", () => {
            expect(trip.getAverageSpeed()).toEqual(35);
        });

        test("getDuration returns the calculated drive time for the constructed trip", () => {
            expect(trip.getDuration()).toEqual(0.5);
        });

        describe("getIsHighway", () => {
            test("returns if the trip average speed exceeds or equals HIGHWAY_SPEED", () => {
                let tripIsHighway100mph = new Trip(...tripDetails.ave100mph);
                let tripIsHighway50mph = new Trip(...tripDetails.ave50mph);

                expect(trip.getIsHighway()).toEqual(false);
                expect(tripIsHighway100mph.getIsHighway()).toEqual(true);
                expect(tripIsHighway50mph.getIsHighway()).toEqual(true);
            });
        });

        test("getMilesDriven returns the calculated distance for the contructed trip", () => {
            expect(trip.getMilesDriven()).toEqual(17.3);
        });
    });
});
