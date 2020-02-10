(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[5],{

/***/ "./src/core/ui/Draggable.js":
/*!**********************************!*\
  !*** ./src/core/ui/Draggable.js ***!
  \**********************************/
/*! exports provided: cursor, clone, CONTAINERS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINERS", function() { return CONTAINERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/data */ "./src/core/data.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var _utility_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/math */ "./src/core/utility/math.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/**
 * Draggable option for offset that offsets the position by the cursor.
 *
 * @param clientX
 * @param clientY
 * @param boundingRect
 * @returns {{x, y}}
 */

function cursor(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY,
      boundingRect = _ref.boundingRect;
  return {
    x: boundingRect.left - clientX,
    y: boundingRect.top - clientY
  };
}
/**
 * Draggable option that clones the draggable element for the helper element.
 *
 * @param opacity
 * @returns {function(*): (ActiveX.IXMLDOMNode | Node)}
 */

function clone() {
  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (draggable) {
    var helper = draggable.element.cloneNode(true);

    if (opacity !== null) {
      helper.style.opacity = opacity;
    }

    return helper;
  };
}
/**
 * Returns the first scrollable parent.
 *
 * @param element
 * @returns {HTMLElement|null}
 * @private
 */

function _getScrollParent(element) {
  var o = element.parentElement;

  while (o) {
    if (o.scrollWidth > o.clientWidth || o.scrollHeight > o.clientHeight) {
      return o;
    }

    o = o.parentElement;
  }

  return null;
}
/**
 * Sets the target elements x and y position by setting the translate3d translation matrix.
 *
 * @param target
 * @param x
 * @param y
 * @private
 */


function _translate(target, x, y) {
  target.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
} // Group of function that can be passed to Draggables container property that will contain a dragged element to within
// the given parameters.  Function should return a rect with {left, top, width, and height} properties relative to the
// client.  Similiar to Element.getBoundingClientRect().


var CONTAINERS = {
  /**
   * Constrains to client area.
   * @returns {{top: number, left: number, width: number, height: number}}
   */
  client: function client() {
    return {
      left: 0,
      top: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      right: window.innerWidth,
      bottom: window.innerHeight
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
      height: parent.scrollHeight
    };
  }
};
/**
 * Takes a bounding client rect and constrains the left and top position to within the container.  Returns a new rect.
 *
 * @param rect
 * @param container
 * @param element
 * @param helper
 * @returns {{top: *, left: *}}
 * @private
 */

function _clampPositionToContainer(rect, container, element, helper) {
  var bb = helper.getBoundingClientRect();
  var x = rect.left,
      y = rect.top;

  if (container) {
    if (typeof container === 'function') {
      container = container(element, helper);
    } else if (container.getBoundingClientRect) {
      container = container.getBoundingClientRect();
    } else {
      container = element.closest(container);
      container = container.getBoundingClientRect();
    }

    if (container) {
      x = Object(_utility_math__WEBPACK_IMPORTED_MODULE_3__["clamp"])(x, container.left, container.left + container.width - bb.width);
      y = Object(_utility_math__WEBPACK_IMPORTED_MODULE_3__["clamp"])(y, container.top, container.top + container.height - bb.height);
    }
  }

  return _objectSpread({}, rect, {
    left: x,
    top: y
  });
} // Group of function that can be passed to the tolerance property of Draggable to control when an item is considered
// intersecting another for drop events.


var TOLERANCE_FUNCTIONS = {
  intersect: function intersect(droppable, item) {
    var origin = {
      x: item.left + item.width / 2,
      y: item.top + item.height / 2
    };
    return origin.x >= droppable.left && origin.x <= droppable.right && origin.y >= droppable.top && origin.y <= droppable.bottom;
  }
};
/**
 * Behavior class to add the draggable behavior to an element for group of elements.
 */

var Draggable =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Draggable, _Publisher);

  // noinspection JSUnusedGlobalSymbols

  /**
   * @param element {Element|String} The element to attach the draggable behavior to.
   * @param container {string|CONTAINERS.client|CONTAINERS.viewport|function}
   *  Constrains the draggable into the given area.
   *  `container` can either be a css selector to match a parent element, a Function(element, helper)
   *  that should return a bounding box.  Or an element who's bounding box will be used.
   * @param axis {'x'|'y'|'xy'}
   *  Controls what axis the item is draggable.  x can be dragged horizontally, y vertically, and xy can be freely dragged.
   * @param exclude {String}
   *  Prevents dragging from starting on matching elements.
   * @param delay {Number}
   *  The time in milliseconds after the mouse down event occurs that dragging will begin.
   * @param offset {{x, y}|[x, y]|Function}
   *  By default when an item is dragged is position will be set relative to the drop left corner of the item.
   *  Offset is used to offset the element from the cursor.  You can pass an {x, y} object, an array with [x, y] pair,
   *  or a Function({target, draggable, clientX, clientY, boundingRect}) that will be called that return an {x, y} object.
   * @param disabled {Boolean}
   *  Disables dragging.
   * @param distance {Number}
   *  Adds resistance to drag starting.  The users must move at least `distance` amount of pixels away from the
   *  starting position for drag to start.
   * @param handle {String}
   *  If dragging will only start if the user clicks an element that matches the css selectors.
   * @param helper {Function|Element}
   *  An element to use as a helper for dragging.  Can be a Element or a Function that returns an element.
   * @param revert {Number|Boolean}
   *  Controls if the draggable reverts back to the starting position if no droppable accepts the target.
   * @param scroll {Number}
   *  Controls the speed that the draggable will scroll the scrollParent when the draggable leaves the viewable area.
   * @param selector {String}
   *  Used to delegate dragging to sub items.
   * @param droppables
   *  An array of css selectors or elements that will be used as drop targets for the draggable.
   * @param tolerance {String}
   *  Controls the function that determines if an item intersects a drop target.
   * @param setHelperSize {Boolean}
   *  If true the helpers width and height will be set by javascript to match the original element.
   * @param grid {{x, y} | [x, y] | Number}
   *  Snaps draggable movement to a grid with the given x, y dimensions.
   */
  function Draggable(element) {
    var _this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$container = _ref2.container,
        container = _ref2$container === void 0 ? null : _ref2$container,
        _ref2$axis = _ref2.axis,
        axis = _ref2$axis === void 0 ? 'xy' : _ref2$axis,
        _ref2$exclude = _ref2.exclude,
        exclude = _ref2$exclude === void 0 ? "input, button, select, .js-no-drag, textarea" : _ref2$exclude,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? null : _ref2$delay,
        _ref2$offset = _ref2.offset,
        offset = _ref2$offset === void 0 ? cursor : _ref2$offset,
        _ref2$disabled = _ref2.disabled,
        disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
        _ref2$distance = _ref2.distance,
        distance = _ref2$distance === void 0 ? null : _ref2$distance,
        _ref2$handle = _ref2.handle,
        handle = _ref2$handle === void 0 ? null : _ref2$handle,
        _ref2$helper = _ref2.helper,
        helper = _ref2$helper === void 0 ? null : _ref2$helper,
        _ref2$revert = _ref2.revert,
        revert = _ref2$revert === void 0 ? null : _ref2$revert,
        _ref2$scroll = _ref2.scroll,
        scroll = _ref2$scroll === void 0 ? null : _ref2$scroll,
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === void 0 ? null : _ref2$selector,
        _ref2$droppables = _ref2.droppables,
        droppables = _ref2$droppables === void 0 ? null : _ref2$droppables,
        _ref2$tolerance = _ref2.tolerance,
        tolerance = _ref2$tolerance === void 0 ? 'intersect' : _ref2$tolerance,
        _ref2$setHelperSize = _ref2.setHelperSize,
        setHelperSize = _ref2$setHelperSize === void 0 ? false : _ref2$setHelperSize,
        _ref2$grid = _ref2.grid,
        grid = _ref2$grid === void 0 ? null : _ref2$grid;

    _classCallCheck(this, Draggable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Draggable).call(this));

    if (typeof element === 'string') {
      _this.element = document.querySelector(element);
    } else {
      _this.element = element;
    }

    _this._onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.disabled = disabled;
    _this.helper = helper;
    _this.offset = offset;
    _this.axis = axis;
    _this.delay = delay;
    _this.distance = distance;
    _this.container = container;
    _this.handle = handle;
    _this.exclude = exclude;
    _this.revert = revert;
    _this.selector = selector;
    _this.droppables = [];
    _this.tolerance = tolerance;
    _this.setHelperSize = setHelperSize;
    _this.scroll = scroll;

    if (typeof grid === 'number') {
      _this.grid = {
        x: grid,
        y: grid
      };
    } else if (Array.isArray(grid)) {
      _this.grid = {
        x: grid[0],
        y: grid[1]
      };
    } else {
      _this.grid = grid;
    }

    if (droppables) {
      _this.addDroppables(droppables);
    }

    _this.element.addEventListener('mousedown', _this._onMouseDown);

    _this.isDragging = false;
    _this._revertFX = null;
    return _this;
  }
  /**
   * Adds a drop target item.  A `droppable` can be an element, a css selector or an array of those.
   * @param droppables
   */


  _createClass(Draggable, [{
    key: "addDroppables",
    value: function addDroppables(droppables) {
      if (Array.isArray(droppables)) {
        this.droppables = this.droppables.concat(droppables);
      } else {
        this.droppables.push(droppables);
      }
    }
    /**
     * Responsible for detecting dragging and starting the drag depending on delay and distance.
     * @param event
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var _this2 = this;

      var element = this.element;

      if (this.selector) {
        element = event.target.closest(this.selector);

        if (!this.element.contains(element)) {
          element = null;
        }
      }

      if (!element) return;
      var data = core_data__WEBPACK_IMPORTED_MODULE_1__["privateCache"].cache(element);

      if (data.isDragging || this.disabled) {
        return;
      }

      if (this.handle) {
        var handle = event.target.closest(this.handle);

        if (!handle || !element.contains(handle)) {
          return;
        }
      }

      if (this.exclude) {
        var excluded = event.target.closest(this.exclude);

        if (excluded && element.contains(excluded)) {
          return;
        }
      }

      event.preventDefault();
      var distance = this.distance || 0,
          delay = typeof this.delay === 'number' ? this.delay : -1,
          doc = document,
          startMouseDocumentX = event.clientX + window.scrollX,
          startMouseDocumentY = event.clientY + window.scrollY,
          mouseDocumentX = startMouseDocumentX,
          mouseDocumentY = startMouseDocumentY; // Tests to see that delay and distance was met before dragging.

      var startDragging = function startDragging() {
        if (distance === 0 && delay < 0) {
          _this2.startDrag(element, startMouseDocumentX, startMouseDocumentY, mouseDocumentX, mouseDocumentY);
        }
      }; // Delay dragging.


      if (delay >= 0) {
        var timer;

        var onTimeout = function onTimeout() {
          delay = -1;
          doc.removeEventListener('mouseup', onMouseUp);
          startDragging();
        };

        var onMouseUp = function onMouseUp() {
          doc.removeEventListener('mouseup', onMouseUp);
          clearTimeout(timer);
        };

        doc.addEventListener('mouseup', onMouseUp);
        timer = setTimeout(onTimeout, delay);
      } // Delay by distance.


      if (distance > 0) {
        var _onMouseUp = function _onMouseUp() {
          doc.removeEventListener('mouseup', _onMouseUp);
          doc.removeEventListener('mousemove', onMouseMove);
        };

        var onMouseMove = function onMouseMove(event) {
          mouseDocumentX = event.clientX + window.scrollX;
          mouseDocumentY = event.clientY + window.scrollY;
          var delta = Math.sqrt(Math.pow(mouseDocumentX - startMouseDocumentX, 2) + Math.pow(mouseDocumentY - startMouseDocumentY, 2));

          if (delta > distance) {
            distance = 0;
            doc.removeEventListener('mouseup', _onMouseUp);
            doc.removeEventListener('mousemove', onMouseMove);
            startDragging();
          }
        };

        doc.addEventListener('mouseup', _onMouseUp);
        doc.addEventListener('mousemove', onMouseMove);
      }

      startDragging();
    }
    /**
     * Starts the drag animation at the given x, y origin.
     *
     * @param element
     * @param startMouseX
     * @param startMouseY
     * @param posX
     * @param posY
     */

  }, {
    key: "startDrag",
    value: function startDrag(element, startMouseX, startMouseY, posX, posY) {
      var _this3 = this;

      if (this.isDragging) {
        return;
      }

      this.isDragging = true; // Cancel any animation that are running.

      if (this._revertFX) {
        this._revertFX.cancel();

        this._revertFX = null;
      }

      var doc = document,
          target,
          droppables = this.getDropTargets(),
          startBoundingBox = element.getBoundingClientRect(),
          startBBDocument = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["clientRectToDocumentSpace"])(startBoundingBox),
          helper,
          _scrollTick;

      if (!this.helper || this.helper === 'self') {
        target = element;
      } else if (typeof this.helper === 'function') {
        target = this.helper(this);
        helper = target;
      } else if (this.helper) {
        target = this.helper;
        helper = target;
      }

      if (helper) {
        if (this.setHelperSize) {
          if (this.setHelperSize === true) {
            helper.style.width = "".concat(startBoundingBox.width, "px");
            helper.style.height = "".concat(startBoundingBox.height, "px");
            helper.style.boxSizing = 'border-box';
          } else if (Array.isArray(this.setHelperSize)) {
            helper.style.width = "".concat(this.setHelperSize[0], "px");
            helper.style.height = "".concat(this.setHelperSize[1], "px");
          } else {
            helper.style.width = "".concat(this.setHelperSize.width, "px");
            helper.style.height = "".concat(this.setHelperSize.height, "px");
          }
        }
      } // If the target doesn't have a parentElement it needs to be added to the page.


      if (!target.parentElement) {
        element.parentElement.appendChild(target);
      } // mouseOffsetX and mouseOffsetY is the mouses offset relative to the top left corner of the element
      // being dragged.
      // offsetX and offsetY is how much the dragged element is offset from the cursor.
      // By default it is at the top left of the element.


      var startingTranslation = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["getTranslation"])(target),
          offset = {
        x: 0,
        y: 0
      }; // The offset property controls how much the dragged element is offset from top left corner of the element.
      // By default it is [0, 0] but a function can be or array can be passed to control this behavior.

      if (this.offset) {
        var _offset = this.offset;

        if (typeof _offset === 'function') {
          offset = this.offset({
            target: target,
            draggable: this,
            clientX: startMouseX - window.scrollX,
            clientY: startMouseY - window.scrollY,
            boundingRect: startBoundingBox
          });
        }
      } // Offset should be {x, y} not an array.


      if (Array.isArray(offset)) {
        offset = {
          x: offset[0],
          y: offset[1]
        };
      }

      var onMouseMove = function onMouseMove(event) {
        event.preventDefault();

        var startingRect = target.getBoundingClientRect(),
            position = _this3._getPosition(element, target, event.clientX, event.clientY, offset, _this3.container),
            dropData;

        Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["setElementClientPosition"])(target, position, 'translate3d');
        dropData = _this3._getDropData(droppables, startingRect, position);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = dropData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var droppable = _step.value;

            if (!droppable.intersectsBefore && droppable.intersectsAfter) {
              _this3._dispatchDroppableEvent(droppable.target, 'drag-enter', {
                bubbles: true,
                detail: {
                  item: target
                }
              });
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

        _this3._triggerEvent(element, 'drag-move', {
          bubbles: false,
          details: {
            mouseX: event.clientX + window.scrollX,
            mouseY: event.clientY + window.scrollY,
            clientX: event.clientX,
            clientY: event.clientY,
            startMouseX: startMouseX,
            startMouseY: startMouseY,
            offset: offset,
            helper: target,
            originalEvent: event
          },
          topic: 'draggable.move'
        }); // Refresh dropData incase something moved.


        dropData = _this3._getDropData(droppables, startingRect, position);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = dropData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _droppable = _step2.value;

            if (_droppable.intersectsBefore && !_droppable.intersectsAfter) {
              _this3._dispatchDroppableEvent(_droppable.target, 'drag-leave', {
                bubbles: true,
                detail: {
                  item: target
                }
              });
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

        if (_this3.scroll && !_scrollTick) {
          var parent = _getScrollParent(element);

          if (parent) {
            var lastTick = performance.now(),
                scrollX = parent.scrollLeft,
                scrollY = parent.scrollTop;

            _scrollTick = function scrollTick(timestamp) {
              var parentBB = parent.getBoundingClientRect(),
                  helperBB = target.getBoundingClientRect(),
                  x,
                  y,
                  delta = timestamp - lastTick,
                  isOOB = false;
              lastTick = timestamp;

              if (helperBB.right > parentBB.right) {
                x = (helperBB.right - parentBB.right) / helperBB.width;
                isOOB = true;
                scrollX += delta * x * _this3.scroll;
                parent.scrollLeft = scrollX;
              } else if (helperBB.left < parentBB.left) {
                x = (parentBB.left - helperBB.left) / helperBB.width;
                isOOB = true;
                scrollX -= delta * x * _this3.scroll;
                parent.scrollLeft = scrollX;
              }

              if (helperBB.bottom > parentBB.bottom) {
                y = (helperBB.bottom - parentBB.bottom) / helperBB.height;
                isOOB = true;
                scrollY += delta * y * _this3.scroll;
                parent.scrollTop = scrollY;
              } else if (helperBB.top < parentBB.top) {
                y = (parentBB.top - helperBB.top) / helperBB.height;
                isOOB = true;
                scrollY -= delta * y * _this3.scroll;
                parent.scrollTop = scrollY;
              }

              helperBB = _clampPositionToContainer(helperBB, _this3.container, element, target);
              Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["setElementClientPosition"])(target, helperBB, 'translate3d');

              if (isOOB && _this3.isDragging) {
                window.requestAnimationFrame(_scrollTick);
              } else {
                _scrollTick = null;
              }
            };

            window.requestAnimationFrame(_scrollTick);
          }
        }
      };

      var onMouseUp = function onMouseUp(event) {
        event.preventDefault();
        doc.removeEventListener('mousemove', onMouseMove);
        doc.removeEventListener('mouseup', onMouseUp);
        doc = null;
        _this3.isDragging = false;
        element.classList.remove('ui-dragging');

        var startingRect = target.getBoundingClientRect(),
            position = _this3._getPosition(element, target, event.clientX, event.clientY, offset, _this3.container),
            translation = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["getTranslation"])(target),
            accepted = null;

        function accept(element) {
          if (!accepted) {
            accepted = element;
          } else {
            throw new Error("Draggable has already been accepted.");
          }
        }

        function isAccepted() {
          return !!accepted;
        }

        _this3._triggerEvent(element, 'drag-end', {
          bubbles: true,
          details: {
            startX: startMouseX - window.scrollX,
            startMouseY: startMouseY,
            offset: offset,
            clientX: event.clientX,
            clientY: event.clientY,
            originalEvent: event,
            helper: target,
            accept: accept,
            isAccepted: isAccepted
          },
          topic: 'draggable.end',
          accept: accept,
          isAccepted: isAccepted
        });

        if (!accepted && _this3.revert === true) {
          _translate(target, startingTranslation.x, startingTranslation.y);

          if (target !== element && target.parentElement) {
            target.parentElement.removeChild(target);
          }

          _this3._triggerEvent(element, 'drag-complete', {
            bubbles: true,
            topic: 'draggable.complete'
          });
        } else if (!accepted && typeof _this3.revert === 'number') {
          var animation = new _fx_Animation__WEBPACK_IMPORTED_MODULE_4__["default"]({
            applyFrame: function applyFrame(element, frame) {
              _translate(element, frame.left, frame.top);
            },
            frames: {
              '0%': {
                left: translation.x + (position.left - startingRect.left),
                top: translation.y + (position.top - startingRect.top)
              },
              '100%': {
                left: startingTranslation.x,
                top: startingTranslation.y
              }
            }
          });
          _this3._revertFX = animation.animate(target, {
            duration: _this3.revert,
            onEnd: function onEnd() {
              if (target !== element && target.parentElement) {
                target.parentElement.removeChild(target);
              }
            },
            onComplete: function onComplete() {
              _this3._triggerEvent(element, 'drag-complete', {
                bubbles: true,
                topic: 'draggable.complete'
              });
            }
          });
        } else {
          if (target !== element && target.parentElement) {
            target.parentElement.removeChild(target);
          }

          Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["setElementClientPosition"])(element, position, 'translate3d');

          var _startingRect = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["documentRectToClientSpace"])(startBBDocument),
              dropped = [];

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = droppables[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var droppable = _step3.value;

              if (_this3._intersects(element.dataset.tolerance, droppable.getBoundingClientRect(), position)) {
                _this3._dispatchDroppableEvent(droppable, 'drop', {
                  bubbles: true,
                  clientX: event.clientX,
                  clientY: event.clientY,
                  relatedTarget: element,
                  detail: {
                    originalEvent: event,
                    startingBoundingClientRect: _startingRect,
                    droppable: droppable
                  }
                });
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

          _this3._triggerEvent(element, 'drag-complete', {
            topic: 'draggable.complete',
            details: {
              dropped: dropped
            },
            bubbles: true,
            dropped: dropped
          });
        }
      };

      doc.addEventListener('mousemove', onMouseMove);
      doc.addEventListener('mouseup', onMouseUp);
      element.classList.add('ui-dragging');

      this._triggerEvent(element, 'drag-start', {
        bubbles: true,
        details: {
          startMouseY: startMouseY,
          startMouseX: startMouseX,
          offset: offset,
          mouseX: posX,
          mouseY: posY,
          clientX: posX - window.scrollX,
          clientY: posY - window.scrollY,
          helper: target
        },
        topic: 'draggable.start'
      });
    }
    /**
     * Gets an array of elements of all the drop targets.
     * If the drop target is a string, it queries for those elements.
     *
     * @returns {Array}
     */

  }, {
    key: "getDropTargets",
    value: function getDropTargets() {
      var r = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.droppables[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var droppable = _step4.value;

          var type = _typeof(droppable);

          if (type === 'string') {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = document.querySelectorAll(droppable)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var target = _step5.value;
                if (r.indexOf(target) !== -1) continue;
                r.push(target);
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
          } else if (type === 'function') {
            droppable = droppable.call(this, this);
            if (r.indexOf(droppable) !== -1) continue;
            r.push(droppable);
          } else {
            if (r.indexOf(droppable) !== -1) continue;
            r.push(droppable);
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

      return r;
    }
    /**
     * Takes an array of drop targets and tests to see if the target intersects the start and ending rectangles.
     *
     * Rects are objects that have the left, right, top, bottom, width and height properties defined.
     * Similar to the results received from Element.getBoundingClientRect().
     *
     * @param droppables - Array of elements to tests.
     * @param startingRect - Starting rect.
     * @param endingRect - Ending rect.
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getDropData",
    value: function _getDropData(droppables, startingRect, endingRect) {
      var dropData = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = droppables[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var droppable = _step6.value;
          // Convert to client space.
          var dropBox = droppable.getBoundingClientRect();

          var intersectsBefore = this._intersects(droppable.dataset.tolerance, dropBox, startingRect),
              intersectsAfter = this._intersects(droppable.dataset.tolerance, dropBox, endingRect);

          dropData.push(_objectSpread({
            intersectsBefore: intersectsBefore,
            intersectsAfter: intersectsAfter,
            target: droppable
          }, dropBox));
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return dropData;
    }
    /**
     * Triggers an event on the current item.
     *
     * @param item
     * @param eventName
     * @param details
     * @param bubbles
     * @param topic
     * @param properties
     * @private
     */

  }, {
    key: "_triggerEvent",
    value: function _triggerEvent(item, eventName, _ref3) {
      var bubbles = _ref3.bubbles,
          details = _ref3.details,
          topic = _ref3.topic,
          properties = _objectWithoutProperties(_ref3, ["bubbles", "details", "topic"]);

      details = _objectSpread({
        draggable: this,
        item: item
      }, details);
      var event = new CustomEvent(eventName, {
        bubbles: bubbles,
        detail: details
      });

      if (properties) {
        Object.assign(event, properties);
      }

      item.dispatchEvent(event);

      if (topic !== false) {
        topic = topic || eventName;
        this.publish(topic, _objectSpread({
          draggable: this,
          item: this
        }, details));
      }
    }
  }, {
    key: "_dispatchDroppableEvent",
    value: function _dispatchDroppableEvent(dropElement, name) {
      var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref4$bubbles = _ref4.bubbles,
          bubbles = _ref4$bubbles === void 0 ? true : _ref4$bubbles,
          _ref4$detail = _ref4.detail,
          detail = _ref4$detail === void 0 ? {} : _ref4$detail,
          properties = _objectWithoutProperties(_ref4, ["bubbles", "detail"]);

      var customEvent = new CustomEvent(name, {
        bubbles: bubbles,
        detail: _objectSpread({
          dropElement: dropElement,
          draggable: this
        }, detail)
      }); // if(topic !== false && droppable.publish) {
      //     topic = topic || name;
      //
      //     droppable.publish(topic, {
      //         target: droppable,
      //         draggable: this,
      //         name: topic,
      //         ...detail
      //     });
      // }

      Object.assign(customEvent, properties);
      dropElement.dispatchEvent(customEvent);
    }
    /**
     * Tests to see if the item intersects the droppable with the given tolerance function.
     *
     * @param tolerance
     * @param droppable
     * @param item
     * @returns {*}
     * @private
     */

  }, {
    key: "_intersects",
    value: function _intersects(tolerance, droppable, item) {
      tolerance = tolerance || this.tolerance;
      return TOLERANCE_FUNCTIONS[tolerance](droppable, item);
    }
    /**
     * Retrieves the expected bound box of the helper element at the given mouse coordinates.
     *
     * @param element
     * @param helper
     * @param clientX
     * @param clientY
     * @param offset
     * @param container
     * @returns {{top: *, left: *, bottom: *, width: number, right: *, height: number, target: *}}
     */

  }, {
    key: "_getPosition",
    value: function _getPosition(element, helper, clientX, clientY, offset, container) {
      var bb = helper.getBoundingClientRect();
      var left = clientX + offset.x,
          top = clientY + offset.y;

      if (this.grid) {
        left = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["snapToGrid"])(left, this.grid.x);
        top = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_2__["snapToGrid"])(top, this.grid.y);
      }

      var r = {
        left: left,
        top: top,
        width: bb.width,
        height: bb.height,
        right: left + bb.width,
        bottom: top + bb.height,
        target: helper
      };
      return _objectSpread({}, r, {}, _clampPositionToContainer(r, container, element, helper));
    }
  }]);

  return Draggable;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(Draggable, "CLONE", clone);

_defineProperty(Draggable, "OFFSET_CURSOR", cursor);



/***/ })

}]);
//# sourceMappingURL=chunk-5.bundle.js.map