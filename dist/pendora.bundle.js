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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/autoloader.js":
/*!***************************!*\
  !*** ./src/autoloader.js ***!
  \***************************/
/*! exports provided: default, Toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toggle", function() { return Toggle; });
/* harmony import */ var _core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/data */ "./src/core/data.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var AutoLoader =
/*#__PURE__*/
function () {
  function AutoLoader() {
    _classCallCheck(this, AutoLoader);

    this.registry = {};
  }

  _createClass(AutoLoader, [{
    key: "register",
    value: function register(name, func) {
      if (this.registry.hasOwnProperty(name) && this.registry[name]) {
        throw new Error("Duplicate component registered");
      }

      this.registry[name] = func;
    }
  }, {
    key: "load",
    value: function load(context) {
      if (!context) {
        context = document;
      } else if (typeof context === 'string') {
        context = document.querySelector(context);
      }

      var widgets = context.querySelectorAll('[data-init]');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = widgets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;
          var components = element.dataset.init.split(/\s+/),
              windowBind = element.dataset.windowBind;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = components[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var c = _step2.value;
              var parts = c.split(':'),
                  cls = this.registry[parts[0]],
                  namespace = parts.length > 1 ? parts[1] : '',
                  key = namespace ? "".concat(parts[0], ".").concat(parts[1]) : parts[0];

              if (cls) {
                var initialized = _core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].get(element, 'initialized');

                if (!initialized) {
                  initialized = {};
                  _core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].set(element, 'initialized', initialized);
                }

                if (!initialized[key]) {
                  initialized[key] = cls(element);

                  if (windowBind) {
                    window[windowBind] = initialized[key];
                  }
                } // else component is already loaded do nothing.  Could be encountered if load is called multiple times.

              } else {
                throw new Error("No component registered called ".concat(key));
              }
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
    /**
     *  Registers a loader function will the global autoloader instance.
     *
     * @param name {String}
     * @param fn {function(HTMLElement) : Object}
     */

  }], [{
    key: "register",
    value: function register(name, fn) {
      return this.loader.register(name, fn);
    }
  }, {
    key: "load",
    value: function load(context) {
      return this.loader.load(context);
    }
  }, {
    key: "getInitializedInstance",
    value: function getInitializedInstance(element, name) {
      var initialized = _core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].get(element, 'initialized');

      if (initialized) {
        return initialized[name] || null;
      } else {
        return null;
      }
    }
  }]);

  return AutoLoader;
}();
/**
 * A UI class that adds the toggle behavior to an element.
 * The Toggle behavior is added using the autoloader using `data-init="toggle"` attribute.
 * It will target another element and attempt to call the toggle method of an initialized component.
 *
 * The toggle class takes two configuration attributes, data-target and data-toggle.
 *
 * data-target determines what element is targeted.  It takes a css selector that will be passed to document.querySelector().
 *
 * data-toggle determines the initialized component to toggle.  It takes the name of the component registered with AutoLoader.
 * For instance if you are toggling on a modal you should pass modal here.
 *
 * If the component does not offer a toggle method and another method needs to be called, you can set the optional
 * attribute data-method.  This attribute determines what method is called and defaults to the string toggle.
 *
 * Example Usage:
 *
 * <button type="button" data-init="toggle" data-target="#myModalId" data-toggle="modal">Show Modal</button>
 *
 * ---
 *
 * # Toggle classes on and off
 *
 * If you want to toggle a class on the target element on or off the toggle needs to be a css class string.  For
 * example to toggle the class "test" with a button you can use the following code:
 *
 * <button type="button" data-init="toggle" data-target="#mytarget" data-toggle=".test">Toggle Class</button>
 *
 * ---
 * # Target self
 *
 * If you an element to target itself, specify the string "self" as the target.
 *
 * <button type="button" data-init="toggle" data-target="self" data-toggle=".test">Toggle Class</button>
 */


_defineProperty(AutoLoader, "autoLoad", true);


