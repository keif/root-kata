import Driver from "./Driver";

let driver;

beforeAll(() => {
    driver = new Driver("Dan");
});

describe("Driver Class", () => {
    it('should create a new driver with the name "Dan"', () => {
        expect(driver.getName()).toEqual("Dan");
    });

    it("should set Drivers driving time hours to 0.5", () => {
        driver.setTotalTimeInHrs(["07:15", "07:45"]);
        const driversTimeInHrs = driver.getTotalTimeInHrs();
        expect(driversTimeInHrs).toEqual(0.5);
    });

    it("should set Drivers distance in miles to 10", () => {
        driver.setTotalDistInMiles(10);
        const driversDistInMiles = driver.getTotalDistInMiles();
        expect(driversDistInMiles).toEqual(10);
    });

    it("should set drivers speed to 20", () => {
        driver.setMilesPerHour();
        const driversSpeed = driver.getMilesPerHour();
        expect(driversSpeed).toEqual(20);
    });

    it("should return a long descriptive string about the driver", () => {
        const driverDescription = driver.getRecord();
        const expectedDescription = "Dan: 10 miles @ 20 mph";
        expect(driverDescription).toEqual(expectedDescription);
    });
});