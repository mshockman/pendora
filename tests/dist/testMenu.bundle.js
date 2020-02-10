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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tests/src/test_menu.js");
/******/ })
/************************************************************************/
/******/ ({

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
/*! exports provided: ExtendableError, IndexError, KeyError, NotImplemented, ValidationError, AssertionError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtendableError", function() { return ExtendableError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexError", function() { return IndexError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyError", function() { return KeyError; });
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
var NotImplemented =
/*#__PURE__*/
function (_ExtendableError3) {
  _inherits(NotImplemented, _ExtendableError3);

  function NotImplemented() {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotImplemented).apply(this, arguments));
  }

  return NotImplemented;
}(ExtendableError);
var ValidationError =
/*#__PURE__*/
function (_ExtendableError4) {
  _inherits(ValidationError, _ExtendableError4);

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
function (_ExtendableError5) {
  _inherits(AssertionError, _ExtendableError5);

  function AssertionError(message) {
    _classCallCheck(this, AssertionError);

    return _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, message));
  }

  return AssertionError;
}(ExtendableError);

/***/ }),

/***/ "./src/core/interface/Observable.js":
/*!******************************************!*\
  !*** ./src/core/interface/Observable.js ***!
  \******************************************/
/*! exports provided: default, BREAK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Observable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BREAK", function() { return BREAK; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var reg_whitespace = /\s+/;
/**
 * Provides an interface for Observable objects.  This class should be extended.
 *
 * Observable objects provide a mechanism for event tracking.  Events can be listened to by registering an event listener
 * with the `on` method.  You can remove an event listener with it's opposite method `off`.  After some listeners have
 * been registered you can fire an event using the `trigger` method.
 *
 * SCOPED EVENTS
 *
 * Events can have sub scopes.  Scopes are events that have the dot operator (.) in their name.  If a scoped event is
 * fired all parent scopes are also fired for that event.  For example the scoped event `modal.open` will all listeners
 * registered to the events modal.open, modal, and *.  * is a special event that fires for any event.  It's the global
 * event listener.
 */

var Observable =
/*#__PURE__*/
function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this._events = {};
  }
  /**
   * Registers an event listener to one or more events.
   *
   * @param {String} events - A string of space separated event names to register to.
   * @param {Function} listener - A function to register to the events.
   */


  _createClass(Observable, [{
    key: "on",
    value: function on(events, listener) {
      var eventList = events.split(reg_whitespace);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = eventList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var event = _step.value;

          if (!this._events[event]) {
            this._events[event] = [];
          }

          if (typeof listener !== 'function') {
            throw new TypeError('Callback was not a function.');
          }

          if (this._events[event].indexOf(listener) === -1) {
            this._events[event].push(listener);
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
     * Removes an event listener.
     *
     * The `off` method removed event listeners that where registered with `on`.  Calling `off` with no arguments clears
     * all event listeners for the object.  Specific event listeners can be removed by providing combinations of
     * the function to remove, event names and event scopes.
     *
     * CLEARING AN EVENT NAME.
     * The `off` method can be used to remove all listeners from a single event by providing the event name with no
     * event listener.  In these cases the `off` method will remove every event listener from that event name.  The
     * `off` method will not remove listeners from child events scopes in these cases.
     *
     * CLEARING CHILD EVENT OR REMOVING A LISTENER FROM SPECIFIC SCOPES
     * The `off` method can be used to remove all listeners from every child event scope by providing the event name
     * suffixed with ".*" at the end of it.  In these cases the `off` method will match any child scope and clear it.
     * Note that this will not clear the top most scope itself.  If you want to clear both children and the root scope
     * you must pass the string formatted like "${eventName} ${eventName}.*".  For example that calling `off` with the
     * arguments "modal modal.*" will clear all modal events and child sub events.
     *
     * The `off` method also allows to remove a specific listeners by passing the listener as `off` second argument.
     * In these cases off will only remove the specified listener instead of clearing all events.
     *
     * REMOVE A LISTENER FROM ALL EVENTS
     * Finally the `off` method can remove an specific listener from any event by passing the listener as the first
     * argument with no second argument.  For example, off(listener).  In this case the `off` method will search for the
     * listener in every registered event.
     *
     * OFF CAN BE USED TO REMOVE A LISTENER FROM MULTIPLE EVENTS BY PASSING THOSE EVENTS AS A SPACE SEPARATED STRING
     * OFF EVENT NAME.
     *
     * @param events
     * @param listener
     */

  }, {
    key: "off",
    value: function off(events, listener) {
      if (!arguments.length) {
        // If no arguments are passed clear all events.
        this._events = {};
      } else if (arguments.length === 1 && typeof arguments[0] === 'function') {
        // If only a function is passed remove that function from EVERY EVENT.
        for (var key in this._events) {
          if (this._events.hasOwnProperty(key) && this._events[key]) {
            var i = this._events[key].indexOf(arguments[0]);

            if (i !== -1) {
              this._events[key].splice(i, 1);
            }
          }
        }
      } else {
        // Either off(events, listener) or off(events) was called.
        // If off(events, listener) was called remove that listener from every passed event.
        // If off(events) was called clear every listener from every passed event.
        // You can pass multiple events is a space separated list.
        // You can select from scoped events by calling eventName.*
        events = events.split(reg_whitespace);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var eventName = _step2.value;

            if (eventName.endsWith('.*')) {
              eventName = eventName.substr(0, eventName.length - 1); // Remove the last character, so *, from the string.
              // Iterate over every event matching the once start start with the event name.

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = this._events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var _key = _step3.value;

                  if (this._events.hasOwnProperty(_key) && this._events[_key] && _key.startsWith(eventName)) {
                    if (!listener) {
                      this._events[_key] = [];
                    } else {
                      var _i = this._events[_key].indexOf(listener);

                      if (_i !== -1) this._events[_key].splice(_i, 1);
                    }
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
            } else if (this._events[eventName]) {
              if (!listener) {
                this._events[eventName] = [];
              } else {
                var _i2 = this._events[eventName].indexOf(listener);

                if (_i2 !== -1) this._events[eventName].splice(_i2, 1);
              }
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
      }
    }
    /**
     * Triggers an event and the global event *.
     *
     * Event listeners of that event are called with the event name passed as the first argument and any additional
     * arguments provided to trigger are also passed.
     *
     * IF ANY EVENT RETURNS THE `BREAK` FLAG IMMEDIATE PROPAGATION OF THE EVENT WILL BE STOPPED.
     * @param event
     * @param args
     */

  }, {
    key: "trigger",
    value: function trigger(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this._events['*']) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this._events['*'][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var listener = _step4.value;
            if (listener.apply(void 0, [event].concat(args)) === Observable.BREAK) return Observable.BREAK;
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
      }

      if (event === '*') return;
      var parts = event.split('.');

      for (var i = 0, l = parts.length; i < l; i++) {
        var key = parts.slice(0, i + 1).join('.');

        if (this._events[key]) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = this._events[key][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _listener = _step5.value;
              if (_listener.apply(void 0, [event].concat(args)) === Observable.BREAK) return Observable.BREAK;
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
        }
      }
    }
    /**
     * Tests to see if the event listener is registered to the event name.
     *
     * @param eventName
     * @param listener
     * @returns {boolean}
     */

  }, {
    key: "hasEvent",
    value: function hasEvent(eventName, listener) {
      if (this._events && this._events[eventName]) {
        return this._events[eventName].indexOf(listener) !== -1;
      } else {
        return false;
      }
    }
    /**
     * A shortcut for calling off("eventName eventName.*");
     * @param eventName
     */

  }, {
    key: "clearEvent",
    value: function clearEvent(eventName) {
      this.off(eventName);
      this.off("".concat(eventName, ".*"));
    }
  }]);

  return Observable;
}();


var BREAK = {};
Observable.BREAK = BREAK;

/***/ }),

