import { readFile } from "./readFile";

processDrivingRecords().then(data => console.table(data));

async function processDrivingRecords() {
    try {
        return await readFile();
    } catch (error) {
        return new Error(error);
    }
}
