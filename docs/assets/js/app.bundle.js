(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pendora"] = factory();
	else
		root["pendora"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunk-" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/tests/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonppendora"] = window["webpackJsonppendora"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./jekyll/js/app.js":
/*!**************************!*\
  !*** ./jekyll/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app */ "./src/app.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
/* harmony import */ var menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! menu */ "./src/menu/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





__webpack_require__.p = "/assets/js/";
var app = new app__WEBPACK_IMPORTED_MODULE_1__["default"]({
  // 'menubar': () =>  import("./pages/menubar_example.js"),
  // 'menu_examples': () =>  import("./pages/menu_examples.js"),
  'menu_page_index': function menu_page_index() {
    return __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ./pages/menus/page_index */ "./jekyll/js/pages/menus/page_index.js"));
  },
  'documentation_dropdown': function documentation_dropdown() {
    return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./pages/documentation/dropdown */ "./jekyll/js/pages/documentation/dropdown.js"));
  },
  'test_draggable': function test_draggable() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! ./pages/documentation/test_draggable */ "./jekyll/js/pages/documentation/test_draggable.js"));
  },
  'test_sortable': function test_sortable() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ./pages/documentation/test_sortable */ "./jekyll/js/pages/documentation/test_sortable.js"));
  }
});
window.addEventListener('load',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!document.body.dataset.page) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return app.init(document.body.dataset.page);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
window.app = app;

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Application; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Page loader class.
 *
 * Allows for the class to registers application pages that can be dynamically loaded when needed.
 */
var Application =
/*#__PURE__*/
function () {
  function Application(classes) {
    _classCallCheck(this, Application);

    this.classes = {};
    this.page = null;
    this.isLoaded = false;
    this.register(classes);
  }
  /**
   * Register an dictionary of page importers.
   * @param classes
   */


  _createClass(Application, [{
    key: "register",
    value: function register(classes) {
      for (var key in classes) {
        if (classes.hasOwnProperty(key)) {
          this.registerPage(key, classes[key]);
        }
      }
    }
    /**
     * Register a single page.
     * @param name
     * @param importer
     */

  }, {
    key: "registerPage",
    value: function registerPage(name, importer) {
      if (this.classes.hasOwnProperty(name) && this.classes[name]) {
        throw new Error("Duplicate page class registered");
      }

      this.classes[name] = importer;
    }
    /**
     * Loads the page with the given context.
     * @param page
     * @param context
     */

  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(page, context) {
        var pageClassImporter, PageClass;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.page) {
                  _context.next = 2;
                  break;
                }

                throw new Error("Page is already loaded");

              case 2:
                // window.addEventListener('load', async () => {
                //     this.isLoaded = true;
                //
                //     const pageClassImporter = this.classes[page],
                //         PageClass = (await pageClassImporter()).default;
                //
                //     this.page = new PageClass(context);
                //     if(this.page.load) this.page.load();
                // });
                this.isLoaded = true;
                pageClassImporter = this.classes[page];
                _context.next = 6;
                return pageClassImporter();

              case 6:
                PageClass = _context.sent["default"];
                this.page = new PageClass(context);
                if (this.page.load) this.page.load();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x, _x2) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return Application;
}();



/***/ }),

/***/ "./src/autoloader.js":
/*!***************************!*\
  !*** ./src/autoloader.js ***!
  \***************************/
/*! exports provided: default, Toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toggle", function() { return Toggle; });
/* harmony import */ var _core_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/data */ "./src/core/data.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var AutoLoader =
/*#__PURE__*/
function () {
  function AutoLoader() {
    _classCallCheck(this, AutoLoader);

    this.registry = {};
  }

  _createClass(AutoLoader, [{
    key: "register",
    value: function register(name, func) {
      if (this.registry.hasOwnProperty(name) && this.registry[name]) {
        throw new Error("Duplicate component registered");
      }

      this.registry[name] = func;
    }
  }, {
    key: "load",
    value: function load(context) {
      if (!context) {
        context = document;
      } else if (typeof context === 'string') {
        context = document.querySelector(context);
      }

      var widgets = context.querySelectorAll('[data-init]');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = widgets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;
          var components = element.dataset.init.split(/\s+/),
              windowBind = element.dataset.windowBind;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = components[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var c = _step2.value;
              var parts = c.split(':'),
                  cls = this.registry[parts[0]],
                  namespace = parts.length > 1 ? parts[1] : '',
                  key = namespace ? "".concat(parts[0], ".").concat(parts[1]) : parts[0];

              if (cls) {
                var initialized = _core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].get(element, 'initialized');

                if (!initialized) {
                  initialized = {};
                  _core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].set(element, 'initialized', initialized);
                }

                if (!initialized[key]) {
                  initialized[key] = cls(element);

                  if (windowBind) {
                    window[windowBind] = initialized[key];
                  }
                } // else component is already loaded do nothing.  Could be encountered if load is called multiple times.

              } else {
                throw new Error("No component registered called ".concat(key));
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
    /**
     *  Registers a loader function will the global autoloader instance.
     *
     * @param name {String}
     * @param fn {function(HTMLElement) : Object}
     */

  }], [{
    key: "register",
    value: function register(name, fn) {
      return this.loader.register(name, fn);
    }
  }, {
    key: "load",
    value: function load(context) {
      return this.loader.load(context);
    }
  }, {
    key: "getInitializedInstance",
    value: function getInitializedInstance(element, name) {
      var initialized = _core_data__WEBPACK_IMPORTED_MODULE_0__["privateCache"].get(element, 'initialized');

      if (initialized) {
        return initialized[name] || null;
      } else {
        return null;
      }
    }
  }]);

  return AutoLoader;
}();
/**
 * A UI class that adds the toggle behavior to an element.
 * The Toggle behavior is added using the autoloader using `data-init="toggle"` attribute.
 * It will target another element and attempt to call the toggle method of an initialized component.
 *
 * The toggle class takes two configuration attributes, data-target and data-toggle.
 *
 * data-target determines what element is targeted.  It takes a css selector that will be passed to document.querySelector().
 *
 * data-toggle determines the initialized component to toggle.  It takes the name of the component registered with AutoLoader.
 * For instance if you are toggling on a modal you should pass modal here.
 *
 * If the component does not offer a toggle method and another method needs to be called, you can set the optional
 * attribute data-method.  This attribute determines what method is called and defaults to the string toggle.
 *
 * Example Usage:
 *
 * <button type="button" data-init="toggle" data-target="#myModalId" data-toggle="modal">Show Modal</button>
 *
 * ---
 *
 * # Toggle classes on and off
 *
 * If you want to toggle a class on the target element on or off the toggle needs to be a css class string.  For
 * example to toggle the class "test" with a button you can use the following code:
 *
 * <button type="button" data-init="toggle" data-target="#mytarget" data-toggle=".test">Toggle Class</button>
 *
 * ---
 * # Target self
 *
 * If you an element to target itself, specify the string "self" as the target.
 *
 * <button type="button" data-init="toggle" data-target="self" data-toggle=".test">Toggle Class</button>
 */


_defineProperty(AutoLoader, "autoLoad", true);


var Toggle =
/*#__PURE__*/
function () {
  function Toggle(element) {
    var _this = this;

    _classCallCheck(this, Toggle);

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else {
      this.element = element;
    }

    this._onClick = function (event) {
      _this.onClick(event);
    };

    this.element.addEventListener('click', this._onClick);
  }

  _createClass(Toggle, [{
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('click', this._onClick);
      this._onClick = null;
    }
  }, {
    key: "onClick",
    value: function onClick() {
      var target = this.element.dataset.target,
          toggle = this.element.dataset.toggle,
          method = this.element.dataset.method || 'toggle';

      if (target === 'self') {
        target = this.element;
      } else {
        target = document.querySelector(target);
      }

      if (toggle.startsWith('.')) {
        toggle = toggle.substr(1);
        target.classList.toggle(toggle);
      } else {
        var instance = AutoLoader.getInitializedInstance(target, toggle);

        if (instance) {
          instance[method](this.element);
        } else {
          throw new Error("Could not find initialized instance during toggle action.");
        }
      }
    }
  }]);

  return Toggle;
}();
AutoLoader.loader = new AutoLoader();
AutoLoader.register('toggle', function (element) {
  return new Toggle(element);
});
window.addEventListener('load', function () {
  if (AutoLoader.autoLoad) {
    AutoLoader.load();
  }
});

/***/ }),

/***/ "./src/core/Publisher.js":
/*!*******************************!*\
  !*** ./src/core/Publisher.js ***!
  \*******************************/
/*! exports provided: STOP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP", function() { return STOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Publisher; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TOPICS = Symbol('topics');
function STOP() {
  throw STOP;
}

var Publisher =
/*#__PURE__*/
function () {
  function Publisher() {
    _classCallCheck(this, Publisher);

    this[TOPICS] = {};
  }

  _createClass(Publisher, [{
    key: "on",
    value: function on(topic, callback) {
      if (!this[TOPICS][topic]) this[TOPICS][topic] = [];
      this[TOPICS][topic].push(callback);
      return this;
    }
  }, {
    key: "once",
    value: function once(topic, fn) {
      var _this = this;

      var on = function on() {
        _this.off(topic, fn);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return fn.apply(_this, args);
      };

      on.fn = fn;
      this.on(topic, fn);
      return this;
    }
  }, {
    key: "off",
    value: function off(topic, callback) {
      if (arguments.length === 0) {
        // CLear all topics.
        this[TOPICS] = {};
        return this;
      } else if (arguments.length === 1) {
        // Clear single topic.
        this[TOPICS][topic] = [];
        return this;
      }

      if (!this[TOPICS] || !this[TOPICS][topic] || !this[TOPICS][topic].length) {
        // Topic list was either empty or didn't exist.  No need to remove anything.  Return;
        return this;
      }

      var callbacks = this[TOPICS][topic];

      for (var i = 0; i < callback.length; i++) {
        var cb = callbacks[i];

        if (cb === callback || cb.fn === callback) {
          callbacks.splice(i, 1);
          break;
        }
      }

      if (callbacks.length === 0) {
        delete this[TOPICS][topic];
      }

      return this;
    }
  }, {
    key: "hasEvent",
    value: function hasEvent(topic, callback) {
      if (arguments.length === 1) {
        return !!this[TOPICS][topic];
      } else {
        var callbacks = this[TOPICS][topic];

        for (var i = 0; i < callbacks.length; i++) {
          var cb = callbacks[i];

          if (cb === callback || cb.fn === callback) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "publish",
    value: function publish(topic) {
      if (this[TOPICS][topic]) {
        var callbacks = this[TOPICS][topic].slice(0);

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cb = _step.value;

            try {
              cb.apply(this, args);
            } catch (e) {
              if (e === STOP) {
                return e;
              } else {
                throw e;
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
      }

      return true;
    }
  }]);

  return Publisher;
}();



/***/ }),

/***/ "./src/core/data.js":
/*!**************************!*\
  !*** ./src/core/data.js ***!
  \**************************/
/*! exports provided: Data, privateCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "privateCache", function() { return privateCache; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./src/core/utility/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var uuid = 1,
    prefix = 'p-' + ('' + Math.random()).replace(/\D/g, '');
var Data =
/*#__PURE__*/
function () {
  function Data() {
    _classCallCheck(this, Data);

    this.expando = "".concat(prefix, "-").concat(uuid++);
  }

  _createClass(Data, [{
    key: "cache",
    value: function cache(owner) {
      var cache = owner[this.expando];

      if (!cache) {
        cache = {};

        if (Data.acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = cache;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: cache,
              configurable: true
            });
          }
        } else {
          return null;
        }
      }

      return cache;
    }
  }, {
    key: "set",
    value: function set(owner, key, value) {
      var cache = this.cache(owner);

      if (_typeof(key) === 'object') {
        for (var prop in key) {
          cache[prop] = key[prop];
        }
      } else {
        cache[key] = value;
      }

      return cache;
    }
  }, {
    key: "get",
    value: function get(owner, key) {
      if (key === undefined) {
        return this.cache(owner);
      } else {
        var cache = owner[this.expando];

        if (cache) {
          return cache[key];
        }
      }
    }
  }, {
    key: "access",
    value: function access(owner, key, value) {
      if (arguments.length === 2) {
        if (_typeof(key) === 'object') {
          return this.set(owner, key);
        } else {
          return this.get(owner, key);
        }
      } else if (arguments.length === 1) {
        return this.cache(owner);
      } else if (arguments.length === 3) {
        return this.set(owner, key, value);
      }
    }
  }, {
    key: "remove",
    value: function remove(owner) {
      for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }

      var cache = owner[this.expando];
      if (!cache) return;

      if (arguments.length === 1) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            delete cache[key];
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
    }
  }, {
    key: "hasData",
    value: function hasData(owner) {
      var cache = owner[this.expando];
      return cache && !Object(_utility__WEBPACK_IMPORTED_MODULE_0__["isEmptyObject"])(cache);
    }
  }], [{
    key: "acceptData",
    value: function acceptData(owner) {
      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    }
  }]);

  return Data;
}();
var privateCache = new Data();

/***/ }),

/***/ "./src/core/errors.js":
/*!****************************!*\
  !*** ./src/core/errors.js ***!
  \****************************/
/*! exports provided: ExtendableError, IndexError, KeyError, ValueError, NotImplemented, ValidationError, AssertionError, UnitError, assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtendableError", function() { return ExtendableError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexError", function() { return IndexError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyError", function() { return KeyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueError", function() { return ValueError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotImplemented", function() { return NotImplemented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return ValidationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssertionError", function() { return AssertionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitError", function() { return UnitError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ExtendableError =
/*#__PURE__*/
function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    var _this;

    _classCallCheck(this, ExtendableError);

    // noinspection JSCheckFunctionSignatures
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ExtendableError).call(this, message));
    _this.name = _this.constructor.name; // noinspection JSUnresolvedVariable

    if (typeof Error.captureStackTrace === 'function') {
      // noinspection JSUnresolvedFunction
      Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }

    return _this;
  }

  return ExtendableError;
}(_wrapNativeSuper(Error));
var IndexError =
/*#__PURE__*/
function (_ExtendableError) {
  _inherits(IndexError, _ExtendableError);

  function IndexError() {
    _classCallCheck(this, IndexError);

    return _possibleConstructorReturn(this, _getPrototypeOf(IndexError).apply(this, arguments));
  }

  return IndexError;
}(ExtendableError);
var KeyError =
/*#__PURE__*/
function (_ExtendableError2) {
  _inherits(KeyError, _ExtendableError2);

  function KeyError() {
    _classCallCheck(this, KeyError);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyError).apply(this, arguments));
  }

  return KeyError;
}(ExtendableError);
var ValueError =
/*#__PURE__*/
function (_ExtendableError3) {
  _inherits(ValueError, _ExtendableError3);

  function ValueError() {
    _classCallCheck(this, ValueError);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValueError).apply(this, arguments));
  }

  return ValueError;
}(ExtendableError);
var NotImplemented =
/*#__PURE__*/
function (_ExtendableError4) {
  _inherits(NotImplemented, _ExtendableError4);

  function NotImplemented() {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotImplemented).apply(this, arguments));
  }

  return NotImplemented;
}(ExtendableError);
var ValidationError =
/*#__PURE__*/
function (_ExtendableError5) {
  _inherits(ValidationError, _ExtendableError5);

  function ValidationError(message, node) {
    var _this2;

    _classCallCheck(this, ValidationError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ValidationError).call(this, message));
    _this2.node = node;
    _this2.children = [];
    return _this2;
  }

  return ValidationError;
}(ExtendableError);
var AssertionError =
/*#__PURE__*/
function (_ExtendableError6) {
  _inherits(AssertionError, _ExtendableError6);

  function AssertionError(message) {
    _classCallCheck(this, AssertionError);

    return _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, message));
  }

  return AssertionError;
}(ExtendableError);
var UnitError =
/*#__PURE__*/
function (_ExtendableError7) {
  _inherits(UnitError, _ExtendableError7);

  function UnitError() {
    _classCallCheck(this, UnitError);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnitError).apply(this, arguments));
  }

  return UnitError;
}(ExtendableError);
/**
 * Asserts that a condition is true or raises an AssertionError.
 * @param condition - condition to check.
 * @param message - message on fail.
 * @throws AssertionError
 */

function assert(condition, message) {
  if (!condition) {
    throw new AssertionError(message);
  }
}

/***/ }),

/***/ "./src/core/serialize/Attribute.js":
/*!*****************************************!*\
  !*** ./src/core/serialize/Attribute.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Attribute; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/core/serialize/helper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Attribute =
/*#__PURE__*/
function () {
  function Attribute(type) {
    var missing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _helper__WEBPACK_IMPORTED_MODULE_1__["DROP"];
    var nullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var validator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Attribute);

    this.type = typeof type === 'function' ? new type() : type;
    this.missing = missing;
    this.nullable = nullable;
    this.validator = validator;
  }

  _createClass(Attribute, [{
    key: "deserialize",
    value: function deserialize(data, key) {
      var value = data[key];

      if (value === undefined) {
        if (this.missing === _helper__WEBPACK_IMPORTED_MODULE_1__["REQUIRED"]) {
          throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Attribute ".concat(key, " is required"));
        } else if (this.missing === _helper__WEBPACK_IMPORTED_MODULE_1__["DROP"]) {
          throw _helper__WEBPACK_IMPORTED_MODULE_1__["DROP"];
        } else {
          return this.missing;
        }
      } else if (value === null) {
        if (this.nullable === _helper__WEBPACK_IMPORTED_MODULE_1__["FALSE"] || this.nullable === _helper__WEBPACK_IMPORTED_MODULE_1__["REQUIRED"]) {
          throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Attribute ".concat(key, " cannot be null."));
        }

        if (this.nullable === null || this.nullable === _helper__WEBPACK_IMPORTED_MODULE_1__["TRUE"] || this.nullable === _helper__WEBPACK_IMPORTED_MODULE_1__["NULL"]) {
          return null;
        } else {
          return this.nullable;
        }
      }

      if (this.type) {
        value = this.type.deserialize(value);
      }

      if (this.validator) {
        value = this.validator(value);
      }

      return value;
    }
  }]);

  return Attribute;
}();

_defineProperty(Attribute, "DROP", _helper__WEBPACK_IMPORTED_MODULE_1__["DROP"]);

_defineProperty(Attribute, "TRUE", _helper__WEBPACK_IMPORTED_MODULE_1__["TRUE"]);

_defineProperty(Attribute, "FALSE", _helper__WEBPACK_IMPORTED_MODULE_1__["FALSE"]);

_defineProperty(Attribute, "REQUIRED", _helper__WEBPACK_IMPORTED_MODULE_1__["REQUIRED"]);



/***/ }),

/***/ "./src/core/serialize/AttributeSchema.js":
/*!***********************************************!*\
  !*** ./src/core/serialize/AttributeSchema.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AttributeSchema; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/core/serialize/helper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var AttributeSchema =
/*#__PURE__*/
function () {
  function AttributeSchema(attributes) {
    _classCallCheck(this, AttributeSchema);

    this.attributes = attributes;
  }

  _createClass(AttributeSchema, [{
    key: "deserialize",
    value: function deserialize(data) {
      var r = {};

      for (var key in this.attributes) {
        if (this.attributes.hasOwnProperty(key)) {
          try {
            r[key] = this.attributes[key].deserialize(data, key);
          } catch (e) {
            if (e !== _helper__WEBPACK_IMPORTED_MODULE_0__["DROP"]) {
              throw e;
            }
          }
        }
      }

      return r;
    }
  }]);

  return AttributeSchema;
}();



/***/ }),

/***/ "./src/core/serialize/helper.js":
/*!**************************************!*\
  !*** ./src/core/serialize/helper.js ***!
  \**************************************/
/*! exports provided: NULL, TRUE, FALSE, REQUIRED, DROP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NULL", function() { return NULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRUE", function() { return TRUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FALSE", function() { return FALSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUIRED", function() { return REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROP", function() { return DROP; });
var NULL = {},
    TRUE = {},
    FALSE = {},
    REQUIRED = {},
    DROP = {};

/***/ }),

/***/ "./src/core/serialize/index.js":
/*!*************************************!*\
  !*** ./src/core/serialize/index.js ***!
  \*************************************/
/*! exports provided: Attribute, AttributeSchema, Str, Integer, Bool, CompoundType, CSV, FALSE, Float, NULL, DROP, TRUE, REQUIRED, regex, range, length, choice, all, any, Type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Attribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attribute */ "./src/core/serialize/Attribute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return _Attribute__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _AttributeSchema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AttributeSchema */ "./src/core/serialize/AttributeSchema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeSchema", function() { return _AttributeSchema__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./src/core/serialize/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Str", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["Str"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Integer", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["Integer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bool", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["Bool"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompoundType", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["CompoundType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSV", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["CSV"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Float", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["Float"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["Type"]; });

/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validators */ "./src/core/serialize/validators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["regex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "range", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["range"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "length", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["length"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["choice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "all", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["all"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _validators__WEBPACK_IMPORTED_MODULE_3__["any"]; });

/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helper */ "./src/core/serialize/helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FALSE", function() { return _helper__WEBPACK_IMPORTED_MODULE_4__["FALSE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NULL", function() { return _helper__WEBPACK_IMPORTED_MODULE_4__["NULL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DROP", function() { return _helper__WEBPACK_IMPORTED_MODULE_4__["DROP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRUE", function() { return _helper__WEBPACK_IMPORTED_MODULE_4__["TRUE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REQUIRED", function() { return _helper__WEBPACK_IMPORTED_MODULE_4__["REQUIRED"]; });

/**
 * A module for creating schema that can be used to create objects that can serialize and deserialize data structures
 * into different formats.
 */







/***/ }),

/***/ "./src/core/serialize/types.js":
/*!*************************************!*\
  !*** ./src/core/serialize/types.js ***!
  \*************************************/
/*! exports provided: Type, Integer, Float, Bool, Str, CSV, CompoundType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Integer", function() { return Integer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Float", function() { return Float; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bool", function() { return Bool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Str", function() { return Str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSV", function() { return CSV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompoundType", function() { return CompoundType; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var REG_COMMA = /\s*,\s*/;
var Type =
/*#__PURE__*/
function () {
  function Type() {
    _classCallCheck(this, Type);
  }

  _createClass(Type, [{
    key: "deserialize",

    /**
     * @abstract
     * @param value
     */
    value: function deserialize(value) {}
    /**
     * @param value
     */

  }, {
    key: "serialize",
    value: function serialize(value) {
      return value;
    }
  }]);

  return Type;
}();
var Integer =
/*#__PURE__*/
function (_Type) {
  _inherits(Integer, _Type);

  function Integer() {
    var _this;

    var radix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var allowInfinity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Integer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Integer).call(this));
    _this.radix = radix;
    _this.allowInfinity = allowInfinity;
    return _this;
  }

  _createClass(Integer, [{
    key: "deserialize",
    value: function deserialize(value) {
      if (this.allowInfinity) {
        if (typeof value === 'string') {
          value = value.trim();
        }

        if (value === 'Infinity') {
          return Infinity;
        } else if (value === '-Infinity') {
          return -Infinity;
        }
      }

      value = parseInt(value, this.radix);

      if (Number.isNaN(value)) {
        throw Object(_errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"])("Could not parse integer.");
      }

      return value;
    }
  }]);

  return Integer;
}(Type);
var Float =
/*#__PURE__*/
function (_Type2) {
  _inherits(Float, _Type2);

  function Float() {
    var _this2;

    var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var allowInfinity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Float);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Float).call(this));
    _this2.fixed = fixed;
    _this2.allowInfinity = allowInfinity;
    return _this2;
  }

  _createClass(Float, [{
    key: "deserialize",
    value: function deserialize(value) {
      if (this.allowInfinity) {
        if (typeof value === 'string') {
          value = value.trim();
        }

        if (value === 'Infinity') {
          return Infinity;
        } else if (value === '-Infinity') {
          return -Infinity;
        }
      }

      if (this.fixed !== null) {
        value = (value + '').toFixed(this.fixed);
      }

      value = parseFloat(value);

      if (Number.isNaN(value)) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Could not parse float");
      }

      return value;
    }
  }]);

  return Float;
}(Type);
var Bool =
/*#__PURE__*/
function (_Type3) {
  _inherits(Bool, _Type3);

  function Bool() {
    _classCallCheck(this, Bool);

    return _possibleConstructorReturn(this, _getPrototypeOf(Bool).apply(this, arguments));
  }

  _createClass(Bool, [{
    key: "deserialize",
    value: function deserialize(value) {
      if (value === true || value === false) {
        return value;
      }

      if (typeof value === 'string') {
        value = value.toLowerCase().trim();

        if (value === 'true') {
          return true;
        } else if (value === 'false') {
          return false;
        }
      }

      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Could not parse boolean from value.");
    }
  }]);

  return Bool;
}(Type);
var Str =
/*#__PURE__*/
function (_Type4) {
  _inherits(Str, _Type4);

  function Str() {
    var _this3;

    var allow_empty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var transform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Str);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Str).call(this));
    _this3.allow_empty = allow_empty;
    _this3.trim = trim;
    _this3.transform = transform;
    return _this3;
  }

  _createClass(Str, [{
    key: "deserialize",
    value: function deserialize(value) {
      value = value + '';

      if (this.trim) {
        value = value.trim();
      }

      if (this.transform) {
        value = value.transform();
      }

      if (value === '' && !this.allow_empty) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("String cannot be empty");
      }

      return value;
    }
  }]);

  return Str;
}(Type);
var CSV =
/*#__PURE__*/
function (_Type5) {
  _inherits(CSV, _Type5);

  function CSV() {
    var _this4;

    var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REG_COMMA;

    _classCallCheck(this, CSV);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(CSV).call(this));
    _this4.separator = separator;
    return _this4;
  }

  _createClass(CSV, [{
    key: "deserialize",
    value: function deserialize(value) {
      var type = _typeof(value);

      if (type !== 'string') {
        throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Could not deserialize ".concat(type));
      }

      value = value.trim().split(this.separator);
      return value;
    }
  }, {
    key: "serialize",
    value: function serialize(value) {
      return value.join(', ');
    }
  }]);

  return CSV;
}(Type);
var CompoundType =
/*#__PURE__*/
function (_Type6) {
  _inherits(CompoundType, _Type6);

  function CompoundType() {
    var _this5;

    _classCallCheck(this, CompoundType);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(CompoundType).call(this));
    _this5.types = [];

    for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
      types[_key] = arguments[_key];
    }

    for (var _i = 0, _types = types; _i < _types.length; _i++) {
      var type = _types[_i];

      _this5.types.push(typeof type === 'function' ? new type() : type);
    }

    return _this5;
  }

  _createClass(CompoundType, [{
    key: "deserialize",
    value: function deserialize(value) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var t = _step.value;

          try {
            return t(value);
          } catch (e) {
            if (!(e instanceof _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"])) {
              throw e;
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

      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Value did not match any type.");
    }
  }]);

  return CompoundType;
}(Type);

/***/ }),

