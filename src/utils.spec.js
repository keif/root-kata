import { createHash } from "./utils";

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

let driverRecordsData =
    `Driver Dan\n` +
    `Driver Alex\n` +
    `Driver Bob\n` +
    `Trip Dan 07:15 07:45 17.3\n` +
    `Trip Dan 06:12 06:32 21.8\n` +
    `Trip Alex 12:01 13:16 42.0`;

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
                    expect(createHash(driverRecordsData)).toEqual(hardCodedDriverRecordHash);
                });
            });

            describe("and the data is valid", () => {
                test("throw an error with invalid data", () => {
                    driverRecordsData += "\n";
                    expect(() => createHash(driverRecordsData)).toThrow("Unrecognized command");
                });
            });
        });
    });
});
