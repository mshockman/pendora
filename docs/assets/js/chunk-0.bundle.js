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
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez1')
      });
      this.drag2 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example2", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez2'),
        helper: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["clone"])(0.5),
        revert: true,
        revertDuration: 1000
      });
      this.drag3 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example3", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez3'),
        revert: true,
        revertDuration: 1000
      });
      this.drag4 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example4", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez4')
      });
      this.drag5 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example5", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez5'),
        axis: 'x'
      });
      this.drag6 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example6", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez6'),
        axis: 'y'
      });
      this.drag7 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example7", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez7'),
        grid: 50
      });
      this.drag8 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example8", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez8')
      });
      this.drag8 = new core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["default"]("#drag-example9", {
        resistance: 0,
        delay: 0,
        container: Object(core_ui_Draggable2__WEBPACK_IMPORTED_MODULE_0__["ScrollArea"])('#ez9'),
        selector: '.drag-item'
      });
      var dz1 = document.querySelector('#dz1');
      this.drag4.connect(dz1);
      dz1.addEventListener('drag.enter', function (event) {
        console.log(event);
        dz1.classList.add('active');
      });
      dz1.addEventListener('drag.leave', function (event) {
        console.log(event);
        dz1.classList.remove('active');
      });
    }
  }]);

  return TestDraggablePage;
}();



/***/ }),

/***/ "./src/core/fx/Animation.js":
/*!**********************************!*\
  !*** ./src/core/fx/Animation.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easing */ "./src/core/fx/easing.js");
