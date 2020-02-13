(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pendora"] = factory();
	else
		root["pendora"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/tests/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Publisher.js":
/*!*******************************!*\
  !*** ./src/core/Publisher.js ***!
  \*******************************/
/*! exports provided: STOP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP", function() { return STOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Publisher; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TOPICS = Symbol('topics');
function STOP() {
  throw STOP;
}

var Publisher =
/*#__PURE__*/
function () {
  function Publisher() {
    _classCallCheck(this, Publisher);

    this[TOPICS] = {};
  }

  _createClass(Publisher, [{
    key: "on",
    value: function on(topic, callback) {
      if (!this[TOPICS][topic]) this[TOPICS][topic] = [];
      this[TOPICS][topic].push(callback);
      return this;
    }
  }, {
    key: "once",
    value: function once(topic, fn) {
      var _this = this;

      var on = function on() {
        _this.off(topic, fn);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return fn.apply(_this, args);
      };

      on.fn = fn;
      this.on(topic, fn);
      return this;
    }
  }, {
    key: "off",
    value: function off(topic, callback) {
      if (arguments.length === 0) {
        // CLear all topics.
        this[TOPICS] = {};
        return this;
      } else if (arguments.length === 1) {
        // Clear single topic.
        this[TOPICS][topic] = [];
        return this;
      }

      if (!this[TOPICS] || !this[TOPICS][topic] || !this[TOPICS][topic].length) {
        // Topic list was either empty or didn't exist.  No need to remove anything.  Return;
        return this;
      }

      var callbacks = this[TOPICS][topic];

      for (var i = 0; i < callback.length; i++) {
        var cb = callbacks[i];

        if (cb === callback || cb.fn === callback) {
          callbacks.splice(i, 1);
          break;
        }
      }

      if (callbacks.length === 0) {
        delete this[TOPICS][topic];
      }

      return this;
    }
  }, {
    key: "hasEvent",
    value: function hasEvent(topic, callback) {
      if (arguments.length === 1) {
        return !!this[TOPICS][topic];
      } else {
        var callbacks = this[TOPICS][topic];

        for (var i = 0; i < callbacks.length; i++) {
          var cb = callbacks[i];

          if (cb === callback || cb.fn === callback) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "publish",
    value: function publish(topic) {
      if (this[TOPICS][topic]) {
        var callbacks = this[TOPICS][topic].slice(0);

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cb = _step.value;

            try {
              cb.apply(this, args);
            } catch (e) {
              if (e === STOP) {
                return e;
              } else {
                throw e;
              }
            }
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

      return true;
    }
  }]);

  return Publisher;
}();



/***/ }),

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

/***/ "./src/core/fx/Animation.js":
/*!**********************************!*\
  !*** ./src/core/fx/Animation.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easing */ "./src/core/fx/easing.js");
/* harmony import */ var _FX__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FX */ "./src/core/fx/FX.js");
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./frame */ "./src/core/fx/frame.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Animation =
/*#__PURE__*/
function () {
  /**
   *
   * @param duration
   * @param frames {{}|function(Element element, Animation animation):{}}
   * @param applyFrame - The function that takes a frame and applies it to the element.
   * @param bubbleFrameEvent
   * @param finishFrame
   */
  function Animation(_ref) {
    var _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? null : _ref$duration,
        frames = _ref.frames,
        _ref$applyFrame = _ref.applyFrame,
        applyFrame = _ref$applyFrame === void 0 ? _frame__WEBPACK_IMPORTED_MODULE_2__["defaultApplyFrame"] : _ref$applyFrame,
        _ref$bubbleFrameEvent = _ref.bubbleFrameEvent,
        bubbleFrameEvent = _ref$bubbleFrameEvent === void 0 ? false : _ref$bubbleFrameEvent,
        _ref$finishFrame = _ref.finishFrame,
        finishFrame = _ref$finishFrame === void 0 ? null : _ref$finishFrame;

    _classCallCheck(this, Animation);

    this.frames = frames;
    this.applyFrame = applyFrame || Animation.defaultApplyFrame;
    this.bubbleFrameEvent = bubbleFrameEvent;
    this.finishFrame = finishFrame;
    this.duration = duration;
  }
  /**
   * Creates an fx object.
   *
   * @param element
   * @param frames
   * @param duration
   * @param applyFrame
   * @param easing
   * @param onStart
   * @param onFrame
   * @param onPause
   * @param onCancel
   * @param onEnd
   * @param onComplete
   * @param bubbleFrameEvent
   * @param finishFrame
   * @returns {FX}
   */


  _createClass(Animation, [{
    key: "init",
    value: function init(_ref2) {
      var element = _ref2.element,
          frames = _ref2.frames,
          duration = _ref2.duration,
          applyFrame = _ref2.applyFrame,
          easing = _ref2.easing,
          onStart = _ref2.onStart,
          onFrame = _ref2.onFrame,
          onPause = _ref2.onPause,
          onCancel = _ref2.onCancel,
          onEnd = _ref2.onEnd,
          onComplete = _ref2.onComplete,
          bubbleFrameEvent = _ref2.bubbleFrameEvent,
          finishFrame = _ref2.finishFrame;
      return new _FX__WEBPACK_IMPORTED_MODULE_1__["default"](element, frames, duration, {
        applyFrame: applyFrame,
        easing: easing,
        animation: this,
        onStart: onStart,
        onFrame: onFrame,
        onPause: onPause,
        onCancel: onCancel,
        onEnd: onEnd,
        onComplete: onComplete,
        bubbleFrameEvent: bubbleFrameEvent,
        finishFrame: finishFrame
      });
    }
    /**
     * Ran after the fx completes.
     * @param fx
     */

  }, {
    key: "destroy",
    value: function destroy(fx) {}
    /**
     * Animates the given element.  Returns the FX object that can be used to control the animation.
     *
     * @param element {HTMLElement|Element} The element to animate.
     * @param duration {Number} The duration of the animation in milliseconds.
     * @param easing {function(Number)} An easing function that controls the rate of change for the animation.  If null linear animation is used.
     * @param onStart {function(FX)} A callback function that is called right before the animation starts playing.
     * @param onFrame {function(FX, frame)} A callback that is called per frame.
     * @param onPause {function(FX)} A callback that is called when the FX pauses.
     * @param onCancel {function(FX)} A callback that is called when the FX cancels.
     * @param onEnd {function(FX)} A callback that is called when the animation ends.  Whether by completing, pausing, or canceling.  See Fx.status to determine what happened.
     * @param onComplete {function(FX)} A callback that is called when the animation complete successfully.
     * @param position
     * @param autoPlay
     * @returns {FX}
     */

  }, {
    key: "animate",
    value: function animate(element) {
      var _this = this;

      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$duration = _ref3.duration,
          duration = _ref3$duration === void 0 ? null : _ref3$duration,
          _ref3$easing = _ref3.easing,
          easing = _ref3$easing === void 0 ? _easing__WEBPACK_IMPORTED_MODULE_0__["EASING"].linear : _ref3$easing,
          _ref3$onStart = _ref3.onStart,
          onStart = _ref3$onStart === void 0 ? null : _ref3$onStart,
          _ref3$onFrame = _ref3.onFrame,
          onFrame = _ref3$onFrame === void 0 ? null : _ref3$onFrame,
          _ref3$onPause = _ref3.onPause,
          onPause = _ref3$onPause === void 0 ? null : _ref3$onPause,
          _ref3$onCancel = _ref3.onCancel,
          onCancel = _ref3$onCancel === void 0 ? null : _ref3$onCancel,
          _ref3$onEnd = _ref3.onEnd,
          _onEnd = _ref3$onEnd === void 0 ? null : _ref3$onEnd,
          _ref3$onComplete = _ref3.onComplete,
          onComplete = _ref3$onComplete === void 0 ? null : _ref3$onComplete,
          _ref3$position = _ref3.position,
          position = _ref3$position === void 0 ? 0 : _ref3$position,
          _ref3$autoPlay = _ref3.autoPlay,
          autoPlay = _ref3$autoPlay === void 0 ? true : _ref3$autoPlay;

      if (duration === null) {
        duration = this.duration;
      }

      var fx = this.init({
        element: element,
        frames: this.frames,
        duration: duration,
        applyFrame: this.applyFrame,
        easing: easing,
        animation: this,
        onStart: onStart,
        onFrame: onFrame,
        onPause: onPause,
        onCancel: onCancel,
        onEnd: function onEnd(fx) {
          if (_onEnd) _onEnd.call(fx, fx);

          _this.destroy(fx);
        },
        onComplete: onComplete,
        bubbleFrameEvent: this.bubbleFrameEvent,
        finishFrame: this.finishFrame
      });

      if (position) {
        fx["goto"](position);
      }

      if (autoPlay) {
        fx.play();
      }

      return fx;
    }
  }, {
    key: "goto",
    value: function goto(element, position) {
      this.animate(element, {
        autoPlay: false,
        position: position
      });
      return Animation.complete;
    }
    /**
     * Creates a function that calls the animate method with the bound parameters.
     * Parameters can be overridden in the created function when called.
     * Method has the same signature as the animate method.
     *
     * Usage:
     * let animation = new Animation(...),
     *     fx = animation.bind(null, 2000);
     *
     * fx(element) // Animation the element over 2000 milliseconds.
     *
     * @param element
     * @param config
     * @returns {function(HTMLElement element, Number duration, Object config): FX}
     */

  }, {
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var defaults = {
        element: element,
        config: config
      };
      return function () {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        element = element === defaults ? element.defaults : element;
        var _options = {};
        if (defaults.config) Object.assign(_options, defaults.config);
        if (config) Object.assign(_options, config);
        return _this2.animate(element, _options);
      };
    }
  }]);

  return Animation;
}();

_defineProperty(Animation, "defaultApplyFrame", _frame__WEBPACK_IMPORTED_MODULE_2__["defaultApplyFrame"]);

_defineProperty(Animation, "complete", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].complete);

_defineProperty(Animation, "canceled", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].canceled);

_defineProperty(Animation, "paused", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].paused);

_defineProperty(Animation, "pending", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].pending);

_defineProperty(Animation, "error", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].error);

_defineProperty(Animation, "playing", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].playing);



/***/ }),

/***/ "./src/core/fx/FX.js":
/*!***************************!*\
  !*** ./src/core/fx/FX.js ***!
  \***************************/
/*! exports provided: DeadFXError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeadFXError", function() { return DeadFXError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FX; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vectors */ "./src/core/vectors/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/core/fx/types.js");
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./easing */ "./src/core/fx/easing.js");
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frame */ "./src/core/fx/frame.js");
var _Symbol$toStringTag;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var regNumberWithUnit = /^(\d+\.?\d*)([a-z]+|%)$/i,
    regColor = /^(?:#([a-f0-9]{3})|#([a-f0-9]{6})|#([a-f0-9]{8}))$/i,
    regFunction = /^([a-z_][a-z_0-9]*)\((.+?)\)$/i;
var TYPE_FUNCTIONS = {
  hex: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseHexColorStringArg,
  rgb: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseRGBAColorStringArgs,
  rgba: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseRGBAColorStringArgs
};
var DeadFXError =
/*#__PURE__*/
function (_ExtendableError) {
  _inherits(DeadFXError, _ExtendableError);

  function DeadFXError() {
    _classCallCheck(this, DeadFXError);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeadFXError).apply(this, arguments));
  }

  return DeadFXError;
}(_errors__WEBPACK_IMPORTED_MODULE_0__["ExtendableError"]);

function assertFXAlive(fx) {
  if (fx.status === FX.complete || fx.status === FX.error || fx.status === FX.complete) {
    throw new DeadFXError("FX object is dead.");
  }
}

function doPromiseAction(onAction, value, resolveOrReject) {
  if (typeof onAction === 'function') {
    value = onAction(value);
  }

  resolveOrReject(value);
}

function _prepareValue(value) {
  if (typeof value === 'string') {
    value = value.trim();
    var m = regNumberWithUnit.exec(value);

    if (m) {
      return new _types__WEBPACK_IMPORTED_MODULE_3__["NumberWithUnit"](parseFloat(m[1]), m[2]);
    }

    m = regColor.exec(value);

    if (m) {
      return TYPE_FUNCTIONS.hex(m[0]);
    }

    m = regFunction.exec(value);

    if (m) {
      return TYPE_FUNCTIONS[m[1]](m[2]);
    }
  }

  return value;
}

function _getFrames(fx, element, frames) {
  var r = {};

  if (typeof frames === 'function') {
    frames = frames.call(fx, element, fx);
  }

  for (var keyframeIndex in frames) {
    if (!frames.hasOwnProperty(keyframeIndex)) continue;
    var frame = frames[keyframeIndex];
    r[keyframeIndex] = {};

    for (var property in frame) {
      if (!frame.hasOwnProperty(property)) continue;
      r[keyframeIndex][property] = _prepareValue(frame[property]);
    }
  }

  return r;
}
/**
 * @implements Promise
 */


_Symbol$toStringTag = Symbol.toStringTag;

