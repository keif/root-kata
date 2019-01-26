import { setDriverHash } from "./driverUtils";

const createHash = fileData => {
    if (!fileData || fileData.length == 0) return {};

    const data = fileData.split("\n");

    return data.reduce(setDriverHash, {});
};

export { createHash };
