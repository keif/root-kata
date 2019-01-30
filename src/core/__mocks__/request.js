import {
    driverRecordsData,
    driversNotSorted,
    driversSorted,
    driversSortedArrayDesc,
    driversSortedArrayAsc
} from "../../__mocks__/drivers";

const request = () => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve(driverRecordsData);
        });
    });
};

export { request };
