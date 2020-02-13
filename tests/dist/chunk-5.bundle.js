(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[5],{

/***/ "./src/core/ui/Notification.js":
/*!*************************************!*\
  !*** ./src/core/ui/Notification.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Notification; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overlay */ "./src/core/ui/Overlay.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
/* harmony import */ var _fx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fx/effects */ "./src/core/fx/effects.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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





var ANIMATIONS = {
  slideInY: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["SlideInY"],
  slideOutY: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["SlideOutY"],
  slideInX: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["SlideInX"],
  slideOutX: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["SlideOutX"],
  fadeIn: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["FadeIn"],
  fadeOut: _fx_effects__WEBPACK_IMPORTED_MODULE_3__["FadeOut"]
};
var PLACEMENTS = {};

for (var _i = 0, _arr = ['top-left', 'top-right', 'left', 'right', 'bottom-left', 'bottom-right']; _i < _arr.length; _i++) {
  var placement = _arr[_i];
  var node = document.createElement('div');
  node.className = "notification-placement-".concat(placement, " notification-placement-body");
  PLACEMENTS[placement] = node;
}

for (var _i2 = 0, _arr2 = ['top', 'bottom']; _i2 < _arr2.length; _i2++) {
  var _placement = _arr2[_i2];

  var _node = document.createElement('div'),
      body = document.createElement('div');

  _node.className = "notification-placement-".concat(_placement);
  body.className = 'notification-placement-body';

  _node.appendChild(body);

  PLACEMENTS[_placement] = _node;
}

function basicNotificationTemplate(context) {
  var element = document.createElement('div'),
      inner = document.createElement('div'),
      textContainer = document.createElement('div'),
      iconContainer = document.createElement('div');
  element.appendChild(inner);
  element.className = "notification";
  inner.className = "notification__inner";
  textContainer.classname = "notification__text";
  iconContainer.className = "notification__icon";
  textContainer.innerHTML = context.text || "";

  if (context.text) {
    textContainer.innerHTML = context.text;
  }

  if (context.icon) {
    iconContainer.innerHTML = context.icon;
  }

  inner.appendChild(iconContainer);
  inner.appendChild(textContainer);

  if (context.className) {
    Object(_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(element, context.className);
  }

  return element;
}

var BASIC_NOTIFICATIONS = {
  success: {
    className: "success",
    template: basicNotificationTemplate,
    timeout: 5000,
    showFX: 'slideInY',
    showDuration: 400,
    hideFX: "slideOutY",
    hideDuration: 200,
    closeOnClick: true,
    icon: "<i class=\"fas fa-check-square\"></i>"
  },
  danger: {
    className: "error",
    template: basicNotificationTemplate,
    timeout: 5000,
    showFX: 'slideInY',
    showDuration: 400,
    hideFX: "slideOutY",
    hideDuration: 200,
    closeOnClick: true,
    icon: "<i class=\"fas fa-exclamation\"></i>"
  },
  warning: {
    className: "warning",
    template: basicNotificationTemplate,
    timeout: 5000,
    showFX: 'slideInY',
    showDuration: 400,
    hideFX: "slideOutY",
    hideDuration: 200,
    closeOnClick: true,
    icon: "<i class=\"fas fa-exclamation-triangle\"></i>"
  },
  info: {
    className: "info",
    template: basicNotificationTemplate,
    timeout: 5000,
    showFX: 'slideInY',
    showDuration: 400,
    hideFX: "slideOutY",
    hideDuration: 200,
    closeOnClick: true,
    icon: "<i class=\"fas fa-info\"></i>"
  }
};

var Notification =
/*#__PURE__*/
function (_Component) {
  _inherits(Notification, _Component);

  function Notification(element) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$closeOnClick = _ref.closeOnClick,
        closeOnClick = _ref$closeOnClick === void 0 ? false : _ref$closeOnClick,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout,
        _ref$showFX = _ref.showFX,
        showFX = _ref$showFX === void 0 ? 'slideInY' : _ref$showFX,
        _ref$showDuration = _ref.showDuration,
        showDuration = _ref$showDuration === void 0 ? 200 : _ref$showDuration,
        _ref$hideFX = _ref.hideFX,
        hideFX = _ref$hideFX === void 0 ? 'slideOutY' : _ref$hideFX,
        _ref$hideDuration = _ref.hideDuration,
        hideDuration = _ref$hideDuration === void 0 ? 200 : _ref$hideDuration,
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? null : _ref$className,
        _ref$id = _ref.id,
        id = _ref$id === void 0 ? null : _ref$id;

    _classCallCheck(this, Notification);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Notification).call(this, element));

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

    if (className) {
      Object(_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(_this.element, className);
    }

    if (id) {
      _this.element.id = id;
    }

    _classPrivateFieldSet(_assertThisInitialized(_this), _overlay, new _Overlay__WEBPACK_IMPORTED_MODULE_1__["default"](_this.element, {
      showFX: showFX,
      showDuration: showDuration,
      hideFX: hideFX,
      hideDuration: hideDuration,
      removeOnHide: true,
      timeout: timeout
    }));

    _this.closeOnClick = closeOnClick;

    _this.hide(true);

    _this.element.addEventListener('click', function (event) {
      var dismiss = event.target.closest("[data-dismiss]");

      if (dismiss || _this.closeOnClick) {
        if (_this.state === _Overlay__WEBPACK_IMPORTED_MODULE_1__["default"].visible || _this.state === _Overlay__WEBPACK_IMPORTED_MODULE_1__["default"].showing) {
          _this.hide();
        }
      }
    });

    return _this;
  }

  _createClass(Notification, [{
    key: "show",
    value: function () {
      var _show = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(immediate) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _classPrivateFieldGet(this, _overlay).show(immediate));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function show(_x) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: "hide",
    value: function () {
      var _hide = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(immediate) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _classPrivateFieldGet(this, _overlay).hide(immediate));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hide(_x2) {
        return _hide.apply(this, arguments);
      }

      return hide;
    }()
  }, {
    key: "state",
    get: function get() {
      return _classPrivateFieldGet(this, _overlay).state;
    }
  }], [{
    key: "notify",
    value: function notify(message, type, options) {
      var config = _objectSpread({
        placement: "top-left"
      }, BASIC_NOTIFICATIONS.success);

      if (typeof type === 'string') {
        config = _objectSpread({}, config, {}, BASIC_NOTIFICATIONS[type]);
      } else if (_typeof(type) === 'object') {
        config = _objectSpread({}, config, {}, type);
      }

      if (_typeof(options) === 'object') {
        config = _objectSpread({}, config, {}, options);
      }

      config.text = message;
      var element = config.template(config);
      var notification = new this(element, config);
      var placement = config.placement;

      if (typeof placement === 'string') {
        placement = PLACEMENTS[placement];

        if (placement && !placement.parentElement) {
          document.body.appendChild(placement);
        }
      }

      if (placement) {
        var container;

        if (placement.classList.contains('notification-placement-body')) {
          container = placement;
        } else {
          container = document.querySelector('.notification-placement-body');
        }

        if (!container) container = placement;
        notification.appendTo(container);
      }

      notification.show();
      return placement;
    }
  }]);

  return Notification;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _overlay = new WeakMap();



/***/ }),

/***/ "./tests/src/test_notifications.js":
/*!*****************************************!*\
  !*** ./tests/src/test_notifications.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NotificationTestPage; });
/* harmony import */ var _src_core_ui_Notification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/core/ui/Notification */ "./src/core/ui/Notification.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var NotificationTestPage =
/*#__PURE__*/
function () {
  function NotificationTestPage() {
    _classCallCheck(this, NotificationTestPage);
  }

  _createClass(NotificationTestPage, [{
    key: "load",
    value: function load() {
      // let notification = new BasicNotificationMessage("Hello World!");
      // notification.appendTo(document.body);
      // notification.id = "test-notification-1";
      var testButtons = document.querySelector('#test-buttons');
      testButtons.addEventListener('click', function (event) {
        var button = event.target.closest('button');
        if (!button) return;
        var text = button.innerText,
            placement = text.toLowerCase().replace(" ", "-");
        _src_core_ui_Notification__WEBPACK_IMPORTED_MODULE_0__["default"].notify("Hello World This is A long Message!", "success", {
          placement: placement,
          closeOnClick: true
        });
      });
    }
  }]);

  return NotificationTestPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-5.bundle.js.map