(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[8],{

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

/***/ "./src/core/ui/TabBar.js":
/*!*******************************!*\
  !*** ./src/core/ui/TabBar.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TabBar; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _autoloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../autoloader */ "./src/autoloader.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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




var TabBar =
/*#__PURE__*/
function (_Component) {
  _inherits(TabBar, _Component);

  function TabBar(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$onClass = _ref.onClass,
        onClass = _ref$onClass === void 0 ? "active" : _ref$onClass,
        _ref$offClass = _ref.offClass,
        offClass = _ref$offClass === void 0 ? null : _ref$offClass,
        _ref$openClass = _ref.openClass,
        openClass = _ref$openClass === void 0 ? "open" : _ref$openClass,
        _ref$closeClass = _ref.closeClass,
        closeClass = _ref$closeClass === void 0 ? null : _ref$closeClass;

    _classCallCheck(this, TabBar);

    if (!element) {
      element = document.createElement('div');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TabBar).call(this, element));

    _onClass.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _offClass.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _openClass.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _closeClass.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _onClass, onClass);

    _classPrivateFieldSet(_assertThisInitialized(_this), _offClass, offClass);

    _classPrivateFieldSet(_assertThisInitialized(_this), _openClass, openClass);

    _classPrivateFieldSet(_assertThisInitialized(_this), _closeClass, closeClass);

    _this.element.classList.add('tab-bar');

    _this.element.addEventListener('click', function (event) {
      var tab = event.target.closest("[data-tab]");

      if (tab && _this.element.contains(tab)) {
        _this.activateTab(tab);
      }
    });

    return _this;
  }

  _createClass(TabBar, [{
    key: "getTabs",
    value: function getTabs() {
      return this.element.querySelectorAll("[data-tab]");
    }
  }, {
    key: "getActiveTab",
    value: function getActiveTab() {
      return this.element.querySelector("[data-tab].".concat(_classPrivateFieldGet(this, _onClass)));
    }
  }, {
    key: "activateTab",
    value: function activateTab(tab) {
      var current = this.getActiveTab();

      if (current !== tab) {
        this.deactivateTab(current);
        var target = document.querySelector(tab.dataset.tab);

        if (target) {
          target.classList.add(_classPrivateFieldGet(this, _openClass));
          if (_classPrivateFieldGet(this, _closeClass)) target.classList.remove(_classPrivateFieldGet(this, _closeClass));
        }

        tab.classList.add(_classPrivateFieldGet(this, _onClass));
        if (_classPrivateFieldGet(this, _offClass)) tab.classList.remove(_classPrivateFieldGet(this, _offClass));
      }
    }
  }, {
    key: "deactivateTab",
    value: function deactivateTab(tab) {
      var target = document.querySelector(tab.dataset.tab);

      if (target) {
        target.classList.remove(_classPrivateFieldGet(this, _openClass));
        if (_classPrivateFieldGet(this, _closeClass)) target.classList.add(_classPrivateFieldGet(this, _closeClass));
      }

      tab.classList.remove(_classPrivateFieldGet(this, _onClass));
      if (_classPrivateFieldGet(this, _offClass)) tab.classList.add(_classPrivateFieldGet(this, _offClass));
    }
  }]);

  return TabBar;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _onClass = new WeakMap();

var _offClass = new WeakMap();

var _openClass = new WeakMap();

var _closeClass = new WeakMap();


_autoloader__WEBPACK_IMPORTED_MODULE_1__["default"].register('tab-bar', function (element) {
  return new TabBar(element);
});

/***/ }),

/***/ "./tests/src/test_tabs.js":
/*!********************************!*\
  !*** ./tests/src/test_tabs.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestTabPage; });
/* harmony import */ var core_ui_TabBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/TabBar */ "./src/core/ui/TabBar.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TestTabPage =
/*#__PURE__*/
function () {
  function TestTabPage() {
    _classCallCheck(this, TestTabPage);
  }

  _createClass(TestTabPage, [{
    key: "load",
    value: function load() {}
  }]);

  return TestTabPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-8.bundle.js.map