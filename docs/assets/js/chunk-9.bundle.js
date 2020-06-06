(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[9],{

/***/ "./docs/js/pages/documentation/test_resizeable.js":
/*!********************************************************!*\
  !*** ./docs/js/pages/documentation/test_resizeable.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestResizeablePage; });
/* harmony import */ var core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Resizeable */ "./src/core/ui/Resizeable.js");
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
/* harmony import */ var _src_core_ui_PointerTracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../src/core/ui/PointerTracker */ "./src/core/ui/PointerTracker.js");
/* harmony import */ var _src_core_vectors_Rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../src/core/vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _src_core_ui_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../src/core/ui/position */ "./src/core/ui/position.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






window.Rect = _src_core_vectors_Rect__WEBPACK_IMPORTED_MODULE_3__["default"];
window.getBoundingOffsetRect = _src_core_ui_position__WEBPACK_IMPORTED_MODULE_4__["getBoundingOffsetRect"];

var TestResizeablePage = /*#__PURE__*/function () {
  function TestResizeablePage() {
    _classCallCheck(this, TestResizeablePage);
  }

  _createClass(TestResizeablePage, [{
    key: "load",
    value: function load() {
      this.loadDraggables();
      var debugTracker = _src_core_ui_PointerTracker__WEBPACK_IMPORTED_MODULE_2__["default"].DebugMouseTracker();
      document.body.appendChild(debugTracker.element);
      this.resizeable1 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]('#resizeable1', {
        helper: Object(core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["cloneHelperFactory"])(1000, 0.5),
        minWidth: 100,
        minHeight: 100,
        maxWidth: 250,
        maxHeight: 250
      });
      this.resizeable2 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]("#resizeable2", {});
      this.resizeable3 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]("#resizeable3", {
        position: "width-height"
      });
      console.log("Hello WOrld");
    }
  }, {
    key: "loadDraggables",
    value: function loadDraggables() {
      var elements = document.querySelectorAll('.draggable');

      var _iterator = _createForOfIteratorHelper(elements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var d = _step.value;
          var container = d.closest('.example-zone') || null;
          new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](d, {
            container: container
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return TestResizeablePage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-9.bundle.js.map