/***/ "./src/core/serialize/validators.js":
/*!******************************************!*\
  !*** ./src/core/serialize/validators.js ***!
  \******************************************/
/*! exports provided: choice, length, range, regex, all, any */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return choice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return regex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");

function choice() {
  for (var _len = arguments.length, choices = new Array(_len), _key = 0; _key < _len; _key++) {
    choices[_key] = arguments[_key];
  }

  return function (value) {
    if (choices.indexOf(value) === -1) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Invalid choice");
    }

    return value;
  };
}
function length() {
  var minLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (value) {
    var l = value.length;

    if (minLength !== null && l < minLength) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Array length is to small");
    }

    if (maxLength !== null && l > maxLength) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Array length is to big");
    }

    return value;
  };
}
function range() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (value) {
    if (min !== null && value < min) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Value is to small.");
    }

    if (max !== null && value > max) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Value is to big.");
    }

    return value;
  };
}
function regex(pattern) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var reg = flags ? new RegExp(pattern, flags) : new RegExp(pattern);
  return function (value) {
    if (!reg.test(value)) {
      throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Value did not match pattern.");
    }

    return value;
  };
}
function all() {
  for (var _len2 = arguments.length, validators = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    validators[_key2] = arguments[_key2];
  }

  return function (value) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var validator = _step.value;
        value = validator(value);
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

    return value;
  };
}
function any() {
  for (var _len3 = arguments.length, validators = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    validators[_key3] = arguments[_key3];
  }

  return function (value) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var validator = _step2.value;

        try {
          value = validator(value);
          return value;
        } catch (e) {
          if (!(e instanceof _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"])) {
            throw e;
          }
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

    throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValidationError"]("Value did not pass any validator.");
  };
}

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

    if (positionType === "relative") {
      style = getComputedStyle(element);
      current = {
        left: parseInt(style.left, 10) || 0,
        right: parseInt(style.right, 10) || 0,
        top: parseInt(style.top, 10) || 0,
        bottom: parseInt(style.bottom, 10) || 0
      };
    } else {
      box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element);
      current = getBoundingOffsetRect(element);
    }

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

/***/ "./src/core/utility/debounce.js":
/*!**************************************!*\
  !*** ./src/core/utility/debounce.js ***!
  \**************************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/**
 * Throttles a function to only be executed after a given wait period.  If multiple calls to the debounced function
 * are made within that period the waiting period is set.
 * @param fn
 * @param wait
 * @returns {Function}
 */
function debounce(fn, wait) {
  var timeout;
  return function () {
    var _this = this;

    var args = arguments;

    var later = function later() {
      timeout = null;
      fn.apply(_this, args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/***/ }),

/***/ "./src/core/utility/decorators.js":
/*!****************************************!*\
  !*** ./src/core/utility/decorators.js ***!
  \****************************************/
/*! exports provided: proto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
function proto(descriptor) {
  descriptor.placement = "prototype";
  return descriptor;
}

/***/ }),

/***/ "./src/core/utility/dom.js":
/*!*********************************!*\
  !*** ./src/core/utility/dom.js ***!
  \*********************************/
/*! exports provided: parseHTML, createFragment, addClasses, removeClasses, assignAttributes, selectElement, emptyElement, getScroll, setScroll, findChild, filterChildren, isWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTML", function() { return parseHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return createFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return addClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return removeClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignAttributes", function() { return assignAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectElement", function() { return selectElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return emptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return getScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScroll", function() { return setScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return findChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return filterChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var REG_WHITESPACE = /\s+/;
/**
 * Parses an html string into a document fragment.
 *
 * @deprecated
 * @param html
 * @return {DocumentFragment}
 */

function parseHTML(html) {
  var template = document.createElement('template');
  template.innerHTML = html.trim();

  if (template.content) {
    return template.content;
  } else {
    // Doesn't support template tag.
    var fragment = document.createDocumentFragment();

    while (template.firstChild) {
      fragment.appendChild(template.firstChild);
    }

    return fragment;
  }
}
function createFragment(html) {
  // noinspection JSDeprecatedSymbols
  return parseHTML(html);
}
/**
 * Adds classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */

function addClasses(element, classes) {
  var _element$classList;

  if (typeof classes === 'string') {
    classes = classes.split(REG_WHITESPACE);
  }

  (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classes));
}
/**
 * Removes classes to an element.  Can take a space separated list of classes.
 *
 * @param element
 * @param classes
 */

function removeClasses(element, classes) {
  var _element$classList2;

  if (typeof classes === 'string') {
    classes = classes.split(REG_WHITESPACE);
  }

  (_element$classList2 = element.classList).remove.apply(_element$classList2, _toConsumableArray(classes));
}
/**
 * Assigns attributes in an object to an element.
 * @param element
 * @param attributes
 */

function assignAttributes(element, attributes) {
  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
}
/**
 * Matches a single dom element based on the given selector.
 * Can take a css selector string, a jquery object, a dom element, a document element or a document fragment.
 * If a css selector is passed it will query for the element.
 * If a jquery object is passed it will return the first matched element.
 * If an element is passed it will return that element.
 *
 * If a context is provided and the selector was a css selector, the selectors scope will be limited to that element.
 * Otherwise the context will be the document.
 *
 * @param selector
 * @param context
 * @returns {Element|Document|DocumentFragment}
 */

function selectElement(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!context) {
    context = document;
  } else {
    context = selectElement(context);
  }

  if (typeof selector === 'string') {
    return context.querySelector(selector);
  } else if (selector.jquery) {
    return selector[0];
  } else if (selector.nodeType === 1 || selector.nodeType === 9 || selector.nodeType === 11) {
    return selector;
  }
}
/**
 * Empties a dom element.
 *
 * @param element
 */

function emptyElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
/**
 * Normalizing accessing scroll position for an element.
 *
 * Windows and elements have different ways of accessing their scroll left and scroll top values on IE.
 * This function normalizes this behavior so getScroll(variable).scrollLeft always works.
 * @param element
 * @returns {{left, top}}
 */

function getScroll(element) {
  if (isWindow(element)) {
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  } else {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
}
/**
 * Normalizes setting a scroll position for an element.
 * Windows on ie and elements with overflow scroll have different ways of setting the scroll position.
 * This methods normalizes them.
 * @param element - The element to scroll
 * @param scroll - An object with a left or a top property or both.
 */

function setScroll(element, scroll) {
  if (element.scrollTo) {
    element.scrollTo(scroll);
  } else {
    element.scrollLeft = scroll.left;
    element.scrollTop = scroll.top;
  }
}
/**
 * Returns first child element that matches the test function.
 * @param element - Parent element
 * @param fn {Function|String} - Test Function
 * @returns {HTMLElement|Element|null}
 */

function findChild(element, fn) {
  if (typeof fn === 'string') {
    var selector = fn;

    fn = function fn(child) {
      return child.matches(selector);
    };
  }

  for (var i = 0, l = element.children.length; i < l; i++) {
    var child = element.children[i];

    if (fn(child)) {
      return child;
    }
  }

  return null;
}
/**
 * Creates a filtered list of element from the children that match the test function.
 * @param element - Parent element.
 * @param fn - Test function.
 * @returns {Array}
 */

function filterChildren(element, fn) {
  var r = [];

  for (var i = 0, l = element.children.length; i < l; i++) {
    var child = element.children[i];

    if (fn(child)) {
      r.push(child);
    }
  }

  return r;
}
/**
 * Test to see if the variable is a window.
 * @param variable
 * @returns {boolean}
 */

function isWindow(variable) {
  return variable && _typeof(variable) === 'object' && setInterval in variable;
}

/***/ }),

/***/ "./src/core/utility/index.js":
/*!***********************************!*\
  !*** ./src/core/utility/index.js ***!
  \***********************************/
/*! exports provided: debounce, proto, createFragment, findChild, filterChildren, emptyElement, addClasses, removeClasses, selectElement, assignAttributes, getScroll, isWindow, setScroll, all, any, chain, enumerate, firstValue, items, keys, values, clamp, modulo, calcDistance, arraysEqual, getPropertyByPath, getOwnProperty, isEmptyObject, randomChoice, rangeFindItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debounce */ "./src/core/utility/debounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _debounce__WEBPACK_IMPORTED_MODULE_0__["debounce"]; });

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators */ "./src/core/utility/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return _decorators__WEBPACK_IMPORTED_MODULE_1__["proto"]; });

/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/core/utility/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["createFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["findChild"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["filterChildren"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["emptyElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["addClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["removeClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectElement", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["selectElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assignAttributes", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["assignAttributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["getScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["isWindow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setScroll", function() { return _dom__WEBPACK_IMPORTED_MODULE_2__["setScroll"]; });

/* harmony import */ var _iter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iter */ "./src/core/utility/iter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "all", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["all"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["any"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["chain"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enumerate", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["enumerate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "firstValue", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["firstValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "items", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["items"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["keys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _iter__WEBPACK_IMPORTED_MODULE_3__["values"]; });

/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math */ "./src/core/utility/math.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["modulo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcDistance", function() { return _math__WEBPACK_IMPORTED_MODULE_4__["calcDistance"]; });

/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object */ "./src/core/utility/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["arraysEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["getPropertyByPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOwnProperty", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["getOwnProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["isEmptyObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["randomChoice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rangeFindItem", function() { return _object__WEBPACK_IMPORTED_MODULE_5__["rangeFindItem"]; });









/***/ }),

/***/ "./src/core/utility/iter.js":
/*!**********************************!*\
  !*** ./src/core/utility/iter.js ***!
  \**********************************/
/*! exports provided: items, keys, values, enumerate, chain, firstValue, all, any */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "items", function() { return items; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumerate", function() { return enumerate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return chain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstValue", function() { return firstValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(items),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(keys),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(values),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(enumerate),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(chain);

function items(object) {
  var key;
  return regeneratorRuntime.wrap(function items$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = regeneratorRuntime.keys(object);

        case 1:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 8;
            break;
          }

          key = _context.t1.value;

          if (!object.hasOwnProperty(key)) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return [key, object[key]];

        case 6:
          _context.next = 1;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
function keys(object) {
  var key;
  return regeneratorRuntime.wrap(function keys$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = regeneratorRuntime.keys(object);

        case 1:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 8;
            break;
          }

          key = _context2.t1.value;

          if (!object.hasOwnProperty(key)) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return key;

        case 6:
          _context2.next = 1;
          break;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
function values(object) {
  var key;
  return regeneratorRuntime.wrap(function values$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = regeneratorRuntime.keys(object);

        case 1:
          if ((_context3.t1 = _context3.t0()).done) {
            _context3.next = 8;
            break;
          }

          key = _context3.t1.value;

          if (!object.hasOwnProperty(key)) {
            _context3.next = 6;
            break;
          }

          _context3.next = 6;
          return object[key];

        case 6:
          _context3.next = 1;
          break;

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
function enumerate(iterable) {
  var i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

  return regeneratorRuntime.wrap(function enumerate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          i = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 4;
          _iterator = iterable[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 13;
            break;
          }

          value = _step.value;
          _context4.next = 10;
          return [i, value];

        case 10:
          _iteratorNormalCompletion = true;
          _context4.next = 6;
          break;

        case 13:
          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 19:
          _context4.prev = 19;
          _context4.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context4.prev = 22;

          if (!_didIteratorError) {
            _context4.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context4.finish(22);

        case 26:
          return _context4.finish(19);

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[4, 15, 19, 27], [20,, 22, 26]]);
}
function chain() {
  var _len,
      iterables,
      _key,
      _i,
      _iterables,
      iter,
      _iteratorNormalCompletion2,
      _didIteratorError2,
      _iteratorError2,
      _iterator2,
      _step2,
      value,
      _args5 = arguments;

  return regeneratorRuntime.wrap(function chain$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          for (_len = _args5.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {
            iterables[_key] = _args5[_key];
          }

          _i = 0, _iterables = iterables;

        case 2:
          if (!(_i < _iterables.length)) {
            _context5.next = 33;
            break;
          }

          iter = _iterables[_i];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context5.prev = 7;
          _iterator2 = iter[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context5.next = 16;
            break;
          }

          value = _step2.value;
          _context5.next = 13;
          return value;

        case 13:
          _iteratorNormalCompletion2 = true;
          _context5.next = 9;
          break;

        case 16:
          _context5.next = 22;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](7);
          _didIteratorError2 = true;
          _iteratorError2 = _context5.t0;

        case 22:
          _context5.prev = 22;
          _context5.prev = 23;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 25:
          _context5.prev = 25;

          if (!_didIteratorError2) {
            _context5.next = 28;
            break;
          }

          throw _iteratorError2;

        case 28:
          return _context5.finish(25);

        case 29:
          return _context5.finish(22);

        case 30:
          _i++;
          _context5.next = 2;
          break;

        case 33:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[7, 18, 22, 30], [23,, 25, 29]]);
}
/**
 * Takes an iterable and returns the first none null or undefined value.
 * @param args
 */

function firstValue(args) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var item = _step3.value;

      if (item !== null && item !== undefined) {
        return item;
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
}
/**
 * Takes an iterable and returns true if all of the values are trueish.
 * @param iterable
 */

function all(iterable) {
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = iterable[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var item = _step4.value;

      if (!item) {
        return false;
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

  return true;
}
/**
 * Takes an iterable and returns true if any of the values are trueish.
 * @param iterable
 */

function any(iterable) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = iterable[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var item = _step5.value;
      if (item) return true;
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

  return false;
}

/***/ }),

/***/ "./src/core/utility/math.js":
/*!**********************************!*\
  !*** ./src/core/utility/math.js ***!
  \**********************************/
/*! exports provided: clamp, modulo, calcDistance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return modulo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcDistance", function() { return calcDistance; });
/**
 * Clamps a value between a minimum and maximum values.
 * @param value
 * @param minValue
 * @param maxValue
 * @returns {*}
 */
function clamp(value) {
  var minValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var maxValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (minValue !== null) {
    value = Math.max(value, minValue);
  }

  if (maxValue !== null) {
    value = Math.min(value, maxValue);
  }

  return value;
}
function modulo(value, mod) {
  return (value % mod + mod) % mod;
}
function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y2, 2));
}

/***/ }),

/***/ "./src/core/utility/object.js":
/*!************************************!*\
  !*** ./src/core/utility/object.js ***!
  \************************************/
/*! exports provided: randomChoice, arraysEqual, isEmptyObject, getOwnProperty, getPropertyByPath, rangeFindItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return randomChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnProperty", function() { return getOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return getPropertyByPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeFindItem", function() { return rangeFindItem; });
/**
 * Returns a random value from an array.
 * @param array
 * @returns {*}
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}
/**
 * Checks to see if 2 arrays are "equal".
 * @param array1
 * @param array2
 */

function arraysEqual(array1, array2) {
  if (array1 === array2) return true; // The same object.

  if (array1 == null || array2 == null) return false;
  if (array1.length !== array2.length) return false;

  for (var i = 0, l = array1.length; i < l; i++) {
    if (array1[i] !== array2[i]) return false;
  }

  return true;
}
/**
 * Tests to see if the object is empty.
 *
 * @param object
 * @return {boolean}
 */

function isEmptyObject(object) {
  // noinspection LoopStatementThatDoesntLoopJS
  for (var key in object) {
    return false;
  }

  return true;
}
/**
 * Returns the object own property or the default value if it does not have that property.
 * @param obj
 * @param propName
 * @param defaultValue
 * @returns {*}
 */

function getOwnProperty(obj, propName) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  if (obj.hasOwnProperty(propName)) {
    return obj[propName];
  } else {
    return defaultValue;
  }
}
/**
 * Returns the obj value by following it's property path.  For example getPropertyByPath(a, 'b.c.d') is equivalent to
 * a.b.c.d but can be passed in string form.
 * @param obj
 * @param path
 * @returns {*}
 */

function getPropertyByPath(obj, path) {
  var parts = path.split('.'),
      r = obj;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var part = _step.value;
      r = r[part];
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
 * rangeFindItem
 *
 * Searches an array starting at the starting index and heads towards the ending index and returns the first item that
 * matches the predicate function.  If no item is found then undefined will be returned.  This function can search an
 * array both forwards and backwards.  Just start at a greater point then the ending point and the function will
 * handle the rest.
 *
 * @param array - The array to search
 * @param predicate - The matching function.  Should return true if the item is a match.
 * @param startingIndex - The index to start from.
 * @param endingIndex - The index to end at.  (Will also search this index)
 * @returns {*}
 */

function rangeFindItem(array, predicate) {
  var startingIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var endingIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var i;

  if (endingIndex === null) {
    endingIndex = array.length - 1;
  }

  i = startingIndex;

  while (true) {
    var item = array[i];

    if (predicate(item)) {
      return item;
    }

    if (startingIndex > endingIndex) {
      if (i <= endingIndex) return;
      i--;
    } else {
      if (i >= endingIndex) return;
      i++;
    }
  }
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

/***/ "./src/core/vectors/Rect.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Rect.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rect; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./src/core/errors.js");
/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vec2 */ "./src/core/vectors/Vec2.js");
/* harmony import */ var _Vec4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vec4 */ "./src/core/vectors/Vec4.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var regWhitespace = /\s+/,
    regPositionPart = /^([a-zA-Z]*)([+-]?\d*\.?\d*)([a-z%]*)$/; // Parses string like "left+10px" into ["left", "+10px"]

var positionShortHandValues = {
  top: 'center top',
  right: 'right middle',
  bottom: 'center bottom',
  left: 'left middle',
  topleft: 'left top',
  topright: 'right top',
  bottomleft: 'left bottom',
  bottomright: 'right bottom'
};

var Rect =
/*#__PURE__*/
function (_Vec) {
  _inherits(Rect, _Vec);

  function Rect(left, top, right, bottom) {
    var _this;

    var domElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Rect);

    if (typeof left === 'function') {
      left = left();
    }

    if (_typeof(left) === 'object') {
      if (left.getBoundingClientRect) {
        domElement = left;
        var bb = domElement.getBoundingClientRect();
        left = bb.left;
        top = bb.top;
        right = bb.right;
        bottom = bb.bottom;
      } else {
        top = left.top;
        right = left.right;
        bottom = left.bottom;
        left = left.left;
      }
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, left, top, right, bottom)); // noinspection JSUnusedGlobalSymbols

    _this.domElement = domElement;

    if (arguments.length === 1 && left instanceof Rect) {
      Object.assign(_assertThisInitialized(_this), left);
    }

    return _this;
  }

  _createClass(Rect, [{
    key: "bind",
    value: function bind(element) {
      return this._new(this.left, this.top, this.right, this.bottom, element);
    }
  }, {
    key: "_new",
    value: function _new(left, top, right, bottom) {
      var domElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var r = new this.constructor(this);
      r.left = left;
      r.top = top;
      r.right = right;
      r.bottom = bottom;
      if (domElement !== undefined) r.domElement = domElement;
      return r;
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](this[0], this[1]);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "getArea",
    value: function getArea() {
      return this.width * this.height;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (Array.isArray(x)) {
        var _x = x;

        var _x2 = _slicedToArray(_x, 2);

        x = _x2[0];
        y = _x2[1];
      } else if (_typeof(x) === 'object') {
        y = x.y;
        x = x.x;
      }

      return this._new(this[0] + x, this[1] + y, this[2] + x, this[3] + y);
    }
  }, {
    key: "addMargins",
    value: function addMargins(_ref) {
      var left = _ref.left,
          top = _ref.top,
          right = _ref.right,
          bottom = _ref.bottom;
      return this._new(this.left - left, this.top - top, this.right + right, this.bottom + bottom);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "addPadding",
    value: function addPadding(_ref2) {
      var left = _ref2.left,
          top = _ref2.top,
          right = _ref2.right,
          bottom = _ref2.bottom;
      return this._new(this.left + left, this.top + top, this.right - right, this.bottom - bottom);
    }
  }, {
    key: "moveTo",
    value: function moveTo(_ref3) {
      var left = _ref3.left,
          top = _ref3.top;
      var deltaX = left - this.left,
          deltaY = top - this.top;
      return this._new(this.left + deltaX, this.top + deltaY, this.right + deltaX, this.bottom + deltaY);
    }
  }, {
    key: "intersection",
    value: function intersection(_ref4) {
      var left = _ref4.left,
          top = _ref4.top,
          right = _ref4.right,
          bottom = _ref4.bottom;
      left = Math.max(this.left, left);
      right = Math.min(this.right, right);
      bottom = Math.min(this.bottom, bottom);
      top = Math.max(this.top, top);

      if (left > right || top > bottom) {
        return null;
      }

      return this._new(left, top, right, bottom);
    }
    /**
     * Creates a new rectangle exactly big enough to hold the current rectangle and the provided rectangle.
     * @param left
     * @param top
     * @param right
     * @param bottom
     * @returns {null|Rect}
     */

  }, {
    key: "union",
    value: function union(_ref5) {
      var left = _ref5.left,
          top = _ref5.top,
          right = _ref5.right,
          bottom = _ref5.bottom;
      left = Math.min(left, this.left);
      right = Math.max(right, this.right);
      bottom = Math.max(bottom, this.bottom);
      top = Math.min(top, this.top);

      if (left > right || top > bottom) {
        return null;
      }

      return this._new(left, top, right, bottom);
    }
  }, {
    key: "contains",
    value: function contains(rect) {
      return this.left <= rect.left && this.right >= rect.right && this.top <= rect.top && this.bottom >= rect.bottom;
    }
  }, {
    key: "containsX",
    value: function containsX(rect) {
      return this.left <= rect.left && this.right >= rect.right;
    }
  }, {
    key: "containsY",
    value: function containsY(rect) {
      return this.top <= rect.top && this.bottom >= rect.bottom;
    }
  }, {
    key: "isXOverlapping",
    value: function isXOverlapping(rect) {
      return rect.left <= this.right && rect.right >= this.left;
    }
  }, {
    key: "isYOverlapping",
    value: function isYOverlapping(rect) {
      return rect.top <= this.bottom && rect.bottom >= this.top;
    }
  }, {
    key: "isAbove",
    value: function isAbove(rect) {
      rect = new Rect(rect);
      return rect.top > this.bottom;
    }
  }, {
    key: "isBelow",
    value: function isBelow(rect) {
      rect = new Rect(rect);
      return rect.bottom < this.top;
    }
  }, {
    key: "isLeftOf",
    value: function isLeftOf(rect) {
      rect = new Rect(rect);
      return rect.left > this.right;
    }
  }, {
    key: "isRightOf",
    value: function isRightOf(rect) {
      rect = new Rect(rect);
      return rect.right < this.left;
    }
  }, {
    key: "isOverlapping",
    value: function isOverlapping(rect) {
      rect = new Rect(rect);
      return this.isXOverlapping(rect) && this.isYOverlapping(rect);
    }
    /**
     * Attempts to fit the rect inside of the container anchoring from the anchor point.  The anchor point defaults
     * to the top left corner or (0, 0).
     *
     * If possible entire rect should be clamped to the closest position inside of the container.
     * Else position anchor point the closest possible point inside container.
     *
     * @param container
     * @param anchor
     */

  }, {
    key: "fit",
    value: function fit(container) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      anchor = anchor ? this.getAnchor(anchor) : new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
      container = new Rect(container);
      var starting = container;
      container = container.add(new Rect(anchor.left, anchor.top, -this.width + anchor.left, -this.height + anchor.top));
      container = new Rect(Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.left, starting.left, starting.right), Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.top, starting.top, starting.bottom), Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.right, starting.left, starting.right), Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(container.bottom, starting.top, starting.bottom));
      var left = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.left, container.left, container.right) - anchor.left,
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.top, container.top, container.bottom) - anchor.top,
          width = this.width,
          height = this.height;
      return this._new(left, top, left + width, top + height);
    }
  }, {
    key: "fitX",
    value: function fitX(container) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.fit(container, anchor);
      return this._new(pos.left, this.top, pos.right, this.bottom);
    }
  }, {
    key: "fitY",
    value: function fitY(container) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.fit(container, anchor);
      return this._new(this.left, pos.top, this.right, pos.bottom);
    }
    /**
     * Clamps the anchor point inside the rect.  Anchor point defaults to top left or (0, 0).
     *
     * @param rect
     * @param anchor
     * @returns {Rect}
     */

  }, {
    key: "clamp",
    value: function clamp(rect) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      anchor = anchor ? this.getAnchor(anchor) : new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
      rect = new Rect(rect);
      var width = this.width,
          height = this.height,
          left = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.left + anchor.left, rect.left, rect.right) - anchor.left,
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["clamp"])(this.top + anchor.top, rect.top, rect.bottom) - anchor.top;
      return this._new(left, top, left + width, top + height);
    }
  }, {
    key: "clampX",
    value: function clampX(rect) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.clamp(rect, anchor);
      return this._new(pos.left, this.top, pos.right, this.bottom);
    }
  }, {
    key: "clampY",
    value: function clampY(rect) {
      var anchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var pos = this.clamp(rect, anchor);
      return this._new(this.left, pos.top, this.right, pos.bottom);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the distance between two rects.
     * @param rect
     * @returns {number}
     */

  }, {
    key: "getDistanceBetween",
    value: function getDistanceBetween(rect) {
      rect = Rect.fromRect(rect);
      var isXOverlapping = this.isXOverlapping(rect),
          isYOverlapping = this.isYOverlapping(rect);

      if (isXOverlapping && isYOverlapping) {
        // Items are overlapping
        return 0;
      } else if (isXOverlapping) {
        return Math.min(Math.abs(this.bottom - rect.top), Math.abs(this.top - rect.bottom));
      } else if (isYOverlapping) {
        return Math.min(Math.abs(this.right - rect.left), Math.abs(this.left - rect.right));
      } else {
        var x1, y1, x2, y2;

        if (this.right <= rect.left) {
          x1 = this.right;
          x2 = rect.left;
        } else {
          x1 = this.left;
          x2 = rect.right;
        }

        if (this.bottom <= rect.top) {
          y1 = this.bottom;
          y2 = rect.top;
        } else {
          y1 = this.top;
          y2 = rect.bottom;
        } // Use distance formula to calculate distance.


        return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "getDistanceFromPoint",
    value: function getDistanceFromPoint(point) {
      point = new Rect(point.left, point.top, point.left, point.top);
      var closestX = Math.abs(this.left - point.left) < Math.abs(this.right - point.left) ? this.left : this.right,
          closestY = Math.abs(this.top - point.top) < Math.abs(this.bottom - point.top) ? this.top : this.bottom,
          distance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["calcDistance"])(closestX, closestY, point.left, point.top);
      return this.contains(point) ? -distance : distance;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "getCenterPoint",
    value: function getCenterPoint() {
      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](this.left + this.width / 2, this.top + this.height / 2);
    }
  }, {
    key: "reflect",
    value: function reflect() {
      var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'xy';
      // Reflect around the given point or origin
      point = point ? new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](point) : new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
      var x = this.left + this.width / 2 - point.x,
          y = this.top + this.height / 2 - point.y;

      if (axis === 'x' || axis === 'xy') {
        x *= -1;
      }

      if (axis === 'y' || axis === 'xy') {
        y *= -1;
      }

      x = x - this.width / 2 + point.x;
      y = y - this.height / 2 + point.y;
      return this._new(x, y, x + this.width, y + this.height);
    }
  }, {
    key: "position",
    value: function position(_ref6) {
      var my = _ref6.my,
          at = _ref6.at,
          of = _ref6.of,
          _ref6$offset = _ref6.offset,
          offset = _ref6$offset === void 0 ? null : _ref6$offset,
          _ref6$inside = _ref6.inside,
          inside = _ref6$inside === void 0 ? null : _ref6$inside,
          _ref6$collision = _ref6.collision,
          collision = _ref6$collision === void 0 ? null : _ref6$collision;

      // Of should be a Rect object.
      if (of.getBoundingClientRect) {
        of = new Rect(of);
      } // inside should be a Rect object.


      if (inside && inside.getBoundingClientRect) {
        inside = new Rect(inside);
      } // collision can be string with a space separating the x and y values.
      // for example "fit flipfit"
      // normalize it to an {x, y} object.


      if (collision && typeof collision === 'string') {
        var parts = collision.trim().split(regWhitespace);
        collision = {
          x: parts[0],
          y: parts[1] || parts[0]
        };
      }

      var anchor = this.evaluatePositionString(my),
          reference = of.evaluatePositionString(at),
          deltaX = reference.x - anchor.x,
          deltaY = reference.y - anchor.y;
      var rect = this.translate(deltaX, deltaY);

      if (offset) {
        rect = this.translate(offset);
      } // If the rect is already inside the container or if not container or collision function where given
      // return immediately, there is not more work to be done.


      if (!collision || !inside || inside.contains(rect)) {
        return rect;
      }

      if (!inside.containsX(rect) && (collision.x === 'flip' || collision.x === 'flipfit')) {
        rect = rect.reflect(of.getCenterPoint(), 'x');
      }

      if (!inside.containsY(rect) && (collision.y === 'flip' || collision.y === 'flipfit')) {
        rect = rect.reflect(of.getCenterPoint(), 'y');
      }

      if (collision.x === 'fit' || collision.x === 'flipfit') {
        rect = rect.fitX(inside);
      }

      if (collision.y === 'fit' || collision.y === 'flipfit') {
        rect = rect.fitY(inside);
      }

      return rect;
    }
  }, {
    key: "evaluatePositionString",
    value: function evaluatePositionString(string) {
      if (positionShortHandValues[string]) {
        string = positionShortHandValues[string];
      }

      var pos = string.trim().split(regWhitespace),
          x = pos[0],
          y = pos[1],
          rx = null,
          ry = null;

      if (x) {
        rx = this._evaluatePositionStringComponent(x, 'x');
      }

      if (y) {
        ry = this._evaluatePositionStringComponent(y, 'y');
      }

      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](rx, ry);
    }
    /**
     * Gets the anchor position relative to the element.  The anchor can be any of the following:
     *
     * A position string.
     * A [x, y, offsetX=0, offsetY=0] array.
     * An object of {left, top, offsetX=0, offsetY=0} properties.
     *
     * @param anchor
     * @returns {Vec2}
     */

  }, {
    key: "getAnchor",
    value: function getAnchor(anchor) {
      if (positionShortHandValues[anchor]) {
        anchor = positionShortHandValues[anchor];
      }

      var x,
          y,
          offsetX = 0,
          offsetY = 0;

      if (typeof anchor === 'string') {
        var _anchor$trim$split = anchor.trim().split(regWhitespace);

        var _anchor$trim$split2 = _slicedToArray(_anchor$trim$split, 2);

        x = _anchor$trim$split2[0];
        y = _anchor$trim$split2[1];
      } else if (Array.isArray(anchor)) {
        var _anchor = anchor;

        var _anchor2 = _slicedToArray(_anchor, 4);

        x = _anchor2[0];
        y = _anchor2[1];
        var _anchor2$ = _anchor2[2];
        offsetX = _anchor2$ === void 0 ? 0 : _anchor2$;
        var _anchor2$2 = _anchor2[3];
        offsetY = _anchor2$2 === void 0 ? 0 : _anchor2$2;
      } else {
        x = anchor.left;
        y = anchor.top;
        offsetX = anchor.offsetX || 0;
        offsetY = anchor.offsetY || 0;
      }

      if (typeof x === 'string') {
        x = this._evaluatePositionStringComponent(x, 'x') - this.left;
      }

      if (typeof y === 'string') {
        y = this._evaluatePositionStringComponent(y, 'y') - this.top;
      }

      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](x + offsetX, y + offsetY);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Takes a anchor point coordient relative the the rect and returns the true coordients.
     * @param anchor
     * @returns {Vec2}
     */

  }, {
    key: "getPoint",
    value: function getPoint(anchor) {
      var point = this.getAnchor(anchor);
      return new _Vec2__WEBPACK_IMPORTED_MODULE_1__["default"](point.left + this.left, point.top + this.top);
    }
    /**
     * Evaluates a position string value such as "left+10px" into it final position on the rect.
     * @param value - The value to evaluate.
     * @param direction - The direction type.  Should be either "x" or "y".
     * @returns {number}
     * @private
     */

  }, {
    key: "_evaluatePositionStringComponent",
    value: function _evaluatePositionStringComponent(value, direction) {
      var parts = regPositionPart.exec(value),
          r = 0;

      if (parts[1]) {
        var p = parts[1];

        if (direction === 'x') {
          if (p === 'left') {
            r = this.left;
          } else if (p === 'center' || p === 'middle') {
            r = this.left + this.width / 2;
          } else if (p === 'right') {
            r = this.left + this.width;
          } else {
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValueError"]("Invalid Option: ".concat(p));
          }
        } else {
          if (p === 'top') {
            r = this.top;
          } else if (p === 'middle' || p === 'center') {
            r = this.top + this.height / 2;
          } else if (p === 'bottom') {
            r = this.top + this.height;
          } else {
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValueError"]("Invalid Option: ".concat(p));
          }
        }
      } else if (direction === 'x') {
        r = this.left;
      } else {
        r = this.top;
      }

      if (parts[2]) {
        var _value = parseFloat(parts[2]),
            type = parts[3] || 'px';

        if (type === 'px') {
          r += _value;
        } else if (type === '%') {
          if (direction === 'x') {
            r += _value / 100 * this.width;
          } else {
            r += _value / 100 * this.height;
          }
        } else {
          throw new _errors__WEBPACK_IMPORTED_MODULE_0__["UnitError"]("Invalid unit: Must be either % or px.");
        }
      }

      return r;
    }
  }, {
    key: "left",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "top",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "right",
    get: function get() {
      return this[2];
    },
    set: function set(value) {
      this[2] = value;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this[3];
    },
    set: function set(value) {
      this[3] = value;
    }
  }, {
    key: "width",
    get: function get() {
      return this.right - this.left;
    },
    set: function set(value) {
      this.right = this.left + value;
    }
  }, {
    key: "height",
    get: function get() {
      return this.bottom - this.top;
    },
    set: function set(value) {
      this.bottom = this.top + value;
    }
  }, {
    key: "x",
    get: function get() {
      return this.left;
    },
    set: function set(value) {
      this.left = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this.top;
    },
    set: function set(value) {
      this.top = value;
    }
  }], [{
    key: "fromRect",
    value: function fromRect(_ref7) {
      var left = _ref7.left,
          top = _ref7.top,
          right = _ref7.right,
          bottom = _ref7.bottom;
      return new Rect(left, top, right, bottom);
    }
  }, {
    key: "getBoundingClientRect",
    value: function getBoundingClientRect(element) {
      return new Rect(element);
    }
    /**
     * Returns the elements Rect without any inline styles applied.
     * @param element
     * @param restore - If true inline style will be restored after measuring.
     * @returns {Rect}
     */

  }, {
    key: "getCleanBoundingClientRect",
    value: function getCleanBoundingClientRect(element) {
      var restore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var state = {},
          keys = [];

      for (var i = 0; i < element.style.length; i++) {
        keys.push(element.style[i]);
      }

      for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
        var key = _keys[_i2];
        state[key] = element.style[key];
        element.style[key] = "";
      }

      var r = Rect.getBoundingClientRect(element);

      if (restore) {
        Object.assign(element.style, state);
      }

      return r;
    }
  }, {
    key: "getClientRect",
    value: function getClientRect() {
      return new Rect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, {
    key: "getRootContainingClientRect",
    value: function getRootContainingClientRect() {
      return new Rect(-window.scrollX, -window.scrollY, document.documentElement.clientWidth - window.scrollX, document.documentElement.clientHeight - window.scrollY);
    }
  }]);

  return Rect;
}(_Vec4__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/core/vectors/Vec2.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Vec2.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec2; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ "./src/core/utility/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Stores a 2 value Vector.
 */

var Vec2 =
/*#__PURE__*/
function () {
  function Vec2() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vec2);

    if (x instanceof Vec2) {
      this[0] = x.x;
      this[1] = x.y;
    } else if (Array.isArray(x)) {
      this[0] = x[0];
      this[1] = x[1];
    } else if (_typeof(x) === 'object') {
      if (x.left !== undefined) {
        this[0] = x.left;
        this[0] = x.top;
      } else {
        this[0] = x.x;
        this[1] = x.y;
      }
    } else {
      this[0] = x;
      this[1] = y;
    }
  }

  _createClass(Vec2, [{
    key: "add",
    value: function add(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] + vec2, this[1] + vec2);
      } else {
        return new Vec2(this[0] + vec2[0], this[1] + vec2[1]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] - vec2, this[1] - vec2);
      } else {
        return new Vec2(this[0] - vec2[0], this[1] - vec2[1]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "scalar",
    value: function scalar(value) {
      return new Vec2(this[0] * value, this[1] * value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "mod",
    value: function mod(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] % vec2, this[1] % vec2);
      } else {
        return new Vec2(this[0] % vec2[0], this[1] % vec2[1]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "equals",
    value: function equals(vec2) {
      return this === vec2 || this[0] === vec2[0] && this[1] === vec2[1];
    }
  }, {
    key: "set",
    value: function set(value) {
      if (_typeof(value) !== 'object') {
        this[0] = value;
        this[1] = value;
      } else {
        this[0] = value[0];
        this[1] = value[1];
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "clone",
    value: function clone() {
      return Vec2(this[0], this[1]);
    }
  }, {
    key: "toTranslate",
    // noinspection JSUnusedGlobalSymbols
    value: function toTranslate() {
      return "translate(".concat(this.x, "px, ").concat(this.y, "px)");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toTranslate3d",
    value: function toTranslate3d() {
      return "translate3d(".concat(this.x, "px, ").concat(this.y, "px, 0)");
    }
  }, {
    key: "clamp",
    value: function clamp(vec4) {
      return new Vec2(Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.left, vec4.left, vec4.right), Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.top, vec4.top, vec4.bottom));
    }
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
    key: "left",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "right",
    get: function get() {
      return this[0];
    }
  }, {
    key: "top",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this[1];
    }
  }, {
    key: "width",
    get: function get() {
      return this[0];
    },
    set: function set(value) {
      this[0] = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
    }
  }], [{
    key: "fromVertex",
    value: function fromVertex(vertex) {
      if (Array.isArray(vertex)) {
        return new Vec2(vertex[0], vertex[1]);
      } else if (vertex.hasOwnProperty('left')) {
        return new Vec2(vertex.left, vertex.top);
      } else {
        return new Vec2(vertex.x, vertex.y);
      }
    }
  }]);

  return Vec2;
}();



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

