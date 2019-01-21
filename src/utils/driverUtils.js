import Driver from "../Driver";

const MIN_SPEED_MPH = 5;
const MAX_SPEED_MPH = 100;

const setDriverHash = (driverHash, currentValue) => {
    const [command, name, ...rest] = currentValue.split(" ");

    if (command === "Driver") {
        driverHash[name] = new Driver(name);
    } else if (command === "Trip") {
        const distInMiles = Math.round(Number(rest[2]));
        driverHash[name].setTotalDistInMiles(distInMiles);
        driverHash[name].setTotalTimeInHrs(rest);
        driverHash[name].setMilesPerHour();
    } else {
        throw new Error("Unrecognized command");
    }

    return driverHash;
};

const getDriversRecordsOutput = listOfDrivers => {
    return listOfDrivers.reduce((acc, nxt) => {
        acc += nxt.getRecord() + "\n";
        return acc;
    }, "");
};

const sortDrivers = (listOfDrivers, direction, type) => {
    const funcName = {
        dist: "getTotalDistInMiles",
        time: "getTotalTimeInHrs",
        mph: "getMilesPerHour"
    };

    if (direction === "desc") {
        return listOfDrivers.sort(
            (currDriver, nxtDriver) => nxtDriver[funcName[type]]() - currDriver[funcName[type]]()
        );
    } else if (direction == "asc") {
        return listOfDrivers.sort(
            (currDriver, nxtDriver) => nxtDriver[funcName[type]]() + currDriver[funcName[type]]()
        );
    }
};

const validateDriverRecords = hashTbl => {
    let idx = 0;
    console.log(Object.keys(hashTbl));
    return Object.keys(hashTbl).reduce((acc, driver) => {
        console.log(arguments);
        const currDriver = hashTbl[driver];
        const averageSpeed = currDriver.getMilesPerHour();
        const speedInRange = averageSpeed >= MIN_SPEED_MPH && averageSpeed <= MAX_SPEED_MPH;
        const didNotTravel = averageSpeed === 0;

        if (speedInRange || didNotTravel) {
            acc[idx] = currDriver;
            idx += 1;
        }

        return acc;
    }, []);
};

export { getDriversRecordsOutput, setDriverHash, sortDrivers, validateDriverRecords };