/* harmony import */ var _FX__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FX */ "./src/core/fx/FX.js");
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./frame */ "./src/core/fx/frame.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Animation =
/*#__PURE__*/
function () {
  /**
   *
   * @param duration
   * @param frames {{}|function(Element element, Animation animation):{}}
   * @param applyFrame - The function that takes a frame and applies it to the element.
   * @param bubbleFrameEvent
   * @param finishFrame
   */
  function Animation(_ref) {
    var _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? null : _ref$duration,
        frames = _ref.frames,
        _ref$applyFrame = _ref.applyFrame,
        applyFrame = _ref$applyFrame === void 0 ? _frame__WEBPACK_IMPORTED_MODULE_2__["defaultApplyFrame"] : _ref$applyFrame,
        _ref$bubbleFrameEvent = _ref.bubbleFrameEvent,
        bubbleFrameEvent = _ref$bubbleFrameEvent === void 0 ? false : _ref$bubbleFrameEvent,
        _ref$finishFrame = _ref.finishFrame,
        finishFrame = _ref$finishFrame === void 0 ? null : _ref$finishFrame;

    _classCallCheck(this, Animation);

    this.frames = frames;
    this.applyFrame = applyFrame || Animation.defaultApplyFrame;
    this.bubbleFrameEvent = bubbleFrameEvent;
    this.finishFrame = finishFrame;
    this.duration = duration;
  }
  /**
   * Creates an fx object.
   *
   * @param element
   * @param frames
   * @param duration
   * @param applyFrame
   * @param easing
   * @param onStart
   * @param onFrame
   * @param onPause
   * @param onCancel
   * @param onEnd
   * @param onComplete
   * @param bubbleFrameEvent
   * @param finishFrame
   * @returns {FX}
   */


  _createClass(Animation, [{
    key: "init",
    value: function init(_ref2) {
      var element = _ref2.element,
          frames = _ref2.frames,
          duration = _ref2.duration,
          applyFrame = _ref2.applyFrame,
          easing = _ref2.easing,
          onStart = _ref2.onStart,
          onFrame = _ref2.onFrame,
          onPause = _ref2.onPause,
          onCancel = _ref2.onCancel,
          onEnd = _ref2.onEnd,
          onComplete = _ref2.onComplete,
          bubbleFrameEvent = _ref2.bubbleFrameEvent,
          finishFrame = _ref2.finishFrame;
      return new _FX__WEBPACK_IMPORTED_MODULE_1__["default"](element, frames, duration, {
        applyFrame: applyFrame,
        easing: easing,
        animation: this,
        onStart: onStart,
        onFrame: onFrame,
        onPause: onPause,
        onCancel: onCancel,
        onEnd: onEnd,
        onComplete: onComplete,
        bubbleFrameEvent: bubbleFrameEvent,
        finishFrame: finishFrame
      });
    }
    /**
     * Ran after the fx completes.
     * @param fx
     */

  }, {
    key: "destroy",
    value: function destroy(fx) {}
    /**
     * Animates the given element.  Returns the FX object that can be used to control the animation.
     *
     * @param element {HTMLElement|Element} The element to animate.
     * @param duration {Number} The duration of the animation in milliseconds.
     * @param easing {function(Number)} An easing function that controls the rate of change for the animation.  If null linear animation is used.
     * @param onStart {function(FX)} A callback function that is called right before the animation starts playing.
     * @param onFrame {function(FX, frame)} A callback that is called per frame.
     * @param onPause {function(FX)} A callback that is called when the FX pauses.
     * @param onCancel {function(FX)} A callback that is called when the FX cancels.
     * @param onEnd {function(FX)} A callback that is called when the animation ends.  Whether by completing, pausing, or canceling.  See Fx.status to determine what happened.
     * @param onComplete {function(FX)} A callback that is called when the animation complete successfully.
     * @param position
     * @param autoPlay
     * @returns {FX}
     */

  }, {
    key: "animate",
    value: function animate(element) {
      var _this = this;

      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$duration = _ref3.duration,
          duration = _ref3$duration === void 0 ? null : _ref3$duration,
          _ref3$easing = _ref3.easing,
          easing = _ref3$easing === void 0 ? _easing__WEBPACK_IMPORTED_MODULE_0__["EASING"].linear : _ref3$easing,
          _ref3$onStart = _ref3.onStart,
          onStart = _ref3$onStart === void 0 ? null : _ref3$onStart,
          _ref3$onFrame = _ref3.onFrame,
          onFrame = _ref3$onFrame === void 0 ? null : _ref3$onFrame,
          _ref3$onPause = _ref3.onPause,
          onPause = _ref3$onPause === void 0 ? null : _ref3$onPause,
          _ref3$onCancel = _ref3.onCancel,
          onCancel = _ref3$onCancel === void 0 ? null : _ref3$onCancel,
          _ref3$onEnd = _ref3.onEnd,
          _onEnd = _ref3$onEnd === void 0 ? null : _ref3$onEnd,
          _ref3$onComplete = _ref3.onComplete,
          onComplete = _ref3$onComplete === void 0 ? null : _ref3$onComplete,
          _ref3$position = _ref3.position,
          position = _ref3$position === void 0 ? 0 : _ref3$position,
          _ref3$autoPlay = _ref3.autoPlay,
          autoPlay = _ref3$autoPlay === void 0 ? true : _ref3$autoPlay;

      if (duration === null) {
        duration = this.duration;
      }

      var fx = this.init({
        element: element,
        frames: this.frames,
        duration: duration,
        applyFrame: this.applyFrame,
        easing: easing,
        animation: this,
        onStart: onStart,
        onFrame: onFrame,
        onPause: onPause,
        onCancel: onCancel,
        onEnd: function onEnd(fx) {
          if (_onEnd) _onEnd.call(fx, fx);

          _this.destroy(fx);
        },
        onComplete: onComplete,
        bubbleFrameEvent: this.bubbleFrameEvent,
        finishFrame: this.finishFrame
      });

      if (position) {
        fx["goto"](position);
      }

      if (autoPlay) {
        fx.play();
      }

      return fx;
    }
  }, {
    key: "goto",
    value: function goto(element, position) {
      this.animate(element, {
        autoPlay: false,
        position: position
      });
      return Animation.complete;
    }
    /**
     * Creates a function that calls the animate method with the bound parameters.
     * Parameters can be overridden in the created function when called.
     * Method has the same signature as the animate method.
     *
     * Usage:
     * let animation = new Animation(...),
     *     fx = animation.bind(null, 2000);
     *
     * fx(element) // Animation the element over 2000 milliseconds.
     *
     * @param element
     * @param config
     * @returns {function(HTMLElement element, Number duration, Object config): FX}
     */

  }, {
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var defaults = {
        element: element,
        config: config
      };
      return function () {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        element = element === defaults ? element.defaults : element;
        var _options = {};
        if (defaults.config) Object.assign(_options, defaults.config);
        if (config) Object.assign(_options, config);
        return _this2.animate(element, _options);
      };
    }
  }]);

  return Animation;
}();

_defineProperty(Animation, "defaultApplyFrame", _frame__WEBPACK_IMPORTED_MODULE_2__["defaultApplyFrame"]);

_defineProperty(Animation, "complete", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].complete);

_defineProperty(Animation, "canceled", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].canceled);

_defineProperty(Animation, "paused", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].paused);

_defineProperty(Animation, "pending", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].pending);

_defineProperty(Animation, "error", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].error);

_defineProperty(Animation, "playing", _FX__WEBPACK_IMPORTED_MODULE_1__["default"].playing);



