!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("clickr",[],t):"object"==typeof exports?exports.clickr=t():e.clickr=t()}(this,(function(){return function(e){function t(t){for(var o,s,a=t[0],c=t[1],l=t[2],f=0,p=[];f<a.length;f++)s=a[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(u&&u(t);p.length;)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(o=!1)}o&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},i={0:0},r=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=this.webpackJsonpclickr=this.webpackJsonpclickr||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var u=c;return r.push([4,1]),n()}([,function(e,t){},,function(e,t){},function(e,t,n){"use strict";n.r(t);var o=n(0),i=new o.Point(0,0);function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.freeze(i);var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),a(this,"geometry",void 0),a(this,"placedGeo",void 0),a(this,"_scope",void 0),a(this,"_pointMap",void 0),a(this,"_callBack",void 0),this.geometry=e.getSymbol()}return s(e,null,[{key:"getSymbol",value:function(){if(void 0===e.symbol){var t=new o.Path.Circle(i,10);t.fillColor=o.Color.random(),e.symbol=new o.SymbolDefinition(t),t.strokeColor=o.Color.random(),t.strokeWidth=0,t.strokeScaling=!1,t.onFrame=function(){t.fillColor.hue+=.5},t.onMouseEnter=function(){console.log("enter"),t.strokeWidth=2},t.onMouseLeave=function(){console.log("Leave"),t.strokeWidth=0}}return e.symbol}}]),s(e,[{key:"init",value:function(){if(void 0!==this._scope){var e=new o.Point(Math.floor(Math.random()*this._scope.view.size.width),Math.floor(Math.random()*this._scope.view.size.height));this.placedGeo=this.geometry.place(e),this.placedGeo.fillColor=o.Color.random(),this._scope.project.activeLayer.addChild(this.placedGeo),this.addEvents()}else console.error("Scope undefined")}},{key:"addEvents",value:function(){var e=this;void 0!==this.placedGeo?(this.placedGeo.onClick=function(){void 0!==e._callBack&&e._callBack(),e.placedGeo.remove(),e._pointMap.delete(e.id)},this.placedGeo.onFrame=function(t){t.count%10==0&&(e.placedGeo.scaling=e.placedGeo.scaling.add(.1)),e.placedGeo.fillColor.hue+=1}):console.error("Geo undefined")}},{key:"scope",set:function(e){this._scope=e}},{key:"id",get:function(){return this.placedGeo.id}},{key:"pointMap",set:function(e){this._pointMap=e}},{key:"callBack",set:function(e){this._callBack=e}}]),e}();function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}a(c,"symbol",void 0);var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,"intervalId",void 0),u(this,"offset",void 0),u(this,"clock",0),u(this,"element",void 0),this.element=t}var t,n,o;return t=e,(n=[{key:"start",value:function(){this.reset(),void 0===this.intervalId&&(this.offset=Date.now(),this.intervalId=setInterval(this.update.bind(this),1))}},{key:"stop",value:function(){void 0!==this.intervalId&&(clearInterval(this.intervalId),this.intervalId=void 0)}},{key:"reset",value:function(){this.clock=0,this.render()}},{key:"getTime",value:function(){return this.clock}},{key:"update",value:function(){this.clock+=this.delta(),this.render()}},{key:"render",value:function(){this.element.innerText=String(this.clock/1e3)}},{key:"delta",value:function(){var e=Date.now(),t=e-this.offset;return this.offset=e,t}}])&&l(t.prototype,n),o&&l(t,o),e}();function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"default",(function(){return d}));var d=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),h(this,"_canvas",void 0),h(this,"_points",void 0),h(this,"timer",void 0),h(this,"done",!1),h(this,"pointNum",30),h(this,"counter",0),h(this,"_scope",void 0),h(this,"button",void 0),h(this,"count",void 0),h(this,"countMax",void 0),this.setupDisplay(),this.setupCanvas(),this.setupScope(),this._points=new Map,this.button=document.getElementById("start"),this.button.addEventListener("click",(function(){t.start()})),this.count=document.getElementById("count"),this.countMax=document.getElementById("countMax")}var t,n,i;return t=e,(n=[{key:"start",value:function(){var e=this;this.button.style.display="none",this.countMax.innerText=String(this.pointNum),this._scope.project.activeLayer.onFrame=function(t){var n;e.done||(30===e._points.size&&(e.done=!0),t.count%5==0&&((n=new c).pointMap=e._points,n.scope=e._scope,n.init(),n.callBack=function(){console.log("SIZE: "+e._points.size),e.counter++,e.count.innerText=String(e.counter),1===e._points.size&&e.stop()},e._points.set(n.id,n)))},this.timer.start()}},{key:"stop",value:function(){this._scope.project.activeLayer.onFrame=null,this._scope.project.activeLayer.onClick=null,this.timer.stop(),this.button.style.display="",this.done=!1,this.counter=0}},{key:"setupDisplay",value:function(){var e=document.getElementById("timer");this.timer=new f(e)}},{key:"setupCanvas",value:function(){this._canvas=document.createElement("canvas"),this._canvas.addEventListener("contextmenu",(function(e){return e.preventDefault()})),this._canvas.setAttribute("data-paper-resize","true"),this._canvas.setAttribute("tabindex","1"),this._canvas.style["touch-action"]="none",this._canvas.style.outline="none",this._canvas.id="clickr",document.body.appendChild(this._canvas)}},{key:"setupScope",value:function(){this._scope=new o.PaperScope,this._scope.settings.insertItems=!1,this._scope.settings.applyMatrix=!1,this._scope.activate(),this._scope.setup(this.canvas),this._scope.project.view.viewSize=new o.Size(document.body.offsetWidth,document.body.offsetHeight)}},{key:"canvas",get:function(){if(void 0===this._canvas)throw new Error("Canvas not initialized in menu");return this._canvas}}])&&p(t.prototype,n),i&&p(t,i),e}()}])}));