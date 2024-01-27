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
/* harmony export */   options: () => (/* binding */ options),
/* harmony export */   readJoinData: () => (/* binding */ readJoinData),
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
var reads = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('join_reads');
var scenarios = {
  readJoinData: {
    executor: 'ramping-vus',
    exec: 'readJoinData',
    startTime: '10m',
    // Start after 15 minutes
    startVUs: 50,
    stages: [{
      duration: '5m',
      target: 50
    } // Ramp up to 50 VUs over 5 minutes
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
function splitColumnsAndIndexes(metadata) {
  var cols = metadata.columns.split(',').map(function (col) {
    return col.trim().split(' ')[0];
  });
  var indexes = metadata.indexes.split(',').map(function (index) {
    return index.trim();
  });
  return {
    cols: cols,
    indexes: indexes
  };
}
function generateJoinQuery(metadata1, metadata2, joinType) {
  var _splitColumnsAndIndex = splitColumnsAndIndexes(metadata1),
    cols1 = _splitColumnsAndIndex.cols,
    indexes1 = _splitColumnsAndIndex.indexes;
  var _splitColumnsAndIndex2 = splitColumnsAndIndexes(metadata2),
    cols2 = _splitColumnsAndIndex2.cols,
    indexes2 = _splitColumnsAndIndex2.indexes;
  var joinCol1, joinCol2;
  switch (joinType) {
    case 1:
      // Join between indexed and indexed columns
      joinCol1 = indexes1[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, indexes1.length - 1)];
      joinCol2 = indexes2[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, indexes2.length - 1)];
      break;
    case 2:
      // Join between indexed and non-indexed columns
      joinCol1 = indexes1[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, indexes1.length - 1)];
      if (!joinCol1) {
        break;
      }
      joinCol2 = cols2.filter(function (col) {
        return !indexes2.includes(col);
      })[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, cols2.length - 1)];
      break;
    default:
      // Join between two non-indexed columns
      joinCol1 = cols1.filter(function (col) {
        return !indexes1.includes(col);
      })[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, cols1.length - 1)];
      joinCol2 = cols2.filter(function (col) {
        return !indexes2.includes(col);
      })[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, cols2.length - 1)];
      break;
  }
  return "SELECT * FROM tenant_".concat(metadata1.tenant_id, "_").concat(metadata1.ge_name, " a JOIN tenant_").concat(metadata2.tenant_id, "_").concat(metadata2.ge_name, " b ON a.").concat(joinCol1, " = b.").concat(joinCol2, " LIMIT 10;");
}
function readJoinData() {
  var _readGeData = readGeData(2),
    _readGeData2 = _slicedToArray(_readGeData, 2),
    metadata1 = _readGeData2[0],
    metadata2 = _readGeData2[1];
  if (!metadata1 || !metadata2) {
    console.error('Insufficient GE metadata found for join reading');
    return;
  }
  var queryType = Math.random() < 0.5 ? 1 : Math.random() < 0.67 ? 2 : 3; // Randomly choose query type
  var joinQuery = generateJoinQuery(metadata1, metadata2, queryType);
  try {
    var response = db.query(joinQuery);
    if (response != null) {
      console.log("Read query type ".concat(queryType, " executed successfully"));
      reads.add(1);
    }
  } catch (error) {
    console.error("Error executing join read query type ".concat(queryType, ": ").concat(error));
  }
}

/* 
Result

data_received........: 0 B   0 B/s
data_sent............: 0 B   0 B/s
iteration_duration...: avg=1.17s min=93.83µs med=363.85ms max=35.11s p(90)=786.17ms p(95)=1.69s
iterations...........: 13555 14.644529/s
join_reads...........: 8600  9.291254/s
vus..................: 2     min=0       max=50
vus_max..............: 50    min=50      max=50

*/
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=tidb-joinData-test.js.map