/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 24:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createGE: () => (/* binding */ createGE)
});

// UNUSED EXPORTS: options, setup, teardown

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

/***/ }),

/***/ 74:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   insertData: () => (/* binding */ insertData)
/* harmony export */ });
/* unused harmony exports options, setup, teardown */
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
var connectionString = "".concat(dbUser, ":").concat(dbPassword, "@tcp(").concat(dbHost, ":").concat(dbPort, ")/").concat(dbName, "?tls=skip-verify");
var db = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().open('mysql', connectionString);
var inserts = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('rows_inserts');
var duplicate = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('duplicate_inserts');
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
    // Steady at 100 VUs over the next 5 minutes
    {
      duration: '5m',
      target: 200
    },
    // Ramp up another 100 VUs over the next 5 minutes
    {
      duration: '5m',
      target: 200
    },
    // Steady at 200 VUs over the next 5 minutes
    {
      duration: '5m',
      target: 50
    } // Ramp down to  25 VUs for the next 5 minutes
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
  var res = sql.query(db, MetaTableExistsQuery);
  var rowCount = parseInt(String.fromCharCode(res[0]["table_exists"]));
  console.log(rowCount);
  if (res[0].table_exists === 0) {
    throw new Error("Table 'ge_metadata' does not exist. Terminating the script.");
  } else {
    console.log("Table 'ge_metadata' exists. Proceeding with the script.");
    var _res = sql.query(db, MetaCountQuery);
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
    if (isDBError(error) && error.value.number === 1062) {
      duplicate.add(1);
    } else {
      console.error("Error executing insert query: ".concat(error));
      console.error("Failed SQL: ".concat(insertQuery));
    }
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

/***/ }),

/***/ 228:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readJoinData: () => (/* binding */ readJoinData)
/* harmony export */ });
/* unused harmony exports options, setup, teardown */
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
var dbHost = __ENV.DB_HOST || "10.0.132.214";
var dbPort = __ENV.DB_PORT || "4000";
var dbName = __ENV.DB_NAME || "test";
var dbUser = __ENV.DB_USER || "root";
var dbPassword = __ENV.TIDB_PASSWORD || "password";
var connectionString = "".concat(dbUser, ":").concat(dbPassword, "@tcp(").concat(dbHost, ":").concat(dbPort, ")/").concat(dbName, "?tls=skip-verify");
var db = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().open('mysql', connectionString);
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
  var res = sql.query(db, checkTableQuery);
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

/***/ }),

/***/ 740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readData: () => (/* binding */ readData)
/* harmony export */ });
/* unused harmony exports options, setup, teardown */
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
var dbHost = __ENV.DB_HOST || "10.0.132.214";
var dbPort = __ENV.DB_PORT || "4000";
var dbName = __ENV.DB_NAME || "test";
var dbUser = __ENV.DB_USER || "root";
var dbPassword = __ENV.TIDB_PASSWORD || "password";
var connectionString = "".concat(dbUser, ":").concat(dbPassword, "@tcp(").concat(dbHost, ":").concat(dbPort, ")/").concat(dbName, "?tls=skip-verify");
var db = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().open('mysql', connectionString);
var reads = new k6_metrics__WEBPACK_IMPORTED_MODULE_2__.Counter('rows_reads');
var SPLIT = ', ';
var scenarios = {
  readData: {
    executor: 'ramping-vus',
    exec: 'readData',
    startTime: '6m',
    // Start after 10 minutes
    startVUs: 50,
    stages: [{
      duration: '2m',
      target: 50
    },
    // Ramp up to 40 VUs over the first 5 minutes
    {
      duration: '2m',
      target: 80
    } // Stay at 50 VUs for the next 5 minutes
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
  var res = sql.query(db, checkTableQuery);
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

// Function to read data from a GE table with different types of queries
function readData() {
  // Randomly select a GE metadata record
  var _readGeData$ = readGeData(1)[0],
    tenant_id = _readGeData$.tenant_id,
    ge_name = _readGeData$.ge_name,
    columns = _readGeData$.columns,
    indexes = _readGeData$.indexes;
  var cols = [];
  var defaultValueMap = new Map(); // Map to store default values for each column
  var indx = indexes.split(SPLIT);
  columns.split(SPLIT).forEach(function (colDef) {
    var _colDef$trim$split = colDef.trim().split(' '),
      _colDef$trim$split2 = _slicedToArray(_colDef$trim$split, 2),
      colName = _colDef$trim$split2[0],
      colType = _colDef$trim$split2[1];
    cols.push(colName);
    var defaultValue = colType === 'VARCHAR(255)' ? "'".concat((0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomString)(16), "'") : colType === 'INT' ? (0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(1, 10000).toString() : 'NOW(5)'; // Default value for other types
    defaultValueMap.set(colName, defaultValue);
  });
  var nonIndexedCols = cols.filter(function (col) {
    return !indx.includes(col);
  });
  var queryType = (0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(1, 3); // Randomly choose query type
  var readQuery;
  switch (queryType) {
    case 1:
      // Queries using indexes
      var randomCol = indx[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, indx.length - 1)];
      var defaultValue = defaultValueMap.get(randomCol);
      readQuery = "SELECT * FROM tenant_".concat(tenant_id, "_").concat(ge_name, " WHERE ").concat(randomCol, " = ").concat(defaultValue, " LIMIT 10;");
      break;
    case 2:
      // Queries without indexes
      var randomCol2 = nonIndexedCols[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, nonIndexedCols.length - 1)];
      var defaultValue2 = defaultValueMap.get(randomCol2);
      readQuery = "SELECT * FROM tenant_".concat(tenant_id, "_").concat(ge_name, " WHERE ").concat(randomCol2, " = ").concat(defaultValue2, " LIMIT 10;");
      break;
    default:
      // Mixed queries
      var randomIndexedCol = indx[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, indx.length - 1)];
      var randomNonIndexedCol = nonIndexedCols[(0,https_jslib_k6_io_k6_utils_1_2_0_index_js__WEBPACK_IMPORTED_MODULE_1__.randomIntBetween)(0, nonIndexedCols.length - 1)];
      var defaultValueIndexed = defaultValueMap.get(randomIndexedCol);
      readQuery = "SELECT * FROM tenant_".concat(tenant_id, "_").concat(ge_name, " WHERE ").concat(randomIndexedCol, " = ").concat(defaultValueIndexed, " AND ").concat(randomNonIndexedCol, " IS NOT NULL LIMIT 10;");
      break;
  }
  try {
    console.log(readQuery);
    var response = db.query(readQuery);
    if (response != null) {
      console.log("Read query type ".concat(queryType, " executed successfully"));
      reads.add(1);
    }
  } catch (error) {
    console.error("Error executing read query type ".concat(queryType, ": ").concat(error));
  }
}

/* 
Results

data_received........: 0 B  0 B/s
data_sent............: 0 B  0 B/s
iteration_duration...: avg=3.54s min=116.87µs med=374.66ms max=1m38s p(90)=1.44s p(95)=31.67s
iterations...........: 4279 6.774115/s
rows_reads...........: 3962 6.27227/s
vus..................: 4    min=0      max=79
vus_max..............: 80  

1. Unresponsive at 65-70, with constant timeouts

*/

/***/ }),

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
/* harmony export */   createGE: () => (/* reexport safe */ _tidb_createGE_test__WEBPACK_IMPORTED_MODULE_1__.createGE),
/* harmony export */   insertData: () => (/* reexport safe */ _tidb_insertData_test__WEBPACK_IMPORTED_MODULE_2__.insertData),
/* harmony export */   options: () => (/* binding */ options),
/* harmony export */   readData: () => (/* reexport safe */ _tidb_readData_test__WEBPACK_IMPORTED_MODULE_3__.readData),
/* harmony export */   readJoinData: () => (/* reexport safe */ _tidb_joinData_test__WEBPACK_IMPORTED_MODULE_4__.readJoinData),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   teardown: () => (/* binding */ teardown)
/* harmony export */ });
/* harmony import */ var k6_x_sql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(996);
/* harmony import */ var k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(k6_x_sql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tidb_createGE_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _tidb_insertData_test__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74);
/* harmony import */ var _tidb_readData_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(740);
/* harmony import */ var _tidb_joinData_test__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(228);
/* @ts-ignore */






