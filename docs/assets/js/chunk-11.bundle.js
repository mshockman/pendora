(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[11],{

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






window.Rect = _src_core_vectors_Rect__WEBPACK_IMPORTED_MODULE_3__["default"];
window.getBoundingOffsetRect = _src_core_ui_position__WEBPACK_IMPORTED_MODULE_4__["getBoundingOffsetRect"];

var TestResizeablePage =
/*#__PURE__*/
function () {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var d = _step.value;
          var container = d.closest('.example-zone') || null;
          new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](d, {
            container: container
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return TestResizeablePage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-11.bundle.js.map