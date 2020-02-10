(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[3],{

/***/ "./src/core/Component.js":
/*!*******************************!*\
  !*** ./src/core/Component.js ***!
  \*******************************/
/*! exports provided: SYMBOLS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOLS", function() { return SYMBOLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors */ "./src/core/errors.js");
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





var SYMBOLS = {
  appendChild: Symbol("appendChild")
};

var Component =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Component, _Publisher);

  function Component(element) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _timers.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _element, Object(_utility__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(element));

    return _this;
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {}
  }, {
    key: "appendTo",
    value: function appendTo(selector) {
      if (typeof selector === 'string') {
        document.querySelector(selector).appendChild(_classPrivateFieldGet(this, _element));
      } else if (selector.nodeType && selector.appendChild) {
        selector.appendChild(_classPrivateFieldGet(this, _element));
      } else if (selector[SYMBOLS.appendChild]) {
        selector[SYMBOLS].appendChild(_classPrivateFieldGet(this, _element));
      } else if (_classPrivateFieldGet(selector, _element)) {
        _classPrivateFieldGet(selector, _element).appendChild(_classPrivateFieldGet(this, _element));
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "removeFrom",
    value: function removeFrom() {
      if (_classPrivateFieldGet(this, _element).parentElement) {
        _classPrivateFieldGet(this, _element).parentElement.removeChild(_classPrivateFieldGet(this, _element));
      }
    }
  }, {
    key: "getBoundingClientRect",
    value: function getBoundingClientRect() {
      return _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"].getBoundingClientRect(_classPrivateFieldGet(this, _element));
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return _classPrivateFieldGet(this, _element).getAttribute(name);
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(name) {
      return _classPrivateFieldGet(this, _element).hasAttribute(name);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      return _classPrivateFieldGet(this, _element).removeAttribute(name);
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      return _classPrivateFieldGet(this, _element).setAttribute(name, value);
    }
  }, {
    key: "addClass",
    value: function addClass(classes) {
      return Object(_utility__WEBPACK_IMPORTED_MODULE_1__["addClasses"])(_classPrivateFieldGet(this, _element), classes);
    }
  }, {
    key: "removeClass",
    value: function removeClass(classes) {
      return Object(_utility__WEBPACK_IMPORTED_MODULE_1__["removeClasses"])(_classPrivateFieldGet(this, _element), classes);
    }
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
    key: "startTimer",
    value: function startTimer(name, fn, time) {
      var _this2 = this;

      var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (!_classPrivateFieldGet(this, _timers)) {
        _classPrivateFieldSet(this, _timers, {});
      }

      if (clear && _classPrivateFieldGet(this, _timers)[name]) {
        _classPrivateFieldGet(this, _timers)[name].cancel();
      } else if (this._timers[name]) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_3__["KeyError"]("Timer already exists.");
      }

      var timer = _classPrivateFieldGet(this, _timers)[name] = {
        status: 'running',
        id: null,
        cancel: null,
        type: null
      };

      if (interval) {
        var id = timer.id = setInterval(function (timer) {
          fn.call(_this2, timer);
        }, time, timer);
        timer.type = 'interval';

        timer.cancel = function () {
          if (_classPrivateFieldGet(_this2, _timers)[name] === timer) {
            clearInterval(id);
            delete _classPrivateFieldGet(_this2, _timers)[name];
            timer.status = 'canceled';
          }
        };
      } else {
        var _id = timer.id = setTimeout(function (timer) {
          delete _classPrivateFieldGet(_this2, _timers)[name];
          timer.status = 'complete';
          fn.call(_this2, timer);
        }, time, timer);

        timer.type = 'timeout';

        timer.cancel = function () {
          if (_classPrivateFieldGet(_this2, _timers)[name] === timer) {
            clearTimeout(_id);
            delete _classPrivateFieldGet(_this2, _timers)[name];
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
    key: "clearTimer",
    value: function clearTimer(name) {
      if (_classPrivateFieldGet(this, _timers) && _classPrivateFieldGet(this, _timers)[name]) {
        _classPrivateFieldGet(this, _timers)[name].cancel();

        return true;
      }

      return false;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the timer object if it exists.
     *
     * @param name
     * @returns {*}
     */

  }, {
    key: "getTimer",
    value: function getTimer(name) {
      return _classPrivateFieldGet(this, _timers) && _classPrivateFieldGet(this, _timers)[name] ? _classPrivateFieldGet(this, _timers)[name] : null;
    }
  }, {
    key: "hasTimer",
    value: function hasTimer(name) {
      return !!this.getTimer(name);
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.classList.contains('disabled');
    },
    set: function set(value) {
      var isDisabled = this.isDisabled;

      if (!isDisabled && value) {
        this.classList.remove('disabled');
      } else if (isDisabled && !value) {
        this.classList.add('disabled');
      }
    }
  }, {
    key: "disabled",
    get: function get() {
      return this.isDisabled;
    },
    set: function set(value) {
      this.isDisabled = value;
    }
  }, {
    key: "id",
    get: function get() {
      return _classPrivateFieldGet(this, _element).id;
    },
    set: function set(value) {
      _classPrivateFieldGet(this, _element).id = value;
    }
  }, {
    key: "style",
    get: function get() {
      return _classPrivateFieldGet(this, _element).style;
    },
    set: function set(value) {
      _classPrivateFieldGet(this, _element).style = value;
    }
  }, {
    key: "classList",
    get: function get() {
      return _classPrivateFieldGet(this, _element).classList;
    },
    set: function set(value) {
      _classPrivateFieldGet(this, _element).classList = value;
    }
  }, {
    key: "dataset",
    get: function get() {
      return _classPrivateFieldGet(this, _element).dataset;
    },
    set: function set(value) {
      _classPrivateFieldGet(this, _element).dataset = value;
    }
  }, {
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _element);
    }
  }]);

  return Component;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _timers = new WeakMap();



/***/ })

}]);
//# sourceMappingURL=chunk-3.bundle.js.map