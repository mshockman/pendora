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
var app = new app__WEBPACK_IMPORTED_MODULE_1__["default"]({// 'menubar': () =>  import("./pages/menubar_example.js"),
  // 'menu_examples': () =>  import("./pages/menu_examples.js"),
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

function STOP() {
  throw STOP;
}

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

/***/ "./src/core/position.js":
/*!******************************!*\
  !*** ./src/core/position.js ***!
  \******************************/
/*! exports provided: getOffsetElement, getClientRect, getBoundingOffsetRect, getBoundingDocumentRect, getTranslation, setTranslation, getCssPosition, setCssPosition, setElementClientPosition, clientRectToDocumentSpace, documentRectToClientSpace, snapToGrid, convertDomRectToObject, getPointOnElement, getSubBoundingBox, getDistanceBetweenRects */
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
/* harmony import */ var _vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vectors */ "./src/core/vectors.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utility */ "./src/core/utility.js");


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
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](0, 0, window.innerWidth, window.innerHeight);
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
  if (!offsetParent) offsetParent = getOffsetElement(element);
  var offsetRect = offsetParent.getBoundingClientRect(),
      rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left - offsetRect.left, rect.top - offsetRect.top, rect.right - offsetRect.right, rect.bottom - offsetRect.bottom);
}
/**
 * Returns a bounding rect who's positions are relative to the document.
 * @param element
 * @returns {{top: number, left: number, bottom: number, width: number, x: number, y: number, right: number, height: number}}
 */

function getBoundingDocumentRect(element) {
  var rect = element.getBoundingClientRect();
  return new _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"](rect.left + window.scrollX, rect.top + window.scrollY, rect.right + window.scrollX, rect.bottom + window.scrollY);
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
 * @param position {{x, y}|{left, top}|Array|Vec2}
 * @param method {'top-left'|'top-right'|'bottom-left'|'bottom-right'|'translate'|'translate3d'}
 */

function setElementClientPosition(element, position) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top-left';
  position = _vectors__WEBPACK_IMPORTED_MODULE_0__["Vec2"].fromVertex(position);

  if (method === 'top-left' || method === 'top-right' || method === 'bottom-left' || method === 'bottom-right') {
    var style = getComputedStyle(element); // position can't be static for this operation.  Switch to relative.

    if (style.position === 'static') {
      element.style.position = 'relative';
      style = getComputedStyle(element);
    }

    var left = parseInt(style.left, 10),
        top = parseInt(style.top, 10),
        right = parseInt(style.right, 10),
        bottom = parseInt(style.bottom, 10),
        box = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].getBoundingClientRect(element),
        deltaX = position.left - box.left,
        deltaY = position.top - box.top;

    if (method === 'top-left') {
      element.style.left = left + deltaX + 'px';
      element.style.top = top + deltaY + 'px';
      element.style.right = '';
      element.style.bottom = '';
    } else if (method === 'top-right') {
      element.style.right = right - deltaX + 'px';
      element.style.top = top + deltaY + 'px';
      element.style.left = '';
      element.style.bottom = '';
    } else if (method === 'bottom-left') {
      element.style.left = left + deltaX + 'px';
      element.style.bottom = bottom - deltaY + 'px';
      element.style.right = '';
      element.style.top = '';
    } else {
      // bottom-right
      element.style.right = right - deltaX + 'px';
      element.style.bottom = bottom - deltaY + 'px';
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
  r.left += window.scrollX;
  r.right += window.scrollX;
  if (typeof r.top === 'number') r.top += window.scrollY;
  if (typeof r.bottom === 'number') r.bottom += window.scrollY;
  return r;
}
/**
 * Transforms the coordinates of a BoundingClientRect like object from document space to client space.
 * @param rect
 */

function documentRectToClientSpace(rect) {
  var r = _vectors__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromRect(rect);
  r.left -= window.scrollX;
  r.right -= window.scrollX;
  if (typeof r.top === 'number') r.top -= window.scrollY;
  if (typeof r.bottom === 'number') r.bottom -= window.scrollY;
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

/***/ }),

/***/ "./src/core/utility.js":
/*!*****************************!*\
  !*** ./src/core/utility.js ***!
  \*****************************/
/*! exports provided: clamp, modulo, firstValue, all, any, proto, randomChoice, arraysEqual, parseHTML, isEmptyObject, emptyElement, addClasses, removeClasses, assignAttributes, setElementOffset, getElementOffset, getScroll, isWindow, setScroll, selectElement, assert, parseBooleanOrInt, parseBooleanOrFloat, parseBoolean, parseIntValue, parseFloatValue, parseAny, validateChoice, choice, findChild, filterChildren, getOwnProperty, getPropertyByPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return modulo; });
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
function modulo(value, mod) {
  return (value % mod + mod) % mod;
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

/***/ "./src/core/vectors.js":
/*!*****************************!*\
  !*** ./src/core/vectors.js ***!
  \*****************************/
/*! exports provided: UnitError, Vec2, Vec3, Vec4, Rect, RGBA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitError", function() { return UnitError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec2", function() { return Vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec3", function() { return Vec3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec4", function() { return Vec4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return Rect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return RGBA; });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utility */ "./src/core/utility.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "./src/core/errors.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var regPercentage = /^(\d+\.?\d*)%$/,
    regWhitespace = /\s+/,
    regPositionPart = /^([a-zA-Z]*)([+-]?\d*\.?\d*)([a-z%]*)$/,
    // Parses string like "left+10px" into ["left", "+10px"]
regTypedNumber = /^([+-]?\d+\.?\d*)([a-z%]*)$/; // parses strings like "+10px" into ["+10", "px"].  AKA, parses the unit out of a number string.

