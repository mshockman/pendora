(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[2],{

/***/ "./docs/js/pages/documentation/test_resizeable.js":
/*!********************************************************!*\
  !*** ./docs/js/pages/documentation/test_resizeable.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestResizeablePage; });
/* harmony import */ var core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Resizeable */ "./src/core/ui/Resizeable.js");
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
/* harmony import */ var _src_core_ui_PointerTracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../src/core/ui/PointerTracker */ "./src/core/ui/PointerTracker.js");
/* harmony import */ var _src_core_vectors_Rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../src/core/vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _src_core_ui_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../src/core/ui/position */ "./src/core/ui/position.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






window.Rect = _src_core_vectors_Rect__WEBPACK_IMPORTED_MODULE_3__["default"];
window.getBoundingOffsetRect = _src_core_ui_position__WEBPACK_IMPORTED_MODULE_4__["getBoundingOffsetRect"];

var TestResizeablePage =
/*#__PURE__*/
function () {
  function TestResizeablePage() {
    _classCallCheck(this, TestResizeablePage);
  }

  _createClass(TestResizeablePage, [{
    key: "load",
    value: function load() {
      this.loadDraggables();
      var debugTracker = _src_core_ui_PointerTracker__WEBPACK_IMPORTED_MODULE_2__["default"].DebugMouseTracker();
      document.body.appendChild(debugTracker.element);
      this.resizeable1 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]('#resizeable1', {
        helper: Object(core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["cloneHelperFactory"])(1000, 0.5),
        minWidth: 100,
        minHeight: 100,
        maxWidth: 250,
        maxHeight: 250
      });
      this.resizeable2 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]("#resizeable2", {});
      this.resizeable3 = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"]("#resizeable3", {
        position: "width-height"
      });
      console.log("Hello WOrld");
    }
  }, {
    key: "loadDraggables",
    value: function loadDraggables() {
      var elements = document.querySelectorAll('.draggable');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var d = _step.value;
          var container = d.closest('.example-zone') || null;
          new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](d, {
            container: container
          });
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
  }]);

  return TestResizeablePage;
}();



/***/ }),

/***/ "./src/core/ui/PointerTracker.js":
/*!***************************************!*\
  !*** ./src/core/ui/PointerTracker.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PointerTracker; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }




/**
 * A class that tracks mouse position oven an element or the document.
 * Will use PointerEvents if browser support is available, otherwise it will fall back to using mousedown, mouseover, and mousemove.
 */

