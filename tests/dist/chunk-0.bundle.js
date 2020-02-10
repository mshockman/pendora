(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[0],{

/***/ "./src/core/errors.js":
/*!****************************!*\
  !*** ./src/core/errors.js ***!
  \****************************/
/*! exports provided: ExtendableError, IndexError, KeyError, ValueError, NotImplemented, ValidationError, AssertionError, UnitError, assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtendableError", function() { return ExtendableError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexError", function() { return IndexError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyError", function() { return KeyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueError", function() { return ValueError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotImplemented", function() { return NotImplemented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return ValidationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssertionError", function() { return AssertionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitError", function() { return UnitError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ExtendableError =
/*#__PURE__*/
function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    var _this;

    _classCallCheck(this, ExtendableError);

    // noinspection JSCheckFunctionSignatures
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExtendableError).call(this, message));
    _this.name = _this.constructor.name; // noinspection JSUnresolvedVariable

    if (typeof Error.captureStackTrace === 'function') {
      // noinspection JSUnresolvedFunction
      Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }

    return _this;
  }

  return ExtendableError;
}(_wrapNativeSuper(Error));
var IndexError =
/*#__PURE__*/
function (_ExtendableError) {
  _inherits(IndexError, _ExtendableError);

  function IndexError() {
    _classCallCheck(this, IndexError);

    return _possibleConstructorReturn(this, _getPrototypeOf(IndexError).apply(this, arguments));
  }

  return IndexError;
}(ExtendableError);
var KeyError =
/*#__PURE__*/
function (_ExtendableError2) {
  _inherits(KeyError, _ExtendableError2);

  function KeyError() {
    _classCallCheck(this, KeyError);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyError).apply(this, arguments));
  }

  return KeyError;
}(ExtendableError);
var ValueError =
/*#__PURE__*/
function (_ExtendableError3) {
  _inherits(ValueError, _ExtendableError3);

  function ValueError() {
    _classCallCheck(this, ValueError);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValueError).apply(this, arguments));
  }

  return ValueError;
}(ExtendableError);
var NotImplemented =
/*#__PURE__*/
function (_ExtendableError4) {
  _inherits(NotImplemented, _ExtendableError4);

  function NotImplemented() {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotImplemented).apply(this, arguments));
  }

  return NotImplemented;
}(ExtendableError);
var ValidationError =
/*#__PURE__*/
function (_ExtendableError5) {
  _inherits(ValidationError, _ExtendableError5);

  function ValidationError(message, node) {
    var _this2;

    _classCallCheck(this, ValidationError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ValidationError).call(this, message));
    _this2.node = node;
    _this2.children = [];
    return _this2;
  }

  return ValidationError;
}(ExtendableError);
var AssertionError =
/*#__PURE__*/
function (_ExtendableError6) {
  _inherits(AssertionError, _ExtendableError6);

  function AssertionError(message) {
    _classCallCheck(this, AssertionError);

    return _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, message));
  }

  return AssertionError;
}(ExtendableError);
var UnitError =
/*#__PURE__*/
function (_ExtendableError7) {
  _inherits(UnitError, _ExtendableError7);

  function UnitError() {
    _classCallCheck(this, UnitError);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnitError).apply(this, arguments));
  }

  return UnitError;
}(ExtendableError);
/**
 * Asserts that a condition is true or raises an AssertionError.
 * @param condition - condition to check.
 * @param message - message on fail.
 * @throws AssertionError
 */

function assert(condition, message) {
  if (!condition) {
    throw new AssertionError(message);
  }
}

/***/ }),

/***/ "./src/core/vectors/Rect.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Rect.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rect; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vec2 */ "./src/core/vectors/Vec2.js");
/* harmony import */ var _Vec4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vec4 */ "./src/core/vectors/Vec4.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var regWhitespace = /\s+/,
    regPositionPart = /^([a-zA-Z]*)([+-]?\d*\.?\d*)([a-z%]*)$/; // Parses string like "left+10px" into ["left", "+10px"]

var positionShortHandValues = {
  top: 'center top',
  right: 'right middle',
  bottom: 'center bottom',
  left: 'left middle',
  topleft: 'left top',
  topright: 'right top',
  bottomleft: 'left bottom',
  bottomright: 'right bottom'
};

