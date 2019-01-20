import { readRecordsFile } from "./utils/utils";

getDriverRecords().then(data => console.log(data));

async function getDriverRecords() {
    return await readRecordsFile();
}
