import { readFile } from "./readFile";
import { processDrivingRecords } from "./driverUtils";

outputDrivingRecords().then(data => console.table(data));

async function outputDrivingRecords() {
    try {
        return await readFile(processDrivingRecords);
    } catch (error) {
        return new Error(error);
    }
}
