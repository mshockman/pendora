(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[6],{

/***/ "./docs/js/pages/documentation/test_animation.js":
/*!*******************************************************!*\
  !*** ./docs/js/pages/documentation/test_animation.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestAnimationPage; });
/* harmony import */ var core_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/vectors */ "./src/core/vectors/index.js");
/* harmony import */ var core_fx_Animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/fx/Animation */ "./src/core/fx/Animation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



window.Animation = core_fx_Animation__WEBPACK_IMPORTED_MODULE_1__["default"];
window.testAnimation = new core_fx_Animation__WEBPACK_IMPORTED_MODULE_1__["default"]({
  frames: {
    '0%': {
      left: '0px',
      top: '0px',
      rotation: 0,
      scale: 1,
      opacity: 1,
      display: 'block',
      backgroundColor: new core_vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](255, 0, 0)
    },
    '50%': {
      left: '500px',
      top: '500px',
      scale: 0.25
    },
    '90%': {
      left: '700px',
      top: '100px'
    },
    '65%': {
      opacity: 1
    },
    '100%': {
      left: '1200px',
      top: '100px',
      rotation: 1440,
      scale: 2,
      opacity: 0,
      display: 'none',
      backgroundColor: new core_vectors__WEBPACK_IMPORTED_MODULE_0__["Vec3"](0, 0, 255)
    }
  },
  applyFrame: function applyFrame(fx, frame) {
    // console.log(frame);
    fx.element.style.transform = "translate(".concat(frame.left, ", ").concat(frame.top, ") rotate(").concat(frame.rotation, "deg) scale(").concat(frame.scale, ")");
    fx.element.style.display = frame.display;
    fx.element.style.background = frame.backgroundColor.toHex();
    if (frame.opacity) fx.element.style.opacity = frame.opacity;
  }
});

var TestAnimationPage = /*#__PURE__*/function () {
  function TestAnimationPage() {
    _classCallCheck(this, TestAnimationPage);
  }

  _createClass(TestAnimationPage, [{
    key: "load",
    value: function load() {
      var box1 = document.querySelector('#test_box1');
      var box2 = document.querySelector('#test_box2');
      window.fx1 = testAnimation.animate(box1, {
        duration: 10000
      });
      window.fx2 = testAnimation.animate(box2, {
        duration: 5000
      });
      window.fx1.then(function () {
        console.log("Animation Complete");
        return new Promise(function (resolve) {
          setTimeout(resolve, 2000);
        });
      }).then(function () {
        return console.log("Hello World!");
      });
    }
  }]);

  return TestAnimationPage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-6.bundle.js.map