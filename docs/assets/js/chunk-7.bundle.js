(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[7],{

/***/ "./docs/js/pages/documentation/test_positioning.js":
/*!*********************************************************!*\
  !*** ./docs/js/pages/documentation/test_positioning.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestPositionerPage; });
/* harmony import */ var core_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/vectors */ "./src/core/vectors/index.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




window.Rect = core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"];
window.setElementClientPosition = core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"];

var TestPositionerPage =
/*#__PURE__*/
function () {
  function TestPositionerPage() {
    _classCallCheck(this, TestPositionerPage);
  }

  _createClass(TestPositionerPage, [{
    key: "load",
    value: function load() {
      var _this = this;

      this.referenceElement = document.getElementById('referenceElement');
      this.container = document.getElementById('container');
      this.overlay = document.getElementById('testOverlay');
      var controls = document.getElementById('controls');
      this.draggable = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_2__["default"](this.referenceElement, {});

      this.reposition = function () {
        var _p = function _p(offsetName) {
          var value = _this.getSelectValue("".concat(offsetName, "-offset")),
              unit = _this.getSelectValue("".concat(offsetName, "-offset-unit"));

          value = parseFloat(value);

          if (value < 0) {
            return "".concat(value).concat(unit);
          } else if (value > 0) {
            return "+".concat(value).concat(unit);
          } else {
            return '';
          }
        };

        var myX = _this.getSelectValue('my-x'),
            myY = _this.getSelectValue('my-y'),
            atX = _this.getSelectValue('at-x'),
            atY = _this.getSelectValue('at-y'),
            flipX = _this.getSelectValue('flip-x'),
            flipY = _this.getSelectValue('flip-y'),
            myOffsetX = _p('my-x'),
            myOffsetY = _p('my-y'),
            atOffsetX = _p('at-x'),
            atOffsetY = _p('at-y');

        var rect = new core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](_this.overlay);
        rect = rect.position({
          my: "".concat(myX).concat(myOffsetX, " ").concat(myY).concat(myOffsetY),
          at: "".concat(atX).concat(atOffsetX, " ").concat(atY).concat(atOffsetY),
          of: _this.referenceElement,
          inside: _this.container,
          collision: "".concat(flipX, " ").concat(flipY)
        });
        Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(_this.overlay, rect);
      };

      this.referenceElement.addEventListener('drag.move', function (event) {
        _this.reposition();
      });
      controls.addEventListener('change', function () {
        _this.reposition();
      });
      this.reposition();
    }
  }, {
    key: "getSelectValue",
    value: function getSelectValue(name) {
      var select = document.querySelector("[name=\"".concat(name, "\"]"));
      return select.value;
    }
  }]);

  return TestPositionerPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-7.bundle.js.map