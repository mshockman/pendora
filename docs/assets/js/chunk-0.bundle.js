(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[0],{

/***/ "./jekyll/js/pages/menubar_example.js":
/*!********************************************!*\
  !*** ./jekyll/js/pages/menubar_example.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBarExamplePage; });
/* harmony import */ var menu2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! menu2 */ "./src/menu2/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MenuBarExamplePage =
/*#__PURE__*/
function () {
  function MenuBarExamplePage() {
    _classCallCheck(this, MenuBarExamplePage);
  }

  _createClass(MenuBarExamplePage, [{
    key: "load",
    value: function load() {
      var main = document.getElementById('content');
      var menu = new menu2__WEBPACK_IMPORTED_MODULE_0__["MenuBar"]();
      menu.createItems([{
        text: "Root #1",
        children: [{
          text: "Child Item #1",
          href: "#"
        }, {
          text: "Child Item #2",
          href: "#"
        }, {
          text: "Child Item #3",
          href: "#"
        }, {
          text: "Child Item #4",
          href: "#"
        }, {
          text: "Child Item #5",
          href: "#"
        }]
      }, {
        text: "Root #2",
        children: [{
          text: "Child Item #1",
          href: "#"
        }, {
          text: "Child Item #2",
          href: "#"
        }, {
          text: "Child Item #3",
          href: "#"
        }, {
          text: "Child Item #4",
          href: "#"
        }, {
          text: "Child Item #5",
          href: "#"
        }]
      }, {
        text: "Root #3",
        children: [{
          text: "Child Item #1",
          href: "#"
        }, {
          text: "Child Item #2",
          href: "#"
        }, {
          text: "Child Item #3",
          href: "#"
        }, {
          text: "Child Item #4",
          href: "#"
        }, {
          text: "Child Item #5",
          href: "#"
        }]
      }, {
        text: "Root #4",
        children: [{
          text: "Child Item #1",
          href: "#"
        }, {
          text: "Child Item #2",
          href: "#"
        }, {
          text: "Child Item #3",
          href: "#"
        }, {
          text: "Child Item #4",
          href: "#"
        }, {
          text: "Child Item #5",
          href: "#"
        }]
      }, {
        text: "Root #5",
        children: [{
          text: "Child Item #1",
          href: "#"
        }, {
          text: "Child Item #2",
          href: "#"
        }, {
          text: "Child Item #3",
          href: "#"
        }, {
          text: "Child Item #4",
          href: "#"
        }, {
          text: "Child Item #5",
          href: "#"
        }]
      }]);
      menu.appendTo(main);
    }
  }]);

  return MenuBarExamplePage;
}();



/***/ }),

