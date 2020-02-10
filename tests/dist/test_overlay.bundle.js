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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Animation.js":
/*!*******************************!*\
  !*** ./src/core/Animation.js ***!
  \*******************************/
/*! exports provided: linear, EASING, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EASING", function() { return EASING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Simple animation library that transitions properties from keyframe 1 to keyframe 2 over the duration.
 *
 * This library doesn't directly handle animated elements.  Instead it takes two objects filled with properties.
 * During each frame the class constructs a new object filled with each property transitioned to the property at
 * the given position.  It then passes that object to the onFrame callback handler that is responsible for applying
 * the properties to the element.
 *
 * Example Usage:
 * let target = document.querySelector('#id');
 *
 * let animation = new Animation({opacity: 1}, (opacity: 0}, 1000, (frame) => {
 *      Object.assign(target.style, frame);
 * });
 *
 * @author Matthew J. Shockman
 */

/**
 *
 * @param p
 * @returns {*}
 */
function linear(p) {
  return p;
}
var EASING = {
  linear: linear
};

var Animation =
/*#__PURE__*/
function () {
  /**
   * @param keyframe1 The starting keyframe
   * @param keyframe2 The ending keyframe
   * @param duration The duration of the animation.
   * @param onFrame Callback handle to handle "drawing" the frame.
   * @param onCancel
   * @param onComplete
   * @param onPause
   * @param easing An easing function.  Linear by default.
   */
  function Animation(keyframe1, keyframe2, duration) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        onFrame = _ref.onFrame,
        onCancel = _ref.onCancel,
        onComplete = _ref.onComplete,
        onPause = _ref.onPause,
        _ref$easing = _ref.easing,
        easing = _ref$easing === void 0 ? 'linear' : _ref$easing;

    _classCallCheck(this, Animation);

    this.keyframe1 = keyframe1;
    this.keyframe2 = keyframe2;
    this.easing = EASING[easing];
    this.duration = duration;
    this.onFrame = onFrame;
    this.onComplete = onComplete;
    this.onCancel = onCancel;
    this.onPause = onPause;
    this.status = 'pending'; // The current position pointer.

    this._position = 0; // The starting performance.now() timestamp.

    this._start = null; // When the animation should finish.  this._start + this.duration

    this._end = null;
  }
  /**
   * Returns the frame properties at the given position.
   *
   * Position given is decimal format where 1.0 is 100% and 0.0 is 0%.
   * @param position
   */


  _createClass(Animation, [{
    key: "getFrame",
    value: function getFrame(position) {
      var frame = {};
      position = this.easing(position);

      for (var key in this.keyframe2) {
        if (this.keyframe2.hasOwnProperty(key)) {
          var from = this.keyframe1[key],
              to = this.keyframe2[key];

          if (_typeof(to) === 'object') {
            var delta = to.subtract(from);
            frame[key] = from.add(delta.multiply(delta));
          } else {
            var _delta = to - from;

            frame[key] = from + position * _delta;
          }
        }
      }

      return frame;
    }
    /**
     * Starts the animation.
     */

  }, {
    key: "play",
    value: function play() {
      var _this = this;

      if (this.status === 'canceled') {
        throw new Error("Animation as been canceled");
      }

      var start = performance.now(),
          end = start + (this.duration - this.duration * this._position),
          lastFrame = null;
      this._start = start;
      this._end = end;
      this.status = 'running';
      var running = true;

      var stopFN = function stopFN() {
        running = false;
        _this._stop = null;
        _this.status = 'paused';

        if (_this.onPause) {
          _this.onPause({
            animation: _this,
            frame: lastFrame
          });
        }
      };

      this._stop = stopFN;

      var frame = function frame(t) {
        if (running) {
          _this._position = Math.min(1, (t - _this._start) / (_this._end - _this._start));
          lastFrame = _this.getFrame(_this._position);

          _this.onFrame({
            animation: _this,
            frame: lastFrame
          });

          if (_this._position >= 1) {
            _this.status = 'complete';
            _this._start = null;
            _this._end = null;

            if (_this._stop === stopFN) {
              _this._stop = null;
            }

            if (_this.onComplete) {
              window.requestAnimationFrame(function () {
                _this.onComplete({
                  animation: _this,
                  frame: lastFrame
                });
              });
            }
          } else {
            window.requestAnimationFrame(frame);
          }
        }
      };

      window.requestAnimationFrame(frame);
    }
    /**
     * Stop the current animation.
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this._stop) {
        this._stop();
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.stop();
      this.status = 'canceled';

      if (this.onCancel) {
        this.onCancel({
          animation: this
        });
      }
    }
    /**
     * Restart the animation.
     */

  }, {
    key: "restart",
    value: function restart() {
      this.stop();
      this._position = 0;
      this.play();
    }
    /**
     * Set the position pointer.
     *
     * @param position
     */

  }, {
    key: "goto",
    value: function goto(position) {
      if (this.isRunning) {
        this.stop();
        this._position = position;
        this.play();
      } else {
        this._position = position;
      }
    }
    /**
     * Returns true if the animation is running.
     * @returns {boolean}
     */

  }, {
    key: "isRunning",
    get: function get() {
      return !!this._stop;
    }
  }]);

  return Animation;
}();



/***/ }),

/***/ "./src/core/data.js":
/*!**************************!*\
  !*** ./src/core/data.js ***!
  \**************************/
/*! exports provided: Data, privateCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateCache", function() { return privateCache; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./src/core/utility.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var uuid = 1,
    prefix = 'p-' + ('' + Math.random()).replace(/\D/g, '');
var Data =
/*#__PURE__*/
function () {
  function Data() {
    _classCallCheck(this, Data);

    this.expando = "".concat(prefix, "-").concat(uuid++);
  }

  _createClass(Data, [{
    key: "cache",
    value: function cache(owner) {
      var cache = owner[this.expando];

      if (!cache) {
        cache = {};

        if (Data.acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = cache;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: cache,
              configurable: true
            });
          }
        } else {
          return null;
        }
      }

      return cache;
    }
  }, {
    key: "set",
    value: function set(owner, key, value) {
      var cache = this.cache(owner);

      if (_typeof(key) === 'object') {
        for (var prop in key) {
          cache[prop] = key[prop];
        }
      } else {
        cache[key] = value;
      }

      return cache;
    }
  }, {
    key: "get",
    value: function get(owner, key) {
      if (key === undefined) {
        return this.cache(owner);
      } else {
        var cache = owner[this.expando];

        if (cache) {
          return cache[key];
        }
      }
    }
  }, {
    key: "access",
    value: function access(owner, key, value) {
      if (arguments.length === 2) {
        if (_typeof(key) === 'object') {
          return this.set(owner, key);
        } else {
          return this.get(owner, key);
        }
      } else if (arguments.length === 1) {
        return this.cache(owner);
      } else if (arguments.length === 3) {
        return this.set(owner, key, value);
      }
    }
  }, {
    key: "remove",
    value: function remove(owner) {
      for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }

      var cache = owner[this.expando];
      if (!cache) return;

      if (arguments.length === 1) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      } else {
        for (var _i = 0; _i < keys.length; _i++) {
          var key = keys[_i];
          delete cache[key];
        }
      }
    }
  }, {
    key: "hasData",
    value: function hasData(owner) {
      var cache = owner[this.expando];
      return cache && !Object(_utility__WEBPACK_IMPORTED_MODULE_0__["isEmptyObject"])(cache);
    }
  }], [{
    key: "acceptData",
    value: function acceptData(owner) {
      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    }
  }]);

  return Data;
}();
var privateCache = new Data();

/***/ }),

/***/ "./src/core/errors.js":
/*!****************************!*\
  !*** ./src/core/errors.js ***!
  \****************************/
/*! exports provided: ExtendableError, IndexError, KeyError, ValueError, NotImplemented, ValidationError, AssertionError */
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

/***/ }),

/***/ "./src/core/position.js":
/*!******************************!*\
  !*** ./src/core/position.js ***!
  \******************************/