/***/ "./src/core/vectors/Vec4.js":
/*!**********************************!*\
  !*** ./src/core/vectors/Vec4.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec4; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Class to store a 4 value vector.
 * Provides DOMRect interface.
 */
var Vec4 =
/*#__PURE__*/
function () {
  /**
   * r, g, b, a
   * left, top, right, bottom
   *
   * @param left
   * @param top
   * @param right
   * @param bottom
   */
  function Vec4(left, top, right, bottom) {
    _classCallCheck(this, Vec4);

    this[0] = left;
    this[1] = top;
    this[2] = right;
    this[3] = bottom;
  }

  _createClass(Vec4, [{
    key: "set",
    value: function set(valueOrVec4) {
      if (_typeof(valueOrVec4) !== 'object') {
        this[0] = valueOrVec4;
        this[1] = valueOrVec4;
        this[2] = valueOrVec4;
        this[3] = valueOrVec4;
      } else {
        this[0] = valueOrVec4[0];
        this[1] = valueOrVec4[1];
        this[2] = valueOrVec4[2];
        this[3] = valueOrVec4[3];
      }
    }
  }, {
    key: "add",
    value: function add(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] + valueOrVec4, this[1] + valueOrVec4, this[2] + valueOrVec4, this[3] + valueOrVec4);
      } else {
        return this._new(this[0] + valueOrVec4[0], this[1] + valueOrVec4[1], this[2] + valueOrVec4[2], this[3] + valueOrVec4[3]);
      }
    }
  }, {
    key: "subtract",
    value: function subtract(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] - valueOrVec4, this[1] - valueOrVec4, this[2] - valueOrVec4, this[3] - valueOrVec4);
      } else {
        return this._new(this[0] - valueOrVec4[0], this[1] - valueOrVec4[1], this[2] - valueOrVec4[2], this[3] - valueOrVec4[3]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "scalar",
    value: function scalar(value) {
      return this._new(this[0] * value, this[1] * value, this[2] * value, this[3] * value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "equals",
    value: function equals(vec4) {
      return vec4 === this || vec4[0] === this[0] && vec4[1] === this[1] && vec4[2] === this[2] && vec4[3] === this[3];
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "mod",
    value: function mod(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] % valueOrVec4, this[1] % valueOrVec4, this[2] % valueOrVec4, this[3] % valueOrVec4);
      } else {
        return this._new(this[0] % valueOrVec4[0], this[1] % valueOrVec4[1], this[2] % valueOrVec4[2], this[3] % valueOrVec4[3]);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "toRGBA",
    value: function toRGBA() {
      return "rgba(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ", ").concat(this.a, ")");
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this[0], this[1], this[2], this[3]);
    }
  }, {
    key: "_new",
    value: function _new(left, top, right, bottom) {
      return new this.constructor(left, top, right, bottom);
    } // noinspection JSUnusedGlobalSymbols

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
  }, {
    key: "a",
    get: function get() {
      return this[3];
    },
    set: function set(value) {
      this[3] = value;
    }
  }], [{
    key: "fromRGBAObject",
    value: function fromRGBAObject(_ref) {
      var r = _ref.r,
          g = _ref.g,
          b = _ref.b,
          a = _ref.a;
      return new Vec4(r, g, b, a);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "fromRGBA",
    value: function fromRGBA(value) {
      var m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)$/.exec(value);

      if (!m) {
        throw new Error("Could not parse rgba value ".concat(value));
      }

      return new Vec4(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10), parseFloat(m[4]));
    }
  }]);

  return Vec4;
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









/***/ }),

/***/ "./src/forms/FormWidgetBase.js":
/*!*************************************!*\
  !*** ./src/forms/FormWidgetBase.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormWidgetBase; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @interface
 * @abstract
 */
var FormWidgetBase =
/*#__PURE__*/
function () {
  function FormWidgetBase(element) {
    _classCallCheck(this, FormWidgetBase);

    this.element = null;

    if (typeof element === 'string') {
      this.element = document.querySelector(element);
    } else if (element) {
      this.element = element;
    }
  }

  _createClass(FormWidgetBase, [{
    key: "appendTo",
    value: function appendTo(selector) {
      if (typeof selector === 'string') {
        document.querySelector(selector).appendChild(this.element);
      } else if (selector.appendChild) {
        selector.appendChild(this.element);
      } else if (selector.append) {
        selector.append(this.element);
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.element.parentElement.removeChild(this.element);
    }
    /**
     * Returns the current raw value without any cleaning, typecasting, or validation.
     * @abstract
     */

  }, {
    key: "getValue",
    value: function getValue() {}
    /**
     * Sets the widgets raw value.
     *
     * @abstract
     * @param value {*}
     */

  }, {
    key: "setValue",
    value: function setValue(value) {}
    /**
     * Sets the name of the widget.
     *
     * @abstract
     * @param name {String}
     */

  }, {
    key: "setName",
    value: function setName(name) {}
    /**
     * Returns the name of the widget.
     * @abstract
     * @returns {String}
     */

  }, {
    key: "getName",
    value: function getName() {}
  }, {
    key: "id",
    get: function get() {
      return this.element.id;
    },
    set: function set(id) {
      this.element.id = id;
    }
  }, {
    key: "classList",
    get: function get() {
      return this.element.classList;
    },
    set: function set(value) {
      this.element.classList = value;
    }
  }, {
    key: "dataset",
    get: function get() {
      return this.element.dataset;
    },
    set: function set(dataset) {
      this.element.dataset = dataset;
    }
  }, {
    key: "name",
    get: function get() {
      return this.getName();
    },
    set: function set(value) {
      this.setName(value);
    }
  }, {
    key: "value",
    get: function get() {
      return this.getValue();
    },
    set: function set(value) {
      this.setValue(value);
    }
  }]);

  return FormWidgetBase;
}();



/***/ }),

/***/ "./src/forms/HiddenInputWidget.js":
/*!****************************************!*\
  !*** ./src/forms/HiddenInputWidget.js ***!
  \****************************************/
/*! exports provided: MultiHiddenInputWidget, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiHiddenInputWidget", function() { return MultiHiddenInputWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HiddenInputWidget; });
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility/index.js");
/* harmony import */ var _FormWidgetBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormWidgetBase */ "./src/forms/FormWidgetBase.js");
/* harmony import */ var _InputWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputWidget */ "./src/forms/InputWidget.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var MultiHiddenInputWidget =
/*#__PURE__*/
function (_FormWidgetBase) {
  _inherits(MultiHiddenInputWidget, _FormWidgetBase);

  function MultiHiddenInputWidget() {
    var _this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, MultiHiddenInputWidget);

    var element = container || document.createElement('span');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiHiddenInputWidget).call(this, element));
    _this.element.style.display = "none";
    _this._name = "";
    _this.inputs = [];
    _this._value = [];
    return _this;
  }

  _createClass(MultiHiddenInputWidget, [{
    key: "render",
    value: function render() {
      var value = this.value;
      Object(_core_utility__WEBPACK_IMPORTED_MODULE_0__["emptyElement"])(this.element);

      if (!Array.isArray(value)) {
        value = [value];
      }

      var fragment = document.createDocumentFragment();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;
          var input = document.createElement('input');
          input.type = "hidden";
          input.value = v + "";
          if (this.name) input.name = this.name;
          fragment.appendChild(input);
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

      this.element.appendChild(fragment);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this._value.length === 1) {
        return this._value[0];
      } else {
        return this._value;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (!Array.isArray(value)) {
        value = [value];
      }

      this._value = value.map(function (item) {
        return item + '';
      });
      this.render();
    }
  }, {
    key: "getName",
    value: function getName() {
      return this._name;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this._name = name;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.element.querySelectorAll('input')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var input = _step2.value;
          input.name = name;
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
    }
  }]);

  return MultiHiddenInputWidget;
}(_FormWidgetBase__WEBPACK_IMPORTED_MODULE_1__["default"]);

var HiddenInputWidget =
/*#__PURE__*/
function (_InputWidget) {
  _inherits(HiddenInputWidget, _InputWidget);

  function HiddenInputWidget() {
    var _this2;

    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, HiddenInputWidget);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(HiddenInputWidget).call(this, input));
    _this2.type = 'hidden';
    return _this2;
  }

  return HiddenInputWidget;
}(_InputWidget__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/forms/InputWidget.js":
/*!**********************************!*\
  !*** ./src/forms/InputWidget.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InputWidget; });
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility/index.js");
/* harmony import */ var _FormWidgetBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormWidgetBase */ "./src/forms/FormWidgetBase.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var InputWidget =
/*#__PURE__*/
function (_FormWidgetBase) {
  _inherits(InputWidget, _FormWidgetBase);

  function InputWidget() {
    var _this;

    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, InputWidget);

    if (!input) {
      input = document.createElement('input');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputWidget).call(this, input));
    _this.input = input;
    return _this;
  }

  _createClass(InputWidget, [{
    key: "getValue",
    value: function getValue() {
      return this.input.value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.input.value = value;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.input.name;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.input.name = name;
    }
  }, {
    key: "type",
    get: function get() {
      return this.input.type;
    },
    set: function set(type) {
      this.input.type = type;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.input.placeholder;
    },
    set: function set(value) {
      this.input.placeholder = value;
    }
  }]);

  return InputWidget;
}(_FormWidgetBase__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),

/***/ "./src/forms/SelectInputWidget.js":
/*!****************************************!*\
  !*** ./src/forms/SelectInputWidget.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectInputWidget; });
/* harmony import */ var _FormWidgetBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormWidgetBase */ "./src/forms/FormWidgetBase.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var SelectInputWidget =
/*#__PURE__*/
function (_FormWidgetBase) {
  _inherits(SelectInputWidget, _FormWidgetBase);

  function SelectInputWidget(select) {
    var _this;

    var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var hidden = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, SelectInputWidget);

    if (typeof select === 'string') {
      select = document.querySelector(select);
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectInputWidget).call(this, select));

    if (name !== null) {
      _this.element.name = name;
    }

    if (multiple !== null) {
      _this.element.multiple = multiple;
    }

    if (hidden !== null) {
      _this.isHidden = hidden;
    }

    return _this;
  }

  _createClass(SelectInputWidget, [{
    key: "appendTo",
    value: function appendTo(selector) {
      if (typeof selector === 'string') {
        document.querySelector(selector).appendChild(this.element);
      } else if (selector.appendChild) {
        selector.appendChild(this.element);
      } else if (selector.append) {
        selector.append(this.element);
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var r = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.element.querySelectorAll("option")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var option = _step.value;

          if (option.selected) {
            r.push(option.value);
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
  }, {
    key: "setValue",
    value: function setValue(values) {
      if (!Array.isArray(values)) {
        values = [values];
      }

      var options = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.element.querySelectorAll("option")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var option = _step2.value;
          options.push({
            element: option,
            value: option.value,
            selected: false
          });
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var value = _step3.value;
          value += "";
          var found = false;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = options[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _option = _step4.value;

              if (_option.value === value && !_option.selected) {
                _option.selected = true;
                found = true;
                break;
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

          if (!found) {
            throw new Error("Unknown value: ".concat(value));
          }
        } // Select will set its value back to selected if there is no currently selected elements.
        // To fix this select the elements first, then deselect.

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

      for (var _i = 0, _options = options; _i < _options.length; _i++) {
        var _option2 = _options[_i];

        if (_option2.selected) {
          _option2.element.selected = true;
        }
      }

      for (var _i2 = 0, _options2 = options; _i2 < _options2.length; _i2++) {
        var _option3 = _options2[_i2];

        if (!_option3.selected) {
          _option3.element.selected = false;
        }
      }
    }
  }, {
    key: "clearSelected",
    value: function clearSelected() {
      var options = this.element.querySelectorAll("option");
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = options[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var option = _step5.value;
          option.selected = false;
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
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.element.name;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.element.name = name;
    }
  }, {
    key: "isHidden",
    get: function get() {
      return this.element.style.display === 'none';
    },
    set: function set(value) {
      if (this.isHidden !== value) {
        if (value) {
          this.element.style.display = "none";
        } else {
          this.element.style.display = "";
        }
      }
    }
  }]);

  return SelectInputWidget;
}(_FormWidgetBase__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/forms/index.js":
/*!****************************!*\
  !*** ./src/forms/index.js ***!
  \****************************/
/*! exports provided: SelectInputWidget, HiddenInputWidget, MultiHiddenInputWidget, FormWidgetBase, InputWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectInputWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectInputWidget */ "./src/forms/SelectInputWidget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectInputWidget", function() { return _SelectInputWidget__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _HiddenInputWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HiddenInputWidget */ "./src/forms/HiddenInputWidget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HiddenInputWidget", function() { return _HiddenInputWidget__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiHiddenInputWidget", function() { return _HiddenInputWidget__WEBPACK_IMPORTED_MODULE_1__["MultiHiddenInputWidget"]; });

/* harmony import */ var _FormWidgetBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormWidgetBase */ "./src/forms/FormWidgetBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormWidgetBase", function() { return _FormWidgetBase__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _InputWidget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputWidget */ "./src/forms/InputWidget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputWidget", function() { return _InputWidget__WEBPACK_IMPORTED_MODULE_3__["default"]; });











/***/ }),

/***/ "./src/menu/ContextMenu.js":
/*!*********************************!*\
  !*** ./src/menu/ContextMenu.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContextMenu; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility/index.js");
/* harmony import */ var _core_ui_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/ui/position */ "./src/core/ui/position.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var ContextMenu =
/*#__PURE__*/
function (_AbstractMenu) {
  _inherits(ContextMenu, _AbstractMenu);

  function ContextMenu(_ref) {
    var _this;

    var _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$targetMenu = _ref.targetMenu,
        targetMenu = _ref$targetMenu === void 0 ? null : _ref$targetMenu,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? true : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? true : _ref$autoActivate,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        _ref$openOnHover = _ref.openOnHover,
        openOnHover = _ref$openOnHover === void 0 ? true : _ref$openOnHover,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? true : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 500 : _ref$delay,
        _ref$enableKeyboardNa = _ref.enableKeyboardNavigation,
        enableKeyboardNavigation = _ref$enableKeyboardNa === void 0 ? true : _ref$enableKeyboardNa,
        context = _objectWithoutProperties(_ref, ["target", "targetMenu", "closeOnBlur", "timeout", "autoActivate", "multiple", "openOnHover", "toggle", "closeOnSelect", "delay", "enableKeyboardNavigation"]);

    _classCallCheck(this, ContextMenu);

    if (!target) {
      target = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["createFragment"])("\n                <div class=\"menu\">\n                    <div class=\"menu__body\" data-body></div>\n                </div>\n            ").children[0];
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContextMenu).call(this, _objectSpread({
      closeOnBlur: closeOnBlur,
      timeout: timeout,
      autoActivate: autoActivate,
      openOnHover: openOnHover,
      toggle: toggle,
      closeOnSelect: closeOnSelect,
      delay: delay,
      positioner: _positioners__WEBPACK_IMPORTED_MODULE_2__["CONTEXT_MENU"],
      direction: 'vertical',
      target: target
    }, context)));

    _this.element.classList.add('context-menu');

    _this.isVisible = false;

    _this.registerTopics();

    _this.parseDOM();

    _this.init();

    _this.initKeyboardNavigation();

    _this._onContextMenu = function (event) {
      if (_this.isActive) {
        _this.deactivate();

        _this.hide();
      }

      event.preventDefault();

      _this.show();

      var rect = _core_ui_position__WEBPACK_IMPORTED_MODULE_4__["Rect"].getBoundingClientRect(_this.element),
          space = _core_ui_position__WEBPACK_IMPORTED_MODULE_4__["Rect"].getBoundingClientRect(event.target),
          deltaX = event.clientX - space.left,
          deltaY = event.clientY - space.top;
      rect = rect.position({
        my: "left top",
        at: "".concat(deltaX, "px ").concat(deltaY, "px"),
        of: space,
        inside: space,
        collision: 'fit fit'
      });
      Object(_core_ui_position__WEBPACK_IMPORTED_MODULE_4__["setElementClientPosition"])(_this.element, rect);
    };

    return _this;
  }

  _createClass(ContextMenu, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this2 = this;

      _get(_getPrototypeOf(ContextMenu.prototype), "registerTopics", this).call(this);

      var onClick = function onClick(event) {
        // noinspection JSUnresolvedFunction
        if (!_this2.element.contains(event.target)) {
          _this2.hide();
        }
      };

      this.on('menu.show', function () {
        document.addEventListener('click', onClick);
      });
      this.on('menu.hide', function (topic) {
        if (topic.target === _this2) {
          if (_this2.isActive) _this2.deactivate();
          document.removeEventListener('click', onClick);
        }
      });
      this.on('menuitem.select', function () {
        if (_this2.closeOnSelect) {
          _this2.hide();

          if (_this2.isActive) _this2.deactivate();
        }
      });
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"](config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new _Menu__WEBPACK_IMPORTED_MODULE_0__["default"](config);
    }
  }, {
    key: "setContainer",
    value: function setContainer(container) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }

      this.positioner = _positioners__WEBPACK_IMPORTED_MODULE_2__["contextMenuPosition"](container);
    }
  }, {
    key: "setTargetMenu",
    value: function setTargetMenu(target) {
      if (this._targetMenu) {
        this._targetMenu.removeEventListener('contextmenu', this._onContextMenu);

        this._targetMenu = null;
      }

      if (!target) return;

      if (typeof target === 'string') {
        target = document.querySelector(target);
      }

      this._targetMenu = target;

      this._targetMenu.addEventListener('contextmenu', this._onContextMenu);
    }
  }]);

  return ContextMenu;
}(_Menu__WEBPACK_IMPORTED_MODULE_0__["AbstractMenu"]);