/***/ }),

/***/ "./src/core/fx/FX.js":
/*!***************************!*\
  !*** ./src/core/fx/FX.js ***!
  \***************************/
/*! exports provided: DeadFXError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeadFXError", function() { return DeadFXError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FX; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vectors */ "./src/core/vectors/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/core/fx/types.js");
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./easing */ "./src/core/fx/easing.js");
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./frame */ "./src/core/fx/frame.js");
var _Symbol$toStringTag;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var regNumberWithUnit = /^(\d+\.?\d*)([a-z]+|%)$/i,
    regColor = /^(?:#([a-f0-9]{3})|#([a-f0-9]{6})|#([a-f0-9]{8}))$/i,
    regFunction = /^([a-z_][a-z_0-9]*)\((.+?)\)$/i;
var TYPE_FUNCTIONS = {
  hex: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseHexColorStringArg,
  rgb: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseRGBAColorStringArgs,
  rgba: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseRGBAColorStringArgs
};
var DeadFXError =
/*#__PURE__*/
function (_ExtendableError) {
  _inherits(DeadFXError, _ExtendableError);

  function DeadFXError() {
    _classCallCheck(this, DeadFXError);

    return _possibleConstructorReturn(this, _getPrototypeOf(DeadFXError).apply(this, arguments));
  }

  return DeadFXError;
}(_errors__WEBPACK_IMPORTED_MODULE_0__["ExtendableError"]);

function assertFXAlive(fx) {
  if (fx.status === FX.complete || fx.status === FX.error || fx.status === FX.complete) {
    throw new DeadFXError("FX object is dead.");
  }
}

function doPromiseAction(onAction, value, resolveOrReject) {
  if (typeof onAction === 'function') {
    value = onAction(value);
  }

  resolveOrReject(value);
}

function _prepareValue(value) {
  if (typeof value === 'string') {
    value = value.trim();
    var m = regNumberWithUnit.exec(value);

    if (m) {
      return new _types__WEBPACK_IMPORTED_MODULE_3__["NumberWithUnit"](parseFloat(m[1]), m[2]);
    }

    m = regColor.exec(value);

    if (m) {
      return TYPE_FUNCTIONS.hex(m[0]);
    }

    m = regFunction.exec(value);

    if (m) {
      return TYPE_FUNCTIONS[m[1]](m[2]);
    }
  }

  return value;
}

function _getFrames(fx, element, frames) {
  var r = {};

  if (typeof frames === 'function') {
    frames = frames.call(fx, element, fx);
  }

  for (var keyframeIndex in frames) {
    if (!frames.hasOwnProperty(keyframeIndex)) continue;
    var frame = frames[keyframeIndex];
    r[keyframeIndex] = {};

    for (var property in frame) {
      if (!frame.hasOwnProperty(property)) continue;
      r[keyframeIndex][property] = _prepareValue(frame[property]);
    }
  }

  return r;
}
/**
 * @implements Promise
 */


_Symbol$toStringTag = Symbol.toStringTag;

var FX =
/*#__PURE__*/
function () {
  function FX(element, frames, duration) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$applyFrame = _ref.applyFrame,
        applyFrame = _ref$applyFrame === void 0 ? _frame__WEBPACK_IMPORTED_MODULE_5__["defaultApplyFrame"] : _ref$applyFrame,
        _ref$animation = _ref.animation,
        animation = _ref$animation === void 0 ? null : _ref$animation,
        _ref$easing = _ref.easing,
        easing = _ref$easing === void 0 ? _easing__WEBPACK_IMPORTED_MODULE_4__["EASING"].linear : _ref$easing,
        _ref$onComplete = _ref.onComplete,
        onComplete = _ref$onComplete === void 0 ? null : _ref$onComplete,
        _ref$onCancel = _ref.onCancel,
        onCancel = _ref$onCancel === void 0 ? null : _ref$onCancel,
        _ref$onFrame = _ref.onFrame,
        onFrame = _ref$onFrame === void 0 ? null : _ref$onFrame,
        _ref$onStart = _ref.onStart,
        onStart = _ref$onStart === void 0 ? null : _ref$onStart,
        _ref$onEnd = _ref.onEnd,
        onEnd = _ref$onEnd === void 0 ? null : _ref$onEnd,
        _ref$bubbleFrameEvent = _ref.bubbleFrameEvent,
        bubbleFrameEvent = _ref$bubbleFrameEvent === void 0 ? false : _ref$bubbleFrameEvent,
        _ref$finishFrame = _ref.finishFrame,
        finishFrame = _ref$finishFrame === void 0 ? null : _ref$finishFrame,
        _ref$init = _ref.init,
        init = _ref$init === void 0 ? null : _ref$init;

    _classCallCheck(this, FX);

    _element.set(this, {
      writable: true,
      value: void 0
    });

    _chained.set(this, {
      writable: true,
      value: void 0
    });

    _frames.set(this, {
      writable: true,
      value: void 0
    });

    _internalValue.set(this, {
      writable: true,
      value: void 0
    });

    _animation.set(this, {
      writable: true,
      value: void 0
    });

    _frameId.set(this, {
      writable: true,
      value: void 0
    });

    _status.set(this, {
      writable: true,
      value: void 0
    });

    _position.set(this, {
      writable: true,
      value: void 0
    });

    _finishFrame.set(this, {
      writable: true,
      value: void 0
    });

    _applyFrame.set(this, {
      writable: true,
      value: void 0
    });

    _easing.set(this, {
      writable: true,
      value: void 0
    });

    _duration.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, _Symbol$toStringTag, "[Object FX]");

    _classPrivateFieldSet(this, _frames, []);

    _classPrivateFieldSet(this, _chained, []);

    _classPrivateFieldSet(this, _element, Object(_utility__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(element));

    _classPrivateFieldSet(this, _internalValue, undefined);

    this.onComplete = onComplete;
    this.onCancel = onCancel;
    this.onFrame = onFrame;
    this.onStart = onStart;
    this.onEnd = onEnd;
    this.bubbleFrameEvent = bubbleFrameEvent;

    _classPrivateFieldSet(this, _animation, animation);

    _classPrivateFieldSet(this, _finishFrame, finishFrame);

    _classPrivateFieldSet(this, _applyFrame, applyFrame);

    _classPrivateFieldSet(this, _easing, easing);

    _classPrivateFieldSet(this, _frameId, null);

    _classPrivateFieldSet(this, _status, FX.pending);

    _classPrivateFieldSet(this, _duration, duration);

    _classPrivateFieldSet(this, _position, 0);

    if (init) {
      init.call(this, this);
    } // Prepare frames


    frames = _getFrames(this, _classPrivateFieldGet(this, _element), frames);

    for (var key in frames) {
      if (frames.hasOwnProperty(key)) {
        var frame = frames[key],
            pos = parseFloat(key) / 100;

        if (typeof frame === 'function') {
          frame = frame.call(this, _classPrivateFieldGet(this, _element));
        }

        frame = Object.freeze(Object.assign({}, frame));

        _classPrivateFieldGet(this, _frames).push(Object.freeze({
          position: pos,
          properties: frame
        }));
      }
    }

    _classPrivateFieldGet(this, _frames).sort(function (a, b) {
      return a.position - b.pos;
    });
  }

  _createClass(FX, [{
    key: "getFrameFX",

    /**
     * Returns the frame options at the given position.
     * @param position
     */
    value: function getFrameFX(position) {
      // position can either be a percentage string (aka 50%) or the time in milliseconds into the animation
      // which will be converted into a percentage.
      if (typeof position === 'string') {
        position = parseFloat(position) / 100;
      } // At this point position should be a value between 0.0 and 1.0.
      // Easing functions specify that rate of change in the properties.
      // It takes the position and maps it to another value between 0.0f and 1.0f.
      // By default linear easing is used.


      if (_classPrivateFieldGet(this, _easing)) {
        position = _classPrivateFieldGet(this, _easing).call(this, position);
      }

      var r = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _classPrivateFieldGet(this, _frames)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var frame = _step.value;

          for (var key in frame.properties) {
            if (frame.properties.hasOwnProperty(key)) {
              var value = frame.properties[key];

              if (!r[key]) {
                r[key] = {
                  startPosition: null,
                  startValue: null,
                  endPosition: null,
                  endValue: null
                };
              }

              if (frame.position <= position) {
                r[key].startPosition = frame.position;
                r[key].startValue = value;
              } else if (frame.position > position && r[key].endPosition === null) {
                r[key].endPosition = frame.position;
                r[key].endValue = value;
              }
            }
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

      return r;
    }
    /**
     * Returns the final frame at the given position.  All options at this point should be parsed and there final values
     * should be available.
     *
     * @param position
     */

  }, {
    key: "getFrame",
    value: function getFrame(position) {
      var frame = this.getFrameFX(position),
          r = {};

      if (typeof position === 'string') {
        position = parseFloat(position) / 100;
      } // Takes the frame config options and calculates the final values.


      for (var property in frame) {
        if (frame.hasOwnProperty(property)) {
          var options = frame[property];

          if ((options.endPosition === null || options.endPosition <= position) && options.startValue !== null) {
            r[property] = options.startValue;
          } else if (options.startValue !== null) {
            if (_typeof(options.startValue) === 'object') {
              var p = (position - options.startPosition) / (options.endPosition - options.startPosition),
                  delta = options.endValue.subtract(options.startValue);
              r[property] = options.startValue.add(delta.scalar(p));
            } else if (typeof options.startValue === 'number') {
              var duration = options.endPosition - options.startPosition,
                  _p = (position - options.startPosition) / duration,
                  _delta = options.endValue - options.startValue;

              r[property] = options.startValue + _delta * _p;
            } else {
              r[property] = options.startValue;
            }
          }
        }
      } // User provided hook that can perform the final touch ups on the frame.


      if (_classPrivateFieldGet(this, _finishFrame)) {
        r = _classPrivateFieldGet(this, _finishFrame).call(this, this, frame);
      }

      return r;
    }
  }, {
    key: "play",
    value: function play() {
      var _this = this;

      assertFXAlive(this);

      if (_classPrivateFieldGet(this, _frameId) === null) {
        this["goto"](_classPrivateFieldGet(this, _position));
        var tick = performance.now();

        var frameFN = function frameFN() {
          var timestamp = performance.now(),
              delta = timestamp - tick,
              position = _classPrivateFieldGet(_this, _position) + delta / _this.duration;

          tick = timestamp;

          var frame = _this["goto"](position);

          _classPrivateFieldSet(_this, _status, FX.playing);

          if (_this.onFrame) _this.onFrame.call(_this, _this, frame);

          _classPrivateFieldGet(_this, _element).dispatchEvent(new CustomEvent('animation.frame', {
            bubbles: _this.bubbleFrameEvent,
            detail: _this
          }));

          if (_classPrivateFieldGet(_this, _position) < 1) {
            _classPrivateFieldSet(_this, _frameId, window.requestAnimationFrame(frameFN));
          } else {
            _this._complete(FX.complete, FX.complete);

            _classPrivateFieldSet(_this, _frameId, null);
          }
        };

        if (this.onStart) {
          this.onStart.call(this, this);
        }

        _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.start', {
          bubbles: true,
          detail: this
        }));

        _classPrivateFieldSet(this, _frameId, window.requestAnimationFrame(frameFN));
      }

      return this;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Pauses the animation.  Does not resolve it.
     * @returns {FX}
     */

  }, {
    key: "pause",
    value: function pause() {
      if (_classPrivateFieldGet(this, _frameId)) {
        window.cancelAnimationFrame(_classPrivateFieldGet(this, _frameId));

        _classPrivateFieldSet(this, _frameId, null);

        _classPrivateFieldSet(this, _status, FX.paused);

        _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.paused', {
          bubbles: true,
          detail: this
        }));
      }

      return this;
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      var complete = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FX.canceled;

      if (_classPrivateFieldGet(this, _frameId)) {
        window.cancelAnimationFrame(_classPrivateFieldGet(this, _frameId));

        _classPrivateFieldSet(this, _frameId, null);

        if (complete) {
          this["goto"](1);

          this._complete(status, status);
        } else {
          _classPrivateFieldSet(this, _status, status);

          _classPrivateFieldSet(this, _internalValue, status);
        }

        if (this.onCancel) this.onCancel.call(this, this);

        _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.canceled', {
          bubbles: true,
          detail: this
        }));

        this._triggerEndEvent();
      }

      return this;
    }
    /**
     * Cancel the animation with the canceled state.   optionally sets the animation to it's final frame if
     * completeAnimation is true.
     *
     * @param completeAnimation
     * @returns {FX}
     */

  }, {
    key: "cancel",
    value: function cancel() {
      var completeAnimation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._cancel(completeAnimation, FX.canceled);
    }
    /**
     * Completes the animation immediately and sets is status to complete.
     * @returns {FX}
     */

  }, {
    key: "complete",
    value: function complete() {
      return this._cancel(true, FX.complete);
    }
  }, {
    key: "goto",
    value: function goto(position) {
      assertFXAlive(this);

      if (typeof position === 'string') {
        position = parseFloat(position) / 100;
      }

      _classPrivateFieldSet(this, _position, position);

      return this.applyFrame(this.position);
    }
  }, {
    key: "applyFrame",
    value: function applyFrame(position) {
      var frame = this.getFrame(position);

      _classPrivateFieldGet(this, _applyFrame).call(this, this, frame);

      return frame;
    }
  }, {
    key: "_triggerEndEvent",
    value: function _triggerEndEvent() {
      if (this.onEnd) this.onEnd.call(this, this);

      _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.end', {
        bubbles: true,
        detail: this
      }));

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _classPrivateFieldGet(this, _chained)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var onResolve = _step2.value.onResolve;
          if (onResolve) onResolve(_classPrivateFieldGet(this, _internalValue));
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

      _classPrivateFieldSet(this, _chained, []);
    }
  }, {
    key: "_complete",
    value: function _complete(value) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FX.complete;

      if (this.state !== "Pending") {
        return;
      }

      _classPrivateFieldSet(this, _status, status);

      _classPrivateFieldSet(this, _internalValue, value);

      if (this.onComplete) this.onComplete.call(this, this);

      _classPrivateFieldGet(this, _element).dispatchEvent(new CustomEvent('animation.complete', {
        bubbles: true,
        detail: this
      }));

      this._triggerEndEvent();
    }
  }, {
    key: "then",
    value: function then(_onResolve, _onReject) {
      var _this2 = this;

      if (this.state === "Pending") {
        return new Promise(function (resolve, reject) {
          // noinspection JSUnusedGlobalSymbols
          _classPrivateFieldGet(_this2, _chained).push({
            onResolve: function onResolve(value) {
              doPromiseAction(_onResolve, value, resolve);
            },
            onReject: function onReject(value) {
              doPromiseAction(_onReject, value, reject);
            }
          });
        });
      } else if (this.state === 'Fulfilled' && typeof _onResolve === 'function') {
        return new Promise(function (resolve) {
          doPromiseAction(_onResolve, _classPrivateFieldGet(_this2, _internalValue), resolve);
        });
      } else if (this.state === 'Rejected' && typeof _onReject === 'function') {
        return new Promise(function (resolve, reject) {
          doPromiseAction(_onReject, _classPrivateFieldGet(_this2, _internalValue), reject);
        });
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "finally",
    value: function _finally(_onFinally) {
      _onFinally = function onFinally(value) {
        if (typeof _onFinally === 'function') {
          _onFinally();
        }

        return value;
      };

      return this.then(_onFinally, _onFinally);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "catch",
    value: function _catch(onReject) {
      return this.then(undefined, onReject);
    }
  }, {
    key: "animation",
    get: function get() {
      return _classPrivateFieldGet(this, _animation);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "easing",
    get: function get() {
      return _classPrivateFieldGet(this, _easing);
    }
  }, {
    key: "status",
    get: function get() {
      return _classPrivateFieldGet(this, _status);
    }
  }, {
    key: "position",
    get: function get() {
      return _classPrivateFieldGet(this, _position);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "duration",
    get: function get() {
      return _classPrivateFieldGet(this, _duration);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "frames",
    get: function get() {
      return _classPrivateFieldGet(this, _frames).slice();
    }
  }, {
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _element);
    } // set position(value) {
    //     if (typeof value === 'string') {
    //         value = (parseFloat(value) / 100) * this.#duration;
    //     }
    //
    //     this.#position = Math.max(0.0, Math.min(this.#duration, value));
    // }

  }, {
    key: "state",
    get: function get() {
      if (this.status === FX.complete || this.status === FX.canceled) {
        return "Fulfilled";
      } else if (this.status === FX.error) {
        return "Rejected";
      } else {
        return "Pending";
      }
    }
  }]);

  return FX;
}();

var _element = new WeakMap();

var _chained = new WeakMap();

var _frames = new WeakMap();

var _internalValue = new WeakMap();

var _animation = new WeakMap();

var _frameId = new WeakMap();

var _status = new WeakMap();

var _position = new WeakMap();

var _finishFrame = new WeakMap();

var _applyFrame = new WeakMap();

var _easing = new WeakMap();

var _duration = new WeakMap();

_defineProperty(FX, "pending", "Pending");

_defineProperty(FX, "complete", "Complete");

_defineProperty(FX, "error", "Error");

_defineProperty(FX, "paused", "Paused");

_defineProperty(FX, "canceled", "Canceled");

_defineProperty(FX, "playing", "Playing");



/***/ }),

