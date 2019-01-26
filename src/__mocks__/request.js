const driverRecordsData =
    `Driver Dan\n` +
    `Driver Alex\n` +
    `Driver Bob\n` +
    `Trip Dan 07:15 07:45 17.3\n` +
    `Trip Dan 06:12 06:32 21.8\n` +
    `Trip Alex 12:01 13:16 42.0`;

const resJson = jest.fn();
const resStatus = jest.fn();
const resSend = jest.fn();
const res = {
    send: resSend,
    status: resStatus,
    json: resJson
};
resJson.mockImplementation(() => res);
resStatus.mockImplementation(() => res);
resSend.mockImplementation(() => res);

const readFile = () => {
    return new Promise((resolve, reject) => {
        console.log("MOCKPROMISE");
        process.nextTick(() => {
            console.log("MOCKPROCESS");
            resolve(driverRecordsData);
        });
    });
};

export { readFile };
