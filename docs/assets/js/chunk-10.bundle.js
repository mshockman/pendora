(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[10],{

/***/ "./docs/js/pages/documentation/test_sortable.js":
/*!******************************************************!*\
  !*** ./docs/js/pages/documentation/test_sortable.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestSortablePage; });
/* harmony import */ var core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Sortable */ "./src/core/ui/Sortable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TestSortablePage = /*#__PURE__*/function () {
  function TestSortablePage() {
    _classCallCheck(this, TestSortablePage);
  }

  _createClass(TestSortablePage, [{
    key: "load",
    value: function load() {
      window.sortableGrid = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__["default"]("#sortable-grid", {
        layout: 'xy',
        setPlaceholderSize: true
      });
      window.sortableList1 = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__["default"]('#drag-list-test', {
        droppables: '.drop-list',
        placeholder: true,
        setPlaceholderSize: true
      });
      window.sortableList2 = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__["default"]('#drag-list-test2', {
        droppables: '.drop-list',
        placeholder: true,
        setPlaceholderSize: true
      });
    }
  }]);

  return TestSortablePage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-10.bundle.js.map