/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 631:
/***/ ((module) => {

module.exports = require("https://jslib.k6.io/k6-utils/1.2.0/index.js");

/***/ }),

/***/ 610:
/***/ ((module) => {

module.exports = require("k6/metrics");

/***/ }),

/***/ 996:
/***/ ((module) => {

module.exports = require("k6/x/sql");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   insertData: () => (/* binding */ insertData),
/* harmony export */   options: () => (/* binding */ options),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   teardown: () => (/* binding */ teardown)
/* harmony export */ });
/* harmony import */ var k6_x_sql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(996);
/* harmony import */ var k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(k6_x_sql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(631);
/* harmony import */ var https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var k6_metrics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(610);
/* harmony import */ var k6_metrics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(k6_metrics__WEBPACK_IMPORTED_MODULE_2__);
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* @ts-ignore */

/* @ts-ignore */



// Database connection setup
var dbHost = __ENV.DB_HOST || "10.0.132.214";
var dbPort = __ENV.DB_PORT || "4000";
var dbName = __ENV.DB_NAME || "test";
var dbUser = __ENV.DB_USER || "root";
var dbPassword = __ENV.TIDB_PASSWORD || "password";
var geCount = __ENV.GE_COUNT || "115";
var connectionString = "".concat(dbUser, ":").concat(dbPassword, "@tcp(").concat(dbHost, ":").concat(dbPort, ")/").concat(dbName, "?tls=skip-verify");
var db = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().open('mysql', connectionString);
var inserts = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('rows_inserts');
var SPLIT = ', ';
var MetaTableExistsQuery = "SELECT COUNT(*) AS table_exists FROM information_schema.tables  WHERE table_schema = 'test' AND table_name = 'ge_metadata';";
var MetaCountQuery = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_schema = 'test' AND table_name = 'ge_metadata';";
var scenarios = {
  insertData: {
    executor: 'ramping-vus',
    exec: 'insertData',
    startTime: '0m',
    // Start after 5 minutes
    startVUs: 50,
    stages: [{
      duration: '5m',
      target: 100
    },
    // Ramp up to 50 VUs over the first 5 minutes
    {
      duration: '5m',
      target: 100
    },
    // Ramp up to 50 VUs over the first 5 minutes
    {
      duration: '5m',
      target: 50
    } // Ramp down to  25 VUs for the next 10 minutes
    ],
    gracefulRampDown: '30s'
  }
};

// Options configuration
var options = {
  discardResponseBodies: true,
  scenarios: scenarios
};
function setup() {
  var res = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().query(db, MetaTableExistsQuery);
  var rowCount = parseInt(String.fromCharCode(res[0]["table_exists"]));
  console.log(rowCount);
  if (res[0].table_exists === 0) {
    throw new Error("Table 'ge_metadata' does not exist. Terminating the script.");
  } else {
    console.log("Table 'ge_metadata' exists. Proceeding with the script.");
    var _res = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().query(db, MetaCountQuery);
    var _rowCount = parseInt(String.fromCharCode.apply(String, _toConsumableArray(_res[0]["AUTO_INCREMENT"]).concat([10])));
    return {
      rowCount: _rowCount
    };
  }
}

// Teardown function
function teardown() {
  db.close();
}
function getRandomValueForType(type) {
  switch (type) {
    case 'VARCHAR(255)':
      return "'".concat((0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomString)(16), "'");
    case 'BIGINT':
      return (0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(1, 10000).toString();
    default:
      return 'NOW(5)';
  }
}

// Function to insert data into a GE table
function insertData(data) {
  var geData = readGeData(data.rowCount);
  var insertQuery = generateInsertQuery(geData.tenant_id, geData.ge_name, geData.columns);
  try {
    db.exec(insertQuery);
    inserts.add(1);
  } catch (error) {
    console.error("Error executing insert query: ".concat(error));
    console.error("Failed SQL: ".concat(insertQuery));
  }
}
function readGeData(id) {
  var randomID = (0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(1, id);
  var query = "SELECT tenant_id, ge_name, columns, indexes FROM ge_metadata where id = ".concat(randomID, ";");
  var resultSet = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().query(db, query);
  return {
    tenant_id: parseInt(String.fromCharCode.apply(String, _toConsumableArray(resultSet[0]["tenant_id"])), 10),
    ge_name: String.fromCharCode.apply(String, _toConsumableArray(resultSet[0]["ge_name"])),
    columns: JSON.parse(String.fromCharCode.apply(String, _toConsumableArray(resultSet[0]["columns"]))),
    indexes: JSON.parse(String.fromCharCode.apply(String, _toConsumableArray(resultSet[0]["indexes"])))
  };
}

// Function to generate the SQL query for inserting data
function generateInsertQuery(tenantId, geName, columns) {
  var cols = [];
  var values = [];
  var _columns = _toArray(columns),
    primaryKeyCol = _columns[0],
    otherColumns = _columns.slice(1);
  if (primaryKeyCol.type !== 'BIGINT') {
    cols.push(primaryKeyCol.name);
    values.push(getRandomValueForType(primaryKeyCol.type));
  }
  otherColumns.forEach(function (col) {
    cols.push(col.name);
    values.push(getRandomValueForType(col.type));
  });
  return "INSERT INTO tenant_".concat(tenantId, "_").concat(geName, " (").concat(cols.join(SPLIT), ") VALUES (").concat(values.join(SPLIT), ");");
}

/*
Result

data_received........: 0 B   0 B/s
data_sent............: 0 B   0 B/s
iteration_duration...: avg=118.81ms min=115.7µs med=111.18ms max=2.21s p(90)=132.32ms p(95)=149.11ms
iterations...........: 63142 150.1965/s
rows_inserts.........: 62799 149.380602/s
vus..................: 26    min=0        max=50
vus_max..............: 50    min=50       max=50

*/
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=tidb-insertData-test.js.map