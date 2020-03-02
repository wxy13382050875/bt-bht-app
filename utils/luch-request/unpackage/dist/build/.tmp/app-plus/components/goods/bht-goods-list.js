(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goods/bht-goods-list"],{"1f2b":function(t,e,n){"use strict";n.r(e);var r=n("316f"),u=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e["default"]=u.a},"20c7":function(t,e,n){"use strict";n.r(e);var r=n("ffa4"),u=n("1f2b");for(var o in u)"default"!==o&&function(t){n.d(e,t,function(){return u[t]})}(o);var f,c=n("f0c5"),a=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],f);e["default"]=a.exports},"316f":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62"),u=n("5046");function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){f(t,e,n[e])})}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={props:{dataList:{type:Array,default:function(){return[]}}},data:function(){return{regionTxt:""}},computed:o({},(0,r.mapGetters)({userInfo:"user/userInfo"})),created:function(){this.regionTxt=(0,u.getRegionText)(this.userInfo.region)}};e.default=c},ffa4:function(t,e,n){"use strict";var r,u=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return u}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return r})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goods/bht-goods-list-create-component',
    {
        'components/goods/bht-goods-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("20c7"))
        })
    },
    [['components/goods/bht-goods-list-create-component']]
]);
