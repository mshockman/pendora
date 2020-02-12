(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[12],{

/***/ "./src/core/ui/Tooltip.js":
/*!********************************!*\
  !*** ./src/core/ui/Tooltip.js ***!
  \********************************/
/*! exports provided: SlideInToolTip, SlideOutToolTip, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideInToolTip", function() { return SlideInToolTip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideOutToolTip", function() { return SlideOutToolTip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tooltip; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
/* harmony import */ var _fx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fx/effects */ "./src/core/fx/effects.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Overlay */ "./src/core/ui/Overlay.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var tooltipSymbol = Symbol('tooltip');

function getTooltipAnimationAxis(element) {
  var placement = element.dataset.placement;

  if (placement === 'top' || placement === 'bottom') {
    return 'y';
  } else {
    return 'x';
  }
} // /**
//  * A specific slide in and out animation controller for tooltips.  The axis is determined by the placement of the
//  * tooltip.
//  */
// export class SlideInAndOutTooltip extends SlideInAndOut {
//     constructor(duration) {
//         super(duration, getTooltipAnimationAxis);
//     }
// }


var SlideInToolTip =
/*#__PURE__*/
function (_SlideIn) {
  _inherits(SlideInToolTip, _SlideIn);

  function SlideInToolTip(duration) {
    _classCallCheck(this, SlideInToolTip);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlideInToolTip).call(this, duration, getTooltipAnimationAxis));
  }

  return SlideInToolTip;
}(_fx_effects__WEBPACK_IMPORTED_MODULE_3__["SlideIn"]);
var SlideOutToolTip =
/*#__PURE__*/
function (_SlideOut) {
  _inherits(SlideOutToolTip, _SlideOut);

  function SlideOutToolTip(duration) {
    _classCallCheck(this, SlideOutToolTip);

    return _possibleConstructorReturn(this, _getPrototypeOf(SlideOutToolTip).call(this, duration, getTooltipAnimationAxis));
  }

  return SlideOutToolTip;
}(_fx_effects__WEBPACK_IMPORTED_MODULE_3__["SlideOut"]);
/**
 * Common animation that can be used by tooltip.  Can be accessed by passing their key to the animation property.
 */

var ANIMATIONS = {
  slideIn: SlideInToolTip,
  slideOut: SlideOutToolTip,
  fadeIn: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["FadeIn"],
  fadeOut: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["FadeOut"]
};
/**
 * A map of placement configuration objects that can be referenced by their name.
 *
 * @type {{top: {collision: string, at: string, method: string, name: string, opposite: string, my: string}, left: {collision: string, at: string, method: string, name: string, opposite: string, my: string}, bottom: {collision: string, at: string, method: string, name: string, opposite: string, my: string}, right: {collision: string, at: string, method: string, name: string, opposite: string, my: string}}}
 */

