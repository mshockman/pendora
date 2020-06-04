(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[1],{

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



/***/ }),

/***/ "./src/core/ui/position.js":
/*!*********************************!*\
  !*** ./src/core/ui/position.js ***!
  \*********************************/
/*! exports provided: getOffsetElement, getClientRect, getBoundingOffsetRect, getBoundingDocumentRect, getTranslation, setTranslation, getCssPosition, setCssPosition, setElementClientPosition, clientRectToDocumentSpace, documentRectToClientSpace, snapToGrid, convertDomRectToObject, getPointOnElement, getSubBoundingBox, getDistanceBetweenRects, getElementOffset, setElementOffset, Vec2, Vec3, Rect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffsetElement", function() { return getOffsetElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientRect", function() { return getClientRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoundingOffsetRect", function() { return getBoundingOffsetRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoundingDocumentRect", function() { return getBoundingDocumentRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTranslation", function() { return setTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCssPosition", function() { return getCssPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCssPosition", function() { return setCssPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementClientPosition", function() { return setElementClientPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientRectToDocumentSpace", function() { return clientRectToDocumentSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentRectToClientSpace", function() { return documentRectToClientSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapToGrid", function() { return snapToGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDomRectToObject", function() { return convertDomRectToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointOnElement", function() { return getPointOnElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubBoundingBox", function() { return getSubBoundingBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenRects", function() { return getDistanceBetweenRects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return getElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementOffset", function() { return setElementOffset; });
/* harmony import */ var _vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vectors */ "./src/core/vectors/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"]; });

/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");


var regMatrix = /matrix(3d)?\(([^)]+)\)/;
/**
 * Returns the elements offset parent.
 *
 * @param element
 * @returns {HTMLElement}
 */

function getOffsetElement(element) {
  var o = element.parentElement;

  while (o) {
    var position = getComputedStyle(o).position;
    if (position !== 'static') return o;
    o = o.parentElement;
  }
}
/**
 * Returns the rectangle of the client area.
 *
 * @returns {Rect}
 */

function getClientRect() {
  return _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getClientRect();
}
/**
 * Returns a bounding rect who's positions are relative to the provided offsetParent.
 * If offsetParent is null then the targets natural offsetParent is used as returned by the getOffsetElement function.
 * @param element
 * @param offsetParent
 * @returns {{top: number, left: number, bottom: number, width: number, right: number, height: number}}
 */

function getBoundingOffsetRect(element) {
  var offsetParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var offsetRect, rect;
  if (!offsetParent) offsetParent = getOffsetElement(element); // no offset parent.  Position relative to the client.

  if (!offsetParent) {
    offsetRect = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getRootContainingClientRect();
  } else {
    offsetRect = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(offsetParent);
  }

  rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left - offsetRect.left, rect.top - offsetRect.top, offsetRect.right - rect.right, offsetRect.bottom - rect.bottom);
}
/**
 * Returns a bounding rect who's positions are relative to the document.
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */

function getBoundingDocumentRect(element) {
  var rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left + window.pageXOffset, rect.top + window.pageYOffset, rect.right + window.pageXOffset, rect.bottom + window.pageYOffset);
}
/**
 * Returns the css translation from the transformation matrix applied to the element.
 *
 * @param element
 * @returns {Vec3}
 */

function getTranslation(element) {
  var transform = getComputedStyle(element).transform,
      m = regMatrix.exec(transform);

  if (!m) {
    return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 0);
  }

  var data = m[2].split(/\s*,\s*/);

  if (m[1]) {
    return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](parseFloat(data[12]), parseFloat(data[13]), parseFloat(data[14]));
  } else {
    return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](parseFloat(data[4]), parseFloat(data[5]), 0);
  }
}
/**
 * Sets the element's transformation matrix to 2d translate with the specified left and top properties.
 *
 * @param element
 * @param x
 * @param y
 * @param z
 */

function setTranslation(element, _ref) {
  var x = _ref.x,
      y = _ref.y,
      _ref$z = _ref.z,
      z = _ref$z === void 0 ? null : _ref$z;

  if (z !== null) {
    element.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)");
  } else {
    element.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
  }
}
/**
 * Gets the elements left and top style properties as numbers.
 *
 * @param element
 * @returns {Vec2}
 */

