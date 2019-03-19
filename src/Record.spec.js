import Driver from "./Driver";
import Record from "./Record";

let record;
let driver;

describe("Record Class", () => {
    beforeEach(() => {
        driver = new Driver("Dan");
        driver.addTrip(..."07:00 07:30 20".split(" "));
        record = new Record(driver);
    });

    describe("getDriverRecord uses the drive time, distance, and average speed", () => {
        test("returns a long descriptive string about the driver", () => {
            expect(record.getDriverRecord()).toMatch("Dan: 20 miles @ 40 mph 0% highway");
        });
    });
});