/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 426:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  /* font-family: sans-serif; */\n}\n\ntable {\n  border-collapse: collapse;\n  margin: 30px;\n}\n\n.cell {\n  border: 1px solid lightblue;\n  color: lightgray;\n  width: 40px;\n  height: 40px;\n  text-align: center;\n}\n\n.cell--alive {\n  background-color: darkcyan;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 695:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}

module.exports = getTarget;

/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ./src/Game.ts


var Game = /*#__PURE__*/function () {
  function Game(gameField, gameView) {
    var stepDurationMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

    _classCallCheck(this, Game);

    this.gameView = gameView;
    this.gameField = gameField;
    this.stepDurationMs = stepDurationMs;
    this.speed = 1000;
    this.isRunning = false;
    this.initialize();
  }

  _createClass(Game, [{
    key: "initialize",
    value: function initialize() {
      this.state = this.gameField.getState();
      this.gameView.updateGameField(this.state);
      this.gameView.updateGameState({
        isRunning: false,
        width: this.state[0].length,
        height: this.state.length
      });
      this.gameView.onSpeedChange(this.onSpeedChange.bind(this));
      this.gameView.onCellClick(this.onCellClick.bind(this));
      this.gameView.onFieldSizeChange(this.onFieldSizeChange.bind(this)); // не уверен, что привязка контекста таким образом правильно

      this.gameView.onGameStateChange(this.onGameStateChange.bind(this));
    }
  }, {
    key: "onCellClick",
    value: function onCellClick(x, y) {
      this.gameField.toggleCellState(x, y);
      this.state = this.gameField.getState();
      this.gameView.updateGameField(this.state);
    }
  }, {
    key: "onFieldSizeChange",
    value: function onFieldSizeChange(width, height) {
      this.gameField.setSize(width, height);
      this.state = this.gameField.getState();
      this.gameView.updateGameField(this.state);
      this.gameView.updateGameState({
        width: width,
        height: height
      });
    }
  }, {
    key: "runGame",
    value: function runGame() {
      var _this = this;

      if (this.isRunning) {
        this.timer = window.setInterval(function () {
          _this.gameField.nextGeneration();

          _this.state = _this.gameField.getState();

          _this.gameView.updateGameField(_this.state);

          if (!_this.gameField.isAnyoneAlive()) {
            _this.gameView.updateGameState({
              isRunning: false
            });

            _this.isRunning = false;
            setTimeout(function () {
              window.alert("No cells left!");
            }, 10);
            window.clearInterval(_this.timer);
          }
        }, this.speed);
      }
    }
  }, {
    key: "onSpeedChange",
    value: function onSpeedChange(speed) {
      this.speed = speed;
      window.clearInterval(this.timer);
      this.runGame();
    }
  }, {
    key: "onGameStateChange",
    value: function onGameStateChange(isRunning) {
      this.gameView.updateGameState({
        isRunning: isRunning
      });

      if (isRunning) {
        this.isRunning = true;
        this.runGame();
      } else {
        this.gameView.updateGameState({
          isRunning: false
        });
        this.isRunning = false;
        window.clearInterval(this.timer);
      }
    }
  }]);

  return Game;
}();
;// CONCATENATED MODULE: ./src/GameField.ts