function getCssPosition(element) {
  var style = getComputedStyle(element);
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"](parseInt(style.left, 10), parseInt(style.top, 10));
}
/**
 * Sets the left and top style properties of an element.  If the element is positioned statically it will be changed to
 * relative.
 *
 * @param element
 * @param left
 * @param top
 */

function setCssPosition(element, _ref2) {
  var _ref2$left = _ref2.left,
      left = _ref2$left === void 0 ? null : _ref2$left,
      _ref2$top = _ref2.top,
      top = _ref2$top === void 0 ? null : _ref2$top;
  var style = getComputedStyle(element);

  if (style.position === 'static') {
    style.position = 'relative';
  }

  if (left !== null && left !== undefined) {
    element.style.left = "".concat(left, "px");
  }

  if (top !== null && top !== undefined) {
    element.style.top = "".concat(top, "px");
  }
}
/**
 * Sets the elements position relative to the client window.  The `method` parameter controls how the elements position
 * is modified.  The options are 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'translate', and 'translate3d'.
 *
 * top-left, top-right, bottom-left and bottom-right set the css left, top, right, and bottom properties of the element.
 * translate and translate3d position the element by setting the transform property.
 *
 * @param element {HTMLElement}
 * @param position {{x, y}|{left, top, right, bottom}|Array|Vec2}
 * @param method {'top-left'|'top-right'|'bottom-left'|'bottom-right'|'translate'|'translate3d'}
 */

function setElementClientPosition(element, position) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top-left';
  position = new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](position);

  if (method === 'top-left' || method === 'top-right' || method === 'bottom-left' || method === 'bottom-right') {
    var style = getComputedStyle(element);
    var positionType = style.position,
        box,
        deltaX,
        deltaY,
        current; // position can't be static for this operation.  Switch to relative.

    if (positionType === 'static') {
      element.style.position = 'relative';
      positionType = "relative";
    }

    style = getComputedStyle(element);
    box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element);
    current = {
      left: parseInt(style.left, 10) || 0,
      right: parseInt(style.right, 10) || 0,
      top: parseInt(style.top, 10) || 0,
      bottom: parseInt(style.bottom, 10) || 0
    };

    if (method === 'top-left') {
      deltaX = position.left - box.left;
      deltaY = position.top - box.top;
      element.style.left = current.left + deltaX + 'px';
      element.style.top = current.top + deltaY + 'px';
      element.style.right = '';
      element.style.bottom = '';
    } else if (method === 'top-right') {
      deltaX = position.right - box.right;
      deltaY = position.top - box.top;
      element.style.right = current.right - deltaX + 'px';
      element.style.top = current.top + deltaY + 'px';
      element.style.left = '';
      element.style.bottom = '';
    } else if (method === 'bottom-left') {
      deltaX = position.left - box.left;
      deltaY = position.bottom - box.bottom;
      console.log({
        right: current.left + deltaX + 'px',
        bottom: current.bottom - deltaY + 'px'
      });
      element.style.left = current.left + deltaX + 'px';
      element.style.bottom = current.bottom - deltaY + 'px';
      element.style.right = '';
      element.style.top = '';
    } else {
      // bottom-right
      deltaX = position.right - box.right;
      deltaY = position.bottom - box.bottom;
      element.style.right = current.right - deltaX + 'px';
      element.style.bottom = current.bottom - deltaY + 'px';
      element.style.left = '';
      element.style.top = '';
    }
  } else if (method === 'translate') {
    var _box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element),
        _deltaX = position.left - _box.left,
        _deltaY = position.top - _box.top,
        cssPosition = getTranslation(element);

    setTranslation(element, {
      x: cssPosition.x + _deltaX,
      y: cssPosition.y + _deltaY
    });
  } else if (method === 'translate3d') {
    var _box2 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element),
        _deltaX2 = position.left - _box2.left,
        _deltaY2 = position.top - _box2.top,
        _cssPosition = getTranslation(element);

    setTranslation(element, {
      x: _cssPosition.x + _deltaX2,
      y: _cssPosition.y + _deltaY2,
      z: _cssPosition.z
    });
  }
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from client space to document space.
 * @param rect
 */

function clientRectToDocumentSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect);
  r.left += window.pageXOffset;
  r.right += window.pageXOffset;
  if (typeof r.top === 'number') r.top += window.pageYOffset;
  if (typeof r.bottom === 'number') r.bottom += window.pageYOffset;
  return r;
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from document space to client space.
 * @param rect
 */

function documentRectToClientSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect);
  r.left -= window.pageXOffset;
  r.right -= window.pageXOffset;
  if (typeof r.top === 'number') r.top -= window.pageYOffset;
  if (typeof r.bottom === 'number') r.bottom -= window.pageYOffset;
  return r;
}
/**
 * Snaps the value to the specified grid using the provided rounding function.
 * @param value
 * @param gridSize
 * @param roundingFunction
 * @returns {number|*}
 */

function snapToGrid(value, gridSize) {
  var roundingFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.round;

  if (gridSize !== null && gridSize !== undefined && !Number.isNaN(gridSize)) {
    return roundingFunction(value / gridSize) * gridSize;
  }

  return value;
}
/**
 * Deprecated in favor of calling Rect.fromRect() class method.
 *
 * @deprecated
 * @param domRect
 * @returns {Rect}
 */

function convertDomRectToObject(domRect) {
  return _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(domRect);
}
/**
 * Returns the {x, y} point calculated relative to the reference element.
 *
 * @param referenceElement
 * @param point
 * @param offset
 * @param constrain
 * @returns {Vec2}
 */

function getPointOnElement(referenceElement, point) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var constrain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var rect = referenceElement;

  if (rect.getBoundingClientRect) {
    rect = rect.getBoundingClientRect();
  }

  if (constrain) {
    if (typeof constrain === 'string') {
      constrain = document.querySelector(constrain);
    }

    if (constrain.getBoundingClientRect) {
      constrain = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(constrain.getBoundingClientRect());
    }
  } // Convert array to {x, y} object.


  if (Array.isArray(point)) {
    point = {
      x: point[0],
      y: point[1]
    };
  } else if (typeof point === 'string') {
    if (point === 'top-left') {
      point = {
        x: 0,
        y: 0
      };
    } else if (point === 'top') {
      point = {
        x: '50%',
        y: 0
      };
    } else if (point === 'top-right') {
      point = {
        x: '100%',
        y: 0
      };
    } else if (point === 'right') {
      point = {
        x: '100%',
        y: '50%'
      };
    } else if (point === 'bottom-right') {
      point = {
        x: '100%',
        y: '100%'
      };
    } else if (point === 'bottom') {
      point = {
        x: '50%',
        y: '100%'
      };
    } else if (point === 'bottom-left') {
      point = {
        x: 0,
        y: '100%'
      };
    } else if (point === 'left') {
      point = {
        x: 0,
        y: '50%'
      };
    } else if (point === 'middle') {
      point = {
        x: '50%',
        y: '50%'
      };
    } else {
      throw new Error("Unknown point option ".concat(point));
    }
  }

  if (typeof point.x === 'string') {
    point.x = (rect.right - rect.left) * (parseFloat(point.x) / 100);
  }

  if (typeof point.y === 'string') {
    point.y = (rect.bottom - rect.top) * (parseFloat(point.y) / 100);
  }

  if (constrain) {
    if (typeof constrain.left === 'string') {
      constrain.left = (rect.right - rect.left) * (parseFloat(constrain.left) / 100);
    }

    if (typeof constrain.right === 'string') {
      constrain.right = (rect.right - rect.left) * (parseFloat(constrain.right) / 100);
    }

    if (typeof constrain.top === 'string') {
      constrain.top = (rect.bottom - rect.top) * (parseFloat(constrain.top) / 100);
    }

    if (typeof constrain.bottom === 'string') {
      constrain.bottom = (rect.bottom - rect.top) * (parseFloat(constrain.bottom) / 100);
    }

    point.x = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(point.x, constrain.left, constrain.right);
    point.y = Object(_utility__WEBPACK_IMPORTED_MODULE_1__["clamp"])(point.y, constrain.top, constrain.bottom);
  }

  if (offset) {
    if (Array.isArray(offset)) {
      offset = {
        x: offset[0],
        y: offset[1]
      };
    }

    if (offset.x !== null) {
      point.x += offset.x;
    }

    if (offset.y !== null) {
      point.y += offset.y;
    }
  }

  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"](rect.left + point.x, rect.top + point.y);
}
/**
 * Gets the bounding client rect for a rectangle defined by the position rectangle with left, top, right and bottom
 * properties relative to the element's position.
 *
 * @param element {{getBoundingClientRect}|Element|String|{left, top, right, bottom}}
 * @param position {{left, top, bottom, right}}
 * @return {Rect}
 */

