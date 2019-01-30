import process from "process";

import { request } from "./request";

const readFile = callback => {
    const file = process.argv[2];

    return request(file).then(data => {
        return callback(data);
    });
};

export { readFile };
