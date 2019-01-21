import fs from "fs";
import process from "process";

import Driver from "../Driver";

const MIN_SPEED_MPH = 5;
const MAX_SPEED_MPH = 100;

const createHash = fileData => {
    if (fileData.length == 0) return {};

    const data = fileData.split("\n");

    return data.reduce((driverHash, currentValue) => {
        const [command, name, ...rest] = currentValue.split(" ");

        if (command === "Driver") {
            driverHash[name] = new Driver(name);
        } else if (command === "Trip") {
            const distInMiles = Math.round(Number(rest[2]));
            driverHash[name].setTotalDistInMiles(distInMiles);
            driverHash[name].setTotalTimeInHrs(rest);
            driverHash[name].setMilesPerHour();
        } else {
            throw new Error("Unrecognized command");
        }

        return driverHash;
    }, {});
};

const getDriversRecordsOutput = listOfDrivers => {
    return listOfDrivers.reduce((acc, nxt) => {
        acc += nxt.getRecord() + "\n";
        return acc;
    }, "");
};

const readFile = () => {
    return new Promise((resolve, reject) => {
        const file = process.argv[2];

        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                const hashTbl = createHash(data);
                const driversRecords = validateDriverRecords(hashTbl);
                const driverRecordsOutput = getDriversRecordsOutput(driversRecords);

                resolve(driverRecordsOutput);
            }
        });
    });
};

const sortDrivers = (listOfDrivers, direction, type) => {
    const funcName = {
        dist: "getTotalDistInMiles",
        time: "getTotalTimeInHrs",
        mph: "getMilesPerHour"
    };

    if (direction === "desc") {
        return listOfDrivers.sort(
            (currDriver, nxtDriver) => nxtDriver[funcName[type]]() - currDriver[funcName[type]]()
        );
    } else if (direction == "asc") {
        return listOfDrivers.sort(
            (currDriver, nxtDriver) => nxtDriver[funcName[type]]() + currDriver[funcName[type]]()
        );
    }
};

const validateDriverRecords = hashTbl => {
    let idx = 0;
    const validRecords = Object.keys(hashTbl).reduce((accumulator, driver) => {
        const currDriver = hashTbl[driver];
        const driverAverageSpeed = currDriver.getMilesPerHour();
        const driverSpeedInRange = driverAverageSpeed >= MIN_SPEED_MPH && driverAverageSpeed <= MAX_SPEED_MPH;
        const driverDidNotTravel = driverAverageSpeed === 0;

        if (driverSpeedInRange || driverDidNotTravel) {
            accumulator[idx] = currDriver;
            idx += 1;
        }

        return accumulator;
    }, []);

    return sortDrivers(validRecords, "desc", "dist");
};

export { createHash, getDriversRecordsOutput, readFile, sortDrivers, validateDriverRecords };
