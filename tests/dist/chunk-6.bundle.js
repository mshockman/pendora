(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[6],{

/***/ "./src/core/ui/Modal.js":
/*!******************************!*\
  !*** ./src/core/ui/Modal.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/core/Component.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Overlay */ "./src/core/ui/Overlay.js");
/* harmony import */ var _fx_Animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fx/Animation */ "./src/core/fx/Animation.js");
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





var Modal =
/*#__PURE__*/
function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$element = _ref.element,
        element = _ref$element === void 0 ? null : _ref$element,
        _ref$closeOnClick = _ref.closeOnClick,
        closeOnClick = _ref$closeOnClick === void 0 ? true : _ref$closeOnClick,
        _ref$showFX = _ref.showFX,
        showFX = _ref$showFX === void 0 ? null : _ref$showFX,
        _ref$hideFX = _ref.hideFX,
        hideFX = _ref$hideFX === void 0 ? null : _ref$hideFX,
        _ref$showDuration = _ref.showDuration,
        showDuration = _ref$showDuration === void 0 ? null : _ref$showDuration,
        _ref$hideDuration = _ref.hideDuration,
        hideDuration = _ref$hideDuration === void 0 ? null : _ref$hideDuration,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? null : _ref$timeout,
        _ref$removeOnHide = _ref.removeOnHide,
        removeOnHide = _ref$removeOnHide === void 0 ? false : _ref$removeOnHide;

    _classCallCheck(this, Modal);

    if (!element) {
      element = document.createElement('div');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, element));

    _overlay.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _this.element.classList.add('modal');

    _this.closeOnClick = closeOnClick;

    _classPrivateFieldSet(_assertThisInitialized(_this), _overlay, new _Overlay__WEBPACK_IMPORTED_MODULE_1__["default"](_this.element, {
      showFX: showFX,
      showDuration: showDuration,
      hideFX: hideFX,
      hideDuration: hideDuration,
      hiddenClassName: "closed",
      visibleClassName: "open",
      timeout: timeout,
      removeOnHide: removeOnHide
    }));

    _this.element.addEventListener('click', function (event) {
      var dismiss = event.target.closest("[data-dismiss]");

      if (dismiss || _this.closeOnClick && event.target === _this.element) {
        event.stopPropagation();

        _this.hide();
      }
    });

    if (_this.classList.contains('open')) {
      _this.show(true);
    } else {
      _this.hide(true);
    }

    return _this;
  }

  _createClass(Modal, [{
    key: "show",
    value: function () {
      var _show = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(immediate) {
        var promise, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = _classPrivateFieldGet(this, _overlay).show(immediate);
                this.publish('modal.show', this);
                _context.next = 4;
                return promise;

              case 4:
                result = _context.sent;

                if (result === _fx_Animation__WEBPACK_IMPORTED_MODULE_2__["default"].complete) {
                  this.publish('modal.visible');
                }

                return _context.abrupt("return", result);

              case 7:
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
        var promise, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promise = _classPrivateFieldGet(this, _overlay).hide(immediate);
                this.publish('modal.hide', this);
                _context2.next = 4;
                return promise;

              case 4:
                result = _context2.sent;

                if (result === _fx_Animation__WEBPACK_IMPORTED_MODULE_2__["default"].complete) {
                  this.publish('modal.hidden', this);
                }

                return _context2.abrupt("return", result);

              case 7:
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
    key: "isVisible",
    get: function get() {
      return this.state === _Overlay__WEBPACK_IMPORTED_MODULE_1__["default"].visible || this.state === _Overlay__WEBPACK_IMPORTED_MODULE_1__["default"].showing;
    }
  }, {
    key: "state",
    get: function get() {
      return _classPrivateFieldGet(this, _overlay).state;
    }
  }]);

  return Modal;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _overlay = new WeakMap();



/***/ }),

/***/ "./tests/src/test_modal.js":
/*!*********************************!*\
  !*** ./tests/src/test_modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestModalPage; });
/* harmony import */ var _src_core_ui_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/core/ui/Modal */ "./src/core/ui/Modal.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TestModalPage =
/*#__PURE__*/
function () {
  function TestModalPage() {
    _classCallCheck(this, TestModalPage);
  }

  _createClass(TestModalPage, [{
    key: "load",
    value: function load() {
      var modal = new _src_core_ui_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]({
        element: '#my-modal'
      });
      modal.on('modal.hidden', function () {
        console.log("modal hidden", modal.isVisible);
      });
      modal.on('modal.hide', function () {
        console.log("modal hiding");
      });
      modal.on('modal.show', function () {
        console.log("modal showing");
      });
      modal.on("modal.visible", function () {
        console.log("modal visible");
      });
      document.querySelector("#show-modal1-btn").addEventListener('click', function () {
        modal.show();
      });
      this.modal = modal;
      window.testModal = modal;
    }
  }]);

  return TestModalPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-6.bundle.js.map