var FX =
/*#__PURE__*/
function () {
  function FX(element, frames, duration) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$applyFrame = _ref.applyFrame,
        applyFrame = _ref$applyFrame === void 0 ? _frame__WEBPACK_IMPORTED_MODULE_5__["defaultApplyFrame"] : _ref$applyFrame,
        _ref$animation = _ref.animation,
        animation = _ref$animation === void 0 ? null : _ref$animation,
        _ref$easing = _ref.easing,
        easing = _ref$easing === void 0 ? _easing__WEBPACK_IMPORTED_MODULE_4__["EASING"].linear : _ref$easing,
        _ref$onComplete = _ref.onComplete,
        onComplete = _ref$onComplete === void 0 ? null : _ref$onComplete,
        _ref$onCancel = _ref.onCancel,
        onCancel = _ref$onCancel === void 0 ? null : _ref$onCancel,
        _ref$onFrame = _ref.onFrame,
        onFrame = _ref$onFrame === void 0 ? null : _ref$onFrame,
        _ref$onStart = _ref.onStart,
        onStart = _ref$onStart === void 0 ? null : _ref$onStart,
        _ref$onEnd = _ref.onEnd,
        onEnd = _ref$onEnd === void 0 ? null : _ref$onEnd,
        _ref$bubbleFrameEvent = _ref.bubbleFrameEvent,
        bubbleFrameEvent = _ref$bubbleFrameEvent === void 0 ? false : _ref$bubbleFrameEvent,
        _ref$finishFrame = _ref.finishFrame,
        finishFrame = _ref$finishFrame === void 0 ? null : _ref$finishFrame,
        _ref$init = _ref.init,
        init = _ref$init === void 0 ? null : _ref$init;

    _classCallCheck(this, FX);

    _element.set(this, {
      writable: true,
      value: void 0
    });

    _chained.set(this, {
      writable: true,
      value: void 0
    });

    _frames.set(this, {
      writable: true,
      value: void 0
    });

    _internalValue.set(this, {
      writable: true,
      value: void 0
    });

    _animation.set(this, {
      writable: true,
      value: void 0
    });

    _frameId.set(this, {
      writable: true,
      value: void 0
    });

    _status.set(this, {
      writable: true,
      value: void 0
    });

    _position.set(this, {
      writable: true,
      value: void 0
    });

    _finishFrame.set(this, {
      writable: true,
      value: void 0
    });

    _applyFrame.set(this, {
      writable: true,
      value: void 0
    });

    _easing.set(this, {
      writable: true,
      value: void 0
    });

    _duration.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, _Symbol$toStringTag, "[Object FX]");

    _classPrivateFieldSet(this, _frames, []);

    _classPrivateFieldSet(this, _chained, []);

    _classPrivateFieldSet(this, _element, Object(_utility__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(element));

    _classPrivateFieldSet(this, _internalValue, undefined);

    this.onComplete = onComplete;
    this.onCancel = onCancel;
    this.onFrame = onFrame;
    this.onStart = onStart;
    this.onEnd = onEnd;
    this.bubbleFrameEvent = bubbleFrameEvent;

    _classPrivateFieldSet(this, _animation, animation);

    _classPrivateFieldSet(this, _finishFrame, finishFrame);

    _classPrivateFieldSet(this, _applyFrame, applyFrame);

    _classPrivateFieldSet(this, _easing, easing);

    _classPrivateFieldSet(this, _frameId, null);

    _classPrivateFieldSet(this, _status, FX.pending);

    _classPrivateFieldSet(this, _duration, duration);

    _classPrivateFieldSet(this, _position, 0);

    if (init) {
      init.call(this, this);
    } // Prepare frames


    frames = _getFrames(this, _classPrivateFieldGet(this, _element), frames);

    for (var key in frames) {
      if (frames.hasOwnProperty(key)) {
        var frame = frames[key],
            pos = parseFloat(key) / 100;

        if (typeof frame === 'function') {
          frame = frame.call(this, _classPrivateFieldGet(this, _element));
        }

        frame = Object.freeze(Object.assign({}, frame));

        _classPrivateFieldGet(this, _frames).push(Object.freeze({
          position: pos,
          properties: frame
        }));
      }
    }

    _classPrivateFieldGet(this, _frames).sort(function (a, b) {
      return a.position - b.pos;
    });
  }

  _createClass(FX, [{
    key: "getFrameFX",

    /**
     * Returns the frame options at the given position.
     * @param position
     */
    value: function getFrameFX(position) {
      // position can either be a percentage string (aka 50%) or the time in milliseconds into the animation
      // which will be converted into a percentage.
      if (typeof position === 'string') {
        position = parseFloat(position) / 100;
      } // At this point position should be a value between 0.0 and 1.0.
      // Easing functions specify that rate of change in the properties.
      // It takes the position and maps it to another value between 0.0f and 1.0f.
      // By default linear easing is used.


      if (_classPrivateFieldGet(this, _easing)) {
        position = _classPrivateFieldGet(this, _easing).call(this, position);
      }

      var r = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _classPrivateFieldGet(this, _frames)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var frame = _step.value;

          for (var key in frame.properties) {
            if (frame.properties.hasOwnProperty(key)) {
              var value = frame.properties[key];

              if (!r[key]) {
                r[key] = {
                  startPosition: null,
                  startValue: null,
                  endPosition: null,
                  endValue: null
                };
              }

              if (frame.position <= position) {
                r[key].startPosition = frame.position;
                r[key].startValue = value;
              } else if (frame.position > position && r[key].endPosition === null) {
                r[key].endPosition = frame.position;
                r[key].endValue = value;
              }
            }
          }
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

      return r;
    }
    /**
     * Returns the final frame at the given position.  All options at this point should be parsed and there final values
     * should be available.
     *
     * @param position
     */

  }, {
    key: "getFrame",
    value: function getFrame(position) {
      var frame = this.getFrameFX(position),
          r = {};

      if (typeof position === 'string') {
        position = parseFloat(position) / 100;
      } // Takes the frame config options and calculates the final values.


      for (var property in frame) {
        if (frame.hasOwnProperty(property)) {
          var options = frame[property];

          if ((options.endPosition === null || options.endPosition <= position) && options.startValue !== null) {
            r[property] = options.startValue;
          } else if (options.startValue !== null) {
            if (_typeof(options.startValue) === 'object') {
              var p = (position - options.startPosition) / (options.endPosition - options.startPosition),
                  delta = options.endValue.subtract(options.startValue);
              r[property] = options.startValue.add(delta.scalar(p));
            } else if (typeof options.startValue === 'number') {
              var duration = options.endPosition - options.startPosition,
                  _p = (position - options.startPosition) / duration,
                  _delta = options.endValue - options.startValue;

              r[property] = options.startValue + _delta * _p;
            } else {
              r[property] = options.startValue;
            }
          }
        }
      } // User provided hook that can perform the final touch ups on the frame.


      if (_classPrivateFieldGet(this, _finishFrame)) {
        r = _classPrivateFieldGet(this, _finishFrame).call(this, this, frame);
      }

      return r;
    }
  }, {
    key: "play",
    value: function play() {
      var _this = this;

      assertFXAlive(this);

      if (_classPrivateFieldGet(this, _frameId) === null) {
        this["goto"](_classPrivateFieldGet(this, _position));
        var tick = performance.now();

        var frameFN = function frameFN() {
          var timestamp = performance.now(),
              delta = timestamp - tick,
              position = _classPrivateFieldGet(_this, _position) + delta / _this.duration;

          tick = timestamp;

          var frame = _this["goto"](position);

          _classPrivateFieldSet(_this, _status, FX.playing);

          if (_this.onFrame) _this.onFrame.call(_this, _this, frame);

          _classPrivateFieldGet(_this, _element).dispatchEvent(new CustomEvent('animation.frame', {
            bubbles: _this.bubbleFrameEvent,
            detail: _this
          }));

          if (_classPrivateFieldGet(_this, _position) < 1) {
            _classPrivateFieldSet(_this, _frameId, window.requestAnimationFrame(frameFN));
          } else {
            _this._complete(FX.complete, FX.complete);

            _classPrivateFieldSet(_this, _frameId, null);
          }
        };

        if (this.onStart) {
          this.onStart.call(this, this);
        }

        _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.start', {
          bubbles: true,
          detail: this
        }));

        _classPrivateFieldSet(this, _frameId, window.requestAnimationFrame(frameFN));
      }

      return this;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Pauses the animation.  Does not resolve it.
     * @returns {FX}
     */

  }, {
    key: "pause",
    value: function pause() {
      if (_classPrivateFieldGet(this, _frameId)) {
        window.cancelAnimationFrame(_classPrivateFieldGet(this, _frameId));

        _classPrivateFieldSet(this, _frameId, null);

        _classPrivateFieldSet(this, _status, FX.paused);

        _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.paused', {
          bubbles: true,
          detail: this
        }));
      }

      return this;
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      var complete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FX.canceled;

      if (_classPrivateFieldGet(this, _frameId)) {
        window.cancelAnimationFrame(_classPrivateFieldGet(this, _frameId));

        _classPrivateFieldSet(this, _frameId, null);

        if (complete) {
          this["goto"](1);

          this._complete(status, status);
        } else {
          _classPrivateFieldSet(this, _status, status);

          _classPrivateFieldSet(this, _internalValue, status);
        }

        if (this.onCancel) this.onCancel.call(this, this);

        _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.canceled', {
          bubbles: true,
          detail: this
        }));

        this._triggerEndEvent();
      }

      return this;
    }
    /**
     * Cancel the animation with the canceled state.   optionally sets the animation to it's final frame if
     * completeAnimation is true.
     *
     * @param completeAnimation
     * @returns {FX}
     */

  }, {
    key: "cancel",
    value: function cancel() {
      var completeAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._cancel(completeAnimation, FX.canceled);
    }
    /**
     * Completes the animation immediately and sets is status to complete.
     * @returns {FX}
     */

  }, {
    key: "complete",
    value: function complete() {
      return this._cancel(true, FX.complete);
    }
  }, {
    key: "goto",
    value: function goto(position) {
      assertFXAlive(this);

      if (typeof position === 'string') {
        position = parseFloat(position) / 100;
      }

      _classPrivateFieldSet(this, _position, position);

      return this.applyFrame(this.position);
    }
  }, {
    key: "applyFrame",
    value: function applyFrame(position) {
      var frame = this.getFrame(position);

      _classPrivateFieldGet(this, _applyFrame).call(this, this, frame);

      return frame;
    }
  }, {
    key: "_triggerEndEvent",
    value: function _triggerEndEvent() {
      if (this.onEnd) this.onEnd.call(this, this);

      _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.end', {
        bubbles: true,
        detail: this
      }));

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _classPrivateFieldGet(this, _chained)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var onResolve = _step2.value.onResolve;
          if (onResolve) onResolve(_classPrivateFieldGet(this, _internalValue));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      _classPrivateFieldSet(this, _chained, []);
    }
  }, {
    key: "_complete",
    value: function _complete(value) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FX.complete;

      if (this.state !== "Pending") {
        return;
      }

      _classPrivateFieldSet(this, _status, status);

      _classPrivateFieldSet(this, _internalValue, value);

      if (this.onComplete) this.onComplete.call(this, this);

      _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.complete', {
        bubbles: true,
        detail: this
      }));

      this._triggerEndEvent();
    }
  }, {
    key: "then",
    value: function then(_onResolve, _onReject) {
      var _this2 = this;

      if (this.state === "Pending") {
        return new Promise(function (resolve, reject) {
          // noinspection JSUnusedGlobalSymbols
          _classPrivateFieldGet(_this2, _chained).push({
            onResolve: function onResolve(value) {
              doPromiseAction(_onResolve, value, resolve);
            },
            onReject: function onReject(value) {
              doPromiseAction(_onReject, value, reject);
            }
          });
        });
      } else if (this.state === 'Fulfilled' && typeof _onResolve === 'function') {
        return new Promise(function (resolve) {
          doPromiseAction(_onResolve, _classPrivateFieldGet(_this2, _internalValue), resolve);
        });
      } else if (this.state === 'Rejected' && typeof _onReject === 'function') {
        return new Promise(function (resolve, reject) {
          doPromiseAction(_onReject, _classPrivateFieldGet(_this2, _internalValue), reject);
        });
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "finally",
    value: function _finally(_onFinally) {
      _onFinally = function onFinally(value) {
        if (typeof _onFinally === 'function') {
          _onFinally();
        }

        return value;
      };

      return this.then(_onFinally, _onFinally);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "catch",
    value: function _catch(onReject) {
      return this.then(undefined, onReject);
    }
  }, {
    key: "animation",
    get: function get() {
      return _classPrivateFieldGet(this, _animation);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "easing",
    get: function get() {
      return _classPrivateFieldGet(this, _easing);
    }
  }, {
    key: "status",
    get: function get() {
      return _classPrivateFieldGet(this, _status);
    }
  }, {
    key: "position",
    get: function get() {
      return _classPrivateFieldGet(this, _position);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "duration",
    get: function get() {
      return _classPrivateFieldGet(this, _duration);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "frames",
    get: function get() {
      return _classPrivateFieldGet(this, _frames).slice();
    }
  }, {
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _element);
    } // set position(value) {
    //     if (typeof value === 'string') {
    //         value = (parseFloat(value) / 100) * this.#duration;
    //     }
    //
    //     this.#position = Math.max(0.0, Math.min(this.#duration, value));
    // }

  }, {
    key: "state",
    get: function get() {
      if (this.status === FX.complete || this.status === FX.canceled) {
        return "Fulfilled";
      } else if (this.status === FX.error) {
        return "Rejected";
      } else {
        return "Pending";
      }
    }
  }]);

  return FX;
}();

var _element = new WeakMap();

var _chained = new WeakMap();

var _frames = new WeakMap();

var _internalValue = new WeakMap();

var _animation = new WeakMap();

var _frameId = new WeakMap();

var _status = new WeakMap();

var _position = new WeakMap();

var _finishFrame = new WeakMap();

var _applyFrame = new WeakMap();

var _easing = new WeakMap();

var _duration = new WeakMap();

_defineProperty(FX, "pending", "Pending");

_defineProperty(FX, "complete", "Complete");

_defineProperty(FX, "error", "Error");

_defineProperty(FX, "paused", "Paused");

_defineProperty(FX, "canceled", "Canceled");

_defineProperty(FX, "playing", "Playing");



/***/ }),

