(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[6],{

/***/ "./src/core/ui/PanesView.js":
/*!**********************************!*\
  !*** ./src/core/ui/PanesView.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PaneView; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _autoloader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../autoloader */ "./src/autoloader.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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





var symbolPane = Symbol('pane');

function getClosestPaneController(element) {
  while (element) {
    if (element[symbolPane]) {
      return element[symbolPane];
    } else {
      element = element.parentElement;
    }
  }

  return null;
}
/**
 * Creates a resizable pane view.
 */


var PaneView =
/*#__PURE__*/
function (_Component) {
  _inherits(PaneView, _Component);

  function PaneView(element) {
    var _this;

    var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';

    _classCallCheck(this, PaneView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PaneView).call(this, element));

    _onMouseMove.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _onMouseMoveTarget.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _onMouseUp.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _axis.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _frameID.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    if (_this.element[symbolPane]) {
      throw new Error("Can only initialize one pane controller per element.");
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _onMouseMove, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _onMouseMoveTarget, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _onMouseUp, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _axis, _this.element.dataset.axis || axis);

    _classPrivateFieldSet(_assertThisInitialized(_this), _frameID, null);

    _this.element[symbolPane] = _assertThisInitialized(_this);

    _this.element.addEventListener('mousedown', function (event) {
      var handle = event.target.closest('[data-handle]');

      if (handle && getClosestPaneController(handle) === _assertThisInitialized(_this)) {
        _this._startResizing(event);
      }
    });

    return _this;
  }

  _createClass(PaneView, [{
    key: "_startResizing",
    value: function _startResizing(event) {
      var _this2 = this;

      if (_classPrivateFieldGet(this, _onMouseMove)) {
        this.cancelResizing();
      }

      var targetChild = this.getTargetChild(event.target);
      event.stopPropagation();

      var mouse = {
        x: event.clientX,
        y: event.clientY
      },
          delta = {
        x: 0,
        y: 0
      },
          startMousePos = _objectSpread({}, mouse),
          startingData = this.getPaneData(),
          index = startingData.findIndex(function (item) {
        return item.element === targetChild;
      }),
          next,
          current = startingData[index];

      if (!current.pane) {
        current = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["rangeFindItem"])(startingData, function (item) {
          return item.pane;
        }, index, 0);
        next = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["rangeFindItem"])(startingData, function (item) {
          return item.pane;
        }, index + 1, null);
      } else {
        if (current.pane === '-x' || current.pane === '-y' || current.pane === '-') {
          next = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["rangeFindItem"])(startingData, function (item) {
            return item.pane;
          }, index - 1, 0);
        } else {
          next = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["rangeFindItem"])(startingData, function (item) {
            return item.pane;
          }, index + 1, null);
        }
      }

      _classPrivateFieldSet(this, _onMouseMoveTarget, document);

      _classPrivateFieldSet(this, _onMouseMove, function (event) {
        event.preventDefault();
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        delta = {
          x: mouse.x - startMousePos.x,
          y: mouse.y - startMousePos.y
        };

        if (_classPrivateFieldGet(_this2, _axis) === 'x') {
          var x = current.pane === '-x' || current.pane === '-' ? -delta.x : delta.x,
              maxShrink,
              maxGrow,
              amount;
          maxShrink = Math.min(current.rect.width - current.minWidth, next.maxWidth - next.rect.width);
          maxGrow = Math.min(current.maxWidth - current.rect.width, next.rect.width - next.minWidth);
          amount = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(x, -maxShrink, maxGrow);

          if (_classPrivateFieldGet(_this2, _frameID)) {
            window.cancelAnimationFrame(_classPrivateFieldGet(_this2, _frameID));

            _classPrivateFieldSet(_this2, _frameID, null);
          }

          _classPrivateFieldSet(_this2, _frameID, window.requestAnimationFrame(function () {
            _classPrivateFieldSet(_this2, _frameID, null);

            if (current.pane !== "fluid") current.element.style.width = "".concat(current.rect.width + amount, "px");
            if (next.pane !== "fluid") next.element.style.width = "".concat(next.rect.width - amount, "px");
          }));
        } else {
          var y = current.pane === '-y' || current.pane === '-' ? -delta.y : delta.y,
              _maxShrink,
              _maxGrow,
              _amount;

          _maxShrink = Math.min(current.rect.height - current.minHeight, next.maxHeight - next.rect.height);
          _maxGrow = Math.min(current.maxHeight - current.rect.height, next.rect.height - next.minHeight);
          _amount = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["clamp"])(y, -_maxShrink, _maxGrow);

          if (_classPrivateFieldGet(_this2, _frameID)) {
            window.cancelAnimationFrame(_classPrivateFieldGet(_this2, _frameID));

            _classPrivateFieldSet(_this2, _frameID, null);
          }

          _classPrivateFieldSet(_this2, _frameID, window.requestAnimationFrame(function () {
            _classPrivateFieldSet(_this2, _frameID, null);

            if (current.pane !== "fluid") current.element.style.height = "".concat(current.rect.height + _amount, "px");
            if (next.pane !== "fluid") next.element.style.height = "".concat(next.rect.height - _amount, "px");
          }));
        }
      });

      _classPrivateFieldSet(this, _onMouseUp, function () {
        _this2.cancelResizing();
      });

      _classPrivateFieldGet(this, _onMouseMoveTarget).addEventListener('mousemove', _classPrivateFieldGet(this, _onMouseMove));

      _classPrivateFieldGet(this, _onMouseMoveTarget).addEventListener('mouseup', _classPrivateFieldGet(this, _onMouseUp));
    }
  }, {
    key: "cancelResizing",
    value: function cancelResizing() {
      if (_classPrivateFieldGet(this, _onMouseMove)) {
        _classPrivateFieldGet(this, _onMouseMoveTarget).removeEventListener('mousemove', _classPrivateFieldGet(this, _onMouseMove));

        _classPrivateFieldGet(this, _onMouseMoveTarget).removeEventListener('mouseup', _classPrivateFieldGet(this, _onMouseUp));

        _classPrivateFieldSet(this, _onMouseMoveTarget, null);

        _classPrivateFieldSet(this, _onMouseMove, null);

        _classPrivateFieldSet(this, _onMouseUp, null);
      }
    }
  }, {
    key: "getTargetChild",
    value: function getTargetChild(element) {
      var node = element;

      while (node.parentElement) {
        if (node.parentElement === this.element) {
          return node;
        }

        node = node.parentElement;
      }

      return null;
    }
  }, {
    key: "getPaneData",
    value: function getPaneData() {
      var r = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.element.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          var style = getComputedStyle(child),
              rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_1__["default"](child);
          r.push({
            maxWidth: parseFloat(style.maxWidth) || Infinity,
            maxHeight: parseFloat(style.maxHeight) || Infinity,
            minWidth: parseFloat(style.minWidth) || 0,
            minHeight: parseFloat(style.minHeight) || 0,
            rect: rect,
            element: child,
            pane: child.dataset.pane
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

      return r;
    }
  }]);

  return PaneView;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _onMouseMove = new WeakMap();

var _onMouseMoveTarget = new WeakMap();

var _onMouseUp = new WeakMap();

var _axis = new WeakMap();

var _frameID = new WeakMap();


_autoloader__WEBPACK_IMPORTED_MODULE_3__["default"].register('panes', function (element) {
  return new PaneView(element, element.dataset.axis || 'x');
});

/***/ }),

/***/ "./tests/src/test_panes.js":
/*!*********************************!*\
  !*** ./tests/src/test_panes.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PanesTestPage; });
/* harmony import */ var _src_core_ui_PanesView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/core/ui/PanesView */ "./src/core/ui/PanesView.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var PanesTestPage =
/*#__PURE__*/
function () {
  // noinspection JSUnusedGlobalSymbols
  function PanesTestPage() {
    _classCallCheck(this, PanesTestPage);
  } // noinspection JSUnusedGlobalSymbols


  _createClass(PanesTestPage, [{
    key: "load",
    value: function load() {}
  }]);

  return PanesTestPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-6.bundle.js.map