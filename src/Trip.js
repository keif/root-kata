const HIGHWAY_SPEED = 50;

class Trip {
    constructor(startTime, endTime, milesDriven) {
        this._startTime = startTime;
        this._endTime = endTime;
        this._totalMilesDriven = Number(milesDriven);
    }

    _calcTotalTime() {
        const [startHour, startMin] = this._convertTimeToNumber(this._startTime);
        const [endHour, endMin] = this._convertTimeToNumber(this._endTime);

        return endHour + endMin / 60 - (startHour + startMin / 60);
    }

    _convertTimeToNumber(drivingTimes) {
        return drivingTimes.split(":").map(num => Number(num));
    }

    getAverageSpeed() {
        return Math.round(this._totalMilesDriven / this.getDuration());
    }

    getDuration() {
        return this._calcTotalTime();
    }    

    getMilesDriven() {
        return this._totalMilesDriven;
    }
}

export default Trip;
