(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[0],{

/***/ "./jekyll/js/pages/documentation/test_draggable.js":
/*!*********************************************************!*\
  !*** ./jekyll/js/pages/documentation/test_draggable.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestDraggablePage; });
/* harmony import */ var core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Draggable2 */ "./src/core/ui/Draggable2.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TestDraggablePage =
/*#__PURE__*/
function () {
  function TestDraggablePage() {
    _classCallCheck(this, TestDraggablePage);
  }

  _createClass(TestDraggablePage, [{
    key: "load",
    value: function load() {
      this.drag1 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example1", {
        resistance: 0,
        delay: 0,
        scrollSpeed: 1000,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('.example-zone')
      });
      this.drag2 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example2", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez2'),
        helper: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["clone"])(0.5)
      });
    }
  }]);

  return TestDraggablePage;
}();



/***/ }),

/***/ "./src/core/ui/Draggable2.js":
/*!***********************************!*\
  !*** ./src/core/ui/Draggable2.js ***!
  \***********************************/
/*! exports provided: cursor, default, ScrollArea, clone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollArea", function() { return ScrollArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }






function cursor(target, event) {
  var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

var Draggable2 =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Draggable2, _Publisher);

  function Draggable2(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$axis = _ref.axis,
        axis = _ref$axis === void 0 ? 'xy' : _ref$axis,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? '' : _ref$exclude,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 0 : _ref$delay,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? cursor : _ref$offset,
        _ref$resistance = _ref.resistance,
        resistance = _ref$resistance === void 0 ? 0 : _ref$resistance,
        _ref$handle = _ref.handle,
        handle = _ref$handle === void 0 ? null : _ref$handle,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$revert = _ref.revert,
        revert = _ref$revert === void 0 ? false : _ref$revert,
        _ref$revertDuration = _ref.revertDuration,
        revertDuration = _ref$revertDuration === void 0 ? 1000 : _ref$revertDuration,
        _ref$scrollSpeed = _ref.scrollSpeed,
        scrollSpeed = _ref$scrollSpeed === void 0 ? 0 : _ref$scrollSpeed,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? null : _ref$selector,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 'intersect' : _ref$tolerance,
        _ref$setHelperSize = _ref.setHelperSize,
        setHelperSize = _ref$setHelperSize === void 0 ? false : _ref$setHelperSize,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Draggable2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Draggable2).call(this));

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _droppables.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _boundOnMouseDown.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _revertFX.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _isDragging.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    if (typeof element === 'string') {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, document.querySelector(element));
    } else {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, element);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _droppables, []);

    _classPrivateFieldSet(_assertThisInitialized(_this), _revertFX, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _isDragging, false);

    _this.container = container;
    _this.axis = axis;
    _this.exclude = exclude;
    _this.delay = delay;
    _this.offset = offset;
    _this.resistance = resistance;
    _this.handle = handle;
    _this.helper = helper;
    _this.revert = revert;
    _this.revertDuration = revertDuration;
    _this.scrollSpeed = scrollSpeed;
    _this.selector = selector;
    _this.tolerance = tolerance;
    _this.setHelperSize = setHelperSize;
    _this.grid = grid;

    if (typeof _this.container === 'string') {
      _this.container = document.querySelector(_this.container);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _boundOnMouseDown, function (event) {
      return _this.onMouseDown(event);
    });

    _this.element.addEventListener('mousedown', _classPrivateFieldGet(_assertThisInitialized(_this), _boundOnMouseDown));

    return _this;
  }
  /**
   * Starts dragging if the correct elements have been targeted and delay and resistance have been meet.
   *
   * @param event
   * @returns {Promise<void>}
   */


  _createClass(Draggable2, [{
    key: "onMouseDown",
    value: function () {
      var _onMouseDown = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(event) {
        var _this2 = this;

        var startPosition, currentPosition, target, cancelMouseTracking, cancelTimer, distanceBrokenPromise, timerPromise, offset, handle, exclude, onMouseUp, _ref2, _ref3, timerStatus, distanceStatus;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                startPosition = {
                  x: event.clientX + window.pageXOffset,
                  y: event.clientY + window.pageYOffset
                }, currentPosition = {
                  x: startPosition.x,
                  y: startPosition.y
                }, target = _classPrivateFieldGet(this, _element), cancelMouseTracking = null, cancelTimer = null; // Only start dragging if a draggable child of the element is targeted.
                // If selector is null then the entire element is draggable and should be the target.

                if (!this.selector) {
                  _context.next = 5;
                  break;
                }

                target = event.target.closest(this.selector);

                if (!(!target || !_classPrivateFieldGet(this, _element).contains(target))) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                if (!this.handle) {
                  _context.next = 9;
                  break;
                }

                handle = event.target.closest(this.handle);

                if (!(!handle || !target.contains(handle))) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                if (!this.exclude) {
                  _context.next = 13;
                  break;
                }

                exclude = event.target.closest(this.exclude);

                if (!(exclude && target.contains(exclude))) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return");

              case 13:
                // Find the offset of the event.
                if (typeof this.offset === 'function') {
                  offset = this.offset(target, event);
                } else if (Array.isArray(this.offset)) {
                  offset = {
                    x: this.offset[0],
                    y: this.offset[1]
                  };
                } else if (_typeof(this.offset) === 'object') {
                  offset = {
                    x: this.offset.x,
                    y: this.offset.y
                  };
                } else {
                  offset = {
                    x: 0,
                    y: 0
                  };
                } // Prevent default browser actions.


                event.preventDefault(); // At this point we can be sure that a draggable item was
                // targeted by it's handle and no excluded items where clicked.
                // Creates a promise that both tracks the current mouse coords and resolve
                // when the user passes the given resistance.

                distanceBrokenPromise = new Promise(function (resolve) {
                  var isDistanceBroken = _this2.resistance <= 0;

                  if (isDistanceBroken) {
                    resolve('complete');
                  }

                  var onMouseMove = function onMouseMove(event) {
                    currentPosition.x = event.clientX + window.pageXOffset;
                    currentPosition.y = event.clientY + window.pageYOffset;
                    event.preventDefault();

                    if (!isDistanceBroken && Object(_utility__WEBPACK_IMPORTED_MODULE_1__["calcDistance"])(currentPosition.x, currentPosition.y, startPosition.x, startPosition.y) > _this2.resistance) {
                      resolve('complete');
                      isDistanceBroken = true;
                    }
                  }; // Cancel mouse tracking and resolve the promise to canceled if hasn't already been resolve.
                  // This function must be called or their will be a memory leak before onMouseDown completes.


                  cancelMouseTracking = function cancelMouseTracking() {
                    if (onMouseMove) {
                      document.removeEventListener('mousemove', onMouseMove);

                      if (!isDistanceBroken) {
                        resolve('canceled');
                      }

                      onMouseMove = null;
                    }
                  };

                  document.addEventListener('mousemove', onMouseMove);
                }); // Creates a promise that resolve when after the delay time passes or the user cancels the drag by
                // releasing the mouse button.

                timerPromise = new Promise(function (resolve) {
                  var timer = null;

                  if (_this2.delay >= 0) {
                    timer = setTimeout(function () {
                      resolve("complete");
                      timer = null;
                    }, _this2.delay);
                  } else {
                    resolve('complete');
                  } // cancel the timer and resolve it to canceled if it is still active.


                  cancelTimer = function cancelTimer() {
                    if (timer) {
                      clearTimeout(timer);
                      resolve('canceled');
                    }
                  };
                }); // cancel the timer and mouse tracking if they are still active.

                onMouseUp = function onMouseUp(event) {
                  event.preventDefault();
                  cancelTimer();
                  cancelMouseTracking();
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mouseup', onMouseUp); // Wait until the delay time and distance have passed or failed.

                _context.next = 21;
                return Promise.all([timerPromise, distanceBrokenPromise]);

              case 21:
                _ref2 = _context.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                timerStatus = _ref3[0];
                distanceStatus = _ref3[1];
                // Ensure that mouse tracking has been canceled.
                if (cancelMouseTracking) cancelMouseTracking(); // At this point both the timer and distance status should have passed or failed.
                // If either failed do nothing.

                if (timerStatus === 'complete' && distanceStatus === 'complete') {
                  this.startDragging(target, {
                    offsetX: offset.x,
                    offsetY: offset.y,
                    // Make relative to client.
                    startingX: currentPosition.x - window.pageXOffset,
                    startingY: currentPosition.y - window.pageYOffset
                  });
                }

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onMouseDown(_x) {
        return _onMouseDown.apply(this, arguments);
      }

      return onMouseDown;
    }()
  }, {
    key: "startDragging",
    value: function startDragging(element, pos) {
      var _this3 = this;

      if (_classPrivateFieldGet(this, _isDragging)) {
        return;
      }

      _classPrivateFieldSet(this, _isDragging, true);

      if (_classPrivateFieldGet(this, _revertFX)) {
        _classPrivateFieldGet(this, _revertFX).cancel();

        _classPrivateFieldSet(this, _revertFX, null);
      }

      console.log("Start Dragging");
      var target = element,
          container = this.container,
          scroller = null,
          dropTargets = [];

      if (typeof container === 'string') {
        container = document.querySelector(container);
      }

      if (this.helper) {
        if (typeof this.helper === 'function') {
          target = this.helper(element);
        } else {
          target = this.helper;
        }
      }

      if (target !== element && !target.parentElement && element.parentElement) {
        element.parentElement.appendChild(target);
      }

      var onMouseMove = function onMouseMove(event) {
        event.preventDefault();

        var rect = _moveElementToPosition(target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, _this3, target, element));

        if (_this3.scrollSpeed > 0) {
          if (scroller) {
            scroller.cancel();
            scroller = null;
          }

          scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, _this3, event, _this3.scrollSpeed, container);
        } // drag-enter


        var currentDropTargets = _this3.getDropTargets();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = currentDropTargets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dropTarget = _step.value;

            if (dropTargets.indexOf(dropTarget) === -1) {
              _dispatchDropEvent(_this3, dropTarget, 'drag.enter', {
                bubbles: true,
                details: {
                  clientX: event.clientX,
                  clientY: event.clientY,
                  target: target,
                  element: element,
                  originalEvent: event
                }
              });
            }
          } // drag-move

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

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = currentDropTargets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _dropTarget = _step2.value;

            _dispatchDropEvent(_this3, _dropTarget, 'drag.move', {
              bubbles: false,
              details: {
                clientX: event.clientX,
                clientY: event.clientY,
                target: target,
                element: element,
                originalEvent: event
              }
            });
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

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = dropTargets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _dropTarget2 = _step3.value;

            if (currentDropTargets.indexOf(_dropTarget2) === -1) {
              _dispatchDropEvent(_this3, _dropTarget2, 'drag.leave', {
                bubbles: false,
                details: {
                  clientX: event.clientX,
                  clientY: event.clientY,
                  target: target,
                  element: element,
                  originalEvent: event
                }
              });
            }
          } // drag-leave

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

        dropTargets = currentDropTargets;
      };

      var onMouseUp = function onMouseUp(event) {
        event.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (scroller) {
          scroller.cancel();
          scroller = null;
        }

        dropTargets = _this3.getDropTargets();
        var accepted = false;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = dropTargets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _dropTarget3 = _step4.value;

            _dispatchDropEvent(_this3, _dropTarget3, 'drag.dropping', {
              bubbles: true,
              details: {
                clientX: event.clientX,
                clientY: event.clientY,
                originalEvent: event,
                target: target,
                element: element,
                accept: function accept() {
                  accepted = true;
                }
              }
            });
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

        if (!accepted) {
          if (_this3.revert) {
            _revert(element, target, _this3.revertDuration);
          } else {
            if (target !== element) {
              target.parentElement.removeChild(target);
            }
          }
        } else {
          if (target !== element) {
            target.parentElement.removeChild(target);
          }

          _moveElementToPosition(element, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, _this3, target, element));

          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = dropTargets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var dropTarget = _step5.value;

              _dispatchDropEvent(_this3, dropTarget, 'drag.drop', {
                bubbles: true,
                details: {
                  clientX: event.clientX,
                  clientY: event.clientY,
                  originalEvent: event,
                  target: target,
                  element: element
                }
              });
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
        }
      }; // Set target to starting position.


      if (pos.startingX !== undefined && pos.startingY !== undefined) {
        var rect = _moveElementToPosition(target, pos.startingX, pos.startingY, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));

        dropTargets = this.getDropTargets(rect, {
          mouseX: pos.startingX,
          mouseY: pos.startingY
        });
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = dropTargets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var dropTarget = _step6.value;

            _dispatchDropEvent(this, dropTarget, 'drag.enter', {
              bubbles: true,
              details: {
                initial: true,
                clientX: pos.startingX,
                clientY: pos.startingY,
                target: target,
                element: element
              }
            });
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
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      _classPrivateFieldSet(this, _isDragging, false);
    }
  }, {
    key: "getDropTargets",
    value: function getDropTargets() {
      return [];
    }
  }, {
    key: "connect",
    value: function connect(droppable) {}
  }, {
    key: "disconnect",
    value: function disconnect(droppable) {}
  }, {
    key: "hasDroppable",
    value: function hasDroppable(droppable) {}
  }, {
    key: "droppables",
    get: function get() {
      return _classPrivateFieldGet(this, _droppables).slice(0);
    }
  }, {
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _element);
    }
  }]);

  return Draggable2;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _droppables = new WeakMap();

