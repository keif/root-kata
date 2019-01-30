import Trip from "./Trip";

const MIN_SPEED_MPH = 5;
const MAX_SPEED_MPH = 100;

class Driver {
    constructor(driverName) {
        this._driverName = driverName;
        this._totalDrivingTime = 0;
        this._totalMilesDriven = 0;
        this._averageSpeed = 0;
        this._trips = [];
    }

    getName() {
        return this._driverName;
    }

    getTotalDriveTime() {
        return this._totalDrivingTime;
    }

    setTotalDriveTime(drivingTime) {
        this._totalDrivingTime += drivingTime;
    }

    getAverageSpeed() {
        return this._averageSpeed;
    }

    setAverageSpeed() {
        this._averageSpeed = Math.round(this._totalMilesDriven / this._totalDrivingTime);
    }

    getTotalDrivingDist() {
        return this._totalMilesDriven;
    }

    setTotalDrivingDist(distInMiles) {
        this._totalMilesDriven += distInMiles;
        return this._totalMilesDriven;
    }

    getRecord() {
        let driverDescription = `${this._driverName}: ${this._totalMilesDriven} miles`;

        const driverHasTraveled = this._totalMilesDriven;
        if (driverHasTraveled) {
            driverDescription += ` @ ${this._averageSpeed} mph`;
        }

        return driverDescription;
    }

    addTrip(...tripDetails) {
        const trip = new Trip(...tripDetails);
        const tripSpeed = trip.getAverageSpeed();
        const speedAboveMin = tripSpeed >= MIN_SPEED_MPH;
        const speedBelowMax = tripSpeed <= MAX_SPEED_MPH;

        if (speedAboveMin && speedBelowMax) {
            this._trips.push(trip);

            this.setTotalDrivingDist(trip.getMilesDriven());
            this.setTotalDriveTime(trip.getDuration());
            this.setAverageSpeed();
        }
    }

}

export default Driver;
