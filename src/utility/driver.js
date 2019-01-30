import Driver from "../Driver";
import Trip from "../Trip";

const MIN_SPEED_MPH = 5;
const MAX_SPEED_MPH = 100;

const createDriverHash = fileData => {
    if (!fileData || fileData.length == 0) return {};

    const data = fileData.split("\n");

    return data.reduce(setDriverHash, {});
};

const getDriversRecordsOutput = listOfDrivers => {
    return listOfDrivers.reduce((acc, nxt) => {
        acc += nxt.getRecord() + "\n";
        return acc;
    }, "");
};

const setDriverHash = (driverHash, currentValue) => {
    const [command, name, ...rest] = currentValue.split(" ");

    if (command === "Driver") {
        driverHash[name] = new Driver(name);
    } else if (command === "Trip") {
        driverHash[name].addTrip(...rest);
    } else {
        throw new Error("Unrecognized command");
    }

    return driverHash;
};

const processDrivingRecords = data => {
    const hashTbl = createDriverHash(data);
    const validDriversRecords = validateDriverRecords(hashTbl);
    sortDrivers(validDriversRecords, "dist");

    return getDriversRecordsOutput(validDriversRecords);
};

const sortDrivers = listOfDrivers => {
    return listOfDrivers.sort(
        (currDriver, nextDriver) => nextDriver.getTotalDrivingDist() - currDriver.getTotalDrivingDist()
    );
};

const validateDriverRecords = hashTbl => {
    let idx = 0;
    return Object.keys(hashTbl).reduce((acc, driver) => {
        const currDriver = hashTbl[driver];

        if (currDriver.getAverageSpeed() > -1) {
            acc[idx] = currDriver;
            idx += 1;
        }

        return acc;
    }, []);
};

export {
    createDriverHash,
    getDriversRecordsOutput,
    processDrivingRecords,
    setDriverHash,
    sortDrivers,
    validateDriverRecords
};
