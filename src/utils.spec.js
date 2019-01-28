import { createHash } from "./utils";

import { driverRecordsData, driverRecordsHash } from "./__mocks__/drivers";

let driverRecordsDataInput = driverRecordsData;

describe("utils.js", () => {
    describe("createHash method", () => {
        describe("with no data passed", () => {
            test("returns an empty object", () => {
                expect(createHash()).toEqual({});
            });
        });

        describe("with data passed", () => {
            describe("and the data is valid", () => {
                test("returns a hash map of drivers", () => {
                    expect(createHash(driverRecordsDataInput)).toEqual(driverRecordsHash);
                });
            });

            describe("and the data is valid", () => {
                test("throw an error with invalid data", () => {
                    driverRecordsDataInput += "\n";
                    expect(() => createHash(driverRecordsDataInput)).toThrow("Unrecognized command");
                });
            });
        });
    });
});