/*! exports provided: getOffsetElement, getBoundingOffsetRect, getBoundingDocumentRect, getTranslation, setTranslation, getCssPosition, setCssPosition, setElementClientPosition, clientRectToDocumentSpace, documentRectToClientSpace, snapToGrid, convertDomRectToObject, getPointOnElement, getSubBoundingBox, getDistanceBetweenRects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffsetElement", function() { return getOffsetElement; });
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
/* harmony import */ var _vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectors */ "./src/core/vectors.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./src/core/utility.js");


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
 * Returns a bounding rect who's positions are relative to the provided offsetParent.
 * If offsetParent is null then the targets natural offsetParent is used as returned by the getOffsetElement function.
 * @param element
 * @param offsetParent
 * @returns {{top: number, left: number, bottom: number, width: number, right: number, height: number}}
 */

function getBoundingOffsetRect(element) {
  var offsetParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!offsetParent) offsetParent = getOffsetElement(element);
  var offsetRect = offsetParent.getBoundingClientRect(),
      rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"](rect.left - offsetRect.left, rect.top - offsetRect.top, rect.right - offsetRect.right, rect.bottom - offsetRect.bottom);
}
/**
 * Returns a bounding rect who's positions are relative to the document.
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */

function getBoundingDocumentRect(element) {
  var rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"](rect.left + window.scrollX, rect.top + window.scrollY, rect.right + window.scrollX, rect.bottom + window.scrollY);
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
 * is modified.  The options are 'position' and 'translate'.  Position uses the standard left and top properties of the
 * elements style.  'translate' uses the transform property.
 *
 * @param element
 * @param position
 * @param method
 */

function setElementClientPosition(element, position) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'position';
  var box = element.getBoundingClientRect(),
      deltaX = position.left - box.left,
      deltaY = position.top - box.top;

  if (method === 'position') {
    var cssPosition = getCssPosition(element);
    setCssPosition(element, {
      left: cssPosition.left + deltaX,
      top: cssPosition.top + deltaY
    });
  } else if (method === 'translate') {
    var _cssPosition = getTranslation(element);

    setTranslation(element, {
      x: _cssPosition.x + deltaX,
      y: _cssPosition.y + deltaY
    });
  } else if (method === 'translate3d') {
    var _cssPosition2 = getTranslation(element);

    setTranslation(element, {
      x: _cssPosition2.x + deltaX,
      y: _cssPosition2.y + deltaY,
      z: _cssPosition2.z
    });
  }
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from client space to document space.
 * @param rect
 */

function clientRectToDocumentSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"].fromRect(rect);
  r.left += window.scrollX;
  r.right += window.scrollX;
  if (typeof r.top === 'number') r.top += window.scrollY;
  if (typeof r.bottom === 'number') r.bottom += window.scrollY;
  return r;
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from document space to client space.
 * @param rect
 */

function documentRectToClientSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"].fromRect(rect);
  r.left -= window.scrollX;
  r.right -= window.scrollX;
  if (typeof r.top === 'number') r.top -= window.scrollY;
  if (typeof r.bottom === 'number') r.bottom -= window.scrollY;
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
 * Deprecated in favor of calling Vec4.fromRect() class method.
 *
 * @deprecated
 * @param domRect
 * @returns {Vec4}
 */

function convertDomRectToObject(domRect) {
  return _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"].fromRect(domRect);
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
      constrain = _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"].fromRect(constrain.getBoundingClientRect());
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
 * @return {Vec4}
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
      height = rect.bottom - rect.top; // The user can pass a vec4 with left, top, right and bottom properties.  The value can either be the desired
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


  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"](rect.left + position.left, rect.top + position.top, rect.left + position.right, rect.top + position.bottom);
}
/**
 * Returns the distance in between the provided Vec4 objects.  If the objects are touching or overlapping 0
 * will be returned.
 *
 * @param rect1 {{left, top, right, bottom}}
 * @param rect2 {{left, top, right, bottom}}
 * @returns {Number}
 */

function getDistanceBetweenRects(rect1, rect2) {
  var vec1 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"].fromRect(rect1),
      vec2 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec4"].fromRect(rect2);
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

/***/ }),

/***/ "./src/core/utility.js":
/*!*****************************!*\
  !*** ./src/core/utility.js ***!
  \*****************************/
/*! exports provided: clamp, firstValue, all, any, proto, randomChoice, arraysEqual, parseHTML, isEmptyObject, emptyElement, addClasses, removeClasses, setElementOffset, getElementOffset, getScroll, isWindow, setScroll, selectElement, assert, parseBooleanOrInt, parseBooleanOrFloat, parseBoolean, parseIntValue, parseFloatValue, parseAny, validateChoice, choice, findChild, filterChildren, getOwnProperty, getPropertyByPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstValue", function() { return firstValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return randomChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTML", function() { return parseHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return emptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return addClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return removeClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementOffset", function() { return setElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return getElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return getScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScroll", function() { return setScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectElement", function() { return selectElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBooleanOrInt", function() { return parseBooleanOrInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBooleanOrFloat", function() { return parseBooleanOrFloat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBoolean", function() { return parseBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIntValue", function() { return parseIntValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseFloatValue", function() { return parseFloatValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAny", function() { return parseAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateChoice", function() { return validateChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return choice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return findChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return filterChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnProperty", function() { return getOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return getPropertyByPath; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/core/errors.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var REG_WHITESPACE = /\s+/;
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
/**
 * Takes an iterable and returns the first none null or undefined value.
 * @param args
 */

function firstValue(args) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item !== null && item !== undefined) {
        return item;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
/**
 * Takes an iterable and returns true if all of the values are trueish.
 * @param iterable
 */

function all(iterable) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = iterable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (!item) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
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
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = iterable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var item = _step3.value;
      if (item) return true;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return false;
}
function proto(descriptor) {
  descriptor.placement = "prototype";
  return descriptor;
}
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
 * Parses an html string into a document fragment.
 *
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
 * Test to see if the variable is a window.
 * @param variable
 * @returns {boolean}
 */

function isWindow(variable) {
  return variable && _typeof(variable) === 'object' && setInterval in variable;
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
 * Asserts that a condition is true or raises an AssertionError.
 * @param condition - condition to check.
 * @param message - message on fail.
 * @throws AssertionError
 */

function assert(condition, message) {
  if (!condition) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_0__["AssertionError"](message);
  }
}
/**
 * Attempts to parse the value into a boolean value or a integer.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {boolean|number|*}
 */

function parseBooleanOrInt(value) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TypeError;

  var type = _typeof(value);

  if (type === 'boolean' || type === 'number') {
    return value;
  }

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  value = parseInt(value, radix);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into boolean or int.");
    } else {
      return defaultValue;
    }
  }

  return value;
}
/**
 * Attempts to parse the value into a boolean value or a float.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param defaultValue
 * @returns {boolean|number|*}
 */

function parseBooleanOrFloat(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeError;

  var type = _typeof(value);

  if (type === 'boolean' || type === 'number') {
    return value;
  }

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  value = parseFloat(value);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into boolean or int.");
    } else {
      return defaultValue;
    }
  }

  return value;
}
/**
 * Attempts for parse a boolean value from a string.  Returns the defaultValue on failure if provided.  Otherwise throws
 * a TypeError.
 * @param value
 * @param defaultValue
 * @returns {boolean|*}
 */

function parseBoolean(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeError;

  if (typeof value === 'boolean') {
    return value;
  } else if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into boolean.");
    } else {
      return defaultValue;
    }
  }
}
/**
 * Attempts to parse a string into an integer.  Returns the default value on failure if set.  Otherwise throws a
 * TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {number}
 */

function parseIntValue(value) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TypeError;
  value = parseInt(value, radix);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into integer.");
    } else {
      // noinspection JSValidateTypes
      return defaultValue;
    }
  }

  return value;
}
/**
 * Attempts to parse a string into an integer.  Returns the default value on failure if set.  Otherwise throws a
 * TypeError.
 * @param value
 * @param defaultValue
 * @returns {number}
 */

