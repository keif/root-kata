import Trip from "./Trip";

const HIGHWAY_SPEED = 50;
const MAX_SPEED_MPH = 100;
const MIN_SPEED_MPH = 5;

class Driver {
    constructor(driverName) {
        this._driverName = driverName;
        this._totalDrivingTime = 0;
        this._totalMilesDriven = 0;
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
        return Math.round(this._totalMilesDriven / this._totalDrivingTime);
    }

    getTotalDrivingDist() {
        return this._totalMilesDriven;
    }

    setTotalDrivingDist(distInMiles) {
        this._totalMilesDriven += distInMiles;
        return this._totalMilesDriven;
    }

    getPercentageHighway() {
        let highwayMiles = this._trips
            .filter(trip => trip.getAverageSpeed() >= HIGHWAY_SPEED)
            .reduce((acc, trip) => acc + trip.getMilesDriven(), 0);

        return highwayMiles / this._totalMilesDriven || 0;
    }

    getRecord() {
        let driverDescription = `${this._driverName}: ${this._totalMilesDriven} miles`;

        if (this._totalMilesDriven) {
            driverDescription += ` @ ${this.getAverageSpeed()} mph`;
        }
        driverDescription += ` ${this.getPercentageHighway() * 100}% highway`;

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
        }
    }
}

export default Driver;
