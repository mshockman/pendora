(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[9],{

/***/ "./jekyll/js/pages/documentation/test_resizeable.js":
/*!**********************************************************!*\
  !*** ./jekyll/js/pages/documentation/test_resizeable.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestResizeablePage; });
/* harmony import */ var core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Resizeable */ "./src/core/ui/Resizeable.js");
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




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
      this.resizeable1 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]('#resizeable1');
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
//# sourceMappingURL=chunk-9.bundle.js.map