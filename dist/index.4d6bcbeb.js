// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"e11Rl":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "bed887d14d6bcbeb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"gLLPy":[function(require,module,exports) {
var _countdownTimerJs = require("./js/countdownTimer.js");
var _startStopButtonJs = require("./js/elements/startStopButton.js");
var _resetButtonJs = require("./js/elements/resetButton.js");
var _clockJs = require("./js/elements/clock.js");
var _minutesJs = require("./js/elements/minutes.js");
(0, _minutesJs.minutes).update((0, _countdownTimerJs.countdownTimer).minutesFromUser);
(0, _clockJs.clock).updateAriaLabel((0, _countdownTimerJs.countdownTimer).minutesFromUser, 0);
(0, _startStopButtonJs.startStopButton).handle.addEventListener("click", ()=>(0, _countdownTimerJs.countdownTimer).startOrStop());
(0, _resetButtonJs.resetButton).handle.addEventListener("click", ()=>(0, _countdownTimerJs.countdownTimer).reset());
(0, _clockJs.clock).handle.addEventListener("click", ()=>(0, _countdownTimerJs.countdownTimer).set());
const registerServiceWorker = async ()=>{
    if ("serviceWorker" in navigator) try {
        // path needs to be written relative to the origin, app's root directory
        const registration = await navigator.serviceWorker.register(`${location.href}sw.js`);
        if (registration.installing) console.log("Service worker installing");
        else if (registration.waiting) console.log("Service worker installed");
        else if (registration.active) console.log("Service worker active");
    } catch (error) {
        console.error(`Registration failed with ${error}`);
    }
};
registerServiceWorker();

},{"./js/countdownTimer.js":"1PMzX","./js/elements/startStopButton.js":"fzlZh","./js/elements/resetButton.js":"7nh2l","./js/elements/clock.js":"7dbNF","./js/elements/minutes.js":"helnr"}],"1PMzX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "countdownTimer", ()=>countdownTimer);
var _alarmJs = require("./elements/alarm.js");
var _messageJs = require("./elements/message.js");
var _counterJs = require("./elements/counter.js");
var _startStopButtonJs = require("./elements/startStopButton.js");
var _secondsJs = require("./elements/seconds.js");
var _minutesJs = require("./elements/minutes.js");
var _clockJs = require("./elements/clock.js");
var _localStorageJs = require("./localStorage.js");
const countdownTimer = {
    minutesFromUser: (0, _localStorageJs.lStorage).getMinutes(),
    timerInterval: null,
    stopped: true,
    startOrStop () {
        if (this.stopped) this.start();
        else this.stop();
    },
    start () {
        this.stopped = false;
        (0, _startStopButtonJs.startStopButton).updateToStop();
        (0, _messageJs.message).erase();
        //Give a few miliseconds for program so then it can update clockElement correct after first second from start
        let timeEnd = this.now + (0, _minutesJs.minutes).countToMiliseconds() + (0, _secondsJs.seconds).countToMiliseconds() + 30;
        this.timerInterval = setInterval(()=>this.update(timeEnd), 1000);
    },
    get now () {
        return new Date().getTime();
    },
    update (timeEnd) {
        let distanceToTimeEnd = timeEnd - this.now;
        this.updateClock(distanceToTimeEnd);
        this.updatePageTitle();
        if (distanceToTimeEnd < 1) {
            this.reset();
            (0, _alarmJs.alarm).play3Times();
            (0, _messageJs.message).show((0, _counterJs.counter).value);
            (0, _counterJs.counter).update();
        }
    },
    updateClock (miliseconds) {
        let sec = (0, _secondsJs.seconds).countToClockSeconds(miliseconds);
        (0, _secondsJs.seconds).update(sec);
        let min = (0, _minutesJs.minutes).countToClockMinutes(miliseconds);
        (0, _minutesJs.minutes).update(min);
        (0, _clockJs.clock).updateAriaLabel(min, sec);
    },
    updatePageTitle () {
        document.title = `${(0, _clockJs.clock).handle.innerText} - Pomodoro Timer`;
    },
    reset () {
        (0, _minutesJs.minutes).update(this.minutesFromUser);
        (0, _secondsJs.seconds).update(0);
        (0, _clockJs.clock).updateAriaLabel(this.minutesFromUser, 0);
        this.stop();
        this.updatePageTitle();
    },
    stop () {
        this.stopped = true;
        clearInterval(this.timerInterval);
        (0, _startStopButtonJs.startStopButton).updateToStart();
    },
    set () {
        let minutes = prompt("Enter minutes (1 to 99)", this.minutesFromUser);
        if (minutes === null) return;
        minutes = parseInt(minutes, 10);
        if (isNaN(minutes) || minutes < 1 || minutes > 99) alert("Wrong number, must be between 1 and 99");
        else {
            this.minutesFromUser = minutes;
            (0, _localStorageJs.lStorage).setMinutes(minutes);
            this.reset();
        }
    }
};

},{"./elements/alarm.js":"kTZzA","./elements/message.js":"4JqWG","./elements/counter.js":"27QQQ","./elements/startStopButton.js":"fzlZh","./elements/seconds.js":"5BujR","./elements/minutes.js":"helnr","./elements/clock.js":"7dbNF","./localStorage.js":"45bAM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kTZzA":[function(require,module,exports) {
//sound from https://freesound.org/s/22627/
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "alarm", ()=>alarm);
class Alarm extends Audio {
    name = "alarm";
    path = `sound/${this.name}.flac`;
    // for IndexedDB
    db = {
        name: "audios_db",
        objectStore: {
            name: "audios_os",
            keyPath: "name",
            indexName: "flacBlob",
            record: {
                name: this.name,
                flacBlob: null
            }
        }
    };
    play3Times() {
        this.play();
        let counter = 1;
        this.onended = function() {
            if (counter < 3) {
                counter++;
                this.play();
            }
        };
    }
}
const alarm = new Alarm("");
// Store .flac file (blob) in IndexedDB
// Create an instance of a db object for us to store our database in
let db;
const request = window.indexedDB.open(alarm.db.name, 1);
request.addEventListener("error", ()=>console.error("Database failed to open"));
request.addEventListener("success", ()=>{
    console.log("Database opened successfully");
    db = request.result;
    init();
});
// Setup the database tables if this has not already have been done
request.addEventListener("upgradeneeded", (e)=>{
    // Grab a reference to the opened database
    const db = e.target.result;
    const objectStore = db.createObjectStore(alarm.db.objectStore.name, {
        keyPath: alarm.db.objectStore.keyPath
    });
    // Define what data items the objectStore will contain (table collumns)
    objectStore.createIndex(alarm.db.objectStore.indexName, alarm.db.objectStore.indexName, {
        unique: false
    });
    console.log("Database setup complete");
});
function init() {
    const objectStore = db.transaction(alarm.db.objectStore.name).objectStore(alarm.db.objectStore.name);
    const request = objectStore.get(alarm.name);
    request.addEventListener("success", ()=>{
        if (request.result) {
            console.log("Taking audio from IDB");
            setAudioSrc(request.result[alarm.db.objectStore.indexName]);
        } else fetchAudioFromNetwork();
    });
}
function setAudioSrc(flacBlob) {
    const flacURL = URL.createObjectURL(flacBlob);
    alarm.src = flacURL;
}
function fetchAudioFromNetwork() {
    console.log("Fetching audio from network");
    fetch(alarm.path).then((response)=>response.blob()).then((flacBlob)=>{
        setAudioSrc(flacBlob);
        storeAudio(flacBlob);
    });
}
function storeAudio(flacBlob) {
    const objectStore = db.transaction(alarm.db.objectStore.name, "readwrite").objectStore(alarm.db.objectStore.name);
    alarm.db.objectStore.record.flacBlob = flacBlob;
    const record = alarm.db.objectStore.record;
    const request = objectStore.add(record);
    request.addEventListener("success", ()=>console.log("Record additon attempt finished"));
    request.addEventListener("error", ()=>console.error(request.error));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4JqWG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "message", ()=>message);
const message = {
    handle: document.getElementById("message"),
    writingNow: false,
    erasingNow: false,
    animationSpeed: 90,
    hiddenMessageHandle: document.querySelector("#hidden-message"),
    show (counterValue) {
        if (counterValue < 4) {
            const messageAboutShortBreak = "Time for short break (3 to 5min)";
            this.write(messageAboutShortBreak);
        } else {
            const messageAboutLongBreak = "Time for long break (15 to 30min)";
            this.write(messageAboutLongBreak);
        }
    },
    write (text) {
        document.title = text;
        this.hiddenMessageHandle.innerText = text;
        this.handle.innerHTML = "";
        this.writingNow = true;
        [
            ...text
        ].forEach((letter, index)=>{
            setTimeout(()=>{
                this.handle.innerHTML += letter;
                if (this.handle.innerHTML === text) this.writingNow = false;
            }, index * this.animationSpeed);
        });
    },
    erase () {
        this.hiddenMessageHandle.innerText = "";
        if (!this.erasingNow && this.handle.innerHTML !== "") {
            this.erasingNow = true;
            let eraser = setInterval(()=>{
                if (!this.writingNow) this.handle.innerHTML = this.handle.innerHTML.slice(0, -1);
                if (this.handle.innerHTML === "") {
                    clearInterval(eraser);
                    this.erasingNow = false;
                }
            }, this.animationSpeed);
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"27QQQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "counter", ()=>counter);
const counter = {
    handle: document.getElementById("counter"),
    update () {
        if (this.value >= 4) this.handle.innerText = "Counter: 1";
        else this.handle.innerText = `Counter: ${this.value + 1}`;
    },
    get value () {
        let value = this.handle.innerText.replace("Counter: ", "");
        value = parseInt(value, 10);
        if (isNaN(value) || value < 1 || minutes > 4) return 1;
        return value;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fzlZh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startStopButton", ()=>startStopButton);
const startStopButton = {
    handle: document.getElementById("start-stop"),
    updateToStop () {
        this.handle.className = "stop";
        this.handle.innerText = "Stop";
        this.handle.ariaLabel = "Stop the timer";
    },
    updateToStart () {
        this.handle.className = "start";
        this.handle.innerText = "Start";
        this.handle.ariaLabel = "Start the timer";
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5BujR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "seconds", ()=>seconds);
const seconds = {
    handle: document.getElementById("seconds"),
    countToMiliseconds () {
        return this.value * 1000;
    },
    get value () {
        let value = parseInt(this.handle.innerText, 10);
        if (isNaN(value) || value < 0 || value > 59) return 0;
        return value;
    },
    countToClockSeconds (miliseconds) {
        return Math.floor(miliseconds % 60000 / 1000);
    },
    update (value) {
        this.handle.innerText = value.toString().padStart(2, "0");
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"helnr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "minutes", ()=>minutes);
const minutes = {
    handle: document.getElementById("minutes"),
    countToMiliseconds () {
        return this.value * 60000;
    },
    get value () {
        let value = parseInt(this.handle.innerText, 10);
        if (isNaN(value) || value < 0 || value > 99) return value = 25;
        return value;
    },
    countToClockMinutes (miliseconds) {
        return Math.floor(miliseconds / 60000);
    },
    update (value) {
        this.handle.innerText = value.toString().padStart(2, "0");
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7dbNF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "clock", ()=>clock);
const clock = {
    handle: document.getElementById("clock"),
    updateAriaLabel (minutes, seconds) {
        this.handle.ariaLabel = `${minutes} minutes and ${seconds} seconds remaining`;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"45bAM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lStorage", ()=>lStorage);
let lStorage = {
    minutesKey: "minutes",
    getMinutes () {
        if (!isStorageSupported()) return 25;
        let minutes = localStorage.getItem(this.minutesKey);
        return minutes === null ? 25 : Number(minutes);
    },
    setMinutes (value) {
        if (!isStorageSupported()) return;
        localStorage.setItem(this.minutesKey, value);
    }
};
function isStorageSupported() {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch (err) {
        return false;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7nh2l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resetButton", ()=>resetButton);
const resetButton = {
    handle: document.getElementById("reset")
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["e11Rl","gLLPy"], "gLLPy", "parcelRequireba2f")

//# sourceMappingURL=index.4d6bcbeb.js.map