function parseFloatValue(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeError;
  value = parseFloat(value);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into float.");
    } else {
      // noinspection JSValidateTypes
      return defaultValue;
    }
  }

  return value;
}
/**
 * Runs multiple parsers and returns the first one that doesn't throw a TypeError.
 * @param value
 * @param parsers
 * @returns {*}
 */

function parseAny(value) {
  for (var _len = arguments.length, parsers = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    parsers[_key - 1] = arguments[_key];
  }

  for (var _i = 0; _i < parsers.length; _i++) {
    var parser = parsers[_i];

    try {
      return parser(value);
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
    }
  }

  throw new TypeError("Could not parse value.");
}
/**
 * Validates that the value is one of the given choices.
 * @param value
 * @param choices
 * @param defaultValue
 * @returns {TypeErrorConstructor|*}
 */

function validateChoice(value, choices) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TypeError;

  if (choices.indexOf(value) === -1) {
    if (defaultValue === TypeError) {
      throw new TypeError("Invalid choice.");
    } else {
      return defaultValue;
    }
  }

  return value;
}
function choice() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (value) {
    if (args.indexOf(value) === -1) {
      throw new TypeError("Invalid Choice");
    }

    return value;
  };
}
/**
 * Returns first child element that matches the test function.
 * @param element - Parent element
 * @param fn - Test Function
 * @returns {Element}
 */

function findChild(element, fn) {
  for (var i = 0, l = element.children.length; i < l; i++) {
    var child = element.children[i];

    if (fn(child)) {
      return child;
    }
  }
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
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = parts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var part = _step4.value;
      r = r[part];
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return r;
}

/***/ }),

/***/ "./src/core/vectors.js":
/*!*****************************!*\
  !*** ./src/core/vectors.js ***!
  \*****************************/
/*! exports provided: Vec2, Vec3, Vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return Vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return Vec3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return Vec4; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./src/core/utility.js");
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

    this[0] = x;
    this[1] = y;
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
    }
  }, {
    key: "multiply",
    value: function multiply(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] * vec2, this[1] * vec2);
      } else {
        return new Vec2(this[0] * vec2[0], this[1] * vec2[1]);
      }
    }
  }, {
    key: "divide",
    value: function divide(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] / vec2, this[1] / vec2);
      } else {
        return new Vec2(this[0] / vec2[0], this[1] / vec2[1]);
      }
    }
  }, {
    key: "mod",
    value: function mod(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] % vec2, this[1] % vec2);
      } else {
        return new Vec2(this[0] % vec2[0], this[1] % vec2[1]);
      }
    }
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
    }
  }, {
    key: "clone",
    value: function clone() {
      return Vec2(this[0], this[1]);
    }
  }, {
    key: "toTranslate",
    value: function toTranslate() {
      return "translate(".concat(this.x, "px, ").concat(this.y, "px)");
    }
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
    key: "top",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
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
    }
  }, {
    key: "divide",
    value: function divide(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] / vec3, this[1] / vec3, this[2] / vec3);
      } else {
        return new Vec3(this[0] / vec3[0], this[1] / vec3[1], this[2] / vec3[2]);
      }
    }
  }, {
    key: "multiply",
    value: function multiply(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] * vec3, this[1] * vec3, this[2] * vec3);
      } else {
        return new Vec3(this[0] * vec3[0], this[1] * vec3[1], this[2] * vec3[2]);
      }
    }
  }, {
    key: "equals",
    value: function equals(vec3) {
      return vec3 === this || vec3[0] === this[0] && vec3[1] === this[1] && vec3[2] === this[2];
    }
  }, {
    key: "mod",
    value: function mod(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] % vec3, this[1] % vec3, this[2] % vec3);
      } else {
        return new Vec3(this[0] % vec3[0], this[1] % vec3[1], this[2] % vec3[2]);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
  }, {
    key: "toHex",
    value: function toHex() {
      var r = this.r.toString(16),
          g = this.g.toString(16),
          b = this.b.toString(16);
      return "#".concat(r).concat(g).concat(b);
    }
  }, {
    key: "toRGB",
    value: function toRGB() {
      return "rgb(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ")");
    }
  }, {
    key: "toTranslate3d",
    value: function toTranslate3d() {
      return "translate3d(".concat(this.x, "px, ").concat(this.y, "px, ").concat(this.z, "px)");
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
    }
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
    value: function set(value) {
      if (_typeof(value) !== 'object') {
        this[0] = value;
        this[1] = value;
        this[2] = value;
        this[3] = value;
      } else {
        this[0] = value[0];
        this[1] = value[1];
        this[2] = value[2];
        this[3] = value[3];
      }
    }
  }, {
    key: "add",
    value: function add(rect) {
      if (typeof rect === 'number') {
        return new Vec4(this[0] + rect, this[1] + rect, this[2] + rect, this[3] + rect);
      } else {
        return new Vec4(this[0] + rect[0], this[1] + rect[1], this[2] + rect[2], this[3] + rect[3]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(rect) {
      if (typeof rect === 'number') {
        return new Vec4(this[0] - rect, this[1] - rect, this[2] - rect, this[3] - rect);
      } else {
        return new Vec4(this[0] - rect[0], this[1] - rect[1], this[2] - rect[2], this[3] - rect[3]);
      }
    }
  }, {
    key: "divide",
    value: function divide(rect) {
      if (typeof rect === 'number') {
        return new Vec4(this[0] / rect, this[1] / rect, this[2] / rect, this[3] / rect);
      } else {
        return new Vec4(this[0] / rect[0], this[1] / rect[1], this[2] / rect[2], this[3] / rect[3]);
      }
    }
  }, {
    key: "multiply",
    value: function multiply(rect) {
      if (typeof rect === 'number') {
        return new Vec4(this[0] * rect, this[1] * rect, this[2] * rect, this[3] * rect);
      } else {
        return new Vec4(this[0] * rect[0], this[1] * rect[1], this[2] * rect[2], this[3] * rect[3]);
      }
    }
  }, {
    key: "equals",
    value: function equals(rect) {
      return rect === this || rect[0] === this[0] && rect[1] === this[1] && rect[2] === this[2] && rect[3] === this[3];
    }
  }, {
    key: "mod",
    value: function mod(rect) {
      if (typeof rect === 'number') {
        return new Vec4(this[0] % rect, this[1] % rect, this[2] % rect, this[3] % rect);
      } else {
        return new Vec4(this[0] % rect[0], this[1] % rect[1], this[2] % rect[2], this[3] % rect[3]);
      }
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (_typeof(x) === 'object') {
        y = x.y;
        x = x.x;
      }

      return new Vec4(this[0] + x, this[1] + y, this[2] + x, this[3] + y);
    }
  }, {
    key: "moveTo",
    value: function moveTo(vec2) {
      var deltaX = vec2.left - this.left,
          deltaY = vec2.top - this.top;
      return new Vec4(this.left + deltaX, this.top + deltaY, this.right + deltaX, this.bottom + deltaY);
    }
  }, {
    key: "intersection",
    value: function intersection(rect) {
      var left = Math.max(this.left, rect.left),
          right = Math.min(this.right, rect.right),
          bottom = Math.min(this.bottom, rect.bottom),
          top = Math.max(this.top, rect.top);

      if (left > right || top > bottom) {
        return null;
      }

      return new Vec4(left, top, right, bottom);
    }
  }, {
    key: "toRGBA",
    value: function toRGBA() {
      return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.a, ")");
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec4(this[0], this[1], this[2], this[3]);
    }
  }, {
    key: "contains",
    value: function contains(rect) {
      return this.left <= rect.left && this.right >= rect.right && this.top <= rect.top && this.bottom >= rect.bottom;
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      return new Vec2(this[0], this[1]);
    }
  }, {
    key: "getArea",
    value: function getArea() {
      return this.width * this.height;
    }
  }, {
    key: "isXOverlapping",
    value: function isXOverlapping(vec4) {
      return vec4.left <= this.right && vec4.right >= this.left;
    }
  }, {
    key: "isYOverlapping",
    value: function isYOverlapping(vec4) {
      return vec4.top <= this.bottom && vec4.bottom >= this.top;
    }
  }, {
    key: "width",
    get: function get() {
      return this.right - this.left;
    }
  }, {
    key: "height",
    get: function get() {
      return this.bottom - this.top;
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
    key: "fromRect",
    value: function fromRect(_ref) {
      var left = _ref.left,
          top = _ref.top,
          right = _ref.right,
          bottom = _ref.bottom;
      return new Vec4(left, top, right, bottom);
    }
  }, {
    key: "fromRGBAObject",
    value: function fromRGBAObject(_ref2) {
      var r = _ref2.r,
          g = _ref2.g,
          b = _ref2.b,
          a = _ref2.a;
      return new Vec4(r, g, b, a);
    }
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

/***/ "./src/ui/Draggable.js":
/*!*****************************!*\
  !*** ./src/ui/Draggable.js ***!
  \*****************************/
