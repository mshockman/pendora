(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[9],{

/***/ "./src/core/ui/Resizeable.js":
/*!***********************************!*\
  !*** ./src/core/ui/Resizeable.js ***!
  \***********************************/
/*! exports provided: CONTAINERS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINERS", function() { return CONTAINERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Resizeable; });
/* harmony import */ var core_utility_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utility/set */ "./src/core/utility/set.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var _utility_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/math */ "./src/core/utility/math.js");
/* harmony import */ var _utility_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/dom */ "./src/core/utility/dom.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





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
/**
 * Behavior class that makes an element resizeable.
 */

var Resizeable =
/*#__PURE__*/
function () {
  function Resizeable(element) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$handles = _ref.handles,
        handles = _ref$handles === void 0 ? "bottom-right" : _ref$handles,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
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
        _ref$autoHide = _ref.autoHide,
        autoHide = _ref$autoHide === void 0 ? false : _ref$autoHide,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

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
      _this._startResizing(event);
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
      var _this2 = this;

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
            minWidth = _this2.minWidth !== null && _this2.minWidth !== undefined ? _this2.minWidth : 0,
            maxWidth = _this2.maxWidth !== null && _this2.maxWidth !== undefined ? _this2.maxWidth : Infinity,
            minHeight = _this2.minHeight !== null && _this2.maxHeight !== undefined ? _this2.minHeight : 0,
            maxHeight = _this2.maxHeight !== null && _this2.maxHeight !== undefined ? _this2.maxHeight : Infinity;

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

        if (_this2.container) {
          container = _this2.container.call(_this2, _this2.element, event);

          if (container) {
            // I need to make my own object because the objects returned by Element.getBoundClientRect are readonly
            // and Object.assign({}, rect) doesn't map over the properties.
            var _container = {
              left: container.left,
              top: container.top,
              bottom: container.bottom,
              right: container.right
            };

            if (_this2.grid) {
              if (_this2.grid.x) {
                _container.left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.left, _this2.grid.x, Math.ceil);
                _container.right = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.right, _this2.grid.x, Math.floor);
              }

              if (_this2.grid.y) {
                _container.top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.top, _this2.grid.y, Math.ceil);
                _container.bottom = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(container.bottom, _this2.grid.y, Math.floor);
              }
            }

            container = _container;
          }
        }

        if (_this2.grid) {
          left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(left, _this2.grid.x);
          top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(top, _this2.grid.y);
          right = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(right, _this2.grid.x);
          bottom = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["snapToGrid"])(bottom, _this2.grid.y);
        }

        if (container) {
          left = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(left, container.left, container.right);
          right = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(right, container.left, container.right);
          bottom = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(bottom, container.top, container.bottom);
          top = Object(_utility_math__WEBPACK_IMPORTED_MODULE_2__["clamp"])(top, container.top, container.bottom);
        }

        if (_this2.keepAspectRatio) {
          if (direction === 'top-left' || direction === 'top-right') {
            top = bottom - (right - left) * _this2.keepAspectRatio;
          } else if (direction === 'bottom-left' || direction === 'bottom-right' || direction === 'left' || direction === 'right') {
            bottom = top + (right - left) * _this2.keepAspectRatio;
          } else if (direction === 'bottom' || direction === 'top') {
            right = left + (bottom - top) / _this2.keepAspectRatio;
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

        _this2.element.dispatchEvent(new CustomEvent('resizing', {
          bubbles: true,
          detail: {
            resizeable: _this2,
            target: target,
            originalEvent: event,
            clientX: event.clientX,
            clientY: event.clientY,
            element: _this2.element,
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

        if (_this2.element !== target) {
          target.parentElement.removeChild(target);
          Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(_this2.element, {
            left: rect.left - window.scrollX,
            top: rect.top - window.scrollY
          }, 'translate3d');
          _this2.element.style.width = "".concat(rect.width, "px");
          _this2.element.style.height = "".concat(rect.height, "px");
        }

        _this2.element.classList.remove('ui-resizing');

        _this2.isResizing = false;

        _this2.element.dispatchEvent(new CustomEvent('resize-end', {
          bubbles: true,
          detail: {
            resizeable: _this2,
            element: _this2.element,
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

/***/ }),

/***/ "./tests/src/test_resizeable.js":
/*!**************************************!*\
  !*** ./tests/src/test_resizeable.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResizeableTestPage; });
/* harmony import */ var core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Resizeable */ "./src/core/ui/Resizeable.js");
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




window.clientRectToDocumentSpace = core_ui_position__WEBPACK_IMPORTED_MODULE_2__["clientRectToDocumentSpace"];
window.documentRectToClientSpace = core_ui_position__WEBPACK_IMPORTED_MODULE_2__["documentRectToClientSpace"];

var ResizeableTestPage =
/*#__PURE__*/
function () {
  function ResizeableTestPage() {
    _classCallCheck(this, ResizeableTestPage);
  }

  _createClass(ResizeableTestPage, [{
    key: "load",
    value: function load() {
      var element1 = document.querySelector('#test-resizeable1');
      this.draggable = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](element1, {
        exclude: '.ui-resizeable-handle',
        container: core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client
      });
      this.resizeable = new core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["default"](element1, {
        handles: 'all',
        helper: 'test-helper',
        container: core_ui_Resizeable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client,
        keepAspectRatio: 0.5625
      });
      this.element1 = element1;
    }
  }]);

  return ResizeableTestPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-9.bundle.js.map