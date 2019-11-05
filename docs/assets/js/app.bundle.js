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
/* harmony import */ var menu2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! menu2 */ "./src/menu2/index.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





__webpack_require__.p = "/assets/js/";
var app = new app__WEBPACK_IMPORTED_MODULE_1__["default"]({
  'menubar': function menubar() {
    return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./pages/menubar_example.js */ "./jekyll/js/pages/menubar_example.js"));
  },
  'menu_examples': function menu_examples() {
    return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./pages/menu_examples.js */ "./jekyll/js/pages/menu_examples.js"));
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
          var components = element.dataset.init.split(/\s+/);
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Publisher; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Publisher =
/*#__PURE__*/
function () {
  function Publisher() {
    _classCallCheck(this, Publisher);

    this._topics = {};
  }

  _createClass(Publisher, [{
    key: "on",
    value: function on(topic, callback) {
      if (!this._topics[topic]) this._topics[topic] = [];

      this._topics[topic].push(callback);

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
        this._topics = {};
        return this;
      } else if (arguments.length === 1) {
        // Clear single topic.
        this._topics[topic] = [];
        return this;
      }

      if (!this._topics || !this._topics[topic] || !this._topics[topic].length) {
        // Topic list was either empty or didn't exist.  No need to remove anything.  Return;
        return this;
      }

      var callbacks = this._topics[topic];

      for (var i = 0; i < callback.length; i++) {
        var cb = callbacks[i];

        if (cb === callback || cb.fn === callback) {
          callbacks.splice(i, 1);
          break;
        }
      }

      if (callbacks.length === 0) {
        delete this._topics[topic];
      }

      return this;
    }
  }, {
    key: "hasEvent",
    value: function hasEvent(topic, callback) {
      if (arguments.length === 1) {
        return !!this._topics[topic];
      } else {
        var callbacks = this._topics[topic];

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
      if (this._topics[topic]) {
        var callbacks = this._topics[topic].slice(0);

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cb = _step.value;
            cb.apply(this, args);
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

      return this;
    }
  }]);

  return Publisher;
}();



/***/ }),

/***/ "./src/core/attributes.js":
/*!********************************!*\
  !*** ./src/core/attributes.js ***!
  \********************************/
/*! exports provided: DROP, REQUIRED, FALSE, TRUE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROP", function() { return DROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUIRED", function() { return REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FALSE", function() { return FALSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRUE", function() { return TRUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Attribute; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/core/errors.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var DROP = {};
var REQUIRED = {};
var FALSE = {};
var TRUE = {};
/**
 * Used to help deserialize attributes on an element.
 */

var Attribute =
/*#__PURE__*/
function () {
  function Attribute(type) {
    var missing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DROP;
    var nullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var validator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Attribute);

    this.type = type;
    this.missing = missing;
    this.validator = validator;
    this.nullable = nullable;
  }

  _createClass(Attribute, null, [{
    key: "deserialize",
    value: function deserialize(data, fields) {
      var r = {};

      for (var key in fields) {
        if (fields.hasOwnProperty(key)) {
          var field = fields[key],
              missing = field ? field.missing : DROP,
              nullable = field ? field.nullable : null,
              value = data.hasOwnProperty(key) ? data[key] : undefined;

          if (value === undefined) {
            if (missing === REQUIRED) {
              throw new _errors__WEBPACK_IMPORTED_MODULE_0__["KeyError"]("".concat(key, " is required"));
            } else if (missing === DROP) {
              continue;
            } else {
              r[key] = missing;
              continue;
            }
          }

          if (value === null) {
            if (nullable === FALSE) {
              throw new _errors__WEBPACK_IMPORTED_MODULE_0__["ValueError"]("".concat(key, " cannot be null"));
            } else if (nullable === TRUE || nullable === null) {
              r[key] = null;
              continue;
            } else if (nullable === DROP) {
              continue;
            } else {
              r[key] = nullable;
              continue;
            }
          }

          if (field) {
            if (field.type) {
              value = field.type(value);
            }

            if (field.validator) {
              value = field.validator(value);
            }
          }

          r[key] = value;
        }
      }

      return r;
    }
  }]);

  return Attribute;
}();

_defineProperty(Attribute, "DROP", DROP);

_defineProperty(Attribute, "REQUIRED", REQUIRED);

_defineProperty(Attribute, "FALSE", FALSE);

_defineProperty(Attribute, "TRUE", TRUE);



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
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./src/core/utility.js");
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
/*! exports provided: ExtendableError, IndexError, KeyError, ValueError, NotImplemented, ValidationError, AssertionError */
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

/***/ }),

/***/ "./src/core/iter.js":
/*!**************************!*\
  !*** ./src/core/iter.js ***!
  \**************************/
/*! exports provided: items, keys, values, enumerate, chain */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "items", function() { return items; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumerate", function() { return enumerate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return chain; });
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

/***/ }),

/***/ "./src/core/utility.js":
/*!*****************************!*\
  !*** ./src/core/utility.js ***!
  \*****************************/
/*! exports provided: clamp, firstValue, all, any, proto, randomChoice, arraysEqual, parseHTML, isEmptyObject, emptyElement, addClasses, removeClasses, assignAttributes, setElementOffset, getElementOffset, getScroll, isWindow, setScroll, selectElement, assert, parseBooleanOrInt, parseBooleanOrFloat, parseBoolean, parseIntValue, parseFloatValue, parseAny, validateChoice, choice, findChild, filterChildren, getOwnProperty, getPropertyByPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstValue", function() { return firstValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomChoice", function() { return randomChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arraysEqual", function() { return arraysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTML", function() { return parseHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyElement", function() { return emptyElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClasses", function() { return addClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClasses", function() { return removeClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignAttributes", function() { return assignAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setElementOffset", function() { return setElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementOffset", function() { return getElementOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return getScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWindow", function() { return isWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScroll", function() { return setScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectElement", function() { return selectElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBooleanOrInt", function() { return parseBooleanOrInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBooleanOrFloat", function() { return parseBooleanOrFloat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBoolean", function() { return parseBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIntValue", function() { return parseIntValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseFloatValue", function() { return parseFloatValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAny", function() { return parseAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateChoice", function() { return validateChoice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return choice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChild", function() { return findChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return filterChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOwnProperty", function() { return getOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropertyByPath", function() { return getPropertyByPath; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./src/core/errors.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var REG_WHITESPACE = /\s+/;
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
/**
 * Takes an iterable and returns the first none null or undefined value.
 * @param args
 */

function firstValue(args) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item !== null && item !== undefined) {
        return item;
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
 * Takes an iterable and returns true if all of the values are trueish.
 * @param iterable
 */

function all(iterable) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = iterable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (!item) {
        return false;
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

  return true;
}
/**
 * Takes an iterable and returns true if any of the values are trueish.
 * @param iterable
 */

function any(iterable) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = iterable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var item = _step3.value;
      if (item) return true;
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

  return false;
}
function proto(descriptor) {
  descriptor.placement = "prototype";
  return descriptor;
}
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
 * Parses an html string into a document fragment.
 *
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
 * Test to see if the variable is a window.
 * @param variable
 * @returns {boolean}
 */

