import Driver from "./Driver";
import Trip from "./Trip";
import { driverRecordsData } from "./__mocks__/drivers";

let driver;
let driverName = "Dan";

describe("Driver Class", () => {
    beforeEach(() => {
        driver = new Driver(driverName);
    });

    test("generates a driver object", () => {
        expect(driver).toMatchSnapshot();
    });

    test("getName returns the name of the driver set via constructor", () => {
        expect(driver.getName()).toMatch("Dan");
    });

    describe("getTotalDriveTime returns the total drive time from setTotalDriveTime", () => {
        beforeEach(() => {
            driver.setTotalDriveTime(0.25);
        });

        test("when first set, it returns the passed in driving time", () => {    
            expect(driver.getTotalDriveTime()).toEqual(0.25);
        });
    
        test("should increase a pre-existing Drivers' driving time", () => {
            driver.setTotalDriveTime(0.25);
    
            expect(driver.getTotalDriveTime()).toEqual(0.5);
        });
    });

    test("getTotalDrivingDist returns the Drivers' distance from setTotalDrivingDist", () => {
        driver.setTotalDrivingDist(10);

        expect(driver.getTotalDrivingDist()).toEqual(10);
    });

    describe("getPercentageHighway uses the passed in trips to determine the percentage of highway miles of the total miles driven", () => {
        test("if the trip does not constitute highway driving", () => {
            driver.addTrip(..."07:00 08:00 49".split(" "));

            expect(driver.getPercentageHighway()).toEqual(0);
        });

        test("if the trip does constitute highway driving", () => {
            driver.addTrip(..."07:00 08:00 50".split(" "));

            expect(driver.getPercentageHighway()).toEqual(1);
        });
    });

    describe("getRecord uses the drive time, distance, and average speed", () => {
        test("returns a long descriptive string about the driver", () => {
            driver.setTotalDriveTime(0.5);
            driver.setTotalDrivingDist(10);
    
            expect(driver.getRecord()).toMatch("Dan: 10 miles @ 20 mph");
        });
    });

    describe("addTrip takes trip details to deterimine if a trip should be added to the Driver", () => {
        describe("when given a trip", () => {
            test("it is added if it falls between the minimum and maximum speed", () => {
                driver.addTrip(..."07:15 07:45 17.3".split(" "));
                driver.addTrip(..."06:12 06:32 21.8".split(" "));

                expect(driver.getRecord()).toMatch("Dan: 39.1 miles @ 47 mph");
            });            

            test("it is NOT added if it falls outside the minimum and maximum speed", () => {
                driver.addTrip(..."00:01 08:59 1000.0".split(" "));
                driver.addTrip(..."00:01 01:02 1.0".split(" "));

                expect(driver.getRecord()).toMatch("Dan: 0 miles");
            });            
        });
    });
});