/***/ "./src/core/utility.js":
/*!*****************************!*\
  !*** ./src/core/utility.js ***!
  \*****************************/
/*! exports provided: clamp, firstValue, all, any, proto, randomChoice, arraysEqual, parseHTML, isEmptyObject, emptyElement, addClasses, removeClasses, setElementOffset, getElementOffset, getScroll, isWindow, setScroll, selectElement, assert, parseBooleanOrInt, parseBooleanOrFloat, parseBoolean, parseIntValue, parseFloatValue, parseAny, validateChoice, findChild, filterChildren */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return findChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return filterChildren; });
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

/***/ }),

/***/ "./src/menus/Menu.js":
/*!***************************!*\
  !*** ./src/menus/Menu.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/menus/core.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menus/MenuItem.js");
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuNode */ "./src/menus/MenuNode.js");
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Represents a Menu component that enables you to display an hierarchically organized set of elements with commands.
 *
 * Remarks
 * ------------------------------
 *
 * The Menu component presents a list of items that either specify a command or contain a nested submenu.  Typically
 * clicking on an item will cause it to either open it's submenu or carry out some command.
 *
 * MenuItem is the most common type of item in a Menu.  A MenuItem can contain an attached submenu with additional child
 * items.  A MenuItem that has a submenu can not contain an action.
 *
 * Although MenuItems are the most common type of item in the Menu, any object can be a child as long as it implements
 * methods to activate, deactivate and tell it's parent when it does so.  For example you can add a static Menu as a
 * direct child to a Menu that implements a different set of rules for it's items such it added a checkable interface.
 *
 * Initializing from code
 * ------------------------------
 *
 * let menu = new Menu();
 *
 * menu.add(new MenuItem({text: "Item #1"});
 * menu.add(new MenuItem({text: "Item #2"});
 * menu.add(new MenuItem({text: "Item #3"});
 *
 * Initializing from html
 * ------------------------------
 *
 * <ul data-role="menu" id="my-menu">
 *      <li data-role="menuitem">Item #1<a></li>
 *      <li data-role="menuitem">Item #2<a></li>
 *      <li data-role="menuitem">Item #3<a></li>
 * </ul>
 *
 * Menu.buildFromHTML('#my-menu');
 *
 * Properties
 * -------------------------------
 *
 * element              References the menus root dom element.
 *
 * timeout              Controls how long after the user moves off the menu that it will timeout.
 *
 * autoActivate         If a number greater then or equal to 0, this property controls how long the user must hover
 *                      over an item for the menu to activate.  If the value is false or a negative number the menu will
 *                      never auto activate. If true or 0 the menu will activate immediately.
 *
 * delay                Gets or sets the delay between the user hovering over the menu item and it activating.  This is
 *                      only used in the cases in which the container menu is already active.  Otherwise the
 *                      autoActivate property is used instead.  If the value is negative items will never activate on
 *                      hover.
 *
 * multiple             Controls if the menu allows multiple items to be active at the same time.
 *
 * position             Gets or sets a function that will be called whenever the menu is shown to position it.
 *
 * toggleItem           Gets or sets how items will behave when the user clicks them.  Can be on, off, both or none.
 *                      If on items will only toggle on when clicked and if off they will only toggle off.
 *                      If both they will toggle both off and on.
 *                      If none nothing will happen when the user clicks an item.
 *
 * toggleMenu           Gets or sets how menus will behave when the user clicks them.  Can be on, off, both or none.
 *                      If on items will only toggle on when clicked and if off they will only toggle off.
 *                      If both they will toggle both off and on.
 *                      If none nothing will happen when the user clicks an item.
 *
 * menuNodeType         A readonly property that is used to determine what kind of MenuNode the element is.
 *
 * isMenu               A readonly property that is used to test if an object is a Menu node.
 *
 * visible              Gets or sets the visibility of the menu.  This only updates the css classes.  It does not
 *                      trigger events. Use the show() and hide() methods if you want to show and hide the menu
 *                      normally, they will update the visible property.
 *
 * closeOnBlur          Gets or sets how the menu will behave when the user clicks outside it.  AKA it looses focus.
 *                      If true the menu will close and deactivate itself.
 *
 * closeOnSelect        Gets or sets the menu's behavior when an item is selected.  Can be either true, false, or
 *                      'child'.  If true the menu will close itself when an item-select event is encountered.
 *                      The special 'child' option is similiar to true but will only close if the item is an immediate
 *                      child item of the menu.
 *
 * deactivateOnItemHover
 *      If true item will automatically deactivate when the user mouses over another item even if that item is disabled.
 */

var Menu =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(Menu, _MenuNode);

  function Menu() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? false : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? 0 : _ref$autoActivate,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? false : _ref$delay,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        _ref$toggleItem = _ref.toggleItem,
        toggleItem = _ref$toggleItem === void 0 ? 'on' : _ref$toggleItem,
        _ref$toggleMenu = _ref.toggleMenu,
        toggleMenu = _ref$toggleMenu === void 0 ? 'off' : _ref$toggleMenu,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? false : _ref$closeOnSelect,
        _ref$nodeName = _ref.nodeName,
        nodeName = _ref$nodeName === void 0 ? 'ul' : _ref$nodeName,
        _ref$position = _ref.position,
        position = _ref$position === void 0 ? null : _ref$position,
        _ref$deactivateOnItem = _ref.deactivateOnItemHover,
        deactivateOnItemHover = _ref$deactivateOnItem === void 0 ? false : _ref$deactivateOnItem,
        classNames = _ref.classNames,
        id = _ref.id;

    _classCallCheck(this, Menu);

    var element;

    if (!target) {
      element = document.createElement(nodeName);
    } else if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = target;
    }

    element.classList.add('c-menu');
    element.dataset.role = 'menu';
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, element, 'menu', {
      classNames: classNames,
      id: id
    }));
    _this._timeoutTimer = null;
    _this._activateItemTimer = null;
    _this.timeout = timeout;
    _this.closeOnBlur = closeOnBlur;
    _this.autoActivate = autoActivate;
    _this.delay = delay;
    _this.multiple = multiple;
    _this.toggleItem = toggleItem;
    _this.toggleMenu = toggleMenu;
    _this.closeOnSelect = closeOnSelect;
    _this.position = position;
    _this.deactivateOnItemHover = deactivateOnItemHover;
    /**
     * Gets or sets the visibility of the menu.  This only updates the css classes.  It does not trigger events.
     * Use the show() and hide() methods if you want to show and hide the menu normally, they will update the
     * visible property.
     * @type {boolean}
     */

    _this.visible = false;

    _this.initEvents();

    return _this;
  }

  _createClass(Menu, [{
    key: "initEvents",
    value: function initEvents() {
      if (!this.isMenuController) {
        this.isMenuController = true;
        this.boundEvents = {};
        this.boundEvents.onClick = this.onClick.bind(this);
        this.boundEvents.onMouseOver = this.onMouseOver.bind(this);
        this.boundEvents.onMouseOut = this.onMouseOut.bind(this);
        this.boundEvents.onSelect = this.onSelect.bind(this);
        this.element.addEventListener('click', this.boundEvents.onClick);
        this.element.addEventListener('mouseover', this.boundEvents.onMouseOver);
        this.element.addEventListener('mouseout', this.boundEvents.onMouseOut);
        this.element.addEventListener('item-select', this.boundEvents.onSelect);
      }
    }
  }, {
    key: "destroyEvents",
    value: function destroyEvents() {
      if (this.isMenuController) {
        this.isMenuController = false;
        this.element.removeEventListener('click', this.boundEvents.onClick);
        this.element.removeEventListener('mouseover', this.boundEvents.onMouseOver);
        this.element.removeEventListener('mouseout', this.boundEvents.onMouseOut);
        this.element.removeEventListener('item-select', this.boundEvents.onSelect);
        this.boundEvents = null;
      }
    } //------------------------------------------------------------------------------------------------------------------
    // METHODS

    /**
     * Activates the menu.
     */

  }, {
    key: "activate",
    value: function activate() {
      var _this2 = this;

      if (!this.isActive) {
        this.isActive = true;
        var parent = this.parent;

        if (parent) {
          if (!parent.isActive) {
            parent.activate();
          }

          if (parent.setActiveItem) {
            parent.setActiveItem(this, true);
          }
        }

        if (this.closeOnBlur && !this._captureDocumentClick) {
          var doc = document;
          this._captureDocumentClick = {
            doc: doc,
            onDocumentClick: function onDocumentClick(event) {
              if (!_this2.element.contains(event.target)) {
                _this2.deactivate();
              }
            }
          }; // noinspection JSUnresolvedFunction

          doc.addEventListener('click', this._captureDocumentClick.onDocumentClick);
        }

        this.trigger('activate', this);
      }
    }
    /**
     * Deactivates the menu.
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.isActive) {
        this.isActive = false;

        if (this._captureDocumentClick) {
          // noinspection JSUnresolvedFunction
          this._captureDocumentClick.doc.removeEventListener('click', this._captureDocumentClick.onDocumentClick);

          this._captureDocumentClick = null;
        }

        this.clearTimeoutTimer();
        this.clearActivateItemTimer();

        if (this._activateItemTimer) {
          clearTimeout(this._activateItemTimer);
          this._activateItemTimer = null;
        }

        this.clearActiveItems();
        this.trigger('deactivate', this);
      }
    }
    /**
     * Shows the menu.
     */

  }, {
    key: "show",
    value: function show() {
      if (!this.visible) {
        this.visible = true;

        if (this.position) {
          var position = this.position;

          if (typeof position === 'string') {
            position = Menu.POSITIONERS[position];
          }

          position.call(this, this);
        }

        this.trigger('show', this);
      }
    }
    /**
     * Hides the menu.
     */

  }, {
    key: "hide",
    value: function hide() {
      if (this.visible) {
        this.visible = false;
        this.trigger("hide", this);
      }
    }
    /**
     * Adds an item to the menu.
     * @param item
     * @returns {*}
     */

  }, {
    key: "add",
    value: function add(item) {
      this.element.appendChild(item.element);
      return item;
    }
  }, {
    key: "setActiveItem",
    value: function setActiveItem(item, active) {
      if (active) {
        if (!item.isActive) {
          item.activate();
          return;
        }

        if (!this.multiple) {
          var activeItems = this.activeItems;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = activeItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _item = _step.value;

              if (_item !== item) {
                _item.deactivate();
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
      } else {
        if (item.isActive) {
          item.deactivate();
        }
      }
    }
  }, {
    key: "clearActiveItems",
    value: function clearActiveItems() {
      var activeItems = this.activeItems;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = activeItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _item = _step2.value;

          _item.deactivate();
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
    }
  }, {
    key: "startTimeoutTimer",
    value: function startTimeoutTimer() {
      var _this3 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.isActive) return;
      if (timeout === null) timeout = this.timeout;
      this.clearTimeoutTimer();
      this._timeoutTimer = setTimeout(function () {
        _this3._timeoutTimer = null;

        _this3.deactivate();
      }, timeout);
      return this._timeoutTimer;
    }
  }, {
    key: "clearTimeoutTimer",
    value: function clearTimeoutTimer() {
      if (this._timeoutTimer) {
        clearTimeout(this._timeoutTimer);
        this._timeoutTimer = null;
      }
    }
  }, {
    key: "startActivateItemTimer",
    value: function startActivateItemTimer(item, time) {
      var _this4 = this;

      this.clearActivateItemTimer();
      this._activateItemTimerTarget = item;
      this._activateItemTimer = setTimeout(function () {
        _this4._activateItemTimer = null;
        _this4._activateItemTimerTarget = null;
        item.activate();
      }, time);
    }
  }, {
    key: "clearActivateItemTimer",
    value: function clearActivateItemTimer(target) {
      if (this._activateItemTimer && (!target || target === this._activateItemTimerTarget)) {
        clearTimeout(this._activateItemTimer);
        this._activateItemTimer = null;
        this._activateItemTimerTarget = null;
      }
    } //------------------------------------------------------------------------------------------------------------------
    // EVENT HANDLER METHODS

  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      // Clear timeout timer.
      this.clearTimeoutTimer(); // Pass event to target item.

      var targetItem = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getClosestMenuItem"])(event.target, this.element);

      if (targetItem && targetItem.getController() === this) {
        targetItem.onMouseOver(event);
      } // If the user mouses over an item and deactivateOnItemHover is true and multiple is false
      // then deactivate any other active items.


      if (this.deactivateOnItemHover && !this.multiple) {
        var childItem = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getTargetChild"])(this, event.target),
            activeItems = this.activeItems;

        if (childItem) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = activeItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var item = _step3.value;

              if (item !== childItem) {
                item.deactivate();
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
        }
      }
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      // Start timer if menu is active, timeout is a valid time and it is a mouseleave event.
      if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0 && !this.element.contains(event.relatedTarget)) {
        this.startTimeoutTimer(this.timeout);
      } // Pass event to target item.


      var targetItem = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getClosestMenuItem"])(event.target, this.element);

      if (targetItem && targetItem.getController() === this) {
        targetItem.onMouseOut(event);
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var target = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getClosestMenuNode"])(event.target, this.element);

      if (target === this) {
        if (this.isActive && (this.toggleMenu === 'off' || this.toggleMenu === 'both')) {
          this.deactivate();
        } else if (!this.isActive && (this.toggleMenu === 'on' || this.toggleMenu === 'both')) {
          this.activate();
        }
      } else if (target && Object(_core__WEBPACK_IMPORTED_MODULE_0__["isMenuItem"])(target) && target.getController() === this) {
        target.onClick(event);
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect(event) {
      if (this.closeOnSelect === true || this.closeOnSelect === 'child' && event.detail.item.parent === this) {
        this.deactivate();
      }
    } //------------------------------------------------------------------------------------------------------------------
    // GETTER AND SETTER METHODS

    /**
     * Gets the menus active child items.
     * @returns {Array}
     */

  }, {
    key: "activeItems",
    get: function get() {
      var r = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var child = _step4.value;

          if (child.isActive) {
            r.push(child);
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
     * Gets the menu's child items.
     * @returns {Array}
     */

  }, {
    key: "children",
    get: function get() {
      var r = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.element.querySelectorAll('[data-role="menuitem"], [data-role="menu"], [data-role="dropdown"]')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var element = _step5.value;
          var menuNode = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getMenuNode"])(element);

          if (menuNode && menuNode.parent === this) {
            r.push(menuNode);
          }
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

      return r;
    }
    /**
     * Returns true if the menu is visible.
     * @returns {boolean}
     */

  }, {
    key: "visible",
    get: function get() {
      return !this.element.classList.contains('hidden');
    }
    /**
     * Sets the menu visible or hidden.
     * @param value
     */
    ,
    set: function set(value) {
      if (value && !this.visible) {
        this.element.classList.remove('hidden');
        this.element.classList.add('visible');
      } else if (!value && this.visible) {
        this.element.classList.add('hidden');
        this.element.classList.remove('visible');
      }
    } //------------------------------------------------------------------------------------------------------------------
    // STATIC METHODS

  }], [{
    key: "FromHTML",
    value: function FromHTML(selector) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof selector === 'string') {
        selector = document.querySelector(selector);
      }

      config = config || {};
      var dataset = {};

      if (selector.dataset.timeout) {
        dataset.timeout = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBooleanOrInt"])(selector.dataset.timeout);
      }

      if (selector.dataset.closeOnBlur) {
        dataset.closeOnBlur = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBoolean"])(selector.dataset.closeOnBlur);
      }

      if (selector.dataset.autoActivate) {
        dataset.autoActivate = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBooleanOrInt"])(selector.dataset.autoActivate);
      }

      if (selector.dataset.delay) {
        dataset.delay = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBooleanOrInt"])(selector.dataset.delay);
      }

      if (selector.dataset.multiple) {
        dataset.multiple = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBoolean"])(selector.dataset.multiple);
      }

      if (selector.dataset.toggleItem) {
        dataset.toggleItem = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["validateChoice"])(selector.dataset.toggleItem, ['on', 'off', 'both']);
      }

      if (selector.dataset.toggleMenu) {
        dataset.toggleMenu = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["validateChoice"])(selector.dataset.toggleMenu, ['on', 'off', 'both']);
      }

      if (selector.dataset.closeOnSelect) {
        var value = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["validateChoice"])(selector.dataset.closeOnSelect, ['true', 'false', 'child']);

        if (value === 'true' || value === 'false') {
          value = value === 'true';
        }

        dataset.closeOnSelect = value;
      }

      if (selector.dataset.deactivateOnItemHover) {
        dataset.deactivateOnItemHover = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBoolean"])(selector.dataset.deactivateOnItemHover);
      }

      return new this(_objectSpread({
        target: selector
      }, dataset, config));
    }
  }, {
    key: "widget",
    value: function widget() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          target = _ref2.target,
          _ref2$subItemConfig = _ref2.subItemConfig,
          subItemConfig = _ref2$subItemConfig === void 0 ? {} : _ref2$subItemConfig,
          _ref2$subMenuConfig = _ref2.subMenuConfig,
          subMenuConfig = _ref2$subMenuConfig === void 0 ? {} : _ref2$subMenuConfig,
          _ref2$config = _ref2.config,
          config = _ref2$config === void 0 ? {} : _ref2$config;

      var root = this.FromHTML(target, config);
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = root.element.querySelectorAll('[data-role="menu"]')[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var element = _step6.value;
          Menu.FromHTML(element, subMenuConfig);
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

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = root.element.querySelectorAll('[data-role="menuitem"]')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _element = _step7.value;
          _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"].FromHTML(_element, subItemConfig);
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return root;
    }
  }]);

  return Menu;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_2__["default"]);