var Rect =
/*#__PURE__*/
function (_Vec) {
  _inherits(Rect, _Vec);

  function Rect(left, top, right, bottom) {
    var _this;

    var domElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Rect);

    if (typeof left === 'function') {
      left = left();
    }

    if (_typeof(left) === 'object') {
      if (left.getBoundingClientRect) {
        domElement = left;
        var bb = domElement.getBoundingClientRect();
        left = bb.left;
        top = bb.top;
        right = bb.right;
        bottom = bb.bottom;
      } else {
        top = left.top;
        right = left.right;
        bottom = left.bottom;
        left = left.left;
      }
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, left, top, right, bottom)); // noinspection JSUnusedGlobalSymbols

    _this.domElement = domElement;

    if (arguments.length === 1 && left instanceof Rect) {
      Object.assign(_assertThisInitialized(_this), left);
    }

    return _this;
  }

  _createClass(Rect, [{
    key: "bind",
    value: function bind(element) {
      return this._new(this.left, this.top, this.right, this.bottom, element);
    }
  }, {
    key: "_new",
    value: function _new(left, top, right, bottom) {
      var domElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var r = new this.constructor(this);
      r.left = left;
      r.top = top;
      r.right = right;
      r.bottom = bottom;
      if (domElement !== undefined) r.domElement = domElement;
      return r;
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](this[0], this[1]);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "getArea",
    value: function getArea() {
      return this.width * this.height;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (Array.isArray(x)) {
        var _x = x;

        var _x2 = _slicedToArray(_x, 2);

        x = _x2[0];
        y = _x2[1];
      } else if (_typeof(x) === 'object') {
        y = x.y;
        x = x.x;
      }

      return this._new(this[0] + x, this[1] + y, this[2] + x, this[3] + y);
    }
  }, {
    key: "addMargins",
    value: function addMargins(_ref) {
      var left = _ref.left,
          top = _ref.top,
          right = _ref.right,
          bottom = _ref.bottom;
      return this._new(this.left - left, this.top - top, this.right + right, this.bottom + bottom);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "addPadding",
    value: function addPadding(_ref2) {
      var left = _ref2.left,
          top = _ref2.top,
          right = _ref2.right,
          bottom = _ref2.bottom;
      return this._new(this.left + left, this.top + top, this.right - right, this.bottom - bottom);
    }
  }, {
    key: "moveTo",
    value: function moveTo(_ref3) {
      var left = _ref3.left,
          top = _ref3.top;
      var deltaX = left - this.left,
          deltaY = top - this.top;
      return this._new(this.left + deltaX, this.top + deltaY, this.right + deltaX, this.bottom + deltaY);
    }
  }, {
    key: "intersection",
    value: function intersection(_ref4) {
      var left = _ref4.left,
          top = _ref4.top,
          right = _ref4.right,
          bottom = _ref4.bottom;
      left = Math.max(this.left, left);
      right = Math.min(this.right, right);
      bottom = Math.min(this.bottom, bottom);
      top = Math.max(this.top, top);

      if (left > right || top > bottom) {
        return null;
      }

      return this._new(left, top, right, bottom);
    }
    /**
     * Creates a new rectangle exactly big enough to hold the current rectangle and the provided rectangle.
     * @param left
     * @param top
     * @param right
     * @param bottom
     * @returns {null|Rect}
     */

  }, {
    key: "union",
    value: function union(_ref5) {
      var left = _ref5.left,
          top = _ref5.top,
          right = _ref5.right,
          bottom = _ref5.bottom;
      left = Math.min(left, this.left);
      right = Math.max(right, this.right);
      bottom = Math.max(bottom, this.bottom);
      top = Math.min(top, this.top);

      if (left > right || top > bottom) {
        return null;
      }

      return this._new(left, top, right, bottom);
    }
  }, {
    key: "contains",
    value: function contains(rect) {
      return this.left <= rect.left && this.right >= rect.right && this.top <= rect.top && this.bottom >= rect.bottom;
    }
  }, {
    key: "containsX",
    value: function containsX(rect) {
      return this.left <= rect.left && this.right >= rect.right;
    }
  }, {
    key: "containsY",
    value: function containsY(rect) {
      return this.top <= rect.top && this.bottom >= rect.bottom;
    }
  }, {
    key: "isXOverlapping",
    value: function isXOverlapping(rect) {
      return rect.left <= this.right && rect.right >= this.left;
    }
  }, {
    key: "isYOverlapping",
    value: function isYOverlapping(rect) {
      return rect.top <= this.bottom && rect.bottom >= this.top;
    }
  }, {
    key: "isAbove",
    value: function isAbove(rect) {
      rect = new Rect(rect);
      return rect.top > this.bottom;
    }
  }, {
    key: "isBelow",
    value: function isBelow(rect) {
      rect = new Rect(rect);
      return rect.bottom < this.top;
    }
  }, {
    key: "isLeftOf",
    value: function isLeftOf(rect) {
      rect = new Rect(rect);
      return rect.left > this.right;
    }
  }, {
    key: "isRightOf",
    value: function isRightOf(rect) {
      rect = new Rect(rect);
      return rect.right < this.left;
    }
  }, {
    key: "isOverlapping",
    value: function isOverlapping(rect) {
      rect = new Rect(rect);
      return this.isXOverlapping(rect) && this.isYOverlapping(rect);
    }
    /**
     * Attempts to fit the rect inside of the container anchoring from the anchor point.  The anchor point defaults
     * to the top left corner or (0, 0).
     *
     * If possible entire rect should be clamped to the closest position inside of the container.
     * Else position anchor point the closest possible point inside container.
     *
     * @param container
     * @param anchor
     */

  }, {
    key: "fit",
    value: function fit(container) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      anchor = anchor ? this.getAnchor(anchor) : new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
      container = new Rect(container);
      var starting = container;
      container = container.add(new Rect(anchor.left, anchor.top, -this.width + anchor.left, -this.height + anchor.top));
      container = new Rect(Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.left, starting.left, starting.right), Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.top, starting.top, starting.bottom), Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.right, starting.left, starting.right), Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.bottom, starting.top, starting.bottom));
      var left = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.left, container.left, container.right) - anchor.left,
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.top, container.top, container.bottom) - anchor.top,
          width = this.width,
          height = this.height;
      return this._new(left, top, left + width, top + height);
    }
  }, {
    key: "fitX",
    value: function fitX(container) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.fit(container, anchor);
      return this._new(pos.left, this.top, pos.right, this.bottom);
    }
  }, {
    key: "fitY",
    value: function fitY(container) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.fit(container, anchor);
      return this._new(this.left, pos.top, this.right, pos.bottom);
    }
    /**
     * Clamps the anchor point inside the rect.  Anchor point defaults to top left or (0, 0).
     *
     * @param rect
     * @param anchor
     * @returns {Rect}
     */

  }, {
    key: "clamp",
    value: function clamp(rect) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      anchor = anchor ? this.getAnchor(anchor) : new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
      rect = new Rect(rect);
      var width = this.width,
          height = this.height,
          left = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.left + anchor.left, rect.left, rect.right) - anchor.left,
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.top + anchor.top, rect.top, rect.bottom) - anchor.top;
      return this._new(left, top, left + width, top + height);
    }
  }, {
    key: "clampX",
    value: function clampX(rect) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.clamp(rect, anchor);
      return this._new(pos.left, this.top, pos.right, this.bottom);
    }
  }, {
    key: "clampY",
    value: function clampY(rect) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.clamp(rect, anchor);
      return this._new(this.left, pos.top, this.right, pos.bottom);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the distance between two rects.
     * @param rect
     * @returns {number}
     */

  }, {
    key: "getDistanceBetween",
    value: function getDistanceBetween(rect) {
      rect = Rect.fromRect(rect);
      var isXOverlapping = this.isXOverlapping(rect),
          isYOverlapping = this.isYOverlapping(rect);

      if (isXOverlapping && isYOverlapping) {
        // Items are overlapping
        return 0;
      } else if (isXOverlapping) {
        return Math.min(Math.abs(this.bottom - rect.top), Math.abs(this.top - rect.bottom));
      } else if (isYOverlapping) {
        return Math.min(Math.abs(this.right - rect.left), Math.abs(this.left - rect.right));
      } else {
        var x1, y1, x2, y2;

        if (this.right <= rect.left) {
          x1 = this.right;
          x2 = rect.left;
        } else {
          x1 = this.left;
          x2 = rect.right;
        }

        if (this.bottom <= rect.top) {
          y1 = this.bottom;
          y2 = rect.top;
        } else {
          y1 = this.top;
          y2 = rect.bottom;
        } // Use distance formula to calculate distance.


        return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "getDistanceFromPoint",
    value: function getDistanceFromPoint(point) {
      point = new Rect(point.left, point.top, point.left, point.top);
      var closestX = Math.abs(this.left - point.left) < Math.abs(this.right - point.left) ? this.left : this.right,
          closestY = Math.abs(this.top - point.top) < Math.abs(this.bottom - point.top) ? this.top : this.bottom,
          distance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["calcDistance"])(closestX, closestY, point.left, point.top);
      return this.contains(point) ? -distance : distance;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "getCenterPoint",
    value: function getCenterPoint() {
      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](this.left + this.width / 2, this.top + this.height / 2);
    }
  }, {
    key: "reflect",
    value: function reflect() {
      var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'xy';
      // Reflect around the given point or origin
      point = point ? new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](point) : new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
      var x = this.left + this.width / 2 - point.x,
          y = this.top + this.height / 2 - point.y;

      if (axis === 'x' || axis === 'xy') {
        x *= -1;
      }

      if (axis === 'y' || axis === 'xy') {
        y *= -1;
      }

      x = x - this.width / 2 + point.x;
      y = y - this.height / 2 + point.y;
      return this._new(x, y, x + this.width, y + this.height);
    }
  }, {
    key: "position",
    value: function position(_ref6) {
      var my = _ref6.my,
          at = _ref6.at,
          of = _ref6.of,
          _ref6$offset = _ref6.offset,
          offset = _ref6$offset === void 0 ? null : _ref6$offset,
          _ref6$inside = _ref6.inside,
          inside = _ref6$inside === void 0 ? null : _ref6$inside,
          _ref6$collision = _ref6.collision,
          collision = _ref6$collision === void 0 ? null : _ref6$collision;

      // Of should be a Rect object.
      if (of.getBoundingClientRect) {
        of = new Rect(of);
      } // inside should be a Rect object.


      if (inside && inside.getBoundingClientRect) {
        inside = new Rect(inside);
      } // collision can be string with a space separating the x and y values.
      // for example "fit flipfit"
      // normalize it to an {x, y} object.


      if (collision && typeof collision === 'string') {
        var parts = collision.trim().split(regWhitespace);
        collision = {
          x: parts[0],
          y: parts[1] || parts[0]
        };
      }

      var anchor = this.evaluatePositionString(my),
          reference = of.evaluatePositionString(at),
          deltaX = reference.x - anchor.x,
          deltaY = reference.y - anchor.y;
      var rect = this.translate(deltaX, deltaY);

      if (offset) {
        rect = this.translate(offset);
      } // If the rect is already inside the container or if not container or collision function where given
      // return immediately, there is not more work to be done.


      if (!collision || !inside || inside.contains(rect)) {
        return rect;
      }

      if (!inside.containsX(rect) && (collision.x === 'flip' || collision.x === 'flipfit')) {
        rect = rect.reflect(of.getCenterPoint(), 'x');
      }

      if (!inside.containsY(rect) && (collision.y === 'flip' || collision.y === 'flipfit')) {
        rect = rect.reflect(of.getCenterPoint(), 'y');
      }

      if (collision.x === 'fit' || collision.x === 'flipfit') {
        rect = rect.fitX(inside);
      }

      if (collision.y === 'fit' || collision.y === 'flipfit') {
        rect = rect.fitY(inside);
      }

      return rect;
    }
  }, {
    key: "evaluatePositionString",
    value: function evaluatePositionString(string) {
      if (positionShortHandValues[string]) {
        string = positionShortHandValues[string];
      }

      var pos = string.trim().split(regWhitespace),
          x = pos[0],
          y = pos[1],
          rx = null,
          ry = null;

      if (x) {
        rx = this._evaluatePositionStringComponent(x, 'x');
      }

      if (y) {
        ry = this._evaluatePositionStringComponent(y, 'y');
      }

      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](rx, ry);
    }
    /**
     * Gets the anchor position relative to the element.  The anchor can be any of the following:
     *
     * A position string.
     * A [x, y, offsetX=0, offsetY=0] array.
     * An object of {left, top, offsetX=0, offsetY=0} properties.
     *
     * @param anchor
     * @returns {Vec2}
     */

  }, {
    key: "getAnchor",
    value: function getAnchor(anchor) {
      if (positionShortHandValues[anchor]) {
        anchor = positionShortHandValues[anchor];
      }

      var x,
          y,
          offsetX = 0,
          offsetY = 0;

      if (typeof anchor === 'string') {
        var _anchor$trim$split = anchor.trim().split(regWhitespace);

        var _anchor$trim$split2 = _slicedToArray(_anchor$trim$split, 2);

        x = _anchor$trim$split2[0];
        y = _anchor$trim$split2[1];
      } else if (Array.isArray(anchor)) {
        var _anchor = anchor;

        var _anchor2 = _slicedToArray(_anchor, 4);

        x = _anchor2[0];
        y = _anchor2[1];
        var _anchor2$ = _anchor2[2];
        offsetX = _anchor2$ === void 0 ? 0 : _anchor2$;
        var _anchor2$2 = _anchor2[3];
        offsetY = _anchor2$2 === void 0 ? 0 : _anchor2$2;
      } else {
        x = anchor.left;
        y = anchor.top;
        offsetX = anchor.offsetX || 0;
        offsetY = anchor.offsetY || 0;
      }

      if (typeof x === 'string') {
        x = this._evaluatePositionStringComponent(x, 'x') - this.left;
      }

      if (typeof y === 'string') {
        y = this._evaluatePositionStringComponent(y, 'y') - this.top;
      }

      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](x + offsetX, y + offsetY);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Takes a anchor point coordient relative the the rect and returns the true coordients.
     * @param anchor
     * @returns {Vec2}
     */

  }, {
    key: "getPoint",
    value: function getPoint(anchor) {
      var point = this.getAnchor(anchor);
      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](point.left + this.left, point.top + this.top);
    }
    /**
     * Evaluates a position string value such as "left+10px" into it final position on the rect.
     * @param value - The value to evaluate.
     * @param direction - The direction type.  Should be either "x" or "y".
     * @returns {number}
     * @private
     */

  }, {
    key: "_evaluatePositionStringComponent",
    value: function _evaluatePositionStringComponent(value, direction) {
      var parts = regPositionPart.exec(value),
          r = 0;

      if (parts[1]) {
        var p = parts[1];

        if (direction === 'x') {
          if (p === 'left') {
            r = this.left;
          } else if (p === 'center' || p === 'middle') {
            r = this.left + this.width / 2;
          } else if (p === 'right') {
            r = this.left + this.width;
          } else {
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValueError"]("Invalid Option: ".concat(p));
          }
        } else {
          if (p === 'top') {
            r = this.top;
          } else if (p === 'middle' || p === 'center') {
            r = this.top + this.height / 2;
          } else if (p === 'bottom') {
            r = this.top + this.height;
          } else {
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValueError"]("Invalid Option: ".concat(p));
          }
        }
      } else if (direction === 'x') {
        r = this.left;
      } else {
        r = this.top;
      }

      if (parts[2]) {
        var _value = parseFloat(parts[2]),
            type = parts[3] || 'px';

        if (type === 'px') {
          r += _value;
        } else if (type === '%') {
          if (direction === 'x') {
            r += _value / 100 * this.width;
          } else {
            r += _value / 100 * this.height;
          }
        } else {
          throw new _errors__WEBPACK_IMPORTED_MODULE_0__["UnitError"]("Invalid unit: Must be either % or px.");
        }
      }

      return r;
    }
  }, {
    key: "left",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "top",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "right",
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this[3];
    },
    set: function set(value) {
      this[3] = value;
    }
  }, {
    key: "width",
    get: function get() {
      return this.right - this.left;
    },
    set: function set(value) {
      this.right = this.left + value;
    }
  }, {
    key: "height",
    get: function get() {
      return this.bottom - this.top;
    },
    set: function set(value) {
      this.bottom = this.top + value;
    }
  }, {
    key: "x",
    get: function get() {
      return this.left;
    },
    set: function set(value) {
      this.left = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this.top;
    },
    set: function set(value) {
      this.top = value;
    }
  }], [{
    key: "fromRect",
    value: function fromRect(_ref7) {
      var left = _ref7.left,
          top = _ref7.top,
          right = _ref7.right,
          bottom = _ref7.bottom;
      return new Rect(left, top, right, bottom);
    }
  }, {
    key: "getBoundingClientRect",
    value: function getBoundingClientRect(element) {
      return new Rect(element);
    }
    /**
     * Returns the elements Rect without any inline styles applied.
     * @param element
     * @param restore - If true inline style will be restored after measuring.
     * @returns {Rect}
     */

  }, {
    key: "getCleanBoundingClientRect",
    value: function getCleanBoundingClientRect(element) {
      var restore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var state = {},
          keys = [];

      for (var i = 0; i < element.style.length; i++) {
        keys.push(element.style[i]);
      }

      for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
        var key = _keys[_i2];
        state[key] = element.style[key];
        element.style[key] = "";
      }

      var r = Rect.getBoundingClientRect(element);

      if (restore) {
        Object.assign(element.style, state);
      }

      return r;
    }
  }, {
    key: "getClientRect",
    value: function getClientRect() {
      return new Rect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, {
    key: "getRootContainingClientRect",
    value: function getRootContainingClientRect() {
      return new Rect(-window.scrollX, -window.scrollY, document.documentElement.clientWidth - window.scrollX, document.documentElement.clientHeight - window.scrollY);
    }
  }]);

  return Rect;
}(_Vec4__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/core/vectors/Vec2.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Vec2.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec2; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Stores a 2 value Vector.
 */

var Vec2 =
/*#__PURE__*/
function () {
  function Vec2() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vec2);

    if (x instanceof Vec2) {
      this[0] = x.x;
      this[1] = x.y;
    } else if (Array.isArray(x)) {
      this[0] = x[0];
      this[1] = x[1];
    } else if (_typeof(x) === 'object') {
      if (x.left !== undefined) {
        this[0] = x.left;
        this[0] = x.top;
      } else {
        this[0] = x.x;
        this[1] = x.y;
      }
    } else {
      this[0] = x;
      this[1] = y;
    }
  }

  _createClass(Vec2, [{
    key: "add",
    value: function add(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] + vec2, this[1] + vec2);
      } else {
        return new Vec2(this[0] + vec2[0], this[1] + vec2[1]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] - vec2, this[1] - vec2);
      } else {
        return new Vec2(this[0] - vec2[0], this[1] - vec2[1]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "scalar",
    value: function scalar(value) {
      return new Vec2(this[0] * value, this[1] * value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "mod",
    value: function mod(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] % vec2, this[1] % vec2);
      } else {
        return new Vec2(this[0] % vec2[0], this[1] % vec2[1]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "equals",
    value: function equals(vec2) {
      return this === vec2 || this[0] === vec2[0] && this[1] === vec2[1];
    }
  }, {
    key: "set",
    value: function set(value) {
      if (_typeof(value) !== 'object') {
        this[0] = value;
        this[1] = value;
      } else {
        this[0] = value[0];
        this[1] = value[1];
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "clone",
    value: function clone() {
      return Vec2(this[0], this[1]);
    }
  }, {
    key: "toTranslate",
    // noinspection JSUnusedGlobalSymbols
    value: function toTranslate() {
      return "translate(".concat(this.x, "px, ").concat(this.y, "px)");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toTranslate3d",
    value: function toTranslate3d() {
      return "translate3d(".concat(this.x, "px, ").concat(this.y, "px, 0)");
    }
  }, {
    key: "clamp",
    value: function clamp(vec4) {
      return new Vec2(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.left, vec4.left, vec4.right), Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.top, vec4.top, vec4.bottom));
    }
  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "left",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "right",
    get: function get() {
      return this[0];
    }
  }, {
    key: "top",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this[1];
    }
  }, {
    key: "width",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }], [{
    key: "fromVertex",
    value: function fromVertex(vertex) {
      if (Array.isArray(vertex)) {
        return new Vec2(vertex[0], vertex[1]);
      } else if (vertex.hasOwnProperty('left')) {
        return new Vec2(vertex.left, vertex.top);
      } else {
        return new Vec2(vertex.x, vertex.y);
      }
    }
  }]);

  return Vec2;
}();



