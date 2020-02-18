(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[1],{

/***/ "./src/core/ui/Draggable.js":
/*!**********************************!*\
  !*** ./src/core/ui/Draggable.js ***!
  \**********************************/
/*! exports provided: cursor, default, ScrollArea, clone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollArea", function() { return ScrollArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
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







var reg_percentage_test = /\s*\d+\.?\d*%\s*/;
/**
 * Returns the offset position of the mouse relative to the target.
 *
 * @param target
 * @param event
 * @returns {{x: number, y: number}}
 */

function cursor(target, event) {
  var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function buildTestIntersectionFunction(amount) {
  return function (element, rect) {
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](rect);
    var targetRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element),
        intersection = targetRect.intersection(rect),
        p = intersection ? intersection.getArea() / rect.getArea() : 0;

    if (amount === 0) {
      return p > 0;
    } else {
      return p >= amount;
    }
  };
}

var Draggable =
/*#__PURE__*/
function (_Publisher) {
  _inherits(Draggable, _Publisher);

  function Draggable(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? null : _ref$container,
        _ref$axis = _ref.axis,
        axis = _ref$axis === void 0 ? 'xy' : _ref$axis,
        _ref$exclude = _ref.exclude,
        exclude = _ref$exclude === void 0 ? 'input, button, .ui-resizeable-handle, .no-drag' : _ref$exclude,
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
        revertDuration = _ref$revertDuration === void 0 ? 0 : _ref$revertDuration,
        _ref$scrollSpeed = _ref.scrollSpeed,
        scrollSpeed = _ref$scrollSpeed === void 0 ? 0 : _ref$scrollSpeed,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? null : _ref$selector,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 0.5 : _ref$tolerance,
        _ref$setHelperSize = _ref.setHelperSize,
        setHelperSize = _ref$setHelperSize === void 0 ? false : _ref$setHelperSize,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Draggable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Draggable).call(this));

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

    _itemCache.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    if (typeof element === 'string') {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, document.querySelector(element));
    } else {
      _classPrivateFieldSet(_assertThisInitialized(_this), _element, element);
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _droppables, []);

    _classPrivateFieldSet(_assertThisInitialized(_this), _itemCache, new WeakMap());

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


  _createClass(Draggable, [{
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
                    startingX: currentPosition.x,
                    startingY: currentPosition.y
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
    value: function () {
      var _startDragging = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(element, pos) {
        var _this3 = this;

        var cache, mousePosition, target, container, scroller, dropTargets, startPosition, startingClientRect, refreshDropTargets, onMouseMove, onMouseUp, rect;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cache = _classPrivateFieldGet(this, _itemCache).get(element), mousePosition = {
                  x: pos.startingX,
                  y: pos.startingY
                };

                if (!cache) {
                  cache = {
                    isDragging: false,
                    fx: null,
                    rect: null,
                    helper: null,
                    element: element
                  };

                  _classPrivateFieldGet(this, _itemCache).set(element, cache);
                }

                if (!cache.isDragging) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                cache.isDragging = true;

                if (!cache.fx) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 8;
                return cache.fx.cancel();

              case 8:
                cache.fx = null;

              case 9:
                target = element, container = this.container, scroller = null, dropTargets = [], startPosition = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element), startingClientRect = startPosition;
                startPosition = startPosition.translate(window.pageXOffset, window.pageYOffset);

                if (!cache.rect) {
                  cache.rect = startPosition;
                }

                if (typeof container === 'string') {
                  container = document.querySelector(container);
                }

                if (this.helper) {
                  if (typeof this.helper === 'function') {
                    target = this.helper(element);
                  } else {
                    target = this.helper;
                  }

                  if (this.setHelperSize) {
                    target.style.width = startPosition.width + "px";
                    target.style.height = startPosition.height + "px";
                  }

                  target.style.pointerEvents = 'none';

                  if (!target.parentElement && element.parentElement) {
                    element.parentElement.appendChild(target);
                  }

                  target.classList.add('ui-drag-helper');
                  cache.helper = target;
                }

                refreshDropTargets = function refreshDropTargets(rect) {
                  // drag-enter
                  var mouseX = mousePosition.x - window.pageXOffset,
                      mouseY = mousePosition.y - window.pageYOffset,
                      currentDropTargets,
                      detail = {
                    clientX: mouseX,
                    clientY: mouseY
                  };

                  if (rect !== null) {
                    currentDropTargets = _this3.getDropTargets(rect, {
                      mouseX: mouseX,
                      mouseY: mouseY
                    });
                  } else {
                    currentDropTargets = [];
                  }

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = currentDropTargets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var dropTarget = _step.value;

                      if (dropTargets.indexOf(dropTarget) === -1) {
                        dispatchDropEvent(_this3, 'drag.enter', element, target, null, rect, true, true, false, detail, dropTarget);
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

                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = dropTargets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _dropTarget = _step2.value;

                      if (currentDropTargets.indexOf(_dropTarget) === -1) {
                        dispatchDropEvent(_this3, 'drag.leave', element, target, null, rect, true, true, false, detail, _dropTarget);
                      }
                    } // drag-leave

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

                  dropTargets = currentDropTargets;
                };

                onMouseMove = function onMouseMove(event) {
                  event.preventDefault();

                  var rect = _moveElementToPosition(_this3, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, _this3, target, element));

                  mousePosition.x = event.clientX + window.pageXOffset;
                  mousePosition.y = event.clientY + window.pageYOffset;

                  if (_this3.scrollSpeed > 0) {
                    if (scroller) {
                      scroller.cancel();
                      scroller = null;
                    }

                    scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, _this3, event, _this3.scrollSpeed, container);
                  }

                  refreshDropTargets(rect);
                  publishDragMoveEvent(_this3, element, target, event, rect);
                };

                onMouseUp =
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(event) {
                    var accepted, _isDefaultPrevented, reverted, rect, _pos;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            event.preventDefault();
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                            cache.isDragging = false;
                            element.classList.remove('ui-dragging');

                            if (scroller) {
                              scroller.cancel();
                              scroller = null;
                            }

                            accepted = false, _isDefaultPrevented = false, reverted = false, rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
                            publishDragDropEvent(_this3, element, target, event, rect, false, {
                              isDefaultPrevented: function isDefaultPrevented() {
                                return _isDefaultPrevented;
                              },
                              isAccepted: function isAccepted() {
                                return accepted;
                              },
                              accept: function accept() {
                                accepted = true;
                              },
                              preventDefault: function preventDefault() {
                                _isDefaultPrevented = true;
                              }
                            });

                            if (!(_this3.revert && !accepted)) {
                              _context2.next = 22;
                              break;
                            }

                            refreshDropTargets(cache.rect);
                            rect = cache.rect;

                            if (_this3.revertDuration) {
                              _context2.next = 15;
                              break;
                            }

                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            } else {
                              _pos = startPosition.translate(-window.pageXOffset, -window.pageYOffset);
                              Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, _pos, 'translate3d');
                            }

                            _context2.next = 19;
                            break;

                          case 15:
                            cache.fx = _revert(target, cache.rect, _this3.revertDuration);
                            _context2.next = 18;
                            return cache.fx;

                          case 18:
                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            }

                          case 19:
                            reverted = true;
                            _context2.next = 23;
                            break;

                          case 22:
                            if (target !== element) {
                              target.parentElement.removeChild(target);
                              Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(element, rect, 'translate3d');
                            }

                          case 23:
                            _classPrivateFieldGet(_this3, _itemCache)["delete"](element);

                            dispatchDropEvent(_this3, 'drag.end', element, target, event, rect, true, true, true, {
                              accepted: accepted,
                              reverted: reverted
                            }, element);

                          case 25:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function onMouseUp(_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }(); // Set target to starting position.


                if (mousePosition.x !== undefined && mousePosition.y !== undefined) {
                  rect = _moveElementToPosition(this, target, mousePosition.x - window.pageXOffset, mousePosition.y - window.pageYOffset, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
                  refreshDropTargets(rect);
                }

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                element.classList.add('ui-dragging');
                dispatchDropEvent(this, 'drag.start', element, target, null, startingClientRect, true, true, true, null);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function startDragging(_x2, _x3) {
        return _startDragging.apply(this, arguments);
      }

      return startDragging;
    }()
  }, {
    key: "getDropTargets",
    value: function getDropTargets(rect, mousePos) {
      var r = [];
      /**
       * @type {number|String|Function|string}
       */

      var testFunction = this.tolerance,
          type = _typeof(testFunction);

      if (type === 'string') {
        // noinspection JSCheckFunctionSignatures
        if (reg_percentage_test.test(testFunction)) {
          // noinspection JSCheckFunctionSignatures
          testFunction = buildTestIntersectionFunction(parseFloat(testFunction) / 100);
        }
      } else if (type === 'number') {
        testFunction = buildTestIntersectionFunction(testFunction);
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _classPrivateFieldGet(this, _droppables)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var droppable = _step3.value;

          if (testFunction(droppable, rect, mousePos, this)) {
            r.push(droppable);
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

      return r;
    }
  }, {
    key: "connect",
    value: function connect(droppables) {
      if (typeof droppables === 'string') {
        droppables = document.querySelectorAll(droppables);
      } else if (typeof droppables.length !== 'number') {
        droppables = [droppables];
      }

      for (var i = 0; i < droppables.length; i++) {
        var item = droppables[i];

        if (_classPrivateFieldGet(this, _droppables).indexOf(item) === -1) {
          _classPrivateFieldGet(this, _droppables).push(item);
        }
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "disconnect",
    value: function disconnect(droppable) {
      if (typeof droppable === 'string') {
        droppable = document.querySelector(droppable);
      }

      var i = _classPrivateFieldGet(this, _droppables).indexOf(droppable);

      if (i !== -1) {
        _classPrivateFieldGet(this, _droppables).splice(i, 1);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "hasDroppable",
    value: function hasDroppable(droppable) {
      if (typeof droppable === 'string') {
        droppable = document.querySelector(droppable);
      }

      return _classPrivateFieldGet(this, _droppables).indexOf(droppable) !== -1;
    } // noinspection JSUnusedGlobalSymbols

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

  return Draggable;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _droppables = new WeakMap();

var _boundOnMouseDown = new WeakMap();

var _itemCache = new WeakMap();



function _revert(target, position, revertDuration) {
  var onFrame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var starting = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](target);
  var animation = new _fx_Animation__WEBPACK_IMPORTED_MODULE_4__["default"]({
    frames: {
      '0%': {
        left: starting.left + window.pageXOffset,
        top: starting.top + window.pageYOffset
      },
      '100%': {
        left: position.left,
        top: position.top
      }
    },
    applyFrame: function applyFrame(fx, frame) {
      Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(fx.element, {
        left: frame.left - window.pageXOffset,
        top: frame.top - window.pageYOffset
      }, 'translate3d');
      if (onFrame) onFrame(fx);
    }
  });
  return animation.animate(target, {
    duration: revertDuration
  });
}
/**
 * Takes a client (x, y) position and some offset coords and move the element to the given position.
 *
 * @param self
 * @param element
 * @param x
 * @param y
 * @param offsetX
 * @param offsetY
 * @param container
 * @private
 * @returns {*|Rect}
 */


function _moveElementToPosition(self, element, x, y, offsetX, offsetY, container) {
  var rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element),
      startingRect = rect;
  rect = rect.moveTo({
    left: x,
    top: y
  });
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  rect = rect.translate(-offsetX, -offsetY);

  if (self.axis === 'y') {
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](startingRect.left, rect.top, startingRect.right, rect.bottom);
  } else if (self.axis === 'x') {
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](rect.left, startingRect.top, rect.right, startingRect.bottom);
  }

  if (typeof self.grid === 'number' && self.grid) {
    var left = Math.floor(rect.left / self.grid) * self.grid,
        top = Math.floor(rect.top / self.grid) * self.grid;
    rect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](left, top, left + startingRect.width, top + startingRect.height);
  }

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

function _getScrollRect(element) {
  if (element === window || element.nodeName === "HTML") {
    return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0, window.innerWidth, window.innerHeight);
  } else {
    return new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
  }
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
      var delta = (timestamp - _this4.timestamp) / 1000;
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
      var _this5 = this;

      var scrollParent = _getScrollParent(element);

      if (scrollParent) {
        var scrollParentRect = _getScrollRect(scrollParent),
            speed = ScrollHelper.getScrollSpeed(rect, scrollParentRect);

        if (speed.x || speed.y) {
          return new ScrollHelper(scrollParent, speed.x * scrollSpeed, speed.y * scrollSpeed, function (scroller) {
            var rect = _moveElementToPosition(_this5, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, dragInstance, target, element));

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

function publishDragMoveEvent(self, element, helper, event, rect) {
  var bubbles = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  return dispatchDropEvent(self, 'drag.move', element, helper, event, rect, bubbles, true, true, options);
}

function publishDragDropEvent(self, element, helper, event, rect) {
  var bubbles = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  return dispatchDropEvent(self, 'drag.drop', element, helper, event, rect, bubbles, true, true, options);
}

function dispatchDropEvent(self, name, element, helper, originalEvent, currentRect) {
  var bubbles = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var dispatch = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
  var publish = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var detail = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
  var target = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
  var eventPackage = {
    name: name,
    draggable: self,
    target: helper,
    element: element,
    item: element,
    // alias for element
    helper: helper,
    originalEvent: null,
    rect: currentRect
  };

  if (originalEvent) {
    eventPackage.originalEvent = originalEvent;
    eventPackage.clientX = originalEvent.clientX;
    eventPackage.clientY = originalEvent.clientY;
  }

  if (!target) {
    target = element;
  }

  if (detail) {
    Object.assign(eventPackage, detail);
  }

  if (publish) {
    self.publish(name, eventPackage);
  }

  if (dispatch) {
    var customEvent = new CustomEvent(name, {
      bubbles: bubbles,
      detail: eventPackage
    });
    target.dispatchEvent(customEvent);
  }
}

/***/ })

}]);
//# sourceMappingURL=chunk-1.bundle.js.map