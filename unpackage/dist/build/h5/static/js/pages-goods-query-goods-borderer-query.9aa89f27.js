(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-query-goods-borderer-query"],{"063d":function(e,t,a){"use strict";var n=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.market_http=t.bht_http=void 0;var i=n(a("cebc")),r=n(a("5cd0")),o=n(a("1728")),u=new r.default;t.bht_http=u,u.setConfig(function(e){return e.baseUrl=o.default.BASE_BHT_URL,e}),u.validateStatus=function(e){return 200===e.statusCode},u.interceptor.request(function(e,t){return e.header=(0,i.default)({},e.header,{dataType:"json"}),e}),u.interceptor.response(function(e){return e.data},function(e){return uni.showToast({icon:"none",title:"您的网络不给力，请稍后重试！"}),e});var l=new r.default;t.market_http=l,l.setConfig(function(e){return e.baseUrl=o.default.BASE_MARKET_URL,e}),l.validateStatus=function(e){return 200===e.statusCode},l.interceptor.request(function(e,t){return e.header=(0,i.default)({},e.header,{dataType:"json"}),e}),l.interceptor.response(function(e){return e.data},function(e){return uni.showToast({icon:"none",title:"您的网络不给力，请稍后重试！"}),e})},"0c52":function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,'.app-query-tabs-warp[data-v-68f4f269]{position:fixed;left:0;width:100%;height:%?70?%;background-color:#fff}.app-query-tabs-warp .nav[data-v-68f4f269]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?70?%;text-align:center;font-size:%?30?%}.app-query-tabs-warp .nav .nav-items[data-v-68f4f269]{position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.app-query-tabs-warp .nav .active[data-v-68f4f269]{position:relative;color:#fe5b06}.app-query-tabs-warp .nav .active[data-v-68f4f269]:before{content:"";position:absolute;left:0;bottom:0;right:0;border-bottom:1px solid #fe5a07}.app-tabs-query-content[data-v-68f4f269]{position:absolute;top:%?70?%;right:0;bottom:0;left:0}',""])},"12a7":function(e,t,a){"use strict";var n=a("5600"),i=a.n(n);i.a},1580:function(e,t,a){"use strict";a.r(t);var n=a("eb4f"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=i.a},1728:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={BASE_BHT_URL:"https://bht.bt.yndth.cn/api/",BASE_MARKET_URL:"http://market.bt.yndth.cn/api/v1.22/",BASE_TRADEING_URL:"http://www.trade",BASE_SHOPPING_URL:"http://182.92.165.86/mobile"};t.default=n},"1a22":function(e,t,a){var n=a("8bb7");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("5329ec3a",n,!0,{sourceMap:!1,shadowMode:!1})},"1fde":function(e,t,a){"use strict";a.r(t);var n=a("401f"),i=a("1580");for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);a("3641");var o=a("2877"),u=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"002cf02b",null);t["default"]=u.exports},"23aa":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.total=t.getRegionText=void 0,a("7f7f"),a("ac6a");var n=function(e){var t="";return regionData.forEach(function(a){a.children.forEach(function(a){e==a.value&&(t=a.label)})}),t};t.getRegionText=n;var i=function(e){for(var t={},a=[],n=0;n<e.length;n++){var i=e[n];if(t[i.declareNo])for(var r=0;r<a.length;r++){var o=a[r];if(o.declareNo==i.declareNo){o.data.push(i);break}}else a.push({declareNo:i.declareNo,name:i.name,data:[i]}),t[i.declareNo]=i}return a},r=function(e){if(null==e)return[];var t=i(e);return t.forEach(function(e){var t=0,a=0,n=0,i="",r="",o="";e.data.forEach(function(e){a+=e.amount,t+=e.weight,n++,r=e.datetime,o=e.vehicleNo}),e.totalWeight=t,e.totalAmount=a,e.count=n,e.status="已申报",e.region=i,e.vehicleNo=o,e.datetime=r}),t};t.total=r},"31ff":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"app-content"},[a("aca-nav-bar",{attrs:{level:2,title:"商品申报查询"}}),a("bht-layout-container",[a("v-uni-view",{staticClass:"app-query-tabs-warp",style:{top:e.navHeight+"px"}},[a("v-uni-view",{staticClass:"nav"},e._l(e.tabs,function(t,n){return a("v-uni-view",{key:n,staticClass:"nav-items",class:{active:e.curIndex===n},on:{click:function(t){t=e.$handleEvent(t),e.changeTab(n)}}},[e._v(e._s(t))])}),1)],1),a("v-uni-view",{staticClass:"app-tabs-query-content"},[a("bht-goods-borderer-tabs-cur",{attrs:{i:0,index:e.curIndex}}),a("bht-goods-borderer-tabs-his",{attrs:{i:1,index:e.curIndex}})],1)],1)],1)},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})},3641:function(e,t,a){"use strict";var n=a("1a22"),i=a.n(n);i.a},"401f":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.i===e.index,expression:"i === index"}]},[a("v-uni-view",{staticClass:"wrapper"},[a("mescroll-uni",{attrs:{fixed:!1,down:e.downOption,up:e.upOption},on:{down:function(t){t=e.$handleEvent(t),e.downCallback(t)},up:function(t){t=e.$handleEvent(t),e.upCallback(t)},init:function(t){t=e.$handleEvent(t),e.mescrollInit(t)}}},[e._l(e.dataList,function(t){return a("v-uni-view",{key:t.declareNo,staticClass:"goods-items"},[a("v-uni-view",{staticClass:"goods-header"},[a("v-uni-label",[e._v("申报状态")]),a("v-uni-label",[e._v(e._s(t.status))])],1),e._l(t.data,function(t){return a("v-uni-view",{key:t.aa,staticClass:"goods-item"},[a("v-uni-label",{staticClass:"goods-name"},[e._v(e._s(t.goodsName))]),a("v-uni-view",{staticClass:"goods-d"},[a("v-uni-label",[e._v("¥"+e._s(t.amount))]),a("v-uni-label",{staticClass:"goods-count"},[e._v("x1")])],1)],1)}),a("v-uni-view",{staticClass:"goods-total"},[a("v-uni-label",[e._v("共"+e._s(t.count)+"商品  合计:¥"+e._s(t.totalAmount))])],1),a("v-uni-view",{staticClass:"goods-location"},[a("v-uni-label",[e._v(e._s(e.regionTxt))]),a("v-uni-label",[e._v(e._s(t.datetime))]),a("v-uni-label",[e._v(e._s(t.vehicleNo))])],1)],2)}),0===e.dataList.length?a("v-uni-view",{staticClass:"data-no-tip"},[a("v-uni-image",{attrs:{src:"/static/icon/no_data.gif"}}),a("v-uni-label",{staticClass:"data-no-tip-txt"},[e._v("没有查询到数据～_～")])],1):e._e()],2)],1)],1)},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})},"444a":function(e,t,a){"use strict";var n=a("45ca"),i=a.n(n);i.a},"45ca":function(e,t,a){var n=a("0c52");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("214d9498",n,!0,{sourceMap:!1,shadowMode:!1})},"469fc":function(e,t,a){"use strict";a.r(t);var n=a("5531"),i=a("5372");for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);a("12a7");var o=a("2877"),u=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"67ab3851",null);t["default"]=u.exports},5372:function(e,t,a){"use strict";a.r(t);var n=a("886a"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=i.a},5531:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.i===e.index,expression:"i === index"}]},[a("v-uni-view",{staticClass:"wrapper"},[a("mescroll-uni",{attrs:{fixed:!1,down:e.downOption,up:e.upOption},on:{down:function(t){t=e.$handleEvent(t),e.downCallback(t)},up:function(t){t=e.$handleEvent(t),e.upCallback(t)},init:function(t){t=e.$handleEvent(t),e.mescrollInit(t)}}},[e._l(e.dataList,function(t){return a("v-uni-view",{key:t.declareNo,staticClass:"goods-items"},[a("v-uni-view",{staticClass:"goods-header"},[a("v-uni-label",[e._v("申报状态")]),a("v-uni-label",[e._v(e._s(t.status))])],1),e._l(t.data,function(t){return a("v-uni-view",{key:t.aa,staticClass:"goods-item"},[a("v-uni-label",{staticClass:"goods-name"},[e._v(e._s(t.goodsName))]),a("v-uni-view",{staticClass:"goods-d"},[a("v-uni-label",[e._v("¥"+e._s(t.amount))]),a("v-uni-label",{staticClass:"goods-count"},[e._v("x1")])],1)],1)}),a("v-uni-view",{staticClass:"goods-total"},[a("v-uni-label",[e._v("共"+e._s(t.count)+"商品  合计:¥"+e._s(t.totalAmount))])],1),a("v-uni-view",{staticClass:"goods-location"},[a("v-uni-label",[e._v(e._s(e.regionTxt))]),a("v-uni-label",[e._v(e._s(t.datetime))]),a("v-uni-label",[e._v(e._s(t.vehicleNo))])],1)],2)}),0===e.dataList.length?a("v-uni-view",{staticClass:"data-no-tip"},[a("v-uni-image",{attrs:{src:"/static/icon/no_data.gif"}}),a("v-uni-label",{staticClass:"data-no-tip-txt"},[e._v("没有查询到数据～_～")])],1):e._e()],2)],1)],1)},i=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return i})},5600:function(e,t,a){var n=a("8663");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("5285eae2",n,!0,{sourceMap:!1,shadowMode:!1})},"5cd0":function(e,t,a){"use strict";var n=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("a4bb"));a("ac6a"),a("7f7f");var r=n(a("f499")),o=n(a("cebc")),u=n(a("795b"));a("96cf");var l=n(a("3b8d")),s=n(a("d225")),c=n(a("b0b4")),d=n(a("bd86")),f=function(){function e(){var t=this;(0,s.default)(this,e),(0,d.default)(this,"config",{baseUrl:"",header:{"content-type":"application/json;charset=UTF-8"},method:"GET",dataType:"json",responseType:"text"}),(0,d.default)(this,"interceptor",{request:function(e){e&&(t.requestBeforeFun=e)},response:function(e,a){e&&a&&(t.requestComFun=e,t.requestComFail=a)}})}return(0,c.default)(e,[{key:"requestBeforeFun",value:function(e){return e}},{key:"requestComFun",value:function(e){return e}},{key:"requestComFail",value:function(e){return e}},{key:"validateStatus",value:function(e){return 200===e.statusCode}},{key:"setConfig",value:function(e){this.config=e(this.config)}},{key:"request",value:function(){var t=(0,l.default)(regeneratorRuntime.mark(function t(){var a,n=this,i=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=i.length>0&&void 0!==i[0]?i[0]:{},a.baseUrl=this.config.baseUrl,a.dataType=a.dataType||this.config.dataType,a.responseType=a.responseType||this.config.responseType,a.url=a.url||"",a.data=a.data||{},a.params=a.params||{},a.header=a.header||this.config.header,a.method=a.method||this.config.method,t.abrupt("return",new u.default(function(t,i){var u=!0,l={};a.complete=function(e){e.config=l,n.validateStatus(e)?(e=n.requestComFun(e),t(e)):(e=n.requestComFail(e),i(e))};var s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,n={errMsg:e,config:t};i(n),u=!1};l=(0,o.default)({},n.requestBeforeFun(a,s));var c=(0,o.default)({},l);if(u){var d=e.posUrl(a.url)?a.url:a.baseUrl+a.url;if("{}"!==(0,r.default)(a.params)){var f=e.addQueryString(a.params);d+=-1===d.indexOf("?")?"?".concat(f):"&".concat(f)}c.url=d,uni.request(c)}}));case 10:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}()},{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.request((0,o.default)({url:e,method:"GET"},t))}},{key:"post",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"POST"},a))}},{key:"put",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"PUT"},a))}},{key:"delete",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"DELETE"},a))}},{key:"connect",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"CONNECT"},a))}},{key:"head",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"HEAD"},a))}},{key:"options",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"OPTIONS"},a))}},{key:"trace",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,o.default)({url:e,data:t,method:"TRACE"},a))}},{key:"upload",value:function(t,a){var n=this,i=a.filePath,r=a.name,l=a.header,s=a.formData;return new u.default(function(a,u){var c=!0,d={},f={baseUrl:n.config.baseUrl,url:t,filePath:i,method:"UPLOAD",name:r,header:l||n.config.header,formData:s,complete:function(e){e.config=d,200===e.statusCode?(e=n.requestComFun(e),a(e)):(e=n.requestComFail(e),u(e))}},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f,a={errMsg:e,config:t};u(a),c=!1};d=(0,o.default)({},n.requestBeforeFun(f,v));var p=(0,o.default)({},d);c&&(p.url=e.posUrl(t)?t:n.config.baseUrl+t,uni.uploadFile(p))})}}],[{key:"posUrl",value:function(e){return/(http|https):\/\/([\w.]+\/?)\S*/.test(e)}},{key:"addQueryString",value:function(e){var t="";return(0,i.default)(e).forEach(function(a){t+=a+"="+e[a]+"&"}),t.substring(0,t.length-1)}}]),e}();t.default=f},"6b85":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.regionData=void 0;var n=[{value:"8603",label:"瑞丽海关",children:[{value:"860301",label:"瑞丽互市"}]},{value:"8602",label:"畹町海关",children:[{value:"860201",label:"畹町互市"}]},{value:"8604",label:"章凤海关",children:[{value:"860401",label:"章凤互市"}]},{value:"8605",label:"盈江海关",children:[{value:"860501",label:"那邦互市"}]},{value:"8606",label:"孟连海关",children:[{value:"860601",label:"勐阿互市"},{value:"860602",label:"芒信互市"}]},{value:"8607",label:"南伞海关",children:[{value:"860701",label:"南伞互市"}]},{value:"8608",label:"孟定海关",children:[{value:"860801",label:"清水河互市"},{value:"860802",label:"芒卡互市"}]},{value:"8609",label:"打洛海关",children:[{value:"860901",label:"打洛互市"}]},{value:"8610",label:"腾冲海关",children:[{value:"861001",label:"猴桥互市"}]},{value:"8611",label:"沧源海关",children:[{value:"861101",label:"永和互市"}]},{value:"8612",label:"勐腊海关",children:[{value:"861201",label:"磨憨互市"},{value:"861202",label:"岔河互市"}]},{value:"8613",label:"河口海关",children:[{value:"861301",label:"河口北山互市"}]},{value:"8614",label:"金水河关",children:[{value:"861401",label:"金水河互市"}]},{value:"8615",label:"天保海关",children:[{value:"861501",label:"天保互市"}]},{value:"8622",label:"西双版纳",children:[{value:"862201",label:"勐龙互市"}]},{value:"8631",label:"勐康海关",children:[{value:"863101",label:"勐康互市"}]}];t.regionData=n},8663:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".wrapper[data-v-67ab3851]{height:100vh}",""])},"886a":function(e,t,a){"use strict";var n=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("cebc"));a("c5f6");var r=a("2f62"),o=a("c856"),u=a("23aa"),l=a("fa6d"),s={props:{i:Number,index:{type:Number,default:function(){return 0}}},data:function(){return{mescroll:null,downOption:{autoShowLoading:!0,textInOffset:"下拉即可刷新...",textOutOffset:"松开即可刷新...",textLoading:"努力加载中..."},upOption:{auto:!1,noMoreSize:5,empty:{tip:"没有查询到数据"}},dataList:[],isInit:!1,params:{}}},computed:(0,i.default)({},(0,r.mapGetters)({userInfo:"user/userInfo"})),created:function(){this.params.idCode=this.userInfo.idCode,this.params.region=this.userInfo.region,this.params.type=this.userInfo.type,this.regionTxt=(0,l.getRegionText)(this.userInfo.region)},watch:{index:function(e){this.i===e&&(this.isInit=!0,this.mescroll.triggerDownScroll())}},methods:{mescrollInit:function(e){this.mescroll=e},upCallback:function(e){var t=this;(0,o.bordererGoodsHistoryQuery)(this.params).then(function(a){var n=(0,u.total)(a.results);t.dataList=n,e.endSuccess()})},downCallback:function(e){e.resetUpScroll()}}};t.default=s},"8bb7":function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".wrapper[data-v-002cf02b]{height:100vh;font-size:%?28?%}.goods-items[data-v-002cf02b]{margin-bottom:10px;width:100%;background:#fff}.goods-header[data-v-002cf02b]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 10px;border-bottom:1px solid #f5f5f5;height:32px;font-size:14px}.goods-item[data-v-002cf02b]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:10px 10px 0 10px;border-bottom:1px solid #f5f5f5}.goods-count[data-v-002cf02b]{padding:10px 0;color:#8d8d8d}.goods-name[data-v-002cf02b]{-webkit-box-flex:50%;-webkit-flex:50%;-ms-flex:50%;flex:50%}.goods-d[data-v-002cf02b]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;text-align:right}.goods-total[data-v-002cf02b]{padding-right:10px;height:32px;line-height:32px;text-align:right}.goods-location[data-v-002cf02b]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:0 10px;height:42px;line-height:42px}.goods-location i[data-v-002cf02b]{padding-right:5px}.goods-items[data-v-002cf02b]:last-child{margin-bottom:0}",""])},9176:function(e,t,a){"use strict";a.r(t);var n=a("31ff"),i=a("e3d9");for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);a("444a");var o=a("2877"),u=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,"68f4f269",null);t["default"]=u.exports},b489:function(e,t,a){"use strict";var n=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("cebc")),r=a("2f62"),o=n(a("1fde")),u=n(a("469fc")),l={components:{BhtGoodsBordererTabsCur:o.default,BhtGoodsBordererTabsHis:u.default},data:function(){return{tabs:["申报查询","历史申报"],curIndex:0}},computed:(0,i.default)({},(0,r.mapGetters)("utp",["navHeight"])),methods:{changeTab:function(e){this.curIndex=e}}};t.default=l},c856:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.bordererVehicleQuery=t.bordererGoodsCurQuery=t.bordererGoodsHistoryQuery=t.checkVehicleQuery=t.personneVehiclelQuery=t.goodsPersonnelQuery=void 0;var n=a("063d"),i=function(e){return n.bht_http.get("vendee/query-by-personnel",{params:e})};t.goodsPersonnelQuery=i;var r=function(e){return n.bht_http.get("vehicle/query",{params:e})};t.personneVehiclelQuery=r;var o=function(e){return n.bht_http.get("vehicle/query-wait",{params:e})};t.checkVehicleQuery=o;var u=function(e){return n.bht_http.get("vendee/historyQuery",{params:e})};t.bordererGoodsHistoryQuery=u;var l=function(e){return n.bht_http.get("vendee/query",{params:e})};t.bordererGoodsCurQuery=l;var s=function(e){return n.bht_http.get("vehicle/query",{params:e})};t.bordererVehicleQuery=s},e3d9:function(e,t,a){"use strict";a.r(t);var n=a("b489"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=i.a},eb4f:function(e,t,a){"use strict";var n=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("cebc"));a("c5f6");var r=a("2f62"),o=a("c856"),u=a("23aa"),l=a("fa6d"),s={props:{i:Number,index:{type:Number,default:function(){return 0}}},data:function(){return{mescroll:null,downOption:{autoShowLoading:!0,textInOffset:"下拉即可刷新...",textOutOffset:"松开即可刷新...",textLoading:"努力加载中..."},upOption:{auto:!1,noMoreSize:5,empty:{tip:"没有查询到数据"}},dataList:[],isInit:!1,params:{},regionTxt:""}},computed:(0,i.default)({},(0,r.mapGetters)({userInfo:"user/userInfo"})),created:function(){this.params.idCode=this.userInfo.idCode,this.params.region=this.userInfo.region,this.params.type=this.userInfo.type,this.regionTxt=(0,l.getRegionText)(this.userInfo.region)},watch:{index:function(e){this.i!==e||this.isInit||(this.isInit=!0,this.mescroll.triggerDownScroll())}},methods:{mescrollInit:function(e){this.mescroll=e},upCallback:function(e){var t=this;(0,o.bordererGoodsCurQuery)(this.params).then(function(a){var n=(0,u.total)(a.results);t.dataList=n,e.endSuccess()})},downCallback:function(e){e.resetUpScroll()}}};t.default=s},fa6d:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.total=t.getRegionText=void 0,a("7f7f"),a("ac6a");var n=a("6b85"),i=function(e){var t="";return n.regionData.forEach(function(a){a.children.forEach(function(a){e==a.value&&(t=a.label)})}),t};t.getRegionText=i;var r=function(e){for(var t={},a=[],n=0;n<e.length;n++){var i=e[n];if(t[i.declareNo])for(var r=0;r<a.length;r++){var o=a[r];if(o.declareNo==i.declareNo){o.data.push(i);break}}else a.push({declareNo:i.declareNo,name:i.name,data:[i]}),t[i.declareNo]=i}return a},o=function(e){if(null==e)return[];var t=r(e);return t.forEach(function(e){var t=0,a=0,n=0,r="",o="",u="";e.data.forEach(function(e){a+=e.amount,t+=e.weight,n++,o=e.datetime,r=i(e.region),u=e.vehicleNo}),e.totalWeight=t,e.totalAmount=a,e.count=n,e.status="已申报",e.region=r,e.vehicleNo=u,e.datetime=o}),t};t.total=o}}]);