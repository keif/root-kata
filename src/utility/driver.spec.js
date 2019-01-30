import { createDriverHash, getDriversRecordsOutput, sortDrivers, validateDriverRecords } from "./driver";

import { driverRecordsData, driversNotSorted } from "../__mocks__/drivers";

let mockDriversNotSorted = [];

describe("utility/driver.js", () => {
    beforeEach(() => {
        mockDriversNotSorted = driversNotSorted;
    });

    describe("createDriverHash method", () => {
        describe("with no data passed", () => {
            test("returns an empty object", () => {
                expect(createDriverHash()).toEqual({});
            });
        });

        describe("with data passed", () => {
            describe("and the data is valid", () => {
                test("returns a hash map of drivers", () => {
                    expect(createDriverHash(driverRecordsData)).toMatchSnapshot();
                });
            });

            describe("and the data is valid", () => {
                test("throw an error with invalid data", () => {
                    const driverRecordsDataInput = driverRecordsData + "\n";

                    expect(() => createDriverHash(driverRecordsDataInput)).toThrow("Unrecognized command");
                });
            });
        });
    });

    describe("getDriversRecordsOutput method", () => {
        test("returns output of each drivers travel experiences", () => {
            expect(getDriversRecordsOutput(driversNotSorted)).toMatchSnapshot();
        });
    });

    describe("sortDrivers method", () => {
        describe("returns a list of drivers sorted ascending or descending, by distance, miles, or mph", () => {
            test.each([["desc", "dist"], ["asc", "dist"]])("sortDrivers('%s', '%s')", (dir, type) => {
                const hashTbl = createDriverHash(driverRecordsData);
                const validDriversRecords = validateDriverRecords(hashTbl);
                const result = sortDrivers(validDriversRecords, dir, type);

                expect(JSON.parse(JSON.stringify(result))).toMatchSnapshot();
            });
        });
    });

    describe("validateDriverRecords method", () => {
        test("takes a hash table and returns the drivers that meet the criteria", () => {
            expect(validateDriverRecords(mockDriversNotSorted)).toMatchSnapshot();
        });
    });
});
