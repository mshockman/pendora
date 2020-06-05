(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[10],{

/***/ "./docs/js/pages/documentation/datagrid/page_dataheader.js":
/*!*****************************************************************!*\
  !*** ./docs/js/pages/documentation/datagrid/page_dataheader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataHeaderPage; });
/* harmony import */ var datagrid_DataGridHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datagrid/DataGridHeader */ "./src/datagrid/DataGridHeader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DataHeaderPage =
/*#__PURE__*/
function () {
  function DataHeaderPage() {
    _classCallCheck(this, DataHeaderPage);
  }

  _createClass(DataHeaderPage, [{
    key: "load",
    value: function load() {
      var header = new datagrid_DataGridHeader__WEBPACK_IMPORTED_MODULE_0__["default"]({
        columns: [{
          label: "Test #1",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #2",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #3",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #4",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #5",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }]
      });
      header.appendTo("#data-grid-header-container1");
    }
  }]);

  return DataHeaderPage;
}();



/***/ }),

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



/***/ }),

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

/***/ "./src/core/ui/Overlay.js":
/*!********************************!*\
  !*** ./src/core/ui/Overlay.js ***!
  \********************************/
/*! exports provided: symbolShow, symbolHide, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbolShow", function() { return symbolShow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbolHide", function() { return symbolHide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Overlay; });
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }





var symbolShow = Symbol("show"),
    symbolHide = Symbol("hide");

function getXIntersectAmount(rect1, rect2) {
  var left = Math.max(rect1.left, rect2.left),
      right = Math.min(rect1.right, rect2.right);
  return left > right ? 0 : right - left;
}

function getYIntersectAmount(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top),
      bottom = Math.min(rect1.bottom, rect2.bottom);
  return top > bottom ? 0 : bottom - top;
}

var DEFAULT_PLACEMENTS = {
  top: {
    my: "bottom",
    at: "top",
    of: "border-top",
    arrow: "bottom"
  },
  bottom: {
    my: "top",
    at: "bottom",
    of: "border-bottom",
    arrow: "top"
  },
  right: {
    my: "left",
    at: "right",
    of: "border-right",
    arrow: "left"
  },
  left: {
    my: "right",
    at: "left",
    of: "border-left",
    arrow: "right"
  }
};

var Overlay =
/*#__PURE__*/
function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$sticky = _ref.sticky,
        sticky = _ref$sticky === void 0 ? true : _ref$sticky,
        _ref$fit = _ref.fit,
        fit = _ref$fit === void 0 ? null : _ref$fit,
        _ref$showFX = _ref.showFX,
        showFX = _ref$showFX === void 0 ? null : _ref$showFX,
        _ref$showDuration = _ref.showDuration,
        showDuration = _ref$showDuration === void 0 ? null : _ref$showDuration,
        _ref$hideFX = _ref.hideFX,
        hideFX = _ref$hideFX === void 0 ? null : _ref$hideFX,
        _ref$hideDuration = _ref.hideDuration,
        hideDuration = _ref$hideDuration === void 0 ? null : _ref$hideDuration,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? null : _ref$timeout,
        _ref$removeOnHide = _ref.removeOnHide,
        removeOnHide = _ref$removeOnHide === void 0 ? false : _ref$removeOnHide,
        _ref$visibleClassName = _ref.visibleClassName,
        visibleClassName = _ref$visibleClassName === void 0 ? null : _ref$visibleClassName,
        _ref$hiddenClassName = _ref.hiddenClassName,
        hiddenClassName = _ref$hiddenClassName === void 0 ? "hidden" : _ref$hiddenClassName;

    _classCallCheck(this, Overlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Overlay).call(this, element));

    _currentIndex.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _placements.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _container.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _target.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _arrow.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _state.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _showFX.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _showDuration.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _hideFX.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _hideDuration.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _fx.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _visibleClassName.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _hiddenClassName.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _timer.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    if (typeof target === 'string') {
      target = document.querySelector(target);
    }

    if (typeof container === 'string') {
      container = document.querySelector(container);
    }

    _this.sticky = sticky;
    _this.fit = fit;
    _this.timeout = timeout;
    _this.removeOnHide = removeOnHide;

    _classPrivateFieldSet(_assertThisInitialized(_this), _currentIndex, 0); // The index of the current placement.


    _classPrivateFieldSet(_assertThisInitialized(_this), _placements, []);

    _classPrivateFieldSet(_assertThisInitialized(_this), _arrow, container);

    _classPrivateFieldSet(_assertThisInitialized(_this), _timer, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _visibleClassName, visibleClassName);

    _classPrivateFieldSet(_assertThisInitialized(_this), _hiddenClassName, hiddenClassName);

    _classPrivateFieldSet(_assertThisInitialized(_this), _state, undefined);

    if (typeof showFX === 'function') {
      showFX = new showFX();
    }

    if (typeof hideFX === 'function') {
      hideFX = new hideFX();
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _fx, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _showFX, showFX);

    _classPrivateFieldSet(_assertThisInitialized(_this), _showDuration, showDuration);

    _classPrivateFieldSet(_assertThisInitialized(_this), _hideFX, hideFX);

    _classPrivateFieldSet(_assertThisInitialized(_this), _hideDuration, hideDuration);

    _this.target = target;
    _this.container = container;
    return _this;
  } // noinspection JSUnusedLocalSymbols


  _createClass(Overlay, [{
    key: symbolHide,
    value: function value(element) {
      if (_classPrivateFieldGet(this, _hiddenClassName)) {
        this.addClass(_classPrivateFieldGet(this, _hiddenClassName));
      }

      if (_classPrivateFieldGet(this, _visibleClassName)) {
        this.removeClass(_classPrivateFieldGet(this, _visibleClassName));
      }
    } // noinspection JSUnusedLocalSymbols

  }, {
    key: symbolShow,
    value: function value(element) {
      if (_classPrivateFieldGet(this, _hiddenClassName)) {
        this.removeClass(_classPrivateFieldGet(this, _hiddenClassName));
      }

      if (_classPrivateFieldGet(this, _visibleClassName)) {
        this.addClass(_classPrivateFieldGet(this, _visibleClassName));
      }
    }
  }, {
    key: "setArrow",
    value: function setArrow(arrow) {
      if (_classPrivateFieldGet(this, _arrow)) {
        _classPrivateFieldGet(this, _arrow).removeFrom();

        _classPrivateFieldSet(this, _arrow, null);
      }

      _classPrivateFieldSet(this, _arrow, arrow);

      _classPrivateFieldGet(this, _arrow).appendTo(this.element);
    }
  }, {
    key: "addPlacement",
    value: function addPlacement(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (!options) {
        options = DEFAULT_PLACEMENTS[name];
      }

      var placement = {
        name: name
      };

      for (var _i = 0, _arr = ['my', 'at', 'of', 'arrow', 'offset', 'collision', 'method']; _i < _arr.length; _i++) {
        var key = _arr[_i];

        if (options[key] !== undefined) {
          placement[key] = options[key];
        }
      }

      placement.method = placement.method || 'top-left';

      _classPrivateFieldGet(this, _placements).push(Object.freeze(placement));
    }
  }, {
    key: "setPlacement",
    value: function setPlacement(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (!options) {
        options = DEFAULT_PLACEMENTS[name];
      }

      _classPrivateFieldSet(this, _placements, []);

      this.addPlacement(name, options);
    }
  }, {
    key: "position",
    value: function position() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "current";

      if (!_classPrivateFieldGet(this, _placements).length) {
        return;
      }

      var targetRect,
          containerRect,
          startingIndex = 0,
          currentPos = null,
          currentIntersectAmount = 0,
          currentPlacement;

      if (typeof this.target === 'function') {
        targetRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"](this.target());
      } else if (this.target) {
        targetRect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"].getBoundingClientRect(this.target);
      } else {
        targetRect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"].getRootContainingClientRect();
      }

      if (typeof this.container === 'function') {
        containerRect = this.container();
      } else if (this.container) {
        containerRect = _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"].getBoundingClientRect(this.container);
      } else {
        containerRect = null;
      } // If sticky start searching from the last position instead of starting from the begining.


      if (this.sticky) {
        startingIndex = _classPrivateFieldGet(this, _currentIndex);
      } // Find the best position.


      for (var i = 0; i < _classPrivateFieldGet(this, _placements).length; i++) {
        var index = (startingIndex + i) % _classPrivateFieldGet(this, _placements).length,
            position = this.getPlacement(index),
            clampSpace = targetRect,
            pos = void 0,
            newIntersectAmount = void 0,
            subBoundingBox = position.of ? Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["getSubBoundingBox"])(targetRect, position.of) : targetRect,
            arrowOffset = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 0, 0),
            arrowRect = void 0;

        this.element.dataset.placement = position.name;

        if (mode === "current") {
          pos = _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"].getBoundingClientRect(this.element);
        } else {
          pos = _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"].getCleanBoundingClientRect(this.element);
        }

        if (_classPrivateFieldGet(this, _arrow) && position.arrow) {
          _classPrivateFieldGet(this, _arrow).setPlacement(position.arrow);

          arrowRect = _classPrivateFieldGet(this, _arrow).getBoundingClientRect();
          var unionBox = pos.union(arrowRect);
          arrowOffset = pos.subtract(unionBox);
          pos = unionBox;
        }

        clampSpace = targetRect.add(new _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"](-pos.width, -pos.height, 0, 0));

        if (arrowRect) {
          if (_classPrivateFieldGet(this, _arrow).placement === "top" || _classPrivateFieldGet(this, _arrow).placement === "bottom") {
            clampSpace = clampSpace.add(new _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"](arrowRect.width, 0, -arrowRect.width, 0));
          } else {
            clampSpace = clampSpace.add(new _vectors_Rect__WEBPACK_IMPORTED_MODULE_0__["default"](0, arrowRect.height, 0, -arrowRect.height));
          }
        }

        pos = pos.position({
          my: position.my,
          at: position.at,
          of: targetRect
        });

        if (containerRect) {
          pos = pos.fit(containerRect);
        }

        if (position.of) {
          clampSpace = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["getSubBoundingBox"])(clampSpace, position.of);
        }

        pos = pos.clamp(clampSpace);
        newIntersectAmount = getXIntersectAmount(subBoundingBox, containerRect) + getYIntersectAmount(subBoundingBox, containerRect); // noinspection JSCheckFunctionSignatures

        if (!currentPos || containerRect && containerRect.contains(pos) || newIntersectAmount > currentIntersectAmount && Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["getDistanceBetweenRects"])(pos, containerRect) <= Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["getDistanceBetweenRects"])(currentPos, containerRect)) {
          if (containerRect) {
            if (this.fit === true || this.fit === "xy") {
              pos = pos.fit(containerRect);
            } else if (this.fit === "y") {
              pos = pos.fitY(containerRect);
            } else if (this.fit === "x") {
              pos = pos.fitX(containerRect);
            }
          }

          currentPos = pos.add(arrowOffset);
          currentIntersectAmount = newIntersectAmount;
          currentPlacement = position;

          _classPrivateFieldSet(this, _currentIndex, index);

          if (!containerRect || containerRect.contains(pos)) {
            break;
          }
        }
      } // Apply the best position.


      this.element.dataset.placement = currentPlacement.name;
      Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(this.element, currentPos, currentPlacement.method || "top-left");

      if (_classPrivateFieldGet(this, _arrow)) {
        _classPrivateFieldGet(this, _arrow).setPlacement(currentPlacement.arrow);
      } // Publish topics.


      this.publish("overlay.render", {
        target: this,
        name: 'overlay.render',
        position: currentPos,
        placement: currentPlacement,
        index: _classPrivateFieldGet(this, _currentIndex)
      });
      return currentPos;
    }
  }, {
    key: "getPlacement",
    value: function getPlacement(index) {
      return _classPrivateFieldGet(this, _placements)[index];
    }
  }, {
    key: "show",
    value: function () {
      var _show = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var immediate,
            result,
            startingState,
            onFrame,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                immediate = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                this.clearTimeOut();
                this.publish("overlay.show", this);

                if (!this.element.parentElement) {
                  document.body.appendChild(this.element);
                }

                if (!immediate) {
                  _context.next = 16;
                  break;
                }

                if (!_classPrivateFieldGet(this, _fx)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 8;
                return _classPrivateFieldGet(this, _fx).cancel();

              case 8:
                this[symbolShow](this.element);

                if (_classPrivateFieldGet(this, _showFX)) {
                  _classPrivateFieldGet(this, _showFX)["goto"](this.element, 1);
                }

                this.position("current");
                result = _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete;

                _classPrivateFieldSet(this, _state, Overlay.visible);

                this.publish("overlay.visible", this);
                _context.next = 44;
                break;

              case 16:
                if (!(this.state !== Overlay.visible)) {
                  _context.next = 43;
                  break;
                }

                if (!_classPrivateFieldGet(this, _fx)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return _classPrivateFieldGet(this, _fx).cancel();

              case 20:
                startingState = this.state;
                this[symbolShow](this.element);
                this.position("current");

                if (!(startingState === Overlay.hidden && _classPrivateFieldGet(this, _hideFX))) {
                  _context.next = 26;
                  break;
                }

                _context.next = 26;
                return _classPrivateFieldGet(this, _hideFX)["goto"](this.element, 1);

              case 26:
                this.position("current");

                _classPrivateFieldSet(this, _state, Overlay.showing);

                this.publish("overlay.showing", this);

                onFrame = function onFrame() {
                  _this2.position("current");
                };

                if (_classPrivateFieldGet(this, _showFX)) {
                  _classPrivateFieldSet(this, _fx, _classPrivateFieldGet(this, _showFX).animate(this.element, {
                    duration: _classPrivateFieldGet(this, _showDuration),
                    onFrame: onFrame
                  }));
                }

                this.position("current");

                if (!_classPrivateFieldGet(this, _fx)) {
                  _context.next = 39;
                  break;
                }

                _context.next = 35;
                return _classPrivateFieldGet(this, _fx);

              case 35:
                result = _context.sent;

                _classPrivateFieldSet(this, _fx, null);

                _context.next = 40;
                break;

              case 39:
                result = _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete;

              case 40:
                if (result === _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete) {
                  _classPrivateFieldSet(this, _state, Overlay.visible);

                  this.publish("overlay.visible", this);
                }

                _context.next = 44;
                break;

              case 43:
                result = _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete;

              case 44:
                if (result === _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete) {
                  if (_classPrivateFieldGet(this, _timer)) {
                    clearTimeout(_classPrivateFieldGet(this, _timer));

                    _classPrivateFieldSet(this, _timer, null);
                  }

                  if (typeof this.timeout === 'number' && this.timeout >= 0) {
                    this.startTimeoutTimer(this.timeout);
                  }
                }

                return _context.abrupt("return", result);

              case 46:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function show() {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: "hide",
    value: function () {
      var _hide = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var immediate,
            result,
            onFrame,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                immediate = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                this.clearTimeOut();
                this.publish("overlay.hide", this);

                if (!immediate) {
                  _context2.next = 13;
                  break;
                }

                if (!_classPrivateFieldGet(this, _fx)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 7;
                return _classPrivateFieldGet(this, _fx).cancel();

              case 7:
                if (_classPrivateFieldGet(this, _hideFX)) {
                  _classPrivateFieldGet(this, _hideFX)["goto"](this.element, 1);
                }

                this[symbolHide](this.element);

                _classPrivateFieldSet(this, _state, Overlay.hidden);

                this.publish("overlay.hidden", this);

                if (this.removeOnHide) {
                  this.removeFrom();
                }

                return _context2.abrupt("return", _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete);

              case 13:
                if (!(this.state !== Overlay.hidden)) {
                  _context2.next = 32;
                  break;
                }

                if (!_classPrivateFieldGet(this, _fx)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 17;
                return _classPrivateFieldGet(this, _fx).cancel();

              case 17:
                onFrame = function onFrame() {
                  _this3.position("current");
                };

                if (_classPrivateFieldGet(this, _hideFX)) {
                  _classPrivateFieldSet(this, _fx, _classPrivateFieldGet(this, _hideFX).animate(this.element, {
                    duration: _classPrivateFieldGet(this, _hideDuration),
                    onFrame: onFrame
                  }));
                }

                _classPrivateFieldSet(this, _state, Overlay.hiding);

                this.publish("overlay.hiding", this);

                if (!_classPrivateFieldGet(this, _fx)) {
                  _context2.next = 27;
                  break;
                }

                _context2.next = 24;
                return _classPrivateFieldGet(this, _fx);

              case 24:
                result = _context2.sent;
                _context2.next = 28;
                break;

              case 27:
                result = _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete;

              case 28:
                if (result === _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete) {
                  this[symbolHide](this.element);

                  _classPrivateFieldSet(this, _state, Overlay.hidden);

                  if (this.removeOnHide) {
                    this.removeFrom();
                  }

                  this.publish("overlay.hidden", this);
                }

                return _context2.abrupt("return", result);

              case 32:
                return _context2.abrupt("return", _fx_Animation__WEBPACK_IMPORTED_MODULE_3__["default"].complete);

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hide() {
        return _hide.apply(this, arguments);
      }

      return hide;
    }()
  }, {
    key: "startTimeoutTimer",
    value: function startTimeoutTimer() {
      var _this4 = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (timeout === null) {
        timeout = this.timeout;
      }

      if (typeof timeout !== "number" || timeout < 0) {
        throw new TypeError("Timeout must be a positive integer.");
      }

      this.clearTimeOut();

      _classPrivateFieldSet(this, _timer, setTimeout(function () {
        _this4.hide();

        _this4.publish("overlay.timeout", _this4);
      }, this.timeout));
    }
  }, {
    key: "clearTimeOut",
    value: function clearTimeOut() {
      if (this.isTimingOut()) {
        clearTimeout(_classPrivateFieldGet(this, _timer));

        _classPrivateFieldSet(this, _timer, null);

        return true;
      }

      return false;
    }
  }, {
    key: "isTimingOut",
    value: function isTimingOut() {
      return !!_classPrivateFieldGet(this, _timer);
    }
  }, {
    key: "clearFX",
    value: function () {
      var _clearFX = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!_classPrivateFieldGet(this, _fx)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return _classPrivateFieldGet(this, _fx).cancel();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function clearFX() {
        return _clearFX.apply(this, arguments);
      }

      return clearFX;
    }() // noinspection JSUnusedGlobalSymbols

  }, {
    key: "placements",
    get: function get() {
      return _classPrivateFieldGet(this, _placements).slice(0);
    }
  }, {
    key: "target",
    get: function get() {
      return _classPrivateFieldGet(this, _target);
    },
    set: function set(target) {
      if (typeof value === 'string') {
        _classPrivateFieldSet(this, _target, document.querySelector(target));
      } else {
        _classPrivateFieldSet(this, _target, target || null);
      }
    }
  }, {
    key: "container",
    get: function get() {
      return _classPrivateFieldGet(this, _container);
    },
    set: function set(container) {
      if (typeof container === 'string') {
        _classPrivateFieldSet(this, _container, document.querySelector(container));
      } else {
        _classPrivateFieldSet(this, _container, container || null);
      }
    }
  }, {
    key: "fx",
    get: function get() {
      return _classPrivateFieldGet(this, _fx);
    }
  }, {
    key: "state",
    get: function get() {
      return _classPrivateFieldGet(this, _state);
    }
  }]);

  return Overlay;
}(_Component__WEBPACK_IMPORTED_MODULE_2__["default"]);

var _currentIndex = new WeakMap();

var _placements = new WeakMap();

var _container = new WeakMap();

var _target = new WeakMap();

var _arrow = new WeakMap();

var _state = new WeakMap();

var _showFX = new WeakMap();

var _showDuration = new WeakMap();

var _hideFX = new WeakMap();

var _hideDuration = new WeakMap();

var _fx = new WeakMap();

var _visibleClassName = new WeakMap();

var _hiddenClassName = new WeakMap();

var _timer = new WeakMap();

_defineProperty(Overlay, "hiding", "Hiding");

_defineProperty(Overlay, "showing", "Showing");

_defineProperty(Overlay, "hidden", "Hidden");

_defineProperty(Overlay, "visible", "Visible");



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

/***/ "./src/core/ui/index.js":
/*!******************************!*\
  !*** ./src/core/ui/index.js ***!
  \******************************/
/*! exports provided: Draggable, Resizeable, Sortable, Arrow, Overlay, TabBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Draggable */ "./src/core/ui/Draggable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return _Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Resizeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resizeable */ "./src/core/ui/Resizeable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Resizeable", function() { return _Resizeable__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Sortable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sortable */ "./src/core/ui/Sortable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sortable", function() { return _Sortable__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Arrow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Arrow */ "./src/core/ui/Arrow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Arrow", function() { return _Arrow__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Overlay */ "./src/core/ui/Overlay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Overlay", function() { return _Overlay__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _TabBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TabBar */ "./src/core/ui/TabBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabBar", function() { return _TabBar__WEBPACK_IMPORTED_MODULE_5__["default"]; });









/***/ }),

/***/ "./src/datagrid/DataGridHeader.js":
/*!****************************************!*\
  !*** ./src/datagrid/DataGridHeader.js ***!
  \****************************************/
/*! exports provided: default, DataColumn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataGridHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataColumn", function() { return DataColumn; });
/* harmony import */ var _core_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ui */ "./src/core/ui/index.js");
/* harmony import */ var _core_Publisher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Publisher */ "./src/core/Publisher.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