var GameField = /*#__PURE__*/function () {
  function GameField() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, GameField);

    this.width = width;
    this.height = height;
    this.field = this.getState();
  }

  _createClass(GameField, [{
    key: "getState",
    value: function getState() {
      var _this = this;

      if (this.field === undefined) {
        this.field = Array.from({
          length: this.height
        }).map(function () {
          return Array.from({
            length: _this.width
          }).fill(0);
        });
      }

      return this.field;
    }
  }, {
    key: "getCellState",
    value: function getCellState(field, x, y) {
      var row = this.field[y];

      if (row === undefined) {
        return 0;
      }

      var cell = row[x];

      if (cell === undefined) {
        return 0;
      }

      return cell;
    }
  }, {
    key: "getNumOfAliveNeighbours",
    value: function getNumOfAliveNeighbours(column, row, field) {
      var neighbours = 0;

      for (var j = column - 1; j <= column + 1; j += 1) {
        neighbours += Number(this.getCellState(field, j, row - 1));
      }

      for (var _j = column - 1; _j <= column + 1; _j += 1) {
        neighbours += Number(this.getCellState(field, _j, row + 1));
      }

      neighbours += Number(this.getCellState(field, column - 1, row));
      neighbours += Number(this.getCellState(field, column + 1, row));
      return neighbours;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "getNewCellState",
    value: function getNewCellState(currentCellState, numOfAliveNeighbours) {
      if (numOfAliveNeighbours === 3) {
        return 1;
      }

      if (numOfAliveNeighbours > 3 || numOfAliveNeighbours < 2) {
        return 0;
      }

      if (numOfAliveNeighbours === 2 && currentCellState === 1) {
        return 1;
      }

      return 0;
    }
  }, {
    key: "isAnyoneAlive",
    value: function isAnyoneAlive() {
      for (var i = 0; i < this.field.length; i += 1) {
        var row = this.field[i];

        for (var j = 0; j < row.length; j += 1) {
          var cell = row[j];

          if (cell) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "toggleCellState",
    value: function toggleCellState(x, y) {
      this.field[y][x] = this.field[y][x] === 0 ? 1 : 0;
    }
  }, {
    key: "nextGeneration",
    value: function nextGeneration() {
      var _this2 = this;

      var newState = this.field.map(function (row, rowIndex) {
        return row.map(function (cell, cellIndex) {
          var an = _this2.getNumOfAliveNeighbours(cellIndex, rowIndex, _this2.field);

          var currentState = _this2.getCellState(_this2.field, cellIndex, rowIndex);

          var state = _this2.getNewCellState(currentState, an);

          return state;
        });
      });
      this.field = newState; // return newState;
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      var originalHeight = this.field.length;
      var originalWeight = this.field[0].length;

      if (height < originalHeight) {
        this.field.splice(height, originalHeight);
      } else {
        for (var r = originalHeight; r < height; r += 1) {
          this.field.splice(height, 0, Array(width).fill(0));
        }
      }

      if (width < originalWeight) {
        this.field.forEach(function (r) {
          r.splice(width, originalWeight);
        });
      } else {
        this.field.forEach(function (r) {
          for (var i = originalWeight; i < width; i += 1) {
            r.push(0);
          }

          r.splice(width);
        });
      }

      return this.field;
    }
  }]);

  return GameField;
}();
;// CONCATENATED MODULE: ./src/GameView.ts


var GameView = /*#__PURE__*/function () {
  function GameView(element) {
    _classCallCheck(this, GameView);

    this.el = element;
    this.el.innerHTML = "\n      <div class=\"gameField\"></div>\n      <div class=\"gameControls\">\n      <div class=\"field-size\">\n        <label>Width:</label>\n        <input type='number' class=\"field-size field-size--width\" name=\"width\" value=10><br>\n        <label>Height:</label>\n        <input type='number' class=\"field-size field-size--height\" name=\"height\" value=10><br>\n      </div>\n        <div class=\"speedRange\">\n          <span>Faster</span>\n          <input type=\"range\" min=\"100\" max=\"2000\" step=\"100\" value=\"1000\" class=\"slider\">\n          <span>Slower</span>\n        </div>\n        <div class=\"run-button\">\n        <button class=\"run-button run-button--stopped\">Play</button>\n        </div>\n      </div>\n      ";
  }

  _createClass(GameView, [{
    key: "updateGameField",
    value: function updateGameField(field) {
      var rowIterator = function rowIterator(row, rowIndex) {
        return "<tr>".concat(row.map(function (cell, columnIndex) {
          if (cell === 1) {
            return "<td\n          data-x=".concat(columnIndex, "\n          data-y=").concat(rowIndex, "\n          class=\"cell cell--alive\"></td>");
          }

          return "<td\n        data-x=".concat(columnIndex, "\n        data-y=").concat(rowIndex, "\n        class=\"cell cell--dead\"></td>");
        }).join(""), "</tr>");
      };

      var table = "<table border=1\">".concat(field.map(rowIterator).join(""), "</table>");
      var gameField = this.el.querySelector(".gameField");
      gameField.innerHTML = table;
    }
  }, {
    key: "updateGameState",
    value: function updateGameState(state) {
      if (state.width !== undefined && state.height !== undefined) {
        var fieldSizeEl = this.el.querySelector(".field-size");
        fieldSizeEl.innerHTML = "\n      <label>Width:</label>\n      <input type=\"number\" class=\"field-size field-size--width\" name=\"width\" value=".concat(state.width, "><br>\n      <label>Height:</label>\n      <input type=\"number\" class=\"field-size field-size--height\" name=\"height\" value=").concat(state.height, "><br>\n      ");
      }

      if (state.isRunning !== undefined) {
        var runButtonEl = this.el.querySelector(".run-button");

        if (state.isRunning) {
          runButtonEl.innerHTML = "\n          <button class=\"run-button run-button--runned\">Stop</button>\n        ";
        } else {
          runButtonEl.innerHTML = "\n          <button class=\"run-button run-button--stopped\">Play</button>\n      ";
        }
      }
    }
  }, {
    key: "onCellClick",
    value: function onCellClick(cb) {
      var table = this.el.querySelector(".gameField");
      table.addEventListener("click", function (ev) {
        var clickedElement = ev.target;
        var x = clickedElement.getAttribute("data-x");
        var y = clickedElement.getAttribute("data-y");

        if (Number(x) >= 0 && Number(y) >= 0) {
          cb(Number(x), Number(y));
        }
      });
    }
  }, {
    key: "onSpeedChange",
    value: function onSpeedChange(cb) {
      var range = this.el.querySelector(".slider");
      range.addEventListener("input", function () {
        cb(Number(range.value));
      });
    }
  }, {
    key: "onGameStateChange",
    value: function onGameStateChange(cb) {
      var buttonEl = this.el.querySelector(".run-button");
      buttonEl.addEventListener("click", function (ev) {
        var newState = ev.target.innerHTML === 'Play';
        cb(newState);
      });
    }
  }, {
    key: "onFieldSizeChange",
    value: function onFieldSizeChange(cb) {
      var _this = this;

      var inputEl = this.el.querySelector(".field-size");
      inputEl.addEventListener("change", function () {
        var width = _this.el.querySelector("input[type='number'].field-size.field-size--width").value;

        var height = _this.el.querySelector("input[type='number'].field-size.field-size--height").value;

        cb(Number(width), Number(height));
      });
    }
  }]);

  return GameView;
}();
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/getTarget.js
var getTarget = __webpack_require__(695);
var getTarget_default = /*#__PURE__*/__webpack_require__.n(getTarget);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/style.css
var style = __webpack_require__(426);
;// CONCATENATED MODULE: ./src/style.css

      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = function(css, style){
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
      while (style.firstChild) {
        style.removeChild(style.firstChild);
      }

      style.appendChild(document.createTextNode(css));
    }
  };
options.setAttributes = function(style) {
        var nonce =
           true ? __webpack_require__.nc : 0;

        if (nonce) {
          style.setAttribute("nonce", nonce);
        }
      };
options.insert = function(style){
    var target = getTarget_default()("head");

    if (!target) {
      throw new Error(
        "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
      );
    }

    target.appendChild(style);
  };
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(style/* default */.Z, options);




       /* harmony default export */ const src_style = (style/* default */.Z && style/* default.locals */.Z.locals ? style/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/index.ts




var el = document.getElementById("app");
var gameView = new GameView(el);
var gameField = new GameField(5, 5); // eslint-disable-next-line no-new

new Game(gameField, gameView, 1000);
})();

/******/ })()
;