function isWindow(variable) {
  return variable && _typeof(variable) === 'object' && setInterval in variable;
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
 * Asserts that a condition is true or raises an AssertionError.
 * @param condition - condition to check.
 * @param message - message on fail.
 * @throws AssertionError
 */

function assert(condition, message) {
  if (!condition) {
    throw new _errors__WEBPACK_IMPORTED_MODULE_0__["AssertionError"](message);
  }
}
/**
 * Attempts to parse the value into a boolean value or a integer.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {boolean|number|*}
 */

function parseBooleanOrInt(value) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TypeError;

  var type = _typeof(value);

  if (type === 'boolean' || type === 'number') {
    return value;
  }

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  value = parseInt(value, radix);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into boolean or int.");
    } else {
      return defaultValue;
    }
  }

  return value;
}
/**
 * Attempts to parse the value into a boolean value or a float.  Returns the default value on failure if provided.
 * Otherwise throws a TypeError.
 * @param value
 * @param defaultValue
 * @returns {boolean|number|*}
 */

function parseBooleanOrFloat(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeError;

  var type = _typeof(value);

  if (type === 'boolean' || type === 'number') {
    return value;
  }

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  value = parseFloat(value);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into boolean or int.");
    } else {
      return defaultValue;
    }
  }

  return value;
}
/**
 * Attempts for parse a boolean value from a string.  Returns the defaultValue on failure if provided.  Otherwise throws
 * a TypeError.
 * @param value
 * @param defaultValue
 * @returns {boolean|*}
 */

function parseBoolean(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeError;

  if (typeof value === 'boolean') {
    return value;
  } else if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into boolean.");
    } else {
      return defaultValue;
    }
  }
}
/**
 * Attempts to parse a string into an integer.  Returns the default value on failure if set.  Otherwise throws a
 * TypeError.
 * @param value
 * @param radix
 * @param defaultValue
 * @returns {number}
 */

function parseIntValue(value) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TypeError;
  value = parseInt(value, radix);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into integer.");
    } else {
      // noinspection JSValidateTypes
      return defaultValue;
    }
  }

  return value;
}
/**
 * Attempts to parse a string into an integer.  Returns the default value on failure if set.  Otherwise throws a
 * TypeError.
 * @param value
 * @param defaultValue
 * @returns {number}
 */

function parseFloatValue(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeError;
  value = parseFloat(value);

  if (Number.isNaN(value)) {
    if (defaultValue === TypeError) {
      throw new TypeError("Could not parse value into float.");
    } else {
      // noinspection JSValidateTypes
      return defaultValue;
    }
  }

  return value;
}
/**
 * Runs multiple parsers and returns the first one that doesn't throw a TypeError.
 * @param value
 * @param parsers
 * @returns {*}
 */

function parseAny(value) {
  for (var _len = arguments.length, parsers = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    parsers[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _parsers = parsers; _i < _parsers.length; _i++) {
    var parser = _parsers[_i];

    try {
      return parser(value);
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e;
      }
    }
  }

  throw new TypeError("Could not parse value.");
}
/**
 * Validates that the value is one of the given choices.
 * @param value
 * @param choices
 * @param defaultValue
 * @returns {TypeErrorConstructor|*}
 */

function validateChoice(value, choices) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TypeError;

  if (choices.indexOf(value) === -1) {
    if (defaultValue === TypeError) {
      throw new TypeError("Invalid choice.");
    } else {
      return defaultValue;
    }
  }

  return value;
}
function choice() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (value) {
    if (args.indexOf(value) === -1) {
      throw new TypeError("Invalid Choice");
    }

    return value;
  };
}
/**
 * Returns first child element that matches the test function.
 * @param element - Parent element
 * @param fn - Test Function
 * @returns {Element}
 */

function findChild(element, fn) {
  for (var i = 0, l = element.children.length; i < l; i++) {
    var child = element.children[i];

    if (fn(child)) {
      return child;
    }
  }
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
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = parts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var part = _step4.value;
      r = r[part];
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

/***/ }),

/***/ "./src/menu2/DropDown.js":
/*!*******************************!*\
  !*** ./src/menu2/DropDown.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DropDown; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var DropDown =
/*#__PURE__*/
function (_MenuNode) {
  _inherits(DropDown, _MenuNode);

  function DropDown(_ref) {
    var _this;

    var target = _ref.target,
        text = _ref.text,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? true : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? false : _ref$autoActivate,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "both" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect;

    _classCallCheck(this, DropDown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDown).call(this));
    _this.menuNodeType = "dropdown";
    _this.closeOnBlur = closeOnBlur;
    _this.timeout = timeout;
    _this.autoActivate = autoActivate;
    _this.toggle = toggle;
    _this.closeOnSelect = closeOnSelect;

    if (target) {
      _this.element = target;
    } else {
      _this.element = _this.render(text);
    }

    _this.init();

    return _this;
  }

  _createClass(DropDown, [{
    key: "render",
    value: function render(text) {
      var element = document.createElement('div'),
          button = document.createElement('button');
      button.type = "button";
      button.innerHTML = text;
      element.appendChild(button);
      return element;
    }
  }, {
    key: "activate",
    value: function activate() {
      if (this.isActive) return; // Already active

      this.isActive = true;
      this.clearTimer('autoActivate');

      if (this.parent) {
        if (!this.parent.isActive) {
          this.parent.activate();
        }

        this.parent.setActiveItem(this, true);
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {}
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {}
  }, {
    key: "onMouseOut",
    value: function onMouseOut(event) {}
  }, {
    key: "onClick",
    value: function onClick(event) {}
  }]);

  return DropDown;
}(_MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/Menu.js":
/*!***************************!*\
  !*** ./src/menu2/Menu.js ***!
  \***************************/
/*! exports provided: MENU_PARAMETERS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_PARAMETERS", function() { return MENU_PARAMETERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu2/MenuItem.js");
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
/* harmony import */ var core_iter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/iter */ "./src/core/iter.js");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./decorators */ "./src/menu2/decorators.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
/* harmony import */ var core_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core/attributes */ "./src/core/attributes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var parseBooleanOrInt = function parseBooleanOrInt(value) {
  return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["parseAny"])(value, core_utility__WEBPACK_IMPORTED_MODULE_2__["parseBoolean"], core_utility__WEBPACK_IMPORTED_MODULE_2__["parseIntValue"]);
},
    timeAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_6__["default"](parseBooleanOrInt, core_attributes__WEBPACK_IMPORTED_MODULE_6__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_6__["TRUE"]),
    boolAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_6__["default"](core_utility__WEBPACK_IMPORTED_MODULE_2__["parseBoolean"], core_attributes__WEBPACK_IMPORTED_MODULE_6__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_6__["TRUE"]),
    stringAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_6__["default"](null, core_attributes__WEBPACK_IMPORTED_MODULE_6__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_6__["TRUE"]);

var MENU_PARAMETERS = {
  closeOnBlur: timeAttribute,
  timeout: timeAttribute,
  autoActivate: timeAttribute,
  multiple: boolAttribute,
  openOnHover: timeAttribute,
  closeOnSelect: boolAttribute,
  deactivateOnItemHover: boolAttribute,
  delay: timeAttribute,
  position: stringAttribute,
  toggle: stringAttribute,
  visible: boolAttribute
};
/**
 * A component for rendering nestable list of selectable items.
 */

