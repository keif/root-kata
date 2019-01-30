import { readFile } from "./utility/readFile";
import { processDrivingRecords } from "./utility/driver";

outputDrivingRecords().then(data => console.table(data));

async function outputDrivingRecords() {
    try {
        return await readFile(processDrivingRecords);
    } catch (error) {
        return new Error(error);
    }
}
