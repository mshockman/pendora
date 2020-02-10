(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[10],{

/***/ "./src/core/ui/Arrow.js":
/*!******************************!*\
  !*** ./src/core/ui/Arrow.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arrow; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }




/**
 * A class that creates an arrow that can be placed at the edge of elements that will point towards the target element.
 * The arrow will be positioned to be as close to the target why still fitting inside it's parent.
 */

var Arrow =
/*#__PURE__*/
function (_Component) {
  _inherits(Arrow, _Component);

  /**
   * The starting alignment of the arrow.
   * Can be start, end, or center.
   */
  function Arrow() {
    var _this;

    var placement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "bottom";
    var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "center";

    _classCallCheck(this, Arrow);

    var element = document.createElement('div');
    element.className = "arrow";
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Arrow).call(this, element));

    _align.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _this.parent = null;
    _this.target = null;

    _classPrivateFieldSet(_assertThisInitialized(_this), _align, align);

    _this.element.dataset.placement = placement;
    return _this;
  }

  _createClass(Arrow, [{
    key: "setPlacement",

    /**
     * Sets the placement and align of the arrow.  Can take a string of placement-align separated by a dash.
     *
     * @param placementString
     */
    value: function setPlacement(placementString) {
      var _placementString$spli = placementString.split("-"),
          _placementString$spli2 = _slicedToArray(_placementString$spli, 2),
          placement = _placementString$spli2[0],
          align = _placementString$spli2[1];

      this.placement = placement;
      this.align = align || "center";
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.element.dataset.direction = this.direction;
      this.element.style.left = "";
      this.element.style.right = "";
      this.element.style.top = "";
      this.element.style.bottom = "";
      var parentRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"](this.parent || this.element.offsetParent),
          targetRect = this.target ? new _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"](this.target) : null,
          pos = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"](this.element);

      if (this.placement === "top") {
        if (this.align === "start") {
          pos = pos.position({
            my: "left bottom",
            at: "left top",
            of: parentRect
          });
        } else if (this.align === "end") {
          pos = pos.position({
            my: "right bottom",
            at: "right top",
            of: parentRect
          });
        } else {
          pos = pos.position({
            my: "bottom",
            at: "top",
            of: parentRect
          });
        }

        if (targetRect) pos = pos.fitX(targetRect);
        pos = pos.fitX(parentRect);
      } else if (this.placement === "right") {
        if (this.align === "start") {
          pos = pos.position({
            my: "left top",
            at: "right top",
            of: parentRect
          });
        } else if (this.align === "end") {
          pos = pos.position({
            my: "left bottom",
            at: "right bottom",
            of: parentRect
          });
        } else {
          pos = pos.position({
            my: "left",
            at: "right",
            of: parentRect
          });
        }

        if (targetRect) pos = pos.fitY(targetRect);
        pos = pos.fitY(parentRect);
      } else if (this.placement === "bottom") {
        if (this.align === "start") {
          pos = pos.position({
            my: "left top",
            at: "left bottom",
            of: parentRect
          });
        } else if (this.align === "end") {
          pos = pos.position({
            my: "right top",
            at: "right bottom",
            of: parentRect
          });
        } else {
          pos = pos.position({
            my: "top",
            at: "bottom",
            of: parentRect
          });
        }

        if (targetRect) pos = pos.fitX(targetRect);
        pos = pos.fitX(parentRect);
      } else if (this.placement === "left") {
        if (this.align === "start") {
          pos = pos.position({
            my: "right top",
            at: "left top",
            of: parentRect
          });
        } else if (this.align === "end") {
          pos = pos.position({
            my: "right bottom",
            at: "left bottom",
            of: parentRect
          });
        } else {
          pos = pos.position({
            my: "right",
            at: "left",
            of: parentRect
          });
        }

        if (targetRect) pos = pos.fitY(targetRect);
        pos = pos.fitY(parentRect);
      }

      Object(_position__WEBPACK_IMPORTED_MODULE_2__["setElementClientPosition"])(this.element, pos);
    }
  }, {
    key: "align",
    set: function set(value) {
      _classPrivateFieldSet(this, _align, value);

      this.render();
    },
    get: function get() {
      return _classPrivateFieldGet(this, _align);
    }
  }, {
    key: "placement",
    set: function set(value) {
      this.element.dataset.placement = value;
      this.render();
    },
    get: function get() {
      return this.element.dataset.placement;
    }
  }]);

  return Arrow;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _align = new WeakMap();



/***/ }),

/***/ "./tests/src/test_overlay2.js":
/*!************************************!*\
  !*** ./tests/src/test_overlay2.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OverlayTestPage; });
/* harmony import */ var _src_core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/core/ui/Draggable */ "./src/core/ui/Draggable.js");
/* harmony import */ var _src_core_ui_Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/core/ui/Overlay */ "./src/core/ui/Overlay.js");
/* harmony import */ var _src_core_ui_Arrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/core/ui/Arrow */ "./src/core/ui/Arrow.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var OverlayTestPage =
/*#__PURE__*/
function () {
  function OverlayTestPage() {
    _classCallCheck(this, OverlayTestPage);

    _defineProperty(this, "draggable", void 0);

    _defineProperty(this, "overlay", void 0);
  }

  _createClass(OverlayTestPage, [{
    key: "load",
    value: function load() {
      var _this = this;

      this.draggable = new _src_core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]('#draggable');
      this.overlay = new _src_core_ui_Overlay__WEBPACK_IMPORTED_MODULE_1__["default"]('#overlay1');
      this.arrow = new _src_core_ui_Arrow__WEBPACK_IMPORTED_MODULE_2__["default"](); // this.overlay.fit = 'xy';

      this.arrow.parent = this.overlay.element.querySelector('.overlay-body');
      this.arrow.target = this.draggable.element;
      this.overlay.setArrow(this.arrow);
      this.overlay.target = document.querySelector('#draggable');
      this.overlay.container = document.querySelector('#container');
      this.overlay.addPlacement('top', {
        my: "bottom",
        at: "top",
        of: "border-top",
        arrow: "bottom"
      });
      this.overlay.addPlacement('right', {
        my: "left",
        at: "right",
        of: "border-right",
        arrow: "left"
      });
      this.overlay.addPlacement('bottom', {
        my: "top",
        at: "bottom",
        of: "border-bottom",
        arrow: "top"
      });
      this.overlay.addPlacement("left", {
        my: "right",
        at: "left",
        of: "border-left",
        arrow: "right"
      });
      this.draggable.on('draggable.move', function (data) {
        _this.overlay.position();
      });
      this.overlay.position();
    }
  }]);

  return OverlayTestPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-10.bundle.js.map