/***/ }),

/***/ "./src/menu/DropDown.js":
/*!******************************!*\
  !*** ./src/menu/DropDown.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropDown; });
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var DropDown =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(DropDown, _MenuItem);

  function DropDown(_ref) {
    var _this;

    var _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "both" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? true : _ref$closeOnBlur,
        options = _objectWithoutProperties(_ref, ["toggle", "closeOnSelect", "closeOnBlur"]);

    _classCallCheck(this, DropDown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDown).call(this, _objectSpread({
      toggle: toggle,
      closeOnSelect: closeOnSelect,
      closeOnBlur: closeOnBlur
    }, options)));
    _this.positioner = _positioners__WEBPACK_IMPORTED_MODULE_1__["DROPDOWN"];

    _this.init();

    return _this;
  }

  return DropDown;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu/Menu.js":
/*!**************************!*\
  !*** ./src/menu/Menu.js ***!
  \**************************/
/*! exports provided: MENU_ATTRIBUTE_SCHEMA, AbstractMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ATTRIBUTE_SCHEMA", function() { return MENU_ATTRIBUTE_SCHEMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMenu", function() { return AbstractMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu/MenuNode.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var _core_serialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/serialize */ "./src/core/serialize/index.js");
/* harmony import */ var _core_utility_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility/math */ "./src/core/utility/math.js");
/* harmony import */ var _core_utility_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utility/dom */ "./src/core/utility/dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }


 // import {inherit} from './decorators';




var INT_OR_BOOL_TYPE = new _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Attribute"](new _core_serialize__WEBPACK_IMPORTED_MODULE_2__["CompoundType"](_core_serialize__WEBPACK_IMPORTED_MODULE_2__["Bool"], _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Integer"]), _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Attribute"].DROP),
    BOOL_TYPE = new _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_2__["Bool"], _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_2__["Attribute"].DROP);
var MENU_ATTRIBUTE_SCHEMA = new _core_serialize__WEBPACK_IMPORTED_MODULE_2__["AttributeSchema"]({
  closeOnBlur: INT_OR_BOOL_TYPE,
  timeout: INT_OR_BOOL_TYPE,
  autoActivate: INT_OR_BOOL_TYPE,
  openOnHover: INT_OR_BOOL_TYPE,
  closeOnSelect: INT_OR_BOOL_TYPE,
  delay: INT_OR_BOOL_TYPE,
  toggle: BOOL_TYPE,
  visible: BOOL_TYPE
});

function _isNavigableChild(item) {
  return item.isNavigable;
}

function _findFirstNavigableChild(children) {
  return children.find(_isNavigableChild);
}

function _findAllNavigableChildren(children) {
  return children.filter(_isNavigableChild);
}
/**
 * @abstract
 */


var AbstractMenu =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(AbstractMenu, _MenuNode);

  // @inherit positioner;
  // @inherit delay = false;
  function AbstractMenu() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref.target,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? false : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? false : _ref$autoActivate,
        _ref$openOnHover = _ref.openOnHover,
        openOnHover = _ref$openOnHover === void 0 ? false : _ref$openOnHover,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? false : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? "inherit" : _ref$delay,
        _ref$positioner = _ref.positioner,
        positioner = _ref$positioner === void 0 ? "inherit" : _ref$positioner,
        _ref$direction = _ref.direction,
        direction = _ref$direction === void 0 ? "vertical" : _ref$direction;

    _classCallCheck(this, AbstractMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractMenu).call(this, target));

    _positioner.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _delay.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _this.closeOnBlur = closeOnBlur; // both sub-item and menu

    _this.timeout = timeout; // both sub-item and menu
    // noinspection JSUnusedGlobalSymbols

    _this.autoActivate = autoActivate; // sub-item property
    // noinspection JSUnusedGlobalSymbols

    _this.openOnHover = openOnHover; // sub-item property

    _this.toggle = toggle;
    _this.closeOnSelect = closeOnSelect; // both sub-item and menu.
    // noinspection JSUnusedGlobalSymbols

    _this.delay = delay; // sub-item property

    _this.positioner = positioner;
    _this.direction = direction;

    _this.parseDOM();

    return _this;
  }

  _createClass(AbstractMenu, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this2 = this;

      if (this._isTopicInit) return;

      _get(_getPrototypeOf(AbstractMenu.prototype), "registerTopics", this).call(this); // On child is activate
      // deactivate siblings if multiple is false.


      this.on('menuitem.activate', function (target) {
        if (target.parent === _this2) {
          if (!_this2.isActive) {
            _this2.activate();
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this2.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;

              if (child !== target && child.isActive) {
                child.deactivate();
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
        }
      });
      var _timer = null;
      this.on('menuitem.deactivate', function (target) {
        if (_timer) {
          clearTimeout(_timer);
          _timer = null;
        }

        _timer = setTimeout(function () {
          _timer = null;

          if (target.parent === _this2) {
            if (_this2.isActive && !_this2.activeChild) {
              _this2.deactivate();
            }
          }
        }, 0);
      });
      this.on('event.click', function (event) {
        return _this2.onClick(event);
      });
      this.on('event.mouseover', function (event) {
        return _this2.onMouseOver(event);
      });
      this.on('event.mouseout', function (event) {
        return _this2.onMouseOut(event);
      });
      this.on('menuitem.select', function (event) {
        return _this2.onSelect(event);
      });
    }
  }, {
    key: "activate",
    value: function activate() {
      var _this3 = this;

      if (!this.isActive) {
        var parent = this.parent; // Set isActivate flag and add active classes.

        this.isActive = true; // Register document click handler

        if (this.closeOnBlur && !this._captureDocumentClick) {
          this._captureDocumentClick = {
            target: document,
            onDocumentClick: function onDocumentClick(event) {
              if (!_this3.element.contains(event.target)) {
                _this3.deactivate();
              }
            }
          }; // Add to the end of the call stack.

          setTimeout(function () {
            if (_this3._captureDocumentClick) {
              _this3._captureDocumentClick.target.addEventListener('click', _this3._captureDocumentClick.onDocumentClick);
            }
          }, 0);
        } // Notify parent that submenu activated.


        if (parent) {
          if (!parent.isActive) parent.activate();
        }

        this.publish('menu.activate');
        this.dispatchTopic('menu.activate', {
          target: this
        }); // Dispatch dom events.

        this.element.dispatchEvent(new CustomEvent('menu.activate', {
          detail: this,
          bubbles: true
        }));
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.isActive) {
        // Set flag and remove active classes.
        this.isActive = false; // Clear any active child items.

        this.clearActiveChild(); // Remove document click handler that tracks user clicks outside of menu tree.

        if (this._captureDocumentClick) {
          this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);

          this._captureDocumentClick = null;
        } // clear timers


        this.clearTimer('timeout');
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var child = _step2.value;
            child.clearTimer('activateItem');
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

        this.dispatchTopic('menu.deactivate', {
          target: this
        }); // Dispatch dom events.

        this.element.dispatchEvent(new CustomEvent('menu.deactivate', {
          detail: this,
          bubbles: true
        }));
      }
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.isVisible) {
        this.isVisible = true;
        this.element.classList.add('show');
        this.element.classList.remove('hide');
        this.dispatchTopic('menu.show', {
          target: this
        });
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.isVisible) {
        this.isVisible = false;
        this.element.classList.add('hide');
        this.element.classList.remove('show');
        this.dispatchTopic('menu.hide', {
          target: this
        });
      }
    }
  }, {
    key: "position",
    value: function position() {
      var positioner = this.positioner;

      if (positioner) {
        positioner.call(this, this);
      }
    } //------------------------------------------------------------------------------------------------------------------
    // Tree methods.

  }, {
    key: "createItems",
    value: function createItems(data) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _step3.value,
              submenu = _step3$value.submenu,
              args = _objectWithoutProperties(_step3$value, ["submenu"]);

          var item = this.constructMenuItem(args);

          if (submenu) {
            var _submenu = this.constructSubMenu(submenu);

            item.attachSubMenu(_submenu);
          }

          this.append(item);
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
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "addItem",
    value: function addItem(text) {
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var item = this.constructMenuItem({
        text: text,
        action: action
      });
      this.append(item);
      return this;
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      if (this.hasItem(item)) {
        this.removeChildMenuNode(item);
        if (item.element.parentElement) item.element.parentElement.removeChild(item.element);
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "hasItem",
    value: function hasItem(item) {
      return this.hasChild(item);
    }
  }, {
    key: "append",
    value: function append(item) {
      var body = this.getMenuBody();
      body = body[body.length - 1];

      if (item.nodeType) {
        body.appendChild(item);
        return this;
      }

      if (item.parent) {
        item.parent.removeItem(item);
      }

      item.appendTo(body);

      if (item.isMenuItem && item.isMenuItem()) {
        this.appendChildMenuNode(item);
      }

      return this;
    }
  }, {
    key: "clearActiveChild",
    value: function clearActiveChild() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var child = _step4.value;

          if (child.isActive) {
            child.deactivate();
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
    }
    /**
     * Returns list of all menu bodies for the menu.
     *
     * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
     * last menu body in the menu.
     *
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]> | HTMLElement[]}
     */

  }, {
    key: "getMenuBody",
    value: function getMenuBody() {
      var bodies = Array.prototype.slice.call(this.element.querySelectorAll(':scope > .menu__body'));

      if (!bodies.length) {
        return [this.element];
      } else {
        // noinspection JSValidateTypes
        return bodies;
      }
    }
  }, {
    key: "isMenu",
    value: function isMenu() {
      return true;
    } //------------------------------------------------------------------------------------------------------------------
    // Event Handlers

  }, {
    key: "onMouseOver",
    value: function onMouseOver() {
      this.clearTimer('timeout');
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      var _this4 = this;

      if (!this.element.contains(event.originalEvent.relatedTarget)) {
        if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
          // noinspection JSCheckFunctionSignatures
          this.startTimer('timeout', function () {
            _this4.deactivate();
          }, this.timeout);
        }
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (event.target === this) {
        if (this.isActive && this.toggle) {
          this.deactivate();
        } else if (!this.isActive) {
          this.activate();
        }

        this.dispatchTopic('menu.click', event);
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect() {
      if (this.closeOnSelect && this.isActive) {
        this.deactivate();
      }
    }
    /**
     * Handles navigating the selection to an item during keyboard navigation.
     * @param item
     * @param showSubMenu
     * @private
     */

  }, {
    key: "_navigateToItem",
    value: function _navigateToItem(item) {
      var showSubMenu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!item) return;
      var parent = item.parent;
      if (!parent.isVisible) parent.show();
      if (!parent.isActive) parent.activate();
      if (!item.isActive) item.activate(false);
      if (showSubMenu && item.hasSubMenu() && !item.submenu.isVisible) item.showSubMenu();
    }
    /**
     * Handles keyboard navigation.
     * @param event
     * @param allowTargetKeys
     * @param _depth
     * @returns {boolean|boolean|*}
     * @private
     */

  }, {
    key: "_navigate",
    value: function _navigate(event) {
      var allowTargetKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var key = event.key,
          ARROW_BACK = 'ArrowUp',
          ARROW_FORWARD = 'ArrowDown',
          ARROW_NEXT = 'ArrowRight',
          ARROW_PREVIOUS = 'ArrowLeft',
          arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
          arrowKeyPressed = arrowKeys.indexOf(key) !== -1;

      if (this.direction === 'vertical') {
        ARROW_BACK = 'ArrowLeft';
        ARROW_FORWARD = 'ArrowRight';
        ARROW_NEXT = 'ArrowDown';
        ARROW_PREVIOUS = 'ArrowUp';
      }

      if (arrowKeyPressed) {
        if (!this.isVisible) {
          this.show();
          event.preventDefault();
          return true;
        }

        var children = _findAllNavigableChildren(this.children),
            index = children.indexOf(this.activeChild),
            child = children[index];

        if (key === ARROW_PREVIOUS) {
          if (index === -1) {
            // When their is no active item, activate the last item.
            this._navigateToItem(children[children.length - 1], this.isRoot);
          } else {
            this._navigateToItem(children[Object(_core_utility_math__WEBPACK_IMPORTED_MODULE_3__["modulo"])(index - 1, children.length)], this.isRoot);
          }

          event.preventDefault();
          return true;
        } else if (key === ARROW_NEXT) {
          if (index === -1) {
            this._navigateToItem(children[0], this.isRoot);
          } else {
            this._navigateToItem(children[Object(_core_utility_math__WEBPACK_IMPORTED_MODULE_3__["modulo"])(index + 1, children.length)], this.isRoot);
          }

          event.preventDefault();
          return true;
        } else if (key === ARROW_FORWARD) {
          if (child && child.hasSubMenu() && (!child.submenu.isVisible || !child.submenu.activeChild)) {
            var ret = false;

            if (!child.submenu.isVisible) {
              ret = true;
              child.showSubMenu();
            }

            var firstChild = _findFirstNavigableChild(child.submenu.children);

            if (firstChild) {
              ret = true;

              this._navigateToItem(firstChild, false);
            }

            if (ret) {
              event.preventDefault();
              return true;
            }
          } else if (!child) {
            var _firstChild = _findFirstNavigableChild(this.children);

            if (_firstChild) {
              this._navigateToItem(_firstChild, this.isRoot);

              if (_firstChild.hasSubMenu() && _firstChild.submenu.isVisible) {
                var firstSubMenuChild = _findFirstNavigableChild(_firstChild.submenu.children);

                if (firstSubMenuChild) {
                  this._navigateToItem(firstSubMenuChild, false);
                }
              }

              event.preventDefault();
              return true;
            }
          } else if (!this.isRoot) {
            return this.parent._navigate(event, allowTargetKeys, _depth + 1);
          }
        } else if (key === ARROW_BACK) {
          if (!this.isRoot) {
            if (this.activeChild && this.activeChild.hasSubMenu() && this.activeChild.submenu.isVisible) {
              this.activeChild.hideSubMenu();
              event.preventDefault();
              return true;
            } else {
              return this.parent._navigate(event, allowTargetKeys, _depth + 1);
            }
          } else if (_depth === 0) {
            if (child && child.submenu) {
              return child._navigate(event, allowTargetKeys, 0);
            } else if (!child) {
              var _firstChild2 = _findFirstNavigableChild(this.children);

              if (_firstChild2) {
                return _firstChild2._navigate(event, allowTargetKeys, 0);
              }
            }
          }
        }
      } else if (key === "Enter") {
        // The menu is not visible at this point make it visible and return.
        if (!this.isVisible) {
          this.show();
          event.preventDefault();

          if (!this.activeChild) {
            var childToActivate = _findFirstNavigableChild(this.children);

            if (childToActivate) this.firstEnabledChild.activate();
          }

          return true;
        }

        if (this.activeChild) {
          if (this.activeChild.hasSubMenu()) {
            var _ret = false;

            if (!this.activeChild.submenu.isVisible) {
              this.activeChild.showSubMenu();
              event.preventDefault();
              _ret = true;
            }

            if (!this.activeChild.submenu.activeChild) {
              var _childToActivate = _findFirstNavigableChild(this.activeChild.submenu.children);

              if (_childToActivate) {
                _childToActivate.activate(false);

                event.preventDefault();
                _ret = true;
              }
            }

            if (_ret) return true;
          } else {
            this.activeChild.select();
            event.preventDefault();
            return true;
          }
        } else {
          var _firstChild3 = _findFirstNavigableChild(this.children);

          if (_firstChild3) {
            _firstChild3.activate();

            if (_firstChild3.hasSubMenu()) {
              _firstChild3.showSubMenu();

              if (!_firstChild3.submenu.activeChild) {
                var targetChild = _findFirstNavigableChild(_firstChild3.submenu.children);

                if (targetChild) targetChild.activate(false);
              }
            }

            event.preventDefault();
            return true;
          }
        }
      } else if (allowTargetKeys) {
        var _children = _findAllNavigableChildren(this.children);

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = _children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _child = _step5.value;

            if (_child.targetKey === key) {
              event.preventDefault();

              if (_child.hasSubMenu()) {
                if (!_child.isActive) {
                  _child.activate();

                  _child.showSubMenu();
                } else if (!_child.submenu.isVisible) {
                  _child.showSubMenu();
                }
              } else {
                _child.select();
              }

              return true;
            }
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
      }

      return false;
    }
  }, {
    key: "activeChild",
    get: function get() {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var item = _step6.value;

          if (item.isActive) {
            return item;
          }
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

      return null;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "activeIndex",
    get: function get() {
      var children = this.children;

      for (var i = 0, l = children.length; i < l; i++) {
        if (children[i].isActive) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "firstChild",
    get: function get() {
      return this.children[0];
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "lastChild",
    get: function get() {
      return this.children[this.children.length - 1];
    }
  }, {
    key: "firstEnabledChild",
    get: function get() {
      var children = this.children;

      for (var i = 0, l = children.length; i < l; i++) {
        if (!children[i].isDisabled) {
          return children[i];
        }
      }

      return null;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "lastEnabledChild",
    get: function get() {
      var children = this.children;

      for (var i = children.length - 1, l = 0; i >= l; i--) {
        if (!children[i].isDisabled) {
          return children[i];
        }
      }

      return null;
    }
  }, {
    key: "positioner",
    get: function get() {
      if (_classPrivateFieldGet(this, _positioner) === 'inherit' || _classPrivateFieldGet(this, _positioner) === undefined) {
        var parent = this.parent;
        return parent ? parent.positioner : undefined;
      } else if (_classPrivateFieldGet(this, _positioner) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.positioner;
        }
      } else {
        return _classPrivateFieldGet(this, _positioner);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _positioner, value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "delay",
    get: function get() {
      if (_classPrivateFieldGet(this, _delay) === 'inherit' || _classPrivateFieldGet(this, _delay) === undefined) {
        var parent = this.parent;
        return parent ? parent.delay : undefined;
      } else if (_classPrivateFieldGet(this, _delay) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.delay;
        }
      } else {
        return _classPrivateFieldGet(this, _delay);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _delay, value);
    }
  }], [{
    key: "getAttributes",
    value: function getAttributes(element) {
      return _objectSpread({}, _get(_getPrototypeOf(AbstractMenu), "getAttributes", this).call(this, element), {}, MENU_ATTRIBUTE_SCHEMA.deserialize(element.dataset));
    }
  }]);

  return AbstractMenu;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);
/**
 * A component for rendering nestable list of selectable items.
 */

var _positioner = new WeakMap();

var _delay = new WeakMap();

var Menu =
/*#__PURE__*/
function (_AbstractMenu) {
  _inherits(Menu, _AbstractMenu);

  /**
   *
   * @param target {String|HTMLElement|Element}
   * @param closeOnBlur {Boolean|Number}
   * @param timeout {Boolean|Number}
   * @param autoActivate {Boolean|Number}
   * @param openOnHover {Boolean|Number}
   * @param toggle {boolean}
   * @param closeOnSelect {Boolean}
   * @param delay {Boolean|Number|'inherit'}
   * @param id {String}
   * @param children {Array}
   */
  function Menu() {
    var _this5;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$target = _ref2.target,
        target = _ref2$target === void 0 ? null : _ref2$target,
        _ref2$closeOnBlur = _ref2.closeOnBlur,
        closeOnBlur = _ref2$closeOnBlur === void 0 ? false : _ref2$closeOnBlur,
        _ref2$timeout = _ref2.timeout,
        timeout = _ref2$timeout === void 0 ? false : _ref2$timeout,
        _ref2$autoActivate = _ref2.autoActivate,
        autoActivate = _ref2$autoActivate === void 0 ? true : _ref2$autoActivate,
        _ref2$openOnHover = _ref2.openOnHover,
        openOnHover = _ref2$openOnHover === void 0 ? true : _ref2$openOnHover,
        _ref2$toggle = _ref2.toggle,
        toggle = _ref2$toggle === void 0 ? false : _ref2$toggle,
        _ref2$closeOnSelect = _ref2.closeOnSelect,
        closeOnSelect = _ref2$closeOnSelect === void 0 ? true : _ref2$closeOnSelect,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? 'inherit' : _ref2$delay,
        _ref2$children = _ref2.children,
        children = _ref2$children === void 0 ? null : _ref2$children,
        _ref2$arrow = _ref2.arrow,
        arrow = _ref2$arrow === void 0 ? false : _ref2$arrow;

    _classCallCheck(this, Menu);

    if (!target) {
      target = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_4__["createFragment"])("\n                <div class=\"menu\">\n                    ".concat(arrow ? "<div class=\"menu__arrow\"></div>" : "", "\n                    <div class=\"menu__body\" data-body></div>\n                </div>\n            ")).children[0];
    }

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this, {
      closeOnBlur: closeOnBlur,
      timeout: timeout,
      autoActivate: autoActivate,
      toggle: toggle,
      closeOnSelect: closeOnSelect,
      delay: delay,
      positioner: 'inherit',
      direction: 'vertical',
      openOnHover: openOnHover,
      target: target
    }));
    _this5.events = null;

    _this5.registerTopics();

    _this5.init();

    if (children) {
      _this5.createItems(children);
    }

    return _this5;
  }

  _createClass(Menu, [{
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new Menu(config);
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"](config);
    }
  }]);

  return Menu;
}(AbstractMenu);



/***/ }),

/***/ "./src/menu/MenuBar.js":
/*!*****************************!*\
  !*** ./src/menu/MenuBar.js ***!
  \*****************************/
/*! exports provided: MenuBarItem, default, SideMenuBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuBarItem", function() { return MenuBarItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideMenuBar", function() { return SideMenuBar; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var MenuBarItem =
/*#__PURE__*/
function (_MenuItem) {
  _inherits(MenuBarItem, _MenuItem);

  function MenuBarItem() {
    _classCallCheck(this, MenuBarItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuBarItem).apply(this, arguments));
  }

  _createClass(MenuBarItem, [{
    key: "render",
    value: function render() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          target = _ref.target,
          text = _ref.text,
          _ref$nodeName = _ref.nodeName,
          nodeName = _ref$nodeName === void 0 ? 'div' : _ref$nodeName,
          _ref$href = _ref.href,
          href = _ref$href === void 0 ? null : _ref$href;

      var content = null;

      if (target) {
        this.element = target;
        var btn = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["findChild"])(this.element, '[data-button]');

        if (!btn) {
          content = document.createDocumentFragment();

          while (this.element.firstChild) {
            content.appendChild(this.element.firstChild);
          }

          this.element.appendChild(Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["createFragment"])("\n                <a class=\"menuitem__button\" data-button>".concat(text, "</a>")));
        }
      } else {
        var element = document.createElement(nodeName);
        element.appendChild(Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["createFragment"])("<a class=\"menuitem__button\" data-button>".concat(text, "</a>")));
        this.element = element;
      }

      this.button = this.element.querySelector("[data-button]");
      this.textContainer = this.element.querySelector("[data-text]") || this.button;
      this.element.classList.add('menuitem');

      if (content) {
        this.textContainer.appendChild(content);
      }

      if (text !== null && text !== undefined) {
        this.text = text;
      }

      if (href !== null) this.href = href;
      this.element.tabIndex = -1;
    }
  }]);

  return MenuBarItem;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]);

var MenuBar =
/*#__PURE__*/
function (_AbstractMenu) {
  _inherits(MenuBar, _AbstractMenu);

  function MenuBar() {
    var _this;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$target = _ref2.target,
        target = _ref2$target === void 0 ? null : _ref2$target,
        _ref2$closeOnBlur = _ref2.closeOnBlur,
        closeOnBlur = _ref2$closeOnBlur === void 0 ? true : _ref2$closeOnBlur,
        _ref2$timeout = _ref2.timeout,
        timeout = _ref2$timeout === void 0 ? false : _ref2$timeout,
        _ref2$autoActivate = _ref2.autoActivate,
        autoActivate = _ref2$autoActivate === void 0 ? false : _ref2$autoActivate,
        _ref2$multiple = _ref2.multiple,
        multiple = _ref2$multiple === void 0 ? false : _ref2$multiple,
        _ref2$openOnHover = _ref2.openOnHover,
        openOnHover = _ref2$openOnHover === void 0 ? true : _ref2$openOnHover,
        _ref2$toggle = _ref2.toggle,
        toggle = _ref2$toggle === void 0 ? true : _ref2$toggle,
        _ref2$closeOnSelect = _ref2.closeOnSelect,
        closeOnSelect = _ref2$closeOnSelect === void 0 ? true : _ref2$closeOnSelect,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? false : _ref2$delay,
        _ref2$enableKeyboardN = _ref2.enableKeyboardNavigation,
        enableKeyboardNavigation = _ref2$enableKeyboardN === void 0 ? true : _ref2$enableKeyboardN,
        context = _objectWithoutProperties(_ref2, ["target", "closeOnBlur", "timeout", "autoActivate", "multiple", "openOnHover", "toggle", "closeOnSelect", "delay", "enableKeyboardNavigation"]);

    _classCallCheck(this, MenuBar);

    if (!target) {
      target = document.createElement('div');
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuBar).call(this, _objectSpread({
      closeOnBlur: closeOnBlur,
      timeout: timeout,
      autoActivate: autoActivate,
      openOnHover: openOnHover,
      toggle: toggle,
      closeOnSelect: closeOnSelect,
      delay: delay,
      positioner: _positioners__WEBPACK_IMPORTED_MODULE_2__["DROPDOWN"],
      direction: 'horizontal',
      target: target
    }, context)));

    _this.element.classList.add('menubar');

    _this.isVisible = true;

    _this.parseDOM();

    _this.registerTopics();

    _this.init();

    _this.initKeyboardNavigation();

    return _this;
  }

  _createClass(MenuBar, [{
    key: "getMenuBody",
    value: function getMenuBody() {
      return [this.element];
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new MenuBarItem(config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new _Menu__WEBPACK_IMPORTED_MODULE_0__["default"](config);
    }
  }]);

  return MenuBar;
}(_Menu__WEBPACK_IMPORTED_MODULE_0__["AbstractMenu"]);


