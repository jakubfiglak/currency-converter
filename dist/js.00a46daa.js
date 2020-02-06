// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/currencies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCurrency = exports.generateOptions = void 0;
const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  ISK: 'Icelandic Krona',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro'
};

const generateOptions = () => Object.entries(currencies).map(([currencyCode, currencyName]) => `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`).join('');

exports.generateOptions = generateOptions;

const formatCurrency = (amount, currency) => Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency
}).format(amount);

exports.formatCurrency = formatCurrency;
},{}],"js/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatesByBase = getRatesByBase;
exports.getRatesToCalculate = getRatesToCalculate;
const endpoint = 'https://api.exchangeratesapi.io';

async function getRatesByBase(base) {
  try {
    const res = await fetch(`${endpoint}/latest?base=${base}`);
    const rates = await res.json();
    return rates;
  } catch (err) {
    alert(err.message);
  }
}

async function getRatesToCalculate(base, daysFromNow) {
  if (!daysFromNow) {
    try {
      const res = await fetch(`${endpoint}/latest?base=${base}&symbols=USD,GBP,EUR,CHF`);
      const rates = await res.json(); // console.log(rates);

      return rates;
    } catch (err) {
      alert(err.message);
    }
  } else if (daysFromNow > 0) {
    const today = new Date();
    const dayInThePast = new Date(today.setDate(today.getDate() - daysFromNow));
    const queryString = Array.from(dayInThePast.toISOString()).splice(0, 10).join('');

    try {
      const res = await fetch(`${endpoint}/${queryString}?base=${base}&symbols=USD,GBP,EUR,CHF`);
      const rates = await res.json(); // console.log(rates);

      return rates;
    } catch (err) {
      alert(err.message);
    }
  }
}
},{}],"js/calculateRates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculate;

var _api = require("./api");

const ratesToCalculate = {};

async function calculate(from) {
  if (!ratesToCalculate[from]) {
    ratesToCalculate[from] = {};
    const todayData = await (0, _api.getRatesToCalculate)(from);
    const yesterdayData = await (0, _api.getRatesToCalculate)(from, 1);
    ratesToCalculate[from].today = todayData;
    ratesToCalculate[from].yesterday = yesterdayData;
    const rateRatio = {};
    Object.keys(todayData.rates).forEach(currency => rateRatio[currency] = (todayData.rates[currency] - yesterdayData.rates[currency]) / yesterdayData.rates[currency]);
    ratesToCalculate[from].ratio = rateRatio;
  }

  return ratesToCalculate;
}
},{"./api":"js/api.js"}],"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertPercent = convertPercent;

function convertPercent(decimal) {
  return Intl.NumberFormat('en-EN', {
    style: 'percent',
    minimumFractionDigits: 2
  }).format(decimal);
}
},{}],"js/convert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convert;

var _api = require("./api");

const ratesByBase = {};

async function convert(amount, from, to) {
  if (!ratesByBase[from]) {
    const rates = await (0, _api.getRatesByBase)(from);
    ratesByBase[from] = rates;
  }

  const rate = ratesByBase[from].rates[to];
  return amount * rate;
}
},{"./api":"js/api.js"}],"js/displayData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayRates = exports.displayConversion = exports.rateSelect = void 0;

var _convert = _interopRequireDefault(require("./convert"));

var _currencies = require("./currencies");

var _calculateRates = _interopRequireDefault(require("./calculateRates"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const amountInput = document.querySelector('#amount-input');
const amountOutput = document.querySelector('#amount-output');
const toSelect = document.querySelector('#to-currency');
const fromSelect = document.querySelector('#from-currency');
const ratesList = document.querySelector('#rates-list');
const rateSelect = document.querySelector('#currency');
exports.rateSelect = rateSelect;

const displayConversion = async () => {
  const value = await (0, _convert.default)(amountInput.value, fromSelect.value, toSelect.value);
  const formatted = (0, _currencies.formatCurrency)(value, toSelect.value);
  amountOutput.textContent = `${formatted}`;
};

exports.displayConversion = displayConversion;

const displayRates = async () => {
  const currency = rateSelect.value;
  const rates = await (0, _calculateRates.default)(currency);
  const {
    today,
    yesterday,
    ratio
  } = rates[currency];
  const todayFormatted = Object.keys(today.rates).map(curr => (0, _currencies.formatCurrency)(today.rates[curr] * 100, curr));
  const yesterdayFormatted = Object.keys(yesterday.rates).map(curr => (0, _currencies.formatCurrency)(yesterday.rates[curr] * 100, curr));
  const ratioFormatted = Object.keys(ratio).map(rate => (0, _helpers.convertPercent)(ratio[rate]));
  const classes = Object.keys(ratio).map(rate => ratio[rate] >= 0 ? 'plus' : 'minus');
  const html = todayFormatted.map((el, idx) => `
    <li class="list-item">
      <p class="today">${today.date}: 100 ${today.base} = ${el}</p>
       <p class="diff ${classes[idx]}">${ratioFormatted[idx]}</p>
      <p class="yesterday">${yesterday.date}: 100 ${yesterday.base} = ${yesterdayFormatted[idx]}</p>
  </li>
    `).join('');
  ratesList.innerHTML = html;
};

exports.displayRates = displayRates;
},{"./convert":"js/convert.js","./currencies":"js/currencies.js","./calculateRates":"js/calculateRates.js","./helpers":"js/helpers.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _currencies = require("./currencies");

var _calculateRates = _interopRequireDefault(require("./calculateRates"));

var _helpers = require("./helpers");

var _displayData = require("./displayData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');
const form = document.querySelector('.converter'); // getRatesByBase('PLN');
// getRatesToCalculate('PLN', 1);
// calculate('PLN', 1);
// calculate('PLN', 1);
// calculate('USD', 1);
// const percent = convertPercent(0.007576);
// console.log(percent);

const html = (0, _currencies.generateOptions)();
fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;
form.addEventListener('input', _displayData.displayConversion);

_displayData.rateSelect.addEventListener('change', _displayData.displayRates);
},{"./currencies":"js/currencies.js","./calculateRates":"js/calculateRates.js","./helpers":"js/helpers.js","./displayData":"js/displayData.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60364" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map