var PointerTracker =
/*#__PURE__*/
function (_Publisher) {
  _inherits(PointerTracker, _Publisher);

  function PointerTracker(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$capture = _ref.capture,
        capture = _ref$capture === void 0 ? false : _ref$capture,
        _ref$context = _ref.context,
        context = _ref$context === void 0 ? null : _ref$context,
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? null : _ref$exclude;

    _classCallCheck(this, PointerTracker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PointerTracker).call(this));

    _triggerPointerEvent.add(_assertThisInitialized(_this));

    _initMouseTracker.add(_assertThisInitialized(_this));

    _initPointerTracker.add(_assertThisInitialized(_this));

    _init.add(_assertThisInitialized(_this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _pointerId.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _isDisabled.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _pageX.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _pageY.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _type.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _onPointerDown.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _onPointerMove.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _onPointerUp.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _isTracking.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _capture.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _context.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _target.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _exclude.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _element, Object(_utility__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(element));

    _classPrivateFieldSet(_assertThisInitialized(_this), _isTracking, false);

    _classPrivateFieldSet(_assertThisInitialized(_this), _isDisabled, false);

    _classPrivateFieldSet(_assertThisInitialized(_this), _capture, capture);

    _classPrivateFieldSet(_assertThisInitialized(_this), _context, context);

    _classPrivateFieldSet(_assertThisInitialized(_this), _target, target);

    _classPrivateFieldSet(_assertThisInitialized(_this), _exclude, exclude);

    _classPrivateMethodGet(_assertThisInitialized(_this), _init, _init2).call(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(PointerTracker, [{
    key: "destroy",
    value: function destroy() {
      this.cancel();

      if (_classPrivateFieldGet(this, _onPointerDown)) {
        _classPrivateFieldGet(this, _element).removeEventListener('pointerdown', _classPrivateFieldGet(this, _onPointerDown));
      }

      _classPrivateFieldSet(this, _onPointerDown, null);

      _classPrivateFieldSet(this, _element, null);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (_classPrivateFieldGet(this, _type) === 'pointer') {
        if (this.isTracking) {
          if (_classPrivateFieldGet(this, _onPointerMove)) {
            _classPrivateFieldGet(this, _element).removeEventListener('pointermove', _classPrivateFieldGet(this, _onPointerMove));
          }

          if (_classPrivateFieldGet(this, _onPointerUp)) {
            _classPrivateFieldGet(this, _element).removeEventListener('pointerup', _classPrivateFieldGet(this, _onPointerUp));
          }
        }

        if (_classPrivateFieldGet(this, _pointerId)) {
          _classPrivateFieldGet(this, _element).releasePointerCapture(_classPrivateFieldGet(this, _pointerId));
        }

        _classPrivateFieldSet(this, _isTracking, false);

        _classPrivateFieldSet(this, _type, null);

        _classPrivateFieldSet(this, _onPointerUp, null);

        _classPrivateFieldSet(this, _onPointerMove, null);

        _classPrivateFieldSet(this, _pointerId, null);
      } else if (_classPrivateFieldGet(this, _type) === 'mouse') {} else {
        throw new Error("Unknown pointer type.");
      }
    }
  }, {
    key: "isTracking",
    get: function get() {
      return _classPrivateFieldGet(this, _isTracking);
    }
  }, {
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _element);
    }
  }, {
    key: "clientX",
    get: function get() {
      return _classPrivateFieldGet(this, _pageX) - window.pageXOffset;
    }
  }, {
    key: "clientY",
    get: function get() {
      return _classPrivateFieldGet(this, _pageY) - window.pageYOffset;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return _classPrivateFieldGet(this, _isDisabled);
    },
    set: function set(value) {
      if (!value) {} else {}
    }
  }], [{
    key: "DebugMouseTracker",
    value: function DebugMouseTracker() {
      var zIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
      var output = document.createElement('div');
      var tracker = new PointerTracker(document.body);
      tracker.on('pointer-move', function (event) {
        output.innerHTML = "(".concat(event.clientX, ", ").concat(event.clientY, ")");
      });
      output.style.position = "absolute";
      output.style.right = "5px";
      output.style.top = "5px";
      output.style.padding = "5px";
      output.style.backgroundColor = "#ffffff";
      output.style.border = "1px solid #cccccc";
      output.style.zIndex = "" + zIndex;
      return {
        element: output,
        tracker: tracker
      };
    }
  }]);

  return PointerTracker;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _pointerId = new WeakMap();

var _isDisabled = new WeakMap();

var _pageX = new WeakMap();

var _pageY = new WeakMap();

var _type = new WeakMap();

var _onPointerDown = new WeakMap();

var _onPointerMove = new WeakMap();

var _onPointerUp = new WeakMap();

var _isTracking = new WeakMap();

var _capture = new WeakMap();

var _context = new WeakMap();

var _target = new WeakMap();

var _exclude = new WeakMap();

var _init = new WeakSet();

var _initPointerTracker = new WeakSet();

var _initMouseTracker = new WeakSet();

var _triggerPointerEvent = new WeakSet();

var _init2 = function _init2() {
  if (_classPrivateFieldGet(this, _type)) return;

  if (window.PointerEvent) {
    _classPrivateMethodGet(this, _initPointerTracker, _initPointerTracker2).call(this);
  } else {
    _classPrivateMethodGet(this, _initMouseTracker, _initMouseTracker2).call(this);
  }
};

var _initPointerTracker2 = function _initPointerTracker2() {
  var _this2 = this;

  if (_classPrivateFieldGet(this, _type)) return;

  _classPrivateFieldSet(this, _type, "pointer");

  _classPrivateFieldSet(this, _onPointerMove, function (event) {
    if (!_classPrivateFieldGet(_this2, _isDisabled)) {
      _classPrivateMethodGet(_this2, _triggerPointerEvent, _triggerPointerEvent2).call(_this2, 'pointer-move', event);
    }
  });

  if (_classPrivateFieldGet(this, _capture)) {
    _classPrivateFieldSet(this, _onPointerDown, function (event) {
      if (_this2.isTracking) return;
      var targetElement = _classPrivateFieldGet(_this2, _target) ? Object(_utility__WEBPACK_IMPORTED_MODULE_1__["closest"])(event.target, _classPrivateFieldGet(_this2, _target), _classPrivateFieldGet(_this2, _element)) : null,
          excludedElement = _classPrivateFieldGet(_this2, _exclude) ? Object(_utility__WEBPACK_IMPORTED_MODULE_1__["closest"])(event.target, _classPrivateFieldGet(_this2, _exclude), _classPrivateFieldGet(_this2, _element)) : null;

      if ((!_classPrivateFieldGet(_this2, _target) || targetElement) && (!_classPrivateFieldGet(_this2, _exclude) || !excludedElement)) {
        _classPrivateFieldSet(_this2, _isTracking, true);

        _classPrivateFieldSet(_this2, _pointerId, event.pointerId);

        _classPrivateFieldGet(_this2, _element).setPointerCapture(event.pointerId);

        _classPrivateFieldGet(_this2, _element).addEventListener('pointermove', _classPrivateFieldGet(_this2, _onPointerMove));

        _classPrivateFieldGet(_this2, _element).addEventListener('pointerup', _classPrivateFieldGet(_this2, _onPointerUp));

        _classPrivateMethodGet(_this2, _triggerPointerEvent, _triggerPointerEvent2).call(_this2, 'pointer-capture', event, {
          handle: targetElement
        });
      }
    });

    _classPrivateFieldSet(this, _onPointerUp, function (event) {
      _classPrivateFieldSet(_this2, _isTracking, false);

      _classPrivateFieldGet(_this2, _element).releasePointerCapture(event.pointerId);

      _classPrivateFieldSet(_this2, _pointerId, null);

      _classPrivateFieldGet(_this2, _element).removeEventListener('pointerup', _classPrivateFieldGet(_this2, _onPointerUp));

      _classPrivateFieldGet(_this2, _element).removeEventListener('pointermove', _classPrivateFieldGet(_this2, _onPointerMove));

      _classPrivateMethodGet(_this2, _triggerPointerEvent, _triggerPointerEvent2).call(_this2, 'pointer-release', event);
    });

    _classPrivateFieldGet(this, _element).addEventListener('pointerdown', _classPrivateFieldGet(this, _onPointerDown));
  } else {
    _classPrivateFieldGet(this, _element).addEventListener('pointermove', _classPrivateFieldGet(this, _onPointerMove));
  }
};

var _initMouseTracker2 = function _initMouseTracker2() {
  _classPrivateFieldSet(this, _type, "mouse");
};

var _triggerPointerEvent2 = function _triggerPointerEvent2(name, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classPrivateFieldSet(this, _pageX, event.clientX + window.pageXOffset);

  _classPrivateFieldSet(this, _pageY, event.clientY + window.pageYOffset);

  if (!args) {
    args = {};
  }

  this.publish(name, _objectSpread({
    type: _classPrivateFieldGet(this, _type),
    name: name,
    target: event.target,
    clientX: event.clientX,
    clientY: event.clientY,
    tracker: this,
    originalEvent: event
  }, args));
};



/***/ }),

