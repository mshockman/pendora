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
/******/ 		"test_pages": 0
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

/***/ "./src/core/polyfills/customevents.js":
/*!********************************************!*\
  !*** ./src/core/polyfills/customevents.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Taken from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();

/***/ }),

/***/ "./src/core/polyfills/index.js":
/*!*************************************!*\
  !*** ./src/core/polyfills/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scopedQuerySelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scopedQuerySelector */ "./src/core/polyfills/scopedQuerySelector.js");
/* harmony import */ var _scopedQuerySelector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scopedQuerySelector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _customevents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customevents */ "./src/core/polyfills/customevents.js");
/* harmony import */ var _customevents__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_customevents__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scrollxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scrollxy */ "./src/core/polyfills/scrollxy.js");
/* harmony import */ var _scrollxy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scrollxy__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./src/core/polyfills/scopedQuerySelector.js":
/*!***************************************************!*\
  !*** ./src/core/polyfills/scopedQuerySelector.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Adds support for the :self psuedo css selector for querySelector and querySelectorAll for browser that don't support it.
 */
if (!HTMLElement.prototype.querySelectorAll) {
  throw new Error("This polyfill will only work on browsers that support querySelectorAll and querySelector");
}

var scopeReg = /\s*:scope/gi,
    container = document.createElement('div');

try {
  container.querySelector(":scope div");
} catch (e) {
  var overrideProperty = function overrideProperty(prototype, propName) {
    var oldMethod = prototype[propName];

    prototype[propName] = function (query) {
      if (query.match(scopeReg)) {
        query = query.replace(scopeReg, '');
        var results;
        var key = "".concat(new Date().getTime(), "_").concat(Math.round(Math.random() * 10000));
        this.setAttribute('scope_temp_uuid', key);
        results = oldMethod.call(this.parentNode, "[scope_temp_uuid=\"".concat(key, "\"] ").concat(query));
        this.removeAttribute('scope_temp_uuid');
        return results;
      } else {
        return oldMethod.call(this, query);
      }
    };
  };

  overrideProperty(HTMLElement.prototype, 'querySelector');
  overrideProperty(HTMLElement.prototype, 'querySelectorAll');
}

/***/ }),

/***/ "./src/core/polyfills/scrollxy.js":
/*!****************************************!*\
  !*** ./src/core/polyfills/scrollxy.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Adds scrollX and scrollY to the window object.
 */
if (window.scrollX === undefined) {
  Object.defineProperty(window, 'scrollX', {
    get: function get() {
      return window.pageXOffset;
    }
  });
  Object.defineProperty(window, 'scrollY', {
    get: function get() {
      return window.pageYOffset;
    }
  });
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

/***/ "./tests/src/test_pages.js":
/*!*********************************!*\
  !*** ./tests/src/test_pages.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app */ "./src/app.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");

 // noinspection ES6UnusedImports

 // noinspection JSUnresolvedVariable

__webpack_require__.p = "dist/";
var app = new app__WEBPACK_IMPORTED_MODULE_1__["default"]({
  'test_resizeable': function test_resizeable() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(5), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, /*! test_resizeable.js */ "./tests/src/test_resizeable.js"));
  },
  'test_overlay2': function test_overlay2() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(5), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! test_overlay2.js */ "./tests/src/test_overlay2.js"));
  },
  'test_animation': function test_animation() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, /*! test_animation.js */ "./tests/src/test_animation.js"));
  },
  'test_positioner': function test_positioner() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(5), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, /*! test_positioner.js */ "./tests/src/test_positioner.js"));
  },
  'test_tooltip': function test_tooltip() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(6), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! test_tooltip.js */ "./tests/src/test_tooltip.js"));
  },
  'test_notifications': function test_notifications() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(6), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, /*! test_notifications.js */ "./tests/src/test_notifications.js"));
  },
  'test_modal': function test_modal() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, /*! test_modal.js */ "./tests/src/test_modal.js"));
  },
  'test_panes': function test_panes() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! test_panes */ "./tests/src/test_panes.js"));
  },
  'test_tabs': function test_tabs() {
    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! test_tabs */ "./tests/src/test_tabs.js"));
  }
});
window.app = app;

/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi core/polyfills ./tests/src/test_pages.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core/polyfills */"./src/core/polyfills/index.js");
module.exports = __webpack_require__(/*! ./tests/src/test_pages.js */"./tests/src/test_pages.js");


/***/ })

/******/ });
});
//# sourceMappingURL=test_pages.bundle.js.map