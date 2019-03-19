const HIGHWAY_SPEED = 50;

class Trip {
    constructor(startTime, endTime, milesDriven) {
        this._startTime = startTime;
        this._endTime = endTime;
        this._totalMilesDriven = Number(milesDriven);
        this._duration = this._calcTotalTime();
    }

    _calcTotalTime() {
        const [startHour, startMin] = this._convertTimeToNumber(this._startTime);
        const [endHour, endMin] = this._convertTimeToNumber(this._endTime);

        return endHour + endMin / 60 - (startHour + startMin / 60);
    }

    _convertTimeToNumber(drivingTimes) {
        return drivingTimes.split(":").map(num => Number(num));
    }

    getDuration() {
        return this._duration;
    }

    getAverageSpeed() {
        return Math.round(this._totalMilesDriven / this._duration);
    }

    getMilesDriven() {
        return this._totalMilesDriven;
    }

    getIsHighway() {
        return this.getAverageSpeed() >= HIGHWAY_SPEED;
    }
}

export default Trip;
