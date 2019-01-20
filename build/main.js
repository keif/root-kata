/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Driver.js":
/*!***********************!*\
  !*** ./src/Driver.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Driver {
    constructor(driverName) {
        this._driverName = driverName;
        this._totalDrivingTimeInHrs = 0;
        this._totalDistInMiles = 0;
        this._milesPerHour = 0;
    }

    _calcTotalTimeInHrs(drivingTimes) {
        const { startHour, startMin, endHour, endMin } = drivingTimes;
        return endHour + endMin / 60 - (startHour + startMin / 60);
    }

    _convertTimeToNumber(drivingTimes) {
        return drivingTimes.split(":").map(num => Number(num));
    }

    getName() {
        return this._driverName;
    }

    getMilesPerHour() {
        return this._milesPerHour;
    }

    setMilesPerHour() {
        this._milesPerHour = Math.round(this._totalDistInMiles / this._totalDrivingTimeInHrs);
    }

    getTotalDistInMiles() {
        return this._totalDistInMiles;
    }

    setTotalDistInMiles(distInMiles) {
        this._totalDistInMiles += distInMiles;
        return this._totalDistInMiles;
    }

    getTotalTimeInHrs() {
        return this._totalDrivingTimeInHrs;
    }

    setTotalTimeInHrs(drivingTime) {
        const [startTime, endTime, ..._rest] = drivingTime;
        const [startHour, startMin] = this._convertTimeToNumber(startTime);
        const [endHour, endMin] = this._convertTimeToNumber(endTime);
        const drivingTimes = { startHour, startMin, endHour, endMin };
        this._totalDrivingTimeInHrs += this._calcTotalTimeInHrs(drivingTimes);
    }

    getRecord() {
        let driverDescription = `${this._driverName}: ${this._totalDistInMiles} miles`;

        const driverHasTraveled = this._totalDistInMiles;
        if (driverHasTraveled) {
            driverDescription += ` @ ${this._milesPerHour} mph`;
        }

        return driverDescription;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Driver);


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");


getDriverRecords().then(data => console.log(data));

async function getDriverRecords() {
    return await Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["readRecordsFile"])();
}


/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: readRecordsFile, createDriversRecordsHash, getCurrentDriver, getDriversRecordsOutput, sortDriversByDistInMilesDescending */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readRecordsFile", function() { return readRecordsFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDriversRecordsHash", function() { return createDriversRecordsHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentDriver", function() { return getCurrentDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDriversRecordsOutput", function() { return getDriversRecordsOutput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortDriversByDistInMilesDescending", function() { return sortDriversByDistInMilesDescending; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! process */ "process");
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Driver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Driver */ "./src/Driver.js");





function readRecordsFile() {
    return new Promise((res, rej) => {
        const driversRecordsFile = process__WEBPACK_IMPORTED_MODULE_1___default.a.argv[2];
        fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(driversRecordsFile, "utf8", (err, data) => {
            if (err) {
                rej(err);
            }

            const driversRecordsHash = createDriversRecordsHash(data);
            const driversRecords = [];
            for (let driver in driversRecordsHash) {
                const currDriver = getCurrentDriver(driversRecordsHash, driver);
                const driverAveragedCorrectSpeedLimit =
                    currDriver.getMilesPerHour() > 4 && currDriver.getMilesPerHour() < 101;
                const driverDidNotTravel = currDriver.getMilesPerHour() === 0;

                if (driverAveragedCorrectSpeedLimit || driverDidNotTravel) {
                    driversRecords.push(currDriver);
                }
            }

            sortDriversByDistInMilesDescending(driversRecords);
            let driverRecordsOutput = getDriversRecordsOutput(driversRecords);
            res(driverRecordsOutput);
        });
    });
}

function createDriversRecordsHash(driverRecordsFileData) {
    return driverRecordsFileData.split("\n").reduce((acc, nxt) => {
        nxt = nxt.split(" ");
        const [command, driverName, ...rest] = nxt;

        if (command === "Driver") {
            acc[driverName] = new _Driver__WEBPACK_IMPORTED_MODULE_2__["default"](driverName);
        } else {
            let distInMiles = Math.round(Number(rest[2]));
            acc[driverName].setTotalDistInMiles(distInMiles);
            acc[driverName].setTotalTimeInHrs(rest);
            acc[driverName].setMilesPerHour();
        }

        return acc;
    }, {});
}

function getCurrentDriver(driversHash, currDriver) {
    return driversHash[currDriver];
}

function getDriversRecordsOutput(listOfDrivers) {
    return listOfDrivers.reduce((acc, nxt) => {
        acc += nxt.getRecord() + "\n";
        return acc;
    }, "");
}

function sortDriversByDistInMilesDescending(listOfDrivers) {
    return listOfDrivers.sort((curr, nxt) => nxt.getTotalDistInMiles() - curr.getTotalDistInMiles());
}




/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("process");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map