var SideMenuBar =
/*#__PURE__*/
function (_MenuBar) {
  _inherits(SideMenuBar, _MenuBar);

  function SideMenuBar() {
    var _this2;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SideMenuBar);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SideMenuBar).call(this, config));
    _this2.direction = 'vertical';
    _this2.positioner = _positioners__WEBPACK_IMPORTED_MODULE_2__["SIDE_MENU"];

    _this2.element.classList.remove('menubar');

    _this2.element.classList.add('side-menu-bar');

    return _this2;
  }

  _createClass(SideMenuBar, [{
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"](config);
    }
  }]);

  return SideMenuBar;
}(MenuBar);

/***/ }),

/***/ "./src/menu/MenuItem.js":
/*!******************************!*\
  !*** ./src/menu/MenuItem.js ***!
  \******************************/
/*! exports provided: MENU_ITEM_ATTRIBUTE_SCHEMA, AbstractMenuItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEM_ATTRIBUTE_SCHEMA", function() { return MENU_ITEM_ATTRIBUTE_SCHEMA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMenuItem", function() { return AbstractMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuItem; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu/MenuNode.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility/index.js");
/* harmony import */ var _core_serialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/serialize */ "./src/core/serialize/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

 // import {inherit} from "./decorators";




var INT_OR_BOOL_TYPE = new _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"](new _core_serialize__WEBPACK_IMPORTED_MODULE_3__["CompoundType"](_core_serialize__WEBPACK_IMPORTED_MODULE_3__["Bool"], _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Integer"]), _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"].DROP),
    BOOL_TYPE = new _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_3__["Bool"], _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"].DROP),
    STRING_TYPE = new _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_3__["Str"], _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_3__["Attribute"].DROP);
var MENU_ITEM_ATTRIBUTE_SCHEMA = new _core_serialize__WEBPACK_IMPORTED_MODULE_3__["AttributeSchema"]({
  closeOnBlur: INT_OR_BOOL_TYPE,
  timeout: INT_OR_BOOL_TYPE,
  autoActivate: INT_OR_BOOL_TYPE,
  openOnHover: INT_OR_BOOL_TYPE,
  closeOnSelect: BOOL_TYPE,
  delay: INT_OR_BOOL_TYPE,
  positioner: STRING_TYPE,
  toggle: BOOL_TYPE
});
/**
 * @abstract
 */

var AbstractMenuItem =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(AbstractMenuItem, _MenuNode);

  // @inherit toggle;
  // @inherit autoActivate;
  // @inherit openOnHover;
  // @inherit delay = false;
  // @inherit positioner;
  function AbstractMenuItem(_ref) {
    var _this;

    var target = _ref.target,
        targetKey = _ref.targetKey,
        toggle = _ref.toggle,
        autoActivate = _ref.autoActivate,
        openOnHover = _ref.openOnHover,
        delay = _ref.delay,
        closeOnSelect = _ref.closeOnSelect,
        closeOnBlur = _ref.closeOnBlur,
        timeout = _ref.timeout,
        positioner = _ref.positioner,
        clearSubItemsOnHover = _ref.clearSubItemsOnHover,
        autoDeactivateItems = _ref.autoDeactivateItems;

    _classCallCheck(this, AbstractMenuItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractMenuItem).call(this, target));
    /**
     * During keyboard navigation, specifies the key that the user the click to target the menuitem directly.
     * @type {null|String}
     */

    _positioner.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _delay.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _toggle.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _autoActivate.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _openOnHover.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _this.targetKey = targetKey;
    /**
     * Controls how click behavior works.  on is for toggle on only when clicked, off is for toggle off only, both
     * will toggle both on and off and none will cause the item to not be toggleable.
     * @type {string}
     */

    _this.toggle = toggle;
    /**
     * Controls if the menuitem will activating when the user mouses over it when it's parent is unactive or if the menuitem has no parent.
     * When the parent is active, openOnHover is used instead.
     * @type {string|Number|Boolean}
     */

    _this.autoActivate = autoActivate;
    /**
     * Overrides autoActivate when the items parent menu is active.  If null autoActivate is still used.
     * See autoActivate for more details.
     * @type {string}
     */

    _this.openOnHover = openOnHover;
    /**
     * Adds adds a delay between a menuitem activating and the menuitem displaying it's submenu.
     * @type {string|Number|Boolean}
     */

    _this.delay = delay;
    /**
     * If true the item will close when a descendent menuitem is selected.
     * @type {boolean}
     */

    _this.closeOnSelect = closeOnSelect;
    /**
     * If true the menuitem will close when the user clicks the page outside of the item.
     * @type {boolean}
     */

    _this.closeOnBlur = closeOnBlur;
    /**
     * Controls the amount of time after the user leaves the menuitem that it will remain open.  Time is given in milliseconds.
     * Negative values or false will cause the menuitem to never timeout.  True is interpreted as 0 milliseconds.
     * @type {boolean|Number}
     */

    _this.timeout = timeout;
    /**
     * A function that is used to position the menuitem's submenu.
     * @type {null|Function}
     */

    _this.positioner = positioner;
    /**
     * If true the menuitem will attempt to deactivate any descending menu-items when the user hover over the direct item.
     * @type {boolean}
     */

    _this.clearSubItemsOnHover = clearSubItemsOnHover;
    /**
     * If true the menuitem will deactivate when the user leaves it if it doesn't have a submenu that it needs to keep open.
     * @type {boolean}
     */

    _this.autoDeactivateItems = autoDeactivateItems;
    _this.button = null;
    return _this;
  }

  _createClass(AbstractMenuItem, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this2 = this;

      if (!this._isTopicInit) {
        _get(_getPrototypeOf(AbstractMenuItem.prototype), "registerTopics", this).call(this);

        this.on('event.click', function (event) {
          return _this2.onClick(event);
        });
        this.on('event.mouseover', function (event) {
          return _this2.onMouseOver(event);
        });
        this.on('event.mouseout', function (event) {
          return _this2.onMouseOut(event);
        });
        this.on('menuitem.select', function (event) {
          return _this2.onSelect(event);
        });
      }
    }
    /**
     * Activates the item.
     *
     * @param show {boolean|number} - The number of milliseconds after the item activates that the submenu will display.
     */

  }, {
    key: "activate",
    value: function activate() {
      var _this3 = this;

      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (this.isActive) return;
      this.isActive = true;
      this.clearTimer('activateItem');

      if (this.hasSubMenu()) {
        if (show === true) {
          this.showSubMenu();
        } else if (typeof show === 'number' && show >= 0) {
          this.startTimer('showTimer', function () {
            _this3.showSubMenu();
          }, show);
        }
      } // Register document click handler


      if (this.closeOnBlur && !this._captureDocumentClick) {
        this._captureDocumentClick = {
          target: document,
          onDocumentClick: function onDocumentClick(event) {
            if (!_this3.contains(event.target)) {
              _this3.deactivate();
            }
          }
        };

        this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
      }

      var parent = this.parent;

      if (parent && !parent.isActive) {
        parent.activate();
      }

      this.dispatchTopic('menuitem.activate', this);
    }
    /**
     * Deactivates the item.
     */

  }, {
    key: "deactivate",
    value: function deactivate() {
      if (!this.isActive) return;
      this.isActive = false;
      this.clearTimer('showTimer');
      this.hideSubMenu(); // Remove document click handler that tracks user clicks outside of menu tree.

      if (this._captureDocumentClick) {
        this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);

        this._captureDocumentClick = null;
      }

      this.dispatchTopic('menuitem.deactivate', this);
    }
    /**
     * Triggers a select item event.
     */

  }, {
    key: "select",
    value: function select() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var topic = _objectSpread({
        target: this
      }, data);

      this.publish('select', topic);
      this.dispatchTopic('menuitem.select', topic);
      this.element.dispatchEvent(new CustomEvent('menuitem.select', {
        detail: topic,
        bubbles: true
      }));
    }
    /**
     * Returns true if the menu node is a menu item.
     *
     * @returns {boolean}
     */

  }, {
    key: "isMenuItem",
    value: function isMenuItem() {
      return true;
    } //------------------------------------------------------------------------------------------------------------------
    // Action management

    /**
     * Adds an action that will be called when the user selects the item.
     *
     * @param action {Function|String} - A callback to call when the action occurs.
     * @returns {Function}
     */

  }, {
    key: "addAction",
    value: function addAction(action) {
      if (typeof action === 'string') {
        var fn = function fn() {
          window.location = action;
        };

        this.on('select', fn);
        return fn;
      } else {
        this.on('select', action);
        return action;
      }
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Removes an action.
     * @param action
     */

  }, {
    key: "removeAction",
    value: function removeAction(action) {
      this.off('select', action);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Tests to see if the item has an action.
     * @param action
     * @returns {boolean}
     */

  }, {
    key: "hasAction",
    value: function hasAction(action) {
      return this.hasEvent('select', action);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Removes all actions from the item.
     */

  }, {
    key: "clearActions",
    value: function clearActions() {
      this.off('select');
    } //------------------------------------------------------------------------------------------------------------------
    // Manage submenu

  }, {
    key: "showSubMenu",
    value: function showSubMenu() {
      var submenu = this.submenu;

      if (submenu) {
        submenu.show();
        submenu.position();
      }
    }
  }, {
    key: "hideSubMenu",
    value: function hideSubMenu() {
      if (this.submenu) {
        this.submenu.deactivate();
        this.submenu.hide();
      }
    }
    /**
     * Attaches a submenu to the menuitem.
     *
     * @param submenu
     */

  }, {
    key: "attachSubMenu",
    value: function attachSubMenu(submenu) {
      return this.appendChildMenuNode(submenu);
    }
  }, {
    key: "appendChildMenuNode",
    value: function appendChildMenuNode(submenu) {
      if (submenu.parent === this || this.submenu === submenu) return;

      if (this.submenu) {
        throw new Error("MenuItem can only have one submenu.");
      }

      if (submenu.parent) {
        submenu.parent.detachSubMenu();
      }

      _get(_getPrototypeOf(AbstractMenuItem.prototype), "appendChildMenuNode", this).call(this, submenu);

      this.element.classList.add('has-submenu');

      if (!submenu.element.parentElement) {
        submenu.appendTo(this.element);
      }
    }
    /**
     * Detaches the submenu from the item.
     * @param remove {Boolean} If true the submenu will be removed from the dom.
     * @returns {*} The detached submenu.
     */

  }, {
    key: "detachSubMenu",
    value: function detachSubMenu() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.submenu) {
        var submenu = this.submenu;
        this.removeChildMenuNode(submenu);
        if (remove) submenu.element.parentElement.removeChild(submenu.element);
        return submenu;
      }
    }
  }, {
    key: "removeChildMenuNode",
    value: function removeChildMenuNode(submenu) {
      _get(_getPrototypeOf(AbstractMenuItem.prototype), "removeChildMenuNode", this).call(this, submenu);

      if (!this.children.length) {
        this.element.classList.remove('has-submenu');
      }

      return submenu;
    }
    /**
     * Returns true if the menu item has a submenu.
     * @returns {boolean}
     */

  }, {
    key: "hasSubMenu",
    value: function hasSubMenu() {
      return !!this.submenu;
    }
    /**
     * Returns true if the item has a submenu and that submenu is visible.
     * @returns {boolean}
     */

  }, {
    key: "isSubMenuVisible",
    value: function isSubMenuVisible() {
      return this.hasSubMenu() ? this.submenu.isVisible : false;
    }
  }, {
    key: "clearActiveChild",
    value: function clearActiveChild() {
      if (this.submenu && this.submenu.clearActiveChild) {
        this.submenu.clearActiveChild();
      }
    } //------------------------------------------------------------------------------------------------------------------
    // Event handlers

    /**
     * Handles select events.
     */

  }, {
    key: "onSelect",
    value: function onSelect() {
      if (this.closeOnSelect && this.isActive) {
        this.deactivate();
      }
    }
    /**
     * Handles click events.
     * @param event
     */

  }, {
    key: "onClick",
    value: function onClick(event) {
      var isDisabled = this.getDisabled();

      if (isDisabled) {
        event.originalEvent.preventDefault();
      }

      if (event.target !== this) return;
      var _isDefaultPrevented = false; // noinspection JSUnusedGlobalSymbols

      this.dispatchTopic('menuitem.click', _objectSpread({}, event, {
        relatedTarget: event.target,
        target: this,
        preventDefault: function preventDefault() {
          _isDefaultPrevented = true;
        },
        isDefaultPrevented: function isDefaultPrevented() {
          return _isDefaultPrevented;
        }
      }));
      var isActive = this.isActive,
          hasSubMenu = this.hasSubMenu(),
          isSubMenuVisible = this.isSubMenuVisible(),
          toggle = this.toggle; // Recheck in case it was updated by an event.

      isDisabled = this.getDisabled();

      if (!isDisabled && !_isDefaultPrevented) {
        if (isActive && hasSubMenu && !isSubMenuVisible) {
          this.showSubMenu();
        } else if (!isActive) {
          this.activate();
        } else if (isActive && toggle && hasSubMenu) {
          this.deactivate();
        }

        if (isActive && !hasSubMenu) {
          this.select({
            trigger: event
          });
        }
      }
    }
    /**
     * Handles on mouse over events.
     * @param event
     */

  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      var _this4 = this;

      this.clearTimer('timeout');

      if (event.target === this) {
        // When the mouse moves on an item clear any active items in it's submenu.
        if (this.hasSubMenu() && this.clearSubItemsOnHover) {
          // this.submenu.clearActiveChild();
          this.clearActiveChild();
        }

        if (this.element.contains(event.originalEvent.relatedTarget)) return;
        var activate = this.parent && this.parent.isActive && this.openOnHover !== null ? this.openOnHover : this.autoActivate;

        if (this.parent) {
          this.parent.publish('mouse-enter-item', this, event);
        }

        if (!this.isActive && !this.isDisabled) {
          if (activate === true) {
            this.activate(typeof this.delay === 'boolean' ? !this.delay : this.delay);
          } else if (typeof activate === 'number' && activate >= 0) {
            this.startTimer('activateItem', function () {
              if (!_this4.isDisabled) {
                _this4.activate(typeof _this4.delay === 'boolean' ? !_this4.delay : _this4.delay);
              }
            }, activate);
          }
        }
      }
    }
    /**
     * Handles on mouse out events.
     *
     * @param event
     */

  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      var _this5 = this;

      if (this.element.contains(event.originalEvent.relatedTarget)) return;
      this.clearTimer('activateItem');

      if (this.parent) {
        this.parent.publish('mouse-leave-item', this, event);
      }

      if (this.autoDeactivateItems === true && event.target === this && (!this.hasSubMenu() || !this.isSubMenuVisible()) && this.isActive) {
        this.deactivate();
      }

      if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
        this.startTimer('timeout', function () {
          _this5.deactivate();
        }, this.timeout);
      }
    } //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

  }, {
    key: "_navigate",
    value: function _navigate(event) {
      var _depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (_depth === 0 && this.hasSubMenu()) {
        return this.submenu._navigate(event, 0);
      } else if (this.parent) {
        return this.parent._navigate(event, _depth);
      }
    }
  }, {
    key: "submenu",
    get: function get() {
      return this.children[0];
    }
  }, {
    key: "positioner",
    get: function get() {
      if (_classPrivateFieldGet(this, _positioner) === 'inherit' || _classPrivateFieldGet(this, _positioner) === undefined) {
        var parent = this.parent;
        return parent ? parent.positioner : undefined;
      } else if (_classPrivateFieldGet(this, _positioner) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.positioner;
        }
      } else {
        return _classPrivateFieldGet(this, _positioner);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _positioner, value);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "delay",
    get: function get() {
      if (_classPrivateFieldGet(this, _delay) === 'inherit' || _classPrivateFieldGet(this, _delay) === undefined) {
        var parent = this.parent;
        return parent ? parent.delay : undefined;
      } else if (_classPrivateFieldGet(this, _delay) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.delay;
        }
      } else {
        return _classPrivateFieldGet(this, _delay);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _delay, value);
    }
  }, {
    key: "openOnHover",
    get: function get() {
      if (_classPrivateFieldGet(this, _openOnHover) === 'inherit' || _classPrivateFieldGet(this, _openOnHover) === undefined) {
        var parent = this.parent;
        return parent ? parent.openOnHover : undefined;
      } else if (_classPrivateFieldGet(this, _openOnHover) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.openOnHover;
        }
      } else {
        return _classPrivateFieldGet(this, _openOnHover);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _openOnHover, value);
    }
  }, {
    key: "autoActivate",
    get: function get() {
      if (_classPrivateFieldGet(this, _autoActivate) === 'inherit' || _classPrivateFieldGet(this, _autoActivate) === undefined) {
        var parent = this.parent;
        return parent ? parent.autoActivate : undefined;
      } else if (_classPrivateFieldGet(this, _autoActivate) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.autoActivate;
        }
      } else {
        return _classPrivateFieldGet(this, _autoActivate);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _autoActivate, value);
    }
  }, {
    key: "toggle",
    get: function get() {
      if (_classPrivateFieldGet(this, _toggle) === 'inherit' || _classPrivateFieldGet(this, _toggle) === undefined) {
        var parent = this.parent;
        return parent ? parent.toggle : undefined;
      } else if (_classPrivateFieldGet(this, _toggle) === 'root') {
        var root = this.root;

        if (root && root !== this) {
          return root.toggle;
        }
      } else {
        return _classPrivateFieldGet(this, _toggle);
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _toggle, value);
    }
  }], [{
    key: "getAttributes",
    value: function getAttributes(element) {
      return _objectSpread({}, _get(_getPrototypeOf(AbstractMenuItem), "getAttributes", this).call(this, element), {}, MENU_ITEM_ATTRIBUTE_SCHEMA.deserialize(element.dataset));
    }
  }]);

  return AbstractMenuItem;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _positioner = new WeakMap();

var _delay = new WeakMap();

var _toggle = new WeakMap();

var _autoActivate = new WeakMap();

var _openOnHover = new WeakMap();

var MenuItem =
/*#__PURE__*/
function (_AbstractMenuItem) {
  _inherits(MenuItem, _AbstractMenuItem);

  function MenuItem() {
    var _this6;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref2.target,
        _ref2$text = _ref2.text,
        text = _ref2$text === void 0 ? null : _ref2$text,
        action = _ref2.action,
        _ref2$href = _ref2.href,
        href = _ref2$href === void 0 ? null : _ref2$href,
        _ref2$toggle = _ref2.toggle,
        toggle = _ref2$toggle === void 0 ? "inherit" : _ref2$toggle,
        _ref2$autoActivate = _ref2.autoActivate,
        autoActivate = _ref2$autoActivate === void 0 ? "inherit" : _ref2$autoActivate,
        _ref2$openOnHover = _ref2.openOnHover,
        openOnHover = _ref2$openOnHover === void 0 ? "inherit" : _ref2$openOnHover,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? 'inherit' : _ref2$delay,
        _ref2$closeOnSelect = _ref2.closeOnSelect,
        closeOnSelect = _ref2$closeOnSelect === void 0 ? false : _ref2$closeOnSelect,
        _ref2$closeOnBlur = _ref2.closeOnBlur,
        closeOnBlur = _ref2$closeOnBlur === void 0 ? false : _ref2$closeOnBlur,
        _ref2$timeout = _ref2.timeout,
        timeout = _ref2$timeout === void 0 ? false : _ref2$timeout,
        _ref2$nodeName = _ref2.nodeName,
        nodeName = _ref2$nodeName === void 0 ? "div" : _ref2$nodeName,
        _ref2$positioner = _ref2.positioner,
        positioner = _ref2$positioner === void 0 ? "inherit" : _ref2$positioner;

    _classCallCheck(this, MenuItem);

    var btn, content, submenu;

    if (target) {
      target = Object(_core_utility__WEBPACK_IMPORTED_MODULE_2__["selectElement"])(target);
      btn = Object(_core_utility__WEBPACK_IMPORTED_MODULE_2__["findChild"])(target, "[data-button]");
      submenu = Object(_core_utility__WEBPACK_IMPORTED_MODULE_2__["findChild"])(target, "[data-menu]");

      if (submenu) {
        submenu.parentElement.removeChild(submenu);
      }

      if (!btn) {
        content = document.createDocumentFragment();

        while (target.firstChild) {
          content.appendChild(target.firstChild);
        }

        target.appendChild(Object(_core_utility__WEBPACK_IMPORTED_MODULE_2__["createFragment"])("\n                <a class=\"menuitem__button\" data-button>\n                    <span class=\"menuitem__check\"></span>\n                    <span class=\"menuitem__text\" data-text></span>\n                    <span class=\"menuitem__alt-text\" data-alt-text></span>\n                    <span class=\"menuitem__caret\"></span>\n                </a>"));
        var textContainer = target.querySelector('[data-text]');
        textContainer.appendChild(content);
      }
    } else {
      target = document.createElement(nodeName);
      target.appendChild(Object(_core_utility__WEBPACK_IMPORTED_MODULE_2__["createFragment"])("\n                <a class=\"menuitem__button\" data-button>\n                    <span class=\"menuitem__check\"></span>\n                    <span class=\"menuitem__text\" data-text></span>\n                    <span class=\"menuitem__alt-text\" data-alt-text></span>\n                    <span class=\"menuitem__caret\"></span>\n                </a>"));
    }

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).call(this, {
      toggle: toggle,
      autoActivate: autoActivate,
      openOnHover: openOnHover,
      delay: delay,
      closeOnSelect: closeOnSelect,
      closeOnBlur: closeOnBlur,
      timeout: timeout,
      positioner: positioner,
      clearSubItemsOnHover: true,
      autoDeactivateItems: true,
      target: target,
      text: text,
      href: href,
      nodeName: nodeName
    }));
    _this6.textContainer = _this6.element.querySelector("[data-text]"); // noinspection JSUnusedGlobalSymbols

    _this6.altTextContainer = _this6.element.querySelector("[data-alt-text]");
    _this6.button = _this6.element.querySelector("[data-button]");

    _this6.element.classList.add('menuitem');

    _this6.element.tabIndex = -1;
    if (action) _this6.addAction(action);

    if (submenu) {
      _this6.attachSubMenu(_this6.constructSubMenu({
        target: submenu
      }));
    }

    if (text !== null) {
      _this6.text = text;
    }

    if (href !== null) {
      _this6.href = href;
    }

    _this6.registerTopics();

    return _this6;
  }

  _createClass(MenuItem, [{
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new MenuItem(config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new _Menu__WEBPACK_IMPORTED_MODULE_1__["default"](config);
    }
  }, {
    key: "text",
    get: function get() {
      return this.textContainer.innerText;
    },
    set: function set(value) {
      this.textContainer.innerText = value;
    }
  }, {
    key: "href",
    get: function get() {
      if (this.button.nodeName === "A") {
        return this.button.href;
      } else {
        return null;
      }
    },
    set: function set(value) {
      if (this.button.nodeName === 'A') {
        this.button.href = value;
      } else {
        throw new Error("Cannot assign href to menuitem who's button is not an anchor tag.");
      }
    }
  }]);

  return MenuItem;
}(AbstractMenuItem);



/***/ }),

/***/ "./src/menu/MenuNode.js":
/*!******************************!*\
  !*** ./src/menu/MenuNode.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuNode; });
/* harmony import */ var core_Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Publisher */ "./src/core/Publisher.js");
/* harmony import */ var core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/errors */ "./src/core/errors.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility */ "./src/menu/utility.js");
/* harmony import */ var _core_utility_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility/dom */ "./src/core/utility/dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * The base class for Menu and MenuItem.  Provides the utilities that are necessary to manage and transverse the menu tree
 * and propagate events throughout it.
 * @extends {Publisher}
 */