/***/ }),

/***/ "./src/core/vectors/Vec4.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Vec4.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec4; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class to store a 4 value vector.
 * Provides DOMRect interface.
 */
var Vec4 =
/*#__PURE__*/
function () {
  /**
   * r, g, b, a
   * left, top, right, bottom
   *
   * @param left
   * @param top
   * @param right
   * @param bottom
   */
  function Vec4(left, top, right, bottom) {
    _classCallCheck(this, Vec4);

    this[0] = left;
    this[1] = top;
    this[2] = right;
    this[3] = bottom;
  }

  _createClass(Vec4, [{
    key: "set",
    value: function set(valueOrVec4) {
      if (_typeof(valueOrVec4) !== 'object') {
        this[0] = valueOrVec4;
        this[1] = valueOrVec4;
        this[2] = valueOrVec4;
        this[3] = valueOrVec4;
      } else {
        this[0] = valueOrVec4[0];
        this[1] = valueOrVec4[1];
        this[2] = valueOrVec4[2];
        this[3] = valueOrVec4[3];
      }
    }
  }, {
    key: "add",
    value: function add(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] + valueOrVec4, this[1] + valueOrVec4, this[2] + valueOrVec4, this[3] + valueOrVec4);
      } else {
        return this._new(this[0] + valueOrVec4[0], this[1] + valueOrVec4[1], this[2] + valueOrVec4[2], this[3] + valueOrVec4[3]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] - valueOrVec4, this[1] - valueOrVec4, this[2] - valueOrVec4, this[3] - valueOrVec4);
      } else {
        return this._new(this[0] - valueOrVec4[0], this[1] - valueOrVec4[1], this[2] - valueOrVec4[2], this[3] - valueOrVec4[3]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "scalar",
    value: function scalar(value) {
      return this._new(this[0] * value, this[1] * value, this[2] * value, this[3] * value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "equals",
    value: function equals(vec4) {
      return vec4 === this || vec4[0] === this[0] && vec4[1] === this[1] && vec4[2] === this[2] && vec4[3] === this[3];
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "mod",
    value: function mod(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] % valueOrVec4, this[1] % valueOrVec4, this[2] % valueOrVec4, this[3] % valueOrVec4);
      } else {
        return this._new(this[0] % valueOrVec4[0], this[1] % valueOrVec4[1], this[2] % valueOrVec4[2], this[3] % valueOrVec4[3]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toRGBA",
    value: function toRGBA() {
      return "rgba(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ", ").concat(this.a, ")");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this[0], this[1], this[2], this[3]);
    }
  }, {
    key: "_new",
    value: function _new(left, top, right, bottom) {
      return new this.constructor(left, top, right, bottom);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "r",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "g",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "b",
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    }
  }, {
    key: "a",
    get: function get() {
      return this[3];
    },
    set: function set(value) {
      this[3] = value;
    }
  }], [{
    key: "fromRGBAObject",
    value: function fromRGBAObject(_ref) {
      var r = _ref.r,
          g = _ref.g,
          b = _ref.b,
          a = _ref.a;
      return new Vec4(r, g, b, a);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "fromRGBA",
    value: function fromRGBA(value) {
      var m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)$/.exec(value);

      if (!m) {
        throw new Error("Could not parse rgba value ".concat(value));
      }

      return new Vec4(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), parseFloat(m[4]));
    }
  }]);

  return Vec4;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map