var Menu = _decorate(null, function (_initialize, _MenuNode) {
  var Menu =
  /*#__PURE__*/
  function (_MenuNode2) {
    _inherits(Menu, _MenuNode2);

    // Used to parse attributes on elements to their correct type during initializing by
    // parsing the DOM tree.

    /**
     *
     * @param target {String|HTMLElement}
     * @param closeOnBlur {Boolean|Number}
     * @param timeout {Boolean|Number}
     * @param autoActivate {Boolean|Number}
     * @param multiple {Boolean|"inherit"|"root"}
     * @param openOnHover {Boolean|Number}
     * @param toggle {"on"|"off"|"both"|"none"}
     * @param closeOnSelect {Boolean}
     * @param deactivateOnItemHover {Boolean}
     * @param delay {Boolean|Number}
     * @param id {String}
     * @param classes {String}
     * @param children {Array}
     * @param visible
     * @param position {function|"inherit"|"root"|null|undefined}
     * @param context
     */
    function Menu() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$target = _ref.target,
          target = _ref$target === void 0 ? null : _ref$target,
          _ref$closeOnBlur = _ref.closeOnBlur,
          closeOnBlur = _ref$closeOnBlur === void 0 ? false : _ref$closeOnBlur,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? false : _ref$timeout,
          _ref$autoActivate = _ref.autoActivate,
          autoActivate = _ref$autoActivate === void 0 ? true : _ref$autoActivate,
          _ref$multiple = _ref.multiple,
          multiple = _ref$multiple === void 0 ? false : _ref$multiple,
          _ref$openOnHover = _ref.openOnHover,
          openOnHover = _ref$openOnHover === void 0 ? true : _ref$openOnHover,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? "on" : _ref$toggle,
          _ref$closeOnSelect = _ref.closeOnSelect,
          closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
          _ref$deactivateOnItem = _ref.deactivateOnItemHover,
          deactivateOnItemHover = _ref$deactivateOnItem === void 0 ? true : _ref$deactivateOnItem,
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 0 : _ref$delay,
          _ref$id = _ref.id,
          id = _ref$id === void 0 ? null : _ref$id,
          _ref$classes = _ref.classes,
          classes = _ref$classes === void 0 ? null : _ref$classes,
          _ref$children = _ref.children,
          children = _ref$children === void 0 ? null : _ref$children,
          _ref$visible = _ref.visible,
          visible = _ref$visible === void 0 ? false : _ref$visible,
          _ref$position = _ref.position,
          position = _ref$position === void 0 ? "inherit" : _ref$position,
          context = _objectWithoutProperties(_ref, ["target", "closeOnBlur", "timeout", "autoActivate", "multiple", "openOnHover", "toggle", "closeOnSelect", "deactivateOnItemHover", "delay", "id", "classes", "children", "visible", "position"]);

      _classCallCheck(this, Menu);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this));

      _initialize(_assertThisInitialized(_this));

      _this.menuNodeType = "menu";
      _this.events = null;
      _this.MenuItemClass = _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"];
      _this.SubMenuClass = Menu;
      _this.closeOnBlur = closeOnBlur;
      _this.timeout = timeout;
      _this.autoActivate = autoActivate;
      _this.multiple = multiple;
      _this.openOnHover = openOnHover;
      _this.toggle = toggle;
      _this.closeOnSelect = closeOnSelect;
      _this.deactivateOnItemHover = deactivateOnItemHover;
      _this.delay = delay;
      _this.position = position;

      if (target) {
        _this.element = target;
      } else {
        _this.element = _this.render(context);
      }

      _this.isVisible = visible;

      _this.init(); // On child is activate
      // deactivate siblings if multiple is false.


      _this.on('activate', function (target) {
        if (target.parent === _assertThisInitialized(_this)) {
          if (!_this.isActive) {
            _this.activate();
          }

          if (!_this.multiple) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _this.activeItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var activeItem = _step.value;

                if (activeItem !== target) {
                  activeItem.deactivate();
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
        }
      });

      _this.on('deactivate', function (target) {
        if (target.parent === _assertThisInitialized(_this)) {
          if (_this.isActive && _this.activeItems.length === 0) {
            _this.deactivate();
          }
        }
      });

      _this.on('event.click', function (event) {
        return _this.onClick(event);
      });

      _this.on('event.mouseover', function (event) {
        return _this.onMouseOver(event);
      });

      _this.on('event.mouseout', function (event) {
        return _this.onMouseOut(event);
      });

      _this.on('menuitem.selected', function (event) {
        return _this.onSelect(event);
      });

      if (classes) Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(_this.element, classes);
      if (id) _this.element.id = id;

      if (children) {
        _this.createItems(children);
      }

      return _this;
    }
    /**
     * Renders the domElement of the widget.
     *
     * @param arrow
     * @returns {HTMLDivElement}
     */


    return Menu;
  }(_MenuNode);

  return {
    F: Menu,
    d: [{
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_4__["inherit"]],
      key: "position",
      value: void 0
    }, {
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_4__["inherit"]],
      key: "multiple",
      value: void 0
    }, {
      kind: "field",
      "static": true,
      key: "__attributes__",
      value: function value() {
        return MENU_PARAMETERS;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$arrow = _ref2.arrow,
            arrow = _ref2$arrow === void 0 ? false : _ref2$arrow;

        var element = document.createElement('div'),
            body = document.createElement('div');
        element.className = "menu";
        body.className = "menu__body";

        if (arrow) {
          var _arrow = document.createElement('div');

          _arrow.className = "menu__arrow";
          element.appendChild(_arrow);
        }

        element.appendChild(body);
        return element;
      }
    }, {
      kind: "method",
      key: "activate",
      value: function activate() {
        var _this2 = this;

        if (!this.isActive) {
          var parent = this.parent; // Set isActivate flag and add active classes.

          this.isActive = true; // Register document click handler

          if (this.closeOnBlur && !this._captureDocumentClick) {
            this._captureDocumentClick = {
              target: document,
              onDocumentClick: function onDocumentClick(event) {
                if (!_this2.element.contains(event.target)) {
                  _this2.deactivate();
                }
              }
            };

            this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
          } // Notify parent that submenu activated.


          if (parent) {
            parent.publish('submenu.activate', this);
          }

          this.publish('menu.activate'); // Dispatch dom events.

          this.element.dispatchEvent(new CustomEvent('menu.activate', {
            detail: this,
            bubbles: true
          }));
        }
      }
    }, {
      kind: "method",
      key: "deactivate",
      value: function deactivate() {
        if (this.isActive) {
          // Set flag and remove active classes.
          this.isActive = false; // Clear any active child items.

          this.clearItems(); // Remove document click handler that tracks user clicks outside of menu tree.

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
            } // Notify parent that submenu deactivated.

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

          var parent = this.parent;

          if (parent) {
            parent.publish('submenu.deactivate', this);
          }

          this.publish('menu.deactivate'); // Dispatch dom events.

          this.element.dispatchEvent(new CustomEvent('menu.deactivate', {
            detail: this,
            bubbles: true
          }));
        }
      }
    }, {
      kind: "method",
      key: "show",
      value: function show() {
        if (!this.isVisible) {
          this.isVisible = true;

          if (this.position) {
            this.position.call(this, this);
          }

          if (this.parent) this.parent.publish('submenu.show', this);
          this.publish('menu.show', this);
          this.element.dispatchEvent(new CustomEvent('menu.show', {
            detail: this,
            bubbles: true
          }));
        }
      }
    }, {
      kind: "method",
      key: "hide",
      value: function hide() {
        if (this.isVisible) {
          this.isVisible = false;
          if (this.parent) this.parent.publish('submenu.hide', this);
          this.publish('menu.hide', this);
          this.element.dispatchEvent(new CustomEvent('menu.hide', {
            detail: this,
            bubbles: true
          }));
        }
      } //------------------------------------------------------------------------------------------------------------------
      // Tree methods.

    }, {
      kind: "method",
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

            var item = new this.MenuItemClass(args);

            if (submenu) {
              var _submenu = new this.SubMenuClass(submenu);

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
      }
    }, {
      kind: "method",
      key: "addItem",
      value: function addItem(text) {
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var item = new this.MenuItemClass({
          text: text,
          action: action
        });
        this.append(item);
        return this;
      }
    }, {
      kind: "method",
      key: "removeItem",
      value: function removeItem(item) {
        var index = this._children.indexOf(item);

        if (index !== -1) {
          this._children.splice(index, 1);

          if (item.element.parentElement) item.element.parentElement.removeChild(item.element);
        }
      }
    }, {
      kind: "method",
      key: "hasItem",
      value: function hasItem(item) {
        return this._children.indexOf(item) !== -1;
      }
    }, {
      kind: "method",
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
          item._parent = this;

          this._children.push(item);
        }

        return this;
      }
    }, {
      kind: "get",
      key: "activeItems",
      value: function activeItems() {
        var r = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            if (item.isActive) {
              r.push(item);
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
      kind: "method",
      key: "clearItems",
      value: function clearItems() {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.activeItems[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var child = _step5.value;
            child.deactivate();
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
      /**
       * Returns list of all menu bodies for the menu.
       *
       * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
       * last menu body in the menu.
       *
       * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]>}
       */

    }, {
      kind: "method",
      key: "getMenuBody",
      value: function getMenuBody() {
        return this.element.querySelectorAll(':scope > .menu__body');
      } //------------------------------------------------------------------------------------------------------------------
      // Event Handlers

    }, {
      kind: "method",
      key: "onMouseOver",
      value: function onMouseOver() {
        this.clearTimer('timeout');
      }
    }, {
      kind: "method",
      key: "onMouseOut",
      value: function onMouseOut(event) {
        var _this3 = this;

        if (!this.element.contains(event.originalEvent.relatedTarget)) {
          if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
            this.startTimer('timeout', function () {
              _this3.deactivate();
            }, this.timeout);
          }
        }
      }
    }, {
      kind: "method",
      key: "onClick",
      value: function onClick(event) {
        if (event.target === this) {
          if (this.isActive && this.toggleOff) {
            this.deactivate();
          } else if (!this.isActive && this.toggleOn) {
            this.activate();
          }
        }
      }
    }, {
      kind: "method",
      key: "onSelect",
      value: function onSelect() {
        if (this.closeOnSelect && this.isActive) {
          this.deactivate();
        }
      }
      /**
       * Will return true if menu items should toggle on.
       *
       * @returns {boolean}
       */

    }, {
      kind: "get",
      key: "toggleOn",
      value: function toggleOn() {
        return this.toggle === 'on' || this.toggle === 'both';
      }
      /**
       * Will return true if menu items should toggle off.
       *
       * @returns {boolean}
       */

    }, {
      kind: "get",
      key: "toggleOff",
      value: function toggleOff() {
        return this.toggle === 'off' || this.toggle === 'both';
      }
    }]
  };
}, _MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);


