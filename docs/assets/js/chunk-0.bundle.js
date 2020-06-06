(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[0],{

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





var Animation = /*#__PURE__*/function () {
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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var regNumberWithUnit = /^(\d+\.?\d*)([a-z]+|%)$/i,
    regColor = /^(?:#([a-f0-9]{3})|#([a-f0-9]{6})|#([a-f0-9]{8}))$/i,
    regFunction = /^([a-z_][a-z_0-9]*)\((.+?)\)$/i;
var TYPE_FUNCTIONS = {
  hex: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseHexColorStringArg,
  rgb: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseRGBAColorStringArgs,
  rgba: _vectors__WEBPACK_IMPORTED_MODULE_2__["RGBA"].parseRGBAColorStringArgs
};
var DeadFXError = /*#__PURE__*/function (_ExtendableError) {
  _inherits(DeadFXError, _ExtendableError);

  var _super = _createSuper(DeadFXError);

  function DeadFXError() {
    _classCallCheck(this, DeadFXError);

    return _super.apply(this, arguments);
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

var FX = /*#__PURE__*/function () {
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

      var _iterator = _createForOfIteratorHelper(_classPrivateFieldGet(this, _frames)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
        _iterator.e(err);
      } finally {
        _iterator.f();
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

      var _iterator2 = _createForOfIteratorHelper(_classPrivateFieldGet(this, _chained)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var onResolve = _step2.value.onResolve;
          if (onResolve) onResolve(_classPrivateFieldGet(this, _internalValue));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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

var NumberWithUnit = /*#__PURE__*/function () {
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

/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map