/***/ "./src/core/fx/easing.js":
/*!*******************************!*\
  !*** ./src/core/fx/easing.js ***!
  \*******************************/
/*! exports provided: linear, EASING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EASING", function() { return EASING; });
/**
 *
 * @param p
 * @returns {*}
 */
function linear(p) {
  return p;
} // noinspection JSUnusedGlobalSymbols

var EASING = {
  linear: linear
};

/***/ }),

/***/ "./src/core/fx/frame.js":
/*!******************************!*\
  !*** ./src/core/fx/frame.js ***!
  \******************************/
/*! exports provided: defaultApplyFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultApplyFrame", function() { return defaultApplyFrame; });
function defaultApplyFrame(fx, frame) {
  for (var key in frame) {
    if (frame.hasOwnProperty(key)) {
      fx.element.style[key] = frame[key].toString();
    }
  }
}

/***/ }),

/***/ "./src/core/fx/types.js":
/*!******************************!*\
  !*** ./src/core/fx/types.js ***!
  \******************************/
/*! exports provided: NumberWithUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberWithUnit", function() { return NumberWithUnit; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NumberWithUnit =
/*#__PURE__*/
function () {
  function NumberWithUnit(value, unit) {
    _classCallCheck(this, NumberWithUnit);

    this.value = value;
    this.unit = unit;
  }

  _createClass(NumberWithUnit, [{
    key: "add",
    value: function add(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value + value, this.unit);
    }
  }, {
    key: "subtract",
    value: function subtract(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value - value, this.unit);
    }
  }, {
    key: "scalar",
    value: function scalar(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value * value, this.unit);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "divide",
    value: function divide(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value / value, this.unit);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.value).concat(this.unit);
    }
  }]);

  return NumberWithUnit;
}();

/***/ }),

/***/ "./src/core/ui/Draggable.js":
/*!**********************************!*\
  !*** ./src/core/ui/Draggable.js ***!
  \**********************************/
/*! exports provided: cursor, default, ScrollArea, clone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollArea", function() { return ScrollArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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







var reg_percentage_test = /\s*\d+\.?\d*%\s*/;
/**
 * Returns the offset position of the mouse relative to the target.
 *
 * @param target
 * @param event
 * @returns {{x: number, y: number}}
 */

function cursor(target, event) {
  var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function buildTestIntersectionFunction(amount) {
  return function (element, rect) {
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](rect);
    var targetRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element),
        intersection = targetRect.intersection(rect),
        p = intersection ? intersection.getArea() / rect.getArea() : 0;

    if (amount === 0) {
      return p > 0;
    } else {
      return p >= amount;
    }
  };
}

var Draggable =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Draggable, _Publisher);

  function Draggable(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$axis = _ref.axis,
        axis = _ref$axis === void 0 ? 'xy' : _ref$axis,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? 'input, button, .ui-resizeable-handle, .no-drag' : _ref$exclude,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 0 : _ref$delay,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? cursor : _ref$offset,
        _ref$resistance = _ref.resistance,
        resistance = _ref$resistance === void 0 ? 0 : _ref$resistance,
        _ref$handle = _ref.handle,
        handle = _ref$handle === void 0 ? null : _ref$handle,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$revert = _ref.revert,
        revert = _ref$revert === void 0 ? false : _ref$revert,
        _ref$revertDuration = _ref.revertDuration,
        revertDuration = _ref$revertDuration === void 0 ? 0 : _ref$revertDuration,
        _ref$scrollSpeed = _ref.scrollSpeed,
        scrollSpeed = _ref$scrollSpeed === void 0 ? 0 : _ref$scrollSpeed,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? null : _ref$selector,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 0.5 : _ref$tolerance,
        _ref$setHelperSize = _ref.setHelperSize,
        setHelperSize = _ref$setHelperSize === void 0 ? false : _ref$setHelperSize,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Draggable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Draggable).call(this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _droppables.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _boundOnMouseDown.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _itemCache.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    if (typeof element === 'string') {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, document.querySelector(element));
    } else {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, element);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _droppables, []);

    _classPrivateFieldSet(_assertThisInitialized(_this), _itemCache, new WeakMap());

    _this.container = container;
    _this.axis = axis;
    _this.exclude = exclude;
    _this.delay = delay;
    _this.offset = offset;
    _this.resistance = resistance;
    _this.handle = handle;
    _this.helper = helper;
    _this.revert = revert;
    _this.revertDuration = revertDuration;
    _this.scrollSpeed = scrollSpeed;
    _this.selector = selector;
    _this.tolerance = tolerance;
    _this.setHelperSize = setHelperSize;
    _this.grid = grid;

    if (typeof _this.container === 'string') {
      _this.container = document.querySelector(_this.container);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _boundOnMouseDown, function (event) {
      return _this.onMouseDown(event);
    });

    _this.element.addEventListener('mousedown', _classPrivateFieldGet(_assertThisInitialized(_this), _boundOnMouseDown));

    return _this;
  }
  /**
   * Starts dragging if the correct elements have been targeted and delay and resistance have been meet.
   *
   * @param event
   * @returns {Promise<void>}
   */


  _createClass(Draggable, [{
    key: "onMouseDown",
    value: function () {
      var _onMouseDown = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(event) {
        var _this2 = this;

        var startPosition, currentPosition, target, cancelMouseTracking, cancelTimer, distanceBrokenPromise, timerPromise, offset, handle, exclude, onMouseUp, _ref2, _ref3, timerStatus, distanceStatus;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                startPosition = {
                  x: event.clientX + window.pageXOffset,
                  y: event.clientY + window.pageYOffset
                }, currentPosition = {
                  x: startPosition.x,
                  y: startPosition.y
                }, target = _classPrivateFieldGet(this, _element), cancelMouseTracking = null, cancelTimer = null; // Only start dragging if a draggable child of the element is targeted.
                // If selector is null then the entire element is draggable and should be the target.

                if (!this.selector) {
                  _context.next = 5;
                  break;
                }

                target = event.target.closest(this.selector);

                if (!(!target || !_classPrivateFieldGet(this, _element).contains(target))) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                if (!this.handle) {
                  _context.next = 9;
                  break;
                }

                handle = event.target.closest(this.handle);

                if (!(!handle || !target.contains(handle))) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                if (!this.exclude) {
                  _context.next = 13;
                  break;
                }

                exclude = event.target.closest(this.exclude);

                if (!(exclude && target.contains(exclude))) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return");

              case 13:
                // Find the offset of the event.
                if (typeof this.offset === 'function') {
                  offset = this.offset(target, event);
                } else if (Array.isArray(this.offset)) {
                  offset = {
                    x: this.offset[0],
                    y: this.offset[1]
                  };
                } else if (_typeof(this.offset) === 'object') {
                  offset = {
                    x: this.offset.x,
                    y: this.offset.y
                  };
                } else {
                  offset = {
                    x: 0,
                    y: 0
                  };
                } // Prevent default browser actions.


                event.preventDefault(); // At this point we can be sure that a draggable item was
                // targeted by it's handle and no excluded items where clicked.
                // Creates a promise that both tracks the current mouse coords and resolve
                // when the user passes the given resistance.

                distanceBrokenPromise = new Promise(function (resolve) {
                  var isDistanceBroken = _this2.resistance <= 0;

                  if (isDistanceBroken) {
                    resolve('complete');
                  }

                  var onMouseMove = function onMouseMove(event) {
                    currentPosition.x = event.clientX + window.pageXOffset;
                    currentPosition.y = event.clientY + window.pageYOffset;
                    event.preventDefault();

                    if (!isDistanceBroken && Object(_utility__WEBPACK_IMPORTED_MODULE_1__["calcDistance"])(currentPosition.x, currentPosition.y, startPosition.x, startPosition.y) > _this2.resistance) {
                      resolve('complete');
                      isDistanceBroken = true;
                    }
                  }; // Cancel mouse tracking and resolve the promise to canceled if hasn't already been resolve.
                  // This function must be called or their will be a memory leak before onMouseDown completes.


                  cancelMouseTracking = function cancelMouseTracking() {
                    if (onMouseMove) {
                      document.removeEventListener('mousemove', onMouseMove);

                      if (!isDistanceBroken) {
                        resolve('canceled');
                      }

                      onMouseMove = null;
                    }
                  };

                  document.addEventListener('mousemove', onMouseMove);
                }); // Creates a promise that resolve when after the delay time passes or the user cancels the drag by
                // releasing the mouse button.

                timerPromise = new Promise(function (resolve) {
                  var timer = null;

                  if (_this2.delay >= 0) {
                    timer = setTimeout(function () {
                      resolve("complete");
                      timer = null;
                    }, _this2.delay);
                  } else {
                    resolve('complete');
                  } // cancel the timer and resolve it to canceled if it is still active.


                  cancelTimer = function cancelTimer() {
                    if (timer) {
                      clearTimeout(timer);
                      resolve('canceled');
                    }
                  };
                }); // cancel the timer and mouse tracking if they are still active.

                onMouseUp = function onMouseUp(event) {
                  event.preventDefault();
                  cancelTimer();
                  cancelMouseTracking();
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mouseup', onMouseUp); // Wait until the delay time and distance have passed or failed.

                _context.next = 21;
                return Promise.all([timerPromise, distanceBrokenPromise]);

              case 21:
                _ref2 = _context.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                timerStatus = _ref3[0];
                distanceStatus = _ref3[1];
                // Ensure that mouse tracking has been canceled.
                if (cancelMouseTracking) cancelMouseTracking(); // At this point both the timer and distance status should have passed or failed.
                // If either failed do nothing.

                if (timerStatus === 'complete' && distanceStatus === 'complete') {
                  this.startDragging(target, {
                    offsetX: offset.x,
                    offsetY: offset.y,
                    // Make relative to client.
                    startingX: currentPosition.x,
                    startingY: currentPosition.y
                  });
                }

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onMouseDown(_x) {
        return _onMouseDown.apply(this, arguments);
      }

      return onMouseDown;
    }()
  }, {
    key: "startDragging",
    value: function () {
      var _startDragging = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(element, pos) {
        var _this3 = this;

        var cache, mousePosition, target, container, scroller, dropTargets, startPosition, startingClientRect, refreshDropTargets, onMouseMove, onMouseUp, rect;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cache = _classPrivateFieldGet(this, _itemCache).get(element), mousePosition = {
                  x: pos.startingX,
                  y: pos.startingY
                };

                if (!cache) {
                  cache = {
                    isDragging: false,
                    fx: null,
                    rect: null,
                    helper: null,
                    element: element
                  };

                  _classPrivateFieldGet(this, _itemCache).set(element, cache);
                }

                if (!cache.isDragging) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                cache.isDragging = true;

                if (!cache.fx) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 8;
                return cache.fx.cancel();

              case 8:
                cache.fx = null;

              case 9:
                target = element, container = this.container, scroller = null, dropTargets = [], startPosition = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element), startingClientRect = startPosition;
                startPosition = startPosition.translate(window.pageXOffset, window.pageYOffset);

                if (!cache.rect) {
                  cache.rect = startPosition;
                }

                if (typeof container === 'string') {
                  container = document.querySelector(container);
                }

                if (this.helper) {
                  if (typeof this.helper === 'function') {
                    target = this.helper(element);
                  } else {
                    target = this.helper;
                  }

                  if (this.setHelperSize) {
                    target.style.width = startPosition.width + "px";
                    target.style.height = startPosition.height + "px";
                  }

                  target.style.pointerEvents = 'none';

                  if (!target.parentElement && element.parentElement) {
                    element.parentElement.appendChild(target);
                  }

                  target.classList.add('ui-drag-helper');
                  cache.helper = target;
                }

                refreshDropTargets = function refreshDropTargets(rect) {
                  // drag-enter
                  var mouseX = mousePosition.x - window.pageXOffset,
                      mouseY = mousePosition.y - window.pageYOffset,
                      currentDropTargets,
                      detail = {
                    clientX: mouseX,
                    clientY: mouseY
                  };

                  if (rect !== null) {
                    currentDropTargets = _this3.getDropTargets(rect, {
                      mouseX: mouseX,
                      mouseY: mouseY
                    });
                  } else {
                    currentDropTargets = [];
                  }

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = currentDropTargets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var dropTarget = _step.value;

                      if (dropTargets.indexOf(dropTarget) === -1) {
                        dispatchDropEvent(_this3, 'drag.enter', element, target, null, rect, true, true, false, detail, dropTarget);
                      }
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

                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = dropTargets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _dropTarget = _step2.value;

                      if (currentDropTargets.indexOf(_dropTarget) === -1) {
                        dispatchDropEvent(_this3, 'drag.leave', element, target, null, rect, true, true, false, detail, _dropTarget);
                      }
                    } // drag-leave

                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  dropTargets = currentDropTargets;
                };

                onMouseMove = function onMouseMove(event) {
                  event.preventDefault();

                  var rect = _moveElementToPosition(_this3, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, _this3, target, element));

                  mousePosition.x = event.clientX + window.pageXOffset;
                  mousePosition.y = event.clientY + window.pageYOffset;

                  if (_this3.scrollSpeed > 0) {
                    if (scroller) {
                      scroller.cancel();
                      scroller = null;
                    }

                    scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, _this3, event, _this3.scrollSpeed, container);
                  }

                  refreshDropTargets(rect);
                  publishDragMoveEvent(_this3, element, target, event, rect);
                };

                onMouseUp =
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(event) {
                    var accepted, _isDefaultPrevented, reverted, rect, _pos;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            event.preventDefault();
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                            cache.isDragging = false;
                            element.classList.remove('ui-dragging');

                            if (scroller) {
                              scroller.cancel();
                              scroller = null;
                            }

                            accepted = false, _isDefaultPrevented = false, reverted = false, rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
                            publishDragDropEvent(_this3, element, target, event, rect, false, {
                              isDefaultPrevented: function isDefaultPrevented() {
                                return _isDefaultPrevented;
                              },
                              isAccepted: function isAccepted() {
                                return accepted;
                              },
                              accept: function accept() {
                                accepted = true;
                              },
                              preventDefault: function preventDefault() {
                                _isDefaultPrevented = true;
                              }
                            });

                            if (!(_this3.revert && !accepted)) {
                              _context2.next = 22;
                              break;
                            }

                            refreshDropTargets(cache.rect);
                            rect = cache.rect;

                            if (_this3.revertDuration) {
                              _context2.next = 15;
                              break;
                            }

                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            } else {
                              _pos = startPosition.translate(-window.pageXOffset, -window.pageYOffset);
                              Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, _pos, 'translate3d');
                            }

                            _context2.next = 19;
                            break;

                          case 15:
                            cache.fx = _revert(target, cache.rect, _this3.revertDuration);
                            _context2.next = 18;
                            return cache.fx;

                          case 18:
                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            }

                          case 19:
                            reverted = true;
                            _context2.next = 23;
                            break;

                          case 22:
                            if (target !== element) {
                              target.parentElement.removeChild(target);
                              Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(element, rect, 'translate3d');
                            }

                          case 23:
                            _classPrivateFieldGet(_this3, _itemCache)["delete"](element);

                            dispatchDropEvent(_this3, 'drag.end', element, target, event, rect, true, true, true, {
                              accepted: accepted,
                              reverted: reverted
                            }, element);

                          case 25:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function onMouseUp(_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }(); // Set target to starting position.


                if (mousePosition.x !== undefined && mousePosition.y !== undefined) {
                  rect = _moveElementToPosition(this, target, mousePosition.x - window.pageXOffset, mousePosition.y - window.pageYOffset, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
                  refreshDropTargets(rect);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                element.classList.add('ui-dragging');
                dispatchDropEvent(this, 'drag.start', element, target, null, startingClientRect, true, true, true, null);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function startDragging(_x2, _x3) {
        return _startDragging.apply(this, arguments);
      }

      return startDragging;
    }()
  }, {
    key: "getDropTargets",
    value: function getDropTargets(rect, mousePos) {
      var r = [];
      /**
       * @type {number|String|Function|string}
       */

      var testFunction = this.tolerance,
          type = _typeof(testFunction);

      if (type === 'string') {
        // noinspection JSCheckFunctionSignatures
        if (reg_percentage_test.test(testFunction)) {
          // noinspection JSCheckFunctionSignatures
          testFunction = buildTestIntersectionFunction(parseFloat(testFunction) / 100);
        }
      } else if (type === 'number') {
        testFunction = buildTestIntersectionFunction(testFunction);
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _classPrivateFieldGet(this, _droppables)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var droppable = _step3.value;

          if (testFunction(droppable, rect, mousePos, this)) {
            r.push(droppable);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return r;
    }
  }, {
    key: "connect",
    value: function connect(droppables) {
      if (typeof droppables === 'string') {
        droppables = document.querySelectorAll(droppables);
      } else if (typeof droppables.length !== 'number') {
        droppables = [droppables];
      }

      for (var i = 0; i < droppables.length; i++) {
        var item = droppables[i];

        if (_classPrivateFieldGet(this, _droppables).indexOf(item) === -1) {
          _classPrivateFieldGet(this, _droppables).push(item);
        }
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "disconnect",
    value: function disconnect(droppable) {
      if (typeof droppable === 'string') {
        droppable = document.querySelector(droppable);
      }

      var i = _classPrivateFieldGet(this, _droppables).indexOf(droppable);

      if (i !== -1) {
        _classPrivateFieldGet(this, _droppables).splice(i, 1);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "hasDroppable",
    value: function hasDroppable(droppable) {
      if (typeof droppable === 'string') {
        droppable = document.querySelector(droppable);
      }

      return _classPrivateFieldGet(this, _droppables).indexOf(droppable) !== -1;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "droppables",
    get: function get() {
      return _classPrivateFieldGet(this, _droppables).slice(0);
    }
  }, {
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _element);
    }
  }]);

  return Draggable;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _droppables = new WeakMap();

var _boundOnMouseDown = new WeakMap();

var _itemCache = new WeakMap();



function _revert(target, position, revertDuration) {
  var onFrame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var starting = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
  var animation = new _fx_Animation__WEBPACK_IMPORTED_MODULE_4__["default"]({
    frames: {
      '0%': {
        left: starting.left + window.pageXOffset,
        top: starting.top + window.pageYOffset
      },
      '100%': {
        left: position.left,
        top: position.top
      }
    },
    applyFrame: function applyFrame(fx, frame) {
      Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(fx.element, {
        left: frame.left - window.pageXOffset,
        top: frame.top - window.pageYOffset
      }, 'translate3d');
      if (onFrame) onFrame(fx);
    }
  });
  return animation.animate(target, {
    duration: revertDuration
  });
}
/**
 * Takes a client (x, y) position and some offset coords and move the element to the given position.
 *
 * @param self
 * @param element
 * @param x
 * @param y
 * @param offsetX
 * @param offsetY
 * @param container
 * @private
 * @returns {*|Rect}
 */


function _moveElementToPosition(self, element, x, y, offsetX, offsetY, container) {
  var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element),
      startingRect = rect;
  rect = rect.moveTo({
    left: x,
    top: y
  });
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  rect = rect.translate(-offsetX, -offsetY);

  if (self.axis === 'y') {
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](startingRect.left, rect.top, startingRect.right, rect.bottom);
  } else if (self.axis === 'x') {
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](rect.left, startingRect.top, rect.right, startingRect.bottom);
  }

  if (typeof self.grid === 'number' && self.grid) {
    var left = Math.floor(rect.left / self.grid) * self.grid,
        top = Math.floor(rect.top / self.grid) * self.grid;
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](left, top, left + startingRect.width, top + startingRect.height);
  }

  if (container) {
    container = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](container);
    rect = rect.fit(container);
  }

  Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(element, rect, 'translate3d');
  return rect;
} // noinspection JSCommentMatchesSignature