/*! exports provided: cursor, clone, CONTAINERS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINERS", function() { return CONTAINERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
/* harmony import */ var core_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/Animation */ "./src/core/Animation.js");
/* harmony import */ var core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/data */ "./src/core/data.js");
/* harmony import */ var core_position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/position */ "./src/core/position.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Draggable option for offset that offsets the position by the cursor.
 *
 * @param clientX
 * @param clientY
 * @param boundingRect
 * @returns {{x, y}}
 */

function cursor(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY,
      boundingRect = _ref.boundingRect;
  return {
    x: boundingRect.left - clientX,
    y: boundingRect.top - clientY
  };
}
/**
 * Draggable option that clones the draggable element for the helper element.
 *
 * @param opacity
 * @returns {function(*): (ActiveX.IXMLDOMNode | Node)}
 */

function clone() {
  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (draggable) {
    var helper = draggable.element.cloneNode(true);

    if (opacity !== null) {
      helper.style.opacity = opacity;
    }

    return helper;
  };
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
/**
 * Sets the target elements x and y position by setting the translate3d translation matrix.
 *
 * @param target
 * @param x
 * @param y
 * @private
 */


function _translate(target, x, y) {
  target.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
} // Group of function that can be passed to Draggables container property that will contain a dragged element to within
// the given parameters.  Function should return a rect with {left, top, width, and height} properties relative to the
// client.  Similiar to Element.getBoundingClientRect().


var CONTAINERS = {
  /**
   * Constrains to client area.
   * @returns {{top: number, left: number, width: number, height: number}}
   */
  client: function client() {
    return {
      left: 0,
      top: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      right: window.innerWidth,
      bottom: window.innerHeight
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
      height: parent.scrollHeight
    };
  }
};
/**
 * Takes a bounding client rect and constrains the left and top position to within the container.  Returns a new rect.
 *
 * @param rect
 * @param container
 * @param element
 * @param helper
 * @returns {{top: *, left: *}}
 * @private
 */

function _clampPositionToContainer(rect, container, element, helper) {
  var bb = helper.getBoundingClientRect();
  var x = rect.left,
      y = rect.top;

  if (container) {
    if (typeof container === 'function') {
      container = container(element, helper);
    } else if (container.getBoundingClientRect) {
      container = container.getBoundingClientRect();
    } else {
      container = element.closest(container);
      container = container.getBoundingClientRect();
    }

    if (container) {
      x = Object(core_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(x, container.left, container.left + container.width - bb.width);
      y = Object(core_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(y, container.top, container.top + container.height - bb.height);
    }
  }

  return _objectSpread({}, rect, {
    left: x,
    top: y
  });
} // Group of function that can be passed to the tolerance property of Draggable to control when an item is considered
// intersecting another for drop events.


var TOLERANCE_FUNCTIONS = {
  intersect: function intersect(droppable, item) {
    var origin = {
      x: item.left + item.width / 2,
      y: item.top + item.height / 2
    };
    return origin.x >= droppable.left && origin.x <= droppable.right && origin.y >= droppable.top && origin.y <= droppable.bottom;
  }
};
/**
 * Behavior class to add the draggable behavior to an element for group of elements.
 */

var Draggable =
/*#__PURE__*/
function () {
  /**
   * @param element {Element|String} The element to attach the draggable behavior to.
   * @param container {string|CONTAINERS.client|CONTAINERS.viewport|function}
   *  Constrains the draggable into the given area.
   *  `container` can either be a css selector to match a parent element, a Function(element, helper)
   *  that should return a bounding box.  Or an element who's bounding box will be used.
   * @param axis {'x'|'y'|'xy'}
   *  Controls what axis the item is draggable.  x can be dragged horizontally, y vertically, and xy can be freely dragged.
   * @param exclude {String}
   *  Prevents dragging from starting on matching elements.
   * @param delay {Number}
   *  The time in milliseconds after the mouse down event occurs that dragging will begin.
   * @param offset {{x, y}|[x, y]|Function}
   *  By default when an item is dragged is position will be set relative to the drop left corner of the item.
   *  Offset is used to offset the element from the cursor.  You can pass an {x, y} object, an array with [x, y] pair,
   *  or a Function({target, draggable, clientX, clientY, boundingRect}) that will be called that return an {x, y} object.
   * @param disabled {Boolean}
   *  Disables dragging.
   * @param distance {Number}
   *  Adds resistance to drag starting.  The users must move at least `distance` amount of pixels away from the
   *  starting position for drag to start.
   * @param handle {String}
   *  If dragging will only start if the user clicks an element that matches the css selectors.
   * @param helper {Function|Element}
   *  An element to use as a helper for dragging.  Can be a Element or a Function that returns an element.
   * @param revert {Number|Boolean}
   *  Controls if the draggable reverts back to the starting position if no droppable accepts the target.
   * @param scroll {Number}
   *  Controls the speed that the draggable will scroll the scrollParent when the draggable leaves the viewable area.
   * @param selector {String}
   *  Used to delegate dragging to sub items.
   * @param droppables
   *  An array of css selectors or elements that will be used as drop targets for the draggable.
   * @param tolerance {String}
   *  Controls the function that determines if an item intersects a drop target.
   * @param setHelperSize {Boolean}
   *  If true the helpers width and height will be set by javascript to match the original element.
   * @param grid {{x, y} | [x, y] | Number}
   *  Snaps draggable movement to a grid with the given x, y dimensions.
   */
  function Draggable(element) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$container = _ref2.container,
        container = _ref2$container === void 0 ? null : _ref2$container,
        _ref2$axis = _ref2.axis,
        axis = _ref2$axis === void 0 ? 'xy' : _ref2$axis,
        _ref2$exclude = _ref2.exclude,
        exclude = _ref2$exclude === void 0 ? "input, button, select, .js-no-drag, textarea" : _ref2$exclude,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? null : _ref2$delay,
        _ref2$offset = _ref2.offset,
        offset = _ref2$offset === void 0 ? cursor : _ref2$offset,
        _ref2$disabled = _ref2.disabled,
        disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
        _ref2$distance = _ref2.distance,
        distance = _ref2$distance === void 0 ? null : _ref2$distance,
        _ref2$handle = _ref2.handle,
        handle = _ref2$handle === void 0 ? null : _ref2$handle,
        _ref2$helper = _ref2.helper,
        helper = _ref2$helper === void 0 ? null : _ref2$helper,
        _ref2$revert = _ref2.revert,
        revert = _ref2$revert === void 0 ? null : _ref2$revert,
        _ref2$scroll = _ref2.scroll,
        scroll = _ref2$scroll === void 0 ? null : _ref2$scroll,
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === void 0 ? null : _ref2$selector,
        _ref2$droppables = _ref2.droppables,
        droppables = _ref2$droppables === void 0 ? null : _ref2$droppables,
        _ref2$tolerance = _ref2.tolerance,
        tolerance = _ref2$tolerance === void 0 ? 'intersect' : _ref2$tolerance,
        _ref2$setHelperSize = _ref2.setHelperSize,
        setHelperSize = _ref2$setHelperSize === void 0 ? false : _ref2$setHelperSize,
        _ref2$grid = _ref2.grid,
        grid = _ref2$grid === void 0 ? null : _ref2$grid;

    _classCallCheck(this, Draggable);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    this._onMouseDown = this.onMouseDown.bind(this);
    this.disabled = disabled;
    this.helper = helper;
    this.offset = offset;
    this.axis = axis;
    this.delay = delay;
    this.distance = distance;
    this.container = container;
    this.handle = handle;
    this.exclude = exclude;
    this.revert = revert;
    this.selector = selector;
    this.droppables = [];
    this.tolerance = tolerance;
    this.setHelperSize = setHelperSize;
    this.scroll = scroll;

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

    if (droppables) {
      this.addDroppables(droppables);
    }

    this.element.addEventListener('mousedown', this._onMouseDown);
    this.isDragging = false;
    this._revertFX = null;
  }
  /**
   * Adds a drop target item.  A `droppable` can be an element, a css selector or an array of those.
   * @param droppables
   */


  _createClass(Draggable, [{
    key: "addDroppables",
    value: function addDroppables(droppables) {
      if (Array.isArray(droppables)) {
        this.droppables = this.droppables.concat(droppables);
      } else {
        this.droppables.push(droppables);
      }
    }
    /**
     * Responsible for detecting dragging and starting the drag depending on delay and distance.
     * @param event
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var _this = this;

      var element = this.element;

      if (this.selector) {
        element = event.target.closest(this.selector);

        if (!this.element.contains(element)) {
          element = null;
        }
      }

      if (!element) return;
      var data = core_data__WEBPACK_IMPORTED_MODULE_2__["privateCache"].cache(element);

      if (data.isDragging || this.disabled) {
        return;
      }

      if (this.handle) {
        var handle = event.target.closest(this.handle);

        if (!handle || !element.contains(handle)) {
          return;
        }
      }

      if (this.exclude) {
        var excluded = event.target.closest(this.exclude);

        if (excluded && element.contains(excluded)) {
          return;
        }
      }

      event.preventDefault();
      var distance = this.distance || 0,
          delay = typeof this.delay === 'number' ? this.delay : -1,
          doc = document,
          startMouseDocumentX = event.clientX + window.scrollX,
          startMouseDocumentY = event.clientY + window.scrollY,
          mouseDocumentX = startMouseDocumentX,
          mouseDocumentY = startMouseDocumentY; // Tests to see that delay and distance was met before dragging.

      var startDragging = function startDragging() {
        if (distance === 0 && delay < 0) {
          _this.startDrag(element, startMouseDocumentX, startMouseDocumentY, mouseDocumentX, mouseDocumentY);
        }
      }; // Delay dragging.


      if (delay >= 0) {
        var timer;

        var onTimeout = function onTimeout() {
          delay = -1;
          doc.removeEventListener('mouseup', onMouseUp);
          startDragging();
        };

        var onMouseUp = function onMouseUp() {
          doc.removeEventListener('mouseup', onMouseUp);
          clearTimeout(timer);
        };

        doc.addEventListener('mouseup', onMouseUp);
        timer = setTimeout(onTimeout, delay);
      } // Delay by distance.


      if (distance > 0) {
        var _onMouseUp = function _onMouseUp() {
          doc.removeEventListener('mouseup', _onMouseUp);
          doc.removeEventListener('mousemove', onMouseMove);
        };

        var onMouseMove = function onMouseMove(event) {
          mouseDocumentX = event.clientX + window.scrollX;
          mouseDocumentY = event.clientY + window.scrollY;
          var delta = Math.sqrt(Math.pow(mouseDocumentX - startMouseDocumentX, 2) + Math.pow(mouseDocumentY - startMouseDocumentY, 2));

          if (delta > distance) {
            distance = 0;
            doc.removeEventListener('mouseup', _onMouseUp);
            doc.removeEventListener('mousemove', onMouseMove);
            startDragging();
          }
        };

        doc.addEventListener('mouseup', _onMouseUp);
        doc.addEventListener('mousemove', onMouseMove);
      }

      startDragging();
    }
    /**
     * Starts the drag animation at the given x, y origin.
     *
     * @param element
     * @param startMouseX
     * @param startMouseY
     * @param posX
     * @param posY
     */

  }, {
    key: "startDrag",
    value: function startDrag(element, startMouseX, startMouseY, posX, posY) {
      var _this2 = this;

      if (this.isDragging) {
        return;
      }

      this.isDragging = true; // Cancel any animation that are running.

      if (this._revertFX) {
        this._revertFX.cancel();

        this._revertFX = null;
      }

      var doc = document,
          target,
          droppables = this.getDropTargets(),
          startBoundingBox = element.getBoundingClientRect(),
          startBBDocument = Object(core_position__WEBPACK_IMPORTED_MODULE_3__["clientRectToDocumentSpace"])(startBoundingBox),
          helper,
          _scrollTick;

      if (!this.helper || this.helper === 'self') {
        target = element;
      } else if (typeof this.helper === 'function') {
        target = this.helper(this);
        helper = target;
      } else if (this.helper) {
        target = this.helper;
        helper = target;
      }

      if (helper) {
        if (this.setHelperSize) {
          if (this.setHelperSize === true) {
            helper.style.width = "".concat(startBoundingBox.width, "px");
            helper.style.height = "".concat(startBoundingBox.height, "px");
            helper.style.boxSizing = 'border-box';
          } else if (Array.isArray(this.setHelperSize)) {
            helper.style.width = "".concat(this.setHelperSize[0], "px");
            helper.style.height = "".concat(this.setHelperSize[1], "px");
          } else {
            helper.style.width = "".concat(this.setHelperSize.width, "px");
            helper.style.height = "".concat(this.setHelperSize.height, "px");
          }
        }
      } // If the target doesn't have a parentElement it needs to be added to the page.


      if (!target.parentElement) {
        element.parentElement.appendChild(target);
      } // mouseOffsetX and mouseOffsetY is the mouses offset relative to the top left corner of the element
      // being dragged.
      // offsetX and offsetY is how much the dragged element is offset from the cursor.
      // By default it is at the top left of the element.


      var startingTranslation = Object(core_position__WEBPACK_IMPORTED_MODULE_3__["getTranslation"])(target),
          offset = {
        x: 0,
        y: 0
      }; // The offset property controls how much the dragged element is offset from top left corner of the element.
      // By default it is [0, 0] but a function can be or array can be passed to control this behavior.

      if (this.offset) {
        var _offset = this.offset;

        if (typeof _offset === 'function') {
          offset = this.offset({
            target: target,
            draggable: this,
            clientX: startMouseX - window.scrollX,
            clientY: startMouseY - window.scrollY,
            boundingRect: startBoundingBox
          });
        }
      } // Offset should be {x, y} not an array.


      if (Array.isArray(offset)) {
        offset = {
          x: offset[0],
          y: offset[1]
        };
      }

      var onMouseMove = function onMouseMove(event) {
        event.preventDefault();

        var startingRect = target.getBoundingClientRect(),
            position = _this2._getPosition(element, target, event.clientX, event.clientY, offset, _this2.container),
            dropData;

        Object(core_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, position, 'translate3d');
        dropData = _this2._getDropData(droppables, startingRect, position);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = dropData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var droppable = _step.value;

            if (!droppable.intersectsBefore && droppable.intersectsAfter) {
              // drag-enter
              var _event = new CustomEvent('drag-enter', {
                bubbles: true,
                detail: {
                  draggable: _this2,
                  item: target
                }
              });

              droppable.target.dispatchEvent(_event);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this2._triggerEvent(element, 'drag-move', {
          mouseX: event.clientX + window.scrollX,
          mouseY: event.clientY + window.scrollY,
          clientX: event.clientX,
          clientY: event.clientY,
          startMouseX: startMouseX,
          startMouseY: startMouseY,
          offset: offset,
          helper: target,
          originalEvent: event
        }); // Refresh dropData incase something moved.


        dropData = _this2._getDropData(droppables, startingRect, position);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = dropData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _droppable = _step2.value;

            if (_droppable.intersectsBefore && !_droppable.intersectsAfter) {
              // drag-leave
              var _event2 = new CustomEvent('drag-leave', {
                bubbles: true,
                detail: {
                  draggable: _this2,
                  item: target
                }
              });

              _droppable.target.dispatchEvent(_event2);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (_this2.scroll && !_scrollTick) {
          var parent = _getScrollParent(element);

          if (parent) {
            var lastTick = performance.now(),
                scrollX = parent.scrollLeft,
                scrollY = parent.scrollTop;

            _scrollTick = function scrollTick(timestamp) {
              var parentBB = parent.getBoundingClientRect(),
                  helperBB = target.getBoundingClientRect(),
                  x,
                  y,
                  delta = timestamp - lastTick,
                  isOOB = false;
              lastTick = timestamp;

              if (helperBB.right > parentBB.right) {
                x = (helperBB.right - parentBB.right) / helperBB.width;
                isOOB = true;
                scrollX += delta * x * _this2.scroll;
                parent.scrollLeft = scrollX;
              } else if (helperBB.left < parentBB.left) {
                x = (parentBB.left - helperBB.left) / helperBB.width;
                isOOB = true;
                scrollX -= delta * x * _this2.scroll;
                parent.scrollLeft = scrollX;
              }

              if (helperBB.bottom > parentBB.bottom) {
                y = (helperBB.bottom - parentBB.bottom) / helperBB.height;
                isOOB = true;
                scrollY += delta * y * _this2.scroll;
                parent.scrollTop = scrollY;
              } else if (helperBB.top < parentBB.top) {
                y = (parentBB.top - helperBB.top) / helperBB.height;
                isOOB = true;
                scrollY -= delta * y * _this2.scroll;
                parent.scrollTop = scrollY;
              }

              helperBB = _clampPositionToContainer(helperBB, _this2.container, element, target);
              Object(core_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, helperBB, 'translate3d');

              if (isOOB && _this2.isDragging) {
                window.requestAnimationFrame(_scrollTick);
              } else {
                _scrollTick = null;
              }
            };

            window.requestAnimationFrame(_scrollTick);
          }
        }
      };

      var onMouseUp = function onMouseUp(event) {
        event.preventDefault();
        doc.removeEventListener('mousemove', onMouseMove);
        doc.removeEventListener('mouseup', onMouseUp);
        doc = null;
        _this2.isDragging = false;
        element.classList.remove('ui-dragging');

        var startingRect = target.getBoundingClientRect(),
            position = _this2._getPosition(element, target, event.clientX, event.clientY, offset, _this2.container),
            translation = Object(core_position__WEBPACK_IMPORTED_MODULE_3__["getTranslation"])(target),
            accepted = null;

        function accept(element) {
          if (!accepted) {
            accepted = element;
          } else {
            throw new Error("Draggable has already been accepted.");
          }
        }

        function isAccepted() {
          return !!accepted;
        }

        _this2._triggerEvent(element, 'drag-end', {
          startX: startMouseX - window.scrollX,
          startMouseY: startMouseY,
          offset: offset,
          clientX: event.clientX,
          clientY: event.clientY,
          originalEvent: event,
          helper: target,
          accept: accept,
          isAccepted: isAccepted
        }, true, {
          accept: accept,
          isAccepted: isAccepted
        });

        if (!accepted && _this2.revert === true) {
          _translate(target, startingTranslation.x, startingTranslation.y);

          if (target !== element && target.parentElement) {
            target.parentElement.removeChild(target);
          }

          _this2._triggerEvent(element, 'drag-complete');
        } else if (!accepted && typeof _this2.revert === 'number') {
          var animation = new core_Animation__WEBPACK_IMPORTED_MODULE_1__["default"]({
            left: translation.x + (position.left - startingRect.left),
            top: translation.y + (position.top - startingRect.top)
          }, {
            left: startingTranslation.x,
            top: startingTranslation.y
          }, _this2.revert, {
            onFrame: function onFrame(fx) {
              _translate(target, fx.frame.left, fx.frame.top);
            },
            onComplete: function onComplete() {
              if (target !== element && target.parentElement) {
                target.parentElement.removeChild(target);
              }

              _this2._triggerEvent(element, 'drag-complete');
            },
            onCancel: function onCancel() {
              if (target !== element && target.parentElement) {
                target.parentElement.removeChild(target);
              }
            }
          });
          animation.play();
          _this2._revertFX = animation;
        } else {
          if (target !== element && target.parentElement) {
            target.parentElement.removeChild(target);
          }

          Object(core_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(element, position, 'translate3d');

          var _startingRect = Object(core_position__WEBPACK_IMPORTED_MODULE_3__["documentRectToClientSpace"])(startBBDocument),
              dropped = [];

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = droppables[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var droppable = _step3.value;

              if (_this2._intersects(element.dataset.tolerance, droppable.getBoundingClientRect(), position)) {
                var dropEvent = new CustomEvent('drop', {
                  bubbles: true,
                  detail: {
                    draggable: _this2,
                    originalEvent: event,
                    startingBoundingClientRect: _startingRect,
                    droppable: droppable
                  }
                });
                dropEvent.clientX = event.clientX;
                dropEvent.clientY = event.clientY;
                dropEvent.relatedTarget = element;
                droppable.dispatchEvent(dropEvent);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          _this2._triggerEvent(element, 'drag-complete', {
            dropped: dropped
          });
        }
      };

      doc.addEventListener('mousemove', onMouseMove);
      doc.addEventListener('mouseup', onMouseUp);
      element.classList.add('ui-dragging');

      this._triggerEvent(element, 'drag-start', {
        startMouseY: startMouseY,
        startMouseX: startMouseX,
        offset: offset,
        mouseX: posX,
        mouseY: posY,
        clientX: posX - window.scrollX,
        clientY: posY - window.scrollY,
        helper: target
      });
    }
    /**
     * Gets an array of elements of all the drop targets.
     * If the drop target is a string, it queries for those elements.
     *
     * @returns {Array}
     */

  }, {
    key: "getDropTargets",
    value: function getDropTargets() {
      var r = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.droppables[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var droppable = _step4.value;

          var type = _typeof(droppable);

          if (type === 'string') {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = document.querySelectorAll(droppable)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var target = _step5.value;
                if (r.indexOf(target) !== -1) continue;
                r.push(target);
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          } else if (type === 'function') {
            droppable = droppable.call(this, this);
            if (r.indexOf(droppable) !== -1) continue;
            r.push(droppable);
          } else {
            if (r.indexOf(droppable) !== -1) continue;
            r.push(droppable);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return r;
    }
    /**
     * Takes an array of drop targets and tests to see if the target intersects the start and ending rectangles.
     *
     * Rects are objects that have the left, right, top, bottom, width and height properties defined.
     * Similar to the results received from Element.getBoundingClientRect().
     *
     * @param droppables - Array of elements to tests.
     * @param startingRect - Starting rect.
     * @param endingRect - Ending rect.
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getDropData",
    value: function _getDropData(droppables, startingRect, endingRect) {
      var dropData = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = droppables[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var droppable = _step6.value;
          // Convert to client space.
          var dropBox = droppable.getBoundingClientRect();

          var intersectsBefore = this._intersects(droppable.dataset.tolerance, dropBox, startingRect),
              intersectsAfter = this._intersects(droppable.dataset.tolerance, dropBox, endingRect);

          dropData.push(_objectSpread({
            intersectsBefore: intersectsBefore,
            intersectsAfter: intersectsAfter,
            target: droppable
          }, dropBox));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return dropData;
    }
    /**
     * Triggers an event on the current item.
     *
     * @param item
     * @param eventName
     * @param details
     * @param bubbles
     * @param assign
     * @private
     */

  }, {
    key: "_triggerEvent",
    value: function _triggerEvent(item, eventName, details) {
      var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var assign = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      details = _objectSpread({
        draggable: this,
        item: item
      }, details);
      var event = new CustomEvent(eventName, {
        bubbles: bubbles,
        detail: details
      });

      if (assign) {
        Object.assign(event, assign);
      }

      item.dispatchEvent(event);
    }
    /**
     * Tests to see if the item intersects the droppable with the given tolerance function.
     *
     * @param tolerance
     * @param droppable
     * @param item
     * @returns {*}
     * @private
     */

  }, {
    key: "_intersects",
    value: function _intersects(tolerance, droppable, item) {
      tolerance = tolerance || this.tolerance;
      return TOLERANCE_FUNCTIONS[tolerance](droppable, item);
    }
    /**
     * Retrieves the expected bound box of the helper element at the given mouse coordinates.
     *
     * @param element
     * @param helper
     * @param clientX
     * @param clientY
     * @param offset
     * @param container
     * @returns {{top: *, left: *, bottom: *, width: number, right: *, height: number, target: *}}
     */

  }, {
    key: "_getPosition",
    value: function _getPosition(element, helper, clientX, clientY, offset, container) {
      var bb = helper.getBoundingClientRect();
      var left = clientX + offset.x,
          top = clientY + offset.y;

      if (this.grid) {
        left = Object(core_position__WEBPACK_IMPORTED_MODULE_3__["snapToGrid"])(left, this.grid.x);
        top = Object(core_position__WEBPACK_IMPORTED_MODULE_3__["snapToGrid"])(top, this.grid.y);
      }

      var r = {
        left: left,
        top: top,
        width: bb.width,
        height: bb.height,
        right: left + bb.width,
        bottom: top + bb.height,
        target: helper
      };
      return _objectSpread({}, r, _clampPositionToContainer(r, container, element, helper));
    }
  }]);

  return Draggable;
}();

_defineProperty(Draggable, "CLONE", clone);

_defineProperty(Draggable, "OFFSET_CURSOR", cursor);



/***/ }),

/***/ "./src/ui/Sortable.js":
/*!****************************!*\
  !*** ./src/ui/Sortable.js ***!
  \****************************/
/*! exports provided: placeholder, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return placeholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sortable; });
/* harmony import */ var core_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/position */ "./src/core/position.js");
/* harmony import */ var _Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Draggable */ "./src/ui/Draggable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function placeholder(className) {
  var nodeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (element) {
    var placeholder = document.createElement(nodeName || element.nodeName),
        box = element.getBoundingClientRect();
    placeholder.style.boxSizing = "border-box";
    box.style.width = "".concat(box.width, "px");
    box.style.height = "".concat(box.height, "px");

    if (className) {
      placeholder.className = className;
    }
  };
}
/**
 * Creates a sortable list of items.
 */

var Sortable =
/*#__PURE__*/
function () {
  function Sortable(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$items = _ref.items,
        items = _ref$items === void 0 ? ".ui-sort-item" : _ref$items,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder,
        _ref$layout = _ref.layout,
        layout = _ref$layout === void 0 ? 'y' : _ref$layout,
        _ref$dropOnEmpty = _ref.dropOnEmpty,
        dropOnEmpty = _ref$dropOnEmpty === void 0 ? true : _ref$dropOnEmpty,
        _ref$accepts = _ref.accepts,
        accepts = _ref$accepts === void 0 ? null : _ref$accepts,
        _ref$setPlaceholderSi = _ref.setPlaceholderSize,
        setPlaceholderSize = _ref$setPlaceholderSi === void 0 ? false : _ref$setPlaceholderSi,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$axis = _ref.axis,
        axis = _ref$axis === void 0 ? 'xy' : _ref$axis,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? null : _ref$exclude,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? null : _ref$delay,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? _Draggable__WEBPACK_IMPORTED_MODULE_1__["cursor"] : _ref$offset,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === void 0 ? false : _ref$disabled,
        _ref$distance = _ref.distance,
        distance = _ref$distance === void 0 ? null : _ref$distance,
        _ref$handle = _ref.handle,
        handle = _ref$handle === void 0 ? null : _ref$handle,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$revert = _ref.revert,
        revert = _ref$revert === void 0 ? null : _ref$revert,
        _ref$scroll = _ref.scroll,
        scroll = _ref$scroll === void 0 ? null : _ref$scroll,
        _ref$droppables = _ref.droppables,
        droppables = _ref$droppables === void 0 ? null : _ref$droppables,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 'intersect' : _ref$tolerance,
        _ref$setHelperSize = _ref.setHelperSize,
        setHelperSize = _ref$setHelperSize === void 0 ? false : _ref$setHelperSize,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Sortable);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    this.draggable = new _Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](this.element, {
      container: container,
      axis: axis,
      exclude: exclude,
      delay: delay,
      offset: offset,
      disabled: disabled,
      distance: distance,
      handle: handle,
      helper: helper,
      revert: revert,
      scroll: scroll,
      selector: items,
      droppables: droppables,
      tolerance: tolerance,
      setHelperSize: setHelperSize,
      grid: grid
    });
    this.items = items;
    this.layout = layout;
    this.placeholder = placeholder;
    this.dropOnEmpty = dropOnEmpty;
    this.accepts = accepts;
    this.setPlaceholderSize = setPlaceholderSize;
    this.initEvents();
  }
  /**
   * Initializes event listeners.
   */


  _createClass(Sortable, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var placeholder,
          isOver = false,
          init = false,
          target; // Attaches temporary events when drag starts.

      var initialize = function initialize(event) {
        init = true;
        target = event.detail.item;
        target.addEventListener('drag-move', onDragMove);
        target.addEventListener('drag-complete', onDragComplete);
        target.addEventListener('sort-append', onSortAppend);
        var startBB = target.getBoundingClientRect();
        target.classList.add('ui-sorting');

        if (!placeholder && _this.placeholder) {
          if (typeof _this.placeholder === 'string') {
            placeholder = document.createElement(target.nodeName);
            placeholder.className = _this.placeholder;
          } else if (typeof _this.placeholder === 'function') {
            placeholder = _this.placeholder(target, _this);
          } else if (_this.placeholder === true) {
            placeholder = document.createElement(target.nodeName);
          } else {
            placeholder = _this.placeholder;
          }

          placeholder.classList.add('ui-placeholder');

          if (_this.setPlaceholderSize) {
            if (_this.setPlaceholderSize === true) {
              placeholder.style.width = "".concat(startBB.width, "px");
              placeholder.style.height = "".concat(startBB.height, "px");
              placeholder.style.boxSizing = 'border-box';
            } else if (Array.isArray(_this.setPlaceholderSize)) {
              placeholder.style.width = "".concat(_this.setPlaceholderSize[0], "px");
              placeholder.style.height = "".concat(_this.setPlaceholderSize[1], "px");
            } else {
              placeholder.style.width = "".concat(_this.setPlaceholderSize.width, "px");
              placeholder.style.height = "".concat(_this.setPlaceholderSize.height, "px");
            }
          }

          if (_this.element.contains(target)) {
            target.parentElement.insertBefore(placeholder, target);
          }
        }

        Object(core_position__WEBPACK_IMPORTED_MODULE_0__["setElementClientPosition"])(target, startBB, 'translate3d');
      }; // Cleanup after sorting finishes.


      var destroy = function destroy() {
        if (target) {
          target.removeEventListener('drag-move', onDragMove);
          target.removeEventListener('drag-complete', onDragComplete);
          target.removeEventListener('sort-append', onSortAppend);
          init = false;
          isOver = false;

          if (placeholder && placeholder.parentElement) {
            placeholder.parentElement.removeChild(placeholder);
          }

          placeholder = null;
          target.style.transform = "";
          target.classList.remove('ui-sorting');
          target = null;
        }
      }; // Ensures that the placeholder is removed if the item gets moves to another sortable.


      var onSortAppend = function onSortAppend(event) {
        if (event.detail !== _this && placeholder && placeholder.parentElement) {
          placeholder.parentElement.removeChild(placeholder);
        }
      }; // Moves the item to the correct position on mouse move.


      var onDragMove = function onDragMove(event) {
        if (!isOver || _this.accepts && !event.detail.item.matches(_this.accepts)) {
          return;
        }

        var target = event.detail.item,
            items = Array.prototype.slice.call(_this.getItems()).filter(function (i) {
          return i !== target;
        });

        var before = _this.getItemBeforePoint(event.detail.clientX, event.detail.clientY, items),
            after = _this.getItemAfterPoint(event.detail.clientX, event.detail.clientY, items),
            beforeBB = event.detail.helper.getBoundingClientRect(),
            dropOnEmpty = target.dataset.dropOnEmpty !== null && target.dataset.dropOnEmpty !== undefined ? target.dataset.dropOnEmpty === 'true' : _this.dropOnEmpty; // Allow overriding on item level.


        if (!items.length) {
          if (dropOnEmpty) {
            _this.element.appendChild(target);

            if (placeholder) target.parentElement.insertBefore(placeholder, target);

            _this._refreshPositions(event.detail.helper, beforeBB);

            _this._triggerSortAppendEvent(target);
          }
        } else if (before && before !== target) {
          before.parentElement.insertBefore(target, before.nextSibling);
          if (placeholder) target.parentElement.insertBefore(placeholder, target);

          _this._refreshPositions(event.detail.helper, beforeBB);

          _this._triggerSortAppendEvent(target);
        } else if (after && after !== target) {
          after.parentElement.insertBefore(target, after);
          if (placeholder) target.parentElement.insertBefore(placeholder, target);

          _this._refreshPositions(event.detail.helper, beforeBB);

          _this._triggerSortAppendEvent(target);
        }
      }; // Cleanup


      var onDragComplete = function onDragComplete() {
        destroy();
      }; // Initialize sorting.


      this.element.addEventListener('drag-enter', function (event) {
        if (_this.accepts && !event.detail.item.matches(_this.accepts)) {
          return;
        }

        isOver = true;

        if (!init) {
          initialize(event);
        }
      }); // Mark isOver state false.

      this.element.addEventListener('drag-leave', function () {
        isOver = false;
      }); // Initialize sorting that started on another sortable.

      this.element.addEventListener('drag-start', function (event) {
        if (!init) {
          initialize(event);
        }

        isOver = true;
      });
    }
    /**
     * Tests to see if the given (x, y) point is before or after the element.  Uses layout to determine if the test
     * is for the x layout, the y layout or the xy layout.
     * @param element
     * @param x
     * @param y
     * @returns {string|null}
     */

  }, {
    key: "getRelativePosition",
    value: function getRelativePosition(element, x, y) {
      var box = element.getBoundingClientRect(),
          mx = box.left + box.width / 2,
          my = box.top + box.height / 2;

      if (this.layout === 'x') {
        return mx < x ? 'after' : 'before';
      } else if (this.layout === 'y') {
        return my < y ? 'after' : 'before';
      } else if (this.layout === 'xy') {
        return box.bottom < y || mx < x && box.bottom >= y && box.top <= y ? 'after' : 'before';
      }

      return null;
    }
    /**
     * Returns the item immediately before the given x, y point.
     * @param x
     * @param y
     * @param items
     * @returns {*}
     */

  }, {
    key: "getItemBeforePoint",
    value: function getItemBeforePoint(x, y, items) {
      if (!items) items = this.getItems();
      var r = null;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (this.getRelativePosition(item, x, y) === 'after') {
          r = item;
        } else {
          break;
        }
      }

      if (r) {
        var box = r.getBoundingClientRect();

        if ((this.layout === 'x' || this.layout === 'xy') && box.top <= y && box.bottom >= y) {
          return r;
        } else if (this.layout === 'y' && box.left <= x && box.right >= x) {
          return r;
        }
      }
    }
    /**
     * Returns the item immediately after the given (x, y) point.
     * @param x
     * @param y
     * @param items
     * @returns {null|*}
     */

  }, {
    key: "getItemAfterPoint",
    value: function getItemAfterPoint(x, y, items) {
      if (!items) items = this.getItems();
      var r = null;

      for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];

        if (this.getRelativePosition(item, x, y) === 'before') {
          r = item;
        } else {
          break;
        }
      }

      if (r) {
        var box = r.getBoundingClientRect();

        if ((this.layout === 'x' || this.layout === 'xy') && box.top <= y && box.bottom >= y) {
          return r;
        } else if (this.layout === 'y' && box.left <= x && box.right >= x) {
          return r;
        }
      }

      return null;
    }
    /**
     * Returns a list of all items for the sortable.
     * @returns {NodeListOf<SVGElementTagNameMap[string]> | NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element>}
     */

  }, {
    key: "getItems",
    value: function getItems() {
      return this.element.querySelectorAll(this.items);
    }
    /**
     * helper method that translates the target to the provided client position.
     * @param target {{getBoundingClientRect, style} | Element}
     * @param position {{left[Number], top[Number]}}
     * @private
     */

  }, {
    key: "_refreshPositions",
    value: function _refreshPositions(target, position) {
      var current = target.getBoundingClientRect(),
          deltaLeft = current.left - position.left,
          deltaTop = current.top - position.top,
          translation = Object(core_position__WEBPACK_IMPORTED_MODULE_0__["getTranslation"])(target);
      target.style.transform = "translate3d(".concat(translation.x - deltaLeft, "px, ").concat(translation.y - deltaTop, "px, 0)");
    }
    /**
     * Triggers the default sort-append event on the target.
     * @param target {Element}
     * @private
     */

  }, {
    key: "_triggerSortAppendEvent",
    value: function _triggerSortAppendEvent(target) {
      var event = new CustomEvent('sort-append', {
        bubbles: false,
        detail: this
      });
      target.dispatchEvent(event);
    }
  }]);

  return Sortable;
}();



