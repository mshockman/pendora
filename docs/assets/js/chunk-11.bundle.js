(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[11],{

/***/ "./src/core/ui/Resizeable.js":
/*!***********************************!*\
  !*** ./src/core/ui/Resizeable.js ***!
  \***********************************/
/*! exports provided: CONTAINERS, Resizeable2, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINERS", function() { return CONTAINERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resizeable2", function() { return Resizeable2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Resizeable; });
/* harmony import */ var core_utility_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utility/set */ "./src/core/utility/set.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var _utility_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/math */ "./src/core/utility/math.js");
/* harmony import */ var _utility_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/dom */ "./src/core/utility/dom.js");
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
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

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }






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
var Resizeable2 =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Resizeable2, _Publisher);

  function Resizeable2(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$handle = _ref.handle,
        handle = _ref$handle === void 0 ? ".resize-handle" : _ref$handle,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? null : _ref$selector,
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
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Resizeable2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Resizeable2).call(this));

    _startResizing.add(_assertThisInitialized(_this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _handle.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _helper.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _selector.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _container2.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _onMouseDown.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _defineProperty(_assertThisInitialized(_this), "minWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "maxWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "minHeight", void 0);

    _defineProperty(_assertThisInitialized(_this), "maxHeight", void 0);

    _defineProperty(_assertThisInitialized(_this), "keepAspectRatio", void 0);

    _defineProperty(_assertThisInitialized(_this), "grid", void 0);

    if (typeof element === 'string') {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, document.querySelector(element));
    } else {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, element);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _handle, handle);

    _classPrivateFieldSet(_assertThisInitialized(_this), _helper, helper);

    _classPrivateFieldSet(_assertThisInitialized(_this), _selector, selector);

    _this.minWidth = minWidth;
    _this.maxWidth = maxWidth;
    _this.minHeight = minHeight;
    _this.maxHeight = maxHeight;
    _this.keepAspectRatio = keepAspectRatio;
    _this.grid = grid;
    _this.container = container;
    return _this;
  }

  _createClass(Resizeable2, [{
    key: "container",
    get: function get() {},
    set: function set(value) {}
  }]);

  return Resizeable2;
}(_Publisher__WEBPACK_IMPORTED_MODULE_4__["default"]);
/**
 * Behavior class that makes an element resizeable.
 */

var _element = new WeakMap();

var _handle = new WeakMap();

var _helper = new WeakMap();

var _selector = new WeakMap();

var _container2 = new WeakMap();

var _onMouseDown = new WeakMap();

var _startResizing = new WeakSet();

var _startResizing2 = function _startResizing2(event, target) {};

var Resizeable =
/*#__PURE__*/
function () {
  function Resizeable(element) {
    var _this2 = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$handles = _ref2.handles,
        handles = _ref2$handles === void 0 ? "bottom-right" : _ref2$handles,
        _ref2$helper = _ref2.helper,
        helper = _ref2$helper === void 0 ? null : _ref2$helper,
        _ref2$minWidth = _ref2.minWidth,
        minWidth = _ref2$minWidth === void 0 ? null : _ref2$minWidth,
        _ref2$maxWidth = _ref2.maxWidth,
        maxWidth = _ref2$maxWidth === void 0 ? null : _ref2$maxWidth,
        _ref2$minHeight = _ref2.minHeight,
        minHeight = _ref2$minHeight === void 0 ? null : _ref2$minHeight,
        _ref2$maxHeight = _ref2.maxHeight,
        maxHeight = _ref2$maxHeight === void 0 ? null : _ref2$maxHeight,
        _ref2$keepAspectRatio = _ref2.keepAspectRatio,
        keepAspectRatio = _ref2$keepAspectRatio === void 0 ? false : _ref2$keepAspectRatio,
        _ref2$autoHide = _ref2.autoHide,
        autoHide = _ref2$autoHide === void 0 ? false : _ref2$autoHide,
        _ref2$container = _ref2.container,
        container = _ref2$container === void 0 ? null : _ref2$container,
        _ref2$grid = _ref2.grid,
        grid = _ref2$grid === void 0 ? null : _ref2$grid;

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
      _this2._startResizing(event);
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
      var _this3 = this;

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
            minWidth = _this3.minWidth !== null && _this3.minWidth !== undefined ? _this3.minWidth : 0,
            maxWidth = _this3.maxWidth !== null && _this3.maxWidth !== undefined ? _this3.maxWidth : Infinity,
            minHeight = _this3.minHeight !== null && _this3.maxHeight !== undefined ? _this3.minHeight : 0,
            maxHeight = _this3.maxHeight !== null && _this3.maxHeight !== undefined ? _this3.maxHeight : Infinity;

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

        if (_this3.container) {
          container = _this3.container.call(_this3, _this3.element, event);

          if (container) {
            // I need to make my own object because the objects returned by Element.getBoundClientRect are readonly
            // and Object.assign({}, rect) doesn't map over the properties.
            var _container = {
              left: container.left,
              top: container.top,
              bottom: container.bottom,
              right: container.right
            };

            if (_this3.grid) {
              if (_this3.grid.x) {
                _container.left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.left, _this3.grid.x, Math.ceil);
                _container.right = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.right, _this3.grid.x, Math.floor);
              }

              if (_this3.grid.y) {
                _container.top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.top, _this3.grid.y, Math.ceil);
                _container.bottom = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.bottom, _this3.grid.y, Math.floor);
              }
            }

            container = _container;
          }
        }

        if (_this3.grid) {
          left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(left, _this3.grid.x);
          top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(top, _this3.grid.y);
          right = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(right, _this3.grid.x);
          bottom = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(bottom, _this3.grid.y);
        }

        if (container) {
          left = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(left, container.left, container.right);
          right = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(right, container.left, container.right);
          bottom = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(bottom, container.top, container.bottom);
          top = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(top, container.top, container.bottom);
        }

        if (_this3.keepAspectRatio) {
          if (direction === 'top-left' || direction === 'top-right') {
            top = bottom - (right - left) * _this3.keepAspectRatio;
          } else if (direction === 'bottom-left' || direction === 'bottom-right' || direction === 'left' || direction === 'right') {
            bottom = top + (right - left) * _this3.keepAspectRatio;
          } else if (direction === 'bottom' || direction === 'top') {
            right = left + (bottom - top) / _this3.keepAspectRatio;
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

        _this3.element.dispatchEvent(new CustomEvent('resizing', {
          bubbles: true,
          detail: {
            resizeable: _this3,
            target: target,
            originalEvent: event,
            clientX: event.clientX,
            clientY: event.clientY,
            element: _this3.element,
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

        if (_this3.element !== target) {
          target.parentElement.removeChild(target);
          Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(_this3.element, {
            left: rect.left - window.scrollX,
            top: rect.top - window.scrollY
          }, 'translate3d');
          _this3.element.style.width = "".concat(rect.width, "px");
          _this3.element.style.height = "".concat(rect.height, "px");
        }

        _this3.element.classList.remove('ui-resizing');

        _this3.isResizing = false;

        _this3.element.dispatchEvent(new CustomEvent('resize-end', {
          bubbles: true,
          detail: {
            resizeable: _this3,
            element: _this3.element,
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

/***/ })

}]);
//# sourceMappingURL=chunk-11.bundle.js.map