var Toggle =
/*#__PURE__*/
function () {
  function Toggle(element) {
    var _this = this;

    _classCallCheck(this, Toggle);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    this._onClick = function (event) {
      _this.onClick(event);
    };

    this.element.addEventListener('click', this._onClick);
  }

  _createClass(Toggle, [{
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('click', this._onClick);
      this._onClick = null;
    }
  }, {
    key: "onClick",
    value: function onClick() {
      var target = this.element.dataset.target,
          toggle = this.element.dataset.toggle,
          method = this.element.dataset.method || 'toggle';

      if (target === 'self') {
        target = this.element;
      } else {
        target = document.querySelector(target);
      }

      if (toggle.startsWith('.')) {
        toggle = toggle.substr(1);
        target.classList.toggle(toggle);
      } else {
        var instance = AutoLoader.getInitializedInstance(target, toggle);

        if (instance) {
          instance[method](this.element);
        } else {
          throw new Error("Could not find initialized instance during toggle action.");
        }
      }
    }
  }]);

  return Toggle;
}();
AutoLoader.loader = new AutoLoader();
AutoLoader.register('toggle', function (element) {
  return new Toggle(element);
});
window.addEventListener('load', function () {
  if (AutoLoader.autoLoad) {
    AutoLoader.load();
  }
});

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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            delete cache[key];
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

/***/ "./src/core/utility.js":
/*!*****************************!*\
  !*** ./src/core/utility.js ***!
  \*****************************/
/*! exports provided: clamp, modulo, proto, randomChoice, arraysEqual, parseHTML, createFragment, isEmptyObject, emptyElement, addClasses, removeClasses, assignAttributes, setElementOffset, getElementOffset, getScroll, isWindow, setScroll, selectElement, assert, parseBooleanOrInt, parseBooleanOrFloat, parseBoolean, parseIntValue, parseFloatValue, parseAny, validateChoice, choice, findChild, filterChildren, getOwnProperty, getPropertyByPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return modulo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return randomChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTML", function() { return parseHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return createFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return emptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return addClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return removeClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignAttributes", function() { return assignAttributes; });
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
function modulo(value, mod) {
  return (value % mod + mod) % mod;
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

  for (var _i = 0, _parsers = parsers; _i < _parsers.length; _i++) {
    var parser = _parsers[_i];

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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: ui */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/ui/index.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "ui", function() { return _ui__WEBPACK_IMPORTED_MODULE_0__; });



/***/ }),

/***/ "./src/ui/index.js":
/*!*************************!*\
  !*** ./src/ui/index.js ***!
  \*************************/
/*! exports provided: Modal, ModalWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/ui/modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _modal__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalWindow", function() { return _modal__WEBPACK_IMPORTED_MODULE_0__["ModalWindow"]; });





/***/ }),

/***/ "./src/ui/modal.js":
/*!*************************!*\
  !*** ./src/ui/modal.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/data */ "./src/core/data.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * <h1>Modal Component</h1>
 *
 * A Component for a modal area that can contain a dialog window, alert, notification, lightbox or any other custom content.
 *
 * ## Auto Hide
 * By default the modal will close when the user clicks it's background area directly.  This is controlled by the
 * hideOnClick property which defaults to true.  You can disable this behavior by setting closeOnClick to false.  If the
 * user clicks a child element of modal then the modal will not be closed.
 *
 * ## Closing Windows
 * You can mark an element to dismiss the modal on click by setting the attribute data-action to dismiss.  If these
 * elements are clicked the modal will checked if it's the closest related modal in the dom tree and if it is it will
 * dismiss itself.
 *
 * ---
 *
 * ## Auto Loading
 * If you are using the AutoLoader module you can assign the modal behavior to an element by setting the data-init
 * attribute to "modal".
 *
 * ---
 *
 * ## Events
 *
 * | Event Name  | Event Description               |
 * | ----------- | ------------------------------- |
 * | modal.open  | Triggered when the modal opens  |
 * | modal.close | Triggered when the modal closes |
 *
 * @class
 */