/**
 * For module use only.  Selects the element either by css selector, if it's a string, or resolve a function.
 * If the element is already element is is returned direction.  Returns null if not element is provided.
 *
 * @param element
 * @param dragInstance
 * @param target
 * @returns {null|*}
 * @private
 */


function _selectElementRect(element, dragInstance, target, originalTarget) {
  if (element) {
    var type = _typeof(element);

    if (type === 'function') {
      return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element.call(dragInstance, target, originalTarget, dragInstance));
    } else if (type === 'string') {
      return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](document.querySelector(element));
    }

    return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
  }

  return null;
}
/**
 * Returns the first scrollable parent.
 *
 * @param element
 * @returns {HTMLElement|null}
 * @private
 */


function _getScrollParent(element) {
  var o = element.parentElement;

  while (o) {
    if (o.scrollWidth > o.clientWidth || o.scrollHeight > o.clientHeight) {
      return o;
    }

    o = o.parentElement;
  }

  return null;
}

function _getScrollRect(element) {
  if (element === window || element.nodeName === "HTML") {
    return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0, window.innerWidth, window.innerHeight);
  } else {
    return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
  }
}
/**
 * Helper class that is used to control scrolling when the element is dragged outside of bounds.
 */


var ScrollHelper =
/*#__PURE__*/
function () {
  function ScrollHelper(element) {
    var _this4 = this;

    var scrollXSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scrollYSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var onFrame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, ScrollHelper);

    this.frameID = null;
    this.element = element;
    this.scrollXSpeed = scrollXSpeed;
    this.scrollYSpeed = scrollYSpeed;
    this.onFrame = onFrame;
    this.timestamp = performance.now();

    var frame = function frame(timestamp) {
      var delta = (timestamp - _this4.timestamp) / 1000;
      _this4.timestamp = timestamp;
      _this4.element.scrollLeft += delta * _this4.scrollXSpeed;
      _this4.element.scrollTop += delta * _this4.scrollYSpeed;

      if (_this4.onFrame) {
        _this4.onFrame(_this4);
      }

      _this4.frameID = window.requestAnimationFrame(frame);
    };

    this.frameID = window.requestAnimationFrame(frame);
  }

  _createClass(ScrollHelper, [{
    key: "cancel",
    value: function cancel() {
      if (this.frameID) {
        window.cancelAnimationFrame(this.frameID);
        this.frameID = null;
      }
    }
  }], [{
    key: "getScrollSpeed",
    value: function getScrollSpeed(rect, scrollParentRect) {
      var r = {
        x: 0,
        y: 0
      };

      if (rect.right > scrollParentRect.right) {
        r.x = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.right - scrollParentRect.right) / rect.width, -1, 1);
      } else if (rect.left < scrollParentRect.left) {
        r.x = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.left - scrollParentRect.left) / rect.width, -1, 1);
      }

      if (rect.bottom > scrollParentRect.bottom) {
        r.y = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.bottom - scrollParentRect.bottom) / rect.width, -1, 1);
      } else if (rect.top < scrollParentRect.top) {
        r.y = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.top - scrollParentRect.top) / rect.width, -1, 1);
      }

      return r;
    }
  }, {
    key: "buildScrollHelper",
    value: function buildScrollHelper(element, target, rect, pos, dragInstance, event, scrollSpeed, container) {
      var _this5 = this;

      var scrollParent = _getScrollParent(element);

      if (scrollParent) {
        var scrollParentRect = _getScrollRect(scrollParent),
            speed = ScrollHelper.getScrollSpeed(rect, scrollParentRect);

        if (speed.x || speed.y) {
          return new ScrollHelper(scrollParent, speed.x * scrollSpeed, speed.y * scrollSpeed, function (scroller) {
            var rect = _moveElementToPosition(_this5, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, dragInstance, target, element));

            var scrollRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](scroller.element);
            Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, rect, 'translate3d');

            if (scrollRect.contains(rect)) {
              scroller.cancel();
              scroller = null;
            }
          });
        }
      }
    }
  }]);

  return ScrollHelper;
}();

function ScrollArea(selector) {
  return function () {
    var element = selector;

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element),
        scroll = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["getScroll"])(element);
    rect.left -= scroll.scrollLeft;
    rect.top -= scroll.scrollTop;
    rect.right = rect.left + element.scrollWidth;
    rect.bottom = rect.top + element.scrollHeight;
    return rect;
  };
}
function clone() {
  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var zIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (_typeof(opacity) === 'object' && opacity.nodeType) {
    return opacity.cloneNode(true);
  }

  return function (element) {
    var r = element.cloneNode(true);

    if (opacity !== null) {
      r.style.opacity = opacity;
    }

    if (className) {
      r.className = className;
    }

    r.style.position = "absolute";
    if (zIndex !== null) r.style.zIndex = zIndex;
    return r;
  };
}

function publishDragMoveEvent(self, element, helper, event, rect) {
  var bubbles = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  return dispatchDropEvent(self, 'drag.move', element, helper, event, rect, bubbles, true, true, options);
}

function publishDragDropEvent(self, element, helper, event, rect) {
  var bubbles = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  return dispatchDropEvent(self, 'drag.drop', element, helper, event, rect, bubbles, true, true, options);
}