/**
 * column.resize-start
 * column.resize
 * column.resize-end
 * resize-complete
 *
 * column.order-by
 *
 * column.drag-start
 * column.drag
 * column.drag-complete
 * sort-change
 */



var DataGridHeader =
/*#__PURE__*/
function (_Publisher) {
  _inherits(DataGridHeader, _Publisher);

  function DataGridHeader() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$columns = _ref.columns,
        columns = _ref$columns === void 0 ? null : _ref$columns,
        _ref$resizeable = _ref.resizeable,
        resizeable = _ref$resizeable === void 0 ? false : _ref$resizeable,
        _ref$sortable = _ref.sortable,
        sortable = _ref$sortable === void 0 ? false : _ref$sortable,
        _ref$tableSort = _ref.tableSort,
        tableSort = _ref$tableSort === void 0 ? false : _ref$tableSort;

    _classCallCheck(this, DataGridHeader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataGridHeader).call(this));

    _createColumn.add(_assertThisInitialized(_this));

    _render.add(_assertThisInitialized(_this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _body.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _columns.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _resizeable.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _sortable.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _tableSort.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _element, document.createElement("div"));

    _classPrivateFieldGet(_assertThisInitialized(_this), _element).className = "data-grid-header";

    _classPrivateFieldSet(_assertThisInitialized(_this), _body, document.createElement("div"));

    _classPrivateFieldGet(_assertThisInitialized(_this), _body).className = "data-grid-header__body";

    _classPrivateFieldGet(_assertThisInitialized(_this), _element).appendChild(_classPrivateFieldGet(_assertThisInitialized(_this), _body));

    _classPrivateFieldSet(_assertThisInitialized(_this), _columns, []);

    _classPrivateFieldSet(_assertThisInitialized(_this), _resizeable, resizeable);

    _classPrivateFieldSet(_assertThisInitialized(_this), _sortable, sortable);

    _classPrivateFieldSet(_assertThisInitialized(_this), _tableSort, tableSort);

    if (columns) {
      _this.setColumns(columns);
    }

    return _this;
  }

  _createClass(DataGridHeader, [{
    key: "setColumns",
    value: function setColumns(columns) {
      this.clearColumns();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var column = _step.value;
          this.appendColumn(column);
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

      _classPrivateMethodGet(this, _render, _render2).call(this);
    }
  }, {
    key: "getColumn",
    value: function getColumn(index) {
      return _classPrivateFieldGet(this, _columns)[index];
    }
  }, {
    key: "getColumnIndex",
    value: function getColumnIndex(column) {
      return _classPrivateFieldGet(this, _columns).indexOf(column);
    }
  }, {
    key: "removeColumn",
    value: function removeColumn(column) {}
  }, {
    key: "clearColumns",
    value: function clearColumns() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _classPrivateFieldGet(this, _columns)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var column = _step2.value;
          this.removeColumn(column);
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
    key: "appendColumn",
    value: function appendColumn(column) {
      var dataColumn = _classPrivateMethodGet(this, _createColumn, _createColumn2).call(this, column);

      _classPrivateFieldGet(this, _columns).push(dataColumn);

      dataColumn.appendTo(_classPrivateFieldGet(this, _body));

      _classPrivateMethodGet(this, _render, _render2).call(this);
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(column, index) {}
  }, {
    key: "insertColumnBefore",
    value: function insertColumnBefore(column, before) {
      var index = this.getColumnIndex(before);

      if (index !== -1) {
        this.insertColumn(column, this.getColumnIndex(before));
      } else {
        throw new Error("Unknown column");
      }
    }
  }, {
    key: "insertColumnAfter",
    value: function insertColumnAfter(column, after) {
      var index = this.getColumnIndex(after);

      if (index !== -1) {
        this.insertColumn(column, this.getColumnIndex(after) + 1);
      } else {
        throw new Error("Unknown column");
      }
    }
  }, {
    key: "appendTo",
    value: function appendTo(selector) {
      if (typeof selector === 'string') {
        document.querySelector(selector).appendChild(_classPrivateFieldGet(this, _element));
      } else if (selector.appendChild) {
        selector.appendChild(_classPrivateFieldGet(this, _element));
      } else {
        selector.append(_classPrivateFieldGet(this, _element));
      }
    }
  }, {
    key: "width",
    get: function get() {
      var width = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _classPrivateFieldGet(this, _columns)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var column = _step3.value;
          width += column.width;
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

      return width + 20;
    }
  }]);

  return DataGridHeader;
}(_core_Publisher__WEBPACK_IMPORTED_MODULE_1__["default"]);

