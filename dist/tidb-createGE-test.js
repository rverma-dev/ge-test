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
/* @ts-ignore */

/* @ts-ignore */




// Database connection setup
var db = sql_default().open('mysql', 'gL64LSe6ggDbrgk.root:password@tcp(gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000)/test?tls=skip-verify');
var tables = new metrics_.Counter('total_tables');
var SPLIT = ', ';
var scenarios = {
  createGE: {
    executor: 'ramping-vus',
    exec: 'createGE',
    startVUs: 20,
    startTime: '0',
    stages: [{
      duration: '1m',
      target: 50
    },
    // Stay at 50 VUs for the first 5 minutes
    {
      duration: '4m',
      target: 20
    },
    // Reduce to 20 VUs over the next 10 minutes
    {
      duration: '1m',
      target: 10
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
function setup() {
  db.exec("CREATE TABLE IF NOT EXISTS test.ge_metadata (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        tenant_id INT NOT NULL,\n        ge_name VARCHAR(255) NOT NULL,\n        columns TEXT NOT NULL,\n        indexes TEXT NOT NULL\n    );");
}

// Teardown function
function teardown() {
  db.close();
}

// Function to generate random columns
function generateRandomColumns() {
  var types = ['VARCHAR(255)', 'INT', 'DATETIME(3)'];
  var columns = [];
  var numCols = (0,index_js_.randomIntBetween)(3, 10); // Generate between 3 to 10 columns
  var columnNames = new Set(); // To track unique column names

  while (columns.length < numCols) {
    var type = types[(0,index_js_.randomIntBetween)(0, types.length - 1)];
    var colName = "col_".concat((0,index_js_.randomIntBetween)(1000, 9999));

    // Ensure the column name is unique
    if (!columnNames.has(colName)) {
      columns.push("".concat(colName, " ").concat(type));
      columnNames.add(colName); // Add to the set of known names
    }
  }
  return columns;
}

// Function to select random indexes from the columns
function selectRandomIndexes(columns, maxIndexes) {
  var columnNames = columns.map(function (col) {
    return col.split(' ')[0];
  });
  var selectedIndexes = new Set(); // To keep track of selected indexes
  var indexes = [];

  // Adjust to exclude primary key column (assuming it's the first column)
  columnNames.shift();
  while (indexes.length < Math.min(maxIndexes, columnNames.length)) {
    var randomIndex = (0,index_js_.randomIntBetween)(0, columnNames.length - 1);
    var indexName = columnNames[randomIndex];

    // Check if already selected, if not, add to the indexes array
    if (!selectedIndexes.has(indexName)) {
      indexes.push(indexName);
      selectedIndexes.add(indexName);
    }
  }
  return indexes;
}

// Create GE scenario
function createGE() {
  var tenantId = 1 + (execution_default()).vu.idInTest;
  var geName = "ge_".concat((execution_default()).vu.iterationInScenario);
  var columns = generateRandomColumns();
  var indexes = selectRandomIndexes(columns, 4); // Select up to 4 columns for indexing
  var primaryKeyCol = columns[0].split(' ')[0]; // Use the first column as the primary key
  var createTableSQL = "CREATE TABLE tenant_".concat(tenantId, "_").concat(geName, " (").concat(columns.join(SPLIT), ", PRIMARY KEY (").concat(primaryKeyCol, "));");
  var insertMetaSQL = "INSERT INTO ge_metadata (tenant_id, ge_name, columns, indexes) VALUES (".concat(tenantId, ",'").concat(geName, "','").concat(columns.join(SPLIT), "','").concat(indexes.join(SPLIT), "');");

  // Create table
  try {
    db.exec(createTableSQL);
    console.log("Table tenant_".concat(tenantId, "_").concat(geName, " created successfully"));

    // Create indexes
    indexes.forEach(function (indexCol) {
      var createIndexSQL = "CREATE INDEX IF NOT EXISTS idx_".concat(indexCol, " ON tenant_").concat(tenantId, "_").concat(geName, " (").concat(indexCol, ");");
      try {
        db.exec(createIndexSQL);
        console.log("Index created successfully on column: ".concat(indexCol));
      } catch (error) {
        console.error("Error creating index on column ".concat(indexCol, " for tenant_").concat(tenantId, "_").concat(geName, ": ").concat(error));
        console.error("Failed SQL: ".concat(createIndexSQL));
      }
    });

    // Insert metadata
    try {
      db.exec(insertMetaSQL);
      tables.add(1);
    } catch (error) {
      console.error("Error inserting metadata for tenant_".concat(tenantId, "_").concat(geName, ": ").concat(error));
      console.error("Failed SQL: ".concat(insertMetaSQL));
    }
  } catch (error) {
    if (error.value.number != 1050) {
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