function dispatchDropEvent(self, name, element, helper, originalEvent, currentRect) {
  var bubbles = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var dispatch = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
  var publish = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var detail = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
  var target = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
  var eventPackage = {
    name: name,
    draggable: self,
    target: helper,
    element: element,
    item: element,
    // alias for element
    helper: helper,
    originalEvent: null,
    rect: currentRect
  };

  if (originalEvent) {
    eventPackage.originalEvent = originalEvent;
    eventPackage.clientX = originalEvent.clientX;
    eventPackage.clientY = originalEvent.clientY;
  }

  if (!target) {
    target = element;
  }

  if (detail) {
    Object.assign(eventPackage, detail);
  }

  if (publish) {
    self.publish(name, eventPackage);
  }

  if (dispatch) {
    var customEvent = new CustomEvent(name, {
      bubbles: bubbles,
      detail: eventPackage
    });
    target.dispatchEvent(customEvent);
  }
}

/***/ }),

/***/ "./src/core/ui/Resizeable.js":
/*!***********************************!*\
  !*** ./src/core/ui/Resizeable.js ***!
  \***********************************/
/*! exports provided: CONTAINERS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINERS", function() { return CONTAINERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Resizeable; });
/* harmony import */ var core_utility_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utility/set */ "./src/core/utility/set.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var _utility_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/math */ "./src/core/utility/math.js");
/* harmony import */ var _utility_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/dom */ "./src/core/utility/dom.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var DIRECTIONS = new Set(['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left']);
var CONTAINERS = {
  /**
   * Constrains to client area.
   * @returns {{top: number, left: number, width: number, height: number}}
   */
  client: function client() {
    return {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      height: window.innerHeight,
      width: window.innerWidth
    };
  },

  /**
   * Constrains to viewport.
   * @param element
   * @returns {{top: number, left: number, width: number, height: number}}
   */
  viewport: function viewport(element) {
    var parent = _getScrollParent(element),
        bb = parent.getBoundingClientRect();

    return {
      left: bb.left - parent.scrollLeft,
      top: bb.top - parent.scrollTop,
      width: parent.scrollWidth,
      height: parent.scrollHeight,
      right: bb.left - parent.scrollLeft + parent.scrollWidth,
      bottom: bb.top - parent.scrollTop + parent.scrollHeight
    };
  }
};
/**
 * Behavior class that makes an element resizeable.
 */

var Resizeable =
/*#__PURE__*/
function () {
  function Resizeable(element) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$handles = _ref.handles,
        handles = _ref$handles === void 0 ? "bottom-right" : _ref$handles,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$minWidth = _ref.minWidth,
        minWidth = _ref$minWidth === void 0 ? null : _ref$minWidth,
        _ref$maxWidth = _ref.maxWidth,
        maxWidth = _ref$maxWidth === void 0 ? null : _ref$maxWidth,
        _ref$minHeight = _ref.minHeight,
        minHeight = _ref$minHeight === void 0 ? null : _ref$minHeight,
        _ref$maxHeight = _ref.maxHeight,
        maxHeight = _ref$maxHeight === void 0 ? null : _ref$maxHeight,
        _ref$keepAspectRatio = _ref.keepAspectRatio,
        keepAspectRatio = _ref$keepAspectRatio === void 0 ? false : _ref$keepAspectRatio,
        _ref$autoHide = _ref.autoHide,
        autoHide = _ref$autoHide === void 0 ? false : _ref$autoHide,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Resizeable);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    this.handles = {};
    this.element.classList.add('ui-resizeable');

    if (handles === 'all') {
      handles = new Set(DIRECTIONS);
    } else {
      handles = new Set(handles.split(/\s+/));
    }

    if (!Object(core_utility_set__WEBPACK_IMPORTED_MODULE_0__["isSuperset"])(DIRECTIONS, handles)) {
      throw new TypeError("Invalid direction.");
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = handles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var direction = _step.value;
        var handle = document.createElement('div');
        handle.classList.add('ui-resizeable-handle');
        handle.classList.add("ui-resizeable-".concat(direction));
        handle.dataset.direction = direction;
        this.handles[direction] = handle;
        this.element.appendChild(handle);
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

    this._onMouseDown = function (event) {
      _this._startResizing(event);
    };

    this.element.addEventListener('mousedown', this._onMouseDown);

    if (typeof grid === 'number') {
      this.grid = {
        x: grid,
        y: grid
      };
    } else if (Array.isArray(grid)) {
      this.grid = {
        x: grid[0],
        y: grid[1]
      };
    } else {
      this.grid = grid;
    }

    this.helper = helper;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.keepAspectRatio = keepAspectRatio;
    this.isResizing = false;
    this.container = container;
  }

  _createClass(Resizeable, [{
    key: "_startResizing",
    value: function _startResizing(event) {
      var _this2 = this;

      if (this.isResizing) return;
      var handle = event.target.closest('.ui-resizeable-handle');
      if (!handle || !this.element.contains(handle)) return;
      var resizeable = handle.closest('.ui-resizeable');
      if (!resizeable || resizeable !== this.element) return;
      event.preventDefault();
      var direction = handle.dataset.direction,
          startPosX = event.clientX + window.scrollX,
          startPosY = event.clientY + window.scrollY,
          doc = document,
          startingClientRect = this.element.getBoundingClientRect(),
          startBox = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["clientRectToDocumentSpace"])(startingClientRect),
          target = this.element,
          rect = {
        left: startBox.left,
        top: startBox.top,
        width: startBox.width,
        height: startBox.height
      };

      if (this.helper) {
        if (typeof this.helper === 'function') {
          target = this.helper.call(this, this.element);
        } else {
          target = document.createElement('div');
          Object(_utility_dom__WEBPACK_IMPORTED_MODULE_3__["addClasses"])(target, this.helper);
        }

        target.classList.add('ui-resizeable-helper');
        target.style.width = startBox.width + 'px';
        target.style.height = startBox.height + 'px';
        target.style.boxSizing = getComputedStyle(this.element).boxSizing;
        this.element.parentElement.appendChild(target);
        Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(target, startingClientRect, 'translate3d');
        Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(target, this.element.getBoundingClientRect(), 'translate3d');
      }

      var onMouseMove = function onMouseMove(event) {
        var deltaX = event.clientX - (startPosX - window.scrollX),
            deltaY = event.clientY - (startPosY - window.scrollY),
            left = startBox.left,
            top = startBox.top,
            right = startBox.right - window.scrollX,
            bottom = startBox.bottom - window.scrollY,
            minWidth = _this2.minWidth !== null && _this2.minWidth !== undefined ? _this2.minWidth : 0,
            maxWidth = _this2.maxWidth !== null && _this2.maxWidth !== undefined ? _this2.maxWidth : Infinity,
            minHeight = _this2.minHeight !== null && _this2.maxHeight !== undefined ? _this2.minHeight : 0,
            maxHeight = _this2.maxHeight !== null && _this2.maxHeight !== undefined ? _this2.maxHeight : Infinity;

        if (direction === 'right' || direction === 'bottom-right' || direction === 'top-right') {
          right += deltaX;
          right = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(right, left + minWidth, left + maxWidth);
        } else if (direction === 'left' || direction === 'top-left' || direction === 'bottom-left') {
          left += deltaX;
          left = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(left, right - maxWidth, right - minWidth);
        }

        if (direction === 'bottom' || direction === 'bottom-right' || direction === 'bottom-left') {
          bottom = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(bottom + deltaY, top + minHeight, top + maxHeight);
        } else if (direction === 'top' || direction === 'top-left' || direction === 'top-right') {
          top = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(top + deltaY, bottom - maxHeight, bottom - minHeight);
        }

        var container;

        if (_this2.container) {
          container = _this2.container.call(_this2, _this2.element, event);

          if (container) {
            // I need to make my own object because the objects returned by Element.getBoundClientRect are readonly
            // and Object.assign({}, rect) doesn't map over the properties.
            var _container = {
              left: container.left,
              top: container.top,
              bottom: container.bottom,
              right: container.right
            };

            if (_this2.grid) {
              if (_this2.grid.x) {
                _container.left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.left, _this2.grid.x, Math.ceil);
                _container.right = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.right, _this2.grid.x, Math.floor);
              }

              if (_this2.grid.y) {
                _container.top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.top, _this2.grid.y, Math.ceil);
                _container.bottom = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.bottom, _this2.grid.y, Math.floor);
              }
            }

            container = _container;
          }
        }

        if (_this2.grid) {
          left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(left, _this2.grid.x);
          top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(top, _this2.grid.y);
          right = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(right, _this2.grid.x);
          bottom = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(bottom, _this2.grid.y);
        }

        if (container) {
          left = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(left, container.left, container.right);
          right = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(right, container.left, container.right);
          bottom = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(bottom, container.top, container.bottom);
          top = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(top, container.top, container.bottom);
        }

        if (_this2.keepAspectRatio) {
          if (direction === 'top-left' || direction === 'top-right') {
            top = bottom - (right - left) * _this2.keepAspectRatio;
          } else if (direction === 'bottom-left' || direction === 'bottom-right' || direction === 'left' || direction === 'right') {
            bottom = top + (right - left) * _this2.keepAspectRatio;
          } else if (direction === 'bottom' || direction === 'top') {
            right = left + (bottom - top) / _this2.keepAspectRatio;
          }
        }

        Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(target, {
          left: left,
          top: top
        }, 'translate3d');
        target.style.width = "".concat(right - left, "px");
        target.style.height = "".concat(bottom - top, "px");
        rect.left = left + window.scrollX;
        rect.top = top + window.scrollY;
        rect.width = right - left;
        rect.height = bottom - top;
        rect.right = right + window.scrollX;
        rect.bottom = bottom + window.scrollY;

        _this2.element.dispatchEvent(new CustomEvent('resizing', {
          bubbles: true,
          detail: {
            resizeable: _this2,
            target: target,
            originalEvent: event,
            clientX: event.clientX,
            clientY: event.clientY,
            element: _this2.element,
            targetClientRect: {
              left: left,
              top: top,
              right: right,
              bottom: bottom,
              width: right - left,
              height: bottom - top,
              x: left,
              y: top
            }
          }
        }));
      };

      var onMouseUp = function onMouseUp(event) {
        doc.removeEventListener('mousemove', onMouseMove);
        doc.removeEventListener('mouseup', onMouseUp);

        if (_this2.element !== target) {
          target.parentElement.removeChild(target);
          Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(_this2.element, {
            left: rect.left - window.scrollX,
            top: rect.top - window.scrollY
          }, 'translate3d');
          _this2.element.style.width = "".concat(rect.width, "px");
          _this2.element.style.height = "".concat(rect.height, "px");
        }

        _this2.element.classList.remove('ui-resizing');

        _this2.isResizing = false;

        _this2.element.dispatchEvent(new CustomEvent('resize-end', {
          bubbles: true,
          detail: {
            resizeable: _this2,
            element: _this2.element,
            originalEvent: event,
            clientX: event.clientX,
            clientY: event.clientY
          }
        }));
      };

      this.isResizing = true;
      this.element.classList.add('ui-resizing');
      doc.addEventListener('mousemove', onMouseMove);
      doc.addEventListener('mouseup', onMouseUp);
      this.element.dispatchEvent(new CustomEvent('resize-start', {
        bubbles: true,
        detail: {
          resizeable: this,
          target: target,
          originalEvent: event,
          clientX: event.clientX,
          clientY: event.clientY,
          element: this.element
        }
      }));
    }
  }]);

  return Resizeable;
}();



/***/ }),

/***/ "./src/core/ui/position.js":
/*!*********************************!*\
  !*** ./src/core/ui/position.js ***!
  \*********************************/
/*! exports provided: getOffsetElement, getClientRect, getBoundingOffsetRect, getBoundingDocumentRect, getTranslation, setTranslation, getCssPosition, setCssPosition, setElementClientPosition, clientRectToDocumentSpace, documentRectToClientSpace, snapToGrid, convertDomRectToObject, getPointOnElement, getSubBoundingBox, getDistanceBetweenRects, getElementOffset, setElementOffset, Vec2, Vec3, Rect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffsetElement", function() { return getOffsetElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientRect", function() { return getClientRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoundingOffsetRect", function() { return getBoundingOffsetRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoundingDocumentRect", function() { return getBoundingDocumentRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTranslation", function() { return setTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCssPosition", function() { return getCssPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCssPosition", function() { return setCssPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementClientPosition", function() { return setElementClientPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientRectToDocumentSpace", function() { return clientRectToDocumentSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentRectToClientSpace", function() { return documentRectToClientSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapToGrid", function() { return snapToGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDomRectToObject", function() { return convertDomRectToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointOnElement", function() { return getPointOnElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubBoundingBox", function() { return getSubBoundingBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenRects", function() { return getDistanceBetweenRects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return getElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementOffset", function() { return setElementOffset; });
/* harmony import */ var _vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vectors */ "./src/core/vectors/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"]; });

/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");


var regMatrix = /matrix(3d)?\(([^)]+)\)/;
/**
 * Returns the elements offset parent.
 *
 * @param element
 * @returns {HTMLElement}
 */

function getOffsetElement(element) {
  var o = element.parentElement;

  while (o) {
    var position = getComputedStyle(o).position;
    if (position !== 'static') return o;
    o = o.parentElement;
  }
}
/**
 * Returns the rectangle of the client area.
 *
 * @returns {Rect}
 */

