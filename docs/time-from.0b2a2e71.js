parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"2S39":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.app=exports.h=exports.Lazy=void 0;var e=1,n=2,r=3,t={},o=[],i=o.map,l=Array.isArray,u="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout,f=function(e){var n="";if("string"==typeof e)return e;if(l(e)&&e.length>0)for(var r,t=0;t<e.length;t++)""!==(r=f(e[t]))&&(n+=(n&&" ")+r);else for(var t in e)e[t]&&(n+=(n&&" ")+t);return n},a=function(e,n){var r={};for(var t in e)r[t]=e[t];for(var t in n)r[t]=n[t];return r},s=function(e){return e.reduce(function(e,n){return e.concat(n&&!0!==n?"function"==typeof n[0]?[n]:s(n):0)},o)},c=function(e,n){return l(e)&&l(n)&&e[0]===n[0]&&"function"==typeof e[0]},d=function(e,n){if(e!==n)for(var r in a(e,n)){if(e[r]!==n[r]&&!c(e[r],n[r]))return!0;n[r]=e[r]}},p=function(e,n,r){for(var t,o,i=0,l=[];i<e.length||i<n.length;i++)t=e[i],o=n[i],l.push(o?!t||o[0]!==t[0]||d(o[1],t[1])?[o[0],o[1],o[0](r,o[1]),t&&t[2]()]:t:t&&t[2]());return l},v=function(e,n,r,t,o,i){if("key"===n);else if("style"===n)for(var l in a(r,t))r=null==t||null==t[l]?"":t[l],"-"===l[0]?e[n].setProperty(l,r):e[n][l]=r;else"o"===n[0]&&"n"===n[1]?((e.actions||(e.actions={}))[n=n.slice(2).toLowerCase()]=t)?r||e.addEventListener(n,o):e.removeEventListener(n,o):!i&&"list"!==n&&n in e?e[n]=null==t?"":t:null==t||!1===t||"class"===n&&!(t=f(t))?e.removeAttribute(n):e.setAttribute(n,t)},y=function(e,n,t){var o=e.props,i=e.type===r?document.createTextNode(e.name):(t=t||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name,{is:o.is}):document.createElement(e.name,{is:o.is});for(var l in o)v(i,l,null,o[l],n,t);for(var u=0,f=e.children.length;u<f;u++)i.appendChild(y(e.children[u]=w(e.children[u]),n,t));return e.node=i},h=function(e){return null==e?null:e.key},m=function(n,t,o,i,l,u){if(o===i);else if(null!=o&&o.type===r&&i.type===r)o.name!==i.name&&(t.nodeValue=i.name);else if(null==o||o.name!==i.name)t=n.insertBefore(y(i=w(i),l,u),t),null!=o&&n.removeChild(o.node);else{var f,s,c,d,p=o.props,g=i.props,z=o.children,x=i.children,C=0,k=0,A=z.length-1,L=x.length-1;for(var b in u=u||"svg"===i.name,a(p,g))("value"===b||"selected"===b||"checked"===b?t[b]:p[b])!==g[b]&&v(t,b,p[b],g[b],l,u);for(;k<=L&&C<=A&&null!=(c=h(z[C]))&&c===h(x[k]);)m(t,z[C].node,z[C],x[k]=w(x[k++],z[C++]),l,u);for(;k<=L&&C<=A&&null!=(c=h(z[A]))&&c===h(x[L]);)m(t,z[A].node,z[A],x[L]=w(x[L--],z[A--]),l,u);if(C>A)for(;k<=L;)t.insertBefore(y(x[k]=w(x[k++]),l,u),(s=z[C])&&s.node);else if(k>L)for(;C<=A;)t.removeChild(z[C++].node);else{b=C;for(var N={},E={};b<=A;b++)null!=(c=z[b].key)&&(N[c]=z[b]);for(;k<=L;)c=h(s=z[C]),d=h(x[k]=w(x[k],s)),E[c]||null!=d&&d===h(z[C+1])?(null==c&&t.removeChild(s.node),C++):null==d||o.type===e?(null==c&&(m(t,s&&s.node,s,x[k],l,u),k++),C++):(c===d?(m(t,s.node,s,x[k],l,u),E[d]=!0,C++):null!=(f=N[d])?(m(t,t.insertBefore(f.node,s&&s.node),f,x[k],l,u),E[d]=!0):m(t,s&&s.node,null,x[k],l,u),k++);for(;C<=A;)null==h(s=z[C++])&&t.removeChild(s.node);for(var b in N)null==E[b]&&t.removeChild(N[b].node)}}return i.node=t},g=function(e,n){for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0},w=function(e,r){return e.type===n?((!r||g(r.lazy,e.lazy))&&((r=e.lazy.view(e.lazy)).lazy=e.lazy),r):e},z=function(e,n,r,t,o,i){return{name:e,props:n,children:r,node:t,type:i,key:o}},x=function(e,n){return z(e,t,o,n,void 0,r)},C=function(n){return n.nodeType===r?x(n.nodeValue,n):z(n.nodeName.toLowerCase(),t,i.call(n.childNodes,C),n,void 0,e)},k=function(e){return{lazy:e,type:n}};exports.Lazy=k;var A=function(e,n){for(var r,o=[],i=[],u=arguments.length;u-- >2;)o.push(arguments[u]);for(;o.length>0;)if(l(r=o.pop()))for(u=r.length;u-- >0;)o.push(r[u]);else!1===r||!0===r||null==r||i.push("object"==typeof r?r:x(r));return n=n||t,"function"==typeof e?e(n,i):z(e,n,i,void 0,n.key)};exports.h=A;var L=function(e){var n={},r=!1,t=e.view,o=e.node,i=o&&C(o),f=e.subscriptions,a=[],c=function(e){v(this.actions[e.type],e)},d=function(e){return n!==e&&(n=e,f&&(a=p(a,s([f(n)]),v)),t&&!r&&u(y,r=!0)),n},v=(e.middleware||function(e){return e})(function(e,r){return"function"==typeof e?v(e(n,r)):l(e)?"function"==typeof e[0]?v(e[0],"function"==typeof e[1]?e[1](r):e[1]):(s(e.slice(1)).map(function(e){e&&e[0](v,e[1])},d(e[0])),n):d(e)}),y=function(){r=!1,o=m(o.parentNode,o,i,i="string"==typeof(i=t(n))?x(i):i,c)};v(e.init)};exports.app=L;
},{}],"6+Vs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.interval=exports.timeout=void 0;var t=function(t){return function(e,n){return[t,{action:e,delay:n.delay}]}},e=t(function(t,e){setTimeout(function(){t(e.action)},e.delay)});exports.timeout=e;var n=t(function(t,e){var n=setInterval(function(){t(e.action,Date.now())},e.delay);return function(){clearInterval(n)}});exports.interval=n;
},{}],"uPrK":[function(require,module,exports) {
"use strict";function t(t,e){t(e.action)}function e(e){return[t,{action:e}]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Dispatch=e;
},{}],"N/JQ":[function(require,module,exports) {
"use strict";function e(e,o){console.log.apply(null,o)}function o(){return[e,arguments]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Console=o;
},{}],"7yvb":[function(require,module,exports) {
"use strict";function o(t){if(t.values)return t.values.map(o);var n=t.min||0,r=t.max||1;t.int&&r++,t.bool&&(n=0,r=2);var e=Math.random()*(r-n)+n;return(t.int||t.bool)&&(e=Math.floor(e)),t.bool&&(e=!!e),e}function t(t,n){var r=o(n);t(n.action,r)}function n(o){return[t,o]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Random=n;
},{}],"axta":[function(require,module,exports) {
"use strict";function e(e,t){var n,r={};for(n in e)r[n]=e[n];for(n in t)r[n]=t[n];return r}function t(e,t,n,r){var o=t.bind(null,n);return e.addEventListener(r,o),function(){e.removeEventListener(r,o)}}function n(e,t){return function(){e(t.action,t.asDate?new Date:performance.now())}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.assign=e,exports.makeRemoveListener=t,exports.makeDispatchTime=n,exports.getOpenWebSocket=o,exports.closeWebSocket=s;var r={};function o(e){var t=r[e.url];return t||(t={socket:new WebSocket(e.url,e.protocols),listeners:[]},r[e.url]=t),t}function s(e){o(e).socket.close(),delete r[e.url]}
},{}],"30+M":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Http=e;var t=require("../utils.js");function n(t,n){fetch(n.url,n.options).then(function(t){if(!t.ok)throw t;return t}).then(function(t){return t[n.response]()}).then(function(e){t(n.action,e)}).catch(function(e){t(n.error,e)})}function e(e){return[n,(0,t.assign)({options:{},response:"json",error:e.action},e)]}
},{"../utils.js":"axta"}],"i1JQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Merge=r;var e=require("../utils.js");function t(t,r){t(function(t){return(0,e.assign)(t,r.action(t))})}function r(e){return[t,{action:e}]}
},{"../utils.js":"axta"}],"zRVn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Debounce=n;var t=[];function e(e,n){var o=t.find(function(t){return t[0]===n.action});o?clearTimeout(o[1]):(o=[n.action],t.push(o)),o[1]=setTimeout(function(){e(n.action)},n.wait)}function n(t){return[e,t]}
},{}],"VAAy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Throttle=n;var t=[];function e(e,n){var o=t.find(function(t){return t[0]===n.action});o||(o=[n.action],t.push(o)),o[1]||(e(n.action),o[1]=!0,setTimeout(function(){o[1]=!1},n.rate))}function n(t){return[e,t]}
},{}],"0LsL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.WriteToStorage=a,exports.ReadFromStorage=c,exports.RemoveFromStorage=i;var e=require("../utils.js");function r(e){return window[e+"Storage"]||localStorage}function t(e,t){var o=t.converter(t.value);r(t.area).setItem(t.key,o)}function o(t,o){try{var n=o.converter(r(o.area).getItem(o.key)),a=(0,e.assign)({},o.props||{});a[o.prop||"value"]=n,t(o.action,a)}catch(c){t(o.error)}}function n(e,t){r(t.area).removeItem(t.key)}function a(r){return[t,(0,e.assign)({converter:r.converter||JSON.stringify},r)]}function c(r){return[o,(0,e.assign)({converter:r.converter||JSON.parse,error:r.error||function(){}},r)]}function i(e){return[n,e]}
},{"../utils.js":"axta"}],"rRh0":[function(require,module,exports) {
"use strict";function t(t,e){var r=e.title||document.title,o=e.url||location.href;history.pushState(e.state,r,o)}function e(t,e){var r=e.title||document.title,o=e.url||location.href;history.replaceState(e.state,r,o)}function r(e){return[t,e]}function o(t){return[e,t]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.HistoryPush=r,exports.HistoryReplace=o;
},{}],"O1vx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Now=r,exports.Delay=u;var e=require("../utils");function t(t,i){(0,e.makeDispatchTime)(t,i)()}function i(t,i){setTimeout((0,e.makeDispatchTime)(t,i),i.wait)}function r(e){return[t,e]}function u(e){return[i,e]}
},{"../utils":"axta"}],"9mw0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.WebSocketSend=n;var e=require("../utils.js");function t(t,n){var o=(0,e.getOpenWebSocket)(n);function r(){o.socket.send(n.data),o.socket.removeEventListener("open",r)}o.socket.readyState===WebSocket.CONNECTING?o.socket.addEventListener("open",r):r()}function n(e){return[t,e]}
},{"../utils.js":"axta"}],"4wop":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Dispatch.js");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});var r=require("./Console.js");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return r[e]}})});var t=require("./Random.js");Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return t[e]}})});var n=require("./Http.js");Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return n[e]}})});var u=require("./Merge.js");Object.keys(u).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return u[e]}})});var o=require("./Debounce.js");Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return o[e]}})});var c=require("./Throttle.js");Object.keys(c).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return c[e]}})});var f=require("./Storage.js");Object.keys(f).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return f[e]}})});var s=require("./History.js");Object.keys(s).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return s[e]}})});var i=require("./Time.js");Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return i[e]}})});var a=require("./WebSocket.js");Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return a[e]}})});
},{"./Dispatch.js":"uPrK","./Console.js":"N/JQ","./Random.js":"7yvb","./Http.js":"30+M","./Merge.js":"i1JQ","./Debounce.js":"zRVn","./Throttle.js":"VAAy","./Storage.js":"0LsL","./History.js":"rRh0","./Time.js":"O1vx","./WebSocket.js":"9mw0"}],"ZNc1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Interval=t;var e=require("../utils");function r(r,t){var n=(0,e.makeDispatchTime)(r,t),u=setInterval(n,t.every);return function(){u&&clearInterval(u)}}function t(e){return[r,e]}
},{"../utils":"axta"}],"G5h2":[function(require,module,exports) {
"use strict";function e(e,n){var t;return t=requestAnimationFrame(function r(i){e(n,i),t=requestAnimationFrame(r)}),function(){cancelAnimationFrame(t)}}function n(n){return[e,n]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Animation=n;
},{}],"1zqQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Keyboard=r;var e=require("../utils.js");function n(n,r){var u=e.makeRemoveListener.bind(null,document,n,r.action),s=r.downs?u("keydown"):null,t=r.ups?u("keyup"):null,o=r.presses?u("keypress"):null;return function(){s&&s(),t&&t(),o&&o()}}function r(e){return[n,e]}
},{"../utils.js":"axta"}],"obIz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.WebSocketListen=t;var e=require("../utils.js");function r(r,t){var s,n=(0,e.getOpenWebSocket)(t),o=(0,e.makeRemoveListener)(n.socket,r,t.action,"message");return n.listeners.push(o),t.error&&(s=(0,e.makeRemoveListener)(n.socket,r,t.error,"error"),n.listeners.push(s)),function(){o&&o(),s&&s(),n.listeners=n.listeners.filter(function(e){return e!==o&&e!==s}),0===n.listeners.length&&(0,e.closeWebSocket)(t)}}function t(e){return[r,e]}
},{"../utils.js":"axta"}],"j2+X":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HistoryPop=r;var e=require("../utils");function t(t,r){return(0,e.makeRemoveListener)(window,t,r.action,"popstate")}function r(e){return[t,e]}
},{"../utils":"axta"}],"IBd2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Time.js");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});var r=require("./Animation.js");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return r[e]}})});var t=require("./Keyboard.js");Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return t[e]}})});var n=require("./WebSocket.js");Object.keys(n).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return n[e]}})});var u=require("./History.js");Object.keys(u).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return u[e]}})});
},{"./Time.js":"ZNc1","./Animation.js":"G5h2","./Keyboard.js":"1zqQ","./WebSocket.js":"obIz","./History.js":"j2+X"}],"nWlM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./fx/index.js");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});var r=require("./subs/index.js");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return r[e]}})});
},{"./fx/index.js":"4wop","./subs/index.js":"IBd2"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("hyperapp"),n=require("@hyperapp/time"),t=require("hyperapp-fx");function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.forEach(function(n){i(e,n,t[n])})}return e}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=function(){return new URLSearchParams(window.location.search.substr(1))},o=function(e){return e.toISOString().slice(0,10)},c=function(e){return e.toISOString().slice(11,19)},a=function(e){return function(n,t){return function e(n,t,i){var u=r({},n);return 1==t.length?u[t[0]]=i:u[t[0]]=e(n[t[0]],t.slice(1),i),u}(n,e.split("."),t.target.value)}},l=function(e){return[function(n){return r({},n,{newTime:r({},n.newTime,{isInUtc:e})})},function(e){return e.target.value}]},m=function(e,n){var t=function(e,n){var t=["ms","s","m","h","d","y"];return[1e3,60,60,24,365].slice(t.indexOf(e),t.indexOf(n)).reduce(function(e,n){return e*n},1)},r=(e>n?e:n)-(e>n?n:e),i=e>n?"up":"down",u=Math.floor(r/t("ms","y")),o=r%t("ms","y"),c=Math.floor(o/t("ms","d")),a=o%t("ms","d"),l=Math.floor(a/t("ms","h")),m=a%t("ms","h"),s=Math.floor(m/t("ms","m")),h=m%t("ms","m");return{count:i,years:u,days:c,hours:l,minutes:s,seconds:Math.floor(h/t("ms","s"))}},s=function(){return"".concat(location.protocol,"//").concat(location.host).concat(location.pathname)},h=function(e,n){return"".concat(s(),"?time=").concat(e,"&event=").concat(n)},p=function(e){var n=new Date("".concat(e.newTime.date,"T").concat(e.newTime.time)+(e.newTime.isInUtc?"Z":""));return[{currentTime:Date.now(),targetTime:n,event:e.newTime.event},(0,t.HistoryPush)({state:e,url:h(n,e.newTime.event)})]},f=function(e,n){return r({},e,{currentTime:n})},d=function(e,n){return e?n:""},v=function(n){var t=function(n,t){return d(n>0,(0,e.h)("p",null,(0,e.h)("strong",null,n)," ",t,n>1?"s":""))},r=m(n.currentTime,n.targetTime);return(0,e.h)("div",null,(0,e.h)("p",null,"down"==r.count?"There are":"It has been"),t(r.years,"year"),t(r.days,"day"),t(r.hours,"hour"),t(r.minutes,"minute"),t(r.seconds,"second"),(0,e.h)("p",null,"down"==r.count?"until":"since"," ",n.event),(0,e.h)("p",null,(0,e.h)("a",{href:h(n.targetTime,n.event)},"Permalink")),(0,e.h)("p",null,(0,e.h)("a",{href:s()},"Return")))},w=function(n){return(0,e.h)("div",null,(0,e.h)("p",null,"Time:"),(0,e.h)("p",null,(0,e.h)("input",{type:"date",value:n.newTime.date,oninput:a("newTime.date")}),(0,e.h)("input",{type:"time",step:"1",value:n.newTime.time,oninput:a("newTime.time")})),(0,e.h)("p",null,(0,e.h)("input",{id:"local",type:"radio",name:"timeZone",value:"local",checked:!n.newTime.isInUtc,onchange:l(!1)}),(0,e.h)("label",{for:"local"},"Local time"),(0,e.h)("input",{id:"utc",type:"radio",name:"timeZone",value:"utc",checked:n.newTime.isInUtc,onchange:l(!0)}),(0,e.h)("label",{for:"utc"},"UTC")),(0,e.h)("p",null,"Event:"),(0,e.h)("input",{type:"text",value:n.newTime.event,oninput:a("newTime.event")}),(0,e.h)("p",null,(0,e.h)("button",{onclick:p},"Count!")))};(0,e.app)({init:function(){return{currentTime:Date.now(),targetTime:u().get("time"),event:u().get("event"),newTime:{date:o(new Date),time:c(new Date),isInUtc:!0,event:""}}},view:function(e){return null===e.targetTime?w(e):v(e)},subscriptions:function(e){return[null!==e.targetTime&&(0,n.interval)(f,{delay:1e3})]},node:document.getElementById("app")});
},{"hyperapp":"2S39","@hyperapp/time":"6+Vs","hyperapp-fx":"nWlM"}]},{},["Focm"], null)