autoloader__WEBPACK_IMPORTED_MODULE_5__["default"].register('menu', function (element) {
  return Menu.FromHTML(element);
});

/***/ }),

/***/ "./src/menu2/MenuBar.js":
/*!******************************!*\
  !*** ./src/menu2/MenuBar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBar; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menu2/Menu.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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




var MenuBar =
/*#__PURE__*/
function (_Menu) {
  _inherits(MenuBar, _Menu);

  function MenuBar() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? true : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? false : _ref$autoActivate,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        _ref$openOnHover = _ref.openOnHover,
        openOnHover = _ref$openOnHover === void 0 ? true : _ref$openOnHover,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "both" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
        _ref$deactivateOnItem = _ref.deactivateOnItemHover,
        deactivateOnItemHover = _ref$deactivateOnItem === void 0 ? true : _ref$deactivateOnItem,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? false : _ref$delay,
        context = _objectWithoutProperties(_ref, ["target", "closeOnBlur", "timeout", "autoActivate", "multiple", "openOnHover", "toggle", "closeOnSelect", "deactivateOnItemHover", "delay"]);

    _classCallCheck(this, MenuBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuBar).call(this, _objectSpread({
      target: target,
      closeOnBlur: closeOnBlur,
      timeout: timeout,
      autoActivate: autoActivate,
      multiple: multiple,
      openOnHover: openOnHover,
      toggle: toggle,
      closeOnSelect: closeOnSelect,
      deactivateOnItemHover: deactivateOnItemHover,
      delay: false
    }, context)));

    _this.SubMenuClass =
    /*#__PURE__*/
    function (_Menu2) {
      _inherits(SubMenu, _Menu2);

      function SubMenu() {
        var _this2;

        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, SubMenu);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SubMenu).call(this, _objectSpread({
          delay: delay
        }, args)));
        _this2.SubMenuClass = SubMenu;
        return _this2;
      }

      return SubMenu;
    }(_Menu__WEBPACK_IMPORTED_MODULE_0__["default"]);

    _this.isVisible = true;
    return _this;
  }

  _createClass(MenuBar, [{
    key: "render",
    value: function render(context) {
      var element = document.createElement('div');
      element.className = "menubar";
      return element;
    }
  }, {
    key: "getMenuBody",
    value: function getMenuBody() {
      return [this.element];
    }
  }]);

  return MenuBar;
}(_Menu__WEBPACK_IMPORTED_MODULE_0__["default"]);


autoloader__WEBPACK_IMPORTED_MODULE_1__["default"].register('menubar', function (element) {
  return MenuBar.FromHTML(element);
});

/***/ }),

/***/ "./src/menu2/MenuItem.js":
/*!*******************************!*\
  !*** ./src/menu2/MenuItem.js ***!
  \*******************************/
