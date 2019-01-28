import Driver from "../Driver";

const driverRecordsData =
    `Driver Dan\n` +
    `Driver Alex\n` +
    `Driver Bob\n` +
    `Trip Dan 07:15 07:45 17.3\n` +
    `Trip Dan 06:12 06:32 21.8\n` +
    `Trip Alex 12:01 13:16 42.0`;

const driverRecordsHash = {
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

const driveDist = [17.3, 42.0, 0];
const driveTimes = [["07:15", "07:45"], ["06:12", "06:32"], ["12:01", "13:16"]];

const driversNotSorted = [new Driver("Dan"), new Driver("Alex"), new Driver("Bob")];

driversNotSorted.forEach((driver, idx) => {
    driver.setTotalTimeInHrs(driveTimes[idx]);
    driver.setTotalDistInMiles(driveDist[idx]);
    driver.setMilesPerHour();
});

const driversSorted = [new Driver("Dan"), new Driver("Bob")];
driversSorted.forEach(driver => {
    let idx = driver._driverName === "Bob" ? 2 : 0;
    driver.setTotalTimeInHrs(driveTimes[idx]);
    driver.setTotalDistInMiles(driveDist[idx]);
    driver.setMilesPerHour();
});

const driversSortedArrayDesc = [
    { _driverName: "Alex", _drivingTimeHours: 1.25, _milesDriven: 42, _milesPerHour: 34 },
    { _driverName: "Dan", _drivingTimeHours: 0.833333333333333, _milesDriven: 39, _milesPerHour: 47 },
    { _driverName: "Bob", _drivingTimeHours: 0, _milesDriven: 0, _milesPerHour: 0 }
];

const driversSortedArrayAsc = [
    { _driverName: "Bob", _drivingTimeHours: 0, _milesDriven: 0, _milesPerHour: 0 },
    { _driverName: "Dan", _drivingTimeHours: 0.833333333333333, _milesDriven: 39, _milesPerHour: 47 },
    { _driverName: "Alex", _drivingTimeHours: 1.25, _milesDriven: 42, _milesPerHour: 34 }
];

export {
    driverRecordsData,
    driverRecordsHash,
    driveDist,
    driveTimes,
    driversNotSorted,
    driversSorted,
    driversSortedArrayDesc,
    driversSortedArrayAsc
};