function getClientRect() {
  return _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getClientRect();
}
/**
 * Returns a bounding rect who's positions are relative to the provided offsetParent.
 * If offsetParent is null then the targets natural offsetParent is used as returned by the getOffsetElement function.
 * @param element
 * @param offsetParent
 * @returns {{top: number, left: number, bottom: number, width: number, right: number, height: number}}
 */

function getBoundingOffsetRect(element) {
  var offsetParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var offsetRect, rect;
  if (!offsetParent) offsetParent = getOffsetElement(element); // no offset parent.  Position relative to the client.

  if (!offsetParent) {
    offsetRect = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getRootContainingClientRect();
  } else {
    offsetRect = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(offsetParent);
  }

  rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left - offsetRect.left, rect.top - offsetRect.top, offsetRect.right - rect.right, offsetRect.bottom - rect.bottom);
}
/**
 * Returns a bounding rect who's positions are relative to the document.
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */

function getBoundingDocumentRect(element) {
  var rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left + window.pageXOffset, rect.top + window.pageYOffset, rect.right + window.pageXOffset, rect.bottom + window.pageYOffset);
}
/**
 * Returns the css translation from the transformation matrix applied to the element.
 *
 * @param element
 * @returns {Vec3}
 */

function getTranslation(element) {
  var transform = getComputedStyle(element).transform,
      m = regMatrix.exec(transform);

  if (!m) {
    return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 0);
  }

  var data = m[2].split(/\s*,\s*/);

  if (m[1]) {
    return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](parseFloat(data[12]), parseFloat(data[13]), parseFloat(data[14]));
  } else {
    return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](parseFloat(data[4]), parseFloat(data[5]), 0);
  }
}
/**
 * Sets the element's transformation matrix to 2d translate with the specified left and top properties.
 *
 * @param element
 * @param x
 * @param y
 * @param z
 */

function setTranslation(element, _ref) {
  var x = _ref.x,
      y = _ref.y,
      _ref$z = _ref.z,
      z = _ref$z === void 0 ? null : _ref$z;

  if (z !== null) {
    element.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)");
  } else {
    element.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
  }
}
/**
 * Gets the elements left and top style properties as numbers.
 *
 * @param element
 * @returns {Vec2}
 */

function getCssPosition(element) {
  var style = getComputedStyle(element);
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"](parseInt(style.left, 10), parseInt(style.top, 10));
}
/**
 * Sets the left and top style properties of an element.  If the element is positioned statically it will be changed to
 * relative.
 *
 * @param element
 * @param left
 * @param top
 */

function setCssPosition(element, _ref2) {
  var _ref2$left = _ref2.left,
      left = _ref2$left === void 0 ? null : _ref2$left,
      _ref2$top = _ref2.top,
      top = _ref2$top === void 0 ? null : _ref2$top;
  var style = getComputedStyle(element);

  if (style.position === 'static') {
    style.position = 'relative';
  }

  if (left !== null && left !== undefined) {
    element.style.left = "".concat(left, "px");
  }

  if (top !== null && top !== undefined) {
    element.style.top = "".concat(top, "px");
  }
}
/**
 * Sets the elements position relative to the client window.  The `method` parameter controls how the elements position
 * is modified.  The options are 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'translate', and 'translate3d'.
 *
 * top-left, top-right, bottom-left and bottom-right set the css left, top, right, and bottom properties of the element.
 * translate and translate3d position the element by setting the transform property.
 *
 * @param element {HTMLElement}
 * @param position {{x, y}|{left, top, right, bottom}|Array|Vec2}
 * @param method {'top-left'|'top-right'|'bottom-left'|'bottom-right'|'translate'|'translate3d'}
 */

function setElementClientPosition(element, position) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top-left';
  position = new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](position);

  if (method === 'top-left' || method === 'top-right' || method === 'bottom-left' || method === 'bottom-right') {
    var style = getComputedStyle(element);
    var positionType = style.position,
        box,
        deltaX,
        deltaY,
        current; // position can't be static for this operation.  Switch to relative.

    if (positionType === 'static') {
      element.style.position = 'relative';
      positionType = "relative";
    }

    if (positionType === "relative") {
      style = getComputedStyle(element);
      current = {
        left: parseInt(style.left, 10) || 0,
        right: parseInt(style.right, 10) || 0,
        top: parseInt(style.top, 10) || 0,
        bottom: parseInt(style.bottom, 10) || 0
      };
      box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element);
    } else {
      box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element);
      current = getBoundingOffsetRect(element);
    }

    if (method === 'top-left') {
      deltaX = position.left - box.left;
      deltaY = position.top - box.top;
      element.style.left = current.left + deltaX + 'px';
      element.style.top = current.top + deltaY + 'px';
      element.style.right = '';
      element.style.bottom = '';
    } else if (method === 'top-right') {
      deltaX = position.right - box.right;
      deltaY = position.top - box.top;
      element.style.right = current.right - deltaX + 'px';
      element.style.top = current.top + deltaY + 'px';
      element.style.left = '';
      element.style.bottom = '';
    } else if (method === 'bottom-left') {
      deltaX = position.left - box.left;
      deltaY = position.bottom - box.bottom;
      console.log({
        right: current.left + deltaX + 'px',
        bottom: current.bottom - deltaY + 'px'
      });
      element.style.left = current.left + deltaX + 'px';
      element.style.bottom = current.bottom - deltaY + 'px';
      element.style.right = '';
      element.style.top = '';
    } else {
      // bottom-right
      deltaX = position.right - box.right;
      deltaY = position.bottom - box.bottom;
      element.style.right = current.right - deltaX + 'px';
      element.style.bottom = current.bottom - deltaY + 'px';
      element.style.left = '';
      element.style.top = '';
    }
  } else if (method === 'translate') {
    var _box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element),
        _deltaX = position.left - _box.left,
        _deltaY = position.top - _box.top,
        cssPosition = getTranslation(element);

    setTranslation(element, {
      x: cssPosition.x + _deltaX,
      y: cssPosition.y + _deltaY
    });
  } else if (method === 'translate3d') {
    var _box2 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element),
        _deltaX2 = position.left - _box2.left,
        _deltaY2 = position.top - _box2.top,
        _cssPosition = getTranslation(element);

    setTranslation(element, {
      x: _cssPosition.x + _deltaX2,
      y: _cssPosition.y + _deltaY2,
      z: _cssPosition.z
    });
  }
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from client space to document space.
 * @param rect
 */

function clientRectToDocumentSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect);
  r.left += window.pageXOffset;
  r.right += window.pageXOffset;
  if (typeof r.top === 'number') r.top += window.pageYOffset;
  if (typeof r.bottom === 'number') r.bottom += window.pageYOffset;
  return r;
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from document space to client space.
 * @param rect
 */

function documentRectToClientSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect);
  r.left -= window.pageXOffset;
  r.right -= window.pageXOffset;
  if (typeof r.top === 'number') r.top -= window.pageYOffset;
  if (typeof r.bottom === 'number') r.bottom -= window.pageYOffset;
  return r;
}
/**
 * Snaps the value to the specified grid using the provided rounding function.
 * @param value
 * @param gridSize
 * @param roundingFunction
 * @returns {number|*}
 */

function snapToGrid(value, gridSize) {
  var roundingFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.round;

  if (gridSize !== null && gridSize !== undefined && !Number.isNaN(gridSize)) {
    return roundingFunction(value / gridSize) * gridSize;
  }

  return value;
}
/**
 * Deprecated in favor of calling Rect.fromRect() class method.
 *
 * @deprecated
 * @param domRect
 * @returns {Rect}
 */

function convertDomRectToObject(domRect) {
  return _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(domRect);
}
/**
 * Returns the {x, y} point calculated relative to the reference element.
 *
 * @param referenceElement
 * @param point
 * @param offset
 * @param constrain
 * @returns {Vec2}
 */

function getPointOnElement(referenceElement, point) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var constrain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var rect = referenceElement;

  if (rect.getBoundingClientRect) {
    rect = rect.getBoundingClientRect();
  }

  if (constrain) {
    if (typeof constrain === 'string') {
      constrain = document.querySelector(constrain);
    }

    if (constrain.getBoundingClientRect) {
      constrain = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(constrain.getBoundingClientRect());
    }
  } // Convert array to {x, y} object.


  if (Array.isArray(point)) {
    point = {
      x: point[0],
      y: point[1]
    };
  } else if (typeof point === 'string') {
    if (point === 'top-left') {
      point = {
        x: 0,
        y: 0
      };
    } else if (point === 'top') {
      point = {
        x: '50%',
        y: 0
      };
    } else if (point === 'top-right') {
      point = {
        x: '100%',
        y: 0
      };
    } else if (point === 'right') {
      point = {
        x: '100%',
        y: '50%'
      };
    } else if (point === 'bottom-right') {
      point = {
        x: '100%',
        y: '100%'
      };
    } else if (point === 'bottom') {
      point = {
        x: '50%',
        y: '100%'
      };
    } else if (point === 'bottom-left') {
      point = {
        x: 0,
        y: '100%'
      };
    } else if (point === 'left') {
      point = {
        x: 0,
        y: '50%'
      };
    } else if (point === 'middle') {
      point = {
        x: '50%',
        y: '50%'
      };
    } else {
      throw new Error("Unknown point option ".concat(point));
    }
  }

  if (typeof point.x === 'string') {
    point.x = (rect.right - rect.left) * (parseFloat(point.x) / 100);
  }

  if (typeof point.y === 'string') {
    point.y = (rect.bottom - rect.top) * (parseFloat(point.y) / 100);
  }

  if (constrain) {
    if (typeof constrain.left === 'string') {
      constrain.left = (rect.right - rect.left) * (parseFloat(constrain.left) / 100);
    }

    if (typeof constrain.right === 'string') {
      constrain.right = (rect.right - rect.left) * (parseFloat(constrain.right) / 100);
    }

    if (typeof constrain.top === 'string') {
      constrain.top = (rect.bottom - rect.top) * (parseFloat(constrain.top) / 100);
    }

    if (typeof constrain.bottom === 'string') {
      constrain.bottom = (rect.bottom - rect.top) * (parseFloat(constrain.bottom) / 100);
    }

    point.x = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(point.x, constrain.left, constrain.right);
    point.y = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(point.y, constrain.top, constrain.bottom);
  }

  if (offset) {
    if (Array.isArray(offset)) {
      offset = {
        x: offset[0],
        y: offset[1]
      };
    }

    if (offset.x !== null) {
      point.x += offset.x;
    }

    if (offset.y !== null) {
      point.y += offset.y;
    }
  }

  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"](rect.left + point.x, rect.top + point.y);
}
/**
 * Gets the bounding client rect for a rectangle defined by the position rectangle with left, top, right and bottom
 * properties relative to the element's position.
 *
 * @param element {{getBoundingClientRect}|Element|String|{left, top, right, bottom}}
 * @param position {{left, top, bottom, right}}
 * @return {Rect}
 */

