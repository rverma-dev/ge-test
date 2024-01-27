/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ default_test),
  iter: () => (/* binding */ iter),
  options: () => (/* binding */ options)
});

;// CONCATENATED MODULE: external "k6"
const external_k6_namespaceObject = require("k6");
;// CONCATENATED MODULE: external "k6/http"
const http_namespaceObject = require("k6/http");
var http_default = /*#__PURE__*/__webpack_require__.n(http_namespaceObject);
;// CONCATENATED MODULE: external "k6/execution"
const execution_namespaceObject = require("k6/execution");
var execution_default = /*#__PURE__*/__webpack_require__.n(execution_namespaceObject);
;// CONCATENATED MODULE: ./src/default-test.ts



var options = {
  vus: 50,
  duration: '10s'
};
/* harmony default export */ const default_test = (function () {
  var res = http_default().get('https://test-api.k6.io');
  (0,external_k6_namespaceObject.check)(res, {
    'status is 200': function statusIs200() {
      return res.status === 200;
    }
  });
  (0,external_k6_namespaceObject.sleep)(1);
});
function iter() {
  console.log("Execution context\n    Instance info\n    -------------\n    Vus active: ".concat((execution_default()).instance.vusActive, "\n    Iterations completed: ").concat((execution_default()).instance.iterationsCompleted, "\n    Iterations interrupted:  ").concat((execution_default()).instance.iterationsInterrupted, "\n    Iterations completed:  ").concat((execution_default()).instance.iterationsCompleted, "\n    Iterations active:  ").concat((execution_default()).instance.vusActive, "\n    Initialized vus:  ").concat((execution_default()).instance.vusInitialized, "\n    Time passed from start of run(ms):  ").concat((execution_default()).instance.currentTestRunDuration, "\n\n    Scenario info\n    -------------\n    Name of the running scenario: ").concat((execution_default()).scenario.name, "\n    Executor type: ").concat((execution_default()).scenario.executor, "\n    Scenario start timestamp: ").concat((execution_default()).scenario.startTime, "\n    Percenatage complete: ").concat((execution_default()).scenario.progress, "\n    Iteration in instance: ").concat((execution_default()).scenario.iterationInInstance, "\n    Iteration in test: ").concat((execution_default()).scenario.iterationInTest, "\n\n    Test info\n    ---------\n    All test options: ").concat((execution_default()).test.options, "\n\n    VU info\n    -------\n    Iteration id: ").concat((execution_default()).vu.iterationInInstance, "\n    Iteration in scenario: ").concat((execution_default()).vu.iterationInScenario, "\n    VU ID in instance: ").concat((execution_default()).vu.idInInstance, "\n    VU ID in test: ").concat((execution_default()).vu.idInTest, "\n    VU tags: ").concat((execution_default()).vu.tags));
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=default-test.js.map