function getSubBoundingBox(element, position) {
  var rect; // Get the bounding client rect of the element.   The user should have passed either a css selector, an object with a
  // getBoundingClientRect interface.  Or a bounding client rect directly.

  if (element.getBoundingClientRect) {
    rect = element.getBoundingClientRect();
  } else if (typeof element === 'string') {
    rect = document.querySelector(element).getBoundingClientRect();
  } else {
    rect = element;
  }

  var width = rect.right - rect.left,
      height = rect.bottom - rect.top; // The user can pass a rect with left, top, right and bottom properties.  The value can either be the desired
  // coordinates relative to the top-left corner of the reference element or a percentage.  Another possibility
  // is that the user passes one of the keyword properties that coorispond to a specific section of the element.
  // Map those keywords to their rectangle.

  if (typeof position === 'string') {
    if (position === 'border-top') {
      position = {
        left: 0,
        right: '100%',
        top: 0,
        bottom: 0
      };
    } else if (position === 'border-right') {
      position = {
        left: '100%',
        right: '100%',
        top: 0,
        bottom: '100%'
      };
    } else if (position === 'border-bottom') {
      position = {
        left: 0,
        right: '100%',
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'border-left') {
      position = {
        left: 0,
        top: 0,
        right: 0,
        bottom: '100%'
      };
    } else if (position === 'top-left') {
      position = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    } else if (position === 'top') {
      position = {
        top: 0,
        left: '50%',
        right: '50%',
        bottom: 0
      };
    } else if (position === 'top-right') {
      position = {
        top: 0,
        left: '100%',
        right: '100%',
        bottom: 0
      };
    } else if (position === 'left') {
      position = {
        left: 0,
        top: '50%',
        bottom: '50%',
        right: 0
      };
    } else if (position === 'origin') {
      position = {
        left: '50%',
        right: '50%',
        top: '50%',
        bottom: '50%'
      };
    } else if (position === 'bottom-left') {
      position = {
        left: 0,
        right: 0,
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'bottom') {
      position = {
        left: '50%',
        right: '50%',
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'bottom-right') {
      position = {
        left: '100%',
        right: '100%',
        top: '100%',
        bottom: '100%'
      };
    } else if (position === 'right') {
      position = {
        left: '100%',
        right: '100%',
        top: '50%',
        bottom: '50%'
      };
    }
  }

  position.left = position.left || 0;
  position.right = position.right || 0;
  position.top = position.top || 0;
  position.bottom = position.bottom || 0; // left and right percentages are a percentage of the elements width.
  // top and bottom percentages are a percentage of the elements height.

  if (typeof position.left === 'string') {
    position.left = parseFloat(position.left) / 100 * width;
  }

  if (typeof position.right === 'string') {
    position.right = parseFloat(position.right) / 100 * width;
  }

  if (typeof position.bottom === 'string') {
    position.bottom = parseFloat(position.bottom) / 100 * height;
  }

  if (typeof position.top === 'string') {
    position.top = parseFloat(position.top) / 100 * height;
  } // Convert to client space.


  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left + position.left, rect.top + position.top, rect.left + position.right, rect.top + position.bottom);
}
/**
 * Returns the distance in between the provided Rect objects.  If the objects are touching or overlapping 0
 * will be returned.
 *
 * @param rect1 {{left, top, right, bottom}}
 * @param rect2 {{left, top, right, bottom}}
 * @returns {Number}
 */

function getDistanceBetweenRects(rect1, rect2) {
  var vec1 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect1),
      vec2 = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect2);
  var isXOverlapping = vec1.isXOverlapping(vec2),
      isYOverlapping = vec1.isYOverlapping(vec2);

  if (isXOverlapping && isYOverlapping) {
    // Items are overlapping
    return 0;
  } else if (isXOverlapping) {
    return Math.min(Math.abs(vec1.bottom - vec2.top), Math.abs(vec1.top - vec2.bottom));
  } else if (isYOverlapping) {
    return Math.min(Math.abs(vec1.right - vec2.left), Math.abs(vec1.left - vec2.right));
  } else {
    var x1, y1, x2, y2;

    if (vec1.right <= vec2.left) {
      x1 = vec1.right;
      x2 = vec2.left;
    } else {
      x1 = vec1.left;
      x2 = vec2.right;
    }

    if (vec1.bottom <= vec2.top) {
      y1 = vec1.bottom;
      y2 = vec2.top;
    } else {
      y1 = vec1.top;
      y2 = vec2.bottom;
    } // Use distance formula to calculate distance.


    return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
  }
}
/**
 * Returns the top and left position of an element relative to the document.
 *
 * @param element
 * @return {{top: number, left: number}}
 */

