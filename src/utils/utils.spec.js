import Driver from "../Driver";

import { createHash, sortDrivers, getDriversRecordsOutput } from "./utils";

const hardCodedDriverRecordHash = {
    Alex: {
        _driverName: "Alex",
        _milesPerHour: 34,
        _milesDriven: 42,
        _drivingTimeHours: 1.25
    },
    Bob: {
        _driverName: "Bob",
        _milesPerHour: 0,
        _milesDriven: 0,
        _drivingTimeHours: 0
    },
    Dan: {
        _driverName: "Dan",
        _milesPerHour: 47,
        _milesDriven: 39,
        _drivingTimeHours: 0.833333333333333
    }
};

const hardCodedDriversNotSorted = [new Driver("Dan"), new Driver("Alex"), new Driver("Bob")];

describe("utils.js", () => {
    describe("createHash method", () => {
        test("returns a hash map of drivers", () => {
            let driverRecordsData = "Driver Dan\n";
            driverRecordsData += "Driver Alex\n";
            driverRecordsData += "Driver Bob\n";
            driverRecordsData += "Trip Dan 07:15 07:45 17.3\n";
            driverRecordsData += "Trip Dan 06:12 06:32 21.8\n";
            driverRecordsData += "Trip Alex 12:01 13:16 42.0";

            const driverRecordHash = createHash(driverRecordsData);
            expect(driverRecordHash).toEqual(hardCodedDriverRecordHash);
        });
    });

    describe("getDriversRecordsOutput method", () => {
        test("returns output of each drivers travel experiences", () => {
            const driveTimes = [["07:15", "07:45"], ["06:12", "06:32"], ["12:01", "13:16"]];
            let i = 0;
            hardCodedDriversNotSorted.forEach(driver => {
                driver.setTotalTimeInHrs(driveTimes[i]);
                driver.setTotalDistInMiles(i++);
                driver.setMilesPerHour();
            });

            let expectedDriverOutput = "Dan: 0 miles\n";
            expectedDriverOutput += "Alex: 1 miles @ 3 mph\n";
            expectedDriverOutput += "Bob: 2 miles @ 2 mph\n";
            const driverOutput = getDriversRecordsOutput(hardCodedDriversNotSorted);

            expect(driverOutput).toEqual(expectedDriverOutput);
        });
    });

    describe("sortDrivers method", () => {
        describe("returns a list of drivers sorted ascending or descending, by distance, miles, or mph", () => {
            test.each([["desc", "dist"], ["asc", "dist"]])(
                "sortDrivers('%s', '%s')",
                (dir, type) => {
                    let driversSortedInDescOrderByMiles = sortDrivers(hardCodedDriversNotSorted, dir, type);
                    expect(driversSortedInDescOrderByMiles).toEqual(hardCodedDriversNotSorted);
                }
            );
        });
    });
});
