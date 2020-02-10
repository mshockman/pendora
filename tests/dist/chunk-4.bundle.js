(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[4],{

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



/***/ })

}]);
//# sourceMappingURL=chunk-4.bundle.js.map