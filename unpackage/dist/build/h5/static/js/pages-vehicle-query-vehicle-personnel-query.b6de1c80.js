(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-vehicle-query-vehicle-personnel-query"],{"0f41":function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("cebc")),s=a("2f62"),o=i(a("74ac")),r=a("6c9d"),u={components:{PopupNavBar:o.default},props:{value:{type:Boolean,default:!1}},data:function(){return{show:this.value,formData:{vehicleNo:"",startDate:(0,r.formatterDate)(new Date,"YY-MM-DD"),endDate:(0,r.formatterDate)(new Date,"YY-MM-DD"),status:"A",inOut:"I"},rangeDate:{start:(0,r.minusDate)(-4),end:(0,r.formatterDate)(new Date,"YY-MM-DD")},showDateTxt:(0,r.formatterDate)(new Date,"YY-MM-DD")+"/"+(0,r.formatterDate)(new Date,"YY-MM-DD")}},computed:(0,n.default)({},(0,s.mapGetters)("user",["userInfo"])),watch:{value:function(t,e){this.show=t},formData:{handler:function(t,e){this.showDateTxt=t.startDate+"/"+t.endDate},deep:!0}},created:function(){this.formData.organization=this.userInfo.region,this.formData.customesCode=this.userInfo.customs,this.formData.paperType=this.userInfo.type,this.$emit("initModalData",this.formData)},methods:{backEvent:function(){this.show=!1,this.$emit("input",this.show)},flagRadioChange:function(t){this.formData.inOut=t.target.value},statusRadioChange:function(t){this.formData.status=t.target.value},queryEvent:function(t){this.backEvent(),this.$emit("queryEvent",this.formData)},restForm:function(){this.formData.vehicleNo="",this.formData.startDate=(0,r.formatterDate)(new Date,"YY-MM-DD"),this.formData.endDate=(0,r.formatterDate)(new Date,"YY-MM-DD"),this.formData.inOut="I",this.formData.status="A"},showCalendar:function(){this.$refs.calendar.open()},confirm:function(t){var e=t.range,a=t.fulldate;return""!=e.begin&&""!=e.end?(this.formData.startDate=e.begin,void(this.formData.endDate=e.end)):(this.formData.startDate=a,void(this.formData.endDate=a))}}};e.default=u},"13e2":function(t,e,a){"use strict";a.r(e);var i=a("d30e"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},"1ee6":function(t,e,a){"use strict";a.r(e);var i=a("8d06"),n=a("13e2");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);var o=a("2877"),r=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"4b4d8aac",null);e["default"]=r.exports},"21d1":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".aca-popup[data-v-4b89f070]{position:fixed;top:0;right:0;left:0;bottom:0;background:#fff;z-index:19931120}.form-wrapper[data-v-4b89f070]{padding:0 %?18?%}.form-wrapper .form-item[data-v-4b89f070]{margin-top:%?20?%}.form-wrapper .form-item .form-title[data-v-4b89f070]{margin-bottom:%?10?%;font-size:%?30?%;color:#383838}.form-wrapper .form-item .form-input[data-v-4b89f070]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?80?%;background:#f2f2f2;border-radius:8px}.form-wrapper .form-item .form-input .input[data-v-4b89f070]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding-left:%?20?%;font-size:%?28?%}.form-wrapper .form-btn[data-v-4b89f070]{margin-top:%?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.form-wrapper .form-btn .query-btn[data-v-4b89f070],.form-wrapper .form-btn .rest-btn[data-v-4b89f070]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:%?94?%;font-size:%?34?%}.form-wrapper .form-btn .rest-btn[data-v-4b89f070]{background:#f2f2f2;color:#383838}.form-wrapper .form-btn .query-btn[data-v-4b89f070]{background:#f33;color:#fff}.radio[data-v-4b89f070]{margin-right:%?18?%;font-size:%?28?%}",""])},"419b":function(t,e,a){"use strict";a.r(e);var i=a("77b0"),n=a("448a");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);var o=a("2877"),r=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"4bcf50a1",null);e["default"]=r.exports},"448a":function(t,e,a){"use strict";a.r(e);var i=a("ee3c"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},6123:function(t,e,a){"use strict";a.r(e);var i=a("0f41"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},"77b0":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",t._l(t.dataList,function(e){return a("v-uni-view",{key:e.id,staticClass:"query-list-item",class:["Y"==e.status?"query-is-succcess":"query-is-ing"]},[a("v-uni-view",{staticClass:"header"},[a("v-uni-text",{staticClass:"left"},[t._v(t._s(e.vehicleNo))]),a("v-uni-view",{staticClass:"right"},["N"===e.status?a("v-uni-image",{attrs:{src:"/static/icon/declaration_wait_icon.png"}}):a("v-uni-image",{attrs:{src:"/static/icon/declaration_done_icon.png"}}),a("v-uni-text",[t._v(t._s("Y"===e.status?"已申报":"未申报"))])],1)],1),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"items"},[a("v-uni-text",{staticClass:"title"},[t._v("商品")]),a("v-uni-text",{staticClass:"value"},[t._v(t._s(e.goodsName))])],1),a("v-uni-view",{staticClass:"items"},[a("v-uni-text",{staticClass:"title"},[t._v("重量")]),a("v-uni-text",{staticClass:"value"},[t._v(t._s(e.weight))])],1),a("v-uni-view",{staticClass:"items"},[a("v-uni-text",{staticClass:"title"},[t._v("是否可通行")]),a("v-uni-text",{staticClass:"value"},[t._v(t._s("Y"==e.passStatus?"可过2号卡":"不可过2号卡"))])],1)],1),a("v-uni-view",{staticClass:"footer"},[a("v-uni-text",[t._v(t._s(t.regionTxt))]),a("v-uni-text",[t._v(t._s(e.datetime||""))]),a("v-uni-text",{staticClass:"flag"},[t._v(t._s("I"==e.inOut?"进口":"出口"))])],1)],1)}),1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},"7cac":function(t,e,a){"use strict";a.r(e);var i=a("da76"),n=a("6123");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("d751");var o=a("2877"),r=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"4b89f070",null);e["default"]=r.exports},"8d06":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"app-content"},[a("aca-nav-bar",{attrs:{level:2,title:"车辆申报查询"}}),a("bht-layout-container",[a("bht-query-box",{on:{searchEvent:function(e){e=t.$handleEvent(e),t.searchEvent(e)}}},[a("template",{staticClass:"left",slot:"show-left"},[a("v-uni-text",{staticClass:"title"},[t._v("总票数")]),a("v-uni-text",{staticClass:"value"},[t._v(t._s(t.total.size))])],1),a("template",{staticClass:"right",slot:"show-right"},[a("v-uni-text",{staticClass:"title"},[t._v("重量")]),a("v-uni-text",{staticClass:"value"},[t._v(t._s(t.total.totalWeight)+"KG")])],1)],2),a("v-uni-view",{staticClass:"query-main"},[a("mescroll-uni",{attrs:{down:t.downOption,up:t.upOption,fixed:!1},on:{init:function(e){e=t.$handleEvent(e),t.initMescroll(e)},down:function(e){e=t.$handleEvent(e),t.downCallback(e)},up:function(e){e=t.$handleEvent(e),t.upCallback(e)}}},[a("v-uni-view",{staticClass:"query-show"},[a("bht-vehicle-list",{attrs:{dataList:t.dataList}})],1)],1)],1)],1),a("popup-modal-query-vehicle",{on:{queryEvent:function(e){e=t.$handleEvent(e),t.searchHandler(e)},initModalData:function(e){e=t.$handleEvent(e),t.initModalData(e)}},model:{value:t.showPopup,callback:function(e){t.showPopup=e},expression:"showPopup"}})],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},d30e:function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("a4bb")),s=i(a("7cac")),o=i(a("28e8")),r=i(a("419b")),u=a("c856"),l={components:{PopupModalQueryVehicle:s.default,BhtQueryBox:o.default,BhtVehicleList:r.default},data:function(){return{showPopup:!1,downOption:{autoShowLoading:!0,textInOffset:"下拉即可刷新...",textOutOffset:"松开即可刷新...",textLoading:"努力加载中..."},upOption:{auto:!0,noMoreSize:5,empty:{tip:"没有查询到数据",icon:""},textNoMore:"数据已全部加载"},dataList:[],formData:{},total:{size:0,totalWeight:0},mescroll:null}},methods:{searchEvent:function(){this.showPopup=!0},initModalData:function(t){this.formData=t},initMescroll:function(t){this.mescroll=t},searchHandler:function(t){this.dataList=[],this.total.size=0,this.total.totalWeight=0,this.formData=t,this.mescroll.setPageNum(1),this.mescroll.triggerDownScroll()},downCallback:function(t){t.resetUpScroll()},upCallback:function(t){var e=this;this.formData.page=t.num,this.formData.limit=t.size,(0,u.personneVehiclelQuery)(this.formData).then(function(a){var i=[],s=0;if(0!==(0,n.default)(a).length){var o=a.results,r=a.total;e.total=r,i=o,s=r.size}1==t.num&&(e.dataList=[]),e.dataList=e.dataList.concat(i),t.endBySize(i.length,s),e.$nextTick(function(){t.endSuccess(i.length)})}).catch(function(e){t.endErr()})}}};e.default=l},d751:function(t,e,a){"use strict";var i=a("e8f7"),n=a.n(i);n.a},da76:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"aca-popup"},[a("popup-nav-bar",{attrs:{level:2,title:"请输入查询条件"},on:{backEvent:function(e){e=t.$handleEvent(e),t.backEvent(e)}}}),a("bht-layout-container",{attrs:{"bg-color":"#fff"}},[a("v-uni-view",{staticClass:"form-wrapper"},[a("v-uni-view",{staticClass:"form-item"},[a("v-uni-view",{staticClass:"form-title"},[t._v("车牌号")]),a("v-uni-view",{staticClass:"form-input"},[a("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入车牌号"},model:{value:t.formData.vehicleNo,callback:function(e){t.$set(t.formData,"vehicleNo",e)},expression:"formData.vehicleNo"}})],1)],1),a("v-uni-view",{staticClass:"form-item"},[a("v-uni-view",{staticClass:"form-title"},[t._v("日期")]),a("v-uni-view",{staticClass:"form-input",on:{click:function(e){e=t.$handleEvent(e),t.showCalendar(e)}}},[a("v-uni-input",{staticClass:"input",attrs:{type:"text",disabled:"",placeholder:"请选择日期"},model:{value:t.showDateTxt,callback:function(e){t.showDateTxt=e},expression:"showDateTxt"}})],1)],1),a("v-uni-view",{staticClass:"form-item"},[a("v-uni-view",{staticClass:"form-title"},[t._v("进出口标识")]),a("v-uni-view",{staticClass:"form-input"},[a("v-uni-radio-group",{on:{change:function(e){e=t.$handleEvent(e),t.flagRadioChange(e)}}},[a("v-uni-label",{staticClass:"radio"},[a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"I",checked:"I"===t.formData.inOut,color:"#ff3333"}}),t._v("进口")],1),a("v-uni-label",{staticClass:"radio"},[a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"E",checked:"E"===t.formData.inOut,color:"#ff3333"}}),t._v("出口")],1)],1)],1)],1),a("v-uni-view",{staticClass:"form-item"},[a("v-uni-view",{staticClass:"form-title"},[t._v("申报状态")]),a("v-uni-view",{staticClass:"form-input"},[a("v-uni-radio-group",{on:{change:function(e){e=t.$handleEvent(e),t.statusRadioChange(e)}}},[a("v-uni-label",{staticClass:"radio"},[a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"A",checked:"A"===t.formData.status,color:"#ff3333"}}),t._v("全部")],1),a("v-uni-label",{staticClass:"radio"},[a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"Y",checked:"Y"===t.formData.status,color:"#ff3333"}}),t._v("已申报")],1),a("v-uni-label",{staticClass:"radio"},[a("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"N",checked:"N"===t.formData.status,color:"#ff3333"}}),t._v("未申报")],1)],1)],1)],1),a("v-uni-view",{staticClass:"form-btn"},[a("v-uni-view",{staticClass:"rest-btn",on:{click:function(e){e=t.$handleEvent(e),t.restForm(e)}}},[t._v("重置")]),a("v-uni-view",{staticClass:"query-btn",on:{click:function(e){e=t.$handleEvent(e),t.queryEvent(e)}}},[t._v("查询")])],1)],1),a("uni-calendar",{ref:"calendar",attrs:{range:!0,date:t.formData.endDate,insert:!1,startDate:t.rangeDate.start,endDate:t.rangeDate.end},on:{confirm:function(e){e=t.$handleEvent(e),t.confirm(e)}}})],1)],1)},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},e8f7:function(t,e,a){var i=a("21d1");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("5ed5bda1",i,!0,{sourceMap:!1,shadowMode:!1})},ee3c:function(t,e,a){"use strict";var i=a("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("cebc")),s=a("2f62"),o=a("fa6d"),r={props:{dataList:{type:Array,default:function(){return[]}}},data:function(){return{regionTxt:""}},computed:(0,n.default)({},(0,s.mapGetters)({userInfo:"user/userInfo"})),created:function(){this.regionTxt=(0,o.getRegionText)(this.userInfo.region)}};e.default=r}}]);