var UnitError =
/*#__PURE__*/
function (_ExtendableError) {
  _inherits(UnitError, _ExtendableError);

  function UnitError() {
    _classCallCheck(this, UnitError);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnitError).apply(this, arguments));
  }

  return UnitError;
}(_errors__WEBPACK_IMPORTED_MODULE_1__["ExtendableError"]);
var positionShortHandValues = {
  top: 'center top',
  right: 'right middle',
  bottom: 'center bottom',
  left: 'left middle'
};
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

    this[0] = x;
    this[1] = y;
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
    }
  }, {
    key: "scalar",
    value: function scalar(value) {
      return new Vec2(this[0] * value, this[1] * value);
    }
  }, {
    key: "mod",
    value: function mod(vec2) {
      if (typeof vec2 === 'number') {
        return new Vec2(this[0] % vec2, this[1] % vec2);
      } else {
        return new Vec2(this[0] % vec2[0], this[1] % vec2[1]);
      }
    }
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
    }
  }, {
    key: "clone",
    value: function clone() {
      return Vec2(this[0], this[1]);
    }
  }, {
    key: "toTranslate",
    value: function toTranslate() {
      return "translate(".concat(this.x, "px, ").concat(this.y, "px)");
    }
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
    key: "top",
    get: function get() {
      return this[1];
    },
    set: function set(value) {
      this[1] = value;
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
    }
  }, {
    key: "scalar",
    value: function scalar(value) {
      return new Vec3(this[0] * value, this[1] * value, this[2] * value);
    }
  }, {
    key: "equals",
    value: function equals(vec3) {
      return vec3 === this || vec3[0] === this[0] && vec3[1] === this[1] && vec3[2] === this[2];
    }
  }, {
    key: "mod",
    value: function mod(vec3) {
      if (typeof vec3 === 'number') {
        return new Vec3(this[0] % vec3, this[1] % vec3, this[2] % vec3);
      } else {
        return new Vec3(this[0] % vec3[0], this[1] % vec3[1], this[2] % vec3[2]);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec3(this[0], this[1], this[2]);
    }
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
    }
  }, {
    key: "toRGB",
    value: function toRGB() {
      return "rgb(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ")");
    }
  }, {
    key: "toTranslate3d",
    value: function toTranslate3d() {
      return "translate3d(".concat(this.x, "px, ").concat(this.y, "px, ").concat(this.z, "px)");
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
    }
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
    }
  }, {
    key: "scalar",
    value: function scalar(value) {
      return this._new(this[0] * value, this[1] * value, this[2] * value, this[3] * value);
    }
  }, {
    key: "equals",
    value: function equals(vec4) {
      return vec4 === this || vec4[0] === this[0] && vec4[1] === this[1] && vec4[2] === this[2] && vec4[3] === this[3];
    }
  }, {
    key: "mod",
    value: function mod(valueOrVec4) {
      if (typeof valueOrVec4 === 'number') {
        return this._new(this[0] % valueOrVec4, this[1] % valueOrVec4, this[2] % valueOrVec4, this[3] % valueOrVec4);
      } else {
        return this._new(this[0] % valueOrVec4[0], this[1] % valueOrVec4[1], this[2] % valueOrVec4[2], this[3] % valueOrVec4[3]);
      }
    }
  }, {
    key: "toRGBA",
    value: function toRGBA() {
      return "rgba(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ", ").concat(this.a, ")");
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this[0], this[1], this[2], this[3]);
    }
  }, {
    key: "_new",
    value: function _new(left, top, right, bottom) {
      return new this.constructor(left, top, right, bottom);
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
    }
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
var Rect =
/*#__PURE__*/
function (_Vec) {
  _inherits(Rect, _Vec);

  function Rect(left, top, right, bottom) {
    var _this;

    var domElement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Rect);

    if (_typeof(left) === 'object' && left.getBoundingClientRect) {
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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, left, top, right, bottom));
    _this.domElement = domElement;
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
      return new this.constructor(left, top, right, bottom, domElement === undefined ? this.domElement : domElement);
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      return new Vec2(this[0], this[1]);
    }
  }, {
    key: "getArea",
    value: function getArea() {
      return this.width * this.height;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (_typeof(x) === 'object') {
        y = x.y;
        x = x.x;
      }

      return this._new(this[0] + x, this[1] + y, this[2] + x, this[3] + y);
    }
  }, {
    key: "addMargins",
    value: function addMargins(_ref2) {
      var left = _ref2.left,
          top = _ref2.top,
          right = _ref2.right,
          bottom = _ref2.bottom;
      return this._new(this.left - left, this.top - top, this.right + right, this.bottom + bottom);
    }
  }, {
    key: "addPaddings",
    value: function addPaddings(_ref3) {
      var left = _ref3.left,
          top = _ref3.top,
          right = _ref3.right,
          bottom = _ref3.bottom;
      return this._new(this.left + left, this.top + top, this.right - right, this.bottom - bottom);
    }
  }, {
    key: "moveTo",
    value: function moveTo(_ref4) {
      var left = _ref4.left,
          top = _ref4.top;
      var deltaX = left - this.left,
          deltaY = top - this.top;
      return this._new(this.left + deltaX, this.top + deltaY, this.right + deltaX, this.bottom + deltaY);
    }
  }, {
    key: "intersection",
    value: function intersection(_ref5) {
      var left = _ref5.left,
          top = _ref5.top,
          right = _ref5.right,
          bottom = _ref5.bottom;
      left = Math.max(this.left, left);
      right = Math.min(this.right, right);
      bottom = Math.min(this.bottom, bottom);
      top = Math.max(this.top, top);

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
    key: "clampXY",
    value: function clampXY(rect) {
      var width = this.right - this.left,
          height = this.bottom - this.top,
          left = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.left, rect.left, rect.right),
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.top, rect.top, rect.bottom);

      return this._new(left, top, left + width, top + height);
    }
  }, {
    key: "clamp",
    value: function clamp(rect) {
      rect = rect.subtract(new Rect(0, 0, this.width, this.height));

      var width = this.width,
          height = this.height,
          left = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.left, rect.left, rect.right),
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.top, rect.top, rect.bottom);

      return this._new(left, top, left + width, top + height);
    }
  }, {
    key: "clampX",
    value: function clampX(rect) {
      rect = rect.subtract(new Rect(0, 0, this.width, this.height));

      var width = this.width,
          left = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.left, rect.left, rect.right);

      return this._new(left, this.top, left + width, this.bottom);
    }
  }, {
    key: "clampY",
    value: function clampY(rect) {
      rect = rect.subtract(new Rect(0, 0, this.width, this.height));

      var height = this.height,
          top = Object(_utility__WEBPACK_IMPORTED_MODULE_0__["clamp"])(this.top, rect.top, rect.bottom);

      return this._new(this.left, top, this.right, top + height);
    }
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
    }
  }, {
    key: "position",
    value: function position(_ref6) {
      var my = _ref6.my,
          at = _ref6.at,
          of = _ref6.of,
          _ref6$inside = _ref6.inside,
          inside = _ref6$inside === void 0 ? null : _ref6$inside,
          _ref6$collision = _ref6.collision,
          collision = _ref6$collision === void 0 ? null : _ref6$collision;

      if (of.getBoundingClientRect) {
        of = new Rect(of);
      }

      if (inside && inside.getBoundingClientRect) {
        inside = new Rect(inside);
      } // collision can be string with a space separating the x and y values.
      // for example "fit flipfit"
      // normalize it to an {x, y} object.


      if (collision && typeof collision === 'string') {
        var parts = collision.trim().split(regWhitespace);
        collision = {
          x: parts[0],
          y: parts[1]
        };
      }

      var anchor = this.evaluatePositionString(my),
          reference = of.evaluatePositionString(at),
          deltaX = reference.x - anchor.x,
          deltaY = reference.y - anchor.y;
      var rect = this.translate(deltaX, deltaY);

      if (!collision || !inside || inside.contains(rect)) {
        return rect;
      }

      var flip = false,
          collisionX = 'none',
          collisionY = 'none';

      if (!inside.containsX(rect)) {
        if (collision.x === 'flip' || collision.x === 'flipfit') {
          var center = this.left + this.width / 2;
          anchor.x = (anchor.x - center) * -1 + center;
          center = of.left + of.width / 2;
          reference.x = (reference.x - center) * -1 + center;
          flip = true;
          collisionX = 'flip';
        }
      }

      if (!inside.containsY(rect)) {
        if (collision.y === 'flip' || collision.y === 'flipfit') {
          var middle = this.top + this.height / 2;
          anchor.y = (anchor.y - middle) * -1 + middle;
          middle = of.top + of.height / 2;
          reference.y = (reference.y - middle) * -1 + middle;
          flip = true;
          collisionY = 'flip';
        }
      }

      if (flip) {
        deltaX = reference.x - anchor.x;
        deltaY = reference.y - anchor.y;
        rect = this.translate(deltaX, deltaY);

        if (inside.contains(rect)) {
          rect.collsionX = collisionX;
          rect.collsionY = collisionY;
          return rect;
        }
      }

      if (collision.x === 'fit' || collision.x === 'flipfit') {
        rect = rect.clampX(inside);
        collisionX = collisionX === 'flip' ? 'flipfit' : 'fit';
      }

      if (collision.y === 'fit' || collision.y === 'flipfit') {
        rect = rect.clampY(inside);
        collisionY = collisionY === 'flip' ? 'flipfit' : 'fit';
      }

      rect.collsionX = collisionX;
      rect.collsionY = collisionY;
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

      return new Vec2(rx, ry);
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
            throw new _errors__WEBPACK_IMPORTED_MODULE_1__["ValueError"]("Invalid Option: ".concat(p));
          }
        } else {
          if (p === 'top') {
            r = this.top;
          } else if (p === 'middle' || p === 'center') {
            r = this.top + this.height / 2;
          } else if (p === 'bottom') {
            r = this.top + this.height;
          } else {
            throw new _errors__WEBPACK_IMPORTED_MODULE_1__["ValueError"]("Invalid Option: ".concat(p));
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
          throw new UnitError("Invalid unit: Must be either % or px.");
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
  }]);

  return Rect;
}(Vec4);
var RGBA =
/*#__PURE__*/
function (_Vec2) {
  _inherits(RGBA, _Vec2);

  function RGBA(r, g, b, a) {
    var _this2;

    _classCallCheck(this, RGBA);

    if (_typeof(r) === 'object') {
      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(RGBA).call(this, r));
    } else {
      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(RGBA).call(this, r, g, b, a));
    }

    return _possibleConstructorReturn(_this2);
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
}(Vec4);

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
  }]);

  return FormWidgetBase;
}();



/***/ }),

/***/ "./src/forms/HiddenInputWidget.js":
/*!****************************************!*\
  !*** ./src/forms/HiddenInputWidget.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HiddenInputWidget; });
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility.js");
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




var HiddenInputWidget =
/*#__PURE__*/
function (_FormWidgetBase) {
  _inherits(HiddenInputWidget, _FormWidgetBase);

  function HiddenInputWidget(name) {
    var _this;

    _classCallCheck(this, HiddenInputWidget);

    var element = document.createElement('span');
    _this = _possibleConstructorReturn(this, _getPrototypeOf(HiddenInputWidget).call(this, element));
    _this.element.style.display = "none";
    _this.name = name;
    return _this;
  }

  _createClass(HiddenInputWidget, [{
    key: "getValue",
    value: function getValue() {
      var r = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.element.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var input = _step.value;
          r.push(input.value);
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

      if (r.length === 1) {
        return r[0];
      } else if (r.length > 1) {
        return r;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var fragment = document.createDocumentFragment();

      if (!Array.isArray(value)) {
        value = [value];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var v = _step2.value;
          var input = document.createElement('input');
          input.type = "hidden";
          input.value = v + "";
          if (this.name) input.name = this.name;
          fragment.appendChild(input);
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

      Object(_core_utility__WEBPACK_IMPORTED_MODULE_0__["emptyElement"])(this.element);
      this.element.appendChild(fragment);
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.element.querySelectorAll('input')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var input = _step3.value;
          input.name = name;
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
  }]);

  return HiddenInputWidget;
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
/*! exports provided: SelectInputWidget, HiddenInputWidget, FormWidgetBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectInputWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectInputWidget */ "./src/forms/SelectInputWidget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectInputWidget", function() { return _SelectInputWidget__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _HiddenInputWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HiddenInputWidget */ "./src/forms/HiddenInputWidget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HiddenInputWidget", function() { return _HiddenInputWidget__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _FormWidgetBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormWidgetBase */ "./src/forms/FormWidgetBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormWidgetBase", function() { return _FormWidgetBase__WEBPACK_IMPORTED_MODULE_2__["default"]; });








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
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    _this.positioner = _positioners__WEBPACK_IMPORTED_MODULE_2__["DROPDOWN"];

    _this.init();

    return _this;
  }

  return DropDown;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["default"]);


autoloader__WEBPACK_IMPORTED_MODULE_1__["default"].register('dropdown', function (element) {
  return DropDown.FromHTML(element);
});

/***/ }),

/***/ "./src/menu/Menu.js":
/*!**************************!*\
  !*** ./src/menu/Menu.js ***!
  \**************************/
/*! exports provided: MENU_PARAMETERS, AbstractMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_PARAMETERS", function() { return MENU_PARAMETERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMenu", function() { return AbstractMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu/MenuNode.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorators */ "./src/menu/decorators.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
/* harmony import */ var core_attributes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core/attributes */ "./src/core/attributes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









var parseBooleanOrInt = function parseBooleanOrInt(value) {
  return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["parseAny"])(value, core_utility__WEBPACK_IMPORTED_MODULE_2__["parseBoolean"], core_utility__WEBPACK_IMPORTED_MODULE_2__["parseIntValue"]);
},
    timeAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_5__["default"](parseBooleanOrInt, core_attributes__WEBPACK_IMPORTED_MODULE_5__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_5__["TRUE"]),
    boolAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_5__["default"](core_utility__WEBPACK_IMPORTED_MODULE_2__["parseBoolean"], core_attributes__WEBPACK_IMPORTED_MODULE_5__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_5__["TRUE"]),
    stringAttribute = new core_attributes__WEBPACK_IMPORTED_MODULE_5__["default"](null, core_attributes__WEBPACK_IMPORTED_MODULE_5__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_5__["TRUE"]);

var MENU_PARAMETERS = {
  closeOnBlur: timeAttribute,
  timeout: timeAttribute,
  autoActivate: timeAttribute,
  openOnHover: timeAttribute,
  closeOnSelect: boolAttribute,
  delay: timeAttribute,
  toggle: stringAttribute,
  visible: boolAttribute
};
/**
 * @abstract
 */