_defineProperty(Menu, "POSITIONERS", {});



/***/ }),

/***/ "./src/menus/MenuBar.js":
/*!******************************!*\
  !*** ./src/menus/MenuBar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBar; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menus/Menu.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var MenuBar =
/*#__PURE__*/
function (_Menu) {
  _inherits(MenuBar, _Menu);

  function MenuBar() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        options = _objectWithoutProperties(_ref, ["target"]);

    _classCallCheck(this, MenuBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuBar).call(this, _objectSpread({
      target: target,
      closeOnBlur: true,
      timeout: false,
      autoActivate: false,
      delay: false,
      multiple: false,
      toggleItem: 'both',
      toggleMenu: 'none',
      closeOnSelect: true
    }, options)));

    _this.element.classList.add('c-menubar');

    _this.element.classList.remove('c-menu');

    _this.visible = true;
    return _this;
  }

  return MenuBar;
}(_Menu__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menus/MenuItem.js":
/*!*******************************!*\
  !*** ./src/menus/MenuItem.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuItem; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menus/MenuNode.js");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ "./src/menus/core.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * Represents a selectable item inside a menu.
 */

var MenuItem =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(MenuItem, _MenuNode);

  function MenuItem(text, action) {
    var _this;

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        target = _ref.target,
        _ref$nodeName = _ref.nodeName,
        nodeName = _ref$nodeName === void 0 ? 'li' : _ref$nodeName,
        id = _ref.id,
        classNames = _ref.classNames;

    _classCallCheck(this, MenuItem);

    var element;

    if (!target) {
      element = document.createElement(nodeName);
      var item = document.createElement('a');

      if (typeof action === 'string') {
        item.href = action;
      }

      item.classList.add('c-menuitem__item');
      item.innerHTML = text;
      element.appendChild(item);
    } else if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = target;
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).call(this, element, 'menuitem', {
      classNames: classNames,
      id: id
    }));
    _this.isMenuItem = true;

    _this.element.classList.add('c-menuitem');

    _this.element.dataset.role = 'menuitem';

    if (typeof action === 'function') {
      _this.on('select', action);
    }

    return _this;
  } //------------------------------------------------------------------------------------------------------------------
  // METHODS
  //------------------------------------------------------------------------------------------------------------------


  _createClass(MenuItem, [{
    key: "activate",
    value: function activate() {
      if (!this.isActive) {
        this.isActive = true;
        var parent = this.parent,
            submenu = this.submenu;

        if (!parent.isActive) {
          parent.activate();
        }

        parent.setActiveItem(this, true);

        if (submenu) {
          submenu.show();
        }

        this.trigger('activate', this);
      }
    }
    /**
     * Deactivates the item.
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.isActive) {
        this.isActive = false;
        var submenu = this.submenu;

        if (submenu) {
          submenu.deactivate();
          submenu.hide();
        }

        this.trigger('deactivate', this);
      }
    }
    /**
     * Triggers a select action for the item.
     */

  }, {
    key: "select",
    value: function select() {
      this.trigger('select', this);
      var event = new CustomEvent('item-select', {
        detail: {
          item: this
        },
        bubbles: true
      });
      this.element.dispatchEvent(event);
    }
    /**
     * Attaches the submenu to the item.
     * @param menu
     * @returns {*}
     */

  }, {
    key: "attachSubMenu",
    value: function attachSubMenu(menu) {
      if (this.submenu) {
        throw Error("Already has submenu.");
      }

      this.element.appendChild(menu.element);
      return menu;
    }
    /**
     * Detaches the items current submenu if it has one and returns it.
     * @returns {MenuNode}
     */

  }, {
    key: "detachSubMenu",
    value: function detachSubMenu() {
      var submenu = this.submenu;

      if (submenu) {
        if (this._showDelayTimer) {
          clearTimeout(this._showDelayTimer);
          this._showDelayTimer = null;
        }

        this.element.removeChild(submenu.element);
      }

      return submenu;
    } //------------------------------------------------------------------------------------------------------------------
    // EVENT HANDLERS
    //------------------------------------------------------------------------------------------------------------------

  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      if (this.getDisabled()) return;

      if (!this.element.contains(event.relatedTarget)) {
        // Mouse entered item.
        var parent = this.parent;
        parent.clearActivateItemTimer();

        if (!this.isActive) {
          if (!parent.isActive) {
            // Use autoActivate property.
            if (parent.autoActivate === true) {
              this.activate();
            } else if (typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
              parent.startActivateItemTimer(this, parent.autoActivate);
            }
          } else {
            // Use delay property because menu is already active.
            if (parent.delay === false) {
              this.activate();
            } else if (typeof parent.delay === 'number' && parent.delay >= 0) {
              parent.startActivateItemTimer(this, parent.delay);
            }
          }
        }
      }
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      if (this.getDisabled()) return;

      if (!this.element.contains(event.relatedTarget)) {
        var parent = this.parent;
        parent.clearActivateItemTimer(this); // If the item doesn't have a submenu deactivate immediately when the user leaves it.

        if (this.isActive && !this.submenu) {
          this.deactivate();
        }
      }
    }
    /**
     * Called when the user clicks the MenuItem.
     * @param event
     */

  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.getDisabled()) {
        event.preventDefault();
        return;
      }

      var parent = this.parent,
          submenu = this.submenu;

      if (submenu) {
        if (this.isActive && (parent.toggleItem === 'off' || parent.toggleItem === 'both')) {
          this.deactivate(); // If we toggle off the last item then deactivate the parent menu.

          if (parent.isActive && !parent.activeItems.length) {
            parent.deactivate();
          }
        } else if (!this.isActive && (parent.toggleItem === 'on' || parent.toggleItem === 'both')) {
          this.activate();
        }
      } else {
        if (!this.isActive && (parent.toggleItem === 'on' || parent.toggleItem === 'both')) {
          this.activate();
        }

        this.select();
      }
    } //------------------------------------------------------------------------------------------------------------------
    // GETTERS AND SETTERS
    //------------------------------------------------------------------------------------------------------------------

    /**
     * Gets the items submenu.
     * @returns {MenuNode}
     */

  }, {
    key: "submenu",
    get: function get() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.element.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;
          var node = Object(_core__WEBPACK_IMPORTED_MODULE_1__["getMenuNode"])(element);

          if (node && Object(_core__WEBPACK_IMPORTED_MODULE_1__["isMenu"])(node)) {
            return node;
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
     * Implements the children interface for a MenuItem node. Will return either an empty array or an array with the
     * child submenu inside it.  For MenuItem nodes this should either be 0 or 1 items but it has to be an array to
     * keep with the specification.
     * @returns {MenuNode[]|Array}
     */

  }, {
    key: "children",
    get: function get() {
      var submenu = this.submenu;

      if (submenu) {
        return [submenu];
      } else {
        return [];
      }
    } //------------------------------------------------------------------------------------------------------------------
    // STATIC METHODS
    //------------------------------------------------------------------------------------------------------------------

  }], [{
    key: "FromHTML",
    value: function FromHTML(selector) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof selector === 'string') {
        selector = document.querySelector(selector);
      }

      return new this(null, null, _objectSpread({
        target: selector
      }, config));
    }
  }]);

  return MenuItem;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menus/MenuNode.js":
