(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[3],{

/***/ "./docs/js/pages/documentation/test_sortable.js":
/*!******************************************************!*\
  !*** ./docs/js/pages/documentation/test_sortable.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestSortablePage; });
/* harmony import */ var core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Sortable */ "./src/core/ui/Sortable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TestSortablePage =
/*#__PURE__*/
function () {
  function TestSortablePage() {
    _classCallCheck(this, TestSortablePage);
  }

  _createClass(TestSortablePage, [{
    key: "load",
    value: function load() {
      window.sortableGrid = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__["default"]("#sortable-grid", {
        layout: 'xy',
        setPlaceholderSize: true
      });
      window.sortableList1 = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__["default"]('#drag-list-test', {
        droppables: '.drop-list',
        placeholder: true,
        setPlaceholderSize: true
      });
      window.sortableList2 = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_0__["default"]('#drag-list-test2', {
        droppables: '.drop-list',
        placeholder: true,
        setPlaceholderSize: true
      });
    }
  }]);

  return TestSortablePage;
}();



/***/ }),

/***/ "./src/core/ui/Sortable.js":
/*!*********************************!*\
  !*** ./src/core/ui/Sortable.js ***!
  \*********************************/
/*! exports provided: placeholder, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placeholder", function() { return placeholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sortable; });
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
/* harmony import */ var _Draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Draggable */ "./src/core/ui/Draggable.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }



function placeholder(className) {
  var nodeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (element) {
    var placeholder = document.createElement(nodeName || element.nodeName),
        box = element.getBoundingClientRect();
    placeholder.style.boxSizing = "border-box";
    box.style.width = "".concat(box.width, "px");
    box.style.height = "".concat(box.height, "px");

    if (className) {
      placeholder.className = className;
    }
  };
}
/**
 * Creates a sortable list of items.
 */