function getSubBoundingBox(element, position) {
  var rect; // Get the bounding client rect of the element.   The user should have passed either a css selector, an object with a
  // getBoundingClientRect interface.  Or a bounding client rect directly.

  if (element.getBoundingClientRect) {
    rect = element.getBoundingClientRect();
  } else if (typeof element === 'string') {
    rect = document.querySelector(element).getBoundingClientRect();
  } else {
    rect = element;
  }

  var width = rect.right - rect.left,
      height = rect.bottom - rect.top; // The user can pass a rect with left, top, right and bottom properties.  The value can either be the desired
  // coordinates relative to the top-left corner of the reference element or a percentage.  Another possibility
  // is that the user passes one of the keyword properties that coorispond to a specific section of the element.
  // Map those keywords to their rectangle.

  if (typeof position === 'string') {
    if (position === 'border-top') {
      position = {
        left: 0,
        right: '100%',
        top: 0,
        bottom: 0
      };
    } else if (position === 'border-right') {
      position = {
        left: '100%',
        right: '100%',
        top: 0,
        bottom: '100%'
      };
    } else if (position === 'border-bottom') {
      position = {
        left: 0,
        right: '100%',
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'border-left') {
      position = {
        left: 0,
        top: 0,
        right: 0,
        bottom: '100%'
      };
    } else if (position === 'top-left') {
      position = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    } else if (position === 'top') {
      position = {
        top: 0,
        left: '50%',
        right: '50%',
        bottom: 0
      };
    } else if (position === 'top-right') {
      position = {
        top: 0,
        left: '100%',
        right: '100%',
        bottom: 0
      };
    } else if (position === 'left') {
      position = {
        left: 0,
        top: '50%',
        bottom: '50%',
        right: 0
      };
    } else if (position === 'origin') {
      position = {
        left: '50%',
        right: '50%',
        top: '50%',
        bottom: '50%'
      };
    } else if (position === 'bottom-left') {
      position = {
        left: 0,
        right: 0,
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'bottom') {
      position = {
        left: '50%',
        right: '50%',
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'bottom-right') {
      position = {
        left: '100%',
        right: '100%',
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'right') {
      position = {
        left: '100%',
        right: '100%',
        top: '50%',
        bottom: '50%'
      };
    }
  }

  position.left = position.left || 0;
  position.right = position.right || 0;
  position.top = position.top || 0;
  position.bottom = position.bottom || 0; // left and right percentages are a percentage of the elements width.
  // top and bottom percentages are a percentage of the elements height.

  if (typeof position.left === 'string') {
    position.left = parseFloat(position.left) / 100 * width;
  }

  if (typeof position.right === 'string') {
    position.right = parseFloat(position.right) / 100 * width;
  }

  if (typeof position.bottom === 'string') {
    position.bottom = parseFloat(position.bottom) / 100 * height;
  }

  if (typeof position.top === 'string') {
    position.top = parseFloat(position.top) / 100 * height;
  } // Convert to client space.


  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left + position.left, rect.top + position.top, rect.left + position.right, rect.top + position.bottom);
}
/**
 * Returns the distance in between the provided Rect objects.  If the objects are touching or overlapping 0
 * will be returned.
 *
 * @param rect1 {{left, top, right, bottom}}
 * @param rect2 {{left, top, right, bottom}}
 * @returns {Number}
 */

function getDistanceBetweenRects(rect1, rect2) {
  var vec1 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect1),
      vec2 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect2);
  var isXOverlapping = vec1.isXOverlapping(vec2),
      isYOverlapping = vec1.isYOverlapping(vec2);

  if (isXOverlapping && isYOverlapping) {
    // Items are overlapping
    return 0;
  } else if (isXOverlapping) {
    return Math.min(Math.abs(vec1.bottom - vec2.top), Math.abs(vec1.top - vec2.bottom));
  } else if (isYOverlapping) {
    return Math.min(Math.abs(vec1.right - vec2.left), Math.abs(vec1.left - vec2.right));
  } else {
    var x1, y1, x2, y2;

    if (vec1.right <= vec2.left) {
      x1 = vec1.right;
      x2 = vec2.left;
    } else {
      x1 = vec1.left;
      x2 = vec2.right;
    }

    if (vec1.bottom <= vec2.top) {
      y1 = vec1.bottom;
      y2 = vec2.top;
    } else {
      y1 = vec1.top;
      y2 = vec2.bottom;
    } // Use distance formula to calculate distance.


    return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
  }
}
/**
 * Returns the top and left position of an element relative to the document.
 *
 * @param element
 * @return {{top: number, left: number}}
 */

function getElementOffset(element) {
  var box = element.getBoundingClientRect();
  return {
    left: box.left + window.pageXOffset,
    top: box.top + window.pageYOffset
  };
}
/**
 * Sets an elements position relative to the document.
 *
 * @param element
 * @param coords
 */

function setElementOffset(element, coords) {
  if (coords.nodeType) {
    coords = getElementOffset(element);
  } else if (Array.isArray(coords)) {
    coords = {
      left: coords.left,
      top: coords.top
    };
  }

  var offset = element.getBoundingClientRect();
  var style = getComputedStyle(element),
      left = parseInt(style.left, 10) || 0,
      top = parseInt(style.top, 10) || 0;
  element.style.left = left + (coords.left - offset.left) + 'px';
  element.style.top = top + (coords.top - offset.top) + 'px';
}


/***/ }),

/***/ "./src/core/utility/debounce.js":
/*!**************************************!*\
  !*** ./src/core/utility/debounce.js ***!
  \**************************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/**
 * Throttles a function to only be executed after a given wait period.  If multiple calls to the debounced function
 * are made within that period the waiting period is set.
 * @param fn
 * @param wait
 * @returns {Function}
 */
function debounce(fn, wait) {
  var timeout;
  return function () {
    var _this = this;

    var args = arguments;

    var later = function later() {
      timeout = null;
      fn.apply(_this, args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/***/ }),

/***/ "./src/core/utility/decorators.js":
/*!****************************************!*\
  !*** ./src/core/utility/decorators.js ***!
  \****************************************/
/*! exports provided: proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
function proto(descriptor) {
  descriptor.placement = "prototype";
  return descriptor;
}

/***/ }),

/***/ "./src/core/utility/dom.js":
/*!*********************************!*\
  !*** ./src/core/utility/dom.js ***!
  \*********************************/
/*! exports provided: parseHTML, createFragment, addClasses, removeClasses, assignAttributes, selectElement, emptyElement, getScroll, setScroll, findChild, filterChildren, isWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTML", function() { return parseHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return createFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return addClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return removeClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignAttributes", function() { return assignAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectElement", function() { return selectElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return emptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return getScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScroll", function() { return setScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return findChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return filterChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var REG_WHITESPACE = /\s+/;
/**
 * Parses an html string into a document fragment.
 *
 * @deprecated
 * @param html
 * @return {DocumentFragment}
 */

function parseHTML(html) {
  var template = document.createElement('template');
  template.innerHTML = html.trim();

  if (template.content) {
    return template.content;
  } else {
    // Doesn't support template tag.
    var fragment = document.createDocumentFragment();

    while (template.firstChild) {
      fragment.appendChild(template.firstChild);
    }

    return fragment;
  }
}
function createFragment(html) {
  // noinspection JSDeprecatedSymbols
  return parseHTML(html);
}
/**
 * Adds classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */

function addClasses(element, classes) {
  var _element$classList;

  if (typeof classes === 'string') {
    classes = classes.split(REG_WHITESPACE);
  }

  (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classes));
}
/**
 * Removes classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */

function removeClasses(element, classes) {
  var _element$classList2;

  if (typeof classes === 'string') {
    classes = classes.split(REG_WHITESPACE);
  }

  (_element$classList2 = element.classList).remove.apply(_element$classList2, _toConsumableArray(classes));
}
/**
 * Assigns attributes in an object to an element.
 * @param element
 * @param attributes
 */

function assignAttributes(element, attributes) {
  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
/**
 * Matches a single dom element based on the given selector.
 * Can take a css selector string, a jquery object, a dom element, a document element or a document fragment.
 * If a css selector is passed it will query for the element.
 * If a jquery object is passed it will return the first matched element.
 * If an element is passed it will return that element.
 *
 * If a context is provided and the selector was a css selector, the selectors scope will be limited to that element.
 * Otherwise the context will be the document.
 *
 * @param selector
 * @param context
 * @returns {Element|Document|DocumentFragment}
 */

function selectElement(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!context) {
    context = document;
  } else {
    context = selectElement(context);
  }

  if (typeof selector === 'string') {
    return context.querySelector(selector);
  } else if (selector.jquery) {
    return selector[0];
  } else if (selector.nodeType === 1 || selector.nodeType === 9 || selector.nodeType === 11) {
    return selector;
  }
}
/**
 * Empties a dom element.
 *
 * @param element
 */

function emptyElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
/**
 * Normalizing accessing scroll position for an element.
 *
 * Windows and elements have different ways of accessing their scroll left and scroll top values on IE.
 * This function normalizes this behavior so getScroll(variable).scrollLeft always works.
 * @param element
 * @returns {{left, top}}
 */

function getScroll(element) {
  if (isWindow(element)) {
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  } else {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
}
/**
 * Normalizes setting a scroll position for an element.
 * Windows on ie and elements with overflow scroll have different ways of setting the scroll position.
 * This methods normalizes them.
 * @param element - The element to scroll
 * @param scroll - An object with a left or a top property or both.
 */

function setScroll(element, scroll) {
  if (element.scrollTo) {
    element.scrollTo(scroll);
  } else {
    element.scrollLeft = scroll.left;
    element.scrollTop = scroll.top;
  }
}
/**
 * Returns first child element that matches the test function.
 * @param element - Parent element
 * @param fn {Function|String} - Test Function
 * @returns {HTMLElement|Element|null}
 */

function findChild(element, fn) {
  if (typeof fn === 'string') {
    var selector = fn;

    fn = function fn(child) {
      return child.matches(selector);
    };
  }

  for (var i = 0, l = element.children.length; i < l; i++) {
    var child = element.children[i];

    if (fn(child)) {
      return child;
    }
  }

  return null;
}
/**
 * Creates a filtered list of element from the children that match the test function.
 * @param element - Parent element.
 * @param fn - Test function.
 * @returns {Array}
 */

function filterChildren(element, fn) {
  var r = [];

  for (var i = 0, l = element.children.length; i < l; i++) {
    var child = element.children[i];

    if (fn(child)) {
      r.push(child);
    }
  }

  return r;
}
/**
 * Test to see if the variable is a window.
 * @param variable
 * @returns {boolean}
 */

function isWindow(variable) {
  return variable && _typeof(variable) === 'object' && setInterval in variable;
}

/***/ }),

/***/ "./src/core/utility/index.js":
/*!***********************************!*\
  !*** ./src/core/utility/index.js ***!
  \***********************************/
/*! exports provided: debounce, proto, createFragment, findChild, filterChildren, emptyElement, addClasses, removeClasses, selectElement, assignAttributes, getScroll, isWindow, setScroll, all, any, chain, enumerate, firstValue, items, keys, values, clamp, modulo, calcDistance, arraysEqual, getPropertyByPath, getOwnProperty, isEmptyObject, randomChoice, rangeFindItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debounce */ "./src/core/utility/debounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _debounce__WEBPACK_IMPORTED_MODULE_0__["debounce"]; });

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators */ "./src/core/utility/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return _decorators__WEBPACK_IMPORTED_MODULE_1__["proto"]; });

/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/core/utility/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["createFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["findChild"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["filterChildren"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["emptyElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["addClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["removeClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectElement", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["selectElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assignAttributes", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["assignAttributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["getScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["isWindow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setScroll", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["setScroll"]; });

/* harmony import */ var _iter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iter */ "./src/core/utility/iter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "all", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["all"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["any"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["chain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enumerate", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["enumerate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "firstValue", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["firstValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "items", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["items"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["keys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["values"]; });

/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math */ "./src/core/utility/math.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["modulo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcDistance", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["calcDistance"]; });

/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object */ "./src/core/utility/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["arraysEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["getPropertyByPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOwnProperty", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["getOwnProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["isEmptyObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["randomChoice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rangeFindItem", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["rangeFindItem"]; });









/***/ }),

/***/ "./src/core/utility/iter.js":
/*!**********************************!*\
  !*** ./src/core/utility/iter.js ***!
  \**********************************/
/*! exports provided: items, keys, values, enumerate, chain, firstValue, all, any */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "items", function() { return items; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumerate", function() { return enumerate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return chain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstValue", function() { return firstValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(items),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(keys),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(values),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(enumerate),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(chain);

function items(object) {
  var key;
  return regeneratorRuntime.wrap(function items$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = regeneratorRuntime.keys(object);

        case 1:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 8;
            break;
          }

          key = _context.t1.value;

          if (!object.hasOwnProperty(key)) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return [key, object[key]];

        case 6:
          _context.next = 1;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
function keys(object) {
  var key;
  return regeneratorRuntime.wrap(function keys$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = regeneratorRuntime.keys(object);

        case 1:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 8;
            break;
          }

          key = _context2.t1.value;

          if (!object.hasOwnProperty(key)) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return key;

        case 6:
          _context2.next = 1;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
function values(object) {
  var key;
  return regeneratorRuntime.wrap(function values$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = regeneratorRuntime.keys(object);

        case 1:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 8;
            break;
          }

          key = _context3.t1.value;

          if (!object.hasOwnProperty(key)) {
            _context3.next = 6;
            break;
          }

          _context3.next = 6;
          return object[key];

        case 6:
          _context3.next = 1;
          break;

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
function enumerate(iterable) {
  var i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

  return regeneratorRuntime.wrap(function enumerate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          i = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 4;
          _iterator = iterable[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 13;
            break;
          }

          value = _step.value;
          _context4.next = 10;
          return [i, value];

        case 10:
          _iteratorNormalCompletion = true;
          _context4.next = 6;
          break;

        case 13:
          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 19:
          _context4.prev = 19;
          _context4.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context4.prev = 22;

          if (!_didIteratorError) {
            _context4.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context4.finish(22);

        case 26:
          return _context4.finish(19);

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[4, 15, 19, 27], [20,, 22, 26]]);
}
function chain() {
  var _len,
      iterables,
      _key,
      _i,
      _iterables,
      iter,
      _iteratorNormalCompletion2,
      _didIteratorError2,
      _iteratorError2,
      _iterator2,
      _step2,
      value,
      _args5 = arguments;

  return regeneratorRuntime.wrap(function chain$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          for (_len = _args5.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {
            iterables[_key] = _args5[_key];
          }

          _i = 0, _iterables = iterables;

        case 2:
          if (!(_i < _iterables.length)) {
            _context5.next = 33;
            break;
          }

          iter = _iterables[_i];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context5.prev = 7;
          _iterator2 = iter[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context5.next = 16;
            break;
          }

          value = _step2.value;
          _context5.next = 13;
          return value;

        case 13:
          _iteratorNormalCompletion2 = true;
          _context5.next = 9;
          break;

        case 16:
          _context5.next = 22;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](7);
          _didIteratorError2 = true;
          _iteratorError2 = _context5.t0;

        case 22:
          _context5.prev = 22;
          _context5.prev = 23;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 25:
          _context5.prev = 25;

          if (!_didIteratorError2) {
            _context5.next = 28;
            break;
          }

          throw _iteratorError2;

        case 28:
          return _context5.finish(25);

        case 29:
          return _context5.finish(22);

        case 30:
          _i++;
          _context5.next = 2;
          break;

        case 33:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[7, 18, 22, 30], [23,, 25, 29]]);
}
/**
 * Takes an iterable and returns the first none null or undefined value.
 * @param args
 */

function firstValue(args) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var item = _step3.value;

      if (item !== null && item !== undefined) {
        return item;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}
/**
 * Takes an iterable and returns true if all of the values are trueish.
 * @param iterable
 */

function all(iterable) {
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = iterable[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var item = _step4.value;

      if (!item) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return true;
}
/**
 * Takes an iterable and returns true if any of the values are trueish.
 * @param iterable
 */

function any(iterable) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = iterable[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;
      if (item) return true;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return false;
}

/***/ }),

/***/ "./src/core/utility/math.js":
/*!**********************************!*\
  !*** ./src/core/utility/math.js ***!
  \**********************************/
/*! exports provided: clamp, modulo, calcDistance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return modulo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcDistance", function() { return calcDistance; });
/**
 * Clamps a value between a minimum and maximum values.
 * @param value
 * @param minValue
 * @param maxValue
 * @returns {*}
 */
function clamp(value) {
  var minValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var maxValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (minValue !== null) {
    value = Math.max(value, minValue);
  }

  if (maxValue !== null) {
    value = Math.min(value, maxValue);
  }

  return value;
}
function modulo(value, mod) {
  return (value % mod + mod) % mod;
}
function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y2, 2));
}

/***/ }),