function getElementOffset(element) {
  var box = element.getBoundingClientRect();
  return {
    left: box.left + window.pageXOffset,
    top: box.top + window.pageYOffset
  };
}
/**
 * Sets an elements position relative to the document.
 *
 * @param element
 * @param coords
 */

function setElementOffset(element, coords) {
  if (coords.nodeType) {
    coords = getElementOffset(element);
  } else if (Array.isArray(coords)) {
    coords = {
      left: coords.left,
      top: coords.top
    };
  }

  var offset = element.getBoundingClientRect();
  var style = getComputedStyle(element),
      left = parseInt(style.left, 10) || 0,
      top = parseInt(style.top, 10) || 0;
  element.style.left = left + (coords.left - offset.left) + 'px';
  element.style.top = top + (coords.top - offset.top) + 'px';
}


/***/ }),

/***/ "./src/core/vectors/RGBA.js":
/*!**********************************!*\
  !*** ./src/core/vectors/RGBA.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RGBA; });
/* harmony import */ var _Vec4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vec4 */ "./src/core/vectors/Vec4.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var regPercentage = /^(\d+\.?\d*)%$/;

var RGBA =
/*#__PURE__*/
function (_Vec) {
  _inherits(RGBA, _Vec);

  function RGBA(r, g, b, a) {
    var _this;

    _classCallCheck(this, RGBA);

    if (_typeof(r) === 'object') {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(RGBA).call(this, r));
    } else {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(RGBA).call(this, r, g, b, a));
    }

    return _possibleConstructorReturn(_this);
  }

  _createClass(RGBA, [{
    key: "toString",
    value: function toString() {
      return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.a, ")");
    }
  }], [{
    key: "parseRGBAColorStringArgs",
    value: function parseRGBAColorStringArgs(value) {
      value = value.trim().split(/\s+/);
      var r = value[0],
          g = value[1],
          b = value[2],
          a = value[3];

      if (r) {
        if (regPercentage.test(r)) {
          r = parseFloat(r) / 100 * 255;
        } else {
          r = parseInt(r, 10);
        }
      }

      if (g) {
        if (regPercentage.test(g)) {
          g = parseFloat(g) / 100 * 255;
        } else {
          g = parseInt(g, 10);
        }
      }

      if (b) {
        if (regPercentage.test(b)) {
          b = parseFloat(b) / 100 * 255;
        } else {
          b = parseInt(b, 10);
        }
      }

      if (a) {
        if (regPercentage.test(a)) {
          a = parseFloat(a) / 100;
        } else {
          a = parseFloat(a);
        }
      }

      a = a || 1.0;
      return new RGBA(r, g, b, a);
    }
  }, {
    key: "parseHexColorStringArg",
    value: function parseHexColorStringArg(value) {
      value = value.trim().substring(1);
      var r,
          g,
          b,
          a = 1.0;

      if (value.length === 3) {
        r = value[0];
        g = value[1];
        b = value[2];
        r = parseInt(r + r, 16);
        g = parseInt(g + g, 16);
        b = parseInt(b + b, 16);
      } else if (value.length === 6) {
        r = value.substr(0, 2);
        g = value.substr(2, 2);
        b = value.substr(4, 2);
        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);
      } else if (value.length === 8) {
        r = value.substr(0, 2);
        g = value.substr(2, 2);
        b = value.substr(4, 2);
        a = value.substr(6, 2);
        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);
        a = parseInt(a, 16) / 255;
      }

      return new RGBA(r, g, b, a);
    }
  }]);

  return RGBA;
}(_Vec4__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/core/vectors/Vec3.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Vec3.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec3; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Stores a 3 value vector.
 */
var Vec3 =
/*#__PURE__*/
function () {
  function Vec3() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vec3);

    this[0] = x;
    this[1] = y;
    this[2] = z;
  }

  _createClass(Vec3, [{
    key: "set",
    value: function set(value) {
      if (_typeof(value) !== 'object') {
        this[0] = value;
        this[1] = value;
        this[2] = value;
      } else {
        this[0] = value[0];
        this[1] = value[1];
        this[2] = value[2];
      }
    }
  }, {
    key: "add",
    value: function add(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] + vec3, this[1] + vec3, this[2] + vec3);
      } else {
        return new Vec3(this[0] + vec3[0], this[1] + vec3[1], this[2] + vec3[2]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] - vec3, this[1] - vec3, this[2] - vec3);
      } else {
        return new Vec3(this[0] - vec3[0], this[1] - vec3[1], this[2] - vec3[2]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "scalar",
    value: function scalar(value) {
      return new Vec3(this[0] * value, this[1] * value, this[2] * value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "equals",
    value: function equals(vec3) {
      return vec3 === this || vec3[0] === this[0] && vec3[1] === this[1] && vec3[2] === this[2];
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "mod",
    value: function mod(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] % vec3, this[1] % vec3, this[2] % vec3);
      } else {
        return new Vec3(this[0] % vec3[0], this[1] % vec3[1], this[2] % vec3[2]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toHex",
    value: function toHex() {
      var r = Math.round(this.r).toString(16),
          g = Math.round(this.g).toString(16),
          b = Math.round(this.b).toString(16);

      if (r.length === 1) {
        r = '0' + r;
      }

      if (g.length === 1) {
        g = '0' + g;
      }

      if (b.length === 1) {
        b = '0' + b;
      }

      return "#".concat(r).concat(g).concat(b);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toRGB",
    value: function toRGB() {
      return "rgb(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ")");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toTranslate3d",
    value: function toTranslate3d() {
      return "translate3d(".concat(this.x, "px, ").concat(this.y, "px, ").concat(this.z, "px)");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "x",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "z",
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    }
  }, {
    key: "r",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "g",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "b",
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    }
  }], [{
    key: "fromHex",
    value: function fromHex(hex) {
      var m = /^#?([0-9a-f]{3})$/i.exec(hex);

      if (m) {
        hex = m[1][0] + m[1][0] + m[1][1] + m[1][1] + m[1][2] + m[1][2];
      } else {
        m = /^#?([0-9a-f]{6})$/i.exec(hex);

        if (m) {
          hex = m[1];
        } else {
          throw new Error("Could not parse value ".concat(hex));
        }
      }

      hex = parseInt(hex, 16); // r, g, b

      return new Vec3(hex & 0xff0000 >> 16, hex & 0x00ff00 >> 8, hex & 0x0000ff);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "fromRGB",
    value: function fromRGB(value) {
      var m = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(value);

      if (!m) {
        throw new Error("Could not parse rgb value ".concat(value));
      }

      return new Vec3(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10));
    }
  }]);

  return Vec3;
}();



/***/ }),

/***/ "./src/core/vectors/index.js":
/*!***********************************!*\
  !*** ./src/core/vectors/index.js ***!
  \***********************************/
/*! exports provided: Rect, Vec2, Vec3, Vec4, RGBA, UnitError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rect */ "./src/core/vectors/Rect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _Rect__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vec2 */ "./src/core/vectors/Vec2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Vec3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vec3 */ "./src/core/vectors/Vec3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return _Vec3__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Vec4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vec4 */ "./src/core/vectors/Vec4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return _Vec4__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _RGBA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RGBA */ "./src/core/vectors/RGBA.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return _RGBA__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnitError", function() { return _errors__WEBPACK_IMPORTED_MODULE_5__["UnitError"]; });









/***/ })

}]);
//# sourceMappingURL=chunk-1.bundle.js.map