/*!*******************************!*\
  !*** ./src/menus/MenuNode.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuNode; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/menus/core.js");
/* harmony import */ var core_interface_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/interface/Observable */ "./src/core/interface/Observable.js");
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
 * The base class for all menu nodes.
 */

var MenuNode =
/*#__PURE__*/
function (_Observable) {
  _inherits(MenuNode, _Observable);

  function MenuNode(element, nodeType) {
    var _this;

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        classNames = _ref.classNames,
        id = _ref.id;

    _classCallCheck(this, MenuNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuNode).call(this));
    _this.element = element;
    Object(_core__WEBPACK_IMPORTED_MODULE_0__["attachMenuNode"])(_this.element, _assertThisInitialized(_this));
    /**
     * Used to test if an object is a menu controller.
     * @readonly
     * @type {boolean}
     */

    _this.isMenuController = false;
    _this.menuNodeType = nodeType;

    if (classNames) {
      Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(_this.element, classNames);
    }

    if (id) {
      _this.element.id = id;
    }

    return _this;
  }
  /**
   * Returns the root most MenuNode.
   * @returns {MenuNode}
   */


  _createClass(MenuNode, [{
    key: "getDisabled",

    /**
     * Returns true if the node or any of it's ancestor nodes in the tree are disabled.
     * @returns {boolean}
     */
    value: function getDisabled() {
      var o = this.element;

      while (o) {
        if (o.classList.contains('disabled')) {
          return true;
        }

        o = o.parentElement;
      }

      return false;
    }
    /**
     * Returns the controller node that capture event listeners.
     * @returns {MenuNode}
     */

  }, {
    key: "getController",
    value: function getController() {
      var o = this;

      while (o) {
        if (o.isMenuController) {
          return o;
        }

        o = o.parent;
      }
    }
  }, {
    key: "appendTo",
    value: function appendTo(element) {
      if (element.jquery) {
        element.append(this.element);
      } else if (typeof element === 'string') {
        element = document.querySelector(element);
        element.appendChild(this.element);
      } else {
        element.appendChild(this.element);
      }
    }
  }, {
    key: "root",
    get: function get() {
      var o = this,
          r = this;

      while (o) {
        o = o.parent;
        if (o) r = o;
      }

      return r;
    }
    /**
     * Returns the parent Menu or MenuItem.
     * @returns {MenuNode|Menu|MenuItem}
     */

  }, {
    key: "parent",
    get: function get() {
      var o = this.element.parentElement;

      while (o) {
        var node = Object(_core__WEBPACK_IMPORTED_MODULE_0__["getMenuNode"])(o);

        if (node) {
          return node;
        }

        o = o.parentElement;
      }
    }
    /**
     * Returns the first MenuItem parent that the node has in the tree.
     * @returns {MenuItem}
     */

  }, {
    key: "parentItem",
    get: function get() {
      var o = this.parent;

      while (o) {
        if (Object(_core__WEBPACK_IMPORTED_MODULE_0__["isMenuItem"])(o)) {
          return o;
        }

        o = o.parent;
      }
    }
    /**
     * Returns the closest parent Menu that the node has.
     * @returns {Menu}
     */

  }, {
    key: "parentMenu",
    get: function get() {
      var o = this.parent;

      while (o) {
        if (Object(_core__WEBPACK_IMPORTED_MODULE_0__["isMenu"])(o)) {
          return o;
        }

        o = o.parent;
      }
    }
    /**
     * True if the node is active.
     * @returns {boolean}
     */

  }, {
    key: "isActive",
    get: function get() {
      return this.element.classList.contains('active');
    },
    set: function set(value) {
      var isActive = this.isActive;

      if (!isActive && value) {
        this.element.classList.add('active');
      } else if (isActive && !value) {
        this.element.classList.remove('active');
      }
    }
    /**
     * True if the node is disabled.
     * @returns {boolean}
     */

  }, {
    key: "isDisabled",
    get: function get() {
      return this.element.classList.contains('disabled');
    },
    set: function set(value) {
      if (!!value !== this.isDisabled) {
        this.element.classList.toggle('disabled');
      }
    }
  }]);

  return MenuNode;
}(core_interface_Observable__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/menus/core.js":
/*!***************************!*\
  !*** ./src/menus/core.js ***!
  \***************************/
/*! exports provided: getMenuNode, attachMenuNode, assertMenuNode, getClosestMenuNode, getClosestMenu, getClosestMenuItem, isMenuItem, isMenu, isMenuNode, getTargetChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMenuNode", function() { return getMenuNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachMenuNode", function() { return attachMenuNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertMenuNode", function() { return assertMenuNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestMenuNode", function() { return getClosestMenuNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestMenu", function() { return getClosestMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestMenuItem", function() { return getClosestMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMenuItem", function() { return isMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMenu", function() { return isMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMenuNode", function() { return isMenuNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTargetChild", function() { return getTargetChild; });
/* harmony import */ var core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/data */ "./src/core/data.js");
/* harmony import */ var core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/errors */ "./src/core/errors.js");
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuNode */ "./src/menus/MenuNode.js");



