import fs from "fs";
import process from "process";

import Driver from "../Driver";

const MIN_SPEED_MPH = 5;
const MAX_SPEED_MPH = 100;

function readFile() {
    return new Promise((resolve, reject) => {
        const driversRecordsFile = process.argv[2];
        fs.readFile(driversRecordsFile, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                const driversRecordsHashTbl = createHash(data);
                let idx = 0;

                const driversRecords = Object.keys(driversRecordsHashTbl).reduce((accumulator, driver) => {
                    const currDriver = driversRecordsHashTbl[driver];
                    const driverAverageSpeed = currDriver.getMilesPerHour();
                    const driverSpeedInRange =
                        driverAverageSpeed >= MIN_SPEED_MPH && driverAverageSpeed <= MAX_SPEED_MPH;
                    const driverDidNotTravel = driverAverageSpeed === 0;

                    if (driverSpeedInRange || driverDidNotTravel) {
                        accumulator[idx] = currDriver;
                        idx += 1;
                    }

                    return accumulator;
                }, []);

                sortDrivers(driversRecords, "desc", "dist");
                console.table(driversRecords);
                let driverRecordsOutput = getDriversRecordsOutput(driversRecords);
                resolve(driverRecordsOutput);
            }
        });
    });
}

function createHash(fileData) {
    if (fileData.length == 0) return {};

    const data = fileData.split("\n");
    const hash = {};

    data.forEach((val) => {
        const [command, name, ...rest] = val.split(" ");

        if (command === "Driver") {
            hash[name] = new Driver(name);
        } else if (command === "Trip") {
            const distInMiles = Math.round(Number(rest[2]));
            hash[name].setTotalDistInMiles(distInMiles);
            hash[name].setTotalTimeInHrs(rest);
            hash[name].setMilesPerHour();
        } else {
            throw new Error("Unrecognized command");
        }
    });

    return hash;
}

function getDriversRecordsOutput(listOfDrivers) {
    return listOfDrivers.reduce((acc, nxt) => {
        acc += nxt.getRecord() + "\n";
        return acc;
    }, "");
}

function sortDrivers(listOfDrivers, direction, type) {
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
}

export { readFile, createHash, getDriversRecordsOutput, sortDrivers };