/***/ "./src/core/utility/object.js":
/*!************************************!*\
  !*** ./src/core/utility/object.js ***!
  \************************************/
/*! exports provided: randomChoice, arraysEqual, isEmptyObject, getOwnProperty, getPropertyByPath, rangeFindItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return randomChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnProperty", function() { return getOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return getPropertyByPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeFindItem", function() { return rangeFindItem; });
/**
 * Returns a random value from an array.
 * @param array
 * @returns {*}
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}
/**
 * Checks to see if 2 arrays are "equal".
 * @param array1
 * @param array2
 */

function arraysEqual(array1, array2) {
  if (array1 === array2) return true; // The same object.

  if (array1 == null || array2 == null) return false;
  if (array1.length !== array2.length) return false;

  for (var i = 0, l = array1.length; i < l; i++) {
    if (array1[i] !== array2[i]) return false;
  }

  return true;
}
/**
 * Tests to see if the object is empty.
 *
 * @param object
 * @return {boolean}
 */

function isEmptyObject(object) {
  // noinspection LoopStatementThatDoesntLoopJS
  for (var key in object) {
    return false;
  }

  return true;
}
/**
 * Returns the object own property or the default value if it does not have that property.
 * @param obj
 * @param propName
 * @param defaultValue
 * @returns {*}
 */

function getOwnProperty(obj, propName) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  if (obj.hasOwnProperty(propName)) {
    return obj[propName];
  } else {
    return defaultValue;
  }
}
/**
 * Returns the obj value by following it's property path.  For example getPropertyByPath(a, 'b.c.d') is equivalent to
 * a.b.c.d but can be passed in string form.
 * @param obj
 * @param path
 * @returns {*}
 */

function getPropertyByPath(obj, path) {
  var parts = path.split('.'),
      r = obj;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;
      r = r[part];
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

  return r;
}
/**
 * rangeFindItem
 *
 * Searches an array starting at the starting index and heads towards the ending index and returns the first item that
 * matches the predicate function.  If no item is found then undefined will be returned.  This function can search an
 * array both forwards and backwards.  Just start at a greater point then the ending point and the function will
 * handle the rest.
 *
 * @param array - The array to search
 * @param predicate - The matching function.  Should return true if the item is a match.
 * @param startingIndex - The index to start from.
 * @param endingIndex - The index to end at.  (Will also search this index)
 * @returns {*}
 */

function rangeFindItem(array, predicate) {
  var startingIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var endingIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var i;

  if (endingIndex === null) {
    endingIndex = array.length - 1;
  }

  i = startingIndex;

  while (true) {
    var item = array[i];

    if (predicate(item)) {
      return item;
    }

    if (startingIndex > endingIndex) {
      if (i <= endingIndex) return;
      i--;
    } else {
      if (i >= endingIndex) return;
      i++;
    }
  }
}

/***/ }),

/***/ "./src/core/utility/set.js":
/*!*********************************!*\
  !*** ./src/core/utility/set.js ***!
  \*********************************/
/*! exports provided: isSuperset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSuperset", function() { return isSuperset; });
function isSuperset(set, subset) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = subset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (!set.has(elem)) {
        return false;
      }
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

  return true;
}

function union(setA, setB) {
  var _union = new Set(setA);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = setB[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var elem = _step2.value;

      _union.add(elem);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return _union;
}

function intersection(setA, setB) {
  var _intersection = new Set();

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = setB[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var elem = _step3.value;

      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return _intersection;
}

function symmetricDifference(setA, setB) {
  var _difference = new Set(setA);

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = setB[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var elem = _step4.value;

      if (_difference.has(elem)) {
        _difference["delete"](elem);
      } else {
        _difference.add(elem);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return _difference;
}

function difference(setA, setB) {
  var _difference = new Set(setA);

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = setB[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var elem = _step5.value;

      _difference["delete"](elem);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return _difference;
}

/***/ }),

/***/ "./src/core/vectors/RGBA.js":
/*!**********************************!*\
  !*** ./src/core/vectors/RGBA.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RGBA; });
/* harmony import */ var _Vec4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec4 */ "./src/core/vectors/Vec4.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var regPercentage = /^(\d+\.?\d*)%$/;

var RGBA =
/*#__PURE__*/
function (_Vec) {
  _inherits(RGBA, _Vec);

  function RGBA(r, g, b, a) {
    var _this;

    _classCallCheck(this, RGBA);

    if (_typeof(r) === 'object') {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(RGBA).call(this, r));
    } else {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(RGBA).call(this, r, g, b, a));
    }

    return _possibleConstructorReturn(_this);
  }

  _createClass(RGBA, [{
    key: "toString",
    value: function toString() {
      return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.a, ")");
    }
  }], [{
    key: "parseRGBAColorStringArgs",
    value: function parseRGBAColorStringArgs(value) {
      value = value.trim().split(/\s+/);
      var r = value[0],
          g = value[1],
          b = value[2],
          a = value[3];

      if (r) {
        if (regPercentage.test(r)) {
          r = parseFloat(r) / 100 * 255;
        } else {
          r = parseInt(r, 10);
        }
      }

      if (g) {
        if (regPercentage.test(g)) {
          g = parseFloat(g) / 100 * 255;
        } else {
          g = parseInt(g, 10);
        }
      }

      if (b) {
        if (regPercentage.test(b)) {
          b = parseFloat(b) / 100 * 255;
        } else {
          b = parseInt(b, 10);
        }
      }

      if (a) {
        if (regPercentage.test(a)) {
          a = parseFloat(a) / 100;
        } else {
          a = parseFloat(a);
        }
      }

      a = a || 1.0;
      return new RGBA(r, g, b, a);
    }
  }, {
    key: "parseHexColorStringArg",
    value: function parseHexColorStringArg(value) {
      value = value.trim().substring(1);
      var r,
          g,
          b,
          a = 1.0;

      if (value.length === 3) {
        r = value[0];
        g = value[1];
        b = value[2];
        r = parseInt(r + r, 16);
        g = parseInt(g + g, 16);
        b = parseInt(b + b, 16);
      } else if (value.length === 6) {
        r = value.substr(0, 2);
        g = value.substr(2, 2);
        b = value.substr(4, 2);
        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);
      } else if (value.length === 8) {
        r = value.substr(0, 2);
        g = value.substr(2, 2);
        b = value.substr(4, 2);
        a = value.substr(6, 2);
        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);
        a = parseInt(a, 16) / 255;
      }

      return new RGBA(r, g, b, a);
    }
  }]);

  return RGBA;
}(_Vec4__WEBPACK_IMPORTED_MODULE_0__["default"]);



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

/***/ "./src/core/vectors/Vec3.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Vec3.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec3; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Stores a 3 value vector.
 */
var Vec3 =
/*#__PURE__*/
function () {
  function Vec3() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vec3);

    this[0] = x;
    this[1] = y;
    this[2] = z;
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set(value) {
      if (_typeof(value) !== 'object') {
        this[0] = value;
        this[1] = value;
        this[2] = value;
      } else {
        this[0] = value[0];
        this[1] = value[1];
        this[2] = value[2];
      }
    }
  }, {
    key: "add",
    value: function add(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] + vec3, this[1] + vec3, this[2] + vec3);
      } else {
        return new Vec3(this[0] + vec3[0], this[1] + vec3[1], this[2] + vec3[2]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] - vec3, this[1] - vec3, this[2] - vec3);
      } else {
        return new Vec3(this[0] - vec3[0], this[1] - vec3[1], this[2] - vec3[2]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "scalar",
    value: function scalar(value) {
      return new Vec3(this[0] * value, this[1] * value, this[2] * value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "equals",
    value: function equals(vec3) {
      return vec3 === this || vec3[0] === this[0] && vec3[1] === this[1] && vec3[2] === this[2];
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "mod",
    value: function mod(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] % vec3, this[1] % vec3, this[2] % vec3);
      } else {
        return new Vec3(this[0] % vec3[0], this[1] % vec3[1], this[2] % vec3[2]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toHex",
    value: function toHex() {
      var r = Math.round(this.r).toString(16),
          g = Math.round(this.g).toString(16),
          b = Math.round(this.b).toString(16);

      if (r.length === 1) {
        r = '0' + r;
      }

      if (g.length === 1) {
        g = '0' + g;
      }

      if (b.length === 1) {
        b = '0' + b;
      }

      return "#".concat(r).concat(g).concat(b);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toRGB",
    value: function toRGB() {
      return "rgb(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ")");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toTranslate3d",
    value: function toTranslate3d() {
      return "translate3d(".concat(this.x, "px, ").concat(this.y, "px, ").concat(this.z, "px)");
    } // noinspection JSUnusedGlobalSymbols

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
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    }
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
  }], [{
    key: "fromHex",
    value: function fromHex(hex) {
      var m = /^#?([0-9a-f]{3})$/i.exec(hex);

      if (m) {
        hex = m[1][0] + m[1][0] + m[1][1] + m[1][1] + m[1][2] + m[1][2];
      } else {
        m = /^#?([0-9a-f]{6})$/i.exec(hex);

        if (m) {
          hex = m[1];
        } else {
          throw new Error("Could not parse value ".concat(hex));
        }
      }

      hex = parseInt(hex, 16); // r, g, b

      return new Vec3(hex & 0xff0000 >> 16, hex & 0x00ff00 >> 8, hex & 0x0000ff);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "fromRGB",
    value: function fromRGB(value) {
      var m = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(value);

      if (!m) {
        throw new Error("Could not parse rgb value ".concat(value));
      }

      return new Vec3(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10));
    }
  }]);

  return Vec3;
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



/***/ }),

/***/ "./src/core/vectors/index.js":
/*!***********************************!*\
  !*** ./src/core/vectors/index.js ***!
  \***********************************/
/*! exports provided: Rect, Vec2, Vec3, Vec4, RGBA, UnitError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rect */ "./src/core/vectors/Rect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _Rect__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vec2 */ "./src/core/vectors/Vec2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Vec3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vec3 */ "./src/core/vectors/Vec3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return _Vec3__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Vec4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vec4 */ "./src/core/vectors/Vec4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return _Vec4__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _RGBA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RGBA */ "./src/core/vectors/RGBA.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return _RGBA__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnitError", function() { return _errors__WEBPACK_IMPORTED_MODULE_5__["UnitError"]; });









/***/ }),

/***/ "./tests/src/test_resizeable.js":
/*!**************************************!*\
  !*** ./tests/src/test_resizeable.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResizeableTestPage; });
/* harmony import */ var core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Resizeable */ "./src/core/ui/Resizeable.js");
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




window.clientRectToDocumentSpace = core_ui_position__WEBPACK_IMPORTED_MODULE_2__["clientRectToDocumentSpace"];
window.documentRectToClientSpace = core_ui_position__WEBPACK_IMPORTED_MODULE_2__["documentRectToClientSpace"];

var ResizeableTestPage =
/*#__PURE__*/
function () {
  function ResizeableTestPage() {
    _classCallCheck(this, ResizeableTestPage);
  }

  _createClass(ResizeableTestPage, [{
    key: "load",
    value: function load() {
      var element1 = document.querySelector('#test-resizeable1');
      this.draggable = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](element1, {
        exclude: '.ui-resizeable-handle',
        container: core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client
      });
      this.resizeable = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"](element1, {
        handles: 'all',
        helper: 'test-helper',
        container: core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client,
        keepAspectRatio: 0.5625
      });
      this.element1 = element1;
    }
  }]);

  return ResizeableTestPage;
}();



/***/ }),

/***/ 1:
/*!********************************************!*\
  !*** multi ./tests/src/test_resizeable.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./tests/src/test_resizeable.js */"./tests/src/test_resizeable.js");


/***/ })

/******/ });
});
//# sourceMappingURL=test_resizeable.bundle.js.map