/**
 * Retrieves an attached MenuNode object from the element.
 * @param element {Element}
 * @returns {MenuNode}
 */

function getMenuNode(element) {
  return core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].get(element, 'menu-node');
}
/**
 * Attaches a MenuNode element to a dom element.
 * @param element {Element}
 * @param node {MenuNode}
 */

function attachMenuNode(element, node) {
  core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].set(element, 'menu-node', node);
}
function assertMenuNode(obj) {
  if (!obj) {
    throw Object(core_errors__WEBPACK_IMPORTED_MODULE_1__["AssertionError"])("Assert: Must be MenuNode");
  }

  if (!(obj instanceof _MenuNode__WEBPACK_IMPORTED_MODULE_2__["default"])) {
    throw Object(core_errors__WEBPACK_IMPORTED_MODULE_1__["AssertionError"])("Assert: Must be MenuNode");
  }
}
function getClosestMenuNode(element, context) {
  while (element) {
    var node = getMenuNode(element);

    if (node) {
      return node;
    }

    if (element === context) {
      break;
    }

    element = element.parentElement;
  }
}
/**
 * Returns the closest Menu node.
 * @param element
 * @param context
 * @returns {Menu}
 */

function getClosestMenu(element, context) {
  while (element) {
    var node = getMenuNode(element);

    if (node && isMenu(node)) {
      // noinspection JSValidateTypes
      return node;
    }

    if (element === context) {
      break;
    }

    element = element.parentElement;
  }
}
/**
 * Returns the closest MenuItem
 * @param element
 * @param context
 * @returns {MenuItem}
 */