var _boundOnMouseDown = new WeakMap();

var _revertFX = new WeakMap();

var _isDragging = new WeakMap();



function _dispatchDropEvent(self, target, name, options) {}

function _revert(element, target, revertDuration) {}
/**
 * Takes a client (x, y) position and some offset coords and move the element to the given position.
 *
 * @param element
 * @param x
 * @param y
 * @param offsetX
 * @param offsetY
 * @param container
 * @private
 * @returns {*|Rect}
 */


function _moveElementToPosition(element, x, y, offsetX, offsetY, container) {
  var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
  rect = rect.moveTo({
    left: x,
    top: y
  });
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  rect = rect.translate(-offsetX, -offsetY);

  if (container) {
    container = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](container);
    rect = rect.fit(container);
  }

  Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(element, rect, 'translate3d');
  return rect;
} // noinspection JSCommentMatchesSignature

/**
 * For module use only.  Selects the element either by css selector, if it's a string, or resolve a function.
 * If the element is already element is is returned direction.  Returns null if not element is provided.
 *
 * @param element
 * @param dragInstance
 * @param target
 * @returns {null|*}
 * @private
 */


function _selectElementRect(element, dragInstance, target, originalTarget) {
  if (element) {
    var type = _typeof(element);

    if (type === 'function') {
      return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element.call(dragInstance, target, originalTarget, dragInstance));
    } else if (type === 'string') {
      return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](document.querySelector(element));
    }

    return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
  }

  return null;
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
 * Helper class that is used to control scrolling when the element is dragged outside of bounds.
 */