/*! exports provided: ITEM_ATTRIBUTES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEM_ATTRIBUTES", function() { return ITEM_ATTRIBUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuItem; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators */ "./src/menu2/decorators.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./src/menu2/Menu.js");
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility.js");
/* harmony import */ var core_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/attributes */ "./src/core/attributes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var parseBooleanOrInt = function parseBooleanOrInt(value) {
  return Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseAny"])(value, _core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBoolean"], _core_utility__WEBPACK_IMPORTED_MODULE_3__["parseIntValue"]);
},
    timeAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_4__["default"](parseBooleanOrInt, core_attributes__WEBPACK_IMPORTED_MODULE_4__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_4__["TRUE"]),
    boolAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_4__["default"](_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseBoolean"], core_attributes__WEBPACK_IMPORTED_MODULE_4__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_4__["TRUE"]),
    stringAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_4__["default"](null, core_attributes__WEBPACK_IMPORTED_MODULE_4__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_4__["TRUE"]);

var ITEM_ATTRIBUTES = {
  closeOnBlur: timeAttribute,
  timeout: timeAttribute,
  autoActivate: timeAttribute,
  multiple: boolAttribute,
  openOnHover: timeAttribute,
  closeOnSelect: boolAttribute,
  deactivateOnItemHover: boolAttribute,
  delay: timeAttribute,
  position: stringAttribute,
  toggle: stringAttribute
};

var MenuItem = _decorate(null, function (_initialize, _MenuNode) {
  var MenuItem =
  /*#__PURE__*/
  function (_MenuNode2) {
    _inherits(MenuItem, _MenuNode2);

    /**@type{boolean|Number|"inherit"|"root"}*/
    function MenuItem() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          target = _ref.target,
          text = _ref.text,
          action = _ref.action,
          _ref$href = _ref.href,
          href = _ref$href === void 0 ? null : _ref$href,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? "inherit" : _ref$toggle,
          _ref$autoActivate = _ref.autoActivate,
          autoActivate = _ref$autoActivate === void 0 ? "inherit" : _ref$autoActivate,
          _ref$openOnHover = _ref.openOnHover,
          openOnHover = _ref$openOnHover === void 0 ? "inherit" : _ref$openOnHover,
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 'inherit' : _ref$delay,
          _ref$closeOnSelect = _ref.closeOnSelect,
          closeOnSelect = _ref$closeOnSelect === void 0 ? false : _ref$closeOnSelect,
          _ref$closeOnBlur = _ref.closeOnBlur,
          closeOnBlur = _ref$closeOnBlur === void 0 ? false : _ref$closeOnBlur,
          classes = _ref.classes,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? false : _ref$timeout,
          _ref$nodeName = _ref.nodeName,
          nodeName = _ref$nodeName === void 0 ? "div" : _ref$nodeName,
          _ref$position = _ref.position,
          position = _ref$position === void 0 ? "inherit" : _ref$position,
          _ref$multiple = _ref.multiple,
          multiple = _ref$multiple === void 0 ? false : _ref$multiple,
          context = _objectWithoutProperties(_ref, ["target", "text", "action", "href", "toggle", "autoActivate", "openOnHover", "delay", "closeOnSelect", "closeOnBlur", "classes", "timeout", "nodeName", "position", "multiple"]);

      _classCallCheck(this, MenuItem);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).call(this));

      _initialize(_assertThisInitialized(_this));

      if (target) {
        _this.element = target;
      } else {
        _this.element = _this.render(_objectSpread({
          text: text,
          nodeName: nodeName,
          href: href
        }, context));
      }

      if (classes) {
        _this.addClass(classes);
      }

      if (action) _this.addAction(action);
      _this.toggle = toggle;
      _this.autoActivate = autoActivate;
      _this.openOnHover = openOnHover;
      _this.delay = delay;
      _this.closeOnSelect = closeOnSelect;
      _this.closeOnBlur = closeOnBlur;
      _this.timeout = timeout;
      _this.position = position;
      _this.multiple = multiple;
      _this.MenuItemClass = MenuItem;
      _this.SubMenuClass = _Menu__WEBPACK_IMPORTED_MODULE_2__["default"];

      _this.on('event.click', function (event) {
        return _this.onClick(event);
      });

      _this.on('event.mouseover', function (event) {
        return _this.onMouseOver(event);
      });

      _this.on('event.mouseout', function (event) {
        return _this.onMouseOut(event);
      });

      _this.on('menuitem.selected', function (event) {
        return _this.onSelect(event);
      });

      return _this;
    }
    /**
     * Renders the domElement.
     *
     * @param text
     * @param nodeName
     * @param href
     * @returns {HTMLDivElement}
     */


    return MenuItem;
  }(_MenuNode);

  return {
    F: MenuItem,
    d: [{
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_1__["inherit"]],
      key: "toggle",
      value: void 0
    }, {
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_1__["inherit"]],
      key: "autoActivate",
      value: void 0
    }, {
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_1__["inherit"]],
      key: "openOnHover",
      value: void 0
    }, {
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_1__["inherit"]],
      key: "delay",
      value: function value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_1__["inherit"]],
      key: "position",
      value: void 0
    }, {
      kind: "field",
      "static": true,
      key: "__attributes__",
      value: function value() {
        return ITEM_ATTRIBUTES;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            text = _ref2.text,
            _ref2$nodeName = _ref2.nodeName,
            nodeName = _ref2$nodeName === void 0 ? "div" : _ref2$nodeName,
            _ref2$href = _ref2.href,
            href = _ref2$href === void 0 ? null : _ref2$href;

        var element = document.createElement(nodeName),
            button = document.createElement('a');
        element.className = "menuitem";
        button.type = "button";
        button.innerHTML = text;
        button.className = "menuitem__button";

        if (href) {
          button.href = href;
        }

        element.appendChild(button);
        return element;
      }
      /**
       * Activates the item.
       *
       * @param show {boolean|number} - The number of milliseconds after the item activates that the submenu will display.
       */

    }, {
      kind: "method",
      key: "activate",
      value: function activate() {
        var _this2 = this;

        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (this.isActive) return;
        this.isActive = true;
        this.clearTimer('activateItem');

        if (this.submenu) {
          if (show === true) {
            this.submenu.show();
          } else if (typeof show === 'number' && show >= 0) {
            this.startTimer('showTimer', function () {
              _this2.submenu.show();
            }, show);
          }
        } // Register document click handler


        if (this.closeOnBlur && !this._captureDocumentClick) {
          this._captureDocumentClick = {
            target: document,
            onDocumentClick: function onDocumentClick(event) {
              if (!_this2.element.contains(event.target)) {
                _this2.deactivate();
              }
            }
          };

          this._captureDocumentClick.target.addEventListener('click', this._captureDocumentClick.onDocumentClick);
        }

        this.publish('activate', this);

        if (this.parent) {
          this.parent.publish('activate', this);
        }

        this.element.dispatchEvent(new CustomEvent('menuitem.activate', {
          detail: this,
          bubbles: true
        }));
      }
      /**
       * Deactivates the item.
       */

    }, {
      kind: "method",
      key: "deactivate",
      value: function deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        this.clearTimer('showTimer');

        if (this.submenu) {
          this.submenu.deactivate();
          this.submenu.hide();
        } // Remove document click handler that tracks user clicks outside of menu tree.


        if (this._captureDocumentClick) {
          this._captureDocumentClick.target.removeEventListener('click', this._captureDocumentClick.onDocumentClick);

          this._captureDocumentClick = null;
        }

        this.publish('deactivate', this);
        if (this.parent) this.parent.publish('deactivate', this);
        this.element.dispatchEvent(new CustomEvent('menuitem.deactivate', {
          detail: this,
          bubbles: true
        }));
      }
      /**
       * Triggers a select item event.
       */

    }, {
      kind: "method",
      key: "select",
      value: function select() {
        this.publish('selected');
        this.dispatchTopic('menuitem.selected', {
          target: this
        });
        this.element.dispatchEvent(new CustomEvent('menuitem.selected', {
          detail: this,
          bubbles: true
        }));
      }
      /**
       * Returns true if the menu node is a menu item.
       *
       * @returns {boolean}
       */

    }, {
      kind: "method",
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
      kind: "method",
      key: "addAction",
      value: function addAction(action) {
        if (typeof action === 'string') {
          var fn = function fn() {
            window.location = action;
          };

          this.on('selected', fn);
          return fn;
        } else {
          this.on('selected', action);
          return action;
        }
      }
      /**
       * Removes an action.
       * @param action
       */

    }, {
      kind: "method",
      key: "removeAction",
      value: function removeAction(action) {
        this.off('selected', action);
      }
      /**
       * Tests to see if the item has an action.
       * @param action
       * @returns {boolean}
       */

    }, {
      kind: "method",
      key: "hasAction",
      value: function hasAction(action) {
        return this.hasEvent('selected', action);
      }
      /**
       * Removes all actions from the item.
       */

    }, {
      kind: "method",
      key: "clearActions",
      value: function clearActions() {
        this.off('selected');
      } //------------------------------------------------------------------------------------------------------------------
      // Manage submenu

      /**
       * Attaches a submenu to the menuitem.
       *
       * @param submenu
       */

    }, {
      kind: "method",
      key: "attachSubMenu",
      value: function attachSubMenu(submenu) {
        if (this.submenu) {
          throw new Error("MenuItem can only have one submenu.");
        }

        if (submenu.parent) {
          submenu.parent.detachSubMenu();
        }

        submenu._parent = this;
        this._children = [submenu];

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
      kind: "method",
      key: "detachSubMenu",
      value: function detachSubMenu() {
        var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var submenu = this.submenu;

        if (submenu) {
          this._children = [];
          submenu._parent = null;
          if (remove) submenu.remove();
        }

        return submenu;
      }
      /**
       * Returns true if the menu item has a submenu.
       * @returns {boolean}
       */

    }, {
      kind: "method",
      key: "hasSubMenu",
      value: function hasSubMenu() {
        return !!this.submenu;
      }
      /**
       * Returns true if the item has a submenu and that submenu is visible.
       * @returns {boolean}
       */

    }, {
      kind: "method",
      key: "isSubMenuVisible",
      value: function isSubMenuVisible() {
        return this.hasSubMenu() ? this.submenu.isVisible : false;
      } //------------------------------------------------------------------------------------------------------------------
      // Event handlers

      /**
       * Handles select events.
       */

    }, {
      kind: "method",
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
      kind: "method",
      key: "onClick",
      value: function onClick(event) {
        var isDisabled = this.getDisabled();

        if (isDisabled) {
          event.preventDefault();
        }

        if (event.target !== this) return;

        if (this.parent) {
          this.parent.publish('click-item', this, event);
        }

        if (!isDisabled) {
          if (this.isActive && this.hasSubMenu() && !this.isSubMenuVisible()) {
            this.submenu.show();
          } else if (!this.isActive && this.toggleOn) {
            this.activate();
          } else if (this.isActive && this.toggleOff && this.hasSubMenu()) {
            this.deactivate();
          }

          if (this.isActive && !this.hasSubMenu()) {
            this.select();
          }
        }
      }
      /**
       * Handles on mouse over events.
       * @param event
       */

    }, {
      kind: "method",
      key: "onMouseOver",
      value: function onMouseOver(event) {
        var _this3 = this;

        this.clearTimer('timeout');

        if (event.target === this) {
          // When the mouse moves on an item clear any active items in it's submenu.
          if (this.submenu) {
            this.submenu.clearItems();
          }

          if (this.element.contains(event.originalEvent.relatedTarget)) return;
          var activate = this.parent && this.parent.isActive ? this.openOnHover : this.autoActivate;

          if (this.parent) {
            this.parent.publish('mouse-enter-item', this, event);
          }

          if (!this.isActive && !this.isDisabled) {
            if (activate === true) {
              this.activate(typeof this.delay === 'boolean' ? !this.delay : this.delay);
            } else if (typeof activate === 'number' && activate >= 0) {
              this.startTimer('activateItem', function () {
                if (!_this3.isDisabled) {
                  _this3.activate(typeof _this3.delay === 'boolean' ? !_this3.delay : _this3.delay);
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
      kind: "method",
      key: "onMouseOut",
      value: function onMouseOut(event) {
        var _this4 = this;

        if (this.element.contains(event.originalEvent.relatedTarget)) return;
        this.clearTimer('activateItem');

        if (this.parent) {
          this.parent.publish('mouse-leave-item', this, event);
        }

        if (event.target === this && (!this.hasSubMenu() || !this.submenu.isVisible) && this.isActive) {
          this.deactivate();
        }

        if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
          this.startTimer('timeout', function () {
            _this4.deactivate();
          }, this.timeout);
        }
      } //------------------------------------------------------------------------------------------------------------------
      // Getters and Setters

      /**
       * Will return true if menu items should toggle on.
       *
       * @returns {boolean}
       */

    }, {
      kind: "get",
      key: "toggleOn",
      value: function toggleOn() {
        return this.toggle === 'on' || this.toggle === 'both';
      }
      /**
       * Will return true if menu items should toggle off.
       *
       * @returns {boolean}
       */

    }, {
      kind: "get",
      key: "toggleOff",
      value: function toggleOff() {
        return this.toggle === 'off' || this.toggle === 'both';
      }
    }, {
      kind: "get",
      key: "submenu",
      value: function submenu() {
        return this._children[0];
      }
      /**
       * Property wrapper around attachSubMenu and detachSubMenu methods.
       * @param value
       */

    }, {
      kind: "set",
      key: "submenu",
      value: function submenu(value) {
        if (!value) {
          this.detachSubMenu();
        } else {
          this.attachSubMenu(value);
        }
      }
    }]
  };
}, _MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/MenuNode.js":
/*!*******************************!*\
  !*** ./src/menu2/MenuNode.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuNode; });
/* harmony import */ var core_Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Publisher */ "./src/core/Publisher.js");
/* harmony import */ var core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/errors */ "./src/core/errors.js");
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utility */ "./src/menu2/utility.js");
/* harmony import */ var _core_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/attributes */ "./src/core/attributes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






/**
 * The base class for Menu and MenuItem.  Provides the utilities that are necessary to manage and transverse the menu tree
 * and propagate events throughout it.
 * @extends {Publisher}
 */

var MenuNode =
/*#__PURE__*/
function (_Publisher) {
  _inherits(MenuNode, _Publisher);

  function MenuNode() {
    var _this;

    _classCallCheck(this, MenuNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuNode).call(this));
    _this._parent = null;
    _this._children = [];
    _this._props = {};
    _this._timers = {};
    /**
     * @type {undefined|null|HTMLElement}
     * @private
     */

    _this._element = undefined;
    _this._isActive = false;
    _this._isVisible = true;
    _this.nodeType = null;
    _this.isController = false;
    _this.SubMenuClass = null;
    _this.MenuItemClass = null;
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

      if (this.boundEvents) return;
      this.boundEvents = {};

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

      this.boundEvents.onMouseOver = handleEvent;
      this.boundEvents.onMouseOut = handleEvent;
      this.boundEvents.onClick = handleEvent;
      this.element.addEventListener('click', this.boundEvents.onClick);
      this.element.addEventListener('mouseover', this.boundEvents.onMouseOver);
      this.element.addEventListener('mouseout', this.boundEvents.onMouseOut);
      this.isController = true;
    }
    /**
     * Unbinds all event listeners.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.events && this.hasElement()) {
        this.element.removeEventListener('click', this.boundEvents.onClick);
        this.element.removeEventListener('onMouseOut', this.boundEvents.onMouseOut);
        this.element.removeEventListener('onMouseOver', this.boundEvents.onMouseOver);
      }

      this.isController = false;
      this.boundEvents = null;
      this.element = null;
    }
    /**
     * Renders the component.
     *
     * @param context {Object} Dictionary of values that may be used to render the component during templating.
     * @abstract
     */

  }, {
    key: "render",
    value: function render(context) {} //------------------------------------------------------------------------------------------------------------------
    // Actions

    /**
     * Reference to the nodes parent or null if it is the root node of the tree.
     *
     * @returns {null|MenuNode}
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
     * Returns true if the current node is visible.
     *
     * @returns {boolean}
     */

  }, {
    key: "hasElement",

    /**
     * Returns true if the nodes element is defined.
     *
     * @returns {boolean}
     */
    value: function hasElement() {
      return !!this._element;
    }
    /**
     * Gets the root HTMLElement of the node.
     *
     * @returns {HTMLElement}
     */

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
     * Appends the component to the target selector.
     *
     * @param selector {string|HTMLElement|{append}}
     */

  }, {
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
      while (node) {
        if (node.parent === this) {
          return true;
        }

        node = node.parent;
      }

      return false;
    }
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
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, grandchild;

      return regeneratorRuntime.wrap(function getDescendants$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this.children[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 38;
                break;
              }

              child = _step.value;
              _context.next = 9;
              return child;

            case 9:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 12;
              _iterator2 = child.getDescendants()[Symbol.iterator]();

            case 14:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 21;
                break;
              }

              grandchild = _step2.value;
              _context.next = 18;
              return grandchild;

            case 18:
              _iteratorNormalCompletion2 = true;
              _context.next = 14;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](12);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 30:
              _context.prev = 30;

              if (!_didIteratorError2) {
                _context.next = 33;
                break;
              }

              throw _iteratorError2;

            case 33:
              return _context.finish(30);

            case 34:
              return _context.finish(27);

            case 35:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 38:
              _context.next = 44;
              break;

            case 40:
              _context.prev = 40;
              _context.t1 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 44:
              _context.prev = 44;
              _context.prev = 45;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 47:
              _context.prev = 47;

              if (!_didIteratorError) {
                _context.next = 50;
                break;
              }

              throw _iteratorError;

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
      var _this3 = this;

      var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var clear = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (clear && this._timers[name]) {
        this._timers[name].cancel();
      } else if (this._timers[name]) {
        throw new core_errors__WEBPACK_IMPORTED_MODULE_1__["KeyError"]("Timer already exists.");
      }

      var timer = this._timers[name] = {
        status: 'running',
        id: null,
        cancel: null,
        type: null
      };

      if (interval) {
        var id = timer.id = setInterval(function (timer) {
          fn.call(_this3, timer);
        }, time, timer);
        timer.type = 'interval';

        timer.cancel = function () {
          if (_this3._timers[name] === timer) {
            clearInterval(id);
            delete _this3._timers[name];
            timer.status = 'canceled';
          }
        };
      } else {
        var _id = timer.id = setTimeout(function (timer) {
          delete _this3._timers[name];
          timer.status = 'complete';
          fn.call(_this3, timer);
        }, time, timer);

        timer.type = 'timeout';

        timer.cancel = function () {
          if (_this3._timers[name] === timer) {
            clearTimeout(_id);
            delete _this3._timers[name];
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
      if (this._timers[name]) {
        this._timers[name].cancel();

        return true;
      }

      return false;
    }
    /**
     * Returns the timer object if it exists.
     *
     * @param name
     * @returns {*}
     */

  }, {
    key: "getTimer",
    value: function getTimer(name) {
      return this._timers[name];
    }
    /**
     * Returns the MenuNode that is responsible for delegating the events.
     *
     * @returns {null|{isController}|any}
     */

  }, {
    key: "getEventDelegator",
    value: function getEventDelegator() {
      var o = this.element;

      while (o) {
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(o);

        if (instance && instance.isController) {
          return instance;
        }

        o = o.parentElement;
      }

      return null;
    }
    /**
     * Returns the target node for the given HTMLElement in the current menu tree.
     *
     * @param target {HTMLElement}
     * @returns {null|MenuNode}
     */

  }, {
    key: "getTargetNode",
    value: function getTargetNode(target) {
      var o = target;

      while (o) {
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(o);

        if (instance) {
          return instance;
        }

        if (o === this.element) {
          break;
        }

        o = o.parentElement;
      }

      return null;
    }
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
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(o);

        if (instance && instance.isMenuItem()) {
          return instance;
        }

        if (o === this.element) {
          break;
        }

        o = o.parentElement;
      }

      return null;
    }
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
        var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(o);

        if (instance && instance.isMenu()) {
          return instance;
        }

        if (o === this.element) {
          break;
        }

        o = o.parentElement;
      }

      return null;
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
    }
    /**
     * Publishes the topic to itself and bubbles up the menu tree.
     *
     * @param topic
     * @param args
     * @returns {MenuNode}
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

        (_o = o).publish.apply(_o, [topic].concat(args));

        o = o.parent;
      }

      return this;
    } //------------------------------------------------------------------------------------------------------------------
    // Tree functions

    /**
     * Parses the dom and initializes any menu or menuitem elements that are found.
     */

  }, {
    key: "parseDOM",
    value: function parseDOM() {
      var _this4 = this;

      if (this._children.length) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this._children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var child = _step3.value;
            child.invalidateTree();
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

      var walk = function walk(node) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = node.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _child = _step4.value;
            var role = _child.dataset.role;

            if (Object(_utility__WEBPACK_IMPORTED_MODULE_3__["hasMenuInstance"])(_child)) {
              var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(_child);
              instance._parent = _this4;

              _this4._children.push(instance);

              instance.parseDOM();
            } else if (role === 'menu') {
              var menu = _this4.SubMenuClass.FromHTML(_child);

              _this4._children.push(menu);

              menu._parent = _this4;
              menu.parseDOM();
            } else if (role === 'menuitem') {
              var item = _this4.MenuItemClass.FromHTML(_child);

              _this4._children.push(item);

              item._parent = _this4;
              item.parseDOM();
            } else {
              walk(_child);
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
      };

      walk(this.element);
    }
    /**
     * Invalidates all parent and child references.
     */

  }, {
    key: "invalidateTree",
    value: function invalidateTree() {
      this._parent = null;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var child = _step5.value;
          child.invalidateTree();
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

      this._children = [];
    } //------------------------------------------------------------------------------------------------------------------
    // Getters and Setters

  }, {
    key: "addClass",
    value: function addClass(classes) {
      return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(this.element, classes);
    }
  }, {
    key: "removeClass",
    value: function removeClass(classes) {
      return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["removeClasses"])(this.element, classes);
    }
    /**
     * Returns the bound menu controller for the provided node.
     *
     * @static
     * @param element {HTMLElement}
     */

  }, {
    key: "parent",
    get: function get() {
      return this._parent || null;
    }
    /**
     * Reference to the root node of the tree.
     *
     * @returns {MenuNode}
     */

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
      var parent = this.parent;
      return parent.closest(function (node) {
        return node.nodeType === 'menu';
      });
    }
    /**
     * Reference to the first ancestor node in the menu tree who is an item. Returns null if it does not exist.
     *
     * @returns {MenuNode|null}
     */

  }, {
    key: "parentItem",
    get: function get() {
      var parent = this.parent;
      return parent.closest(function (node) {
        return node.nodeType === 'menuitem' || node.nodeType === 'dropdown';
      });
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
    }
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
    /**
     * A list of all children for the node.
     *
     * @returns {[]}
     */

  }, {
    key: "children",
    get: function get() {
      return this._children.slice(0);
    }
    /**
     * True if the node is active.
     *
     * @returns {boolean}
     */

  }, {
    key: "isActive",
    get: function get() {
      return this._isActive;
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

      if (value !== this._isActive) {
        if (value) {
          this.element.classList.add('active');
        } else {
          this.element.classList.remove('active');
        }

        this._isActive = value;
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
  }, {
    key: "isVisible",
    get: function get() {
      return this._isVisible;
    }
    /**
     * Sets the visible state of the node.
     *
     * @param value
     */
    ,
    set: function set(value) {
      value = !!value;

      if (value !== this._isVisible) {
        if (value) {
          this.element.classList.remove('hidden');
        } else {
          this.element.classList.add('hidden');
        }

        this._isVisible = value;
      }
    }
  }, {
    key: "element",
    get: function get() {
      if (this._element === undefined) {
        this.element = this.render({});
      }

      return this._element;
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

      if (this._element === element) return;

      if (Object(_utility__WEBPACK_IMPORTED_MODULE_3__["hasMenuInstance"])(element)) {
        throw new Error("Element is already bound to menu controller");
      }

      if (this._element) {
        Object(_utility__WEBPACK_IMPORTED_MODULE_3__["detachMenuInstance"])(this._element);
        this._element = undefined;
      }

      Object(_utility__WEBPACK_IMPORTED_MODULE_3__["attachMenuInstance"])(element, this);
      this._element = element;
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
    }
  }, {
    key: "dataset",
    get: function get() {
      return this.element.dataset;
    }
  }, {
    key: "style",
    get: function get() {
      return this.element.style;
    },
    set: function set(style) {
      this.element.style = style;
    }
  }], [{
    key: "getInstance",
    value: function getInstance(element) {
      return Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(element);
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

      var parameters = _core_attributes__WEBPACK_IMPORTED_MODULE_4__["default"].deserialize(element.dataset, this.__attributes__);
      parameters.target = element;
      var instance = new this(parameters);
      instance.parseDOM();
      return instance;
    }
  }]);

  return MenuNode;
}(core_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu2/decorators.js":
/*!*********************************!*\
  !*** ./src/menu2/decorators.js ***!
  \*********************************/
/*! exports provided: inherit, publishTargetEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inherit", function() { return inherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publishTargetEvent", function() { return publishTargetEvent; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Decorates a property so that it can take special keywords to inherit it's value up the parent tree.
 *
 * If it's value is "inherit" or "root" special actions are taken.
 *
 * On "inherit" the getter will use this.parent[key] as it's value or return undefined.
 * On "root" the getter will use this.root[key] as it's value or return undefined.
 *
 * If the value is anything else is behaves like normal.
 *
 * Usage:
 *  @inherit myField = <default value>;
 *
 * @param target
 * @returns {{kind: string, placement: string, descriptor: {set(*): void, enumerable: boolean, get(): (*|*), configurable: boolean}, key: *}|undefined|*}
 */
function inherit(target) {
  var key = target.key,
      initializer = target.initializer || function () {
    return undefined;
  };

  return {
    kind: 'method',
    placement: 'prototype',
    key: target.key,
    descriptor: {
      configurable: true,
      enumerable: false,
      get: function get() {
        var value = this._props[key];

        if (value === 'inherit' || value === undefined) {
          value = this.parent ? this.parent[key] : undefined;
        } else if (value === 'root') {
          var root = this.root;
          value = root ? root[key] : undefined;
        } else {
          return value;
        }

        if (value === undefined) value = initializer ? initializer() : undefined;
        return value;
      },
      set: function set(value) {
        this._props[key] = value;
      }
    }
  };
}
function publishTargetEvent(topic) {
  var bubble = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (descriptor) {
    var _descriptor$descripto = descriptor.descriptor,
        value = _descriptor$descripto.value,
        desc = _objectWithoutProperties(_descriptor$descripto, ["value"]);

    function wrapper(event) {
      if (this.getTargetNode(event.target) === this) {
        if (bubble) {
          this.dispatchTopic(topic, this, event);
        } else {
          this.publish(topic, this, event);
        }

        return value.call(this, event);
      }
    }

    return {
      placement: descriptor.placement,
      key: descriptor.key,
      kind: descriptor.kind,
      descriptor: _objectSpread({
        value: wrapper
      }, desc)
    };
  };
}

/***/ }),

