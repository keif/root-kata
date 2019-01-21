class Driver {
    constructor(driverName) {
        this._driverName = driverName;
        this._drivingTimeHours = 0;
        this._milesDriven = 0;
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
        this._milesPerHour = Math.round(this._milesDriven / this._drivingTimeHours);
    }

    getTotalDistInMiles() {
        return this._milesDriven;
    }

    setTotalDistInMiles(distInMiles) {
        this._milesDriven += distInMiles;
        return this._milesDriven;
    }

    getTotalTimeInHrs() {
        return this._drivingTimeHours;
    }

    setTotalTimeInHrs(drivingTime) {
        const [startTime, endTime, ..._rest] = drivingTime;
        const [startHour, startMin] = this._convertTimeToNumber(startTime);
        const [endHour, endMin] = this._convertTimeToNumber(endTime);
        const drivingTimes = { startHour, startMin, endHour, endMin };
        this._drivingTimeHours += this._calcTotalTimeInHrs(drivingTimes);
    }

    getRecord() {
        let driverDescription = `${this._driverName}: ${this._milesDriven} miles`;

        const driverHasTraveled = this._milesDriven;
        if (driverHasTraveled) {
            driverDescription += ` @ ${this._milesPerHour} mph`;
        }

        return driverDescription;
    }
}

export default Driver;