var AbstractMenu = _decorate(null, function (_initialize, _MenuNode) {
  var AbstractMenu =
  /*#__PURE__*/
  function (_MenuNode2) {
    _inherits(AbstractMenu, _MenuNode2);

    // Used to parse attributes on elements to their correct type during initializing by
    // parsing the DOM tree.
    function AbstractMenu() {
      var _this;

      _classCallCheck(this, AbstractMenu);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractMenu).call(this));

      _initialize(_assertThisInitialized(_this));

      _this.menuNodeType = "menu";
      _this.closeOnBlur = false; // both sub-item and menu

      _this.timeout = false; // both sub-item and menu

      _this.autoActivate = false; // sub-item property

      _this.openOnHover = false; // sub-item property

      _this.toggle = "none";
      _this.closeOnSelect = true; // both sub-item and menu.

      _this.delay = false; // sub-item property

      _this.positioner = "inherit";
      _this.direction = "vertical";
      return _this;
    }

    return AbstractMenu;
  }(_MenuNode);

  return {
    F: AbstractMenu,
    d: [{
      kind: "field",
      "static": true,
      key: "__attributes__",
      value: function value() {
        return MENU_PARAMETERS;
      }
    }, {
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_3__["inherit"]],
      key: "positioner",
      value: void 0
    }, {
      kind: "method",
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
        this.on('menuitem.deactivate', function (target) {
          if (target.parent === _this2) {
            if (_this2.isActive && !_this2.activeChild) {
              _this2.deactivate();
            }
          }
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
        this.on('menuitem.selected', function (event) {
          return _this2.onSelect(event);
        });
        this.on('menu.keypress', function (topic) {
          return _this2.onMenuKeyPress(topic);
        });
      }
    }, {
      kind: "method",
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
      key: "activeChild",
      value: function activeChild() {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            if (item.isActive) {
              return item;
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

        return null;
      }
    }, {
      kind: "get",
      key: "activeIndex",
      value: function activeIndex() {
        var children = this.children;

        for (var i = 0, l = children.length; i < l; i++) {
          if (children[i].isActive) {
            return i;
          }
        }

        return -1;
      }
    }, {
      kind: "get",
      key: "firstChild",
      value: function firstChild() {
        return this.children[0];
      }
    }, {
      kind: "get",
      key: "lastChild",
      value: function lastChild() {
        return this.children[this.children.length - 1];
      }
    }, {
      kind: "get",
      key: "firstEnabledChild",
      value: function firstEnabledChild() {
        var children = this.children;

        for (var i = 0, l = children.length; i < l; i++) {
          if (!children[i].isDisabled) {
            return children[i];
          }
        }

        return null;
      }
    }, {
      kind: "get",
      key: "lastEnabledChild",
      value: function lastEnabledChild() {
        var children = this.children;

        for (var i = children.length - 1, l = 0; i >= l; i--) {
          if (!children[i].isDisabled) {
            return children[i];
          }
        }

        return null;
      }
    }, {
      kind: "method",
      key: "clearActiveChild",
      value: function clearActiveChild() {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var child = _step5.value;

            if (child.isActive) {
              child.deactivate();
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
      /**
       * Returns list of all menu bodies for the menu.
       *
       * Menu bodies are where item are appended when using function like addItem or append.  They will be added to the
       * last menu body in the menu.
       *
       * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]> | HTMLElement[]}
       */

    }, {
      kind: "method",
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
      kind: "method",
      key: "isMenu",
      value: function isMenu() {
        return true;
      }
    }, {
      kind: "method",
      key: "setParent",
      value: function setParent(parent) {
        parent.attachSubMenu(this);
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
        var _this4 = this;

        if (!this.element.contains(event.originalEvent.relatedTarget)) {
          if (this.isActive && typeof this.timeout === 'number' && this.timeout >= 0) {
            this.startTimer('timeout', function () {
              _this4.deactivate();
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
       * Handles navigating the selection to an item during keyboard navigation.
       * @param item
       * @param showSubMenu
       * @private
       */

    }, {
      kind: "method",
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
    }, {
      kind: "method",
      key: "onMenuKeyPress",
      value: function onMenuKeyPress(topic) {
        var event = topic.originalEvent,
            key = event.key,
            arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
            arrowKeyPressed = arrowKeys.indexOf(key) !== -1,
            ARROW_BACK = 'ArrowUp',
            ARROW_FORWARD = 'ArrowDown',
            ARROW_NEXT = 'ArrowRight',
            ARROW_PREVIOUS = 'ArrowLeft';

        if (this.direction === 'vertical') {
          ARROW_BACK = 'ArrowLeft';
          ARROW_FORWARD = 'ArrowRight';
          ARROW_NEXT = 'ArrowDown';
          ARROW_PREVIOUS = 'ArrowUp';
        }

        if (arrowKeyPressed) {
          var children = this.enabledChildren,
              index = children.indexOf(this.activeChild),
              child = children[index];

          if (key === ARROW_PREVIOUS) {
            if (index === -1) {
              // When their is no active item, activate the last item.
              this._navigateToItem(children[children.length - 1], this.isRoot);
            } else {
              this._navigateToItem(children[Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["modulo"])(index - 1, children.length)], this.isRoot);
            }

            return;
          } else if (key === ARROW_NEXT) {
            if (index === -1) {
              this._navigateToItem(children[0], this.isRoot);
            } else {
              this._navigateToItem(children[Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["modulo"])(index + 1, children.length)], this.isRoot);
            }

            return;
          } else if (key === ARROW_FORWARD) {
            if (child && child.hasSubMenu()) {
              var ret = false;

              if (!child.submenu.isVisible) {
                ret = true;
                child.showSubMenu();
              }

              if (!child.submenu.activeChild) {
                var firstChild = child.submenu.firstEnabledChild;

                if (firstChild) {
                  ret = true;

                  this._navigateToItem(firstChild, false);
                }
              }

              if (ret) return;
            } else if (!child) {
              var _firstChild = this.firstEnabledChild;

              if (_firstChild) {
                this._navigateToItem(_firstChild, this.isRoot);

                if (_firstChild.hasSubMenu() && _firstChild.submenu.isVisible) {
                  var firstSubMenuChild = _firstChild.submenu.firstEnabledChild;
                  if (firstSubMenuChild) this._navigateToItem(firstSubMenuChild, false);
                }

                return;
              }
            }
          } else if (key === ARROW_BACK) {
            if (!this.isRoot) {
              this.deactivate();
            } else {
              if (child && child.submenu) {
                if (!child.submenu.isVisible) child.showSubMenu();
                var lastChild = child.submenu.lastEnabledChild;
                if (lastChild) this._navigateToItem(lastChild, false);
              } else if (!child) {
                var _firstChild2 = this.firstEnabledChild;

                if (_firstChild2) {
                  this._navigateToItem(_firstChild2, this.isRoot);

                  if (_firstChild2.hasSubMenu() && _firstChild2.submenu.isVisible) {
                    var lastSubMenuChild = _firstChild2.submenu.lastEnabledChild;
                    if (lastSubMenuChild) this._navigateToItem(lastSubMenuChild, false);
                  }
                }
              }

              return;
            }
          }
        } else if (key === 'Enter') {
          if (this.activeChild) {
            if (this.activeChild.hasSubMenu()) {
              if (!this.activeChild.submenu.isVisible) {
                this.activeChild.showSubMenu();
                if (this.activeChild.submenu.firstChild) this.activeChild.submenu.firstChild.activate();
              }
            } else {
              this.activeChild.select();
            }
          } else {
            this.firstChild.activate();

            if (this.firstChild.hasSubMenu() && this.firstChild.submenu.firstChild) {
              this.firstChild.submenu.firstChild.activate(false);
            }
          }

          return;
        } else if (!arrowKeyPressed) {
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = this.children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _child = _step6.value;

              if (_child.targetKey === key) {
                if (_child.hasSubMenu()) {
                  if (!_child.isActive) {
                    _child.activate();
                  } else if (!_child.submenu.isVisible) {
                    _child.showSubMenu();
                  }
                } else {
                  _child.select();
                }

                break;
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

          return;
        }

        if (this.parentMenu) {
          this.parentMenu.publish('menu.keypress', topic);
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
/**
 * A component for rendering nestable list of selectable items.
 */

var Menu =
/*#__PURE__*/
function (_AbstractMenu) {
  _inherits(Menu, _AbstractMenu);

  /**
   *
   * @param target {String|HTMLElement}
   * @param closeOnBlur {Boolean|Number}
   * @param timeout {Boolean|Number}
   * @param autoActivate {Boolean|Number}
   * @param openOnHover {Boolean|Number}
   * @param toggle {"on"|"off"|"both"|"none"}
   * @param closeOnSelect {Boolean}
   * @param delay {Boolean|Number}
   * @param id {String}
   * @param classes {String}
   * @param children {Array}
   * @param visible
   * @param filter
   * @param context
   */
  function Menu() {
    var _this5;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$target = _ref.target,
        target = _ref$target === void 0 ? null : _ref$target,
        _ref$closeOnBlur = _ref.closeOnBlur,
        closeOnBlur = _ref$closeOnBlur === void 0 ? false : _ref$closeOnBlur,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? false : _ref$timeout,
        _ref$autoActivate = _ref.autoActivate,
        autoActivate = _ref$autoActivate === void 0 ? true : _ref$autoActivate,
        _ref$openOnHover = _ref.openOnHover,
        openOnHover = _ref$openOnHover === void 0 ? true : _ref$openOnHover,
        _ref$toggle = _ref.toggle,
        toggle = _ref$toggle === void 0 ? "on" : _ref$toggle,
        _ref$closeOnSelect = _ref.closeOnSelect,
        closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
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
        _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? false : _ref$filter,
        context = _objectWithoutProperties(_ref, ["target", "closeOnBlur", "timeout", "autoActivate", "openOnHover", "toggle", "closeOnSelect", "delay", "id", "classes", "children", "visible", "filter"]);

    _classCallCheck(this, Menu);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Menu).call(this));
    _this5.events = null;
    _this5.MenuItemClass = _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"];
    _this5.SubMenuClass = Menu;
    _this5.closeOnBlur = closeOnBlur;
    _this5.timeout = timeout;
    _this5.autoActivate = autoActivate;
    _this5.openOnHover = openOnHover;
    _this5.toggle = toggle;
    _this5.closeOnSelect = closeOnSelect;
    _this5.delay = delay;
    _this5.direction = 'vertical';

    if (target) {
      _this5.element = target;
    } else {
      _this5.element = _this5.render(context);
    }

    _this5.isVisible = visible;
    if (classes) Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(_this5.element, classes);
    if (id) _this5.element.id = id;

    _this5.registerTopics();

    _this5.parseDOM();

    _this5.init(); // this.element.tabIndex = -1;


    if (children) {
      _this5.createItems(children);
    }

    return _this5;
  }
  /**
   * Renders the domElement of the widget.
   *
   * @param arrow
   * @returns {HTMLElement|Element}
   */


  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$arrow = _ref2.arrow,
          arrow = _ref2$arrow === void 0 ? false : _ref2$arrow;

      var html = "\n            <div class=\"menu\">\n                ".concat(arrow ? "<div class=\"menu__arrow\"></div>" : "", "\n                <div class=\"menu__body\"></div>\n            </div>\n        ");
      var fragment = Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["parseHTML"])(html);
      return fragment.children[0];
    }
  }]);

  return Menu;
}(AbstractMenu);


autoloader__WEBPACK_IMPORTED_MODULE_4__["default"].register('menu', function (element) {
  return Menu.FromHTML(element);
});

/***/ }),

/***/ "./src/menu/MenuBar.js":
/*!*****************************!*\
  !*** ./src/menu/MenuBar.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuBar; });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
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
    _this.positioner = _positioners__WEBPACK_IMPORTED_MODULE_2__["DROPDOWN"];
    _this.direction = 'horizontal';
    _this.enableKeyboardNavigation = true;

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

/***/ "./src/menu/MenuItem.js":
/*!******************************!*\
  !*** ./src/menu/MenuItem.js ***!
  \******************************/
/*! exports provided: ITEM_ATTRIBUTES, AbstractMenuItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEM_ATTRIBUTES", function() { return ITEM_ATTRIBUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractMenuItem", function() { return AbstractMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuItem; });
/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuNode */ "./src/menu/MenuNode.js");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decorators */ "./src/menu/decorators.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var _core_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utility */ "./src/core/utility.js");
/* harmony import */ var core_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/attributes */ "./src/core/attributes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







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
  openOnHover: timeAttribute,
  closeOnSelect: boolAttribute,
  delay: timeAttribute,
  positioner: stringAttribute,
  toggle: stringAttribute
};
/**
 * @abstract
 */

var AbstractMenuItem = _decorate(null, function (_initialize, _MenuNode) {
  var AbstractMenuItem =
  /*#__PURE__*/
  function (_MenuNode2) {
    _inherits(AbstractMenuItem, _MenuNode2);

    function AbstractMenuItem() {
      var _this;

      _classCallCheck(this, AbstractMenuItem);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractMenuItem).call(this));

      _initialize(_assertThisInitialized(_this));

      _this.menuNodeType = "menuitem";
      /**
       * During keyboard navigation, specifies the key that the user the click to target the menuitem directly.
       * @type {null|String}
       */

      _this.targetKey = null;
      /**
       * Controls how click behavior works.  on is for toggle on only when clicked, off is for toggle off only, both
       * will toggle both on and off and none will cause the item to not be toggleable.
       * @type {string}
       */

      _this.toggle = "both";
      /**
       * Controls if the menuitem will activating when the user mouses over it when it's parent is unactive or if the menuitem has no parent.
       * When the parent is active, openOnHover is used instead.
       * @type {string|Number|Boolean}
       */

      _this.autoActivate = false;
      /**
       * Overrides autoActivate when the items parent menu is active.  If null autoActivate is still used.
       * See autoActivate for more details.
       * @type {string}
       */

      _this.openOnHover = false;
      /**
       * Adds adds a delay between a menuitem activating and the menuitem displaying it's submenu.
       * @type {string|Number|Boolean}
       */

      _this.delay = false;
      /**
       * If true the item will close when a descendent menuitem is selected.
       * @type {boolean}
       */

      _this.closeOnSelect = false;
      /**
       * If true the menuitem will close when the user clicks the page outside of the item.
       * @type {boolean}
       */

      _this.closeOnBlur = false;
      /**
       * Controls the amount of time after the user leaves the menuitem that it will remain open.  Time is given in milliseconds.
       * Negative values or false will cause the menuitem to never timeout.  True is interpreted as 0 milliseconds.
       * @type {boolean|Number}
       */

      _this.timeout = false;
      /**
       * A function that is used to position the menuitem's submenu.
       * @type {null|Function}
       */

      _this.positioner = "inherit";
      /**
       * If true the menuitem will attempt to deactivate any descending menu-items when the user hover over the direct item.
       * @type {boolean}
       */

      _this.clearSubItemsOnHover = true;
      /**
       * If true the menuitem will deactivate when the user leaves it if it doesn't have a submenu that it needs to keep open.
       * @type {boolean}
       */

      _this.autoDeactivateItems = true;
      return _this;
    }

    return AbstractMenuItem;
  }(_MenuNode);

  return {
    F: AbstractMenuItem,
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
      key: "positioner",
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
          this.on('menuitem.selected', function (event) {
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
      kind: "method",
      key: "activate",
      value: function activate() {
        var _this3 = this;

        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (this.isActive) return;
        this.isActive = true;
        this.clearTimer('activateItem');

        if (this.submenu) {
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

        this.dispatchTopic('menuitem.activate', this);
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

    }, {
      kind: "method",
      key: "showSubMenu",
      value: function showSubMenu() {
        var submenu = this.submenu;

        if (submenu) {
          submenu.show();
          var positioner = this.positioner;

          if (positioner) {
            positioner.call(submenu, this, submenu);
          }
        }
      }
    }, {
      kind: "method",
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
      kind: "method",
      key: "attachSubMenu",
      value: function attachSubMenu(submenu) {
        if (this.submenu) {
          if (this.submenu === submenu) return;
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
      }
    }, {
      kind: "method",
      key: "setParent",
      value: function setParent(parent) {
        this._parent = parent;

        parent._children.push(this);
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
          this.parent.publish('click-item', {
            sender: this,
            event: event
          });
        }

        if (!isDisabled) {
          if (this.isActive && this.hasSubMenu() && !this.isSubMenuVisible()) {
            this.showSubMenu();
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
        var _this4 = this;

        this.clearTimer('timeout');

        if (event.target === this) {
          // When the mouse moves on an item clear any active items in it's submenu.
          if (this.submenu && this.clearSubItemsOnHover && this.submenu.clearActiveChild) {
            this.submenu.clearActiveChild();
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
      kind: "method",
      key: "onMouseOut",
      value: function onMouseOut(event) {
        var _this5 = this;

        if (this.element.contains(event.originalEvent.relatedTarget)) return;
        this.clearTimer('activateItem');

        if (this.parent) {
          this.parent.publish('mouse-leave-item', this, event);
        }

        if (this.autoDeactivateItems && event.target === this && (!this.hasSubMenu() || !this.submenu.isVisible) && this.isActive) {
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
      kind: "get",
      key: "button",
      value: function button() {
        if (!this._button) {
          this._button = Array.prototype.slice.call(this.element.children).find(function (node) {
            return node.matches("button, a, .btn, [data-role='button']");
          });
        }

        return this._button;
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
    }, {
      kind: "get",
      key: "text",
      value: function text() {
        return this.button.innerText;
      }
    }, {
      kind: "set",
      key: "text",
      value: function text(value) {
        this.button.innerText = value;
      }
    }]
  };
}, _MenuNode__WEBPACK_IMPORTED_MODULE_0__["default"]);

var MenuItem =
/*#__PURE__*/
function (_AbstractMenuItem) {
  _inherits(MenuItem, _AbstractMenuItem);

  function MenuItem() {
    var _this6;

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
        _ref$positioner = _ref.positioner,
        positioner = _ref$positioner === void 0 ? "inherit" : _ref$positioner,
        context = _objectWithoutProperties(_ref, ["target", "text", "action", "href", "toggle", "autoActivate", "openOnHover", "delay", "closeOnSelect", "closeOnBlur", "classes", "timeout", "nodeName", "positioner"]);

    _classCallCheck(this, MenuItem);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(MenuItem).call(this));

    if (target) {
      _this6.element = target;
    } else {
      _this6.element = _this6.render(_objectSpread({
        text: text,
        nodeName: nodeName,
        href: href
      }, context));
    }

    if (classes) {
      _this6.addClass(classes);
    }

    if (action) _this6.addAction(action);
    _this6.toggle = toggle;
    _this6.autoActivate = autoActivate;
    _this6.openOnHover = openOnHover;
    _this6.delay = delay;
    _this6.closeOnSelect = closeOnSelect;
    _this6.closeOnBlur = closeOnBlur;
    _this6.timeout = timeout;
    _this6.positioner = positioner;
    _this6.clearSubItemsOnHover = true;
    _this6.autoDeactivateItems = true;
    _this6.MenuItemClass = MenuItem;
    _this6.SubMenuClass = _Menu__WEBPACK_IMPORTED_MODULE_2__["default"];
    _this6.element.tabIndex = -1;

    _this6.registerTopics();

    _this6.parseDOM();

    return _this6;
  }
  /**
   * Renders the domElement.
   *
   * @param text {String}
   * @param nodeName
   * @param href
   * @returns {HTMLElement|Element}
   */


  _createClass(MenuItem, [{
    key: "render",
    value: function render() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          text = _ref2.text,
          _ref2$nodeName = _ref2.nodeName,
          nodeName = _ref2$nodeName === void 0 ? "div" : _ref2$nodeName,
          _ref2$href = _ref2.href,
          href = _ref2$href === void 0 ? null : _ref2$href;

      var html = "\n            <".concat(nodeName, " class=\"menuitem\">\n                <a class=\"menuitem__button\" ").concat(href ? "href=\"".concat(href, "\"") : "", ">").concat(text, "</a>\n            </").concat(nodeName, ">\n        ");
      var fragment = Object(_core_utility__WEBPACK_IMPORTED_MODULE_3__["parseHTML"])(html);
      return fragment.children[0];
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
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utility */ "./src/menu/utility.js");
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
    _this._eventListeners = {};
    _this._timers = {};
    /**
     * @type {undefined|null|HTMLElement}
     * @private
     */

    _this._element = undefined;
    _this.menuNodeType = "node";
    _this.nodeType = null;
    _this.isController = false;
    _this.SubMenuClass = null;
    _this.MenuItemClass = null;
    _this.enableKeyboardNavigation = false;
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
    key: "registerTopics",
    value: function registerTopics() {
      var _this3 = this;

      if (this._isTopicInit) return;
      this._isTopicInit = true;
      this.on('event.keydown', function (topic) {
        return _this3._rootKeyDown(topic);
      });
    }
    /**
     * Unbinds all event listeners.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // if(this.events && this.hasElement()) {
      //     this.element.removeEventListener('click', this.boundEvents.onClick);
      //     this.element.removeEventListener('onMouseOut', this.boundEvents.onMouseOut);
      //     this.element.removeEventListener('onMouseOver', this.boundEvents.onMouseOver);
      // }
      this.clearAllRegisteredEvents();
      this.isController = false; // this.boundEvents = null;

      this.element = null;
      this.publish('destroy', this);
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
    // Tree transversal and manipulation functions.

    /**
     * Reference to the nodes parent or null if it is the root node of the tree.
     *
     * @returns {null|MenuNode}
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
        node = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getClosestMenuNodeByElement"])(node);
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
     * it's not guaranteed that children are descendants of their parent menu nodes.  Probably a very costly method
     * should be overused.
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
    } //------------------------------------------------------------------------------------------------------------------
    // Widget functions

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
    value: function addClass(classes) {
      return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["addClasses"])(this.element, classes);
    }
  }, {
    key: "removeClass",
    value: function removeClass(classes) {
      return Object(core_utility__WEBPACK_IMPORTED_MODULE_2__["removeClasses"])(this.element, classes);
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
          fn.call(_this4, timer);
        }, time, timer);
        timer.type = 'interval';

        timer.cancel = function () {
          if (_this4._timers[name] === timer) {
            clearInterval(id);
            delete _this4._timers[name];
            timer.status = 'canceled';
          }
        };
      } else {
        var _id = timer.id = setTimeout(function (timer) {
          delete _this4._timers[name];
          timer.status = 'complete';
          fn.call(_this4, timer);
        }, time, timer);

        timer.type = 'timeout';

        timer.cancel = function () {
          if (_this4._timers[name] === timer) {
            clearTimeout(_id);
            delete _this4._timers[name];
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

      this._events = {};
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
    }
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
      if (this.enableKeyboardNavigation && this.isRoot) {
        var event = topic.originalEvent;

        if (event.key === "Escape") {
          this.deactivate();
          document.activeElement.blur();
          return;
        }

        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(event.key) !== -1) {
          event.preventDefault();
        }

        var activeItem = this.activeItem,

        /**
         * @type AbstractMenu
         */
        targetMenu = activeItem ? activeItem.parentMenu : this;
        topic.activeItem = activeItem;
        topic.targetMenu = targetMenu;

        if (targetMenu) {
          targetMenu.publish('menu.keypress', topic);
        }
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

      if (this._children.length) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this._children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var child = _step7.value;
            child.invalidateTree();
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
      }

      var walk = function walk(node) {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = node.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _child = _step8.value;
            var role = _child.dataset.role;

            if (Object(_utility__WEBPACK_IMPORTED_MODULE_3__["hasMenuInstance"])(_child)) {
              var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_3__["getMenuInstance"])(_child);
              instance.setParent(_this5);
            } else {
              var hasMenuItemAttribute = _child.hasAttribute('data-menuitem'),
                  hasMenuAttribute = _child.hasAttribute('data-menu');

              if (hasMenuAttribute && hasMenuItemAttribute) {
                throw new Error("Element cannot be both a menuitem and a menu.");
              } else if (hasMenuAttribute) {
                var menu = _this5.SubMenuClass.FromHTML(_child);

                menu.setParent(_this5);
              } else if (hasMenuItemAttribute) {
                var item = _this5.MenuItemClass.FromHTML(_child);

                item.setParent(_this5);
              } else {
                walk(_child);
              }
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
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var child = _step9.value;
          child.invalidateTree();
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

      this._children = [];
    } //------------------------------------------------------------------------------------------------------------------
    // Static functions

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
      var parent = this.parent; // noinspection JSUnresolvedVariable,JSUnresolvedFunction

      return parent ? parent.closest(function (node) {
        return node.isMenu();
      }) : null;
    }
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
  }, {
    key: "isRoot",
    get: function get() {
      return this.root === this;
    }
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
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = this.children[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var child = _step10.value;

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
        } else {
          this.element.classList.add('hidden');
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
        this.clearAllRegisteredEvents();
        Object(_utility__WEBPACK_IMPORTED_MODULE_3__["detachMenuInstance"])(this._element);
        this._element = undefined;
      }

      Object(_utility__WEBPACK_IMPORTED_MODULE_3__["attachMenuInstance"])(element, this);
      this._element = element;

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
      return new this(parameters);
    }
  }]);

  return MenuNode;
}(core_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/menu/Select2.js":
/*!*****************************!*\
  !*** ./src/menu/Select2.js ***!
  \*****************************/
/*! exports provided: SelectOption, FILTERS, SelectMenu, Select2, ComboBox, MultiSelect, MultiCombo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectOption", function() { return SelectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTERS", function() { return FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectMenu", function() { return SelectMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Select2", function() { return Select2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComboBox", function() { return ComboBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelect", function() { return MultiSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiCombo", function() { return MultiCombo; });
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony import */ var autoloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autoloader */ "./src/autoloader.js");
/* harmony import */ var _positioners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./positioners */ "./src/menu/positioners.js");
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utility */ "./src/menu/utility.js");
/* harmony import */ var core_utility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core/utility */ "./src/core/utility.js");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./decorators */ "./src/menu/decorators.js");
/* harmony import */ var core_attributes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core/attributes */ "./src/core/attributes.js");
/* harmony import */ var _forms___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../forms/ */ "./src/forms/index.js");
/* harmony import */ var _ui_ItemFilter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ui/ItemFilter */ "./src/ui/ItemFilter.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
        value = _ref.value,
        _ref$id = _ref.id,
        id = _ref$id === void 0 ? null : _ref$id,
        _ref$classes = _ref.classes,
        classes = _ref$classes === void 0 ? null : _ref$classes;

    _classCallCheck(this, SelectOption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectOption).call(this));

    if (target) {
      _this.element = target;
    } else {
      _this.element = _this.render({
        text: text,
        value: value
      });
    }

    _this.textNode = _this.element.querySelector('[data-text], button, a');
    if (!_this.textNode) _this.textNode = _this.element;

    _this.element.setAttribute('aria-role', 'option');

    if (classes) {
      _this.addClass(classes);
    }

    if (id) {
      _this.element.id = id;
    }

    _this.toggle = "both";
    _this.autoActivate = true;
    _this.openOnHover = true;
    _this.delay = 0;
    _this.closeOnSelect = false;
    _this.closeOnBlur = false;
    _this.timeout = false;
    _this.clearSubItemsOnHover = true;
    _this.MenuItemClass = SelectOption;
    _this.SubMenuClass = _Menu__WEBPACK_IMPORTED_MODULE_1__["default"];
    _this.autoDeactivateItems = "auto";

    _this.element.classList.add("option");

    _this.registerTopics();

    _this.parseDOM();

    return _this;
  }
  /**
   * Creates the dom elements for the SelectOption.
   * @param text
   * @param value
   * @returns {Element}
   */


  _createClass(SelectOption, [{
    key: "render",
    value: function render(_ref2) {
      var text = _ref2.text,
          value = _ref2.value;
      var html = "<li data-role=\"menuitem\" class=\"menuitem\" data-value=\"".concat(value, "\"><a>").concat(text, "</a></li>"),
          fragment = Object(core_utility__WEBPACK_IMPORTED_MODULE_5__["parseHTML"])(html);
      return fragment.children[0];
    }
    /**
     * Handles mousedown events.
     *
     * @param event
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var isDisabled = this.getDisabled();

      if (isDisabled) {
        event.preventDefault();
        return;
      }

      if (event.target !== this) return;
      var parent = this.parent;

      if (!this.isSelected) {
        this.select({
          event: event
        });
      } else if (this.isSelected && parent.multiSelect) {
        this.deselect({
          event: event
        });
      }
    }
    /**
     * Selects the options and publishes a [option.select] topic.
     *
     * @param topicData
     */

  }, {
    key: "select",
    value: function select() {
      var topicData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _get(_getPrototypeOf(SelectOption.prototype), "select", this).call(this);

      if (this.isSelected) return;

      if (!this.multiSelect) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.element.querySelectorAll('.selected')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;
            var instance = Object(_utility__WEBPACK_IMPORTED_MODULE_4__["getMenuInstance"])(node);

            if (instance && instance !== this) {
              instance.deselect();
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
    key: "deselect",
    value: function deselect() {
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
     * Returns true if the option is selected.
     * @returns {boolean}
     */

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
      return this.textNode.innerText.trim();
    }
    /**
     * Sets the options inner html.
     * @param value
     */
    ,
    set: function set(value) {
      this.textNode.innerText = (value + "").trim();
    }
    /**
     * Returns the options parent select menu or null.
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
    key: "autoDeactivateItems",
    get: function get() {
      if (this._props.autoDeactivateItems === 'auto') {
        var parent = this.parentSelect;
        return !!(parent && parent.multiSelect);
      } else {
        return this._props.autoDeactivateItems;
      }
    },
    set: function set(value) {
      this._props.autoDeactivateItems = value;
    }
  }]);

  return SelectOption;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["AbstractMenuItem"]);
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

var SelectMenu = _decorate(null, function (_initialize, _AbstractMenu) {
  var SelectMenu =
  /*#__PURE__*/
  function (_AbstractMenu2) {
    _inherits(SelectMenu, _AbstractMenu2);

    function SelectMenu() {
      var _this2;

      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          target = _ref3.target,
          _ref3$shiftSelect = _ref3.shiftSelect,
          shiftSelect = _ref3$shiftSelect === void 0 ? true : _ref3$shiftSelect,
          _ref3$filter = _ref3.filter,
          filter = _ref3$filter === void 0 ? null : _ref3$filter,
          _ref3$placeholder = _ref3.placeholder,
          placeholder = _ref3$placeholder === void 0 ? "No Items Found" : _ref3$placeholder,
          _ref3$filterDelay = _ref3.filterDelay,
          filterDelay = _ref3$filterDelay === void 0 ? 500 : _ref3$filterDelay,
          _ref3$filterPlacehold = _ref3.filterPlaceholderText,
          filterPlaceholderText = _ref3$filterPlacehold === void 0 ? "Search" : _ref3$filterPlacehold,
          context = _objectWithoutProperties(_ref3, ["target", "shiftSelect", "filter", "placeholder", "filterDelay", "filterPlaceholderText"]);

      _classCallCheck(this, SelectMenu);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SelectMenu).call(this));

      _initialize(_assertThisInitialized(_this2));

      _this2.MenuItemClass = SelectOption;

      if (target) {
        _this2.element = target;
      } else {
        _this2.element = _this2.render(context);
      }

      _this2.closeOnBlur = false;
      _this2.timeout = false;
      _this2.autoActivate = true;
      _this2.openOnHover = false;
      _this2.multiSelect = "inherit";
      _this2.closeOnSelect = false;
      _this2.delay = 0;
      _this2.positioner = "inherit";
      _this2.shiftSelect = shiftSelect;

      _this2.element.classList.add('select-menu');

      _this2.registerTopics();

      _this2.parseDOM();

      _this2.init();

      if (filter) {
        _this2.filterDelay = filterDelay;
        _this2.placeholder = placeholder;

        _this2._initFilter(filter, filterPlaceholderText);
      }

      return _this2;
    }

    return SelectMenu;
  }(_AbstractMenu);

  return {
    F: SelectMenu,
    d: [{
      kind: "field",
      decorators: [_decorators__WEBPACK_IMPORTED_MODULE_6__["inherit"]],
      key: "multiSelect",
      value: void 0
    }, {
      kind: "method",
      key: "show",
      value: function show() {
        if (!this.isVisible) {
          this.clearFilter();

          _get(_getPrototypeOf(SelectMenu.prototype), "show", this).call(this);
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref4$arrow = _ref4.arrow,
            arrow = _ref4$arrow === void 0 ? false : _ref4$arrow;

        var html = "\n            <div class=\"select-menu\">\n                <div class=\"select-menu__header\"></div>\n                <section class=\"select-menu__body\"></section>\n                <div class=\"select-menu__footer\"></div>\n            </div>\n        ";
        var fragment = Object(core_utility__WEBPACK_IMPORTED_MODULE_5__["parseHTML"])(html);
        return fragment.children[0];
      }
    }, {
      kind: "method",
      key: "registerTopics",
      value: function registerTopics() {
        var _this3 = this;

        _get(_getPrototypeOf(SelectMenu.prototype), "registerTopics", this).call(this);

        this.on('menu.show', function (menu) {
          if (!_this3.multiSelect) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = menu.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var child = _step2.value;

                if (child.element.classList.contains('selected') && !child.isActive) {
                  child.activate();
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
        });
        this.on('option.select', function (topic) {
          if (!_this3.multiSelect) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = _this3.selection[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;

                if (item !== topic.target) {
                  item.deselect();
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
          } // if(this.closeOnSelect && this.isActive) {
          //     this.deactivate();
          // }

        });
      }
    }, {
      kind: "method",
      key: "isSelectMenu",
      value: function isSelectMenu() {
        return true;
      }
    }, {
      kind: "get",
      key: "selection",
      value: function selection() {
        var r = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            if (item.isSelected) {
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
      kind: "get",
      key: "selectedOptions",
      value: function selectedOptions() {
        return this.selection;
      }
    }, {
      kind: "get",
      key: "options",
      value: function options() {
        return this.children;
      }
    }, {
      kind: "method",
      key: "onClick",
      value: function onClick(topic) {
        var event = topic.originalEvent,
            target = topic.target,
            isDisabled = target.getDisabled();

        _get(_getPrototypeOf(SelectMenu.prototype), "onClick", this).call(this, topic);

        if (!isDisabled && target.parent === this && target.isMenuItem && target.isMenuItem() && this.multiSelect && this.shiftSelect) {
          if (event.shiftKey) {
            var lastTarget = this.lastTarget || target,
                children = this.children,
                lastIndex = children.indexOf(lastTarget),
                targetIndex = children.indexOf(target),
                start = Math.min(lastIndex, targetIndex),
                end = Math.max(lastIndex, targetIndex);

            for (var i = 0; i < children.length; i++) {
              var item = children[i];

              if (i >= start && i <= end) {
                if (!item.isSelected) {
                  item.select();
                }
              } else if (item.isSelected) {
                item.deselect();
              }
            }
          } else {
            this.lastTarget = target;
          }
        }
      }
    }, {
      kind: "method",
      key: "filter",
      value: function filter(fn) {
        if (fn === null) {
          return this.clearFilter();
        }

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.options[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var option = _step5.value;

            if (fn(option)) {
              option.classList.remove('filtered');
            } else {
              option.classList.add('filtered');
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

        if (this.getFilteredItems().length < this.options.length) {
          if (this._placeholder) {
            this._placeholder.parentElement.removeChild(this._placeholder);

            this._placeholder = null;
          }
        } else if (this.placeholder) {
          var placeholder = document.createElement('div');
          placeholder.innerHTML = this.placeholder;
          var container = this.element.querySelector('.select-menu__body') || this.element;
          container.appendChild(placeholder);
          this._placeholder = placeholder;
        }
      }
    }, {
      kind: "method",
      key: "clearFilter",
      value: function clearFilter() {
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.options[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var option = _step6.value;
            option.classList.remove('filtered');
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

        if (this._placeholder && this.getFilteredItems().length < this.options.length) {
          this._placeholder.parentElement.removeChild(this._placeholder);

          this._placeholder = null;
        }

        if (this.filterInput) {
          this.filterInput.value = "";
        }
      }
    }, {
      kind: "method",
      key: "getFilteredItems",
      value: function getFilteredItems() {
        var r = [];
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this.options[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var option = _step7.value;

            if (option.classList.contains('filtered')) {
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
      kind: "method",
      key: "_initFilter",
      value: function _initFilter(fn, filterPlaceholderText) {
        var _this4 = this;

        // let filterInput = this.element.querySelectorAll('[data-filter]');
        var filterInput = Array.prototype.slice.call(document.querySelectorAll('[data-filter]')).find(function (node) {
          return Object(_utility__WEBPACK_IMPORTED_MODULE_4__["getClosestMenuByElement"])(node) === _this4;
        });

        if (!filterInput) {
          this.filterInput = document.createElement('input');
          this.filterInput.type = 'text';
          this.filterInput.placeholder = filterPlaceholderText || "";
          var filterContainer = document.createElement('div');
          filterContainer.className = "select-menu__filter";
          filterContainer.appendChild(this.filterInput);
          var container = this.element.querySelector(".select-menu__header") || this.element;
          container.insertBefore(filterContainer, container.firstChild);
        } else {
          this.filterInput = filterInput;
        }

        var _timer = null;
        this.filterInput.addEventListener('keydown', function (event) {
          if (_timer) {
            clearTimeout(_timer);
            _timer = null;
          }

          _timer = setTimeout(function () {
            _timer = null;

            _this4.filter(fn(_this4.filterInput.value));
          }, _this4.filterDelay);
        });
      }
    }]
  };
}, _Menu__WEBPACK_IMPORTED_MODULE_1__["AbstractMenu"]);
/**
 * A component that can be used as an alternative to the built in <select> element.
 * @implements FormWidgetBase
 */

var Select2 =
/*#__PURE__*/
function (_AbstractMenuItem2) {
  _inherits(Select2, _AbstractMenuItem2);

  function Select2() {
    var _this5;

    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        target = _ref5.target,
        _ref5$multiSelect = _ref5.multiSelect,
        multiSelect = _ref5$multiSelect === void 0 ? false : _ref5$multiSelect,
        _ref5$timeout = _ref5.timeout,
        timeout = _ref5$timeout === void 0 ? false : _ref5$timeout,
        _ref5$id = _ref5.id,
        id = _ref5$id === void 0 ? null : _ref5$id,
        _ref5$classes = _ref5.classes,
        classes = _ref5$classes === void 0 ? null : _ref5$classes,
        _ref5$widget = _ref5.widget,
        widget = _ref5$widget === void 0 ? null : _ref5$widget,
        _ref5$filter = _ref5.filter,
        filter = _ref5$filter === void 0 ? false : _ref5$filter,
        _ref5$placeholder = _ref5.placeholder,
        placeholder = _ref5$placeholder === void 0 ? "No Items Found" : _ref5$placeholder;

    _classCallCheck(this, Select2);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Select2).call(this));

    if (target) {
      _this5.element = target;
    } else {
      _this5.element = _this5.render();
    }

    if (classes) {
      _this5.addClass(classes);
    }

    if (id) {
      _this5.element.id = id;
    }

    _this5.toggle = "both";
    _this5.autoActivate = false;
    _this5.openOnHover = false;
    _this5.delay = false;
    _this5.closeOnSelect = "auto";
    _this5.closeOnBlur = true;
    _this5.timeout = timeout;
    _this5.multiSelect = multiSelect;
    _this5.MenuItemClass = SelectOption;
    _this5.SubMenuClass = SelectMenu;
    _this5.positioner = _positioners__WEBPACK_IMPORTED_MODULE_3__["DROPDOWN"];
    _this5.clearSubItemsOnHover = false;
    _this5.labelToItemMap = new WeakMap();
    _this5.itemToLabelMap = new WeakMap();

    _this5.element.classList.add('select');

    _this5.element.tabIndex = 0;

    _this5.registerTopics();

    _this5.parseDOM();

    if (widget) {
      _this5.widget = widget;
    } else {
      _this5.widget = new _forms___WEBPACK_IMPORTED_MODULE_8__["HiddenInputWidget"]();

      _this5.widget.appendTo(_this5.element);
    }

    if (!_this5.submenu) {
      var submenu = new SelectMenu();
      submenu.isVisible = false;

      _this5.attachSubMenu(submenu);
    }

    _this5.init();

    if (filter) {
      if (_this5.multiSelect) {
        _this5.filter = new _ui_ItemFilter__WEBPACK_IMPORTED_MODULE_9__["default"]({
          items: function items() {
            var r = [];
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = _this5.submenu.children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var child = _step8.value;
                r.push(child.element);
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
          },
          tabindex: -1
        });
        var li = document.createElement('li');
        li.className = "select-filter-container";

        _this5.filter.appendTo(li);

        _this5.filter.wrapper = li;

        _this5.button.appendChild(li);
      } else {
        _this5.filter = new _ui_ItemFilter__WEBPACK_IMPORTED_MODULE_9__["default"]({
          items: function items() {
            var r = [];
            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
              for (var _iterator9 = _this5.submenu.children[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var child = _step9.value;
                r.push(child.element);
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

            return r;
          },
          placeholder: "Filter"
        });

        _this5.filter.appendTo(_this5.submenu.element.querySelector('.select-menu__header'));

        _this5.submenu.element.classList.add('has-filter');
      }

      _this5.filter.on('filter-change', function (topic) {
        if (topic.allItemsFiltered) {
          _this5.submenu.element.classList.add('all-items-filtered');
        } else {
          _this5.submenu.element.classList.remove('all-items-filtered');
        }
      });

      if (placeholder) {
        var placeholderNode = document.createElement('li');
        placeholderNode.className = "placeholder";
        placeholderNode.innerHTML = placeholder;

        var body = _this5.submenu.getMenuBody();

        body = body[body.length - 1];
        body.appendChild(placeholderNode);
      }

      _this5.addEventListener('keydown', function (event) {
        if (_this5.filter && event.key === 'Backspace') {
          if (_this5.filter.isFocused() && _this5.filter.input.value !== "") {
            return;
          }

          if (!_this5._isChoiceElement(document.activeElement)) {
            var choices = _this5.getLabels();

            if (choices.length) {
              choices[choices.length - 1].focus();
            }
          } else {
            _this5.labelToItemMap.get(document.activeElement).deselect();

            _this5.filter.focus();
          }
        }
      });

      _this5.filter.input.addEventListener('focus', function (event) {
        _this5.element.classList.add('select-highlight');
      });

      _this5.filter.input.addEventListener('blur', function (event) {
        if (!_this5.element.contains(event.relatedTarget)) {
          _this5.element.classList.remove('select-highlight');

          if (_this5.isActive) _this5.deactivate();
        }
      });
    }

    _this5.addEventListener('focus', function (event) {
      if (_this5.filter) {
        _this5.filter.focus();
      }

      _this5.element.classList.add('select-highlight');
    });

    _this5.addEventListener('blur', function (event) {
      if (!_this5.element.contains(event.relatedTarget)) {
        if (_this5.isActive) _this5.deactivate();

        _this5.element.classList.remove('select-highlight');
      }
    });

    return _this5;
  }

  _createClass(Select2, [{
    key: "activate",
    value: function activate() {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.isActive) {
        var r = _get(_getPrototypeOf(Select2.prototype), "activate", this).call(this);

        if (this.filter) {
          this.filter.clear();

          if (!this.multiSelect || !this.element.contains(document.activeElement) || !document.activeElement.classList.contains('choice')) {
            this.filter.focus();
          }
        }

        return r;
      }
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (this.isActive) {
        var r = _get(_getPrototypeOf(Select2.prototype), "deactivate", this).call(this);

        if (this.filter) {
          this.filter.clear();
          this.filter.blur();
        }

        return r;
      }
    }
  }, {
    key: "isSelect",
    value: function isSelect() {
      return true;
    }
  }, {
    key: "registerTopics",
    value: function registerTopics() {
      var _this6 = this;

      _get(_getPrototypeOf(Select2.prototype), "registerTopics", this).call(this);

      this.on('option.select', function () {
        _this6.renderLabels();

        if (_this6.closeOnSelect === true && _this6.isActive) {
          _this6.deactivate();
        }
      });
      this.on('option.deselect', function () {
        _this6.renderLabels();
      });
    }
  }, {
    key: "renderLabels",
    value: function renderLabels() {
      var output = this.button,
          fragment = document.createDocumentFragment();
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = this.options[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var item = _step10.value;

          if (item.isSelected) {
            var pill = this.itemToLabelMap.get(item);

            if (!pill) {
              pill = document.createElement('li');
              var exitButton = document.createElement('div'),
                  span = document.createElement('span');
              pill.className = "choice";
              exitButton.className = "exit-button";
              span.innerText = item.text;
              if (this.multiSelect) pill.tabIndex = -1;
              pill.appendChild(exitButton);
              pill.appendChild(span);
              this.itemToLabelMap.set(item, pill);
              this.labelToItemMap.set(pill, item);
              fragment.appendChild(pill);
            }
          } else {
            var _pill = this.itemToLabelMap.get(item);

            if (_pill) {
              _pill.parentElement.removeChild(_pill);

              this.itemToLabelMap["delete"](item);
              this.labelToItemMap["delete"](_pill);
            }
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

      if (this.filter && this.filter.wrapper && this.filter.wrapper.parentElement === output) {
        output.insertBefore(fragment, this.filter.wrapper);
      } else {
        output.appendChild(fragment);
      }

      if (this.widget) this.widget.setValue(this._getSelectedValues());
    }
  }, {
    key: "append",
    value: function append(option) {
      this.submenu.append(option);
    }
  }, {
    key: "_getSelectedValues",
    value: function _getSelectedValues() {
      var r = [];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = this.selection[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var item = _step11.value;
          r.push(item.value);
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

      if (this.multiSelect) {
        return r;
      } else {
        return r[0];
      }
    }
  }, {
    key: "_isChoiceElement",
    value: function _isChoiceElement(element) {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.options[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var option = _step12.value;

          if (this.itemToLabelMap.get(option) === element) {
            return true;
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

      return false;
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      return this.button.querySelectorAll('.choice');
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.widget.getValue();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {}
  }, {
    key: "getName",
    value: function getName() {
      return this.widget.getName();
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.widget.setName(name);
    }
  }, {
    key: "render",
    value: function render(context) {
      var html = "\n        <article class=\"dropdown select\">\n            <ul class=\"selection\"></ul>\n        </article>\n        ";
      var fragment = Object(core_utility__WEBPACK_IMPORTED_MODULE_5__["parseHTML"])(html);
      return fragment.children[0];
    }
  }, {
    key: "onClick",
    value: function onClick(topic) {
      var event = topic.originalEvent;

      if (topic.target === this && event.target.closest('.exit-button')) {
        var li = event.target.closest('li'),
            item = this.labelToItemMap.get(li);
        item.deselect();
      } else {
        if (this.filter) {
          var inFilter = this.filter.element.contains(event.target);

          if (!this.isActive && inFilter) {
            this.activate();
          } else if (this.submenu.element.contains(event.target)) {
            this.filter.focus();
          } else if (!inFilter) {
            _get(_getPrototypeOf(Select2.prototype), "onClick", this).call(this, topic);
          }
        } else {
          _get(_getPrototypeOf(Select2.prototype), "onClick", this).call(this, topic);
        }
      }
    }
  }, {
    key: "button",
    get: function get() {
      return Array.prototype.find.call(this.element.children, function (node) {
        return node.matches('.selection');
      });
    }
  }, {
    key: "selection",
    get: function get() {
      return this.submenu.selection;
    }
  }, {
    key: "options",
    get: function get() {
      return this.submenu.children;
    }
  }, {
    key: "multiSelect",
    get: function get() {
      return this._props.multiSelect;
    },
    set: function set(value) {
      value = !!value;

      if (value !== this.multiSelect) {
        this._props.multiSelect = value;

        if (value) {
          this.element.classList.add('multiple');
        } else {
          this.element.classList.remove('multiple');
        }
      }
    }
  }, {
    key: "closeOnSelect",
    get: function get() {
      if (this._props.closeOnSelect === "auto") {
        return !this.multiSelect;
      } else {
        return this._props.closeOnSelect;
      }
    },
    set: function set(value) {
      this._props.closeOnSelect = value;
    }
  }], [{
    key: "FromHTML",
    value: function FromHTML(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      if (element.nodeName === "SELECT") {
        // noinspection JSUnresolvedVariable
        var select = new Select2({
          multiSelect: element.multiple,
          widget: new _forms___WEBPACK_IMPORTED_MODULE_8__["SelectInputWidget"](element, null, null, true),
          filter: element.dataset.filter ? element.dataset.filter.toLowerCase().trim() === 'true' : false
        });
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {
          for (var _iterator13 = element.querySelectorAll('option')[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var option = _step13.value;
            var item = new SelectOption({
              text: option.innerText.trim(),
              value: option.value
            });
            select.append(item);

            if (option.selected) {
              item.select();
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

        element.replaceWith(select.element);
        select.element.appendChild(select.widget.element);
        return select;
      } else {
        return _get(_getPrototypeOf(Select2), "FromHTML", this).call(this, element);
      }
    }
  }]);

  return Select2;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["AbstractMenuItem"]);

_defineProperty(Select2, "__attributes__", _objectSpread({
  multiSelect: new core_attributes__WEBPACK_IMPORTED_MODULE_7__["default"](core_utility__WEBPACK_IMPORTED_MODULE_5__["parseBoolean"], core_attributes__WEBPACK_IMPORTED_MODULE_7__["DROP"], core_attributes__WEBPACK_IMPORTED_MODULE_7__["TRUE"])
}, _MenuItem__WEBPACK_IMPORTED_MODULE_0__["AbstractMenuItem"].__attributes__));

var ComboBox =
/*#__PURE__*/
function (_AbstractMenuItem3) {
  _inherits(ComboBox, _AbstractMenuItem3);

  function ComboBox(_ref6) {
    var _this7;

    var _ref6$target = _ref6.target,
        target = _ref6$target === void 0 ? null : _ref6$target,
        _ref6$timeout = _ref6.timeout,
        timeout = _ref6$timeout === void 0 ? false : _ref6$timeout,
        _ref6$submenu = _ref6.submenu,
        submenu = _ref6$submenu === void 0 ? null : _ref6$submenu;

    _classCallCheck(this, ComboBox);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(ComboBox).call(this));

    if (target) {
      _this7.element = target;

      if (_this7.element.nodeName === 'INPUT') {
        _this7.input = _this7.element;
      } else {
        _this7.input = _this7.element.querySelector('input');
      }
    } else {
      var _this7$render = _this7.render(),
          element = _this7$render.element,
          input = _this7$render.input;

      _this7.element = element;
      _this7.input = input;
    }

    _this7.toggle = "both";
    _this7.autoActivate = false;
    _this7.openOnHover = false;
    _this7.delay = false;
    _this7.timeout = timeout;
    _this7.closeOnBlur = true;
    _this7.positioner = _positioners__WEBPACK_IMPORTED_MODULE_3__["DROPDOWN"];
    _this7.closeOnSelect = true;
    _this7.SubMenuClass = SelectMenu;
    _this7.element.tabIndex = 0;

    _this7.element.classList.add('advanced-select');

    _this7.registerTopics();

    _this7.parseDOM();

    if (submenu) {
      if (typeof submenu === 'string') {
        submenu = document.querySelector(submenu);
      }

      if (!submenu.isSelectMenu || !submenu.isSelectMenu()) {
        submenu = new _this7.SubMenuClass({
          target: submenu
        });

        _this7.attachSubMenu(submenu);
      }
    }

    _this7.init();

    return _this7;
  }

  _createClass(ComboBox, [{
    key: "registerTopics",
    value: function registerTopics() {
      var _this8 = this;

      _get(_getPrototypeOf(ComboBox.prototype), "registerTopics", this).call(this);

      this.on('option.select', function () {
        _this8._renderLabel();
      });
      this.on('option.deselect', function () {
        _this8._renderLabel();
      });
    }
  }, {
    key: "render",
    value: function render(context) {
      var element = "\n        <div class=\"advanced-select\">\n            <input type=\"text\" readonly=\"readonly\" />\n        </div>\n        ";
      element = Object(core_utility__WEBPACK_IMPORTED_MODULE_5__["parseHTML"])(element).children[0];
      return {
        element: element,
        input: element.querySelector('input')
      };
    } //------------------------------------------------------------------------------------------------------------------
    // Event & topic handling methods
    //------------------------------------------------------------------------------------------------------------------
    // Private methods

  }, {
    key: "_renderLabel",
    value: function _renderLabel() {
      var labels = this.selectedOptions.map(function (item) {
        return item.text;
      });
      this.value = labels.join(", ");
    } //------------------------------------------------------------------------------------------------------------------
    // Properties

  }, {
    key: "isSelect",
    //------------------------------------------------------------------------------------------------------------------
    // Interface methods
    value: function isSelect() {
      return true;
    } //------------------------------------------------------------------------------------------------------------------
    // Static methods

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
    key: "selectedIndex",
    get: function get() {},
    set: function set(index) {}
  }, {
    key: "name",
    get: function get() {
      return this.input.name;
    },
    set: function set(value) {
      this.input.name = value;
    }
  }, {
    key: "value",
    get: function get() {
      return this.input.value;
    },
    set: function set(value) {
      this.input.value = value;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.input.placeholder;
    },
    set: function set(value) {
      this.input.placeholder = value;
    }
  }], [{
    key: "FromHTML",
    value: function FromHTML(element) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }

      if (element.nodeName === 'SELECT') {} else {
        var menu = element.dataset.menu;
        return new ComboBox({
          target: element,
          submenu: menu
        });
      }
    }
  }]);

  return ComboBox;
}(_MenuItem__WEBPACK_IMPORTED_MODULE_0__["AbstractMenuItem"]);
var MultiSelect = function MultiSelect() {
  _classCallCheck(this, MultiSelect);
};
var MultiCombo = function MultiCombo() {
  _classCallCheck(this, MultiCombo);
};
autoloader__WEBPACK_IMPORTED_MODULE_2__["default"].register('select', function (element) {
  return Select2.FromHTML(element);
});
autoloader__WEBPACK_IMPORTED_MODULE_2__["default"].register('combo-box', function (element) {
  return ComboBox.FromHTML(element);
});

/***/ }),

/***/ "./src/menu/decorators.js":
/*!********************************!*\
  !*** ./src/menu/decorators.js ***!
  \********************************/
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

/***/ "./src/menu/index.js":
/*!***************************!*\
  !*** ./src/menu/index.js ***!
  \***************************/
/*! exports provided: MenuBar, MenuItem, Menu, DropDown, MenuNode, Select2, SelectMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar */ "./src/menu/MenuBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuBar", function() { return _MenuBar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuItem */ "./src/menu/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _MenuItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./src/menu/Menu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DropDown */ "./src/menu/DropDown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropDown", function() { return _DropDown__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _MenuNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuNode */ "./src/menu/MenuNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuNode", function() { return _MenuNode__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Select2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Select2 */ "./src/menu/Select2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Select2", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["Select2"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectMenu", function() { return _Select2__WEBPACK_IMPORTED_MODULE_5__["SelectMenu"]; });













/***/ }),

/***/ "./src/menu/positioners.js":
/*!*********************************!*\
  !*** ./src/menu/positioners.js ***!
  \*********************************/
/*! exports provided: dropdown, DROPDOWN, SIDE_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dropdown", function() { return dropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROPDOWN", function() { return DROPDOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIDE_MENU", function() { return SIDE_MENU; });
/* harmony import */ var core_vectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/vectors */ "./src/core/vectors.js");
/* harmony import */ var core_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/position */ "./src/core/position.js");
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
  if (menu.parent && menu.parent.parent && !menu.parent.parent.isRoot) {
    return menu.element.dataset.position;
  }
}

function _applyPosition(target, overlay, container, flip) {
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
  Object(core_position__WEBPACK_IMPORTED_MODULE_1__["setElementClientPosition"])(overlay, pos, "".concat(methodY, "-").concat(methodX));
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
    container = core_position__WEBPACK_IMPORTED_MODULE_1__["getClientRect"];
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

  return function (target, menu) {
    var parentMenu = menu.parentMenu,
        containerElement = container;

    if (typeof containerElement === 'function') {
      containerElement = containerElement(target, menu);
    }

    if (!parentMenu || parentMenu.isRoot) {
      menu.element.dataset.position = topLevelPosition; // flipPositionIfOutOfBounds(menu.element, container, 'xy');

      _applyPosition(target.element, menu.element, containerElement, 'xy');
    } else {
      menu.element.dataset.position = getInheritedPosition(menu) || defaultPosition; // flipPositionIfOutOfBounds(menu.element, container, 'xy');

      _applyPosition(target.element, menu.element, containerElement, 'xy');
    }
  };
}
var DROPDOWN = dropdown();
var SIDE_MENU = dropdown(null, "left top; right top;", "left top; right top;");

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
 * @returns {any}
 */

function getMenuInstance(element) {
  return MENU_MAP.get(element);
}
/**
 * Finds the closest menu node controller for the element in the DOM tree.
 * @param element
 * @returns {null|any}
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
}
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

/***/ "./src/ui/ItemFilter.js":
/*!******************************!*\
  !*** ./src/ui/ItemFilter.js ***!
  \******************************/
/*! exports provided: innerTextCompare, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "innerTextCompare", function() { return innerTextCompare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ItemFilter; });
/* harmony import */ var _core_Publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Publisher */ "./src/core/Publisher.js");
/* harmony import */ var _core_utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utility.js */ "./src/core/utility.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * Compares if the item innerText matches the value with case insensitive matching.
 * @param item
 * @param value
 * @returns {boolean}
 */

function innerTextCompare(item, value) {
  value = value.trim().toLowerCase(); // If value is empty clear the filter.

  if (!value) {
    return true;
  }

  return item.innerText.toLowerCase().indexOf(value) !== -1;
}
/**
 * A component that filters items in a container by an the input value of the text field.
 */

var ItemFilter =
/*#__PURE__*/
function (_Publisher) {
  _inherits(ItemFilter, _Publisher);

  function ItemFilter() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        element = _ref.element,
        target = _ref.target,
        _ref$items = _ref.items,
        items = _ref$items === void 0 ? ".filter-item" : _ref$items,
        _ref$compareFunction = _ref.compareFunction,
        compareFunction = _ref$compareFunction === void 0 ? innerTextCompare : _ref$compareFunction,
        _ref$onHide = _ref.onHide,
        onHide = _ref$onHide === void 0 ? "hidden" : _ref$onHide,
        _ref$onShow = _ref.onShow,
        onShow = _ref$onShow === void 0 ? null : _ref$onShow,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 500 : _ref$delay,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
        _ref$tabindex = _ref.tabindex,
        tabindex = _ref$tabindex === void 0 ? 0 : _ref$tabindex;

    _classCallCheck(this, ItemFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ItemFilter).call(this));

    if (element) {
      _this.element = Object(_core_utility_js__WEBPACK_IMPORTED_MODULE_1__["selectElement"])(element);
      _this.input = _this.element.querySelector('input[type="text"], [data-filter-input]');
    } else {
      _this.element = document.createElement('div');
      _this.input = document.createElement("input");
      _this.input.placeholder = placeholder;

      _this.element.appendChild(_this.input);

      _this.input.classList.add("item-filter__input");

      _this.input.tabIndex = tabindex;
    }

    _this.target = target;
    _this.items = items;
    _this.compareFunction = compareFunction;
    _this.onHide = onHide;
    _this.onShow = onShow;
    _this.delay = delay;

    _this.element.classList.add("item-filter");

    var timer;

    _this.element.addEventListener('input', function (event) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      setTimeout(function () {
        var value = _this.input.value,
            allItemsHidden = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.getFilterItems()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (_this.compareFunction(item, value)) {
              _this._showItem(item);

              allItemsHidden = false;
            } else {
              _this._hideItem(item);
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

        _this.publish('filter-change', {
          filter: _assertThisInitialized(_this),
          allItemsFiltered: allItemsHidden
        });
      }, _this.delay);
    });

    return _this;
  }
  /**
   * Shows the item.
   * @param item
   * @private
   */


  _createClass(ItemFilter, [{
    key: "_showItem",
    value: function _showItem(item) {
      if (typeof this.onHide === 'string') {
        Object(_core_utility_js__WEBPACK_IMPORTED_MODULE_1__["removeClasses"])(item, this.onHide);
      }

      if (this.onShow) {
        if (typeof this.onShow === 'function') {
          this.onShow(item);
        } else if (typeof this.onShow === 'string') {
          Object(_core_utility_js__WEBPACK_IMPORTED_MODULE_1__["addClasses"])(item, this.onShow);
        }
      }
    }
    /**
     * Hides the item.
     * @param item
     * @private
     */

  }, {
    key: "_hideItem",
    value: function _hideItem(item) {
      if (typeof this.onShow === 'string') {
        Object(_core_utility_js__WEBPACK_IMPORTED_MODULE_1__["removeClasses"])(item, this.onShow);
      }

      if (this.onHide) {
        if (typeof this.onHide === 'function') {
          this.onHide(item);
        } else if (typeof this.onHide === 'string') {
          Object(_core_utility_js__WEBPACK_IMPORTED_MODULE_1__["addClasses"])(item, this.onHide);
        }
      }
    }
    /**
     * Returns a list of the filterable items.
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]>}
     */

  }, {
    key: "getFilterItems",
    value: function getFilterItems() {
      var target, items;

      if (typeof this.target === 'function') {
        target = this.target();
      } else if (typeof this.target === 'string') {
        target = document.querySelector(this.target);
      } else {
        target = this.target;
      }

      if (typeof this.items === 'function') {
        items = this.items(target);
      } else {
        items = target.querySelectorAll(this.items);
      }

      return items;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.input.value = "";
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.getFilterItems()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          this._showItem(item);
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

      this.publish('filter-change', {
        filter: this,
        allItemsFiltered: false
      });
    }
    /**
     * Appends the widget to the element.
     * @param element
     */

  }, {
    key: "appendTo",
    value: function appendTo(element) {
      if (typeof element === 'string') {
        document.querySelector(element).appendChild(this.element);
      } else if (element.appendChild) {
        element.appendChild(this.element);
      } else if (element.append) {
        element.append(this.element);
      }
    }
    /**
     * Removes the widget from the dom.
     * @returns {Element|Document|DocumentFragment|HTMLDivElement}
     */

  }, {
    key: "remove",
    value: function remove() {
      return this.element.parentElement.removeChild(this.element);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "isFocused",
    value: function isFocused() {
      return document.activeElement === this.input;
    }
  }]);

  return ItemFilter;
}(_core_Publisher__WEBPACK_IMPORTED_MODULE_0__["default"]);



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