var MenuNode =
/*#__PURE__*/
function (_Publisher) {
  _inherits(MenuNode, _Publisher);

  function MenuNode(element) {
    var _this;

    _classCallCheck(this, MenuNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuNode).call(this));

    _parent.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _children.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _element.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _timers.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _parent, null);

    _classPrivateFieldSet(_assertThisInitialized(_this), _children, []);

    _classPrivateFieldSet(_assertThisInitialized(_this), _timers, {});

    _this._eventListeners = {};
    _this._keyboardNavigationEnabled = false;
    _this.nodeType = null;
    _this.isController = false; // noinspection JSUnusedGlobalSymbols

    _this.closeOnSelect = false;
    _this.element = element ? Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_3__["selectElement"])(element) : null;
    return _this;
  }
  /**
   * Initializes the event listeners for the menu tree.  Click, mouse-over and mouse-out are bound.  Events are
   * delegated to their child nodes as needed.  If an event is received where the node is the direct controller of
   * the event will be ignored.
   */


  _createClass(MenuNode, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var handleEvent = function handleEvent(event) {
        var target = _this2.getTargetNode(event.target),
            wrappedEvent = {
          target: target,
          originalEvent: event
        };

        if (target.getEventDelegator() === _this2) {
          target.dispatchTopic("event.".concat(event.type), wrappedEvent);
        }
      };

      this.addEventListener('mousedown', handleEvent);
      this.addEventListener('mouseover', handleEvent);
      this.addEventListener('mouseout', handleEvent);
      this.addEventListener('click', handleEvent);
      this.addEventListener('keydown', handleEvent);
      this.isController = true;
      this.publish('init', this);
    }
  }, {
    key: "initKeyboardNavigation",
    value: function initKeyboardNavigation() {
      if (!this._keyboardNavigationEnabled) {
        this._keyboardNavigationEnabled = true;
      }
    }
  }, {
    key: "registerTopics",
    value: function registerTopics() {
      var _this3 = this;

      if (this._isTopicInit) return;
      this._isTopicInit = true;
      this.on('event.keydown', function (topic) {
        return _this3.onKeyDown(topic);
      });
    }
    /**
     * Unbinds all event listeners.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.clearAllRegisteredEvents();
      this.isController = false; // noinspection JSUnusedGlobalSymbols

      this._keyboardNavigationEnabled = false;
      this.element = null;
      this.publish('destroy', this);
    } //------------------------------------------------------------------------------------------------------------------
    // Tree transversal and manipulation functions.

    /**
     * Reference to the nodes parent or null if it is the root node of the tree.
     *
     * @returns {null|MenuNode}
     */

  }, {
    key: "appendChildMenuNode",
    value: function appendChildMenuNode(menuNode) {
      if (_classPrivateFieldGet(menuNode, _parent) === this) return;

      if (_classPrivateFieldGet(menuNode, _parent)) {
        _classPrivateFieldGet(menuNode, _parent).removeChildMenuNode(menuNode);
      }

      _classPrivateFieldGet(this, _children).push(menuNode);

      _classPrivateFieldSet(menuNode, _parent, this);
    }
  }, {
    key: "removeChildMenuNode",
    value: function removeChildMenuNode(menuNode) {
      if (_classPrivateFieldGet(menuNode, _parent) !== this) return;

      var i = _classPrivateFieldGet(_classPrivateFieldGet(menuNode, _parent), _children).indexOf(this);

      if (i !== -1) {
        _classPrivateFieldGet(_classPrivateFieldGet(menuNode, _parent), _children).splice(i, 1);
      }

      _classPrivateFieldSet(menuNode, _parent, null);
    }
  }, {
    key: "hasChildMenuNode",
    value: function hasChildMenuNode(menuNode) {
      return _classPrivateFieldGet(this, _children).indexOf(menuNode) !== -1;
    }
  }, {
    key: "clearChildMenuNodes",
    value: function clearChildMenuNodes() {
      while (_classPrivateFieldGet(this, _children).length) {
        this.removeChildMenuNode(_classPrivateFieldGet(this, _children)[0]);
      }
    }
    /**
     * Reference to the root node of the tree.
     *
     * @returns {MenuNode}
     */

  }, {
    key: "hasChild",
    value: function hasChild(child) {
      return _classPrivateFieldGet(this, _children).indexOf(child) !== -1;
    }
  }, {
    key: "getOffsetSibling",

    /**
     * Return the sibling offset from the current node.
     *
     * @param offset
     * @returns {null|MenuNode}
     */
    value: function getOffsetSibling() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var parent = this.parent;

      if (parent) {
        var children = parent.children,
            i = children ? children.indexOf(this) : -1;

        if (i >= 0) {
          i += offset;

          if (i >= 0) {
            return children[i];
          }
        }
      }

      return null;
    }
    /**
     * Returns the closest MenuNode up the tree that matches the provided test function.
     *
     * @param fn {function(node)}
     * @returns {MenuNode|null}
     */

  }, {
    key: "closest",
    value: function closest(fn) {
      var o = this;

      while (o) {
        if (fn.call(this, o)) return o;
        o = o.parent;
      }

      return null;
    }
    /**
     * Returns true if the provided node is a descendant of the current node.
     *
     * @param node
     * @returns {boolean}
     */

  }, {
    key: "contains",
    value: function contains(node) {
      if (node.nodeType) {
        node = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getClosestMenuNodeByElement"])(node);
        return node ? this.contains(node) : false;
      }

      while (node) {
        if (node === this) {
          return true;
        }

        node = node.parent;
      }

      return false;
    }
    /**
     * Checks to see if the element is contained within the menu node.  Has to check every child manually since
     * it's not guaranteed that children are descendants of their parent menu nodes in the dom tree.  Probably a very
     * costly method, shouldn't be overused.
     *
     * @param element
     * @returns {boolean}
     */

  }, {
    key: "containsElement",
    value: function containsElement(element) {
      if (this.element.contains(element)) {
        return true;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child.containsElement(element)) {
            return true;
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

      return false;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Yields all descendants.
     *
     * @returns {IterableIterator<MenuNode>}
     */

  }, {
    key: "getDescendants",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function getDescendants() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, child, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, grandchild;

      return regeneratorRuntime.wrap(function getDescendants$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 3;
              _iterator2 = this.children[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 38;
                break;
              }

              child = _step2.value;
              _context.next = 9;
              return child;

            case 9:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 12;
              _iterator3 = child.getDescendants()[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context.next = 21;
                break;
              }

              grandchild = _step3.value;
              _context.next = 18;
              return grandchild;

            case 18:
              _iteratorNormalCompletion3 = true;
              _context.next = 14;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](12);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 30:
              _context.prev = 30;

              if (!_didIteratorError3) {
                _context.next = 33;
                break;
              }

              throw _iteratorError3;

            case 33:
              return _context.finish(30);

            case 34:
              return _context.finish(27);

            case 35:
              _iteratorNormalCompletion2 = true;
              _context.next = 5;
              break;

            case 38:
              _context.next = 44;
              break;

            case 40:
              _context.prev = 40;
              _context.t1 = _context["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 44:
              _context.prev = 44;
              _context.prev = 45;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 47:
              _context.prev = 47;

              if (!_didIteratorError2) {
                _context.next = 50;
                break;
              }

              throw _iteratorError2;

            case 50:
              return _context.finish(47);

            case 51:
              return _context.finish(44);

            case 52:
            case "end":
              return _context.stop();
          }
        }
      }, getDescendants, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
    })
    /**
     * Returns the closest menu node instance bound to an element for the target HTMLElement in the current menu tree.
     *
     * @param target {HTMLElement}
     * @returns {null|MenuNode}
     */

  }, {
    key: "getTargetNode",
    value: function getTargetNode(target) {
      var o = target;

      while (o) {
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getMenuInstance"])(o);

        if (instance) {
          return instance;
        }

        if (o === this.element) {
          break;
        }

        o = o.parentElement;
      }

      return null;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the target item for the given HTMLElement in the current menu tree.
     *
     * @param target
     * @returns {null}
     */

  }, {
    key: "getTargetItem",
    value: function getTargetItem(target) {
      var o = target;

      while (o) {
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getMenuInstance"])(o);

        if (instance && instance.isMenuItem()) {
          return instance;
        }

        if (o === this.element) {
          break;
        }

        o = o.parentElement;
      }

      return null;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the target menu for the given HTMLElement in the current menu tree.
     *
     * @param target
     * @returns {null}
     */

  }, {
    key: "getTargetMenu",
    value: function getTargetMenu(target) {
      var o = target;

      while (o) {
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getMenuInstance"])(o);

        if (instance && instance.isMenu()) {
          return instance;
        }

        if (o === this.element) {
          break;
        }

        o = o.parentElement;
      }

      return null;
    } //------------------------------------------------------------------------------------------------------------------
    // Widget functions

    /**
     * Returns true if the current node is visible.
     *
     * @returns {boolean}
     */

  }, {
    key: "hasElement",
    // noinspection JSUnusedGlobalSymbols

    /**
     * Returns true if the nodes element is defined.
     *
     * @returns {boolean}
     */
    value: function hasElement() {
      return !!_classPrivateFieldGet(this, _element);
    }
    /**
     * Gets the root HTMLElement of the node.
     *
     * @returns {HTMLElement}
     */

  }, {
    key: "appendTo",

    /**
     * Appends the component to the target selector.
     *
     * @param selector {string|HTMLElement|{append}}
     */
    value: function appendTo(selector) {
      if (typeof selector === 'string') {
        document.querySelector(selector).appendChild(this.element);
      } else if (selector.appendChild) {
        selector.appendChild(this.element);
      } else if (selector.append) {
        selector.append(this.element);
      }
    }
    /**
     * Removes the component from the dom.
     *
     * @returns {MenuNode}
     */

  }, {
    key: "remove",
    value: function remove() {
      if (this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }

      return this;
    }
  }, {
    key: "addClass",
    // noinspection JSUnusedGlobalSymbols
    value: function addClass(classes) {
      return Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_3__["addClasses"])(this.element, classes);
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "removeClass",
    value: function removeClass(classes) {
      return Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_3__["removeClasses"])(this.element, classes);
    } //------------------------------------------------------------------------------------------------------------------
    // Menu state functions

    /**
     * True if the node is active.
     *
     * @returns {boolean}
     */

  }, {
    key: "getDisabled",

    /**
     * Returns true if the current node is disabled or if any ancestor node is disabled.
     *
     * @returns {boolean}
     */
    value: function getDisabled() {
      var o = this;

      while (o) {
        if (o.isDisabled) {
          return true;
        }

        o = o.parent;
      }

      return false;
    }
    /**
     * Returns true if the node is a menu item.  Should be overridden by subclasses that are menu item like.
     *
     * @returns {boolean}
     */

  }, {
    key: "isMenuItem",
    value: function isMenuItem() {
      return false;
    }
    /**
     * Returns true if the node is a menu.  Method should be defined by any object that should be treated like a menu.
     *
     * @returns {boolean}
     */

  }, {
    key: "isMenu",
    value: function isMenu() {
      return false;
    } //------------------------------------------------------------------------------------------------------------------
    // Timer, topic and event functions

    /**
     * Creates a timer with the given name.  Only one timer with that name can be active per object.
     * If another timer with the same name is created the previous one will be cleared if `clear` is true.
     * Otherwise if `clear` is false a KeyError with be thrown.  The callback function for the timer is called
     * with the current object as it's `this` and the timer object as it's only parameter following the pattern
     *
     * this::fn(timer);
     *
     * @param name {String} The name of the timer.
     * @param fn {function(timer)} Function to call.
     * @param time {Number} The time to wait.
     * @param interval If true setInterval will be used instead of setTimeout
     * @param clear If true an previous timers of the same name will be canceled before creating a new one.  Otherwise a KeyError will be thrown.
     * @returns {{status, id, cancel, type}}
     */

  }, {
    key: "startTimer",
    value: function startTimer(name, fn, time) {
      var _this4 = this;

      var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (clear && _classPrivateFieldGet(this, _timers)[name]) {
        _classPrivateFieldGet(this, _timers)[name].cancel();
      } else if (_classPrivateFieldGet(this, _timers)[name]) {
        throw new core_errors__WEBPACK_IMPORTED_MODULE_1__["KeyError"]("Timer already exists.");
      }

      var timer = _classPrivateFieldGet(this, _timers)[name] = {
        status: 'running',
        id: null,
        cancel: null,
        type: null
      };

      if (interval) {
        var id = timer.id = setInterval(function (timer) {
          fn.call(_this4, timer);
        }, time, timer);
        timer.type = 'interval';

        timer.cancel = function () {
          if (_classPrivateFieldGet(_this4, _timers)[name] === timer) {
            clearInterval(id);
            delete _classPrivateFieldGet(_this4, _timers)[name];
            timer.status = 'canceled';
          }
        };
      } else {
        var _id = timer.id = setTimeout(function (timer) {
          delete _classPrivateFieldGet(_this4, _timers)[name];
          timer.status = 'complete';
          fn.call(_this4, timer);
        }, time, timer);

        timer.type = 'timeout';

        timer.cancel = function () {
          if (_classPrivateFieldGet(_this4, _timers)[name] === timer) {
            clearTimeout(_id);
            delete _classPrivateFieldGet(_this4, _timers)[name];
            timer.status = 'canceled';
          }
        };
      }

      return timer;
    }
    /**
     * Clears the timer with the given name.
     *
     * @param name
     * @returns {boolean} True if a timer was canceled. False if not timer exists.
     */

  }, {
    key: "clearTimer",
    value: function clearTimer(name) {
      if (_classPrivateFieldGet(this, _timers)[name]) {
        _classPrivateFieldGet(this, _timers)[name].cancel();

        return true;
      }

      return false;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the timer object if it exists.
     *
     * @param name
     * @returns {*}
     */

  }, {
    key: "getTimer",
    value: function getTimer(name) {
      return _classPrivateFieldGet(this, _timers)[name];
    }
    /**
     * Returns the MenuNode that is responsible for delegating the events.
     *
     * @returns {null|{isController}|*}
     */

  }, {
    key: "getEventDelegator",
    value: function getEventDelegator() {
      var o = this.element;

      while (o) {
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getMenuInstance"])(o);

        if (instance && instance.isController) {
          return instance;
        }

        o = o.parentElement;
      }

      return null;
    }
    /**
     * Publishes the topic to itself and bubbles up the menu tree.
     *
     * @param topic
     * @param args
     */

  }, {
    key: "dispatchTopic",
    value: function dispatchTopic(topic) {
      var o = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      while (o) {
        var _o;

        if ((_o = o).publish.apply(_o, [topic].concat(args)) === core_Publisher__WEBPACK_IMPORTED_MODULE_0__["STOP"]) {
          return core_Publisher__WEBPACK_IMPORTED_MODULE_0__["STOP"];
        }

        o = o.parent;
      }
    }
  }, {
    key: "clearAllRegisteredEvents",
    value: function clearAllRegisteredEvents() {
      if (this.element) {
        for (var _i = 0, _Object$keys = Object.keys(this._eventListeners); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this._eventListeners[key][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var listener = _step4.value;
              this.element.removeEventListener(key, listener.callback, listener.bubble);
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
        }
      }

      this._eventListeners = {};
    }
  }, {
    key: "_registerAllEvents",
    value: function _registerAllEvents() {
      for (var _i2 = 0, _Object$keys2 = Object.keys(this._eventListeners); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._eventListeners[key][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var listener = _step5.value;
            this.element.addEventListener(key, listener.callback, listener.bubble);
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
      }
    }
    /**
     * A wrapper function around calling this.element.addEventListener.  Will register a listener on the element.
     * This function keeps a record of the event listeners that are attached to the element.  If the element
     * hasn't been rendered yet and this function is called attaching the element will be delayed until element is set.
     *
     * @param name
     * @param callback
     * @param bubble
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(name, callback) {
      var bubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this._eventListeners[name]) {
        this._eventListeners[name] = [];
      }

      var listener = {
        callback: callback,
        bubble: bubble
      };

      this._eventListeners[name].push(listener);

      if (this.element) {
        this.element.addEventListener(name, callback, bubble);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(name, callback) {
      var bubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this._eventListeners[name]) {
        for (var i = 0, l = this._eventListeners[name].length; i < l; i++) {
          var listener = this._eventListeners[name][i];

          if (listener.callback === callback && listener.bubble === bubble) {
            this._eventListeners.splice(i, 1);

            if (!this._eventListeners[name].length) {
              delete this._eventListeners[name];
            }

            return listener;
          }
        }
      }

      return null;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "hasEventListener",
    value: function hasEventListener(name, callback) {
      var bubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this._eventListeners[name]) {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this._eventListeners[name][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var listener = _step6.value;

            if (listener.callback === callback && listener.bubble === bubble) {
              return true;
            }
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
      }

      return false;
    }
  }, {
    key: "_rootKeyDown",
    value: function _rootKeyDown(topic) {
      if (this.isRoot) {
        var event = topic.originalEvent;

        if (event.key === "Escape") {
          this.deactivate(); // noinspection JSUnresolvedFunction

          document.activeElement.blur();
          return;
        }

        var activeItem = this.activeItem,
            target = activeItem ? activeItem.parentMenu : this;

        target._navigate(event);
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(topic) {
      if (this._keyboardNavigationEnabled) {
        this._rootKeyDown(topic);
      }
    } //------------------------------------------------------------------------------------------------------------------
    // Tree parsing functions.

    /**
     * Parses the dom and initializes any menu or menuitem elements that are found.
     */

  }, {
    key: "parseDOM",
    value: function parseDOM() {
      var _this5 = this;

      var walk = function walk(node) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = node.children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var child = _step7.value;

            if (Object(_utility__WEBPACK_IMPORTED_MODULE_2__["hasMenuInstance"])(child)) {
              var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getMenuInstance"])(child);

              if (!_this5.hasChildMenuNode(instance)) {
                _this5.appendChildMenuNode(instance);
              }

              instance.parseDOM();
            } else {
              var hasMenuItemAttribute = child.hasAttribute('data-menuitem'),
                  hasMenuAttribute = child.hasAttribute('data-menu');

              if (hasMenuAttribute && hasMenuItemAttribute) {
                throw new Error("Element cannot be both a menuitem and a menu.");
              } else if (hasMenuAttribute) {
                var menu = _this5.constructSubMenu({
                  target: child
                });

                _this5.appendChildMenuNode(menu);
              } else if (hasMenuItemAttribute) {
                var item = _this5.constructMenuItem({
                  target: child
                });

                _this5.appendChildMenuNode(item);
              } else {
                walk(child);
              }
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      };

      walk(this.element);
    }
    /**
     * @abstract
     * @param config
     */

  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {}
    /**
     * @abstract
     * @param config
     */

  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {} // noinspection JSUnusedGlobalSymbols

    /**
     * Invalidates all parent and child references.
     */

  }, {
    key: "invalidateTree",
    value: function invalidateTree() {
      _classPrivateFieldSet(this, _parent, null);

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var child = _step8.value;
          child.invalidateTree();
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      _classPrivateFieldSet(this, _children, []);
    } //------------------------------------------------------------------------------------------------------------------
    // Static functions
    // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the bound menu controller for the provided node.
     *
     * @static
     * @param element {HTMLElement}
     */

  }, {
    key: "parent",
    get: function get() {
      return _classPrivateFieldGet(this, _parent) || null;
    }
    /**
     * A list of all children for the node.
     *
     * @returns {[]}
     */

  }, {
    key: "children",
    get: function get() {
      return _classPrivateFieldGet(this, _children).slice(0);
    }
  }, {
    key: "root",
    get: function get() {
      var r = this,
          o = this;

      while (o) {
        o = o.parent;

        if (o) {
          r = o;
        }
      }

      return r;
    }
    /**
     * Reference to the first ancestor node in the menu tree who is a menu.  Returns null if it does not exist.
     *
     * @returns {MenuNode|null}
     */

  }, {
    key: "parentMenu",
    get: function get() {
      var parent = this.parent; // noinspection JSUnresolvedVariable,JSUnresolvedFunction

      return parent ? parent.closest(function (node) {
        return node.isMenu();
      }) : null;
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Reference to the first ancestor node in the menu tree who is an item. Returns null if it does not exist.
     *
     * @returns {MenuNode|null}
     */

  }, {
    key: "parentItem",
    get: function get() {
      var parent = this.parent; // noinspection JSUnresolvedVariable,JSUnresolvedFunction

      return parent ? parent.closest(function (node) {
        return node.isMenuItem();
      }) : null;
    }
    /**
     * Reference to the next sibling node in the menu tree.
     *
     * @returns {MenuNode|null}
     */

  }, {
    key: "nextSibling",
    get: function get() {
      return this.getOffsetSibling(1);
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Reference to the previous sibling node in the menu tree.
     *
     * @returns {MenuNode|null}
     */

  }, {
    key: "previousSibling",
    get: function get() {
      return this.getOffsetSibling(-1);
    }
  }, {
    key: "isRoot",
    get: function get() {
      return this.root === this;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "enabledChildren",
    get: function get() {
      return this.children.filter(function (item) {
        return !item.isDisabled;
      });
    }
    /**
     * Returns the target active item in the tree.
     * @returns {*|{isActive}|null}
     */

  }, {
    key: "activeItem",
    get: function get() {
      var activeItem = null;

      if (this.isActive) {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var child = _step9.value;

            if (child.isActive) {
              if (child.isMenuItem && child.isMenuItem()) {
                activeItem = child.activeItem || child;
              } else {
                activeItem = child.activeItem || activeItem;
              }

              break;
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }
      }

      return activeItem;
    }
  }, {
    key: "isVisible",
    get: function get() {
      return !this.element.classList.contains('hidden');
    }
    /**
     * Sets the visible state of the node.
     *
     * @param value
     */
    ,
    set: function set(value) {
      value = !!value;

      if (value !== this.isVisible) {
        if (value) {
          this.element.classList.remove('hidden');
          this.element.classList.add('visible');
        } else {
          this.element.classList.add('hidden');
          this.element.classList.remove('visible');
        }
      }
    }
    /**
     * Returns true if the current node is disabled.
     *
     * @returns {boolean}
     */

  }, {
    key: "isDisabled",
    get: function get() {
      return this.element.classList.contains('disabled');
    }
    /**
     * Sets the disabled state for the current node.
     *
     * @param value
     */
    ,
    set: function set(value) {
      value = !!value;

      if (value !== this.isDisabled) {
        if (value) {
          this.element.classList.add('disabled');
        } else {
          this.element.classList.remove('disabled');
        }
      }
    }
    /**
     * Alias for isDisabled getter.
     * @returns {boolean}
     */

  }, {
    key: "disabled",
    get: function get() {
      return this.isDisabled;
    }
    /**
     * Alias for isDisabled setter.
     * @param value
     */
    ,
    set: function set(value) {
      this.isDisabled = value;
    }
  }, {
    key: "element",
    get: function get() {
      if (_classPrivateFieldGet(this, _element) === undefined) {
        this.element = this.render({});
      }

      return _classPrivateFieldGet(this, _element);
    }
    /**
     * Sets the root HTMLElement of the node.
     *
     * @param element
     */
    ,
    set: function set(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      } else if (typeof element === 'function') {
        element = element.call(this);
      }

      if (_classPrivateFieldGet(this, _element) === element) return;

      if (Object(_utility__WEBPACK_IMPORTED_MODULE_2__["hasMenuInstance"])(element)) {
        throw new Error("Element is already bound to menu controller");
      }

      if (_classPrivateFieldGet(this, _element)) {
        this.clearAllRegisteredEvents();
        Object(_utility__WEBPACK_IMPORTED_MODULE_2__["detachMenuInstance"])(_classPrivateFieldGet(this, _element));

        _classPrivateFieldSet(this, _element, undefined);
      }

      Object(_utility__WEBPACK_IMPORTED_MODULE_2__["attachMenuInstance"])(element, this);

      _classPrivateFieldSet(this, _element, element);

      this._registerAllEvents();
    }
  }, {
    key: "id",
    get: function get() {
      return this.element.id;
    },
    set: function set(id) {
      if (this.element) this.element.id = id;
    }
  }, {
    key: "classList",
    get: function get() {
      return this.element.classList;
    },
    set: function set(value) {
      this.element.classList = value;
    }
  }, {
    key: "dataset",
    get: function get() {
      return this.element.dataset;
    },
    set: function set(value) {
      this.element.dataset = value;
    }
  }, {
    key: "style",
    get: function get() {
      return this.element.style;
    },
    set: function set(style) {
      this.element.style = style;
    }
  }, {
    key: "isActive",
    get: function get() {
      return this.element.classList.contains('active');
    }
    /**
     * Sets the isActive state for the node.
     *
     * Will toggle the active class on the root element as needed.
     *
     * @param value
     */
    ,
    set: function set(value) {
      value = !!value;

      if (value !== this.isActive) {
        if (value) {
          this.element.classList.add('active');
        } else {
          this.element.classList.remove('active');
        }
      }
    }
  }, {
    key: "isNavigable",

    /**
     * Used to determine if an item is navigable during keyboard navigation.
     * @returns {boolean}
     * @private
     */
    get: function get() {
      return !this.isDisabled && this.isVisible;
    }
  }], [{
    key: "getInstance",
    value: function getInstance(element) {
      return Object(_utility__WEBPACK_IMPORTED_MODULE_2__["getMenuInstance"])(element);
    } // noinspection JSUnusedLocalSymbols

  }, {
    key: "getAttributes",
    value: function getAttributes(element) {
      return {};
    }
    /**
     * Constructs a menu node element for an HTMLElement.
     * @param element {HTMLElement|string}
     * @returns {MenuNode}
     * @constructor
     */

  }, {
    key: "FromHTML",
    value: function FromHTML(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      var config = this.getAttributes(element); // let parameters = Attribute.deserialize(element.dataset, this.__attributes__);
      //
      // parameters.target = element;

      return new this(_objectSpread({
        target: element
      }, config));
    }
  }]);

  return MenuNode;
}(core_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);

var _parent = new WeakMap();

var _children = new WeakMap();

var _element = new WeakMap();

var _timers = new WeakMap();



/***/ }),

/***/ "./src/menu/Select2.js":
/*!*****************************!*\
  !*** ./src/menu/Select2.js ***!
  \*****************************/
/*! exports provided: SelectOption, FILTERS, SelectMenu, AbstractSelect, RichSelect, MultiComboBox, ComboBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectOption", function() { return SelectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTERS", function() { return FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMenu", function() { return SelectMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractSelect", function() { return AbstractSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RichSelect", function() { return RichSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiComboBox", function() { return MultiComboBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComboBox", function() { return ComboBox; });
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utility */ "./src/menu/utility.js");
/* harmony import */ var _forms___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../forms/ */ "./src/forms/index.js");
/* harmony import */ var _core_serialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/serialize */ "./src/core/serialize/index.js");
/* harmony import */ var _core_utility_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utility/dom */ "./src/core/utility/dom.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




 // import {inherit} from "./decorators";





function copyNodeData(targetNode, referenceNode) {
  targetNode.className = referenceNode.className;
  targetNode.id = referenceNode.id;
  Object.assign(targetNode.dataset, referenceNode.dataset);
}

function createOption(node) {
  var option = document.createElement('div');
  copyNodeData(option, node);
  option.dataset.value = node.value;
  option.innerHTML = node.innerHTML;
  option.setAttribute('data-menuitem', '');

  if (node.selected) {
    option.classList.add('selected');
  }

  return option;
}