/***/ "./src/core/Publisher.js":
/*!*******************************!*\
  !*** ./src/core/Publisher.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Publisher; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Publisher =
/*#__PURE__*/
function () {
  function Publisher() {
    _classCallCheck(this, Publisher);

    this._topics = {};
  }

  _createClass(Publisher, [{
    key: "on",
    value: function on(topic, callback) {
      if (!this._topics[topic]) topic = [];

      this._topics[topic].push(callback);

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
        this._topics = {};
        return this;
      } else if (arguments.length === 1) {
        // Clear single topic.
        this._topics[topic] = [];
        return this;
      }

      if (!this._topics || !this._topics[topic] || !this._topics[topic].length) {
        // Topic list was either empty or didn't exist.  No need to remove anything.  Return;
        return this;
      }

      var callbacks = this._topics[topic];

      for (var i = 0; i < callback.length; i++) {
        var cb = callbacks[i];

        if (cb === callback || cb.fn === callback) {
          callbacks.splice(i, 1);
          break;
        }
      }

      if (callbacks.length === 0) {
        delete this._topics[topic];
      }

      return this;
    }
  }, {
    key: "hasEvent",
    value: function hasEvent(topic, callback) {
      if (arguments.length === 1) {
        return !!this._topics[topic];
      } else {
        var callbacks = this._topics[topic];

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
      if (this._topics[topic]) {
        var callbacks = this._topics[topic].slice(0);

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cb = _step.value;
            cb.apply(this, args);
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

      return this;
    }
  }]);

  return Publisher;
}();



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
/*! exports provided: clamp, firstValue, all, any, proto, randomChoice, arraysEqual, parseHTML, isEmptyObject, emptyElement, addClasses, removeClasses, assignAttributes, setElementOffset, getElementOffset, getScroll, isWindow, setScroll, selectElement, assert, parseBooleanOrInt, parseBooleanOrFloat, parseBoolean, parseIntValue, parseFloatValue, parseAny, validateChoice, choice, findChild, filterChildren, getOwnProperty, getPropertyByPath */
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
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
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
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
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
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
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

/***/ "./src/menu2/DropDown.js":
/*!*******************************!*\
  !*** ./src/menu2/DropDown.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropDown; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var DropDown =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(DropDown, _MenuNode);

  function DropDown(_ref) {
    var _this;

    var target = _ref.target,
        text = _ref.text,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? true : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? false : _ref$autoActivate,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "both" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect;

    _classCallCheck(this, DropDown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDown).call(this));
    _this.menuNodeType = "dropdown";
    _this.closeOnBlur = closeOnBlur;
    _this.timeout = timeout;
    _this.autoActivate = autoActivate;
    _this.toggle = toggle;
    _this.closeOnSelect = closeOnSelect;

    if (target) {
      _this.element = target;
    } else {
      _this.element = _this.render(text);
    }

    _this.init();

    return _this;
  }

  _createClass(DropDown, [{
    key: "render",
    value: function render(text) {
      var element = document.createElement('div'),
          button = document.createElement('button');
      button.type = "button";
      button.innerHTML = text;
      element.appendChild(button);
      return element;
    }
  }, {
    key: "activate",
    value: function activate() {
      if (this.isActive) return; // Already active

      this.isActive = true;
      this.clearTimer('autoActivate');

      if (this.parent) {
        if (!this.parent.isActive) {
          this.parent.activate();
        }

        this.parent.setActiveItem(this, true);
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {}
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {}
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {}
  }, {
    key: "onClick",
    value: function onClick(event) {}
  }]);

  return DropDown;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/Menu.js":
/*!***************************!*\
  !*** ./src/menu2/Menu.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu2/MenuItem.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




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
        autoActivate = _ref$autoActivate === void 0 ? false : _ref$autoActivate,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        _ref$openOnHover = _ref.openOnHover,
        openOnHover = _ref$openOnHover === void 0 ? false : _ref$openOnHover,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "both" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
        _ref$deactivateOnItem = _ref.deactivateOnItemHover,
        deactivateOnItemHover = _ref$deactivateOnItem === void 0 ? true : _ref$deactivateOnItem,
        context = _objectWithoutProperties(_ref, ["target", "closeOnBlur", "timeout", "autoActivate", "multiple", "openOnHover", "toggle", "closeOnSelect", "deactivateOnItemHover"]);

    _classCallCheck(this, Menu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this));
    _this.menuNodeType = "menu";
    _this.events = null;
    _this.MenuItemClass = _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"];
    _this.closeOnBlur = closeOnBlur;
    _this.timeout = timeout;
    _this.autoActivate = autoActivate;
    _this.multiple = multiple;
    _this.openOnHover = openOnHover;
    _this.toggle = toggle;
    _this.closeOnSelect = closeOnSelect;
    _this.deactivateOnItemHover = deactivateOnItemHover;

    if (target) {
      _this.element = target;
    } else {
      _this.element = _this.render(context);
    }

    _this.isVisible = false;

    _this.init();

    return _this;
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$arrow = _ref2.arrow,
          arrow = _ref2$arrow === void 0 ? false : _ref2$arrow;

      var element = document.createElement('div'),
          body = document.createElement('div');
      element.className = "menu";
      body.className = "menu__body";

      if (arrow) {
        var _arrow = document.createElement('div');

        _arrow.className = "menu__arrow";
        element.appendChild(_arrow);
      }

      element.appendChild(body);
      return element;
    }
  }, {
    key: "activate",
    value: function activate() {
      var _this2 = this;

      if (!this.isActive) {
        var parent = this.parent; // Set isActivate flag and add active classes.

        this.isActive = true; // Register document click handler

        if (this.closeOnBlur && !this._captureDocumentClick) {
          this._captureDocumentClick = {
            target: document,
            onDocumentClick: function onDocumentClick(event) {
              if (!_this2.element.contains(event.target)) {
                _this2.deactivate();
              }
            }
          };

          this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
        } // Notify parent that submenu activated.


        if (parent) {
          parent.publish('submenu.activate', this);
        }

        this.publish('menu.activate'); // Dispatch dom events.

        this.element.dispatchEvent(new CustomEvent('menu.activate', {
          detail: this,
          bubbles: true
        }));
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.isActive) {
        // Set flag and remove active classes.
        this.isActive = false; // Clear any active child items.

        this.clearItems(); // Remove document click handler that tracks user clicks outside of menu tree.

        if (this._captureDocumentClick) {
          this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);

          this._captureDocumentClick = null;
        } // clear timers


        this.clearTimer('timeout');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            child.clearTimer('activateItem');
          } // Notify parent that submenu deactivated.

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

        var parent = this.parent;

        if (parent) {
          parent.publish('submenu.deactivate', this);
        }

        this.publish('menu.deactivate'); // Dispatch dom events.

        this.element.dispatchEvent(new CustomEvent('menu.deactivate', {
          detail: this,
          bubbles: true
        }));
      }
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.isVisible) {
        this.isVisible = true;
        if (this.parent) this.parent.publish('submenu.shown', this);
        this.publish('menu.shown', this);
        this.element.dispatchEvent(new CustomEvent('menu.show', {
          detail: this,
          bubbles: true
        }));
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.isVisible) {
        this.isVisible = false;
        if (this.parent) this.parent.publish('submenu.hidden', this);
        this.publish('menu.hidden', this);
        this.element.dispatchEvent(new CustomEvent('menu.hide', {
          detail: this,
          bubbles: true
        }));
      }
    } //------------------------------------------------------------------------------------------------------------------
    // Tree methods.

  }, {
    key: "createItems",
    value: function createItems(data) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _step2.value,
              children = _step2$value.children,
              args = _objectWithoutProperties(_step2$value, ["children"]);

          var item = new this.MenuItemClass(args);

          if (children && children.length) {
            var submenu = new Menu();
            item.attachSubMenu(submenu);
            submenu.createItems(children);
          }

          this.append(item);
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
  }, {
    key: "addItem",
    value: function addItem(text, action) {
      var item = new this.MenuItemClass({
        text: text,
        action: action
      });
      this.append(item);
      return this;
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      var index = this._children.indexOf(item);

      if (index !== -1) {
        this._children.splice(index, 1);

        if (item.element.parentElement) item.element.parentElement.removeChild(item.element);
      }
    }
  }, {
    key: "hasItem",
    value: function hasItem(item) {
      return this._children.indexOf(item) !== -1;
    }
  }, {
    key: "append",
    value: function append(item) {
      var body = this.getMenuBody();
      body = body[body.length - 1];

      if (item.nodeType) {
        body.appendChild(item);
        return this;
      }

      if (item.parent) {
        item.parent.removeItem(item);
      }

      item.appendTo(body);

      if (item.isMenuItem && item.isMenuItem()) {
        item._parent = this;

        this._children.push(item);
      }

      return this;
    }
  }, {
    key: "clearItems",
    value: function clearItems() {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.activeItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var child = _step3.value;
          child.deactivate();
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
  }, {
    key: "setActiveItem",
    value: function setActiveItem(item) {
      if (!item.isActive) {
        item.activate();
        return;
      }

      if (!this.multiple) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.activeItems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var activeItem = _step4.value;

            if (activeItem.isActive && activeItem !== item) {
              activeItem.deactivate();
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
      }
    }
    /**
     * Returns list of all menu bodies for the menu.
     *
     * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
     * last menu body in the menu.
     *
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]>}
     */

  }, {
    key: "getMenuBody",
    value: function getMenuBody() {
      return this.element.querySelectorAll(':scope > .menu__body');
    } //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      this.clearTimer('timeout');
      this._isMouseOver = true;
      var item = this.getTargetItem(event.target);

      if (item && item.getEventDelegator() === this) {
        item.onMouseOver(event);
      }
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      var _this3 = this;

      this._isMouseOver = false;

      if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0 && !this.element.contains(event.relatedTarget)) {
        this.startTimer('timeout', function () {
          _this3.deactivate();
        }, this.timeout);
      }

      var targetItem = this.getTargetItem(event.target);

      if (targetItem && targetItem.getEventDelegator() === this) {
        this.onMouseOut(event);
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var target = this.getTargetNode(event.target);

      if (target === this) {
        if (this.isActive && this.toggleOff) {
          this.deactivate();
        } else if (!this.isActive && this.toggleOn) {
          this.activate();
        }
      } else if (target.isMenuItem()) {
        if (target.getEventDelegator() === this) {
          target.onClick(event);
        }

        if (this.isActive && !target.hasSubMenu()) {
          this.deactivate();
        }
      }
    }
    /**
     * Will return true if menu items should toggle on.
     *
     * @returns {boolean}
     */

  }, {
    key: "activeItems",
    get: function get() {
      var r = [];
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var item = _step5.value;

          if (item.isActive) {
            r.push(item);
          }
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

      return r;
    }
  }, {
    key: "toggleOn",
    get: function get() {
      return this.toggle === 'on' || this.toggle === 'both';
    }
    /**
     * Will return true if menu items should toggle off.
     *
     * @returns {boolean}
     */

  }, {
    key: "toggleOff",
    get: function get() {
      return this.toggle === 'off' || this.toggle === 'both';
    }
  }]);

  return Menu;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/MenuBar.js":
