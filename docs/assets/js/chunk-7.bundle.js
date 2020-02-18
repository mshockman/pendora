(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[7],{

/***/ "./docs/js/pages/documentation/test_draggable.js":
/*!*******************************************************!*\
  !*** ./docs/js/pages/documentation/test_draggable.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestDraggablePage; });
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TestDraggablePage =
/*#__PURE__*/
function () {
  function TestDraggablePage() {
    _classCallCheck(this, TestDraggablePage);
  }

  _createClass(TestDraggablePage, [{
    key: "load",
    value: function load() {
      this.drag1 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example1", {
        resistance: 0,
        delay: 0,
        scrollSpeed: 1000,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez1')
      });
      this.drag2 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example2", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez2'),
        helper: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["clone"])(0.5),
        revert: true,
        revertDuration: 1000
      });
      this.drag3 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example3", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez3'),
        revert: true,
        revertDuration: 1000
      });
      this.drag4 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example4", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez4'),
        tolerance: 1
      });
      this.drag5 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example5", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez5'),
        axis: 'x'
      });
      this.drag6 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example6", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez6'),
        axis: 'y'
      });
      this.drag7 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example7", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez7'),
        grid: 50
      });
      this.drag8 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example8", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez8')
      });
      this.drag9 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example9", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez9'),
        selector: '.drag-item'
      });
      this.drag10 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example10", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez10'),
        helper: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["clone"])(0.5)
      });
      this.drag11 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example11", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez11'),
        selector: '.drag-item',
        revert: true,
        revertDuration: 1000,
        helper: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["clone"])(0.5)
      });
      this.drag12 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example12", {
        resistance: 0,
        delay: 500,
        scrollSpeed: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez12')
      });
      this.drag13 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example13", {
        resistance: 200,
        delay: 0,
        scrollSpeed: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez13')
      });
      this.drag14 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example14", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez14'),
        tolerance: 1,
        helper: Object(core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["clone"])(0.5),
        revertDuration: 1000,
        revert: true
      });
      this.connectDZ(this.drag4, '#dz1');
      this.connectDZ(this.drag14, '#dz14');
    }
  }, {
    key: "connectDZ",
    value: function connectDZ(drag, dz) {
      var dz1 = document.querySelector(dz);
      drag.connect(dz1);
      dz1.addEventListener('drag.enter', function (event) {
        dz1.classList.add('active');
      });
      dz1.addEventListener('drag.leave', function (event) {
        dz1.classList.remove('active');
      });
    }
  }]);

  return TestDraggablePage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-7.bundle.js.map