/***/ "./src/core/ui/Resizeable.js":
/*!***********************************!*\
  !*** ./src/core/ui/Resizeable.js ***!
  \***********************************/
/*! exports provided: default, cloneHelperFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Resizeable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneHelperFactory", function() { return cloneHelperFactory; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _PointerTracker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PointerTracker */ "./src/core/ui/PointerTracker.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _vectors_Vec2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vectors/Vec2 */ "./src/core/vectors/Vec2.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }







/**
 * Creates a resizable component.
 *
 * Publisher Events
 *
 * resize-start
 * resize
 * resize-complete
 * resize-cancel
 */

var Resizeable =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Resizeable, _Publisher);

  function Resizeable(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$minWidth = _ref.minWidth,
        _minWidth = _ref$minWidth === void 0 ? null : _ref$minWidth,
        _ref$maxWidth = _ref.maxWidth,
        _maxWidth = _ref$maxWidth === void 0 ? null : _ref$maxWidth,
        _ref$minHeight = _ref.minHeight,
        _minHeight = _ref$minHeight === void 0 ? null : _ref$minHeight,
        _ref$maxHeight = _ref.maxHeight,
        _maxHeight = _ref$maxHeight === void 0 ? null : _ref$maxHeight,
        _ref$axis = _ref.axis,
        axis = _ref$axis === void 0 ? 'xy' : _ref$axis,
        _ref$keepAspectRatio = _ref.keepAspectRatio,
        keepAspectRatio = _ref$keepAspectRatio === void 0 ? false : _ref$keepAspectRatio,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid,
        _ref$handles = _ref.handles,
        handles = _ref$handles === void 0 ? '.ui-resize-handle' : _ref$handles,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? '.no-resize' : _ref$exclude,
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? 'ui-resizeable' : _ref$className,
        _ref$position = _ref.position,
        position = _ref$position === void 0 ? "top-left" : _ref$position;

    _classCallCheck(this, Resizeable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Resizeable).call(this));

    _getHandleConfig.add(_assertThisInitialized(_this));

    _initResizing.add(_assertThisInitialized(_this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _isResizing.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _isDisabled.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _container.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _axis.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _grid.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _keepAspectRatio.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _handles.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _helper.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _exclude.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _defineProperty(_assertThisInitialized(_this), "minWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "maxWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "minHeight", void 0);

    _defineProperty(_assertThisInitialized(_this), "maxHeight", void 0);

    _position.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _tracker.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _element, Object(_utility__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(element));

    _this.minWidth = _minWidth;
    _this.maxWidth = _maxWidth;
    _this.minHeight = _minHeight;
    _this.maxHeight = _maxHeight;

    _classPrivateFieldSet(_assertThisInitialized(_this), _axis, axis);

    _classPrivateFieldSet(_assertThisInitialized(_this), _keepAspectRatio, keepAspectRatio);

    _classPrivateFieldSet(_assertThisInitialized(_this), _container, container ? Object(_utility__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(container) : null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _grid, grid);

    _classPrivateFieldSet(_assertThisInitialized(_this), _handles, handles);

    _classPrivateFieldSet(_assertThisInitialized(_this), _exclude, exclude);

    _classPrivateFieldSet(_assertThisInitialized(_this), _helper, helper);

    _classPrivateFieldSet(_assertThisInitialized(_this), _position, position);

    if (className) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_1__["addClasses"])(_classPrivateFieldGet(_assertThisInitialized(_this), _element), className);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _isResizing, false);

    _classPrivateFieldSet(_assertThisInitialized(_this), _isDisabled, false);

    _classPrivateFieldSet(_assertThisInitialized(_this), _tracker, new _PointerTracker__WEBPACK_IMPORTED_MODULE_2__["default"](_classPrivateFieldGet(_assertThisInitialized(_this), _element), {
      capture: true,
      context: document,
      target: handles,
      exclude: exclude
    }));

    _classPrivateMethodGet(_assertThisInitialized(_this), _initResizing, _initResizing2).call(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(Resizeable, [{
    key: "applyRect",
    value: function applyRect(element, rect) {
      if (_classPrivateFieldGet(this, _position) === 'width-height') {
        element.style.width = rect.width + "px";
        element.style.height = rect.height + "px";
      } else if (_classPrivateFieldGet(this, _position) === "width") {
        element.style.width = rect.width + "px";
      } else if (_classPrivateFieldGet(this, _position) === "height") {
        element.style.height = rect.height + "px";
      } else {
        Object(_position__WEBPACK_IMPORTED_MODULE_5__["setElementClientPosition"])(element, rect, _classPrivateFieldGet(this, _position));
      }
    }
    /**
     * Returns the resize config object from the given handle element.
     * To specify options for resizing the handle should have a [data-resize] property in the format:
     * <resize>; <scale>
     *
     * resize: Specifies the direction to resize in.  Can be top, right, bottom, left, top-left, top-right, bottom-left, bottom-right.
     * scale: If specified it tells the instance to scale that object in the given axis.  Can be either none, scale-x, scale-y, scale-xy.  Defaults to none.
     * @param handle
     * @returns {{resize: string, scale: string}}
     */

  }, {
    key: "position",
    get: function get() {
      return _classPrivateFieldGet(this, _position);
    }
  }]);

  return Resizeable;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _isResizing = new WeakMap();

var _isDisabled = new WeakMap();

var _container = new WeakMap();

var _axis = new WeakMap();

var _grid = new WeakMap();

var _keepAspectRatio = new WeakMap();

var _handles = new WeakMap();

var _helper = new WeakMap();

var _exclude = new WeakMap();

var _position = new WeakMap();

var _tracker = new WeakMap();

var _initResizing = new WeakSet();

var _getHandleConfig = new WeakSet();

var _initResizing2 = function _initResizing2() {
  var _this2 = this;

  var config,
      startingRect,
      target,
      finalRect = null; // todo pointer-cancel, resize-cancel

  _classPrivateFieldGet(this, _tracker).on('pointer-capture', function (event) {
    _classPrivateFieldSet(_this2, _isResizing, true);

    config = _classPrivateMethodGet(_this2, _getHandleConfig, _getHandleConfig2).call(_this2, event.handle);
    startingRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_3__["default"](_classPrivateFieldGet(_this2, _element));
    target = _classPrivateFieldGet(_this2, _element);

    if (_classPrivateFieldGet(_this2, _helper)) {
      if (typeof _classPrivateFieldGet(_this2, _helper) === 'function') {
        target = _classPrivateFieldGet(_this2, _helper).call(_this2, _classPrivateFieldGet(_this2, _element));
      } else {
        target = _classPrivateFieldGet(_this2, _helper);
      }

      if (target.nodeType) {
        target = buildHelperFromElement(target, _classPrivateFieldGet(_this2, _element));
      }
    } else {
      target = buildHelperFromElement(_classPrivateFieldGet(_this2, _element), _classPrivateFieldGet(_this2, _element));
    }

    var topic = {
      topic: "resize-start",
      resizeable: _this2,
      element: _classPrivateFieldGet(_this2, _element),
      position: _classPrivateFieldGet(_this2, _position),
      config: config,
      startingRect: startingRect,
      event: event
    };

    if (target.onResizeStart) {
      target.onResizeStart(_objectSpread({}, topic));
    }

    _this2.publish('resize-start', _objectSpread({}, topic));
  });

  _classPrivateFieldGet(this, _tracker).on('pointer-move', function (event) {
    var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_3__["default"](startingRect),
        centerX = rect.left + rect.width / 2,
        centerY = rect.top + rect.height / 2,
        scaleX = config.scale === 'scale-x' || config.scale === 'scale-xy',
        scaleY = config.scale === 'scale-y' || config.scale === 'scale-xy',
        ratio = rect.width / rect.height,
        pointer = new _vectors_Vec2__WEBPACK_IMPORTED_MODULE_4__["default"](event.clientX, event.clientY);

    if (_classPrivateFieldGet(_this2, _grid)) {
      pointer.x = Math.floor(pointer.x / _classPrivateFieldGet(_this2, _grid)) * _classPrivateFieldGet(_this2, _grid);
      pointer.y = Math.floor(pointer.y / _classPrivateFieldGet(_this2, _grid)) * _classPrivateFieldGet(_this2, _grid);
    }

    if (_classPrivateFieldGet(_this2, _container)) {
      pointer = pointer.clamp(_vectors_Rect__WEBPACK_IMPORTED_MODULE_3__["default"].getBoundingClientRect(_classPrivateFieldGet(_this2, _container)));
    }

    var minWidth = Math.max(0, _this2.minWidth || 0),
        maxWidth = _this2.maxWidth || Infinity,
        minHeight = Math.max(0, _this2.minHeight || 0),
        maxHeight = _this2.maxHeight || Infinity,
        width,
        height;

    if (_classPrivateFieldGet(_this2, _axis) === 'x' || _classPrivateFieldGet(_this2, _axis) === 'xy') {
      if (config.resize === 'bottom-left' || config.resize === 'top-left' || config.resize === 'left') {
        if (scaleX) {
          width = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(2 * (centerX - pointer.x), minWidth, maxWidth);
          rect.left = centerX - width / 2;
          rect.right = centerX + width / 2;
        } else {
          width = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(rect.right - pointer.x, minWidth, maxWidth);
          rect.left = rect.right - width;
        }
      } else if (config.resize === 'bottom-right' || config.resize === 'top-right' || config.resize === 'right') {
        if (scaleX) {
          width = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(2 * (pointer.x - centerX), minWidth, maxWidth);
          rect.left = centerX - width / 2;
          rect.right = centerX + width / 2;
        } else {
          width = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(pointer.x - rect.left, minWidth, maxWidth);
          rect.right = rect.left + width;
        }
      }
    }

    if (_classPrivateFieldGet(_this2, _axis) === 'y' || _classPrivateFieldGet(_this2, _axis) === 'xy') {
      if (config.resize === 'bottom-right' || config.resize === 'bottom-left' || config.resize === 'bottom') {
        if (scaleY) {
          height = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(2 * (pointer.y - centerY), minHeight, maxHeight);
          rect.bottom = centerY + height / 2;
          rect.top = centerY - height / 2;
        } else {
          height = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(pointer.y - rect.top, minHeight, maxHeight);
          rect.bottom = rect.top + height;
        }
      } else if (config.resize === 'top-left' || config.resize === 'top-right' || config.resize === 'top') {
        if (scaleY) {
          height = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(2 * (centerY - pointer.y), minHeight, maxHeight);
          rect.bottom = centerY + height / 2;
          rect.top = centerY - height / 2;
        } else {
          height = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(rect.bottom - pointer.y, minHeight, maxHeight);
          rect.top = rect.bottom - height;
        }
      }
    }

    if (_classPrivateFieldGet(_this2, _keepAspectRatio)) {
      if (_classPrivateFieldGet(_this2, _axis) === 'x' || _classPrivateFieldGet(_this2, _axis) === 'xy') {
        rect.bottom = rect.top + rect.width / ratio;
      } else {
        rect.right = rect.left + rect.height * ratio;
      }
    }

    finalRect = rect;
    var topic = {
      topic: "resize",
      rect: rect,
      resizeable: _this2,
      position: _classPrivateFieldGet(_this2, _position),
      element: _classPrivateFieldGet(_this2, _element),
      event: event,
      config: config,
      startingRect: startingRect
    };

    if (target && target.onResize) {
      target.onResize(_objectSpread({}, topic));
    }

    _this2.publish(topic.topic, _objectSpread({}, topic));
  });

  _classPrivateFieldGet(this, _tracker).on('pointer-release', function (event) {
    _classPrivateFieldSet(_this2, _isResizing, false);

    if (_classPrivateFieldGet(_this2, _position)) {
      _this2.applyRect(_classPrivateFieldGet(_this2, _element), finalRect);
    }

    _classPrivateFieldGet(_this2, _element).style.width = "".concat(finalRect.width, "px");
    _classPrivateFieldGet(_this2, _element).style.height = "".concat(finalRect.height, "px");
    var topic = {
      topic: "resize-complete",
      finalRect: finalRect,
      resizeable: _this2,
      element: _classPrivateFieldGet(_this2, _element),
      position: _classPrivateFieldGet(_this2, _position),
      event: event,
      config: config,
      startingRect: startingRect
    };

    if (target && target.onResizeComplete) {
      target.onResizeComplete(_objectSpread({}, topic));
    }

    _this2.publish(topic.topic, _objectSpread({}, topic));
  });
};

var _getHandleConfig2 = function _getHandleConfig2(handle) {
  var resize = handle.dataset.resize.trim().split(/\s*;\s*/);
  return {
    resize: resize[0],
    scale: resize[1] || "none"
  };
};



function buildHelperFromElement(helper, element) {
  return {
    helper: helper,
    element: element,
    onResizeStart: function onResizeStart(e) {
      if (helper !== element && !helper.parentElement) {
        element.parentElement.appendChild(helper);
      }
    },
    onResize: function onResize(e) {
      if (e.position) {
        e.resizeable.applyRect(helper, e.rect);
      }

      helper.style.width = "".concat(e.rect.width, "px");
      helper.style.height = "".concat(e.rect.height, "px");
    },
    onResizeComplete: function onResizeComplete(e) {
      if (helper !== element && helper.parentElement) {
        helper.parentElement.removeChild(helper);
      }
    }
  };
}

function cloneHelperFactory(zIndex, opacity) {
  return function (element) {
    var r = element.cloneNode(true);
    r.style.zIndex = zIndex;
    r.style.opacity = opacity;
    return r;
  };
}

/***/ })

}]);
//# sourceMappingURL=chunk-2.bundle.js.map