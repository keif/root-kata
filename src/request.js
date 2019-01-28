import fs from "fs";

const request = fileRef => {
    return new Promise((res, rej) => {
        fs.readFile(fileRef, "utf8", (err, data) => {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
};

export { request };
