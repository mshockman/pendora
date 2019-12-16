(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[0],{

/***/ "./jekyll/js/pages/menus/page_index.js":
/*!*********************************************!*\
  !*** ./jekyll/js/pages/menus/page_index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuPageIndex; });
/* harmony import */ var menu_Select2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! menu/Select2 */ "./src/menu/Select2.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MenuPageIndex =
/*#__PURE__*/
function () {
  function MenuPageIndex() {
    _classCallCheck(this, MenuPageIndex);
  }

  _createClass(MenuPageIndex, [{
    key: "load",
    value: function load() {// this.createSelectMenuTest(document.body);
    }
  }, {
    key: "createSelectMenuTest",
    value: function createSelectMenuTest(container) {
      var testMenu = new menu_Select2__WEBPACK_IMPORTED_MODULE_0__["SelectMenu"]();
      testMenu.isVisible = true;
      testMenu.multiSelect = true;
      testMenu.toggle = "ctrl";
      testMenu.clearOldSelection = true;
      testMenu.enableShiftSelect = true;
      testMenu.enableCtrlToggle = true;

      for (var i = 0; i < 10; i++) {
        var option = new menu_Select2__WEBPACK_IMPORTED_MODULE_0__["SelectOption"]({
          text: "Option #".concat(i + 1),
          value: i + 1
        });
        testMenu.append(option);
      }

      window.testMenu = testMenu;
      testMenu.appendTo(container);
      console.log("Debugging SelectMenu as testMenu");
      console.log(testMenu);
    }
  }]);

  return MenuPageIndex;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map