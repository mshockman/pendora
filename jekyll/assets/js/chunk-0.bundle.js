(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[0],{

/***/ "./jekyll/js/pages/menu_examples.js":
/*!******************************************!*\
  !*** ./jekyll/js/pages/menu_examples.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBarExamplePage; });
/* harmony import */ var menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! menu */ "./src/menu/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MenuBarExamplePage =
/*#__PURE__*/
function () {
  function MenuBarExamplePage() {
    _classCallCheck(this, MenuBarExamplePage);
  }

  _createClass(MenuBarExamplePage, [{
    key: "buildTestMenu",
    value: function buildTestMenu(deep, items) {
      var _this = this;

      var _n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var text = function text(x) {
        return "#Child Item #".concat(x);
      };

      if (_n === 0) text = function text(x) {
        return "#Root Item #".concat(x);
      };
      var r = [];

      var _loop = function _loop(i) {
        var node = {
          text: text(i)
        };

        if (_n < deep) {
          node.submenu = {
            children: _this.buildTestMenu(deep, items, _n + 1)
          };
        } else {
          node.href = '#';

          node.action = function () {
            return alert("".concat(node.text, " clicked"));
          };
        }

        r.push(node);
      };

      for (var i = 0; i < items; i++) {
        _loop(i);
      }

      return r;
    }
  }, {
    key: "load",
    value: function load() {
      var main = document.getElementById('content');
      var menu = new menu__WEBPACK_IMPORTED_MODULE_0__["MenuBar"]({
        timeout: 2000,
        autoActivate: false,
        multiple: false
      });
      var data = this.buildTestMenu(3, 5);
      menu.createItems(data);
      menu.appendTo("#menubar_1");
      window.menu = menu;
      this.initFromJsonExample();
      this.initImperativelyExample();
    }
  }, {
    key: "initImperativelyExample",
    value: function initImperativelyExample() {
      var container = document.getElementById('init-menu-imperatively');
      var menu = new menu__WEBPACK_IMPORTED_MODULE_0__["Menu"]();
      menu.append(new menu__WEBPACK_IMPORTED_MODULE_0__["MenuItem"]({
        text: "Item #1",
        action: function action() {
          return alert("Item #1 Clicked");
        }
      }));
      menu.append(new menu__WEBPACK_IMPORTED_MODULE_0__["MenuItem"]({
        text: "Item #2",
        action: function action() {
          return alert("Item #2 Clicked");
        }
      }));
      menu.append(new menu__WEBPACK_IMPORTED_MODULE_0__["MenuItem"]({
        text: "Item #3",
        action: function action() {
          return alert("Item #3 Clicked");
        }
      }));
      menu.append(new menu__WEBPACK_IMPORTED_MODULE_0__["MenuItem"]({
        text: "Item #4",
        action: function action() {
          return alert("Item #4 Clicked");
        }
      }));
      menu.append(new menu__WEBPACK_IMPORTED_MODULE_0__["MenuItem"]({
        text: "Item #5",
        action: function action() {
          return alert("Item #5 Clicked");
        }
      }));
      menu.isVisible = true;
      menu.addClass('vertical-menu');
      menu.removeClass('menu');
      menu.appendTo(container);
    }
  }, {
    key: "initFromJsonExample",
    value: function initFromJsonExample() {
      var menu = new menu__WEBPACK_IMPORTED_MODULE_0__["Menu"]({
        closeOnBlur: true,
        closeOnSelect: true
      });
      menu.isVisible = true;
      menu.createItems([{
        text: "Item #1",
        submenu: {
          children: [{
            text: "SubItem #1",
            href: "#"
          }, {
            text: "SubItem #2",
            href: "#"
          }, {
            text: "SubItem #3",
            href: "#"
          }, {
            text: "SubItem #4",
            href: "#"
          }, {
            text: "SubItem #5",
            href: "#"
          }]
        }
      }, {
        text: "Item #2",
        submenu: {
          children: [{
            text: "SubItem #1",
            href: "#"
          }, {
            text: "SubItem #2",
            href: "#"
          }, {
            text: "SubItem #3",
            href: "#"
          }, {
            text: "SubItem #4",
            href: "#"
          }, {
            text: "SubItem #5",
            href: "#"
          }]
        }
      }, {
        text: "Item #3",
        submenu: {
          children: [{
            text: "SubItem #1",
            href: "#"
          }, {
            text: "SubItem #2",
            href: "#"
          }, {
            text: "SubItem #3",
            href: "#"
          }, {
            text: "SubItem #4",
            href: "#"
          }, {
            text: "SubItem #5",
            href: "#"
          }]
        }
      }, {
        text: "Item #4",
        submenu: {
          children: [{
            text: "SubItem #1",
            href: "#"
          }, {
            text: "SubItem #2",
            href: "#"
          }, {
            text: "SubItem #3",
            href: "#"
          }, {
            text: "SubItem #4",
            href: "#"
          }, {
            text: "SubItem #5",
            href: "#"
          }]
        }
      }, {
        text: "Item #5",
        submenu: {
          children: [{
            text: "SubItem #1",
            href: "#"
          }, {
            text: "SubItem #2",
            href: "#"
          }, {
            text: "SubItem #3",
            href: "#"
          }, {
            text: "SubItem #4",
            href: "#"
          }, {
            text: "SubItem #5",
            href: "#"
          }]
        }
      }]);
      menu.style.position = 'static';
      menu.style.width = '16rem';
      menu.appendTo("#init-menu-from-json");
    }
  }]);

  return MenuBarExamplePage;
}();



/***/ })

}]);
//# sourceMappingURL=chunk-0.bundle.js.map