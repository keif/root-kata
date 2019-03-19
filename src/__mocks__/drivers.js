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
        _averageSpeed: 34,
        _totalMilesDriven: 42,
        _totalDrivingTime: 1.25
    },
    Bob: {
        _driverName: "Bob",
        _averageSpeed: 0,
        _totalMilesDriven: 0,
        _totalDrivingTime: 0
    },
    Dan: {
        _driverName: "Dan",
        _averageSpeed: 47,
        _totalMilesDriven: 39,
        _totalDrivingTime: 0.833333333333333
    }
};

const driveDist = [17.3, 42.0, 0];
const driveTimes = [["07:15", "07:45"], ["06:12", "06:32"], ["12:01", "13:16"]];

const driversNotSorted = [new Driver("Dan"), new Driver("Alex"), new Driver("Bob")];

driversNotSorted.forEach((driver, idx) => {
    driver.setTotalDriveTime(driveTimes[idx]);
    driver.setTotalDrivingDist(driveDist[idx]);
});

const driversSorted = [new Driver("Dan"), new Driver("Bob")];
driversSorted.forEach(driver => {
    let idx = driver._driverName === "Bob" ? 2 : 0;
    driver.setTotalDriveTime(driveTimes[idx]);
    driver.setTotalDrivingDist(driveDist[idx]);
});

const driversSortedArrayDesc = [
    { _driverName: "Alex", _totalDrivingTime: 1.25, _totalMilesDriven: 42, _averageSpeed: 34 },
    { _driverName: "Dan", _totalDrivingTime: 0.833333333333333, _totalMilesDriven: 39, _averageSpeed: 47 },
    { _driverName: "Bob", _totalDrivingTime: 0, _totalMilesDriven: 0, _averageSpeed: 0 }
];

const driversSortedArrayAsc = [
    { _driverName: "Bob", _totalDrivingTime: 0, _totalMilesDriven: 0, _averageSpeed: 0 },
    { _driverName: "Dan", _totalDrivingTime: 0.833333333333333, _totalMilesDriven: 39, _averageSpeed: 47 },
    { _driverName: "Alex", _totalDrivingTime: 1.25, _totalMilesDriven: 42, _averageSpeed: 34 }
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
