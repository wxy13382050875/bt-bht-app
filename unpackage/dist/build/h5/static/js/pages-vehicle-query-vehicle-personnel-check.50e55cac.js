(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-vehicle-query-vehicle-personnel-check"],{"063d":function(e,t,n){"use strict";var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.market_http=t.bht_http=void 0;var a=r(n("cebc")),i=r(n("5cd0")),o=r(n("1728")),u=new i.default;t.bht_http=u,u.setConfig(function(e){return e.baseUrl=o.default.BASE_BHT_URL,e}),u.validateStatus=function(e){return 200===e.statusCode},u.interceptor.request(function(e,t){return e.header=(0,a.default)({},e.header,{dataType:"json"}),e}),u.interceptor.response(function(e){return e.data},function(e){return uni.showToast({icon:"none",title:"您的网络不给力，请稍后重试！"}),e});var s=new i.default;t.market_http=s,s.setConfig(function(e){return e.baseUrl=o.default.BASE_MARKET_URL,e}),s.validateStatus=function(e){return 200===e.statusCode},s.interceptor.request(function(e,t){return e.header=(0,a.default)({},e.header,{dataType:"json"}),e}),s.interceptor.response(function(e){return e.data},function(e){return uni.showToast({icon:"none",title:"您的网络不给力，请稍后重试！"}),e})},1728:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={BASE_BHT_URL:"https://bht.bt.yndth.cn/api/",BASE_MARKET_URL:"http://market.bt.yndth.cn/api/v1.22/",BASE_TRADEING_URL:"http://www.trade",BASE_SHOPPING_URL:"http://182.92.165.86/mobile"};t.default=r},"2b5b":function(e,t,n){"use strict";var r=n("8aef"),a=n.n(r);a.a},3906:function(e,t,n){"use strict";var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("cebc")),i=n("2f62"),o=n("c856"),u={data:function(){return{dataList:[],listTransform:"translate(0,0)",scrollStart:!1,height:200,params:{}}},created:function(){this.params.organization=this.userInfo.region,this.params.customesCode=this.userInfo.customs,this.list()},computed:(0,a.default)({},(0,i.mapGetters)("user",["userInfo"])),methods:{list:function(){var e=this;(0,o.checkVehicleQuery)(this.params).then(function(t){void 0!==t.data&&(e.dataList=t.data,e.startMove())})},startMove:function(){var e=this;this.$nextTick(function(){var t=33*e.dataList.length;if(t>e.height){e.scrollStart=!0,t*=2;var n=0;setInterval(function(){n-=.3333333333333333,t-e.height===Math.abs(n)&&(n=0,e.listTransform="translate(0,0)"),e.listTransform="translate(0,"+n+"px)"},100)}else e.scrollStart=!1})}}};t.default=u},4399:function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,'.check-query-box-bg[data-v-17790843]{position:relative;z-index:199;height:%?120?%;background:#ef4455}.check-query-main[data-v-17790843]{position:absolute;top:%?20?%;right:0;bottom:0;left:0;padding:0 %?18?%}.check-query-main .check-query-content[data-v-17790843]{height:1381px;background:#fff;-webkit-box-shadow:0 0 16px 0 hsla(0,0%,52.5%,.4);box-shadow:0 0 16px 0 hsla(0,0%,52.5%,.4);border-top-right-radius:10px;border-top-left-radius:10px}.check-query-main .check-query-content .box-title[data-v-17790843]{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?100?%;font-size:%?30?%;color:#383838;background:#fff;border-top-right-radius:10px;border-top-left-radius:10px;z-index:1120}.check-query-main .check-query-content .box-title[data-v-17790843]:before{content:"";height:1px;background-color:#a9a8a8;position:absolute;bottom:0;width:100%}.check-query-main .check-query-content .box-title uni-text[data-v-17790843]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center}.check-query-main .check-query-content .list[data-v-17790843]{-webkit-transition:all 0ms ease-in 0s;-o-transition:all 0ms ease-in 0s;transition:all 0ms ease-in 0s;overflow:hidden;padding:0 %?18?%;font-size:%?28?%;color:#6b6b6b}.check-query-main .check-query-content .list .item[data-v-17790843]{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?70?%}.check-query-main .check-query-content .list .item[data-v-17790843]:before{content:"";height:1px;background-color:#a9a8a8;position:absolute;bottom:0;width:100%}.check-query-main .check-query-content .list .item uni-text[data-v-17790843]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;word-break:break-word;white-space:nowrap}',""])},5281:function(e,t,n){"use strict";n.r(t);var r=n("3906"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);t["default"]=a.a},"5cd0":function(e,t,n){"use strict";var r=n("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("a4bb"));n("ac6a"),n("7f7f");var i=r(n("f499")),o=r(n("cebc")),u=r(n("795b"));n("96cf");var s=r(n("3b8d")),c=r(n("d225")),l=r(n("b0b4")),d=r(n("bd86")),f=function(){function e(){var t=this;(0,c.default)(this,e),(0,d.default)(this,"config",{baseUrl:"",header:{"content-type":"application/json;charset=UTF-8"},method:"GET",dataType:"json",responseType:"text"}),(0,d.default)(this,"interceptor",{request:function(e){e&&(t.requestBeforeFun=e)},response:function(e,n){e&&n&&(t.requestComFun=e,t.requestComFail=n)}})}return(0,l.default)(e,[{key:"requestBeforeFun",value:function(e){return e}},{key:"requestComFun",value:function(e){return e}},{key:"requestComFail",value:function(e){return e}},{key:"validateStatus",value:function(e){return 200===e.statusCode}},{key:"setConfig",value:function(e){this.config=e(this.config)}},{key:"request",value:function(){var t=(0,s.default)(regeneratorRuntime.mark(function t(){var n,r=this,a=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.length>0&&void 0!==a[0]?a[0]:{},n.baseUrl=this.config.baseUrl,n.dataType=n.dataType||this.config.dataType,n.responseType=n.responseType||this.config.responseType,n.url=n.url||"",n.data=n.data||{},n.params=n.params||{},n.header=n.header||this.config.header,n.method=n.method||this.config.method,t.abrupt("return",new u.default(function(t,a){var u=!0,s={};n.complete=function(e){e.config=s,r.validateStatus(e)?(e=r.requestComFun(e),t(e)):(e=r.requestComFail(e),a(e))};var c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,r={errMsg:e,config:t};a(r),u=!1};s=(0,o.default)({},r.requestBeforeFun(n,c));var l=(0,o.default)({},s);if(u){var d=e.posUrl(n.url)?n.url:n.baseUrl+n.url;if("{}"!==(0,i.default)(n.params)){var f=e.addQueryString(n.params);d+=-1===d.indexOf("?")?"?".concat(f):"&".concat(f)}l.url=d,uni.request(l)}}));case 10:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}()},{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.request((0,o.default)({url:e,method:"GET"},t))}},{key:"post",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"POST"},n))}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"PUT"},n))}},{key:"delete",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"DELETE"},n))}},{key:"connect",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"CONNECT"},n))}},{key:"head",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"HEAD"},n))}},{key:"options",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"OPTIONS"},n))}},{key:"trace",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"TRACE"},n))}},{key:"upload",value:function(t,n){var r=this,a=n.filePath,i=n.name,s=n.header,c=n.formData;return new u.default(function(n,u){var l=!0,d={},f={baseUrl:r.config.baseUrl,url:t,filePath:a,method:"UPLOAD",name:i,header:s||r.config.header,formData:c,complete:function(e){e.config=d,200===e.statusCode?(e=r.requestComFun(e),n(e)):(e=r.requestComFail(e),u(e))}},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f,n={errMsg:e,config:t};u(n),l=!1};d=(0,o.default)({},r.requestBeforeFun(f,h));var v=(0,o.default)({},d);l&&(v.url=e.posUrl(t)?t:r.config.baseUrl+t,uni.uploadFile(v))})}}],[{key:"posUrl",value:function(e){return/(http|https):\/\/([\w.]+\/?)\S*/.test(e)}},{key:"addQueryString",value:function(e){var t="";return(0,a.default)(e).forEach(function(n){t+=n+"="+e[n]+"&"}),t.substring(0,t.length-1)}}]),e}();t.default=f},6756:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"app-content"},[n("aca-nav-bar",{attrs:{level:2,title:"待检车辆列表"}}),n("bht-layout-container",[n("v-uni-view",{staticClass:"check-query-box-bg"}),n("v-uni-view",{staticClass:"check-query-main"},[n("v-uni-view",{staticClass:"check-query-content"},[n("v-uni-view",{staticClass:"box-title"},[n("v-uni-text",[e._v("序号")]),n("v-uni-text",[e._v("车牌号")]),n("v-uni-text",[e._v("商品名称")]),n("v-uni-text",[e._v("物理重量")])],1),n("v-uni-view",{ref:"list",staticClass:"list",style:{transform:e.listTransform}},[e._l(e.dataList,function(t,r){return n("v-uni-view",{key:r,ref:"items",refInFor:!0,staticClass:"item"},[n("v-uni-text",[e._v(e._s(r+1))]),n("v-uni-text",[e._v(e._s(t.vehicleNo))]),n("v-uni-text",[e._v(e._s(t.goodsName))]),n("v-uni-text",[e._v(e._s(t.weight))])],1)}),e._l(e.dataList,function(t,r){return e.scrollStart?n("v-uni-view",{key:Math.random(),ref:"items",refInFor:!0,staticClass:"item"},[n("v-uni-text",[e._v(e._s(r+1))]),n("v-uni-text",[e._v(e._s(t.vehicleNo))]),n("v-uni-text",[e._v(e._s(t.goodsName))]),n("v-uni-text",[e._v(e._s(t.weight))])],1):e._e()})],2),0===e.dataList.length?n("v-uni-view",{staticClass:"data-no-tip"},[n("v-uni-image",{attrs:{src:"/static/icon/no_data.gif"}}),n("v-uni-label",{staticClass:"data-no-tip-txt"},[e._v("没有查询到数据～_～")])],1):e._e()],1)],1)],1)],1)},a=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a})},"8aef":function(e,t,n){var r=n("4399");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("4f06").default;a("28a852b0",r,!0,{sourceMap:!1,shadowMode:!1})},c856:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.bordererVehicleQuery=t.bordererGoodsCurQuery=t.bordererGoodsHistoryQuery=t.checkVehicleQuery=t.personneVehiclelQuery=t.goodsPersonnelQuery=void 0;var r=n("063d"),a=function(e){return r.bht_http.get("vendee/query-by-personnel",{params:e})};t.goodsPersonnelQuery=a;var i=function(e){return r.bht_http.get("vehicle/query",{params:e})};t.personneVehiclelQuery=i;var o=function(e){return r.bht_http.get("vehicle/query-wait",{params:e})};t.checkVehicleQuery=o;var u=function(e){return r.bht_http.get("vendee/historyQuery",{params:e})};t.bordererGoodsHistoryQuery=u;var s=function(e){return r.bht_http.get("vendee/query",{params:e})};t.bordererGoodsCurQuery=s;var c=function(e){return r.bht_http.get("vehicle/query",{params:e})};t.bordererVehicleQuery=c},f7d8:function(e,t,n){"use strict";n.r(t);var r=n("6756"),a=n("5281");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("2b5b");var o=n("2877"),u=Object(o["a"])(a["default"],r["a"],r["b"],!1,null,"17790843",null);t["default"]=u.exports}}]);