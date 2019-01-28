import { createHash } from "./utils";
import { getDriversRecordsOutput, sortDrivers, validateDriverRecords } from "./driverUtils";

import {
    driverRecordsData,
    driversNotSorted,
    driversSorted,
    driversSortedArrayDesc,
    driversSortedArrayAsc
} from "./__mocks__/drivers";

let mockDriversNotSorted = [];
let mockDriversSorted = [];
let mockDriversSortedArrayDesc = [];
let mockDriversSortedArrayAsc = [];

describe("driverUtils.js", () => {
    beforeEach(() => {
        mockDriversNotSorted = driversNotSorted;
        mockDriversSorted = driversSorted;
        mockDriversSortedArrayDesc = driversSortedArrayDesc;
        mockDriversSortedArrayAsc = driversSortedArrayAsc;
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