var Sortable =
/*#__PURE__*/
function () {
  function Sortable(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$items = _ref.items,
        items = _ref$items === void 0 ? ".ui-sort-item" : _ref$items,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder,
        _ref$layout = _ref.layout,
        layout = _ref$layout === void 0 ? 'y' : _ref$layout,
        _ref$dropOnEmpty = _ref.dropOnEmpty,
        dropOnEmpty = _ref$dropOnEmpty === void 0 ? true : _ref$dropOnEmpty,
        _ref$accepts = _ref.accepts,
        accepts = _ref$accepts === void 0 ? null : _ref$accepts,
        _ref$setPlaceholderSi = _ref.setPlaceholderSize,
        setPlaceholderSize = _ref$setPlaceholderSi === void 0 ? false : _ref$setPlaceholderSi,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$axis = _ref.axis,
        axis = _ref$axis === void 0 ? 'xy' : _ref$axis,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? null : _ref$exclude,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? null : _ref$delay,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? _Draggable__WEBPACK_IMPORTED_MODULE_1__["cursor"] : _ref$offset,
        _ref$resistance = _ref.resistance,
        resistance = _ref$resistance === void 0 ? null : _ref$resistance,
        _ref$handle = _ref.handle,
        handle = _ref$handle === void 0 ? null : _ref$handle,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$revert = _ref.revert,
        revert = _ref$revert === void 0 ? null : _ref$revert,
        revertDuration = _ref.revertDuration,
        _ref$scrollSpeed = _ref.scrollSpeed,
        scrollSpeed = _ref$scrollSpeed === void 0 ? null : _ref$scrollSpeed,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 0.5 : _ref$tolerance,
        _ref$setHelperSize = _ref.setHelperSize,
        setHelperSize = _ref$setHelperSize === void 0 ? false : _ref$setHelperSize,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid,
        _ref$droppables = _ref.droppables,
        droppables = _ref$droppables === void 0 ? null : _ref$droppables;

    _classCallCheck(this, Sortable);

    _draggable.set(this, {
      writable: true,
      value: void 0
    });

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    _classPrivateFieldSet(this, _draggable, new _Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](this.element, {
      container: container,
      axis: axis,
      exclude: exclude,
      delay: delay,
      offset: offset,
      resistance: resistance,
      handle: handle,
      helper: helper,
      revert: revert,
      revertDuration: revertDuration,
      scrollSpeed: scrollSpeed,
      selector: items,
      tolerance: tolerance,
      setHelperSize: setHelperSize,
      grid: grid
    }));

    if (droppables) {
      this.connect(droppables);
    }

    this.items = items;
    this.layout = layout;
    this.placeholder = placeholder;
    this.dropOnEmpty = dropOnEmpty;
    this.accepts = accepts;
    this.setPlaceholderSize = setPlaceholderSize;
    this.initEvents();
  }

  _createClass(Sortable, [{
    key: "connect",
    value: function connect(droppables) {
      _classPrivateFieldGet(this, _draggable).connect(droppables);
    }
  }, {
    key: "disconnect",
    value: function disconnect(droppables) {
      _classPrivateFieldGet(this, _draggable).disconnect(droppables);
    }
  }, {
    key: "hasDroppable",
    value: function hasDroppable(droppable) {
      return _classPrivateFieldGet(this, _draggable).hasDroppable(droppable);
    }
  }, {
    key: "initEvents",

    /**
     * Initializes event listeners.
     */
    value: function initEvents() {
      var _this = this;

      var placeholder,
          isOver = false,
          init = false,
          target; // Attaches temporary events when drag starts.

      var initialize = function initialize(event) {
        init = true;
        target = event.detail.item;
        target.addEventListener('drag.move', onDragMove);
        target.addEventListener('drag.end', onDragComplete);
        target.addEventListener('sort-append', onSortAppend);
        var startBB = target.getBoundingClientRect();
        target.classList.add('ui-sorting');

        if (!placeholder && _this.placeholder) {
          if (typeof _this.placeholder === 'string') {
            placeholder = document.createElement(target.nodeName);
            placeholder.className = _this.placeholder;
          } else if (typeof _this.placeholder === 'function') {
            placeholder = _this.placeholder(target, _this);
          } else if (_this.placeholder === true) {
            placeholder = document.createElement(target.nodeName);
          } else {
            placeholder = _this.placeholder;
          }

          placeholder.classList.add('ui-placeholder');

          if (_this.setPlaceholderSize) {
            if (_this.setPlaceholderSize === true) {
              placeholder.style.width = "".concat(startBB.width, "px");
              placeholder.style.height = "".concat(startBB.height, "px");
              placeholder.style.boxSizing = 'border-box';
            } else if (Array.isArray(_this.setPlaceholderSize)) {
              placeholder.style.width = "".concat(_this.setPlaceholderSize[0], "px");
              placeholder.style.height = "".concat(_this.setPlaceholderSize[1], "px");
            } else {
              placeholder.style.width = "".concat(_this.setPlaceholderSize.width, "px");
              placeholder.style.height = "".concat(_this.setPlaceholderSize.height, "px");
            }
          }

          if (_this.element.contains(target)) {
            target.parentElement.insertBefore(placeholder, target);
          }
        }

        Object(core_ui_position__WEBPACK_IMPORTED_MODULE_0__["setElementClientPosition"])(target, startBB, 'translate3d');
      }; // Cleanup after sorting finishes.


      var destroy = function destroy() {
        if (target) {
          target.removeEventListener('drag.move', onDragMove);
          target.removeEventListener('drag.end', onDragComplete);
          target.removeEventListener('sort-append', onSortAppend);
          init = false;
          isOver = false;

          if (placeholder && placeholder.parentElement) {
            placeholder.parentElement.removeChild(placeholder);
          }

          placeholder = null;
          target.style.transform = "";
          target.classList.remove('ui-sorting');
          target = null;
        }
      }; // Ensures that the placeholder is removed if the item gets moves to another sortable.


      var onSortAppend = function onSortAppend(event) {
        if (event.detail !== _this && placeholder && placeholder.parentElement) {
          placeholder.parentElement.removeChild(placeholder);
        }
      }; // Moves the item to the correct position on mouse move.


      var onDragMove = function onDragMove(event) {
        if (!isOver || _this.accepts && !event.detail.item.matches(_this.accepts)) {
          return;
        }

        var target = event.detail.item,
            items = Array.prototype.slice.call(_this.getItems()).filter(function (i) {
          return i !== target;
        });

        var before = _this.getItemBeforePoint(event.detail.clientX, event.detail.clientY, items),
            after = _this.getItemAfterPoint(event.detail.clientX, event.detail.clientY, items),
            beforeBB = event.detail.helper.getBoundingClientRect(),
            dropOnEmpty = target.dataset.dropOnEmpty !== null && target.dataset.dropOnEmpty !== undefined ? target.dataset.dropOnEmpty === 'true' : _this.dropOnEmpty; // Allow overriding on item level.


        if (!items.length) {
          if (dropOnEmpty) {
            _this.element.appendChild(target);

            if (placeholder) target.parentElement.insertBefore(placeholder, target);

            _this._refreshPositions(event.detail.helper, beforeBB);

            _this._triggerSortAppendEvent(target);
          }
        } else if (before && before !== target) {
          before.parentElement.insertBefore(target, before.nextSibling);
          if (placeholder) target.parentElement.insertBefore(placeholder, target);

          _this._refreshPositions(event.detail.helper, beforeBB);

          _this._triggerSortAppendEvent(target);
        } else if (after && after !== target) {
          after.parentElement.insertBefore(target, after);
          if (placeholder) target.parentElement.insertBefore(placeholder, target);

          _this._refreshPositions(event.detail.helper, beforeBB);

          _this._triggerSortAppendEvent(target);
        }
      }; // Cleanup


      var onDragComplete = function onDragComplete() {
        destroy();
      }; // Initialize sorting.


      this.element.addEventListener('drag.enter', function (event) {
        if (_this.accepts && !event.detail.item.matches(_this.accepts)) {
          return;
        }

        isOver = true;

        if (!init) {
          initialize(event);
        }
      }); // Mark isOver state false.

      this.element.addEventListener('drag.leave', function () {
        isOver = false;
      }); // Initialize sorting that started on another sortable.

      this.element.addEventListener('drag.start', function (event) {
        if (!init) {
          initialize(event);
        }

        isOver = true;
      });
    }
    /**
     * Tests to see if the given (x, y) point is before or after the element.  Uses layout to determine if the test
     * is for the x layout, the y layout or the xy layout.
     * @param element
     * @param x
     * @param y
     * @returns {string|null}
     */

  }, {
    key: "getRelativePosition",
    value: function getRelativePosition(element, x, y) {
      var box = element.getBoundingClientRect(),
          mx = box.left + box.width / 2,
          my = box.top + box.height / 2;

      if (this.layout === 'x') {
        return mx < x ? 'after' : 'before';
      } else if (this.layout === 'y') {
        return my < y ? 'after' : 'before';
      } else if (this.layout === 'xy') {
        return box.bottom < y || mx < x && box.bottom >= y && box.top <= y ? 'after' : 'before';
      }

      return null;
    }
    /**
     * Returns the item immediately before the given x, y point.
     * @param x
     * @param y
     * @param items
     * @returns {*}
     */

  }, {
    key: "getItemBeforePoint",
    value: function getItemBeforePoint(x, y, items) {
      if (!items) items = this.getItems();
      var r = null;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (this.getRelativePosition(item, x, y) === 'after') {
          r = item;
        } else {
          break;
        }
      }

      if (r) {
        var box = r.getBoundingClientRect();

        if ((this.layout === 'x' || this.layout === 'xy') && box.top <= y && box.bottom >= y) {
          return r;
        } else if (this.layout === 'y' && box.left <= x && box.right >= x) {
          return r;
        }
      }
    }
    /**
     * Returns the item immediately after the given (x, y) point.
     * @param x
     * @param y
     * @param items
     * @returns {null|*}
     */

  }, {
    key: "getItemAfterPoint",
    value: function getItemAfterPoint(x, y, items) {
      if (!items) items = this.getItems();
      var r = null;

      for (var i = items.length - 1; i >= 0; i--) {
        var item = items[i];

        if (this.getRelativePosition(item, x, y) === 'before') {
          r = item;
        } else {
          break;
        }
      }

      if (r) {
        var box = r.getBoundingClientRect();

        if ((this.layout === 'x' || this.layout === 'xy') && box.top <= y && box.bottom >= y) {
          return r;
        } else if (this.layout === 'y' && box.left <= x && box.right >= x) {
          return r;
        }
      }

      return null;
    }
    /**
     * Returns a list of all items for the sortable.
     * @returns {NodeListOf<SVGElementTagNameMap[string]> | NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element>}
     */

  }, {
    key: "getItems",
    value: function getItems() {
      return this.element.querySelectorAll(this.items);
    }
    /**
     * helper method that translates the target to the provided client position.
     * @param target {{getBoundingClientRect, style} | Element}
     * @param position {{left[Number], top[Number]}}
     * @private
     */

  }, {
    key: "_refreshPositions",
    value: function _refreshPositions(target, position) {
      var current = target.getBoundingClientRect(),
          deltaLeft = current.left - position.left,
          deltaTop = current.top - position.top,
          translation = Object(core_ui_position__WEBPACK_IMPORTED_MODULE_0__["getTranslation"])(target);
      target.style.transform = "translate3d(".concat(translation.x - deltaLeft, "px, ").concat(translation.y - deltaTop, "px, 0)");
    }
    /**
     * Triggers the default sort-append event on the target.
     * @param target {Element}
     * @private
     */

  }, {
    key: "_triggerSortAppendEvent",
    value: function _triggerSortAppendEvent(target) {
      var event = new CustomEvent('sort-append', {
        bubbles: false,
        detail: this
      });
      target.dispatchEvent(event);
    }
  }, {
    key: "droppables",
    get: function get() {
      return _classPrivateFieldGet(this, _draggable).droppables;
    }
  }]);

  return Sortable;
}();

var _draggable = new WeakMap();



/***/ })

}]);
//# sourceMappingURL=chunk-3.bundle.js.map