/***/ "./src/core/fx/easing.js":
/*!*******************************!*\
  !*** ./src/core/fx/easing.js ***!
  \*******************************/
/*! exports provided: linear, EASING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EASING", function() { return EASING; });
/**
 *
 * @param p
 * @returns {*}
 */
function linear(p) {
  return p;
} // noinspection JSUnusedGlobalSymbols

var EASING = {
  linear: linear
};

/***/ }),

/***/ "./src/core/fx/frame.js":
/*!******************************!*\
  !*** ./src/core/fx/frame.js ***!
  \******************************/
/*! exports provided: defaultApplyFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultApplyFrame", function() { return defaultApplyFrame; });
function defaultApplyFrame(fx, frame) {
  for (var key in frame) {
    if (frame.hasOwnProperty(key)) {
      fx.element.style[key] = frame[key].toString();
    }
  }
}

/***/ }),

/***/ "./src/core/fx/types.js":
/*!******************************!*\
  !*** ./src/core/fx/types.js ***!
  \******************************/
/*! exports provided: NumberWithUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberWithUnit", function() { return NumberWithUnit; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NumberWithUnit =
/*#__PURE__*/
function () {
  function NumberWithUnit(value, unit) {
    _classCallCheck(this, NumberWithUnit);

    this.value = value;
    this.unit = unit;
  }

  _createClass(NumberWithUnit, [{
    key: "add",
    value: function add(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value + value, this.unit);
    }
  }, {
    key: "subtract",
    value: function subtract(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value - value, this.unit);
    }
  }, {
    key: "scalar",
    value: function scalar(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value * value, this.unit);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "divide",
    value: function divide(value) {
      if (typeof value !== "number") {
        if (!(value instanceof NumberWithUnit)) {
          throw new TypeError("Cannot perform action on invalid type.");
        }

        if (this.unit !== value.unit) {
          throw new Error("Mismatched units");
        }

        value = value.value;
      }

      return new NumberWithUnit(this.value / value, this.unit);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.value).concat(this.unit);
    }
  }]);

  return NumberWithUnit;
}();

