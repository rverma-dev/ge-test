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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createGE: () => (/* binding */ createGE),
  options: () => (/* binding */ options),
  setup: () => (/* binding */ setup),
  teardown: () => (/* binding */ teardown)
});

// EXTERNAL MODULE: external "k6/x/sql"
var sql_ = __webpack_require__(996);
var sql_default = /*#__PURE__*/__webpack_require__.n(sql_);
// EXTERNAL MODULE: external "https://jslib.k6.io/k6-utils/1.2.0/index.js"
var index_js_ = __webpack_require__(631);
;// CONCATENATED MODULE: external "k6/execution"
const execution_namespaceObject = require("k6/execution");
var execution_default = /*#__PURE__*/__webpack_require__.n(execution_namespaceObject);
// EXTERNAL MODULE: external "k6/metrics"
var metrics_ = __webpack_require__(610);
;// CONCATENATED MODULE: ./src/tidb-createGE-test.ts
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/* @ts-ignore */

/* @ts-ignore */




// Database connection setup
var dbHost = __ENV.DB_HOST || "10.0.132.214";
var dbPort = __ENV.DB_PORT || "4000";
var dbName = __ENV.DB_NAME || "test";
var dbUser = __ENV.DB_USER || "root";
var dbPassword = __ENV.TIDB_PASSWORD || "password";
var connectionString = "".concat(dbUser, ":").concat(dbPassword, "@tcp(").concat(dbHost, ":").concat(dbPort, ")/").concat(dbName, "?tls=skip-verify");
var db = sql_default().open('mysql', connectionString);
var tables = new metrics_.Counter('total_tables');
var types = ['VARCHAR(255)', 'BIGINT', 'DATETIME(5)'];
var scenarios = {
  createGE: {
    executor: 'ramping-vus',
    exec: 'createGE',
    startVUs: 20,
    startTime: '0',
    stages: [{
      duration: '2m',
      target: 50
    },
    // Stay at 50 VUs for the first 5 minutes
    {
      duration: '4m',
      target: 50
    },
    // Reduce to 20 VUs over the next 10 minutes
    {
      duration: '2m',
      target: 20
    } // Further reduce to 10 VUs for the last 5 minutes
    ],
    gracefulRampDown: '30s'
  }
};

// Options configuration
var options = {
  discardResponseBodies: true,
  scenarios: scenarios
};

// Type guard to check if the error is a DBError
function isDBError(error) {
  return error.value !== undefined;
}
function setup() {
  // FIXME: this will cause hotspot and uneven spread on region servers due to auto increment
  db.exec("CREATE TABLE IF NOT EXISTS test.ge_metadata\n             (\n                 id        INT AUTO_INCREMENT PRIMARY KEY,\n                 tenant_id INT          NOT NULL,\n                 ge_name   VARCHAR(255) NOT NULL,\n                 columns   JSON         NOT NULL,\n                 indexes   JSON         NOT NULL\n             ) AUTO_ID_CACHE 1;");
}

// Teardown function
function teardown() {
  db.close();
}

// Function to generate random columns
function generateRandomColumns() {
  var columns = [];
  var numCols = (0,index_js_.randomIntBetween)(3, 10); // Generate between 3 to 10 columns
  var columnNames = new Set(); // To track unique column names

  // Ensure the first column (primary key) is either VARCHAR(255) or BIGINT with skew 80% bigint
  var primaryType = (0,index_js_.randomIntBetween)(0, 9) > 7 ? 'VARCHAR(255)' : 'BIGINT';
  var primaryColName = "col_".concat((0,index_js_.randomIntBetween)(1000, 9999));
  columns.push({
    name: primaryColName,
    type: primaryType
  });
  columnNames.add(primaryColName);

  // Generate the rest of the columns
  while (columns.length < numCols) {
    var type = types[(0,index_js_.randomIntBetween)(0, types.length - 1)];
    var colName = "col_".concat((0,index_js_.randomIntBetween)(1000, 9999));

    // Ensure the column name is unique
    if (!columnNames.has(colName)) {
      columns.push({
        name: colName,
        type: type
      });
      columnNames.add(colName);
    }
  }
  return columns;
}