/*!******************************!*\
  !*** ./src/menu2/MenuBar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBar; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menu2/Menu.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? true : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? false : _ref$autoActivate,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        _ref$openOnHover = _ref.openOnHover,
        openOnHover = _ref$openOnHover === void 0 ? true : _ref$openOnHover,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "both" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
        _ref$deactivateOnItem = _ref.deactivateOnItemHover,
        deactivateOnItemHover = _ref$deactivateOnItem === void 0 ? true : _ref$deactivateOnItem;

    _classCallCheck(this, MenuBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuBar).call(this, {
      target: target,
      closeOnBlur: closeOnBlur,
      timeout: timeout,
      autoActivate: autoActivate,
      multiple: multiple,
      openOnHover: openOnHover,
      toggle: toggle,
      closeOnSelect: closeOnSelect,
      deactivateOnItemHover: deactivateOnItemHover
    }));
    _this.isVisible = true;
    return _this;
  }

  _createClass(MenuBar, [{
    key: "render",
    value: function render(context) {
      var element = document.createElement('div');
      element.className = "menubar";
      return element;
    }
  }, {
    key: "getMenuBody",
    value: function getMenuBody() {
      return [this.element];
    }
  }]);

  return MenuBar;
}(_Menu__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/MenuItem.js":
/*!*******************************!*\
  !*** ./src/menu2/MenuItem.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuItem; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var MenuItem =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(MenuItem, _MenuNode);

  function MenuItem() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        text = _ref.text,
        action = _ref.action,
        _ref$href = _ref.href,
        href = _ref$href === void 0 ? null : _ref$href,
        target = _ref.target,
        classes = _ref.classes,
        _ref$nodeName = _ref.nodeName,
        nodeName = _ref$nodeName === void 0 ? "div" : _ref$nodeName,
        context = _objectWithoutProperties(_ref, ["text", "action", "href", "target", "classes", "nodeName"]);

    _classCallCheck(this, MenuItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).call(this));

    if (target) {
      _this.element = target;
    } else {
      _this.element = _this.render(_objectSpread({
        text: text,
        nodeName: nodeName,
        href: href
      }, context));
    }

    if (classes) {
      _this.addClass(classes);
    }

    if (action) _this.addAction(action);
    return _this;
  }

  _createClass(MenuItem, [{
    key: "render",
    value: function render() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          text = _ref2.text,
          _ref2$nodeName = _ref2.nodeName,
          nodeName = _ref2$nodeName === void 0 ? "div" : _ref2$nodeName,
          _ref2$href = _ref2.href,
          href = _ref2$href === void 0 ? null : _ref2$href;

      var element = document.createElement(nodeName),
          button = document.createElement('a');
      element.className = "menuitem";
      button.type = "button";
      button.innerHTML = text;
      button.className = "menuitem__button";

      if (href) {
        button.href = href;
      }

      element.appendChild(button);
      return element;
    }
  }, {
    key: "activate",
    value: function activate() {
      if (this.isActive) return;

      if (this.parent) {
        if (!this.parent.isActive) {
          this.parent.activate();
        }

        this.parent.setActiveItem(this);
      }

      this.clearTimer('activateItem');

      if (this.submenu) {
        this.submenu.show();
      }

      this.publish('activate', this);

      if (this.parent) {
        this.publish('menuitem.activate', this);
      }

      this.element.dispatchEvent(new CustomEvent('menuitem.activate', {
        detail: this,
        bubbles: true
      }));
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (!this.isActive) return;

      if (this.submenu) {
        this.submenu.deactivate();
        this.submenu.hide();
      }

      this.publish('deactivate', this);
      if (this.parent) this.parent.publish('menuitem.deactivate', this);
      this.element.dispatchEvent(new CustomEvent('menuitem.deactivate', {
        detail: this,
        bubbles: true
      }));
    }
  }, {
    key: "select",
    value: function select() {
      var o = this;

      while (o) {
        o.publish('menuitem.selected', this);
        o = o.parent;
      }

      this.element.dispatchEvent(new CustomEvent('menuitem.selected', {
        detail: this,
        bubbles: true
      }));
    }
  }, {
    key: "isMenuItem",
    value: function isMenuItem() {
      return true;
    } //------------------------------------------------------------------------------------------------------------------
    // Action management

  }, {
    key: "addAction",
    value: function addAction(action) {}
  }, {
    key: "removeAction",
    value: function removeAction(action) {}
  }, {
    key: "hasAction",
    value: function hasAction(action) {}
  }, {
    key: "clearActions",
    value: function clearActions() {} //------------------------------------------------------------------------------------------------------------------
    // Manage submenu

  }, {
    key: "attachSubMenu",
    value: function attachSubMenu(submenu) {
      if (this.submenu) {
        throw new Error("MenuItem can only have one submenu.");
      }

      if (submenu.parent) {
        submenu.parent.detachSubMenu();
      }

      submenu._parent = this;
      this._children = [submenu];

      if (!submenu.element.parentElement) {
        submenu.appendTo(this.element);
      }
    }
  }, {
    key: "detachSubMenu",
    value: function detachSubMenu() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var submenu = this.submenu;

      if (submenu) {
        this._children = [];
        submenu._parent = null;
        if (remove) submenu.remove();
      }

      return submenu;
    }
  }, {
    key: "hasSubMenu",
    value: function hasSubMenu() {
      return !!this.submenu;
    }
  }, {
    key: "onClick",
    //------------------------------------------------------------------------------------------------------------------
    // Event handlers
    value: function onClick(event) {
      console.log("click");

      if (this.isDisabled) {
        event.preventDefault();
      }

      if (this.hasSubMenu()) {
        if (this.isActive && this.toggleOff) {
          this.deactivate();
        } else if (!this.isActive && this.toggleOn) {
          this.activate();
        }
      } else {
        if (!this.isActive && this.toggleOn) {
          this.activate();
        }

        this.select();
      }
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      var _this2 = this;

      if (!this.element.contains(event.relatedTarget)) return;
      var parent = this.parent;

      if (!this.isActive && !this.isDisabled) {
        if (parent.isActive) {
          if (parent.openOnHover === true) {
            this.activate();
          } else if (typeof parent.openOnHover === 'number' && parent.openOnHover >= 0) {
            this.startTimer('activateItem', function () {
              if (!_this2.isDisabled) {
                _this2.activate();
              }
            }, parent.openOnHover);
          }
        } else {
          if (parent.autoActivate === true) {
            this.activate();
          } else if (typeof parent.autoActivate === 'number' && parent.autoActivate >= 0) {
            this.startTimer('activateItem', function () {
              if (!_this2.isDisabled) {
                _this2.activate();
              }
            }, parent.autoActivate);
          }
        }
      }

      if (!parent.multiple && parent.deactivateOnItemHover) {
        this.clearItems();
      }
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      if (this.isActive && !this.hasSubMenu()) {}
    } //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

  }, {
    key: "submenu",
    get: function get() {
      return this._children[0];
    },
    set: function set(value) {
      if (!value) {
        this.detachSubMenu();
      } else {
        this.attachSubMenu(value);
      }
    }
  }, {
    key: "autoActivate",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "openOnHover",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "timeout",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "closeOnBlur",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "toggle",
    get: function get() {},
    set: function set(value) {}
  }, {
    key: "closeOnSelect",
    get: function get() {},
    set: function set(value) {}
  }]);

  return MenuItem;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/MenuNode.js":
/*!*******************************!*\
  !*** ./src/menu2/MenuNode.js ***!
  \*******************************/
