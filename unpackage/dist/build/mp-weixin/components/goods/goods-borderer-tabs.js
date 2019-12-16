(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/goods/goods-borderer-tabs"],{"6d24":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={props:{i:Number,index:{type:Number,default:function(){return 0}},top:{type:Number,default:152}},data:function(){return{mescroll:null,downOption:{use:!1},upOption:{auto:!1,noMoreSize:4,empty:{tip:"~ 空空如也 ~",btnText:"去看看"}},pdList:[],isInit:!1,scrollY:0}},watch:{index:function(t){this.i!==t||this.isInit||(this.isInit=!0,this.mescroll.triggerDownScroll())}},methods:{mescrollInit:function(t){this.mescroll=t},upCallback:function(t){}}};n.default=o},d173:function(t,n,e){"use strict";e.r(n);var o=e("6d24"),u=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);n["default"]=u.a},e390:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},f472:function(t,n,e){"use strict";e.r(n);var o=e("e390"),u=e("d173");for(var r in u)"default"!==r&&function(t){e.d(n,t,function(){return u[t]})}(r);var i=e("2877"),l=Object(i["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/goods/goods-borderer-tabs-create-component',
    {
        'components/goods/goods-borderer-tabs-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f472"))
        })
    },
    [['components/goods/goods-borderer-tabs-create-component']]
]);                
