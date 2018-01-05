/*! VueCurrencyFilter v.2.1.0 */
!function(r,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("VueCurrencyFilter",[],t):"object"==typeof exports?exports.VueCurrencyFilter=t():r.VueCurrencyFilter=t()}("undefined"!=typeof self?self:this,function(){return function(r){function t(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=r,t.c=n,t.d=function(r,n,e){t.o(r,n)||Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:e})},t.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(n,"a",n),n},t.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},t.p="/dist",t(t.s=0)}([function(r,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(1),o=function(r){return r&&r.__esModule?r:{default:r}}(e),a={install:function(r,t){function n(r){return void 0===r}function e(r){a=n(r.symbol)?"":r.symbol,i=n(r.thousandsSeparator)?".":r.thousandsSeparator,u=n(r.fractionCount)?0:r.fractionCount,s=n(r.fractionSeparator)?",":r.fractionSeparator,c=n(r.symbolPosition)?"front":r.symbolPosition,f=!!n(r.symbolSpacing)||r.symbolSpacing}n(t)&&(t={});var a="",i=".",u=0,s=",",c="front",f=!0;e(t),r.filter("currency",function(r,l,p,m,d,y,b){e(t),n(l)||(a=l),n(p)||(i=p),n(m)||(u=m),n(d)||(s=d),n(y)||(c=y),n(b)||(f=b);var v=0,g="-"===String(r).charAt(0);g&&(r=String(r).slice(1));var h=parseFloat(r);isNaN(h)||(v=h);var x="%s%v";return x="front"===c?f?"%s %v":"%s%v":f?"%v %s":"%v%s",v=o.default.formatMoney(r,{format:x,symbol:a,precision:u,thousand:i,decimal:s}),g&&(v="-"+v),v})}};t.default=a},function(r,t,n){/*!
 * accounting.js v0.4.1
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */
!function(n,e){function o(r){return!!(""===r||r&&r.charCodeAt&&r.substr)}function a(r){return m?m(r):"[object Array]"===d.call(r)}function i(r){return r&&"[object Object]"===d.call(r)}function u(r,t){var n;r=r||{},t=t||{};for(n in t)t.hasOwnProperty(n)&&null==r[n]&&(r[n]=t[n]);return r}function s(r,t,n){var e,o,a=[];if(!r)return a;if(p&&r.map===p)return r.map(t,n);for(e=0,o=r.length;e<o;e++)a[e]=t.call(n,r[e],e,r);return a}function c(r,t){return r=Math.round(Math.abs(r)),isNaN(r)?t:r}function f(r){var t=l.settings.currency.format;return"function"==typeof r&&(r=r()),o(r)&&r.match("%v")?{pos:r,neg:r.replace("-","").replace("%v","-%v"),zero:r}:r&&r.pos&&r.pos.match("%v")?r:o(t)?l.settings.currency.format={pos:t,neg:t.replace("%v","-%v"),zero:t}:t}var l={};l.version="0.4.1",l.settings={currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}};var p=Array.prototype.map,m=Array.isArray,d=Object.prototype.toString,y=l.unformat=l.parse=function(r,t){if(a(r))return s(r,function(r){return y(r,t)});if("number"==typeof(r=r||0))return r;t=t||l.settings.number.decimal;var n=new RegExp("[^0-9-"+t+"]",["g"]),e=parseFloat((""+r).replace(/\((.*)\)/,"-$1").replace(n,"").replace(t,"."));return isNaN(e)?0:e},b=l.toFixed=function(r,t){t=c(t,l.settings.number.precision);var n=Math.pow(10,t);return(Math.round(l.unformat(r)*n)/n).toFixed(t)},v=l.formatNumber=l.format=function(r,t,n,e){if(a(r))return s(r,function(r){return v(r,t,n,e)});r=y(r);var o=u(i(t)?t:{precision:t,thousand:n,decimal:e},l.settings.number),f=c(o.precision),p=r<0?"-":"",m=parseInt(b(Math.abs(r||0),f),10)+"",d=m.length>3?m.length%3:0;return p+(d?m.substr(0,d)+o.thousand:"")+m.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+o.thousand)+(f?o.decimal+b(Math.abs(r),f).split(".")[1]:"")},g=l.formatMoney=function(r,t,n,e,o,p){if(a(r))return s(r,function(r){return g(r,t,n,e,o,p)});r=y(r);var m=u(i(t)?t:{symbol:t,precision:n,thousand:e,decimal:o,format:p},l.settings.currency),d=f(m.format);return(r>0?d.pos:r<0?d.neg:d.zero).replace("%s",m.symbol).replace("%v",v(Math.abs(r),c(m.precision),m.thousand,m.decimal))};l.formatColumn=function(r,t,n,e,p,m){if(!r)return[];var d=u(i(t)?t:{symbol:t,precision:n,thousand:e,decimal:p,format:m},l.settings.currency),b=f(d.format),g=b.pos.indexOf("%s")<b.pos.indexOf("%v"),h=0;return s(s(r,function(r,t){if(a(r))return l.formatColumn(r,d);r=y(r);var n=r>0?b.pos:r<0?b.neg:b.zero,e=n.replace("%s",d.symbol).replace("%v",v(Math.abs(r),c(d.precision),d.thousand,d.decimal));return e.length>h&&(h=e.length),e}),function(r,t){return o(r)&&r.length<h?g?r.replace(d.symbol,d.symbol+new Array(h-r.length+1).join(" ")):new Array(h-r.length+1).join(" ")+r:r})},void 0!==r&&r.exports&&(t=r.exports=l),t.accounting=l}()}])});
//# sourceMappingURL=VueCurrencyFilter.bundle.js.map