/***/ }),

/***/ "./src/core/ui/Draggable2.js":
/*!***********************************!*\
  !*** ./src/core/ui/Draggable2.js ***!
  \***********************************/
/*! exports provided: cursor, TOLERANCE, default, ScrollArea, clone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return cursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOLERANCE", function() { return TOLERANCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollArea", function() { return ScrollArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony import */ var _Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vectors/Rect */ "./src/core/vectors/Rect.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./position */ "./src/core/ui/position.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
/**
 * Functions that are used to test if an element is overlapping.
 */

var TOLERANCE = {
  intersect: function intersect(element, rect) {
    var targetRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
    return targetRect.isOverlapping(rect);
  }
};

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
        revertDuration = _ref$revertDuration === void 0 ? 0 : _ref$revertDuration,
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

        var cache, target, container, scroller, dropTargets, startPosition, onMouseMove, onMouseUp, rect, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, dropTarget;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                cache = _classPrivateFieldGet(this, _itemCache).get(element);

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
                target = element, container = this.container, scroller = null, dropTargets = [], startPosition = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](element);
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

                onMouseMove = function onMouseMove(event) {
                  event.preventDefault();

                  var rect = _moveElementToPosition(_this3, target, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, _this3, target, element));

                  if (_this3.scrollSpeed > 0) {
                    if (scroller) {
                      scroller.cancel();
                      scroller = null;
                    }

                    scroller = ScrollHelper.buildScrollHelper(element, target, rect, pos, _this3, event, _this3.scrollSpeed, container);
                  } // drag-enter


                  var currentDropTargets = _this3.getDropTargets(rect, {
                    mouseX: event.clientX,
                    mouseY: event.clientY
                  });

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = currentDropTargets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var dropTarget = _step.value;

                      if (dropTargets.indexOf(dropTarget) === -1) {
                        _dispatchDropEvent(_this3, dropTarget, 'drag.enter', {
                          bubbles: true,
                          detail: {
                            clientX: event.clientX,
                            clientY: event.clientY,
                            target: target,
                            element: element,
                            originalEvent: event
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

                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = dropTargets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _dropTarget = _step2.value;

                      if (currentDropTargets.indexOf(_dropTarget) === -1) {
                        _dispatchDropEvent(_this3, _dropTarget, 'drag.leave', {
                          bubbles: false,
                          detail: {
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

                  _this3.publish('drag.move', {
                    draggable: _this3,
                    name: 'drag.enter',
                    target: target,
                    element: element,
                    originalEvent: event,
                    clientX: event.clientX,
                    clientY: event.clientY
                  });
                };

                onMouseUp =
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(event) {
                    var accepted, _isDefaultPrevented, reverted, _pos;

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

                            dropTargets = _this3.getDropTargets();
                            accepted = false, _isDefaultPrevented = false, reverted = false;

                            _this3.publish('drag.drop', {
                              name: 'drag.drop',
                              draggable: _this3,
                              target: target,
                              element: element,
                              originalEvent: event,
                              clientX: event.clientX,
                              clientY: event.clientY,
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
                              _context2.next = 21;
                              break;
                            }

                            if (_this3.revertDuration) {
                              _context2.next = 14;
                              break;
                            }

                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            } else {
                              _pos = startPosition.translate(-window.pageXOffset, -window.pageYOffset);
                              Object(_position__WEBPACK_IMPORTED_MODULE_3__["setElementClientPosition"])(target, _pos, 'translate3d');
                            }

                            _context2.next = 18;
                            break;

                          case 14:
                            cache.fx = _revert(target, cache.rect, _this3.revertDuration);
                            _context2.next = 17;
                            return cache.fx;

                          case 17:
                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            }

                          case 18:
                            reverted = true;
                            _context2.next = 23;
                            break;

                          case 21:
                            if (target !== element) {
                              target.parentElement.removeChild(target);
                            }

                            if (_isDefaultPrevented) _moveElementToPosition(_this3, element, event.clientX, event.clientY, pos.offsetX, pos.offsetY, _selectElementRect(container, _this3, target, element));

                          case 23:
                            _classPrivateFieldGet(_this3, _itemCache)["delete"](element);

                            _this3.publish('drag.end', {
                              draggable: _this3,
                              name: 'drag.end',
                              target: target,
                              element: element,
                              originalEvent: event,
                              clientX: event.clientX,
                              clientY: event.clientY,
                              accepted: accepted,
                              reverted: reverted
                            });

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


                if (!(pos.startingX !== undefined && pos.startingY !== undefined)) {
                  _context3.next = 38;
                  break;
                }

                rect = _moveElementToPosition(this, target, pos.startingX - window.pageXOffset, pos.startingY - window.pageYOffset, pos.offsetX, pos.offsetY, _selectElementRect(container, this, target, element));
                dropTargets = this.getDropTargets(rect, {
                  mouseX: pos.startingX - window.pageXOffset,
                  mouseY: pos.startingY - window.pageYOffset
                });
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 22;

                for (_iterator3 = dropTargets[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  dropTarget = _step3.value;

                  _dispatchDropEvent(this, dropTarget, 'drag.enter', {
                    bubbles: true,
                    detail: {
                      initial: true,
                      clientX: pos.startingX - window.pageXOffset,
                      clientY: pos.startingY - window.pageYOffset,
                      target: target,
                      element: element
                    }
                  });
                }

                _context3.next = 30;
                break;

              case 26:
                _context3.prev = 26;
                _context3.t0 = _context3["catch"](22);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 30:
                _context3.prev = 30;
                _context3.prev = 31;

                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }

              case 33:
                _context3.prev = 33;

                if (!_didIteratorError3) {
                  _context3.next = 36;
                  break;
                }

                throw _iteratorError3;

              case 36:
                return _context3.finish(33);

              case 37:
                return _context3.finish(30);

              case 38:
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                element.classList.add('ui-dragging');
                this.publish('drag.start', {
                  draggable: this,
                  element: element,
                  target: target,
                  clientX: pos.startingX - window.pageXOffset,
                  clientY: pos.startingY - window.pageYOffset,
                  name: 'drag.start',
                  originalEvent: null
                });

              case 42:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[22, 26, 30, 38], [31,, 33, 37]]);
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
      var testFunction = this.tolerance;

      if (typeof testFunction === 'string') {
        testFunction = TOLERANCE[testFunction];
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _classPrivateFieldGet(this, _droppables)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var droppable = _step4.value;

          if (testFunction(droppable, rect, mousePos, this)) {
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
  }, {
    key: "connect",
    value: function connect(droppable) {
      if (typeof droppable === 'string') {
        droppable = document.querySelector(droppable);
      }

      _classPrivateFieldGet(this, _droppables).push(droppable);
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

  return Draggable2;
}(_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _element = new WeakMap();

var _droppables = new WeakMap();

var _boundOnMouseDown = new WeakMap();

var _itemCache = new WeakMap();



function _dispatchDropEvent(self, target, name, options) {
  var customEvent = new CustomEvent(name, {
    bubbles: options.bubble,
    detail: _objectSpread({
      name: name,
      target: target,
      draggable: self
    }, options.detail)
  });
  target.dispatchEvent(customEvent);
}

function _revert(target, position, revertDuration) {
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
        var scrollParentRect = new _vectors_Rect__WEBPACK_IMPORTED_MODULE_2__["default"](scrollParent),
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

/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map