function getClosestMenuItem(element, context) {
  while (element) {
    var node = getMenuNode(element);

    if (node && isMenuItem(node)) {
      // noinspection JSValidateTypes
      return node;
    }

    if (element === context) {
      break;
    }

    element = element.parentElement;
  }
}
function isMenuItem(node) {
  if (node && node.nodeType) node = getMenuNode(node);

  if (node) {
    if (node.menuNodeType === 'menuitem' || node.menuNodeType === 'dropdown') {
      return true;
    }
  }

  return false;
}
function isMenu(node) {
  if (node && node.nodeType) node = getMenuNode(node);

  if (node) {
    if (node.menuNodeType === 'menu') {
      return true;
    }
  }

  return false;
}
function isMenuNode(node) {
  if (node && node.nodeType) node = getMenuNode(node);
  return node && node instanceof _MenuNode__WEBPACK_IMPORTED_MODULE_2__["default"];
}
function getTargetChild(parent, targetElement) {
  var node = getClosestMenuNode(targetElement, parent.element);

  while (node) {
    if (node === parent) {
      return;
    }

    var _parent = node.parent;

    if (parent === _parent) {
      return node;
    }

    node = _parent;
  }
}

/***/ }),

/***/ "./src/menus/index.js":
/*!****************************!*\
  !*** ./src/menus/index.js ***!
  \****************************/