/*! exports provided: MENU_MAP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_MAP", function() { return MENU_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuNode; });
/* harmony import */ var core_Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Publisher */ "./src/core/Publisher.js");
/* harmony import */ var core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/errors */ "./src/core/errors.js");
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var MENU_MAP = new WeakMap();

function inheritable(target) {
  var key = target.key;

  target.descriptor.get = function () {
    var value = this._props[key];

    if (value === 'inherit') {
      return this._parent ? this._parent[key] : undefined;
    } else if (value === 'root') {
      var root = this.root;
      return root ? root[key] : undefined;
    } else {
      return value;
    }
  };

  target.descriptor.set = function (value) {
    this._props[key] = value;
  };

  return {};
}

var MenuNode = _decorate(null, function (_initialize, _Publisher) {
  var MenuNode =
  /*#__PURE__*/
  function (_Publisher2) {
    _inherits(MenuNode, _Publisher2);

    function MenuNode() {
      var _this;

      _classCallCheck(this, MenuNode);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuNode).call(this));

      _initialize(_assertThisInitialized(_this));

      _this._parent = null;
      _this._children = [];
      _this._props = {};
      _this._timers = {};
      /**
       * @type {undefined|null|HTMLElement}
       * @private
       */

      _this._element = undefined;
      _this._isActive = false;
      _this._isVisible = true;
      _this._isDisabled = false;
      _this.nodeType = null;
      _this.isController = false;
      return _this;
    }

    return MenuNode;
  }(_Publisher);

  return {
    F: MenuNode,
    d: [{
      kind: "field",
      decorators: [inheritable],
      key: "test",
      value: void 0
    }, {
      kind: "method",
      key: "init",
      value: function init() {
        var _this2 = this;

        if (this.boundEvents) return;
        this.boundEvents = {};

        this.boundEvents.onMouseOver = function (event) {
          _this2.publish('onMouseOver', event, _this2);

          _this2.onMouseOver(event);

          if (!_this2.element.contains(event.relatedTarget)) {
            _this2.publish('onMouseEnter', event, _this2); // if(this.onMouseEnter) this.onMouseEnter(event);

          }
        };

        this.boundEvents.onMouseOut = function (event) {
          _this2.publish('onMouseOut', event, _this2);

          _this2.onMouseOut(event);

          if (!_this2.element.contains(event.relatedTarget)) {
            _this2.publish('onMouseLeave', event, _this2); // if(this.onMouseLeave) this.onMouseLeave(event);

          }
        };

        this.boundEvents.onClick = function (event) {
          _this2.publish('onClick', event, _this2);

          _this2.onClick(event);
        };

        this.element.addEventListener('click', this.boundEvents.onClick);
        this.element.addEventListener('onMouseOut', this.boundEvents.onMouseOut);
        this.element.addEventListener('onMouseOver', this.boundEvents.onMouseOver);
        this.isController = true;
      }
    }, {
      kind: "method",
      key: "destroy",
      value: function destroy() {
        if (this.events && this.hasElement()) {
          this.element.removeEventListener('click', this.boundEvents.onClick);
          this.element.removeEventListener('onMouseOut', this.boundEvents.onMouseOut);
          this.element.removeEventListener('onMouseOver', this.boundEvents.onMouseOver);
          this.events = null;
          this.isController = false;
        }

        this.element = null;
      }
      /**
       * Renders the component.
       */

    }, {
      kind: "method",
      key: "render",
      value: function render() {}
    }, {
      kind: "get",
      key: "parent",
      value: function parent() {
        return this._parent || null;
      }
      /**
       * Returns the root node of the menu tree.
       *
       * @returns {MenuNode}
       */

    }, {
      kind: "get",
      key: "root",
      value: function root() {
        var r = this,
            o = this;

        while (o) {
          o = o.parent;

          if (o) {
            r = o;
          }
        }

        return r;
      }
      /**
       * Returns the closest parent menu.
       * @returns {MenuNode|null}
       */

    }, {
      kind: "get",
      key: "parentMenu",
      value: function parentMenu() {
        var parent = this.parent;
        return parent.closest(function (node) {
          return node.nodeType === 'menu';
        });
      }
      /**
       * Returns the closest parent item.
       * @returns {MenuNode|null}
       */

    }, {
      kind: "get",
      key: "parentItem",
      value: function parentItem() {
        var parent = this.parent;
        return parent.closest(function (node) {
          return node.nodeType === 'menuitem' || node.nodeType === 'dropdown';
        });
      }
      /**
       * Returns the next sibling node.
       * @returns {MenuNode|null}
       */

    }, {
      kind: "get",
      key: "nextSibling",
      value: function nextSibling() {
        return this.getOffsetSibling(1);
      }
      /**
       * Returns the previous sibling node.
       * @returns {MenuNode|null}
       */

    }, {
      kind: "get",
      key: "previousSibling",
      value: function previousSibling() {
        return this.getOffsetSibling(-1);
      }
    }, {
      kind: "get",
      key: "children",
      value: function children() {
        return this._children.slice(0);
      }
    }, {
      kind: "get",
      key: "isActive",
      value: function isActive() {
        return this._isActive;
      }
    }, {
      kind: "set",
      key: "isActive",
      value: function isActive(value) {
        value = !!value;

        if (value !== this._isActive) {
          if (value) {
            this.element.classList.add('active');
          } else {
            this.element.classList.remove('active');
          }

          this._isActive = value;
        }
      }
    }, {
      kind: "get",
      key: "isDisabled",
      value: function isDisabled() {
        return this._isDisabled;
      }
    }, {
      kind: "set",
      key: "isDisabled",
      value: function isDisabled(value) {
        value = !!value;

        if (value !== this._isDisabled) {
          if (value) {
            this.element.classList.add('disabled');
          } else {
            this.element.classList.remove('disabled');
          }

          this._isDisabled = value;
        }
      }
    }, {
      kind: "get",
      key: "isVisible",
      value: function isVisible() {
        return this._isVisible;
      }
    }, {
      kind: "set",
      key: "isVisible",
      value: function isVisible(value) {
        value = !!value;

        if (value !== this._isVisible) {
          if (value) {
            this.element.classList.remove('hidden');
          } else {
            this.element.classList.add('hidden');
          }

          this._isVisible = value;
        }
      }
    }, {
      kind: "method",
      key: "hasElement",
      value: function hasElement() {
        return !!this._element;
      }
    }, {
      kind: "get",
      key: "element",
      value: function element() {
        if (this._element === undefined) {
          this.element = this.render();
        }

        return this._element;
      }
    }, {
      kind: "set",
      key: "element",
      value: function element(value) {
        if (this._element) {
          MENU_MAP["delete"](this._element);
          this._element = undefined;
        }

        if (typeof value === 'string') {
          this._element = document.querySelector(value);
          MENU_MAP.set(this._element, this);
        } else if (typeof value === 'function') {
          this._element = value.call(this);
          MENU_MAP.set(this._element, this);
        } else if (value) {
          this._element = value;
          MENU_MAP.set(this._element, this);
        } else {
          this._element = value; // null or undefined
        }
      }
    }, {
      kind: "method",
      key: "getOffsetSibling",
      value: function getOffsetSibling() {
        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var parent = this.parent;

        if (parent) {
          var children = parent.children,
              i = children ? children.indexOf(this) : -1;

          if (i >= 0) {
            i += offset;

            if (i >= 0) {
              return children[i];
            }
          }
        }

        return null;
      }
    }, {
      kind: "method",
      key: "appendTo",
      value: function appendTo(selector) {
        if (typeof selector === 'string') {
          document.querySelector(selector).appendChild(this.element);
        } else if (selector.appendChild) {
          selector.appendChild(this.element);
        } else if (selector.append) {
          selector.append(this.element);
        }
      }
    }, {
      kind: "method",
      key: "remove",
      value: function remove() {
        if (this.element.parentElement) {
          this.element.parentElement.removeChild(this.element);
        }

        return this;
      }
    }, {
      kind: "method",
      key: "closest",
      value: function closest(fn) {
        var o = this;

        while (o) {
          if (fn.call(this, o)) return o;
          o = o.parent;
        }

        return null;
      }
    }, {
      kind: "method",
      key: "getDescendants",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function getDescendants() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, grandchild;

        return regeneratorRuntime.wrap(function getDescendants$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = this.children[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 38;
                  break;
                }

                child = _step.value;
                _context.next = 9;
                return child;

              case 9:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 12;
                _iterator2 = child.getDescendants()[Symbol.iterator]();

              case 14:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context.next = 21;
                  break;
                }

                grandchild = _step2.value;
                _context.next = 18;
                return grandchild;

              case 18:
                _iteratorNormalCompletion2 = true;
                _context.next = 14;
                break;

              case 21:
                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](12);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t0;

              case 27:
                _context.prev = 27;
                _context.prev = 28;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 30:
                _context.prev = 30;

                if (!_didIteratorError2) {
                  _context.next = 33;
                  break;
                }

                throw _iteratorError2;

              case 33:
                return _context.finish(30);

              case 34:
                return _context.finish(27);

              case 35:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 38:
                _context.next = 44;
                break;

              case 40:
                _context.prev = 40;
                _context.t1 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 44:
                _context.prev = 44;
                _context.prev = 45;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 47:
                _context.prev = 47;

                if (!_didIteratorError) {
                  _context.next = 50;
                  break;
                }

                throw _iteratorError;

              case 50:
                return _context.finish(47);

              case 51:
                return _context.finish(44);

              case 52:
              case "end":
                return _context.stop();
            }
          }
        }, getDescendants, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
      })
      /**
       * Creates a timer with the given name.  Only one timer with that name can be active per object.
       * If another timer with the same name is created the previous one will be cleared if `clear` is true.
       * Otherwise if `clear` is false a KeyError with be thrown.  The callback function for the timer is called
       * with the current object as it's `this` and the timer object as it's only parameter following the pattern
       *
       * this::fn(timer);
       *
       * @param name {String} The name of the timer.
       * @param fn {function(timer)} Function to call.
       * @param time {Number} The time to wait.
       * @param interval If true setInterval will be used instead of setTimeout
       * @param clear If true an previous timers of the same name will be canceled before creating a new one.  Otherwise a KeyError will be thrown.
       * @returns {{status, id, cancel, type}}
       */

    }, {
      kind: "method",
      key: "startTimer",
      value: function startTimer(name, fn, time) {
        var _this3 = this;

        var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (clear && this._timers[name]) {
          this._timers[name].cancel();
        } else if (this._timers[name]) {
          throw new core_errors__WEBPACK_IMPORTED_MODULE_1__["KeyError"]("Timer already exists.");
        }

        var timer = this._timers[name] = {
          status: 'running',
          id: null,
          cancel: null,
          type: null
        };

        if (interval) {
          var id = timer.id = setInterval(function (timer) {
            fn.call(_this3, timer);
          }, time, timer);
          timer.type = 'interval';

          timer.cancel = function () {
            if (_this3._timers[name] === timer) {
              clearInterval(id);
              delete _this3._timers[name];
              timer.status = 'canceled';
            }
          };
        } else {
          var _id2 = timer.id = setTimeout(function (timer) {
            delete _this3._timers[name];
            timer.status = 'complete';
            fn.call(_this3, timer);
          }, time, timer);

          timer.type = 'timeout';

          timer.cancel = function () {
            if (_this3._timers[name] === timer) {
              clearTimeout(_id2);
              delete _this3._timers[name];
              timer.status = 'canceled';
            }
          };
        }

        return timer;
      }
      /**
       * Clears the timer with the given name.
       *
       * @param name
       * @returns {boolean} True if a timer was canceled. False if not timer exists.
       */

    }, {
      kind: "method",
      key: "clearTimer",
      value: function clearTimer(name) {
        if (this._timers[name]) {
          this._timers[name].cancel();

          return true;
        }

        return false;
      }
      /**
       * Returns the timer object if it exists.
       *
       * @param name
       * @returns {*}
       */

    }, {
      kind: "method",
      key: "getTimer",
      value: function getTimer(name) {
        return this._timers[name];
      }
      /**
       * Returns the MenuNode that is responsible for delegating the events.
       *
       * @returns {null|{isController}|any}
       */

    }, {
      kind: "method",
      key: "getEventDelegator",
      value: function getEventDelegator() {
        var o = this.element;

        while (o) {
          var instance = MENU_MAP.get(o);

          if (instance && instance.isController) {
            return instance;
          }

          o = o.parentElement;
        }

        return null;
      }
    }, {
      kind: "method",
      key: "getTargetNode",
      value: function getTargetNode(target) {
        var o = target;

        while (o) {
          var instance = MENU_MAP.get(o);

          if (instance) {
            return instance;
          }

          if (o === this.element) {
            break;
          }

          o = o.parentElement;
        }

        return null;
      }
    }, {
      kind: "method",
      key: "getTargetItem",
      value: function getTargetItem(target) {
        var o = target;

        while (o) {
          var instance = MENU_MAP.get(o);

          if (instance && instance.isMenuItem()) {
            return instance;
          }

          if (o === this.element) {
            break;
          }

          o = o.parentElement;
        }

        return null;
      }
    }, {
      kind: "method",
      key: "getTargetMenu",
      value: function getTargetMenu(target) {
        var o = target;

        while (o) {
          var instance = MENU_MAP.get(o);

          if (instance && instance.isMenu()) {
            return instance;
          }

          if (o === this.element) {
            break;
          }

          o = o.parentElement;
        }

        return null;
      }
    }, {
      kind: "method",
      key: "isMenuItem",
      value: function isMenuItem() {
        return false;
      }
    }, {
      kind: "method",
      key: "isMenu",
      value: function isMenu() {
        return false;
      } //------------------------------------------------------------------------------------------------------------------
      // Getters and Setters

    }, {
      kind: "get",
      key: "id",
      value: function id() {
        return this.element.id;
      }
    }, {
      kind: "set",
      key: "id",
      value: function id(_id) {
        if (this.element) this.element.id = _id;
      }
    }, {
      kind: "get",
      key: "classList",
      value: function classList() {
        return this.element.classList;
      }
    }, {
      kind: "get",
      key: "dataset",
      value: function dataset() {
        return this.element.dataset;
      }
    }, {
      kind: "get",
      key: "style",
      value: function style() {
        return this.element.style;
      }
    }, {
      kind: "set",
      key: "style",
      value: function style(_style) {
        this.element.style = _style;
      }
    }, {
      kind: "method",
      key: "addClass",
      value: function addClass(classes) {
        return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(this.element, classes);
      }
    }, {
      kind: "method",
      key: "removeClass",
      value: function removeClass(classes) {
        return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["removeClasses"])(this.element, classes);
      }
    }, {
      kind: "method",
      "static": true,
      key: "getInstance",
      value: function getInstance(element) {
        return MENU_MAP.get(element);
      }
    }]
  };
}, core_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/index.js":
/*!****************************!*\
  !*** ./src/menu2/index.js ***!
  \****************************/
/*! exports provided: MenuBar, MenuItem, Menu, DropDown, MenuNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ "./src/menu2/MenuBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuBar", function() { return _MenuBar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu2/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./src/menu2/Menu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropDown */ "./src/menu2/DropDown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropDown", function() { return _DropDown__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuNode", function() { return _MenuNode__WEBPACK_IMPORTED_MODULE_4__["default"]; });












/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map