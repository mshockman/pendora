(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[6],{

/***/ "./src/core/fx/effects.js":
/*!********************************!*\
  !*** ./src/core/fx/effects.js ***!
  \********************************/
/*! exports provided: SlideIn, SlideOut, SlideInY, SlideOutY, SlideInX, SlideOutX, IOAnimationBase, SlideInAndOut, FadeIn, FadeOut, FadeInAndOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideIn", function() { return SlideIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideOut", function() { return SlideOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideInY", function() { return SlideInY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideOutY", function() { return SlideOutY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideInX", function() { return SlideInX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideOutX", function() { return SlideOutX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IOAnimationBase", function() { return IOAnimationBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideInAndOut", function() { return SlideInAndOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeIn", function() { return FadeIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeOut", function() { return FadeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeInAndOut", function() { return FadeInAndOut; });
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Animation */ "./src/core/fx/Animation.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }




var fullRectSymbol = Symbol('FullRect'),
    startingRectSymbol = Symbol("StartingRect"),
    fxSymbol = Symbol('fx');
var SlideIn =
/*#__PURE__*/
function (_Animation) {
  _inherits(SlideIn, _Animation);

  function SlideIn(duration, axis) {
    var _this;

    _classCallCheck(this, SlideIn);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlideIn).call(this, {
      duration: duration,
      frames: {
        '0%': {
          size: 0
        },
        '100%': {
          size: 1
        }
      },
      applyFrame: function applyFrame(fx, frame) {
        var element = fx.element,
            axis = _this.getAxis(element),
            rect = fx[fullRectSymbol];

        if (axis === 'x') {
          element.style.maxHeight = "";
          element.style.maxWidth = "".concat(rect.width * frame.size, "px");
        } else if (axis === 'y') {
          element.style.maxWidth = "";
          element.style.maxHeight = "".concat(rect.height * frame.size, "px");
        } else {
          element.style.maxWidth = "".concat(rect.width * frame.size, "px");
          element.style.maxHeight = "".concat(rect.height * frame.size, "px");
        }
      }
    }));

    _axis.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _axis, axis);

    return _this;
  }

  _createClass(SlideIn, [{
    key: "init",
    value: function init(_ref) {
      var element = _ref.element,
          duration = _ref.duration,
          frames = _ref.frames,
          _ref$onComplete = _ref.onComplete,
          _onComplete = _ref$onComplete === void 0 ? null : _ref$onComplete,
          options = _objectWithoutProperties(_ref, ["element", "duration", "frames", "onComplete"]);

      var axis = this.getAxis(element),
          rect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"].getBoundingClientRect(element),
          fullRect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"].getCleanBoundingClientRect(element),
          complete;

      if (axis === 'x') {
        complete = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(rect.width / fullRect.width, 0, 1);
      } else if (axis === 'y') {
        complete = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(rect.height / fullRect.height, 0, 1);
      } else if (axis === 'xy') {
        complete = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(rect.width / fullRect.width, 0, 1);
      }

      var fx = _get(_getPrototypeOf(SlideIn.prototype), "init", this).call(this, _objectSpread({
        element: element,
        frames: frames,
        duration: duration,
        onComplete: function onComplete(fx) {
          // Shouldn't be needed at this point.
          fx.element.style.maxWidth = "";
          fx.element.style.maxHeight = "";

          if (_onComplete) {
            _onComplete(fx);
          }
        }
      }, options));

      fx[fullRectSymbol] = fullRect;
      fx[startingRectSymbol] = rect;
      fx["goto"](complete);
      return fx;
    }
  }, {
    key: "destroy",
    value: function destroy(fx) {}
  }, {
    key: "getAxis",
    value: function getAxis(element) {
      if (typeof _classPrivateFieldGet(this, _axis) === 'function') {
        return _classPrivateFieldGet(this, _axis).call(this, element);
      } else {
        return _classPrivateFieldGet(this, _axis);
      }
    }
  }]);

  return SlideIn;
}(_Animation__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _axis = new WeakMap();

var SlideOut =
/*#__PURE__*/
function (_Animation2) {
  _inherits(SlideOut, _Animation2);

  function SlideOut(duration, axis) {
    var _this2;

    _classCallCheck(this, SlideOut);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SlideOut).call(this, {
      duration: duration,
      frames: {
        '0%': {
          size: 1
        },
        '100%': {
          size: 0
        }
      },
      applyFrame: function applyFrame(fx, frame) {
        var element = fx.element,
            axis = _this2.getAxis(element),
            rect = fx[fullRectSymbol];

        if (axis === 'x') {
          element.style.maxHeight = "";
          element.style.maxWidth = "".concat(rect.width * frame.size, "px");
        } else if (axis === 'y') {
          element.style.maxWidth = "";
          element.style.maxHeight = "".concat(rect.height * frame.size, "px");
        } else {
          element.style.maxWidth = "".concat(rect.width * frame.size, "px");
          element.style.maxHeight = "".concat(rect.height * frame.size, "px");
        }
      }
    }));

    _axis2.set(_assertThisInitialized(_this2), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this2), _axis2, axis);

    return _this2;
  }

  _createClass(SlideOut, [{
    key: "init",
    value: function init(_ref2) {
      var element = _ref2.element,
          duration = _ref2.duration,
          frames = _ref2.frames,
          options = _objectWithoutProperties(_ref2, ["element", "duration", "frames"]);

      var axis = this.getAxis(element),
          rect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"].getBoundingClientRect(element),
          fullRect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"].getCleanBoundingClientRect(element),
          complete;

      if (axis === 'x') {
        complete = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(rect.width / fullRect.width, 0, 1);
      } else if (axis === 'y') {
        complete = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(rect.height / fullRect.height, 0, 1);
      } else if (axis === 'xy') {
        complete = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(rect.width / fullRect.width, 0, 1);
      }

      complete = 1 - complete;

      var fx = _get(_getPrototypeOf(SlideOut.prototype), "init", this).call(this, _objectSpread({
        element: element,
        frames: frames,
        duration: duration
      }, options));

      fx[fullRectSymbol] = fullRect;
      fx[startingRectSymbol] = rect;
      fx["goto"](complete);
      return fx;
    }
  }, {
    key: "destroy",
    value: function destroy(fx) {}
  }, {
    key: "getAxis",
    value: function getAxis(element) {
      if (typeof _classPrivateFieldGet(this, _axis2) === 'function') {
        return _classPrivateFieldGet(this, _axis2).call(this, element);
      } else {
        return _classPrivateFieldGet(this, _axis2);
      }
    }
  }]);

  return SlideOut;
}(_Animation__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _axis2 = new WeakMap();

var SlideInY =
/*#__PURE__*/
function (_SlideIn) {
  _inherits(SlideInY, _SlideIn);

  function SlideInY(duration) {
    _classCallCheck(this, SlideInY);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlideInY).call(this, duration, 'y'));
  }

  return SlideInY;
}(SlideIn);
var SlideOutY =
/*#__PURE__*/
function (_SlideOut) {
  _inherits(SlideOutY, _SlideOut);

  function SlideOutY(duration) {
    _classCallCheck(this, SlideOutY);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlideOutY).call(this, duration, 'y'));
  }

  return SlideOutY;
}(SlideOut);
var SlideInX =
/*#__PURE__*/
function (_SlideIn2) {
  _inherits(SlideInX, _SlideIn2);

  function SlideInX(duration) {
    _classCallCheck(this, SlideInX);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlideInX).call(this, duration, 'x'));
  }

  return SlideInX;
}(SlideIn);
var SlideOutX =
/*#__PURE__*/
function (_SlideOut2) {
  _inherits(SlideOutX, _SlideOut2);

  function SlideOutX(duration) {
    _classCallCheck(this, SlideOutX);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlideOutX).call(this, duration, 'x'));
  }

  return SlideOutX;
}(SlideOut);
var IOAnimationBase =
/*#__PURE__*/
function () {
  function IOAnimationBase(showFX, hideFX) {
    _classCallCheck(this, IOAnimationBase);

    _showFX.set(this, {
      writable: true,
      value: void 0
    });

    _hideFX.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _showFX, showFX);

    _classPrivateFieldSet(this, _hideFX, hideFX);
  }

  _createClass(IOAnimationBase, [{
    key: "show",
    value: function () {
      var _show = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(element) {
        var immediate,
            options,
            fx,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                immediate = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

                if (!this.hasFX(element)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this.cancel(element);

              case 5:
                options = _objectSpread({}, options);

                if (!immediate) {
                  _context.next = 12;
                  break;
                }

                _context.next = 9;
                return _classPrivateFieldGet(this, _showFX).animate(element, _objectSpread({}, options, {
                  autoPlay: false,
                  position: 1
                }));

              case 9:
                return _context.abrupt("return", _Animation__WEBPACK_IMPORTED_MODULE_0__["default"].complete);

              case 12:
                fx = _classPrivateFieldGet(this, _showFX).animate(element, _objectSpread({}, options, {
                  autoPlay: true
                }));
                element[fxSymbol] = fx;
                _context.next = 16;
                return fx;

              case 16:
                result = _context.sent;
                delete element[fxSymbol];
                return _context.abrupt("return", result);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function show(_x) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: "hide",
    value: function () {
      var _hide = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(element) {
        var immediate,
            options,
            fx,
            result,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                immediate = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};

                if (!this.hasFX(element)) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 5;
                return this.cancel(element);

              case 5:
                if (!immediate) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 8;
                return _classPrivateFieldGet(this, _hideFX).animate(element, _objectSpread({}, options, {
                  autoPlay: false,
                  position: 1
                }));

              case 8:
                return _context2.abrupt("return", _Animation__WEBPACK_IMPORTED_MODULE_0__["default"].complete);

              case 11:
                fx = _classPrivateFieldGet(this, _hideFX).animate(element, _objectSpread({}, options, {
                  autoPlay: true
                }));
                element[fxSymbol] = fx;
                _context2.next = 15;
                return fx;

              case 15:
                result = _context2.sent;
                delete element[fxSymbol];
                return _context2.abrupt("return", result);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hide(_x2) {
        return _hide.apply(this, arguments);
      }

      return hide;
    }()
  }, {
    key: "cancel",
    value: function cancel(element) {
      if (element[fxSymbol]) {
        element[fxSymbol].cancel();
        delete element[fxSymbol];
      }
    }
  }, {
    key: "hasFX",
    value: function hasFX(element) {
      return !!element[fxSymbol];
    }
  }]);

  return IOAnimationBase;
}();
/**
 * Will slide an element in and out by the given axis.
 */

var _showFX = new WeakMap();

var _hideFX = new WeakMap();

var SlideInAndOut =
/*#__PURE__*/
function (_IOAnimationBase) {
  _inherits(SlideInAndOut, _IOAnimationBase);

  function SlideInAndOut(duration, axis) {
    _classCallCheck(this, SlideInAndOut);

    var showFX = new SlideIn(duration, axis),
        hideFX = new SlideOut(duration, axis);
    return _possibleConstructorReturn(this, _getPrototypeOf(SlideInAndOut).call(this, showFX, hideFX));
  }

  return SlideInAndOut;
}(IOAnimationBase);
var FadeIn =
/*#__PURE__*/
function (_Animation3) {
  _inherits(FadeIn, _Animation3);

  function FadeIn(duration) {
    _classCallCheck(this, FadeIn);

    return _possibleConstructorReturn(this, _getPrototypeOf(FadeIn).call(this, {
      duration: duration,
      frames: {
        '0%': {
          opacity: 0
        },
        '100%': {
          opacity: 1
        }
      }
    }));
  }

  _createClass(FadeIn, [{
    key: "init",
    value: function init(_ref3) {
      var element = _ref3.element,
          options = _objectWithoutProperties(_ref3, ["element"]);

      var style = getComputedStyle(element),
          complete = parseFloat(style.opacity);

      var fx = _get(_getPrototypeOf(FadeIn.prototype), "init", this).call(this, _objectSpread({
        element: element
      }, options));

      fx["goto"](complete);
      return fx;
    }
  }, {
    key: "destroy",
    value: function destroy(fx) {}
  }]);

  return FadeIn;
}(_Animation__WEBPACK_IMPORTED_MODULE_0__["default"]);
var FadeOut =
/*#__PURE__*/
function (_Animation4) {
  _inherits(FadeOut, _Animation4);

  function FadeOut(duration) {
    _classCallCheck(this, FadeOut);

    return _possibleConstructorReturn(this, _getPrototypeOf(FadeOut).call(this, {
      duration: duration,
      frames: {
        '0%': {
          opacity: 1
        },
        '100%': {
          opacity: 0
        }
      }
    }));
  }

  _createClass(FadeOut, [{
    key: "init",
    value: function init(_ref4) {
      var element = _ref4.element,
          options = _objectWithoutProperties(_ref4, ["element"]);

      var style = getComputedStyle(element),
          complete = parseFloat(style.opacity);

      var fx = _get(_getPrototypeOf(FadeOut.prototype), "init", this).call(this, _objectSpread({
        element: element
      }, options));

      complete = 1 - complete;
      fx["goto"](complete);
      return fx;
    }
  }, {
    key: "destroy",
    value: function destroy(fx) {}
  }]);

  return FadeOut;
}(_Animation__WEBPACK_IMPORTED_MODULE_0__["default"]);
var FadeInAndOut =
/*#__PURE__*/
function (_IOAnimationBase2) {
  _inherits(FadeInAndOut, _IOAnimationBase2);

  function FadeInAndOut(duration) {
    _classCallCheck(this, FadeInAndOut);

    return _possibleConstructorReturn(this, _getPrototypeOf(FadeInAndOut).call(this, new FadeIn(duration), new FadeOut(duration)));
  }

  return FadeInAndOut;
}(IOAnimationBase);

/***/ })

}]);
//# sourceMappingURL=chunk-6.bundle.js.map