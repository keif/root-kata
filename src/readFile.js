import process from "process";

import { request } from "./request";

import { createHash } from "./utils";
import { getDriversRecordsOutput, sortDrivers, validateDriverRecords } from "./driverUtils";

const readFile = () => {
    console.log("readFile");
    const file = process.argv[2];
    console.log("file:", file);

    return request(file).then(data => {
        console.log("file:", file);
        const hashTbl = createHash(data);
        const validDriversRecords = validateDriverRecords(hashTbl);
        sortDrivers(validDriversRecords, "desc", "dist");

        return getDriversRecordsOutput(validDriversRecords);
    });
};

export { readFile };