/*! exports provided: MenuBar, Menu, MenuItem, MenuNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ "./src/menus/MenuBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuBar", function() { return _MenuBar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./src/menus/Menu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuItem */ "./src/menus/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuNode */ "./src/menus/MenuNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuNode", function() { return _MenuNode__WEBPACK_IMPORTED_MODULE_3__["default"]; });










/***/ }),

/***/ "./tests/src/test_menu.js":
/*!********************************!*\
  !*** ./tests/src/test_menu.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/data */ "./src/core/data.js");
/* harmony import */ var menus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! menus */ "./src/menus/index.js");
/* harmony import */ var menus_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! menus/core */ "./src/menus/core.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




window.privateCache = core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"];

function build_test_menu_1() {
  var menu = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuBar"](),
      container = document.querySelector('#test-menu-area');
  container.appendChild(menu.element);
  var fileItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "File"
  }),
      editItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Edit"
  }),
      viewItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "View"
  }),
      navigateItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Navigate"
  }),
      codeItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Code"
  }),
      refactorItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Refactor"
  }),
      toolsItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Tools"
  }),
      vcsItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "VCS"
  }),
      windowItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Window"
  }),
      helpItem = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
    text: "Help"
  });
  menu.add(fileItem);
  menu.add(editItem);
  menu.add(viewItem);
  menu.add(navigateItem);
  menu.add(codeItem);
  menu.add(refactorItem);
  menu.add(toolsItem);
  menu.add(vcsItem);
  menu.add(windowItem);
  menu.add(helpItem);
  var fileSubMenu = new menus__WEBPACK_IMPORTED_MODULE_1__["Menu"]();
  fileItem.attachSubMenu(fileSubMenu);

  for (var i = 0; i < 10; i++) {
    var item = new menus__WEBPACK_IMPORTED_MODULE_1__["MenuItem"]({
      text: "Sub Item ".concat(i + 1)
    });
    fileSubMenu.add(item);
  }
}

function build_from_dom() {
  var root = menus__WEBPACK_IMPORTED_MODULE_1__["MenuBar"].widget({
    target: '#test-menubar'
  });
  window.root = root;
  return root;
}

build_from_dom();

function testMixin(superClass) {
  return (
    /*#__PURE__*/
    function (_superClass) {
      _inherits(_class, _superClass);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "test",
        value: function test() {
          console.log("Hello World");
        }
      }]);

      return _class;
    }(superClass)
  );
}

var TestClass =
/*#__PURE__*/
function () {
  function TestClass(msg) {
    _classCallCheck(this, TestClass);

    console.log(msg);
    this.msg = msg;
  }

  _createClass(TestClass, [{
    key: "test2",
    value: function test2() {
      console.log("Test class 2");
    }
  }]);

  return TestClass;
}();

window.testMixin = testMixin;
window.TestClass = TestClass;
window.getTargetChild = menus_core__WEBPACK_IMPORTED_MODULE_2__["getTargetChild"];
window.getClosestMenuNode = menus_core__WEBPACK_IMPORTED_MODULE_2__["getClosestMenuNode"];

/***/ })

/******/ });
});
//# sourceMappingURL=testMenu.bundle.js.map