function createOptGroup(node) {
  var r = document.createElement('div');
  copyNodeData(r, node);
  r.classList.add('menu__optgroup');

  if (node.label) {
    var title = document.createElement('h3');
    title.innerHTML = node.label;
    r.appendChild(title);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;
      r.appendChild(createOption(child));
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
 * The class SelectOption is used to construct an item contained in SelectMenu object.
 */


var SelectOption =
/*#__PURE__*/
function (_AbstractMenuItem) {
  _inherits(SelectOption, _AbstractMenuItem);

  function SelectOption() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref.target,
        text = _ref.text,
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? null : _ref$value,
        _ref$targetKey = _ref.targetKey,
        targetKey = _ref$targetKey === void 0 ? null : _ref$targetKey;

    _classCallCheck(this, SelectOption);

    var targetChildren = null;

    if (typeof target === 'string') {
      target = document.querySelector(target);
    }

    if (target) {
      // Save target children to add to the text output later.
      targetChildren = document.createDocumentFragment();

      while (target.firstChild) {
        targetChildren.appendChild(target.firstChild);
      }
    } else {
      target = document.createElement('div');
    }

    target.classList.add('select-option');
    var fragment = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["createFragment"])("\n            <a class=\"select-option__body\">\n                <span class=\"select-option__check\" data-check><i class=\"fas fa-check\"></i></span>\n                <span data-text class=\"select-option__text\"></span>\n                <span data-alt-text class=\"select-option__alt\"></span>\n            </a>\n        ");
    target.appendChild(fragment);
    target.setAttribute('aria-role', 'option');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectOption).call(this, {
      toggle: "inherit",
      autoActivate: true,
      openOnHover: true,
      delay: 0,
      closeOnSelect: false,
      closeOnBlur: false,
      timeout: false,
      clearSubItemsOnHover: true,
      autoDeactivateItems: "auto",
      targetKey: targetKey,
      target: target
    }));
    _this.textContainer = _this.element.querySelector('[data-text]'); // If initializing the object from a target element
    // the label text is gathered from the children of the target

    if (targetChildren) {
      _this.textContainer.appendChild(targetChildren);
    } else if (text) {
      var textNode = document.createTextNode(text);

      _this.textContainer.appendChild(textNode);
    }

    if (value !== null && value !== undefined) {
      _this.value = value;
    }

    _this.registerTopics();

    return _this;
  }

  _createClass(SelectOption, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this2 = this;

      _get(_getPrototypeOf(SelectOption.prototype), "registerTopics", this).call(this);

      this.on('menuitem.select', function (topic) {
        if (_this2.isSelected && _this2.toggle) {
          _this2.isSelected = false;

          _this2.dispatchTopic('option.deselect', _objectSpread({}, topic, {
            target: _this2,
            menu: _this2,
            relatedTarget: topic.target,
            trigger: topic
          }));
        } else if (!_this2.isSelected) {
          _this2.isSelected = true;

          _this2.dispatchTopic('option.select', _objectSpread({}, topic, {
            target: _this2,
            menu: _this2,
            relatedTarget: topic.target,
            trigger: topic
          }));
        }
      });
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Selects the options and publishes a [option.select] topic.
     *
     * @param topicData
     */

  }, {
    key: "optionSelect",
    value: function optionSelect() {
      var topicData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _get(_getPrototypeOf(SelectOption.prototype), "select", this).call(this);

      if (this.isSelected) return;
      this.isSelected = true;

      if (!this.isActive) {
        this.activate();
      }

      this.dispatchTopic('option.select', _objectSpread({
        target: this,
        menu: this
      }, topicData));
    }
    /**
     * Deselect the SelectOption if it is selected and publishes an [option.deselect] topic.
     * @param topicData
     */

  }, {
    key: "optionDeselect",
    value: function optionDeselect() {
      var topicData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.isSelected) return;
      this.isSelected = false;
      if (this.isActive) this.deactivate();
      this.dispatchTopic('option.deselect', _objectSpread({
        target: this,
        menu: this
      }, topicData));
    }
    /**
     * Handles on mouse out events.
     *
     * @param event
     */

  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {
      if (this.element.contains(event.originalEvent.relatedTarget)) return; // Do default action.

      var r = _get(_getPrototypeOf(SelectOption.prototype), "onMouseOut", this).call(this, event); // If autoDeactiveItems is auto determine if the SelectOption should deactivate
      // by checking parent allows multiSelect.
      // noinspection JSIncompatibleTypesComparison


      if (this.isActive && event.target === this && this.autoDeactivateItems === 'auto') {
        var parent = this.parent;
        var autoDeactivateItems = !!(parent && parent.multiSelect);

        if (autoDeactivateItems && (!this.hasSubMenu() || !this.isSubMenuVisible())) {
          this.deactivate();
        }
      }

      return r;
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "isSelectMenu",
    value: function isSelectMenu() {
      return true;
    }
    /**
     * Returns true if the option is selected.
     * @returns {boolean}
     */

  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new _MenuItem__WEBPACK_IMPORTED_MODULE_0__["default"](config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new _Menu__WEBPACK_IMPORTED_MODULE_1__["default"](config);
    }
  }, {
    key: "isSelected",
    get: function get() {
      return this.element.classList.contains('selected');
    }
    /**
     * Sets the options selected state to true or false.
     * @param value
     */
    ,
    set: function set(value) {
      value = !!value;

      if (value !== this.isSelected) {
        if (value) {
          this.element.classList.add('selected');
        } else {
          this.element.classList.remove('selected');
        }
      }
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "isFiltered",
    get: function get() {
      return this.classList.contains('filtered');
    } // noinspection JSUnusedGlobalSymbols
    ,
    set: function set(value) {
      if (value) {
        this.classList.add('filtered');
        this.isVisible = false;
      } else {
        this.classList.remove('filtered');
        this.isVisible = true;
      }
    }
    /**
     * Returns the options value.
     * @returns {string}
     */

  }, {
    key: "value",
    get: function get() {
      return this.element.dataset.value;
    }
    /**
     * Sets the options value.
     * @param value
     */
    ,
    set: function set(value) {
      this.element.dataset.value = value;
    }
    /**
     * Return the options inner html.
     * @returns {*}
     */

  }, {
    key: "text",
    get: function get() {
      return this.textContainer.innerText.trim();
    }
    /**
     * Sets the options inner html.
     * @param value
     */
    ,
    set: function set(value) {
      this.textContainer.innerText = (value + "").trim();
    } // noinspection JSUnusedGlobalSymbols

    /**
     * Returns the options parent select-menu or null.
     * @returns {null|{isSelect}|MenuNode}
     */

  }, {
    key: "parentSelect",
    get: function get() {
      var o = this.parent;

      while (o) {
        if (o.isSelect && o.isSelect()) {
          return o;
        }

        o = o.parent;
      }

      return null;
    }
  }, {
    key: "isNavigable",
    get: function get() {
      return !this.isDisabled && this.isVisible && !this.isFiltered;
    }
  }]);

  return SelectOption;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["AbstractMenuItem"]); // noinspection JSUnusedGlobalSymbols

var FILTERS = {
  startsWith: function startsWith(value) {
    return function (item) {
      return item.text.indexOf(value) !== 0;
    };
  },
  istartsWith: function istartsWith(value) {
    return function (item) {
      return item.text.toLowerCase().indexOf(value.toLowerCase()) !== 0;
    };
  },
  contains: function contains(value) {
    return function (item) {
      return item.text.indexOf(value) !== -1;
    };
  },
  icontains: function icontains(value) {
    return function (item) {
      return item.text.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    };
  }
};
/**
 * Creates a menu that contains SelectOptions.
 */

var SelectMenu =
/*#__PURE__*/
function (_AbstractMenu) {
  _inherits(SelectMenu, _AbstractMenu);

  // @inherit multiSelect;
  function SelectMenu() {
    var _this3;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref2.target,
        _ref2$filter = _ref2.filter,
        filter = _ref2$filter === void 0 ? null : _ref2$filter,
        _ref2$placeholder = _ref2.placeholder,
        placeholder = _ref2$placeholder === void 0 ? "No Items Found" : _ref2$placeholder,
        _ref2$filterDelay = _ref2.filterDelay,
        filterDelay = _ref2$filterDelay === void 0 ? 500 : _ref2$filterDelay,
        _ref2$filterPlacehold = _ref2.filterPlaceholderText,
        filterPlaceholderText = _ref2$filterPlacehold === void 0 ? "Search" : _ref2$filterPlacehold,
        _ref2$toggle = _ref2.toggle,
        toggle = _ref2$toggle === void 0 ? false : _ref2$toggle,
        _ref2$enableShiftSele = _ref2.enableShiftSelect,
        enableShiftSelect = _ref2$enableShiftSele === void 0 ? true : _ref2$enableShiftSele,
        _ref2$enableCtrlToggl = _ref2.enableCtrlToggle,
        enableCtrlToggle = _ref2$enableCtrlToggl === void 0 ? true : _ref2$enableCtrlToggl,
        _ref2$clearOldSelecti = _ref2.clearOldSelection,
        clearOldSelection = _ref2$clearOldSelecti === void 0 ? false : _ref2$clearOldSelecti,
        context = _objectWithoutProperties(_ref2, ["target", "filter", "placeholder", "filterDelay", "filterPlaceholderText", "toggle", "enableShiftSelect", "enableCtrlToggle", "clearOldSelection"]);

    _classCallCheck(this, SelectMenu);

    if (!target) {
      target = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["createFragment"])("\n                <div class=\"select-menu\">\n                    <div class=\"select-menu__header\" data-header></div>\n                    <div class=\"select-menu__body menu__body\" data-body></div>\n                    <div class=\"select-menu__footer\" data-footer></div>\n                </div>\n            ").children[0];
    } else {
      target = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["selectElement"])(target);
    }

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(SelectMenu).call(this, _objectSpread({
      closeOnBlur: false,
      timeout: false,
      autoActivate: true,
      openOnHover: false,
      closeOnSelect: false,
      delay: 0,
      positioner: "inherit",
      target: target
    }, context)));

    _multiSelect.set(_assertThisInitialized(_this3), {
      writable: true,
      value: void 0
    });

    _this3.header = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["findChild"])(_this3.element, '[data-header]');
    _this3.body = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["findChild"])(_this3.element, '[data-body]');
    _this3.footer = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["findChild"])(_this3.element, '[data-footer]');
    _this3.filterInput = null;

    _this3.element.classList.add('select-menu');

    _this3.multiSelect = 'inherit';
    _this3.enableShiftSelect = enableShiftSelect;
    _this3.enableCtrlToggle = enableCtrlToggle;
    _this3.clearOldSelection = clearOldSelection;
    _this3.placeholder = document.createElement('div');

    _this3.placeholder.classList.add('placeholder');

    _this3.placeholder.innerHTML = placeholder;
    _this3.isVisible = false;

    _this3.registerTopics();

    _this3.parseDOM();

    _this3.init();

    if (filter) {
      _this3.filterDelay = filterDelay;
      _this3.placeholder = placeholder;

      _this3._initFilter(filter, filterPlaceholderText);
    }

    return _this3;
  }

  _createClass(SelectMenu, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this4 = this;

      _get(_getPrototypeOf(SelectMenu.prototype), "registerTopics", this).call(this);

      this.on('option.select', function (topic) {
        if (!_this4.multiSelect) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _this4.selection[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var item = _step2.value;

              if (item !== topic.target) {
                item.isSelected = false;
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
        }

        _this4.dispatchTopic('selection.change', _this4);
      });
      this.on('option.deselect', function (topic) {
        _this4.dispatchTopic('selection.change', {
          target: _this4,
          trigger: topic
        });
      });
      this.on('menuitem.click', function (topic) {
        if (topic.target.parent !== _this4) return;
        var event = topic.originalEvent;

        if (_this4._lastClick && event.shiftKey && _this4.enableShiftSelect) {
          topic.preventDefault();
          var children = _this4.children,
              targetIndex = children.indexOf(topic.target),
              lastIndex = children.indexOf(_this4._lastClick);

          if (targetIndex !== -1 && lastIndex !== -1) {
            var startIndex = Math.min(targetIndex, lastIndex),
                endingIndex = Math.max(targetIndex, lastIndex),
                change = false;

            for (var i = 0, l = children.length; i < l; i++) {
              var child = children[i];

              if (i >= startIndex && i <= endingIndex && !child.isDisabled) {
                if (!child.isSelected) {
                  child.isSelected = true;
                  change = true;
                }
              } else if (child.isSelected) {
                child.isSelected = false;
                change = true;
              }
            }

            if (change) {
              _this4.dispatchTopic('selection.change', _this4);
            }
          }
        } else if (event.ctrlKey && _this4.enableCtrlToggle) {
          topic.preventDefault();
          var changed;

          if (topic.target.isSelected) {
            event.target.isSelected = false;
            changed = true;
          } else {
            event.target.isSelected = true;
            changed = true;
          }

          _this4._lastClick = topic.target;

          if (changed) {
            _this4.dispatchTopic('selection.change', _this4);
          }
        } else if (_this4.clearOldSelection) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _this4.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _child = _step3.value;

              if (_child !== topic.target && _child.isSelected) {
                _child.isSelected = false;
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

          _this4._lastClick = topic.target;
        } else {
          _this4._lastClick = topic.target;
        }
      });
      this.on('menu.show', function () {
        _this4.clearFilter();

        if (!_this4.multiSelect && !_this4.activeChild) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = _this4.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var child = _step4.value;

              if (child.isSelected && !child.isActive) {
                child.activate();
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
        }
      });
    } // noinspection JSUnusedGlobalSymbols

  }, {
    key: "isSelectMenu",
    value: function isSelectMenu() {
      return true;
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      if (fn === null) {
        return this.clearFilter();
      }

      this.element.classList.add('items-filtered');
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.options[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var option = _step5.value;
          option.isFiltered = fn(option);
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

      if (this.placeholder) {
        if (this.getFilteredItems().length < this.options.length) {
          if (this.placeholder.parentElement) {
            this.placeholder.parentElement.removeChild(this.placeholder);
          }
        } else {
          var container = this.element.querySelector('.select-menu__body') || this.element;
          container.appendChild(this.placeholder);
        }
      }
    }
  }, {
    key: "clearFilter",
    value: function clearFilter() {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.options[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var option = _step6.value;
          option.isFiltered = false;
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

      if (this.placeholder && this.placeholder.parentElement && this.getFilteredItems().length < this.options.length) {
        this.placeholder.parentElement.removeChild(this.placeholder);
      }

      if (this.filterInput) {
        this.filterInput.value = "";
      }

      this.element.classList.remove('items-filtered');
    }
  }, {
    key: "getFilteredItems",
    value: function getFilteredItems() {
      var r = [];
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.options[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var option = _step7.value;

          if (option.isFiltered) {
            r.push(option);
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return r;
    }
  }, {
    key: "_initFilter",
    value: function _initFilter(fn, filterPlaceholderText) {
      var _this5 = this;

      // let filterInput = this.element.querySelectorAll('[data-filter]');
      var filterInput = Array.prototype.slice.call(document.querySelectorAll('[data-filter]')).find(function (node) {
        return Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getClosestMenuByElement"])(node) === _this5;
      });

      if (!filterInput) {
        this.filterInput = document.createElement('input');
        this.filterInput.type = 'text';
        this.filterInput.placeholder = filterPlaceholderText || "";
        this.filterInput.setAttribute('data-filter', "");
        var filterContainer = document.createElement('div');
        filterContainer.className = "select-menu__filter";
        filterContainer.appendChild(this.filterInput);
        var container = this.header || this.element;
        container.insertBefore(filterContainer, container.firstChild);
      } else {
        this.filterInput = filterInput;
      }

      var _timer = null;
      this.element.addEventListener('input', function (event) {
        if (event.target.hasAttribute('data-filter') && Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getClosestMenuByElement"])(event.target) === _this5) {
          if (_timer) {
            clearTimeout(_timer);
            _timer = null;
          }

          _timer = setTimeout(function () {
            _timer = null;

            _this5.filter(fn(_this5.filterInput.value));
          }, _this5.filterDelay);
        }
      });
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new SelectOption(config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new SelectMenu(config);
    }
  }, {
    key: "selection",
    get: function get() {
      var r = [];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var item = _step8.value;

          if (item.isSelected) {
            r.push(item);
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return r;
    }
  }, {
    key: "selectedOptions",
    get: function get() {
      return this.selection;
    }
  }, {
    key: "options",
    get: function get() {
      return this.children;
    }
  }, {
    key: "multiSelect",
    get: function get() {
      var value = _classPrivateFieldGet(this, _multiSelect);

      if (value === 'inherit' || value === undefined) {
        var parent = this.parent;
        return parent ? parent.multiSelect : undefined;
      } else if (value === 'root') {
        var root = this.root;

        if (this !== root) {
          return root.multiSelect;
        }
      } else {
        return value;
      }
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _multiSelect, value);
    }
  }]);

  return SelectMenu;
}(_Menu__WEBPACK_IMPORTED_MODULE_1__["AbstractMenu"]);
/**
 * @implements FormWidgetBase
 * @abstract
 */

var _multiSelect = new WeakMap();

var AbstractSelect =
/*#__PURE__*/
function (_AbstractMenuItem2) {
  _inherits(AbstractSelect, _AbstractMenuItem2);

  function AbstractSelect(_ref3) {
    var _this6;

    var target = _ref3.target,
        widget = _ref3.widget,
        _ref3$name = _ref3.name,
        name = _ref3$name === void 0 ? null : _ref3$name,
        config = _objectWithoutProperties(_ref3, ["target", "widget", "name"]);

    _classCallCheck(this, AbstractSelect);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(AbstractSelect).call(this, _objectSpread({
      target: target
    }, config))); // Set the widget component control.

    _this6.widget = widget;

    if (!_this6.widget.element.parentElement) {
      _this6.widget.appendTo(_this6.element);
    }

    var submenu = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["findChild"])(target, "[data-menu]");

    if (submenu) {
      submenu.parentElement.removeChild(submenu);

      _this6.attachSubMenu(_this6.constructSubMenu({
        target: submenu
      }));
    } else {
      _this6.attachSubMenu(_this6.constructSubMenu({}));
    }

    if (name !== null) {
      _this6.name = name;
    }

    return _this6;
  }

  _createClass(AbstractSelect, [{
    key: "isSelect",
    value: function isSelect() {
      return true;
    }
    /**
     * Refresh ui
     *
     * @abstract
     * @private
     */

  }, {
    key: "refreshUI",
    value: function refreshUI() {}
  }, {
    key: "registerTopics",
    value: function registerTopics() {
      var _this7 = this;

      _get(_getPrototypeOf(AbstractSelect.prototype), "registerTopics", this).call(this);

      this.on('menuitem.click', function (topic) {
        // Close the select if the user clicks a disabled select item.
        if (_this7.closeOnSelect && _this7.isActive) {
          if (topic.target.isDisabled) {
            topic.preventDefault();

            _this7.deactivate();
          }
        }
      });
      this.on('option.select', function () {
        if (_this7.closeOnSelect && _this7.isActive) {
          _this7.deactivate();
        }
      });
      this.on('option.deselect', function () {
        if (_this7.closeOnSelect && _this7.isActive) {
          _this7.deactivate();
        }
      });
      this.on('selection.change', function () {
        _this7.refreshUI();

        _this7.submenu.position();
      });
    }
  }, {
    key: "append",
    value: function append(option) {
      return this.submenu.append(option);
    } //------------------------------------------------------------------------------------------------------------------
    // Properties

    /**
     * @returns {SelectOption}
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.widget.name;
    }
  }, {
    key: "setName",
    value: function setName(value) {
      this.widget.name = value;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.widget.value;
    }
    /**
     * Sets the value of the widget and updates the ui without triggering any topics.
     *
     * @abstract
     * @param value
     */

  }, {
    key: "setValue",
    value: function setValue(value) {}
  }, {
    key: "constructMenuItem",

    /**
     * @abstract
     * @param config
     */
    value: function constructMenuItem(config) {}
    /**
     * @abstract
     * @param config
     */

  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {}
  }, {
    key: "options",
    get: function get() {
      return this.submenu.options;
    }
  }, {
    key: "selectedOptions",
    get: function get() {
      return this.submenu.selectedOptions;
    }
  }, {
    key: "value",
    get: function get() {
      return this.getValue();
    },
    set: function set(value) {
      this.setValue(value);
    }
  }, {
    key: "name",
    get: function get() {
      return this.getName();
    },
    set: function set(value) {
      this.setName(value);
    } //------------------------------------------------------------------------------------------------------------------
    //

  }], [{
    key: "FromHTML",
    value: function FromHTML(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      var config = this.getAttributes(element);
      var instance = new this(config);
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = element.querySelectorAll('li')[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var child = _step9.value;
          var option = new SelectOption({
            text: child.innerHTML.trim(),
            value: child.dataset.value || null
          });
          instance.append(option);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      element.parentElement.replaceChild(instance.element, element);
      return instance;
    }
  }, {
    key: "ConstructFromHTML",
    value: function ConstructFromHTML(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      if (element.nodeName === 'SELECT') {
        var select = element;
        element = document.createElement('div');
        copyNodeData(element, select);

        if (select.name) {
          element.dataset.name = select.name;
        }

        if (select.multiple) {
          element.dataset.multiple = select.multiple;
        }

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = select.children[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var child = _step10.value;

            if (child.nodeName === "OPTION") {
              element.appendChild(createOption(child));
            } else if (child.nodeName === 'OPTGROUP') {
              element.appendChild(createOptGroup(child));
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        select.parentElement.replaceChild(element, select);
      } // todo move into constructor.


      var config = this.getAttributes(element);
      return new this(_objectSpread({}, config, {
        target: element
      }));
    }
  }]);

  return AbstractSelect;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["AbstractMenuItem"]);
var RICH_SELECT_SCHEMA = new _core_serialize__WEBPACK_IMPORTED_MODULE_5__["AttributeSchema"]({
  multiple: new _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_5__["Bool"], _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP),
  maxItems: new _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_5__["Integer"], _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP),
  name: new _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_5__["Str"], _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP),
  placeholder: new _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"](_core_serialize__WEBPACK_IMPORTED_MODULE_5__["Str"], _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP, _core_serialize__WEBPACK_IMPORTED_MODULE_5__["Attribute"].DROP)
});
var RichSelect =
/*#__PURE__*/
function (_AbstractSelect) {
  _inherits(RichSelect, _AbstractSelect);

  function RichSelect() {
    var _this8;

    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$target = _ref4.target,
        target = _ref4$target === void 0 ? null : _ref4$target,
        _ref4$timeout = _ref4.timeout,
        timeout = _ref4$timeout === void 0 ? false : _ref4$timeout,
        _ref4$widget = _ref4.widget,
        widget = _ref4$widget === void 0 ? null : _ref4$widget,
        _ref4$multiple = _ref4.multiple,
        multiple = _ref4$multiple === void 0 ? false : _ref4$multiple,
        _ref4$maxItems = _ref4.maxItems,
        maxItems = _ref4$maxItems === void 0 ? 5 : _ref4$maxItems,
        _ref4$name = _ref4.name,
        name = _ref4$name === void 0 ? null : _ref4$name,
        _ref4$placeholder = _ref4.placeholder,
        placeholder = _ref4$placeholder === void 0 ? null : _ref4$placeholder;

    _classCallCheck(this, RichSelect);

    widget = widget || new _forms___WEBPACK_IMPORTED_MODULE_4__["MultiHiddenInputWidget"]();
    var TEMPLATE = "\n        <div class=\"select-button\">\n            <input type=\"text\" class=\"select-button__input\" data-text />\n            <span class=\"select-button__caret\"><i class=\"fas fa-caret-down\"></i></span>\n        </div>\n        ";
    var textbox,
        children = [];

    if (target) {
      target = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["selectElement"])(target);

      if (target.nodeName === 'INPUT') {
        textbox = target;
      } else {
        for (var _i = 0, _arr = _toConsumableArray(target.children); _i < _arr.length; _i++) {
          var child = _arr[_i];

          if (!child.hasAttribute('data-button') && !child.hasAttribute('data-menu')) {
            target.removeChild(child);
            children.push(child);
          }
        }

        var button = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["findChild"])(target, "[data-button]");

        if (!button) {
          target.appendChild(Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["createFragment"])(TEMPLATE));
        }
      }
    } else {
      target = document.createElement('div');
      target.appendChild(Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["createFragment"])(TEMPLATE));
    }

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(RichSelect).call(this, {
      toggle: true,
      autoActivate: false,
      openOnHover: false,
      delay: false,
      timeout: timeout,
      closeOnBlur: true,
      clearSubItemsOnHover: false,
      positioner: _positioners__WEBPACK_IMPORTED_MODULE_2__["DROPDOWN"],
      closeOnSelect: true,
      target: target,
      widget: widget,
      name: name
    }));
    _this8.textbox = textbox || _this8.element.querySelector('input, [data-text]');
    _this8.textbox.readOnly = true;
    _this8._label = '';
    _this8.element.tabIndex = 0;

    _this8.element.classList.add('rich-select');

    _this8.textbox.addEventListener('blur', function (event) {
      if (!_this8.containsElement(event.relatedTarget)) {
        _this8.textbox.value = _this8._label;
      }
    });

    _this8.registerTopics();

    _this8.initKeyboardNavigation();

    _this8.init();

    _this8.multiple = multiple;
    _this8.maxItems = maxItems;
    if (placeholder !== null) _this8.placeholder = placeholder;

    for (var _i2 = 0, _children = children; _i2 < _children.length; _i2++) {
      var _child2 = _children[_i2];

      if (_child2.hasAttribute('data-menuitem')) {
        _this8.append(_this8.submenu.constructMenuItem({
          target: _child2
        }));
      } else {
        _this8.append(_child2);
      }
    }

    _this8.parseDOM();

    _this8.refreshUI();

    return _this8;
  }

  _createClass(RichSelect, [{
    key: "refreshUI",
    value: function refreshUI() {
      var options = this.selectedOptions,
          labels = options.map(function (item) {
        return item.text;
      });
      var values = [];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = options[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var option = _step11.value;
          values.push(option.value || option.text || '');
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      this.value = values;

      if (labels.length <= this.maxItems) {
        this._label = labels.join(", ");
      } else {
        this._label = "".concat(labels.length, " Items Selected");
      }

      this.textbox.value = this._label;
    } //------------------------------------------------------------------------------------------------------------------
    // Properties

  }, {
    key: "setValue",
    value: function setValue(value) {
      this.widget.value = value;
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new SelectOption(config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new SelectMenu(config);
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.textbox.placeholder;
    },
    set: function set(value) {
      this.textbox.placeholder = value;
    }
  }, {
    key: "multiple",
    get: function get() {
      return this.submenu.multiSelect;
    },
    set: function set(value) {
      value = !!value;

      if (value) {
        this.submenu.multiSelect = true;
        this.submenu.toggle = true;
        this.closeOnSelect = false;
      } else {
        this.submenu.multiSelect = false;
        this.submenu.toggle = false;
        this.closeOnSelect = true;
      }
    }
  }, {
    key: "maxItems",
    get: function get() {
      return this._maxItems;
    },
    set: function set(value) {
      this._maxItems = value;
      this.refreshUI();
    }
  }], [{
    key: "getAttributes",
    value: function getAttributes(element) {
      return _objectSpread({}, _get(_getPrototypeOf(RichSelect), "getAttributes", this).call(this, element), {}, RICH_SELECT_SCHEMA.deserialize(element.dataset));
    }
  }]);

  return RichSelect;
}(AbstractSelect);
var MultiComboBox =
/*#__PURE__*/
function (_AbstractSelect2) {
  _inherits(MultiComboBox, _AbstractSelect2);

  function MultiComboBox() {
    var _this9;

    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$target = _ref5.target,
        target = _ref5$target === void 0 ? null : _ref5$target,
        _ref5$timeout = _ref5.timeout,
        timeout = _ref5$timeout === void 0 ? false : _ref5$timeout,
        _ref5$widget = _ref5.widget,
        widget = _ref5$widget === void 0 ? null : _ref5$widget,
        _ref5$filter = _ref5.filter,
        filter = _ref5$filter === void 0 ? FILTERS.istartsWith : _ref5$filter,
        _ref5$wait = _ref5.wait,
        wait = _ref5$wait === void 0 ? 500 : _ref5$wait,
        _ref5$name = _ref5.name,
        name = _ref5$name === void 0 ? null : _ref5$name;

    _classCallCheck(this, MultiComboBox);

    widget = widget || new _forms___WEBPACK_IMPORTED_MODULE_4__["MultiHiddenInputWidget"]();
    var TEMPLATE = "\n            <div class=\"multi-combo-box__button\" data-body>\n                <div contenteditable=\"true\" class=\"multi-combo-box__input\" data-text />\n            </div>\n        ";
    var children = [];

    if (target) {
      target = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["selectElement"])(target);

      for (var _i3 = 0, _arr2 = _toConsumableArray(target.children); _i3 < _arr2.length; _i3++) {
        var child = _arr2[_i3];

        if (!child.hasAttribute('data-button') && !child.hasAttribute('data-menu')) {
          target.removeChild(child);
          children.push(child);
        }
      }

      var button = Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["findChild"])(target, "[data-button]");

      if (!button) {
        target.appendChild(Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["createFragment"])(TEMPLATE));
      }
    } else {
      target = document.createElement('div');
      target.appendChild(Object(_core_utility_dom__WEBPACK_IMPORTED_MODULE_6__["createFragment"])(TEMPLATE));
    }

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(MultiComboBox).call(this, {
      toggle: true,
      autoActivate: false,
      openOnHover: false,
      delay: false,
      timeout: timeout,
      closeOnBlur: true,
      positioner: _positioners__WEBPACK_IMPORTED_MODULE_2__["DROPDOWN"],
      closeOnSelect: false,
      clearSubItemsOnHover: false,
      target: target,
      widget: widget,
      name: name
    }));
    _this9.textbox = _this9.element.querySelector("[data-text]");
    _this9.body = _this9.element.querySelector("[data-body]");

    _this9.element.classList.add('multi-combo-box'); // this.multiSelect = true;


    _this9.optionToPillMap = new WeakMap();
    _this9.pilltoOptionMap = new WeakMap();
    _this9.submenu.multiSelect = true;
    _this9.submenu.toggle = true;
    _this9.submenu.enableShiftSelect = true;

    _this9.initKeyboardNavigation();

    _this9.registerTopics();

    _this9.init();

    _this9._filterTimer = null;

    _this9._applyFilter = function () {
      _this9._filterTimer = null;

      _this9.submenu.filter(filter(_this9.getFilterValue()));

      if (_this9.submenu.activeItem) _this9.submenu.activeItem.deactivate();
    };

    _this9.textbox.addEventListener('input', function () {
      if (_this9._filterTimer) {
        clearTimeout(_this9._filterTimer);
        _this9._filterTimer = null;
      }

      if (wait === false || wait < 0) {
        _this9._applyFilter();
      } else {
        _this9._filterTimer = setTimeout(_this9._applyFilter, wait);
      }
    });

    for (var _i4 = 0, _children2 = children; _i4 < _children2.length; _i4++) {
      var _child3 = _children2[_i4];

      if (_child3.hasAttribute('data-menuitem')) {
        _this9.append(_this9.submenu.constructMenuItem({
          target: _child3
        }));
      } else {
        _this9.append(_child3);
      }
    }

    _this9.parseDOM();

    _this9.refreshUI();

    return _this9;
  }

  _createClass(MultiComboBox, [{
    key: "getFilterValue",
    value: function getFilterValue() {
      if (this.textbox.nodeName === "INPUT") {
        return this.textbox.value;
      } else {
        return this.textbox.innerText;
      }
    }
  }, {
    key: "setFilterValue",
    value: function setFilterValue(value) {
      if (this.textbox.nodeName === "INPUT") {
        this.textbox.value = value;
      } else {
        this.textbox.innerText = value;
      }
    }
  }, {
    key: "registerTopics",
    value: function registerTopics() {
      var _this10 = this;

      _get(_getPrototypeOf(MultiComboBox.prototype), "registerTopics", this).call(this);

      this.on('event.click', function (topic) {
        // noinspection JSUnresolvedFunction
        var exitButton = topic.originalEvent.target.closest('.pill__exit-button'),
            pill = exitButton ? exitButton.closest('.multi-combo-box__pill') : null,
            option = pill ? _this10.pilltoOptionMap.get(pill) : null;

        if (option) {
          option.optionDeselect();
        }

        topic.originalEvent.preventDefault();

        _this10.textbox.focus();
      });
      this.on('menu.hide', function (topic) {
        if (topic.target === _this10.submenu) {
          _this10.setFilterValue("");

          _this10.submenu.clearFilter();
        }
      });
    }
  }, {
    key: "_buildChoicePill",
    value: function _buildChoicePill(text) {
      var pill = document.createElement('div');
      pill.className = "multi-combo-box__pill";
      var exitButton = document.createElement('div'),
          textContainer = document.createElement('div');
      exitButton.className = "pill__exit-button";
      exitButton.innerHTML = "<i class=\"far fa-times-circle\"></i>";
      textContainer.className = "pill__text";
      textContainer.innerHTML = text;
      pill.appendChild(textContainer);
      pill.appendChild(exitButton);
      return pill;
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(topic) {
      if (!this._keyboardNavigationEnabled || !this.isRoot) {
        return;
      }

      var event = topic.originalEvent;

      if (!this.isActive) {
        this.activate();
        return;
      }

      if (event.key === "Backspace" && this.getFilterValue() === "") {
        var pills = this.body.querySelectorAll('.multi-combo-box__pill'),
            pill = pills[pills.length - 1],
            option = pill ? this.pilltoOptionMap.get(pill) : null;

        if (option) {
          option.optionDeselect();
        }
      } else if (event.key === 'Enter') {
        event.preventDefault();

        if (this._filterTimer) {
          clearTimeout(this._filterTimer);
          this._filterTimer = null;

          this._applyFilter();
        } else {
          /**
           * @type {null|SelectOption}
           */
          var activeItem = null,

          /**
           * @type {null|SelectOption}
           */
          firstItem = null; // Find both the first none filtered item and the active item.

          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = this.options[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var _option = _step12.value;

              if (!_option.isFiltered && firstItem === null) {
                firstItem = _option;
              }

              if (!_option.isFiltered && _option.isActive) {
                activeItem = _option;
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }

          if (!activeItem) {
            this.setFilterValue("");
            this.submenu.clearFilter();
            this.submenu.position();

            if (firstItem && !firstItem.isSelected) {
              firstItem.select();
            }

            firstItem.deactivate();
          } else {
            activeItem.select();
          }
        }
      } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        return _get(_getPrototypeOf(MultiComboBox.prototype), "onKeyDown", this).call(this, topic);
      }
    }
  }, {
    key: "refreshUI",
    value: function refreshUI() {
      var _this11 = this;

      if (!this._refreshUIId) {
        this._refreshUIId = window.requestAnimationFrame(function () {
          _this11._refreshUIId = null;
          var fragment = document.createDocumentFragment(),
              _new = false,
              values = [];
          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = _this11.options[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var option = _step13.value;

              var pill = _this11.optionToPillMap.get(option);

              if (option.isSelected) {
                if (!pill) {
                  pill = _this11._buildChoicePill(option.text);

                  _this11.pilltoOptionMap.set(pill, option);

                  _this11.optionToPillMap.set(option, pill);

                  fragment.appendChild(pill);
                  _new = true;
                }

                values.push(option.value || option.text);
              } else if (pill) {
                if (pill.parentElement) pill.parentElement.removeChild(pill);

                _this11.optionToPillMap["delete"](option);

                _this11.pilltoOptionMap["delete"](pill);
              }
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
                _iterator13["return"]();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }

          if (_new) {
            _this11.body.insertBefore(fragment, _this11.textbox);
          }

          if (_this11.widget) {
            _this11.widget.setValue(values);
          }
        });
      }
    } //------------------------------------------------------------------------------------------------------------------
    // Properties

  }, {
    key: "setValue",
    value: function setValue(values) {
      var changed = false;
      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = this.options[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var option = _step14.value;
          var index = values.indexOf(option.value);

          if (index !== -1) {
            if (!option.isSelected && !option.isDisabled) {
              option.isSelected = true;
              changed = true;
            }

            values.splice(index, 1);
          } else {
            if (option.isSelected) {
              option.isSelected = false;
              changed = true;
            }
          }
        }
      } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }
        } finally {
          if (_didIteratorError14) {
            throw _iteratorError14;
          }
        }
      }

      this.refreshUI();
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new SelectOption(config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new SelectMenu(config);
    }
  }]);

  return MultiComboBox;
}(AbstractSelect);
var ComboBox =
/*#__PURE__*/
function (_RichSelect) {
  _inherits(ComboBox, _RichSelect);

  function ComboBox() {
    var _this12;

    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$target = _ref6.target,
        target = _ref6$target === void 0 ? null : _ref6$target,
        _ref6$timeout = _ref6.timeout,
        timeout = _ref6$timeout === void 0 ? false : _ref6$timeout,
        _ref6$submenu = _ref6.submenu,
        submenu = _ref6$submenu === void 0 ? null : _ref6$submenu,
        _ref6$widget = _ref6.widget,
        widget = _ref6$widget === void 0 ? null : _ref6$widget,
        _ref6$wait = _ref6.wait,
        wait = _ref6$wait === void 0 ? 500 : _ref6$wait,
        _ref6$filter = _ref6.filter,
        filter = _ref6$filter === void 0 ? FILTERS.istartsWith : _ref6$filter,
        _ref6$name = _ref6.name,
        name = _ref6$name === void 0 ? null : _ref6$name;

    _classCallCheck(this, ComboBox);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(ComboBox).call(this, {
      target: target,
      timeout: timeout,
      submenu: submenu,
      widget: widget,
      multiple: false,
      filter: null,
      name: name
    }));

    _this12.element.classList.add('combo-box');

    _this12.element.classList.remove('rich-select');

    _this12.wait = wait;
    _this12.filter = filter;

    _this12.parseDOM();

    _this12.refreshUI();

    return _this12;
  } //------------------------------------------------------------------------------------------------------------------
  // Private methods


  _createClass(ComboBox, [{
    key: "_rootKeyDown",
    value: function _rootKeyDown(topic) {
      if (this.isRoot) {
        var key = topic.originalEvent.key;

        if (this.hasFilter && (key === 'ArrowLeft' || key === 'ArrowRight')) {
          return;
        }

        return _get(_getPrototypeOf(ComboBox.prototype), "_rootKeyDown", this).call(this, topic);
      }
    }
  }, {
    key: "filter",
    set: function set(method) {
      var _this13 = this;

      if (this._destroyFilter) {
        this._destroyFilter();

        this._destroyFilter = null;
      }

      if (!method) return;
      this._filterMethod = method;
      var _timer = null;

      var applyFilter = function applyFilter() {
        _timer = null;

        _this13.submenu.filter(_this13._filterMethod(_this13.textbox.value)); // Flag if we found a select item.


        var f = false; // Activate the selected items.

        if (!_this13.submenu.multiSelect) {
          var _iteratorNormalCompletion15 = true;
          var _didIteratorError15 = false;
          var _iteratorError15 = undefined;

          try {
            for (var _iterator15 = _this13.submenu.options[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
              var option = _step15.value;

              if (!option.isDisabled && !option.isFiltered && option.isSelected) {
                option.activate();
                f = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError15 = true;
            _iteratorError15 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
                _iterator15["return"]();
              }
            } finally {
              if (_didIteratorError15) {
                throw _iteratorError15;
              }
            }
          }
        }

        if (!f) {
          var _iteratorNormalCompletion16 = true;
          var _didIteratorError16 = false;
          var _iteratorError16 = undefined;

          try {
            for (var _iterator16 = _this13.submenu.options[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
              var _option2 = _step16.value;

              if (!_option2.isDisabled && !_option2.isFiltered) {
                _option2.activate();

                break;
              }
            }
          } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
                _iterator16["return"]();
              }
            } finally {
              if (_didIteratorError16) {
                throw _iteratorError16;
              }
            }
          }
        }
      };

      var onInput = function onInput() {
        if (_timer) {
          clearTimeout(_timer);
          _timer = null;
        }

        if (_this13.wait === false || _this13.wait < 0) {
          applyFilter();
        } else {
          _timer = setTimeout(applyFilter, _this13.wait);
        }
      };

      var onKeyDown = function onKeyDown(event) {
        // Apply the filter immediately on enter.
        if (event.key === "Enter" && _timer) {
          clearTimeout(_timer);
          _timer = null;
          applyFilter();
        }
      };

      this.textbox.addEventListener('input', onInput);
      this.textbox.addEventListener('keydown', onKeyDown);
      this.textbox.readOnly = false; // Create method to destroy event listener.

      this._destroyFilter = function () {
        _this13.textbox.removeEventListener('input', onInput);

        _this13.textbox.removeEventListener('keydown', onKeyDown);

        _this13.textbox.readOnly = true;
        _this13._destroyFilter = null;
      };
    },
    get: function get() {
      return !!this._filterMethod;
    }
  }, {
    key: "hasFilter",
    get: function get() {
      return !!this._destroyFilter;
    }
  }], [{
    key: "getAttributes",
    value: function getAttributes(element) {
      return _objectSpread({}, _get(_getPrototypeOf(ComboBox), "getAttributes", this).call(this, element), {
        multiple: false
      });
    }
  }]);

  return ComboBox;
}(RichSelect);

