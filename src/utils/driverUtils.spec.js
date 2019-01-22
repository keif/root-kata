import Driver from "../Driver";

import { getDriversRecordsOutput, sortDrivers, validateDriverRecords } from "./driverUtils";

const driveTimes = [["07:15", "07:45"], ["06:12", "06:32"], ["12:01", "13:16"]];
const driveDist = [17.3, 42.0, 0];
const hardCodedDriversNotSorted = [];

describe("driverUtils.js", () => {
    beforeEach(() => {
        hardCodedDriversNotSorted.push(new Driver("Dan"));
        hardCodedDriversNotSorted.push(new Driver("Alex"));
        hardCodedDriversNotSorted.push(new Driver("Bob"));

        hardCodedDriversNotSorted.forEach((driver, idx) => {
            driver.setTotalTimeInHrs(driveTimes[idx]);
            driver.setTotalDistInMiles(driveDist[idx]);
            driver.setMilesPerHour();
        });
    });

    describe("getDriversRecordsOutput method", () => {
        test("returns output of each drivers travel experiences", () => {
            let expectedDriverOutput = "Dan: 17.3 miles @ 35 mph\n";
            expectedDriverOutput += "Alex: 42 miles @ 126 mph\n";
            expectedDriverOutput += "Bob: 0 miles\n";

            expect(getDriversRecordsOutput(hardCodedDriversNotSorted)).toEqual(expectedDriverOutput);
        });
    });

    describe("sortDrivers method", () => {
        describe("returns a list of drivers sorted ascending or descending, by distance, miles, or mph", () => {
            test.each([["desc", "dist"], ["asc", "dist"]])("sortDrivers('%s', '%s')", (dir, type) => {
                let driversSortedInDescOrderByMiles = sortDrivers(hardCodedDriversNotSorted, dir, type);
                expect(driversSortedInDescOrderByMiles).toEqual(hardCodedDriversNotSorted);
            });
        });
    });

    describe("validateDriverRecords method", () => {
        describe("takes a hash table and returns the drivers that meet the criteria", () => {
            console.table(hardCodedDriversNotSorted);
            console.table(validateDriverRecords(hardCodedDriversNotSorted));
            expect(validateDriverRecords(hardCodedDriversNotSorted)).toEqual(hardCodedDriversNotSorted);
        });
    });
});
