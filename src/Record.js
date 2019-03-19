class Record {
    constructor(driver) {
        this._driver = driver;
    }

    getDriverRecord() {
        let driverDescription = `${this._driver.getName()}: ${this._driver.getTotalDrivingDist()} miles`;

        if (this._driver.getTotalDrivingDist()) {
            driverDescription += ` @ ${this._driver.getAverageSpeed()} mph`;
        }
        driverDescription += ` ${this._driver.getPercentageHighway() * 100}% highway`;

        return driverDescription;
    }
}

export default Record;
