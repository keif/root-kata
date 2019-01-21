import { readFile } from "./utils/utils";

getDriverRecords().then(data => console.log(data));

async function getDriverRecords() {
    try {
        return await readFile();
    } catch (error) {
        return new Error(error);
    }
}