var Modal =
/*#__PURE__*/
function () {
  /**
   * Constructor for Modal class.
   *
   * @param element {HTMLElement|String|Function} - Element to initialize component on.  If null a new element will be created.
   * @param hideOnClick {Boolean} - If true the modal will close when directly clicked.
   * @param hideClassName - The class that gets toggled during show / hide.
   */
  function Modal() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$element = _ref.element,
        element = _ref$element === void 0 ? null : _ref$element,
        _ref$hideOnClick = _ref.hideOnClick,
        hideOnClick = _ref$hideOnClick === void 0 ? true : _ref$hideOnClick,
        _ref$hideClassName = _ref.hideClassName,
        hideClassName = _ref$hideClassName === void 0 ? "hidden" : _ref$hideClassName;

    _classCallCheck(this, Modal);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else if (typeof element === 'function') {
      this.element = element.call(this);
    } else {
      this.element = element;
    }

    var cache = core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].cache(this.element);

    if (cache.modal) {
      throw new Error("Element is already initialized as Modal.");
    }

    cache.modal = this;

    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add('c-modal');
      this.element.classList.add(hideClassName);
    }

    this.hideOnClick = hideOnClick;
    this.hideClassName = hideClassName;

    this._onClick = function (event) {
      if (_this.isOpen) {
        if (event.target === _this.element && _this.hideOnClick) {
          _this.close();
        } // Hide the modal if the dismiss action is clicked
        // Make sure to check that the action doesn't come from a child modal and
        // that for whatever reason the dismiss action isn't a ancestor.


        var dismiss = event.target.closest('[data-action="dismiss"]'),
            targetModal = dismiss ? dismiss.closest('.c-modal') : null;

        if (dismiss && targetModal && targetModal === _this.element) {
          _this.close();
        }
      }
    };

    this.element.addEventListener('click', this._onClick);
  }
  /**
   * Appends the component to the provided element.  If a string is passed it is used as a css selector.
   * @param element {HTMLElement|String|{append}}
   */


  _createClass(Modal, [{
    key: "appendTo",
    value: function appendTo(element) {
      if (typeof element === 'string') {
        document.querySelector(element).appendChild(this.element);
      } else if (element.appendChild) {
        element.appendChild(this.element);
      } else if (element.append) {
        element.append(this.element);
      }
    }
    /**
     * Opens the modal.
     */

  }, {
    key: "open",
    value: function open() {
      if (!this.isOpen) {
        this.element.classList.remove(this.hideClassName);
        var event = new CustomEvent('modal.open', {
          bubbles: true,
          detail: this
        });
        this.element.dispatchEvent(event);
      }
    }
    /**
     * Closes the modal.
     */

  }, {
    key: "close",
    value: function close() {
      if (this.isOpen) {
        this.element.classList.add(this.hideClassName);
        var event = new CustomEvent('modal.close', {
          bubbles: true,
          detail: this
        });
        this.element.dispatchEvent(event);
      }
    }
    /**
     * Toggles the modal opened or closed.
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
    /**
     * Is true when the modal is open.
     * @returns {boolean}
     */

  }, {
    key: "isOpen",
    get: function get() {
      return !this.element.classList.contains(this.hideClassName);
    }
    /**
     * Helper method that is used to retrieve the modal instance from it's element.
     *
     * @param element {HTMLElement|String}
     * @returns {Modal|null}
     */

  }], [{
    key: "getInstance",
    value: function getInstance(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      return core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].get(element, 'modal');
    }
    /**
     * Builds a Modal instance from a dom element.
     *
     * @param element {HTMLElement}
     * @returns {Modal}
     */

  }, {
    key: "buildComponent",
    value: function buildComponent(element) {
      var args = {};

      if (element.dataset.hideOnClick) {
        args.hideOnClick = element.dataset.hideOnClick === 'true';
      }

      if (element.dataset.hideClassName) {
        args.hideClassName = element.dataset.hideClassName;
      }

      args.element = element;
      return new Modal(args);
    }
  }]);

  return Modal;
}();


autoloader__WEBPACK_IMPORTED_MODULE_1__["default"].register('modal', function (element) {
  return Modal.buildComponent(element);
});

/***/ })

/******/ });
});
//# sourceMappingURL=pendora.bundle.js.map