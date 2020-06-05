(window["webpackJsonppendora"] = window["webpackJsonppendora"] || []).push([[3],{

/***/ "./docs/js/pages/documentation/datagrid/page_dataheader.js":
/*!*****************************************************************!*\
  !*** ./docs/js/pages/documentation/datagrid/page_dataheader.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataHeaderPage; });
/* harmony import */ var datagrid_DataGridHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datagrid/DataGridHeader */ "./src/datagrid/DataGridHeader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DataHeaderPage =
/*#__PURE__*/
function () {
  function DataHeaderPage() {
    _classCallCheck(this, DataHeaderPage);
  }

  _createClass(DataHeaderPage, [{
    key: "load",
    value: function load() {
      var header = new datagrid_DataGridHeader__WEBPACK_IMPORTED_MODULE_0__["default"]({
        columns: [{
          label: "Test #1",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #2",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #3",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #4",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }, {
          label: "Test #5",
          resizeable: true,
          tableSort: true,
          minWidth: 100,
          width: 200
        }]
      });
      header.appendTo("#data-grid-header-container1");
    }
  }]);

  return DataHeaderPage;
}();



/***/ }),

/***/ "./src/datagrid/DataGridHeader.js":
/*!****************************************!*\
  !*** ./src/datagrid/DataGridHeader.js ***!
  \****************************************/
/*! exports provided: default, DataColumn */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/matthewshockman/WebstormProjects/pendora/src/datagrid/DataGridHeader.js: Unexpected token (45:12)\n\n\u001b[0m \u001b[90m 43 | \u001b[39m            \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39m\u001b[33m#\u001b[39msorter \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mSortable\u001b[39m(\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39m\u001b[33m#\u001b[39melement\u001b[33m,\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 44 | \u001b[39m                helper\u001b[33m:\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 45 | \u001b[39m            })\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 46 | \u001b[39m        }\u001b[0m\n\u001b[0m \u001b[90m 47 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 48 | \u001b[39m        \u001b[36mif\u001b[39m(columns) {\u001b[0m\n    at Parser.raise (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/location.js:41:63)\n    at Parser.unexpected (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/util.js:150:16)\n    at Parser.parseExprAtom (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1123:20)\n    at Parser.parseExprSubscripts (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:529:23)\n    at Parser.parseMaybeUnary (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:509:21)\n    at Parser.parseExprOps (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:279:23)\n    at Parser.parseMaybeConditional (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:234:23)\n    at Parser.parseMaybeAssign (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:185:21)\n    at Parser.parseObjectProperty (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1725:16)\n    at Parser.parseObjPropValue (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1775:12)\n    at Parser.parseObjectMember (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1617:10)\n    at Parser.parseObj (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1514:25)\n    at Parser.parseExprAtom (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1059:26)\n    at Parser.parseExprSubscripts (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:529:23)\n    at Parser.parseMaybeUnary (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:509:21)\n    at Parser.parseExprOps (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:279:23)\n    at Parser.parseMaybeConditional (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:234:23)\n    at Parser.parseMaybeAssign (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:185:21)\n    at Parser.parseExprListItem (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:2077:18)\n    at Parser.parseExprList (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:2046:22)\n    at Parser.parseNewArguments (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1444:25)\n    at Parser.parseNew (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1438:10)\n    at Parser.parseExprAtom (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:1075:21)\n    at Parser.parseExprSubscripts (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:529:23)\n    at Parser.parseMaybeUnary (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:509:21)\n    at Parser.parseExprOps (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:279:23)\n    at Parser.parseMaybeConditional (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:234:23)\n    at Parser.parseMaybeAssign (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:185:21)\n    at Parser.parseMaybeAssign (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:215:25)\n    at Parser.parseExpression (/Users/matthewshockman/WebstormProjects/pendora/node_modules/@babel/core/node_modules/@babel/parser/src/parser/expression.js:133:23)");

/***/ })

}]);
//# sourceMappingURL=chunk-3.bundle.js.map