/***/ "./src/menu2/index.js":
/*!****************************!*\
  !*** ./src/menu2/index.js ***!
  \****************************/
/*! exports provided: MenuBar, MenuItem, Menu, DropDown, MenuNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ "./src/menu2/MenuBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuBar", function() { return _MenuBar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu2/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./src/menu2/Menu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropDown */ "./src/menu2/DropDown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropDown", function() { return _DropDown__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuNode */ "./src/menu2/MenuNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuNode", function() { return _MenuNode__WEBPACK_IMPORTED_MODULE_4__["default"]; });












/***/ }),

/***/ "./src/menu2/utility.js":
/*!******************************!*\
  !*** ./src/menu2/utility.js ***!
  \******************************/
/*! exports provided: MENU_MAP, attachMenuInstance, detachMenuInstance, hasMenuInstance, getMenuInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_MAP", function() { return MENU_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachMenuInstance", function() { return attachMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachMenuInstance", function() { return detachMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMenuInstance", function() { return hasMenuInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMenuInstance", function() { return getMenuInstance; });
var MENU_MAP = new WeakMap();
function attachMenuInstance(element, instance) {
  if (instance === null) {
    return detachMenuInstance(element);
  }

  if (MENU_MAP.get(element)) {
    throw new Error("Element is already bound to menu node instance.");
  }

  MENU_MAP.set(element, instance);
}
function detachMenuInstance(element) {
  MENU_MAP["delete"](element);
}
function hasMenuInstance(element) {
  return MENU_MAP.has(element);
}
function getMenuInstance(element) {
  return MENU_MAP.get(element);
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