// Database connection setup
var dbHost = __ENV.DB_HOST || "gateway01.ap-southeast-1.prod.aws.tidbcloud.com";
var dbPort = __ENV.DB_PORT || "4000";
var dbName = __ENV.DB_NAME || "test";
var dbUser = __ENV.DB_USER || "gL64LSe6ggDbrgk.root";
var dbPassword = __ENV.DB_PASSWORD || "password";
var connectionString = "".concat(dbUser, ":").concat(dbPassword, "@tcp(").concat(dbHost, ":").concat(dbPort, ")/").concat(dbName, "?tls=skip-verify");
var db = k6_x_sql__WEBPACK_IMPORTED_MODULE_0___default().open('mysql', connectionString);

// Scenarios configuration
/*  Create     Insert     Read      Read with Join
0   50           0          0           0
5   20          50          0           0
10  10          50          40          0
15  0           0           50          50
*/

var scenarios = {
  createGE: {
    executor: 'ramping-vus',
    exec: 'createGE',
    startVUs: 50,
    stages: [{
      duration: '10s',
      target: 50
    },
    // Stay at 50 VUs for the first 5 minutes
    {
      duration: '20s',
      target: 20
    },
    // Reduce to 20 VUs over the next 10 minutes
    {
      duration: '10s',
      target: 10
    } // Further reduce to 10 VUs for the last 5 minutes
    ],
    gracefulRampDown: '30s'
  },
  insertData: {
    executor: 'ramping-vus',
    exec: 'insertData',
    startTime: '1m',
    // Start after 5 minutes
    startVUs: 0,
    stages: [{
      duration: '1m',
      target: 50
    },
    // Ramp up to 50 VUs over the first 5 minutes
    {
      duration: '1m',
      target: 25
    } // Ramp down to  25 VUs for the next 10 minutes
    ],
    gracefulRampDown: '30s'
  },
  readData: {
    executor: 'ramping-vus',
    exec: 'readData',
    startTime: '2m',
    // Start after 10 minutes
    startVUs: 0,
    stages: [{
      duration: '2m',
      target: 40
    },
    // Ramp up to 40 VUs over the first 5 minutes
    {
      duration: '4m',
      target: 50
    } // Stay at 50 VUs for the next 5 minutes
    ],
    gracefulRampDown: '30s'
  },
  readJoinData: {
    executor: 'ramping-vus',
    exec: 'readJoinData',
    startTime: '4m',
    // Start after 15 minutes
    startVUs: 0,
    stages: [{
      duration: '2m',
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
  db.exec("CREATE TABLE IF NOT EXISTS test.ge_metadata (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        tenant_id INT NOT NULL,\n        ge_name VARCHAR(255) NOT NULL,\n        columns TEXT NOT NULL,\n        indexes TEXT NOT NULL\n    );");
  // Additional setup logic...
}

// Teardown function
function teardown() {
  db.close();
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=tidb-test.js.map