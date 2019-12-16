(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goods/bht-goods-list"],{"425d":function(t,e,n){"use strict";n.r(e);var r=n("ec2b"),o=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);e["default"]=o.a},b337:function(t,e,n){"use strict";n.r(e);var r=n("f8b2"),o=n("425d");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);var a=n("2877"),c=Object(a["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports},ec2b:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62"),o=n("fa6d");function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={props:{dataList:{type:Array,default:function(){return[]}}},data:function(){return{regionTxt:""}},computed:u({},(0,r.mapGetters)({userInfo:"user/userInfo"})),created:function(){this.regionTxt=(0,o.getRegionText)(this.userInfo.region)}};e.default=c},f8b2:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return o})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goods/bht-goods-list-create-component',
    {
        'components/goods/bht-goods-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("b337"))
        })
    },
    [['components/goods/bht-goods-list-create-component']]
]);                