var PLACEMENTS = {
  top: {
    my: "bottom",
    at: "top",
    collision: "flip",
    name: "top",
    opposite: "bottom",
    method: "top-left"
  },
  right: {
    my: 'left',
    at: 'right',
    collision: "flip",
    name: "right",
    opposite: "left",
    method: "top-left"
  },
  bottom: {
    my: "top",
    at: "bottom",
    collision: "flip",
    name: "bottom",
    opposite: "top",
    method: "top-left"
  },
  left: {
    my: "right",
    at: "left",
    collision: "flip",
    name: "left",
    opposite: "right",
    method: "top-left"
  }
};
/**
 * Creates a tooltip that either targets an object or the mouse cursor.
 */

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(text, placement) {
    var _this;

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? null : _ref$timeout,
        _ref$showFX = _ref.showFX,
        showFX = _ref$showFX === void 0 ? null : _ref$showFX,
        _ref$showDuration = _ref.showDuration,
        showDuration = _ref$showDuration === void 0 ? null : _ref$showDuration,
        _ref$hideFX = _ref.hideFX,
        hideFX = _ref$hideFX === void 0 ? null : _ref$hideFX,
        _ref$hideDuration = _ref.hideDuration,
        hideDuration = _ref$hideDuration === void 0 ? null : _ref$hideDuration,
        _ref$classes = _ref.classes,
        classes = _ref$classes === void 0 ? null : _ref$classes,
        _ref$id = _ref.id,
        id = _ref$id === void 0 ? null : _ref$id,
        _ref$removeOnHide = _ref.removeOnHide,
        removeOnHide = _ref$removeOnHide === void 0 ? true : _ref$removeOnHide;

    _classCallCheck(this, Tooltip);

    var element = document.createElement('div'),
        body = document.createElement('div'),
        label = document.createElement('div'),
        arrow = document.createElement('div');
    element.appendChild(body);
    body.appendChild(label);
    body.appendChild(arrow);
    label.innerHTML = text;
    element.className = "tooltip";
    body.className = "tooltip__body";
    label.className = "tooltip__label";
    arrow.className = "arrow";

    if (classes) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_4__["addClasses"])(element, classes);
    }

    if (id !== null) {
      element.id = id;
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).call(this, element));

    _label.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _target.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _destroy.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _overlay.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    if (typeof showFX === 'string') {
      showFX = ANIMATIONS[showFX];
    }

    if (typeof hideFX === 'string') {
      hideFX = ANIMATIONS[hideFX];
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _overlay, new _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"](_this.element, {
      removeOnHide: removeOnHide,
      showFX: showFX,
      hideFX: hideFX,
      showDuration: showDuration,
      hideDuration: hideDuration,
      timeout: timeout
    }));

    if (typeof placement === 'string') {
      placement = PLACEMENTS[placement];
    }

    if (placement) {
      _classPrivateFieldGet(_assertThisInitialized(_this), _overlay).setPlacement(placement.name, placement);
    }

    _classPrivateFieldGet(_assertThisInitialized(_this), _overlay).hide(true);

    return _this;
  }
  /**
   * Completely destroys the tooltip.  Cleaning up any registered events, timers and removing the tooltip from the dom.
   */


  _createClass(Tooltip, [{
    key: "destroy",
    value: function () {
      var _destroy2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _classPrivateFieldGet(this, _overlay).clearTimeOut();

                _context.next = 3;
                return _classPrivateFieldGet(this, _overlay).clearFX();

              case 3:
                if (_classPrivateFieldGet(this, _destroy)) {
                  _classPrivateFieldGet(this, _destroy).call(this);

                  _classPrivateFieldSet(this, _destroy, null);
                }

                if (this.element.parentElement) {
                  this.element.parentElement.removeChild(this.element);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function destroy() {
        return _destroy2.apply(this, arguments);
      }

      return destroy;
    }()
    /**
     * Initializes the tooltip on the target.
     *
     * The tooltip can either be of type toggle or hover.  If toggle the tooltip will display/hide when the user clicks
     * the target.  If hover the tooltip will display when the user hover over the target.
     *
     * If lockToMouse is true the tooltip's position will be locked to the mouses coordanents.
     * @param target
     * @param type
     * @param lockToMouse
     */

  }, {
    key: "init",
    value: function init(target, type) {
      var _this2 = this;

      var lockToMouse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // noinspection JSUnusedLocalSymbols
      var positionTarget = function positionTarget(event) {
        return target;
      },
          mouseX = 0,
          mouseY = 0;

      if (_classPrivateFieldGet(this, _destroy)) {
        _classPrivateFieldGet(this, _destroy).call(this);

        _classPrivateFieldSet(this, _destroy, null);
      }

      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      if (type === 'hover') {
        var onMouseOver = function onMouseOver(event) {
          mouseX = event.clientX;
          mouseY = event.clientY;

          if ((_this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].hiding || _this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].hidden) && !target.contains(event.relatedTarget)) {
            _this2.show(positionTarget);
          }
        };

        var onMouseOut = function onMouseOut(event) {
          mouseX = event.clientX;
          mouseY = event.clientY;

          if (!target.contains(event.relatedTarget) && (_this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].visible || _this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].showing)) {
            _this2.hide();
          }
        };

        var onMouseMove;
        target.addEventListener('mouseover', onMouseOver);
        target.addEventListener('mouseout', onMouseOut);

        if (lockToMouse) {
          onMouseMove = function onMouseMove(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (_this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].visible || _this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].showing) {
              _classPrivateFieldGet(_this2, _overlay).position("current");
            }
          };

          positionTarget = function positionTarget() {
            return new _position__WEBPACK_IMPORTED_MODULE_1__["Rect"](mouseX, mouseY, mouseX, mouseY);
          };
        }

        if (onMouseMove) {
          target.addEventListener('mousemove', onMouseMove);
        }

        _classPrivateFieldSet(this, _destroy, function () {
          if (onMouseMove) {
            _this2.element.removeEventListener('mousemove', onMouseMove);
          }

          target.removeEventListener('mouseout', onMouseOut);
          target.removeEventListener('mouseover', onMouseOver);
        });
      } else if (type === 'toggle') {
        var _onMouseMove,
            onClick,
            onMouseMoveTarget,
            isMouseMoveBound = false;

        if (lockToMouse) {
          positionTarget = function positionTarget() {
            return new _position__WEBPACK_IMPORTED_MODULE_1__["Rect"](mouseX, mouseY, mouseX, mouseY);
          };

          _onMouseMove = function _onMouseMove(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (_this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].visible || _this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].showing) {
              _classPrivateFieldGet(_this2, _overlay).position("current");
            }
          };

          onMouseMoveTarget = document;
        }

        onClick =
        /*#__PURE__*/
        function () {
          var _ref2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(event) {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    mouseX = event.clientX;
                    mouseY = event.clientY;

                    if (!(_this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].showing || _this2.state === _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].visible)) {
                      _context2.next = 9;
                      break;
                    }

                    _context2.next = 5;
                    return _this2.hide();

                  case 5:
                    result = _context2.sent;

                    if (_onMouseMove && isMouseMoveBound && result === _fx_Animation__WEBPACK_IMPORTED_MODULE_2__["default"].complete) {
                      onMouseMoveTarget.removeEventListener('mousemove', _onMouseMove);
                      isMouseMoveBound = false;
                    }

                    _context2.next = 11;
                    break;

                  case 9:
                    _this2.show(positionTarget);

                    if (_onMouseMove && !isMouseMoveBound) {
                      onMouseMoveTarget.addEventListener('mousemove', _onMouseMove);
                      isMouseMoveBound = true;
                    }

                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function onClick(_x) {
            return _ref2.apply(this, arguments);
          };
        }();

        target.addEventListener('click', onClick);

        _classPrivateFieldSet(this, _destroy, function () {
          if (isMouseMoveBound) {
            onMouseMoveTarget.removeEventListener('mousemove', _onMouseMove);
            isMouseMoveBound = false;
          }

          target.removeEventListener('click', onClick);
        });
      }
    } // noinspection JSUnusedGlobalSymbols

    /**
     * The the tooltips text.
     * @param text
     */

  }, {
    key: "setText",
    value: function setText(text) {
      _classPrivateFieldGet(this, _label).innerHTML = text;
    }
    /**
     * Function that sets the position of the tooltip using the provided placement.
     * @param rect - The rectangle to position by.
     * @param placement - Configuration objects that contains placement options.
     * @param target - The element to position relative to.
     * @param containerRect - The container rectangle.
     * @returns {*}
     */

  }, {
    key: "position",
    value: function position(rect, placement, target, containerRect) {
      var pos, targetRect, collision, element;

      if (typeof target === 'function') {
        targetRect = _position__WEBPACK_IMPORTED_MODULE_1__["Rect"].getBoundingClientRect(target());
      } else {
        targetRect = new _position__WEBPACK_IMPORTED_MODULE_1__["Rect"](target);
      }

      placement = PLACEMENTS[placement];
      collision = placement.collision;
      this.element.dataset.placement = placement.name;

      if (rect === "full") {
        rect = _position__WEBPACK_IMPORTED_MODULE_1__["Rect"].getCleanBoundingClientRect(this.element);
      } else if (!rect || rect === "current") {
        rect = new _position__WEBPACK_IMPORTED_MODULE_1__["Rect"](this.element);
      }

      element = this.element;
      pos = rect.position({
        my: placement.my,
        at: placement.at,
        of: targetRect
      }); // Check if position is inside container.

      if (!containerRect || containerRect.contains(pos)) {
        Object(_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(element, pos, placement.method);
        return pos;
      } // Try flipping it.


      if (collision === "flip" || collision === "flipfit") {
        placement = PLACEMENTS[placement.opposite];
        element.dataset.placement = placement.name;
        rect = this.getBoundingClientRect();
        pos = rect.position({
          my: placement.my,
          at: placement.at,
          of: targetRect
        });

        if (containerRect.contains(pos)) {
          Object(_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(element, pos, placement.method);
          return pos;
        }
      } // Try fitting it.


      if (collision === "fit" || collision === "flipfit") {
        pos = pos.fit(containerRect);
      }

      Object(_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(element, pos, placement.method);
      return pos;
    }
    /**
     * Shows the tooltip.
     * @param target
     * @param immediate
     * @returns {Promise<string>}
     */

  }, {
    key: "show",
    value: function () {
      var _show = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(target) {
        var immediate,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                immediate = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                _classPrivateFieldGet(this, _overlay).target = target;
                _classPrivateFieldGet(this, _overlay).container = _position__WEBPACK_IMPORTED_MODULE_1__["Rect"].getClientRect();

                if (!this.element.parentElement) {
                  document.body.appendChild(this.element);
                }

                return _context3.abrupt("return", _classPrivateFieldGet(this, _overlay).show(immediate));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function show(_x2) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
    /**
     * Hides the tooltip.
     * @param immediate
     * @returns {Promise<string>}
     */

  }, {
    key: "hide",
    value: function () {
      var _hide = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var immediate,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                immediate = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : false;
                return _context4.abrupt("return", _classPrivateFieldGet(this, _overlay).hide(immediate));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function hide() {
        return _hide.apply(this, arguments);
      }

      return hide;
    }()
    /**
     * @returns {String}
     */

  }, {
    key: "state",
    get: function get() {
      return _classPrivateFieldGet(this, _overlay).state;
    }
  }, {
    key: "isVisible",
    get: function get() {
      return this.state !== _Overlay__WEBPACK_IMPORTED_MODULE_5__["default"].hidden;
    }
    /**
     * Creates a tooltip for the target. A target can only have one tooltip created by this method.
     *
     * @param target
     * @param text
     * @param type
     * @param showFX
     * @param showDuration
     * @param hideFX
     * @param hideDuration
     * @param placement
     * @param timeout
     * @param classes
     * @param id
     * @param refreshPositionOnMouseMove
     * @returns {Tooltip}
     */

  }], [{
    key: "tooltip",
    value: function tooltip(target, text) {
      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$type = _ref3.type,
          type = _ref3$type === void 0 ? "hover" : _ref3$type,
          _ref3$showFX = _ref3.showFX,
          showFX = _ref3$showFX === void 0 ? null : _ref3$showFX,
          _ref3$showDuration = _ref3.showDuration,
          showDuration = _ref3$showDuration === void 0 ? null : _ref3$showDuration,
          _ref3$hideFX = _ref3.hideFX,
          hideFX = _ref3$hideFX === void 0 ? null : _ref3$hideFX,
          _ref3$hideDuration = _ref3.hideDuration,
          hideDuration = _ref3$hideDuration === void 0 ? null : _ref3$hideDuration,
          _ref3$placement = _ref3.placement,
          placement = _ref3$placement === void 0 ? "top" : _ref3$placement,
          _ref3$timeout = _ref3.timeout,
          timeout = _ref3$timeout === void 0 ? null : _ref3$timeout,
          _ref3$classes = _ref3.classes,
          classes = _ref3$classes === void 0 ? null : _ref3$classes,
          _ref3$id = _ref3.id,
          id = _ref3$id === void 0 ? null : _ref3$id,
          _ref3$refreshPosition = _ref3.refreshPositionOnMouseMove,
          refreshPositionOnMouseMove = _ref3$refreshPosition === void 0 ? false : _ref3$refreshPosition;

      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      this.removeToolTip(target);
      var tooltip = new Tooltip(text, placement || 'top', {
        timeout: timeout,
        showFX: showFX,
        showDuration: showDuration,
        hideFX: hideFX,
        hideDuration: hideDuration
      });

      if (classes) {
        tooltip.addClass(classes);
      }

      if (id) {
        tooltip.id = id;
      }

      tooltip.init(target, type, refreshPositionOnMouseMove);
      return tooltip;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the bound tooltip for the target element create by calling the Tooltip.tooltip function.
     * @param target
     * @returns {*|null}
     */

  }, {
    key: "getToolTip",
    value: function getToolTip(target) {
      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      return target[tooltipSymbol] || null;
    }
    /**
     * Removes any tooltip created by the Tooltip.tooltip function from the target.
     * @param target
     * @returns {null|any}
     */

  }, {
    key: "removeToolTip",
    value: function removeToolTip(target) {
      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      var tooltip = target[tooltipSymbol];

      if (tooltip) {
        tooltip.destroy();
        delete target[tooltipSymbol];
        return tooltip;
      }

      return null;
    }
  }]);

  return Tooltip;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _label = new WeakMap();

var _target = new WeakMap();

var _destroy = new WeakMap();

var _overlay = new WeakMap();



/***/ }),

/***/ "./tests/src/test_tooltip.js":
/*!***********************************!*\
  !*** ./tests/src/test_tooltip.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToolTipTestPage; });
/* harmony import */ var _src_core_ui_Tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/core/ui/Tooltip */ "./src/core/ui/Tooltip.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ToolTipTestPage =
/*#__PURE__*/
function () {
  function ToolTipTestPage() {
    _classCallCheck(this, ToolTipTestPage);
  }

  _createClass(ToolTipTestPage, [{
    key: "load",
    value: function load() {
      this.initDebug();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = document.querySelectorAll("[data-tooltip]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          _src_core_ui_Tooltip__WEBPACK_IMPORTED_MODULE_0__["default"].tooltip(node, node.dataset.tooltip, {
            placement: node.dataset.placement,
            showFX: "slideIn",
            hideFX: "slideOut",
            showDuration: 2000,
            hideDuration: 200,
            type: 'hover',
            refreshPositionOnMouseMove: true
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
  }, {
    key: "initDebug",
    value: function initDebug() {
      var debug = document.querySelector('#debug_output');
      document.addEventListener('mousemove', function (event) {
        debug.innerHTML = "(".concat(event.clientX, ", ").concat(event.clientY, ")");
      });
    }
  }]);

  return ToolTipTestPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-12.bundle.js.map