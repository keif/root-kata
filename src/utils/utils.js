import fs from "fs";
import process from "process";

import { getDriversRecordsOutput, setDriverHash, sortDrivers, validateDriverRecords } from "./driverUtils";

const createHash = fileData => {
    if (!fileData || fileData.length == 0) return {};

    const data = fileData.split("\n");

    return data.reduce(setDriverHash, {});
};

const readFile = () => {
    return new Promise((resolve, reject) => {
        const file = process.argv[2];

        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                const hashTbl = createHash(data);
                const validDriversRecords = validateDriverRecords(hashTbl);
                sortDrivers(validDriversRecords, "desc", "dist");
                const driverRecordsOutput = getDriversRecordsOutput(validDriversRecords);

                resolve(driverRecordsOutput);
            }
        });
    });
};

export { createHash, readFile };
