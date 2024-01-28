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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* @ts-ignore */

/* @ts-ignore */



// Database connection setup
var db = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().open('mysql', 'gL64LSe6ggDbrgk.root:password@tcp(gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000)/test?tls=skip-verify');
var inserts = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('rows_inserts');
var SPLIT = ', ';
var scenarios = {
  insertData: {
    executor: 'ramping-vus',
    exec: 'insertData',
    startTime: '3m',
    // Start after 5 minutes
    startVUs: 0,
    stages: [{
      duration: '2m',
      target: 50
    },
    // Ramp up to 50 VUs over the first 5 minutes
    {
      duration: '2m',
      target: 25
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
  var checkTableQuery = "SELECT COUNT(*) AS table_exists \n                           FROM information_schema.tables \n                           WHERE table_schema = 'test' \n                             AND table_name = 'ge_metadata';";
  var res = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().query(db, checkTableQuery);
  if (res[0].table_exists === 0) {
    throw new Error("Table 'ge_metadata' does not exist. Terminating the script.");
  } else {
    console.log("Table 'ge_metadata' exists. Proceeding with the script.");
  }
  // Additional setup logic, if any...
}

// Teardown function
function teardown() {
  db.close();
}
function readGeData(limit) {
  var query = "SELECT tenant_id, ge_name, columns, indexes FROM ge_metadata ORDER BY RAND() LIMIT ".concat(limit, ";");
  var resultSet = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().query(db, query);
  var geData = [];
  var _iterator = _createForOfIteratorHelper(resultSet),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      geData.push({
        tenant_id: parseInt(String.fromCharCode.apply(String, _toConsumableArray(row.tenant_id)), 10),
        ge_name: String.fromCharCode.apply(String, _toConsumableArray(row.ge_name)),
        columns: String.fromCharCode.apply(String, _toConsumableArray(row.columns)),
        indexes: String.fromCharCode.apply(String, _toConsumableArray(row.indexes))
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return geData;
}

// Function to generate the SQL query for inserting data
function generateInsertQuery(tenantId, geName, columns) {
  var cols = [];
  var values = [];
  columns.split(SPLIT).forEach(function (colDef) {
    var _colDef$trim$split = colDef.trim().split(' '),
      _colDef$trim$split2 = _slicedToArray(_colDef$trim$split, 2),
      colName = _colDef$trim$split2[0],
      colType = _colDef$trim$split2[1];
    cols.push(colName);
    values.push(colType === 'VARCHAR(255)' ? "'".concat((0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomString)(16), "'") : colType === 'INT' ? (0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(1, 10000).toString() : 'NOW(3)' // Default value for other types
    );
  });
  return "INSERT INTO tenant_".concat(tenantId, "_").concat(geName, " (").concat(cols.join(SPLIT), ") VALUES (").concat(values, ");");
}

// Function to insert data into a GE table
function insertData() {
  // Randomly select a GE metadata record
  var _readGeData$ = readGeData(1)[0],
    tenant_id = _readGeData$.tenant_id,
    ge_name = _readGeData$.ge_name,
    columns = _readGeData$.columns;
  var insertQuery = generateInsertQuery(tenant_id, ge_name, columns);
  try {
    db.exec(insertQuery);
    inserts.add(1);
  } catch (error) {
    console.error("Error executing insert query: ".concat(error));
    console.error("Failed SQL: ".concat(insertQuery));
  }
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