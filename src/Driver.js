class Driver {
    constructor(driverName) {
        this._driverName = driverName;
        this._totalDrivingTimeInHrs = 0;
        this._totalDistInMiles = 0;
        this._milesPerHour = 0;
    }

    _calcTotalTimeInHrs(drivingTimes) {
        const { startHour, startMin, endHour, endMin } = drivingTimes;
        return endHour + endMin / 60 - (startHour + startMin / 60);
    }

    _convertTimeToNumber(drivingTimes) {
        return drivingTimes.split(":").map(num => Number(num));
    }

    getName() {
        return this._driverName;
    }

    getMilesPerHour() {
        return this._milesPerHour;
    }

    setMilesPerHour() {
        this._milesPerHour = Math.round(this._totalDistInMiles / this._totalDrivingTimeInHrs);
    }

    getTotalDistInMiles() {
        return this._totalDistInMiles;
    }

    setTotalDistInMiles(distInMiles) {
        this._totalDistInMiles += distInMiles;
        return this._totalDistInMiles;
    }

    getTotalTimeInHrs() {
        return this._totalDrivingTimeInHrs;
    }

    setTotalTimeInHrs(drivingTime) {
        const [startTime, endTime, ..._rest] = drivingTime;
        const [startHour, startMin] = this._convertTimeToNumber(startTime);
        const [endHour, endMin] = this._convertTimeToNumber(endTime);
        const drivingTimes = { startHour, startMin, endHour, endMin };
        this._totalDrivingTimeInHrs += this._calcTotalTimeInHrs(drivingTimes);
    }

    getRecord() {
        let driverDescription = `${this._driverName}: ${this._totalDistInMiles} miles`;

        const driverHasTraveled = this._totalDistInMiles;
        if (driverHasTraveled) {
            driverDescription += ` @ ${this._milesPerHour} mph`;
        }

        return driverDescription;
    }
}

export default Driver;