/***/ }),

/***/ "./tests/src/test_overlay.js":
/*!***********************************!*\
  !*** ./tests/src/test_overlay.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ui_Draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui/Draggable */ "./src/ui/Draggable.js");
/* harmony import */ var ui_Sortable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ui/Sortable */ "./src/ui/Sortable.js");
/* harmony import */ var core_Animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/Animation */ "./src/core/Animation.js");
/* harmony import */ var _src_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/core/data */ "./src/core/data.js");
/* harmony import */ var core_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/position */ "./src/core/position.js");






window.Animation = core_Animation__WEBPACK_IMPORTED_MODULE_2__["default"];
window.privateCache = _src_core_data__WEBPACK_IMPORTED_MODULE_3__["privateCache"];
window.test = new core_Animation__WEBPACK_IMPORTED_MODULE_2__["default"]({
  left: 0
}, {
  left: 200
}, 200000);
window.getTranslation = core_position__WEBPACK_IMPORTED_MODULE_4__["getTranslation"];
window.addEventListener('load', function () {
  window.draggableBox1 = new ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#test-draggable1", {
    container: ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client,
    helper: ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"].CLONE(0.5),
    revert: 1000
  });
  window.draggableWindow1 = new ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#test-window1", {
    container: ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client,
    handle: '.drag-handle'
  });
  window.draggableBox2 = new ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]('#drop-test1-droppable', {
    droppables: '#drop-zone-test1'
  });
  window.draggableScrollable = new ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector("#scroll-draggable-test"), {
    scroll: 1,
    container: ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].viewport
  });
  window.sortableGrid = new ui_Sortable__WEBPACK_IMPORTED_MODULE_1__["default"]("#sortable-grid", {
    layout: 'xy',
    setPlaceholderSize: true
  });
  window.sortableList1 = new ui_Sortable__WEBPACK_IMPORTED_MODULE_1__["default"]('#drag-list-test', {
    droppables: '.drop-list',
    placeholder: true,
    setPlaceholderSize: true
  });
  window.sortableList2 = new ui_Sortable__WEBPACK_IMPORTED_MODULE_1__["default"]('#drag-list-test2', {
    droppables: '.drop-list',
    placeholder: true,
    setPlaceholderSize: true
  });
  document.querySelector('#drop-zone-test1').addEventListener('drop', function (event) {
    event.target.style.backgroundColor = '#00ff00';
  });
});
window.addEventListener('mousemove', function (event) {
  var output = document.getElementById('mouse-pos-client-output');
  output.innerText = "(".concat(event.clientX, ", ").concat(event.clientY, ")");
  output = document.getElementById('document-position-output');
  output.innerText = "(".concat(event.clientX + window.scrollX, ", ").concat(event.clientY + window.scrollY, ")");
});

/***/ }),

/***/ 2:
/*!*****************************************!*\
  !*** multi ./tests/src/test_overlay.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./tests/src/test_overlay.js */"./tests/src/test_overlay.js");


/***/ })

/******/ });
});
//# sourceMappingURL=test_overlay.bundle.js.map