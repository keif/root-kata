import fs from "fs";
import process from "process";

import Driver from "../Driver";

function readRecordsFile() {
    return new Promise((res, rej) => {
        const driversRecordsFile = process.argv[2];
        fs.readFile(driversRecordsFile, "utf8", (err, data) => {
            if (err) {
                rej(err);
            }

            const driversRecordsHash = createDriversRecordsHash(data);
            const driversRecords = [];
            for (let driver in driversRecordsHash) {
                const currDriver = getCurrentDriver(driversRecordsHash, driver);
                const driverAveragedCorrectSpeedLimit =
                    currDriver.getMilesPerHour() > 4 && currDriver.getMilesPerHour() < 101;
                const driverDidNotTravel = currDriver.getMilesPerHour() === 0;

                if (driverAveragedCorrectSpeedLimit || driverDidNotTravel) {
                    driversRecords.push(currDriver);
                }
            }

            sortDriversByDistInMilesDescending(driversRecords);
            let driverRecordsOutput = getDriversRecordsOutput(driversRecords);
            res(driverRecordsOutput);
        });
    });
}

function createDriversRecordsHash(driverRecordsFileData) {
    return driverRecordsFileData.split("\n").reduce((acc, nxt) => {
        nxt = nxt.split(" ");
        const [command, driverName, ...rest] = nxt;

        if (command === "Driver") {
            acc[driverName] = new Driver(driverName);
        } else {
            let distInMiles = Math.round(Number(rest[2]));
            acc[driverName].setTotalDistInMiles(distInMiles);
            acc[driverName].setTotalTimeInHrs(rest);
            acc[driverName].setMilesPerHour();
        }

        return acc;
    }, {});
}

function getCurrentDriver(driversHash, currDriver) {
    return driversHash[currDriver];
}

function getDriversRecordsOutput(listOfDrivers) {
    return listOfDrivers.reduce((acc, nxt) => {
        acc += nxt.getRecord() + "\n";
        return acc;
    }, "");
}

function sortDriversByDistInMilesDescending(listOfDrivers) {
    return listOfDrivers.sort((curr, nxt) => nxt.getTotalDistInMiles() - curr.getTotalDistInMiles());
}

export {
    readRecordsFile,
    createDriversRecordsHash,
    getCurrentDriver,
    getDriversRecordsOutput,
    sortDriversByDistInMilesDescending
};
