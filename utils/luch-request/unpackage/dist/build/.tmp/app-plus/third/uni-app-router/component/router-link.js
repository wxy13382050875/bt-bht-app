(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["third/uni-app-router/component/router-link"],{"12d0":function(t,e,n){"use strict";n.r(e);var a=n("8da6"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=r.a},"344a":function(t,e,n){"use strict";n.r(e);var a=n("f168"),r=n("12d0");for(var u in r)"default"!==u&&function(t){n.d(e,t,function(){return r[t]})}(u);var o,l=n("f0c5"),c=Object(l["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},"8da6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={push:"push",replace:"replace",replaceAll:"replaceAll",pushTab:"pushTab"},a={props:{to:{type:String,default:""},stopNavto:{type:Boolean,default:!1},navType:{type:String,default:"push"},level:{type:Number,default:1},append:{type:Boolean,default:!1}},methods:{formatNav:function(t){t=t.replace(/\'/g,""),t=t.replace(/(\w+)(?=:)/g,function(t){return'"'.concat(t,'"')}),t=t.replace(/:\s*([^,{}\s"]+)/g,function(t){var e=t.split(":");return':"'.concat(e[1].trim(),'"')});try{t=JSON.parse(t)}catch(n){}if(this.append){var e=this.$Route.path.split("/");e.splice(e.length-this.level,this.level),e=e.join("/"),t.constructor===Object?t.path&&(t.path=e+t.path):t=e+t}return t},gotoPage:function(){if(this.stopNavto)return!0;var e=n[this.navType];if(null==e)return t("error",' "navType" unknown type \n\n value：'.concat(Object.values(n).join("、"))," at third\\uni-app-router\\component\\router-link.vue:72");var a=this.formatNav(this.to);this.$Router[e](a)}}};e.default=a}).call(this,n("0de9")["default"])},f168:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'third/uni-app-router/component/router-link-create-component',
    {
        'third/uni-app-router/component/router-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("344a"))
        })
    },
    [['third/uni-app-router/component/router-link-create-component']]
]);