var _element = new WeakMap();

var _body = new WeakMap();

var _columns = new WeakMap();

var _resizeable = new WeakMap();

var _sortable = new WeakMap();

var _tableSort = new WeakMap();

var _render = new WeakSet();

var _createColumn = new WeakSet();

var _render2 = function _render2() {
  _classPrivateFieldGet(this, _body).style.width = this.width + "px";
};

var _createColumn2 = function _createColumn2(column) {
  var _this2 = this;

  var dataColumn = new DataColumn(column);
  dataColumn.on('resize', function () {
    console.log(_this2.width);

    _classPrivateMethodGet(_this2, _render, _render2).call(_this2);
  });
  dataColumn.on('resize-complete', function () {
    return _classPrivateMethodGet(_this2, _render, _render2).call(_this2);
  });
  return dataColumn;
};


var DataColumn =
/*#__PURE__*/
function (_Publisher2) {
  _inherits(DataColumn, _Publisher2);

  function DataColumn(_ref2) {
    var _this3;

    var label = _ref2.label,
        _ref2$resizeable = _ref2.resizeable,
        resizeable = _ref2$resizeable === void 0 ? false : _ref2$resizeable,
        _ref2$minWidth = _ref2.minWidth,
        minWidth = _ref2$minWidth === void 0 ? 0 : _ref2$minWidth,
        _ref2$maxWidth = _ref2.maxWidth,
        maxWidth = _ref2$maxWidth === void 0 ? Infinity : _ref2$maxWidth,
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? 100 : _ref2$width,
        _ref2$tableSort = _ref2.tableSort,
        tableSort = _ref2$tableSort === void 0 ? false : _ref2$tableSort,
        _ref2$dataSort = _ref2.dataSort,
        dataSort = _ref2$dataSort === void 0 ? "none" : _ref2$dataSort,
        _ref2$renderer = _ref2.renderer,
        renderer = _ref2$renderer === void 0 ? null : _ref2$renderer;

    _classCallCheck(this, DataColumn);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(DataColumn).call(this));

    _element2.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _body2.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _resizer.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _resizeHandle.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _renderer.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _width.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this3), _renderer, renderer || function (label) {
      var body = document.createElement("div");
      body.innerHTML = label;
      return body;
    });

    _classPrivateFieldSet(_assertThisInitialized(_this3), _element2, document.createElement("div"));

    _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).className = "data-column";

    _classPrivateFieldSet(_assertThisInitialized(_this3), _body2, _classPrivateFieldGet(_assertThisInitialized(_this3), _renderer).call(_assertThisInitialized(_this3), label));

    _classPrivateFieldGet(_assertThisInitialized(_this3), _body2).className = "data-column__body";

    _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).appendChild(_classPrivateFieldGet(_assertThisInitialized(_this3), _body2));

    _classPrivateFieldSet(_assertThisInitialized(_this3), _width, width);

    _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).style.width = "".concat(width, "px");

    _classPrivateFieldSet(_assertThisInitialized(_this3), _resizer, null);

    _classPrivateFieldSet(_assertThisInitialized(_this3), _resizeHandle, null);

    if (resizeable) {
      _classPrivateFieldSet(_assertThisInitialized(_this3), _resizeHandle, document.createElement("div"));

      _classPrivateFieldGet(_assertThisInitialized(_this3), _resizeHandle).className = "ui-resize-handle no-sort";
      _classPrivateFieldGet(_assertThisInitialized(_this3), _resizeHandle).dataset.resize = "right";

      _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).appendChild(_classPrivateFieldGet(_assertThisInitialized(_this3), _resizeHandle));

      _classPrivateFieldSet(_assertThisInitialized(_this3), _resizer, new _core_ui__WEBPACK_IMPORTED_MODULE_0__["Resizeable"](_classPrivateFieldGet(_assertThisInitialized(_this3), _element2), {
        minWidth: minWidth,
        maxWidth: maxWidth
      }));

      _classPrivateFieldGet(_assertThisInitialized(_this3), _resizer).on('resize-start', function (topic) {
        _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).classList.add('no-sort');

        _this3.publish("resize-start", topic);
      });

      _classPrivateFieldGet(_assertThisInitialized(_this3), _resizer).on('resize', function (topic) {
        topic.event.originalEvent.preventDefault();

        _classPrivateFieldSet(_assertThisInitialized(_this3), _width, topic.rect.width);

        _this3.publish("resize", topic);
      });

      _classPrivateFieldGet(_assertThisInitialized(_this3), _resizer).on('resize-complete', function (topic) {
        _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).classList.add("no-resize");

        _classPrivateFieldSet(_assertThisInitialized(_this3), _width, topic.rect.width);

        setTimeout(function () {
          _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).classList.remove('no-sort');

          _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).classList.remove("no-resize");

          _this3.publish("resize-complete", topic);
        }, 0);
      });

      _classPrivateFieldGet(_assertThisInitialized(_this3), _resizer).on("resize-cancel", function (topic) {
        _this3.publish("resize-cancel", topic);
      });
    }

    if (tableSort) {
      _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).dataset.dataSort = dataSort;

      _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).addEventListener("click", function (e) {
        if (e.target.closest(".no-sort")) {
          return;
        }

        var options = ["none", "ascending", "descending"],
            index = options.indexOf(_classPrivateFieldGet(_assertThisInitialized(_this3), _element2).dataset.dataSort);

        if (index === -1) {
          _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).dataset.dataSort = "none";
        } else {
          _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).dataset.dataSort = options[(index + 1) % options.length];
        }

        _this3.publish("data-sort", {
          event: e,
          column: _assertThisInitialized(_this3),
          dataSort: _classPrivateFieldGet(_assertThisInitialized(_this3), _element2).dataset.dataSort
        });
      });
    }

    return _this3;
  }

  _createClass(DataColumn, [{
    key: "appendTo",
    value: function appendTo(selector) {
      if (typeof selector === 'string') {
        document.querySelector(selector).appendChild(_classPrivateFieldGet(this, _element2));
      } else if (selector.appendChild) {
        selector.appendChild(_classPrivateFieldGet(this, _element2));
      } else {
        selector.append(_classPrivateFieldGet(this, _element2));
      }
    }
  }, {
    key: "width",
    get: function get() {
      return _classPrivateFieldGet(this, _width);
    }
  }]);

  return DataColumn;
}(_core_Publisher__WEBPACK_IMPORTED_MODULE_1__["default"]);

var _element2 = new WeakMap();

var _body2 = new WeakMap();

var _resizer = new WeakMap();

var _resizeHandle = new WeakMap();

var _renderer = new WeakMap();

var _width = new WeakMap();

/***/ })

}]);
//# sourceMappingURL=chunk-10.bundle.js.map