/***/ }),

/***/ "./src/menu/SlideMenu.js":
/*!*******************************!*\
  !*** ./src/menu/SlideMenu.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SlideMenu; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var SlideMenu =
/*#__PURE__*/
function (_AbstractMenu) {
  _inherits(SlideMenu, _AbstractMenu);

  function SlideMenu(_ref) {
    var _this;

    var _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? false : _ref$modal;

    _classCallCheck(this, SlideMenu);

    if (!target) {
      if (modal) {
        target = document.createElement('div');
        var menu = document.createElement('div');
        target.className = "modal";
        menu.className = "side-menu";
        target.appendChild(menu);
      } else {
        target = document.createElement('div');
        target.className = 'side-menu';
      }
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlideMenu).call(this, {
      target: target,
      closeOnBlur: true,
      timeout: false,
      autoActivate: false,
      openOnHover: false,
      toggle: false,
      closeOnSelect: true,
      delay: false,
      positioner: null,
      direction: "vertical"
    }));
    _this.isVisible = false;

    _this.registerTopics();

    _this.parseDOM();

    _this.init();

    return _this;
  }

  _createClass(SlideMenu, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this2 = this;

      _get(_getPrototypeOf(SlideMenu.prototype), "registerTopics", this).call(this);

      var _onDocumentClick;

      this.on("menu.show", function (event) {
        _this2.activate();

        if (_this2.closeOnBlur) {
          _onDocumentClick = function onDocumentClick(event) {
            if (!_this2.element.contains(event.target)) {
              document.removeEventListener('click', _onDocumentClick);
              _onDocumentClick = null;

              _this2.hide();
            }
          };

          setTimeout(function () {
            if (_onDocumentClick) document.addEventListener('click', _onDocumentClick);
          }, 0);
        }
      });
      this.on('menu.hide', function (event) {
        if (_onDocumentClick) {
          document.removeEventListener('click', _onDocumentClick);
          _onDocumentClick = null;
        }

        _this2.deactivate();
      });
      this.on('event.click', function (event) {
        var dismiss = event.originalEvent.target.closest("[data-action='dismiss']");

        if (_this2.isVisible && dismiss && _this2.getTargetNode(dismiss) === _this2) {
          _this2.hide();
        }
      });
    }
  }, {
    key: "constructMenuItem",
    value: function constructMenuItem(config) {
      return new _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"](config);
    }
  }, {
    key: "constructSubMenu",
    value: function constructSubMenu(config) {
      return new _Menu__WEBPACK_IMPORTED_MODULE_0__["default"](config);
    }
  }]);

  return SlideMenu;
}(_Menu__WEBPACK_IMPORTED_MODULE_0__["AbstractMenu"]);



/***/ }),

/***/ "./src/menu/index.js":
/*!***************************!*\
  !*** ./src/menu/index.js ***!
  \***************************/
/*! exports provided: MenuBar, MenuItem, AbstractMenuItem, Menu, AbstractMenu, DropDown, MenuNode, SelectMenu, RichSelect, ComboBox, MultiComboBox, SelectOption, AbstractSelect, ContextMenu, SlideMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ "./src/menu/MenuBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuBar", function() { return _MenuBar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMenuItem", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_1__["AbstractMenuItem"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractMenu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_2__["AbstractMenu"]; });

/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropDown */ "./src/menu/DropDown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropDown", function() { return _DropDown__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuNode */ "./src/menu/MenuNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuNode", function() { return _MenuNode__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Select2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Select2 */ "./src/menu/Select2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectMenu", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["SelectMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RichSelect", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["RichSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComboBox", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["ComboBox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiComboBox", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["MultiComboBox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectOption", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["SelectOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractSelect", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["AbstractSelect"]; });

/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ContextMenu */ "./src/menu/ContextMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return _ContextMenu__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _SlideMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SlideMenu */ "./src/menu/SlideMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlideMenu", function() { return _SlideMenu__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _loaders_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loaders.js */ "./src/menu/loaders.js");



















/***/ }),

/***/ "./src/menu/loaders.js":
/*!*****************************!*\
  !*** ./src/menu/loaders.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _autoloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../autoloader */ "./src/autoloader.js");
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextMenu */ "./src/menu/ContextMenu.js");
/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DropDown */ "./src/menu/DropDown.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuBar */ "./src/menu/MenuBar.js");
/* harmony import */ var _Select2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Select2 */ "./src/menu/Select2.js");






_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('dropdown', function (element) {
  return _DropDown__WEBPACK_IMPORTED_MODULE_2__["default"].FromHTML(element);
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('context-menu', function (element) {
  var instance = _ContextMenu__WEBPACK_IMPORTED_MODULE_1__["default"].FromHTML(element),
      target = document.querySelector(element.dataset.target);
  instance.setTargetMenu(target);
  instance.setContainer(target);
  return instance;
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('menu', function (element) {
  return _Menu__WEBPACK_IMPORTED_MODULE_3__["default"].FromHTML(element);
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('menubar', function (element) {
  return _MenuBar__WEBPACK_IMPORTED_MODULE_4__["default"].FromHTML(element);
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('side-menubar', function (element) {
  return _MenuBar__WEBPACK_IMPORTED_MODULE_4__["SideMenuBar"].FromHTML(element);
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('select', function (element) {
  return _Select2__WEBPACK_IMPORTED_MODULE_5__["RichSelect"].ConstructFromHTML(element);
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('combobox', function (element) {
  return _Select2__WEBPACK_IMPORTED_MODULE_5__["ComboBox"].ConstructFromHTML(element);
});
_autoloader__WEBPACK_IMPORTED_MODULE_0__["default"].register('multi-combobox', function (element) {
  return _Select2__WEBPACK_IMPORTED_MODULE_5__["MultiComboBox"].ConstructFromHTML(element);
});

/***/ }),

/***/ "./src/menu/positioners.js":
/*!*********************************!*\
  !*** ./src/menu/positioners.js ***!
  \*********************************/
/*! exports provided: dropdown, contextMenuPosition, DROPDOWN, SIDE_MENU, CONTEXT_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dropdown", function() { return dropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenuPosition", function() { return contextMenuPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROPDOWN", function() { return DROPDOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIDE_MENU", function() { return SIDE_MENU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_MENU", function() { return CONTEXT_MENU; });
/* harmony import */ var core_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/vectors */ "./src/core/vectors/index.js");
/* harmony import */ var core_ui_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/ui/position */ "./src/core/ui/position.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var opposites = {
  left: 'right',
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  center: 'center',
  middle: 'middle'
};

function getInheritedPosition(menu) {
  if (menu.parentMenu && !menu.parentMenu.isRoot) {
    return menu.parentMenu.element.dataset.position;
  }
}

function _applyPosition(target, overlay, container) {
  var position = overlay.dataset.position,
      _position$split = position.split(/\s*;\s*/),
      _position$split2 = _slicedToArray(_position$split, 3),
      my = _position$split2[0],
      at = _position$split2[1],
      method = _position$split2[2],
      overlayRect = core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(overlay),
      targetRect = core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(target),
      containerRect = container.nodeType ? core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(container) : container;

  my = my.trim();
  at = at.trim();

  var _my$split = my.split(/\s+/),
      _my$split2 = _slicedToArray(_my$split, 2),
      myX = _my$split2[0],
      myY = _my$split2[1],
      _at$split = at.split(/\s+/),
      _at$split2 = _slicedToArray(_at$split, 2),
      atX = _at$split2[0],
      atY = _at$split2[1],
      methodX,
      methodY;

  if (method) {
    method = method.trim();

    var _method$split = method.split(/\s+/);

    var _method$split2 = _slicedToArray(_method$split, 2);

    methodX = _method$split2[0];
    methodY = _method$split2[1];
  }

  var pos = overlayRect.position({
    my: "".concat(myX, " ").concat(myY),
    at: "".concat(atX, " ").concat(atY),
    of: targetRect,
    inside: containerRect,
    collision: null
  }),
      refresh = false; // flag that determines is position will be refreshed.

  if (!containerRect.containsX(pos)) {
    myX = opposites[myX];
    atX = opposites[atX];
    if (methodX) methodX = opposites[methodX];
    refresh = true;
  }

  if (!containerRect.containsY(pos)) {
    myY = opposites[myY];
    atY = opposites[atY];
    if (methodY) methodY = opposites[methodY];
    refresh = true;
  }

  if (refresh) {
    pos = overlayRect.position({
      my: "".concat(myX, " ").concat(myY),
      at: "".concat(atX, " ").concat(atY),
      of: targetRect,
      inside: containerRect,
      collision: null
    });

    if (methodX && methodY) {
      overlay.dataset.position = "".concat(myX, " ").concat(myY, "; ").concat(atX, " ").concat(atY, "; ").concat(methodX, " ").concat(methodY, ";");
    } else {
      overlay.dataset.position = "".concat(myX, " ").concat(myY, "; ").concat(atX, " ").concat(atY, ";");
    }
  }

  methodX = methodX || 'left';
  methodY = methodY || 'top';
  Object(core_ui_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(overlay, pos, "".concat(methodY, "-").concat(methodX));
}
/**
 * Positions first level of menus statically
 * Then position second level of menus at the bottom left of the first level.
 * Finally positions every other level to the top right of the previous level.
 * Menu's can flip if they fall out of bounds of the container.
 * By default the container is the client area.
 *
 * @param container
 * @param topLevelPosition
 * @param defaultPosition
 * @returns {Function}
 */


function dropdown() {
  var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var topLevelPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "left top; left bottom; left top;";
  var defaultPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "left top; right top; left top;";

  if (!container) {
    container = core_ui_position__WEBPACK_IMPORTED_MODULE_1__["getClientRect"];
  } else if (typeof container === 'string') {
    var target = document.querySelector(container);

    container = function container() {
      return core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(target);
    };
  } else {
    var _target = container;

    container = function container() {
      return core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(_target);
    };
  }

  return function (menu) {
    var parentMenu = menu.parentMenu,
        containerElement = container,
        target = menu.parent;

    if (typeof containerElement === 'function') {
      containerElement = containerElement(target, menu);
    }

    if (!parentMenu || parentMenu.isRoot) {
      menu.element.dataset.position = topLevelPosition; // flipPositionIfOutOfBounds(menu.element, container, 'xy');

      _applyPosition(target.element, menu.element, containerElement);
    } else if (!parentMenu.parentMenu || parentMenu.parentMenu.isRoot) {
      menu.element.dataset.position = defaultPosition;

      _applyPosition(target.element, menu.element, containerElement);
    } else {
      menu.element.dataset.position = getInheritedPosition(menu) || defaultPosition; // flipPositionIfOutOfBounds(menu.element, container, 'xy');

      _applyPosition(target.element, menu.element, containerElement);
    }
  };
}
function contextMenuPosition() {
  var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "left top; right top;";

  if (!container) {
    container = core_ui_position__WEBPACK_IMPORTED_MODULE_1__["getClientRect"];
  } else if (typeof container === 'string') {
    var target = document.querySelector(container);

    container = function container() {
      return core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(target);
    };
  } else {
    var _target2 = container;

    container = function container() {
      return core_vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(_target2);
    };
  }

  return function (menu) {
    var containerElement = container,
        target = menu.parent;

    if (typeof containerElement === 'function') {
      containerElement = containerElement(target, menu);
    }

    menu.element.dataset.position = getInheritedPosition(menu) || position;

    _applyPosition(target.element, menu.element, containerElement);
  };
}
var DROPDOWN = dropdown(); // noinspection JSUnusedGlobalSymbols

var SIDE_MENU = dropdown(null, "left top; right top;", "left top; right top;");
var CONTEXT_MENU = contextMenuPosition();

/***/ }),

/***/ "./src/menu/utility.js":
/*!*****************************!*\
  !*** ./src/menu/utility.js ***!
  \*****************************/
/*! exports provided: MENU_MAP, attachMenuInstance, detachMenuInstance, hasMenuInstance, getMenuInstance, getClosestMenuNodeByElement, getClosestMenuItemByElement, getClosestMenuByElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_MAP", function() { return MENU_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachMenuInstance", function() { return attachMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachMenuInstance", function() { return detachMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMenuInstance", function() { return hasMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMenuInstance", function() { return getMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestMenuNodeByElement", function() { return getClosestMenuNodeByElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestMenuItemByElement", function() { return getClosestMenuItemByElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestMenuByElement", function() { return getClosestMenuByElement; });
var MENU_MAP = new WeakMap();
/**
 * Maps elements to menu node controller instances.
 * @param element
 * @param instance
 */

function attachMenuInstance(element, instance) {
  if (instance === null) {
    return detachMenuInstance(element);
  }

  if (MENU_MAP.get(element)) {
    throw new Error("Element is already bound to menu node instance.");
  }

  MENU_MAP.set(element, instance);
}
/**
 * Unmaps menu node controller instance from an element.
 * @param element
 */

function detachMenuInstance(element) {
  MENU_MAP["delete"](element);
}
/**
 * Returns true if the element has a menu controller instance mapped.
 * @param element
 * @returns {boolean}
 */

function hasMenuInstance(element) {
  return MENU_MAP.has(element);
}
/**
 * Retrieves the mapped menu node controller instance for the element.
 * @param element
 * @returns {null|MenuNode|*}
 */

function getMenuInstance(element) {
  return MENU_MAP.get(element);
}
/**
 * Finds the closest menu node controller for the element in the DOM tree.
 * @param element
 * @returns {null|*}
 */

function getClosestMenuNodeByElement(element) {
  while (element) {
    var instance = getMenuInstance(element);

    if (instance) {
      return instance;
    }

    element = element.parentElement;
  }

  return null;
} // noinspection JSUnusedGlobalSymbols

/**
 * Finds the closest menuitem controller for the element in the DOM tree.
 * @param element
 * @returns {null|*}
 */

function getClosestMenuItemByElement(element) {
  while (element) {
    var instance = getMenuInstance(element);

    if (instance && instance.isMenuItem()) {
      return instance;
    }

    element = element.parentElement;
  }

  return null;
}
/**
 * Finds the closest menu node controller for the element in the DOM tree
 * @param element
 * @returns {null|*}
 */

function getClosestMenuByElement(element) {
  while (element) {
    var instance = getMenuInstance(element);

    if (instance && instance.isMenu()) {
      return instance;
    }

    element = element.parentElement;
  }

  return null;
}

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./jekyll/js/app.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./jekyll/js/app.js */"./jekyll/js/app.js");


/***/ })

/******/ });
});
//# sourceMappingURL=app.bundle.js.map