var ScrollHelper =
/*#__PURE__*/
function () {
  function ScrollHelper(element) {
    var _this4 = this;

    var scrollXSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scrollYSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var onFrame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, ScrollHelper);

    this.frameID = null;
    this.element = element;
    this.scrollXSpeed = scrollXSpeed;
    this.scrollYSpeed = scrollYSpeed;
    this.onFrame = onFrame;
    this.timestamp = performance.now();

    var frame = function frame(timestamp) {
      var delta = (timestamp - _this4.timestamp) / 1000; // todo remove debug
      // console.log({
      //     delta,
      //     scrollXSpeed: this.scrollXSpeed,
      //     scrollYSpeed: this.scrollYSpeed,
      //     timestamp,
      //     lastTimestamp: this.timestamp
      // });

      _this4.timestamp = timestamp;
      _this4.element.scrollLeft += delta * _this4.scrollXSpeed;
      _this4.element.scrollTop += delta * _this4.scrollYSpeed;

      if (_this4.onFrame) {
        _this4.onFrame(_this4);
      }

      _this4.frameID = window.requestAnimationFrame(frame);
    };

    this.frameID = window.requestAnimationFrame(frame);
  }

  _createClass(ScrollHelper, [{
    key: "cancel",
    value: function cancel() {
      if (this.frameID) {
        window.cancelAnimationFrame(this.frameID);
        this.frameID = null;
      }
    }
  }], [{
    key: "getScrollSpeed",
    value: function getScrollSpeed(rect, scrollParentRect) {
      var r = {
        x: 0,
        y: 0
      };

      if (rect.right > scrollParentRect.right) {
        r.x = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.right - scrollParentRect.right) / rect.width, -1, 1);
      } else if (rect.left < scrollParentRect.left) {
        r.x = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.left - scrollParentRect.left) / rect.width, -1, 1);
      }

      if (rect.bottom > scrollParentRect.bottom) {
        r.y = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.bottom - scrollParentRect.bottom) / rect.width, -1, 1);
      } else if (rect.top < scrollParentRect.top) {
        r.y = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])((rect.top - scrollParentRect.top) / rect.width, -1, 1);
      }

      return r;
    }
  }, {
    key: "buildScrollHelper",
    value: function buildScrollHelper(element, target, rect, pos, dragInstance, event, scrollSpeed, container) {
      var scrollParent = _getScrollParent(element);

      if (scrollParent) {
        var scrollParentRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](scrollParent),
            speed = ScrollHelper.getScrollSpeed(rect, scrollParentRect);

        if (speed.x || speed.y) {
          return new ScrollHelper(scrollParent, speed.x * scrollSpeed, speed.y * scrollSpeed, function (scroller) {
            var rect = _moveElementToPosition(target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, dragInstance, target, element));

            var scrollRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](scroller.element);
            Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, rect, 'translate3d');

            if (scrollRect.contains(rect)) {
              scroller.cancel();
              scroller = null;
            }
          });
        }
      }
    }
  }]);

  return ScrollHelper;
}();

function ScrollArea(selector) {
  return function () {
    var element = selector;

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element),
        scroll = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["getScroll"])(element);
    rect.left -= scroll.scrollLeft;
    rect.top -= scroll.scrollTop;
    rect.right = rect.left + element.scrollWidth;
    rect.bottom = rect.top + element.scrollHeight;
    return rect;
  };
}
function clone() {
  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var zIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (_typeof(opacity) === 'object' && opacity.nodeType) {
    return opacity.cloneNode(true);
  }

  return function (element) {
    var r = element.cloneNode(true);

    if (opacity !== null) {
      r.style.opacity = opacity;
    }

    if (className) {
      r.className = className;
    }

    r.style.position = "absolute";
    if (zIndex !== null) r.style.zIndex = zIndex;
    return r;
  };
}

/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map