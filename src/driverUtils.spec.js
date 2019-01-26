import Driver from "./Driver";
import { createHash } from "./utils";
import { getDriversRecordsOutput, sortDrivers, validateDriverRecords } from "./driverUtils";

const driverRecordsData =
    `Driver Dan\n` +
    `Driver Alex\n` +
    `Driver Bob\n` +
    `Trip Dan 07:15 07:45 17.3\n` +
    `Trip Dan 06:12 06:32 21.8\n` +
    `Trip Alex 12:01 13:16 42.0`;

const driveDist = [17.3, 42.0, 0];
const driveTimes = [["07:15", "07:45"], ["06:12", "06:32"], ["12:01", "13:16"]];
let mockDriversNotSorted = [];
let mockDriversSorted = [];
let mockDriversSortedArrayDesc = [];
let mockDriversSortedArrayAsc = [];

describe("driverUtils.js", () => {
    beforeEach(() => {
        mockDriversNotSorted = [new Driver("Dan"), new Driver("Alex"), new Driver("Bob")];

        mockDriversNotSorted.forEach((driver, idx) => {
            driver.setTotalTimeInHrs(driveTimes[idx]);
            driver.setTotalDistInMiles(driveDist[idx]);
            driver.setMilesPerHour();
        });

        mockDriversSorted = [new Driver("Dan"), new Driver("Bob")];
        mockDriversSorted.forEach(driver => {
            let idx = driver._driverName === "Bob" ? 2 : 0;
            driver.setTotalTimeInHrs(driveTimes[idx]);
            driver.setTotalDistInMiles(driveDist[idx]);
            driver.setMilesPerHour();
        });

        mockDriversSortedArrayDesc = [
            { _driverName: "Alex", _drivingTimeHours: 1.25, _milesDriven: 42, _milesPerHour: 34 },
            { _driverName: "Dan", _drivingTimeHours: 0.833333333333333, _milesDriven: 39, _milesPerHour: 47 },
            { _driverName: "Bob", _drivingTimeHours: 0, _milesDriven: 0, _milesPerHour: 0 }
        ];

        mockDriversSortedArrayAsc = [
            { _driverName: "Bob", _drivingTimeHours: 0, _milesDriven: 0, _milesPerHour: 0 },
            { _driverName: "Dan", _drivingTimeHours: 0.833333333333333, _milesDriven: 39, _milesPerHour: 47 },
            { _driverName: "Alex", _drivingTimeHours: 1.25, _milesDriven: 42, _milesPerHour: 34 }
        ];
    });

    describe("getDriversRecordsOutput method", () => {
        test("returns output of each drivers travel experiences", () => {
            let expectedDriverOutput = "Dan: 17.3 miles @ 35 mph\n";
            expectedDriverOutput += "Alex: 42 miles @ 126 mph\n";
            expectedDriverOutput += "Bob: 0 miles\n";

            expect(getDriversRecordsOutput(mockDriversNotSorted)).toEqual(expectedDriverOutput);
        });
    });

    describe("sortDrivers method", () => {
        describe("returns a list of drivers sorted ascending or descending, by distance, miles, or mph", () => {
            test.each([["desc", "dist"], ["asc", "dist"]])("sortDrivers('%s', '%s')", (dir, type) => {
                const hashTbl = createHash(driverRecordsData);
                const validDriversRecords = validateDriverRecords(hashTbl);
                const expectedResult = dir === "asc" ? mockDriversSortedArrayAsc : mockDriversSortedArrayDesc;
                const result = sortDrivers(validDriversRecords, dir, type);

                expect(JSON.parse(JSON.stringify(result))).toEqual(expectedResult);
            });
        });
    });

    describe("validateDriverRecords method", () => {
        test("takes a hash table and returns the drivers that meet the criteria", () => {
            expect(validateDriverRecords(mockDriversNotSorted)).toEqual(mockDriversSorted);
        });
    });
});
