import Driver from "../Driver";

import {
    createDriversRecordsHash,
    getCurrentDriver,
    sortDriversByDistInMilesDescending,
    getDriversRecordsOutput
} from "./utils";

const hardCodedDriverRecordHash = {
    Alex: {
        _driverName: "Alex",
        _milesPerHour: 34,
        _totalDistInMiles: 42,
        _totalDrivingTimeInHrs: 1.25
    },
    Bob: {
        _driverName: "Bob",
        _milesPerHour: 0,
        _totalDistInMiles: 0,
        _totalDrivingTimeInHrs: 0
    },
    Dan: {
        _driverName: "Dan",
        _milesPerHour: 47,
        _totalDistInMiles: 39,
        _totalDrivingTimeInHrs: 0.833333333333333
    }
};

const hardCodedDriversNotSorted = [new Driver("Dan"), new Driver("Alex"), new Driver("Bob")];

describe("utils.js", () => {
    test("createDriversRecordsHash -- should return a hash map of drivers", () => {
        let driverRecordsData = "Driver Dan\n";
        driverRecordsData += "Driver Alex\n";
        driverRecordsData += "Driver Bob\n";
        driverRecordsData += "Trip Dan 07:15 07:45 17.3\n";
        driverRecordsData += "Trip Dan 06:12 06:32 21.8\n";
        driverRecordsData += "Trip Alex 12:01 13:16 42.0";

        const driverRecordHash = createDriversRecordsHash(driverRecordsData);
        expect(driverRecordHash).toEqual(hardCodedDriverRecordHash);
    });

    test('getCurrentDriver -- should return correct driver "Bob"', () => {
        const correctDriver = getCurrentDriver(hardCodedDriverRecordHash, "Bob");
        const expectedDriver = hardCodedDriverRecordHash.Bob;
        expect(correctDriver).toEqual(expectedDriver);
    });

    test("getDriversRecordsOutput -- should return correct output of each drivers travel experiences", () => {
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

    test("sortDriversByDistInMilesDescending -- should return a list of drivers sorted in DESC order by miles", () => {
        const driversSortedInDescOrderByMiles = sortDriversByDistInMilesDescending(hardCodedDriversNotSorted);
        expect(driversSortedInDescOrderByMiles).toEqual(hardCodedDriversNotSorted);
    });
});