// Function to select random indexes from the columns
function selectRandomIndexes(columns, maxIndexes) {
  var selectedIndexes = new Set(); // To keep track of selected indexes
  while (selectedIndexes.size < Math.min(maxIndexes, columns.length)) {
    var randomIndex = (0,index_js_.randomIntBetween)(0, columns.length - 1);
    selectedIndexes.add(columns[randomIndex]);
  }
  return Array.from(selectedIndexes);
}

// Create GE scenario
function createGE() {
  var tenantId = 1 + (execution_default()).vu.idInTest;
  var geName = "ge_".concat((execution_default()).vu.iterationInScenario);
  var columns = generateRandomColumns();
  var _columns = _toArray(columns),
    primaryKeyCol = _columns[0],
    otherColumns = _columns.slice(1);
  var indexes = selectRandomIndexes(otherColumns, 2); // Select up to 2 columns for indexing
  var createTableSQL = "CREATE TABLE tenant_".concat(tenantId, "_").concat(geName, "\n    (\n        ").concat(primaryKeyCol.name, "\n        ").concat(primaryKeyCol.type === 'BIGINT' ? 'BIGINT AUTO_RANDOM' : primaryKeyCol.type, "\n        ").concat(otherColumns.map(function (_ref) {
    var name = _ref.name,
      type = _ref.type;
    return ", ".concat(name, " ").concat(type);
  }).join(''), ",\n        PRIMARY KEY ( ").concat(primaryKeyCol.name, " )\n        );");
  var insertMetaSQL = "INSERT INTO ge_metadata (tenant_id, ge_name, columns, indexes)\n                           VALUES (".concat(tenantId, ", '").concat(geName, "',\n                                   '").concat(JSON.stringify(columns), "',\n                                   '").concat(JSON.stringify(indexes), "');");

  // Create table
  try {
    db.exec(createTableSQL);
    // Create indexes
    indexes.forEach(function (indexCol) {
      var createIndexSQL = "CREATE INDEX IF NOT EXISTS idx_".concat(indexCol.name, " ON tenant_").concat(tenantId, "_").concat(geName, " (").concat(indexCol.name, ");");
      try {
        db.exec(createIndexSQL);
      } catch (error) {
        console.error("Error creating index on column ".concat(indexCol.name, " for tenant_").concat(tenantId, "_").concat(geName, ": ").concat(error));
        console.error("Failed SQL: ".concat(createIndexSQL));
      }
    });

    // Insert metadata
    try {
      db.exec(insertMetaSQL);
      tables.add(1);
      console.log("Table tenant_".concat(tenantId, "_").concat(geName, " created successfully"));
    } catch (error) {
      console.error("Error inserting metadata for tenant_".concat(tenantId, "_").concat(geName, ": ").concat(error));
      console.error("Failed SQL: ".concat(insertMetaSQL));
    }
  } catch (error) {
    if (isDBError(error) && error.value.number != 1050) {
      console.error("Error creating table tenant_".concat(tenantId, "_").concat(geName, ": ").concat(error));
      console.error("Failed SQL: ".concat(createTableSQL));
      return; // Exit the function if table creation fails
    }
  }
}

/* 
Result

data_received........: 0 B 0 B/s
data_sent............: 0 B 0 B/s
iteration_duration...: avg=51.16s min=68.45µs med=57.7s max=1m12s p(90)=1m7s p(95)=1m9s
iterations...........: 230 0.602096/s
total_tables.........: 230 0.602096/s
vus..................: 0   min=0      max=50
vus_max..............: 50  min=50     max=50


DB side avg create 

*/
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=tidb-createGE-test.js.map