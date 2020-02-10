(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[2],{

/***/ "./jekyll/js/pages/documentation/test_draggable.js":
/*!*********************************************************!*\
  !*** ./jekyll/js/pages/documentation/test_draggable.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestDraggablePage; });
/* harmony import */ var core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/ui/Draggable */ "./src/core/ui/Draggable.js");
/* harmony import */ var core_ui_Sortable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/Sortable */ "./src/core/ui/Sortable.js");
/* harmony import */ var core_data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/data.js */ "./src/core/data.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






window.privateCache = core_data_js__WEBPACK_IMPORTED_MODULE_2__["privateCache"];
window.getTranslation = core_ui_position__WEBPACK_IMPORTED_MODULE_3__["getTranslation"];
window.addEventListener('mousemove', function (event) {
  var output = document.getElementById('mouse-pos-client-output');
  output.innerText = "(".concat(event.clientX, ", ").concat(event.clientY, ")");
  output = document.getElementById('document-position-output');
  output.innerText = "(".concat(event.clientX + window.scrollX, ", ").concat(event.clientY + window.scrollY, ")");
});

var TestDraggablePage =
/*#__PURE__*/
function () {
  function TestDraggablePage() {
    _classCallCheck(this, TestDraggablePage);
  }

  _createClass(TestDraggablePage, [{
    key: "load",
    value: function load() {
      window.draggableBox1 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#test-draggable1", {
        container: core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client,
        helper: core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"].CLONE(0.5),
        revert: 1000
      });
      window.draggableWindow1 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]("#test-window1", {
        container: core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].client,
        handle: '.drag-handle'
      });
      window.draggableBox2 = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"]('#drop-test1-droppable', {
        droppables: '#drop-zone-test1'
      });
      window.draggableScrollable = new core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector("#scroll-draggable-test"), {
        scroll: 1,
        container: core_ui_Draggable__WEBPACK_IMPORTED_MODULE_0__["CONTAINERS"].viewport
      });
      window.sortableGrid = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_1__["default"]("#sortable-grid", {
        layout: 'xy',
        setPlaceholderSize: true
      });
      window.sortableList1 = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_1__["default"]('#drag-list-test', {
        droppables: '.drop-list',
        placeholder: true,
        setPlaceholderSize: true
      });
      window.sortableList2 = new core_ui_Sortable__WEBPACK_IMPORTED_MODULE_1__["default"]('#drag-list-test2', {
        droppables: '.drop-list',
        placeholder: true,
        setPlaceholderSize: true
      });
      document.querySelector('#drop-zone-test1').addEventListener('drop', function (event) {
        event.target.style.backgroundColor = '#00ff00';
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
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === void 0 ? false : _ref$disabled,
        _ref$distance = _ref.distance,
        distance = _ref$distance === void 0 ? null : _ref$distance,
        _ref$handle = _ref.handle,
        handle = _ref$handle === void 0 ? null : _ref$handle,
        _ref$helper = _ref.helper,
        helper = _ref$helper === void 0 ? null : _ref$helper,
        _ref$revert = _ref.revert,
        revert = _ref$revert === void 0 ? null : _ref$revert,
        _ref$scroll = _ref.scroll,
        scroll = _ref$scroll === void 0 ? null : _ref$scroll,
        _ref$droppables = _ref.droppables,
        droppables = _ref$droppables === void 0 ? null : _ref$droppables,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 'intersect' : _ref$tolerance,
        _ref$setHelperSize = _ref.setHelperSize,
        setHelperSize = _ref$setHelperSize === void 0 ? false : _ref$setHelperSize,
        _ref$grid = _ref.grid,
        grid = _ref$grid === void 0 ? null : _ref$grid;

    _classCallCheck(this, Sortable);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    this.draggable = new _Draggable__WEBPACK_IMPORTED_MODULE_1__["default"](this.element, {
      container: container,
      axis: axis,
      exclude: exclude,
      delay: delay,
      offset: offset,
      disabled: disabled,
      distance: distance,
      handle: handle,
      helper: helper,
      revert: revert,
      scroll: scroll,
      selector: items,
      droppables: droppables,
      tolerance: tolerance,
      setHelperSize: setHelperSize,
      grid: grid
    });
    this.items = items;
    this.layout = layout;
    this.placeholder = placeholder;
    this.dropOnEmpty = dropOnEmpty;
    this.accepts = accepts;
    this.setPlaceholderSize = setPlaceholderSize;
    this.initEvents();
  }
  /**
   * Initializes event listeners.
   */


  _createClass(Sortable, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var placeholder,
          isOver = false,
          init = false,
          target; // Attaches temporary events when drag starts.

      var initialize = function initialize(event) {
        init = true;
        target = event.detail.item;
        target.addEventListener('drag-move', onDragMove);
        target.addEventListener('drag-complete', onDragComplete);
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
          target.removeEventListener('drag-move', onDragMove);
          target.removeEventListener('drag-complete', onDragComplete);
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


      this.element.addEventListener('drag-enter', function (event) {
        if (_this.accepts && !event.detail.item.matches(_this.accepts)) {
          return;
        }

        isOver = true;

        if (!init) {
          initialize(event);
        }
      }); // Mark isOver state false.

      this.element.addEventListener('drag-leave', function () {
        isOver = false;
      }); // Initialize sorting that started on another sortable.

      this.element.addEventListener('drag-start', function (event) {
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
  }]);

  return Sortable;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-2.bundle.js.map