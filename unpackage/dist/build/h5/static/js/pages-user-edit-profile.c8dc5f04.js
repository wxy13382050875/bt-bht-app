(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-edit-profile"],{"0029":function(e,t,i){"use strict";var a=i("4f08"),r=i.n(a);r.a},"063d":function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.market_http=t.bht_http=void 0;var r=a(i("cebc")),n=a(i("5cd0")),l=a(i("1728")),u=new n.default;t.bht_http=u,u.setConfig(function(e){return e.baseUrl=l.default.BASE_BHT_URL,e}),u.validateStatus=function(e){return 200===e.statusCode},u.interceptor.request(function(e,t){return e.header=(0,r.default)({},e.header,{dataType:"json"}),e}),u.interceptor.response(function(e){return e.data},function(e){return uni.showToast({icon:"none",title:"您的网络不给力，请稍后重试！"}),e});var c=new n.default;t.market_http=c,c.setConfig(function(e){return e.baseUrl=l.default.BASE_MARKET_URL,e}),c.validateStatus=function(e){return 200===e.statusCode},c.interceptor.request(function(e,t){return e.header=(0,r.default)({},e.header,{dataType:"json"}),e}),c.interceptor.response(function(e){return e.data},function(e){return uni.showToast({icon:"none",title:"您的网络不给力，请稍后重试！"}),e})},1422:function(e,t,i){"use strict";i.r(t);var a=i("f116"),r=i("85a3");for(var n in r)"default"!==n&&function(e){i.d(t,e,function(){return r[e]})}(n);i("5029");var l=i("2877"),u=Object(l["a"])(r["default"],a["a"],a["b"],!1,null,"347a64d2",null);t["default"]=u.exports},1728:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={BASE_BHT_URL:"https://bht.bt.yndth.cn/api/",BASE_MARKET_URL:"http://market.bt.yndth.cn/api/v1.22/",BASE_TRADEING_URL:"http://www.trade",BASE_SHOPPING_URL:"http://182.92.165.86/mobile"};t.default=a},"34b1":function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("b05c");var r=a(i("bd86"));i("c5f6");var n={data:function(){return{pickerChangeValue:[],pickerValue:[],pickerValueArrayChange:!0,modeChange:!1,pickerValueSingleArray:[],pickerValueHour:[],pickerValueMinute:[],pickerValueMulArray:[],pickerValueMulTwoOne:[],pickerValueMulTwoTwo:[],pickerValueMulThreeOne:[],pickerValueMulThreeTwo:[],pickerValueMulThreeThree:[],showPicker:!1}},props:{mode:{type:String,default:"selector"},pickerValueArray:{type:Array,default:function(){return[]}},pickerValueDefault:{type:Array,default:function(){return[]}},deepLength:{type:Number,default:2},themeColor:String},watch:(0,r.default)({pickerValueArray:function(e,t){this.pickerValueArrayChange=!0},mode:function(e,t){this.modeChange=!0}},"pickerValueArray",function(e){this.initPicker(e)}),methods:{initPicker:function(e){var t=e;if(this.pickerValue=this.pickerValueDefault,"selector"===this.mode)this.pickerValueSingleArray=e;else if("timeSelector"===this.mode){this.modeChange=!1;for(var i=[],a=[],r=0;r<24;r++)i.push({value:r,label:r>9?"".concat(r," 时"):"0".concat(r," 时")});for(var n=0;n<60;n++)a.push({value:n,label:n>9?"".concat(n," 分"):"0".concat(n," 分")});this.pickerValueHour=i,this.pickerValueMinute=a}else if("multiSelector"===this.mode)this.pickerValueMulArray=e;else if("multiLinkageSelector"===this.mode&&2===this.deepLength){for(var l=[],u=[],c=0,s=t.length;c<s;c++)l.push(t[c]);if(2===this.pickerValueDefault.length)for(var o=this.pickerValueDefault[0],h=0,f=t[o].children.length;h<f;h++)u.push(t[o].children[h]);else for(var d=0,p=t[0].children.length;d<p;d++)u.push(t[0].children[d]);this.pickerValueMulTwoOne=l,this.pickerValueMulTwoTwo=u}else if("multiLinkageSelector"===this.mode&&3===this.deepLength){for(var v=[],k=[],m=[],g=0,b=t.length;g<b;g++)v.push(t[g]);if(this.pickerValueDefault=3===this.pickerValueDefault.length?this.pickerValueDefault:[0,0,0],3===this.pickerValueDefault.length){for(var w=this.pickerValueDefault[0],y=0,V=t[w].children.length;y<V;y++)k.push(t[w].children[y]);for(var C=this.pickerValueDefault[1],T=0,_=t[w].children[C].children.length;T<_;T++)m.push(t[w].children[C].children[T])}this.pickerValueMulThreeOne=v,this.pickerValueMulThreeTwo=k,this.pickerValueMulThreeThree=m}},show:function(){var e=this;setTimeout(function(){e.pickerValueArrayChange||e.modeChange?(e.initPicker(e.pickerValueArray),e.showPicker=!0,e.pickerValueArrayChange=!1,e.modeChange=!1):e.showPicker=!0},0)},maskClick:function(){this.pickerCancel()},pickerCancel:function(){this.showPicker=!1,this._initPickerVale();var e={index:this.pickerValue,value:this._getPickerLabelAndValue(this.pickerValue,this.mode).value,label:this._getPickerLabelAndValue(this.pickerValue,this.mode).label};this.$emit("onCancel",e)},pickerConfirm:function(e){this.showPicker=!1,this._initPickerVale();var t={index:this.pickerValue,value:this._getPickerLabelAndValue(this.pickerValue,this.mode).value,label:this._getPickerLabelAndValue(this.pickerValue,this.mode).label};this.$emit("onConfirm",t)},showPickerView:function(){this.showPicker=!0},pickerChange:function(e){this.pickerValue=e.mp.detail.value;var t={index:this.pickerValue,value:this._getPickerLabelAndValue(this.pickerValue,this.mode).value,label:this._getPickerLabelAndValue(this.pickerValue,this.mode).label};this.$emit("onChange",t)},pickerChangeMul:function(e){if(2===this.deepLength){var t=this.pickerValueArray,i=e.mp.detail.value;if(i[0]!==this.pickerValue[0]){for(var a=[],r=0,n=t[i[0]].children.length;r<n;r++)a.push(t[i[0]].children[r]);this.pickerValueMulTwoTwo=a,i[1]=0}this.pickerValue=i}else if(3===this.deepLength){var l=this.pickerValueArray,u=e.mp.detail.value,c=[],s=[];if(u[0]!==this.pickerValue[0]){this.pickerValueMulThreeTwo=[];for(var o=0,h=l[u[0]].children.length;o<h;o++)c.push(l[u[0]].children[o]);for(var f=0,d=l[u[0]].children[0].children.length;f<d;f++)s.push(l[u[0]].children[0].children[f]);u[1]=0,u[2]=0,this.pickerValueMulThreeTwo=c,this.pickerValueMulThreeThree=s}else if(u[1]!==this.pickerValue[1]){this.pickerValueMulThreeThree=[],c=this.pickerValueMulThreeTwo;for(var p=0,v=l[u[0]].children[u[1]].children.length;p<v;p++)s.push(l[u[0]].children[u[1]].children[p]);u[2]=0,this.pickerValueMulThreeThree=s}this.pickerValue=u}var k={index:this.pickerValue,value:this._getPickerLabelAndValue(this.pickerValue,this.mode).value,label:this._getPickerLabelAndValue(this.pickerValue,this.mode).label};this.$emit("onChange",k)},_getPickerLabelAndValue:function(e,t){var i,a=[];if("selector"===t)i=this.pickerValueSingleArray[e].label,a.push(this.pickerValueSingleArray[e].value);else if("timeSelector"===t)i="".concat(this.pickerValueHour[e[0]].label,"-").concat(this.pickerValueMinute[e[1]].label),a.push(this.pickerValueHour[e[0]].value),a.push(this.pickerValueHour[e[1]].value);else if("multiSelector"===t)for(var r=0;r<e.length;r++)r>0?i+=this.pickerValueMulArray[r][e[r]].label+(r===e.length-1?"":"-"):i=this.pickerValueMulArray[r][e[r]].label+"-",a.push(this.pickerValueMulArray[r][e[r]].value);else"multiLinkageSelector"===t&&(i=2===this.deepLength?"".concat(this.pickerValueMulTwoOne[e[0]].label,"-").concat(this.pickerValueMulTwoTwo[e[1]].label):"".concat(this.pickerValueMulThreeOne[e[0]].label,"-").concat(this.pickerValueMulThreeTwo[e[1]].label,"-").concat(this.pickerValueMulThreeThree[e[2]].label),2===this.deepLength?(a.push(this.pickerValueMulTwoOne[e[0]].value),a.push(this.pickerValueMulTwoTwo[e[1]].value)):(a.push(this.pickerValueMulThreeOne[e[0]].value),a.push(this.pickerValueMulThreeTwo[e[1]].value),a.push(this.pickerValueMulThreeThree[e[2]].value)));return{label:i,value:a}},_initPickerVale:function(){0===this.pickerValue.length&&("selector"===this.mode?this.pickerValue=[0]:"multiSelector"===this.mode?this.pickerValue=new Int8Array(this.pickerValueArray.length):"multiLinkageSelector"===this.mode&&2===this.deepLength?this.pickerValue=[0,0]:"multiLinkageSelector"===this.mode&&3===this.deepLength&&(this.pickerValue=[0,0,0]))}}};t.default=n},"4f08":function(e,t,i){var a=i("f144");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=i("4f06").default;r("2feffb0f",a,!0,{sourceMap:!1,shadowMode:!1})},5029:function(e,t,i){"use strict";var a=i("5bbe"),r=i.n(a);r.a},5199:function(e,t,i){"use strict";i.r(t);var a=i("34b1"),r=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,function(){return a[e]})}(n);t["default"]=r.a},"57d3":function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("ac6a");var r=a(i("cebc")),n=a(i("5d37")),l=i("6b85"),u=i("2f62"),c=i("6ecf"),s=a(i("b827")),o={components:{MpPicker:n.default},data:function(){return{nationArr:["中国","越南","缅甸","泰国","老挝"],nationIndex:0,idTypeArr:["身份证","边民证","护照","港澳通行证"],idTypeIndex:0,formData:{},regionPickerArry:l.regionData,regionDef:[0,0],regionText:""}},onLoad:function(){this.formData=(0,r.default)({},this.userInfo),this.init()},computed:(0,r.default)({},(0,u.mapGetters)({userInfo:"user/userInfo"})),methods:(0,r.default)({},(0,u.mapActions)({setUserInfo:"user/setUserInfo"}),{handleUpdate:function(){var e=this,t=[{name:"name",checkType:"notnull",errorMsg:"请填写姓名"},{name:"sex",checkType:"notnull",errorMsg:"请选择性别"},{name:"nationality",checkType:"notnull",errorMsg:"请选择国籍"},{name:"idType",checkType:"notnull",errorMsg:"请选择证件类型"},{name:"idCode",checkType:"notnull",errorMsg:"请填写证件号码"},{name:"idCode",checkType:"string",checkRule:"18",errorMsg:"证件号不合法"},{name:"customs",checkType:"notnull",errorMsg:"请选择隶属海关"}],i=s.default.check((0,r.default)({},this.formData),t);i?(0,c.updateUserInfo)(this.formData).then(function(t){var i=t.code,a=t.msg,r=t.data;500===i&&uni.showToast({title:a,icon:"none"}),200===i&&uni.showToast({title:"更新成功",success:function(){uni.setStorageSync("userInfo",r),e.setUserInfo(r),e.$Router.pushTab("/pages/user/center")}})}):uni.showToast({title:s.default.error,icon:"none"})},flagRadioChange:function(e){var t=e.detail;this.formData.sex=t.value},pickerNationalityChange:function(e){this.nationIndex=e.target.value,this.formData.nationality=this.nationArr[this.nationIndex]},pickerIdTypeChange:function(e){this.idTypeIndex=e.target.value,this.formData.idType=this.idTypeArr[this.idTypeIndex]},regionConfirm:function(e){this.formData.customs=e.value[0],this.formData.region=e.value[1],this.regionText=e.label},showRegion:function(){this.$refs.regionPicker.show()},init:function(){var e=this.userInfo,t=e.customs,i=e.region,a="";if(""!=t&&null!=t){var r=[];l.regionData.forEach(function(e,n,l){t===e.value&&(r.push(n),a=e.label,e.children.forEach(function(e,t,n){e.value===i&&(r.push(t),a+="-"+e.label)}))}),this.regionText=a,this.regionDef=r}}})};t.default=o},"5bbe":function(e,t,i){var a=i("f03b");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=i("4f06").default;r("0e1b2d6a",a,!0,{sourceMap:!1,shadowMode:!1})},"5cd0":function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(i("a4bb"));i("ac6a"),i("7f7f");var n=a(i("f499")),l=a(i("cebc")),u=a(i("795b"));i("96cf");var c=a(i("3b8d")),s=a(i("d225")),o=a(i("b0b4")),h=a(i("bd86")),f=function(){function e(){var t=this;(0,s.default)(this,e),(0,h.default)(this,"config",{baseUrl:"",header:{"content-type":"application/json;charset=UTF-8"},method:"GET",dataType:"json",responseType:"text"}),(0,h.default)(this,"interceptor",{request:function(e){e&&(t.requestBeforeFun=e)},response:function(e,i){e&&i&&(t.requestComFun=e,t.requestComFail=i)}})}return(0,o.default)(e,[{key:"requestBeforeFun",value:function(e){return e}},{key:"requestComFun",value:function(e){return e}},{key:"requestComFail",value:function(e){return e}},{key:"validateStatus",value:function(e){return 200===e.statusCode}},{key:"setConfig",value:function(e){this.config=e(this.config)}},{key:"request",value:function(){var t=(0,c.default)(regeneratorRuntime.mark(function t(){var i,a=this,r=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return i=r.length>0&&void 0!==r[0]?r[0]:{},i.baseUrl=this.config.baseUrl,i.dataType=i.dataType||this.config.dataType,i.responseType=i.responseType||this.config.responseType,i.url=i.url||"",i.data=i.data||{},i.params=i.params||{},i.header=i.header||this.config.header,i.method=i.method||this.config.method,t.abrupt("return",new u.default(function(t,r){var u=!0,c={};i.complete=function(e){e.config=c,a.validateStatus(e)?(e=a.requestComFun(e),t(e)):(e=a.requestComFail(e),r(e))};var s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i,a={errMsg:e,config:t};r(a),u=!1};c=(0,l.default)({},a.requestBeforeFun(i,s));var o=(0,l.default)({},c);if(u){var h=e.posUrl(i.url)?i.url:i.baseUrl+i.url;if("{}"!==(0,n.default)(i.params)){var f=e.addQueryString(i.params);h+=-1===h.indexOf("?")?"?".concat(f):"&".concat(f)}o.url=h,uni.request(o)}}));case 10:case"end":return t.stop()}},t,this)}));function i(){return t.apply(this,arguments)}return i}()},{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.request((0,l.default)({url:e,method:"GET"},t))}},{key:"post",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"POST"},i))}},{key:"put",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"PUT"},i))}},{key:"delete",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"DELETE"},i))}},{key:"connect",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"CONNECT"},i))}},{key:"head",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"HEAD"},i))}},{key:"options",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"OPTIONS"},i))}},{key:"trace",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.request((0,l.default)({url:e,data:t,method:"TRACE"},i))}},{key:"upload",value:function(t,i){var a=this,r=i.filePath,n=i.name,c=i.header,s=i.formData;return new u.default(function(i,u){var o=!0,h={},f={baseUrl:a.config.baseUrl,url:t,filePath:r,method:"UPLOAD",name:n,header:c||a.config.header,formData:s,complete:function(e){e.config=h,200===e.statusCode?(e=a.requestComFun(e),i(e)):(e=a.requestComFail(e),u(e))}},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"handle cancel",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f,i={errMsg:e,config:t};u(i),o=!1};h=(0,l.default)({},a.requestBeforeFun(f,d));var p=(0,l.default)({},h);o&&(p.url=e.posUrl(t)?t:a.config.baseUrl+t,uni.uploadFile(p))})}}],[{key:"posUrl",value:function(e){return/(http|https):\/\/([\w.]+\/?)\S*/.test(e)}},{key:"addQueryString",value:function(e){var t="";return(0,r.default)(e).forEach(function(i){t+=i+"="+e[i]+"&"}),t.substring(0,t.length-1)}}]),e}();t.default=f},"5d37":function(e,t,i){"use strict";i.r(t);var a=i("8acc"),r=i("5199");for(var n in r)"default"!==n&&function(e){i.d(t,e,function(){return r[e]})}(n);i("0029");var l=i("2877"),u=Object(l["a"])(r["default"],a["a"],a["b"],!1,null,"9a404584",null);t["default"]=u.exports},"6b85":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.regionData=void 0;var a=[{value:"8603",label:"瑞丽海关",children:[{value:"860301",label:"瑞丽互市"}]},{value:"8602",label:"畹町海关",children:[{value:"860201",label:"畹町互市"}]},{value:"8604",label:"章凤海关",children:[{value:"860401",label:"章凤互市"}]},{value:"8605",label:"盈江海关",children:[{value:"860501",label:"那邦互市"}]},{value:"8606",label:"孟连海关",children:[{value:"860601",label:"勐阿互市"},{value:"860602",label:"芒信互市"}]},{value:"8607",label:"南伞海关",children:[{value:"860701",label:"南伞互市"}]},{value:"8608",label:"孟定海关",children:[{value:"860801",label:"清水河互市"},{value:"860802",label:"芒卡互市"}]},{value:"8609",label:"打洛海关",children:[{value:"860901",label:"打洛互市"}]},{value:"8610",label:"腾冲海关",children:[{value:"861001",label:"猴桥互市"}]},{value:"8611",label:"沧源海关",children:[{value:"861101",label:"永和互市"}]},{value:"8612",label:"勐腊海关",children:[{value:"861201",label:"磨憨互市"},{value:"861202",label:"岔河互市"}]},{value:"8613",label:"河口海关",children:[{value:"861301",label:"河口北山互市"}]},{value:"8614",label:"金水河关",children:[{value:"861401",label:"金水河互市"}]},{value:"8615",label:"天保海关",children:[{value:"861501",label:"天保互市"}]},{value:"8622",label:"西双版纳",children:[{value:"862201",label:"勐龙互市"}]},{value:"8631",label:"勐康海关",children:[{value:"863101",label:"勐康互市"}]}];t.regionData=a},"6ecf":function(e,t,i){"use strict";var a=i("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.forgetPassword=t.updateUserInfo=t.register=t.sendMobileCode=t.login=void 0;var r=a(i("795b")),n=i("063d"),l=function(e){return n.bht_http.get("user/login",{params:e})};t.login=l;var u=function(e){return n.bht_http.get("verify/send/".concat(e))};t.sendMobileCode=u;var c=function(e){return n.bht_http.post("user/reg",e,{header:{"Content-Type":"application/x-www-form-urlencoded"}})};t.register=c;var s=function(e){return uni.showLoading({title:"正在努力提交...",mask:!0}),new r.default(function(t,i){n.bht_http.post("user/update",e,{header:{"content-Type":"application/x-www-form-urlencoded"}}).then(function(e){uni.hideLoading(),t(e)}).catch(function(e){uni.hideLoading(),i(e)})})};t.updateUserInfo=s;var o=function(e){return uni.showLoading({title:"正在努力提交...",mask:!0}),new r.default(function(t,i){n.bht_http.post("user/resetPassword",e,{header:{"content-type":"application/x-www-form-urlencoded"}}).then(function(e){uni.hideLoading(),t(e)}).catch(function(e){uni.hideLoading(),i(e)})})};t.forgetPassword=o},"85a3":function(e,t,i){"use strict";i.r(t);var a=i("57d3"),r=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,function(){return a[e]})}(n);t["default"]=r.a},"8acc":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"mpvue-picker"},[i("v-uni-view",{class:{pickerMask:e.showPicker},attrs:{catchtouchmove:"true"},on:{click:function(t){t=e.$handleEvent(t),e.maskClick(t)}}}),i("v-uni-view",{staticClass:"mpvue-picker-content ",class:{"mpvue-picker-view-show":e.showPicker}},[i("v-uni-view",{staticClass:"mpvue-picker__hd",attrs:{catchtouchmove:"true"}},[i("v-uni-view",{staticClass:"mpvue-picker__action",on:{click:function(t){t=e.$handleEvent(t),e.pickerCancel(t)}}},[e._v("取消")]),i("v-uni-view",{staticClass:"mpvue-picker__action",style:{color:e.themeColor},on:{click:function(t){t=e.$handleEvent(t),e.pickerConfirm(t)}}},[e._v("确定")])],1),"selector"===e.mode&&e.pickerValueSingleArray.length>0?i("v-uni-picker-view",{staticClass:"mpvue-picker-view",attrs:{"indicator-style":"height: 40px;",value:e.pickerValue},on:{change:function(t){t=e.$handleEvent(t),e.pickerChange(t)}}},[[i("v-uni-picker-view-column",e._l(e.pickerValueSingleArray,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1)]],2):e._e(),"timeSelector"===e.mode?i("v-uni-picker-view",{staticClass:"mpvue-picker-view",attrs:{"indicator-style":"height: 40px;",value:e.pickerValue},on:{change:function(t){t=e.$handleEvent(t),e.pickerChange(t)}}},[[i("v-uni-picker-view-column",e._l(e.pickerValueHour,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1),i("v-uni-picker-view-column",e._l(e.pickerValueMinute,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1)]],2):e._e(),"multiSelector"===e.mode?i("v-uni-picker-view",{staticClass:"mpvue-picker-view",attrs:{"indicator-style":"height: 40px;",value:e.pickerValue},on:{change:function(t){t=e.$handleEvent(t),e.pickerChange(t)}}},[e._l(e.pickerValueMulArray.length,function(t,a){return[i("v-uni-picker-view-column",e._l(e.pickerValueMulArray[t],function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1)]})],2):e._e(),"multiLinkageSelector"===e.mode&&2===e.deepLength?i("v-uni-picker-view",{staticClass:"mpvue-picker-view",attrs:{"indicator-style":"height: 40px;",value:e.pickerValue},on:{change:function(t){t=e.$handleEvent(t),e.pickerChangeMul(t)}}},[[i("v-uni-picker-view-column",e._l(e.pickerValueMulTwoOne,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1),i("v-uni-picker-view-column",e._l(e.pickerValueMulTwoTwo,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1)]],2):e._e(),"multiLinkageSelector"===e.mode&&3===e.deepLength?i("v-uni-picker-view",{staticClass:"mpvue-picker-view",attrs:{"indicator-style":"height: 40px;",value:e.pickerValue},on:{change:function(t){t=e.$handleEvent(t),e.pickerChangeMul(t)}}},[[i("v-uni-picker-view-column",e._l(e.pickerValueMulThreeOne,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1),i("v-uni-picker-view-column",e._l(e.pickerValueMulThreeTwo,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1),i("v-uni-picker-view-column",e._l(e.pickerValueMulThreeThree,function(t,a){return i("v-uni-view",{key:a,staticClass:"picker-item"},[e._v(e._s(t.label))])}),1)]],2):e._e()],1)],1)},r=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return r})},b05c:function(e,t,i){i("ec30")("Int8",1,function(e){return function(t,i,a){return e(this,t,i,a)}})},b827:function(e,t,i){"use strict";i("c5f6"),i("28a5"),i("3b2b"),i("7f7f"),e.exports={error:"",check:function(e,t){for(var i=0;i<t.length;i++){if(!t[i].checkType)return!0;if(!t[i].name)return!0;if(!t[i].errorMsg)return!0;if(!e[t[i].name])return this.error=t[i].errorMsg,!1;switch(t[i].checkType){case"string":var a=new RegExp("^.{"+t[i].checkRule+"}$");if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"int":a=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[i].checkRule+"}$");if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[i].name]))return this.error=t[i].errorMsg,!1;var r=t[i].checkRule.split(",");if(r[0]=Number(r[0]),r[1]=Number(r[1]),e[t[i].name]>r[1]||e[t[i].name]<r[0])return this.error=t[i].errorMsg,!1;break;case"betweenD":a=/^-?[1-9][0-9]?$/;if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;r=t[i].checkRule.split(",");if(r[0]=Number(r[0]),r[1]=Number(r[1]),e[t[i].name]>r[1]||e[t[i].name]<r[0])return this.error=t[i].errorMsg,!1;break;case"betweenF":a=/^-?[0-9][0-9]?.+[0-9]+$/;if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;r=t[i].checkRule.split(",");if(r[0]=Number(r[0]),r[1]=Number(r[1]),e[t[i].name]>r[1]||e[t[i].name]<r[0])return this.error=t[i].errorMsg,!1;break;case"same":if(e[t[i].name]!=t[i].checkRule)return this.error=t[i].errorMsg,!1;break;case"notsame":if(e[t[i].name]==t[i].checkRule)return this.error=t[i].errorMsg,!1;break;case"email":a=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"phoneno":a=/^1[0-9]{10,10}$/;if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"zipcode":a=/^[0-9]{6}$/;if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"reg":a=new RegExp(t[i].checkRule);if(!a.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"in":if(-1==t[i].checkRule.indexOf(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"notnull":if(null==e[t[i].name]||e[t[i].name].length<1)return this.error=t[i].errorMsg,!1;break}}return!0},isNumber:function(e){return e=Number(e),NaN!=e}}},f03b:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'.profile-content[data-v-347a64d2]{padding:0 %?18?%}.aca-cell[data-v-347a64d2]{position:relative;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?30?%;color:#6b6b6b;height:%?80?%}.aca-cell[data-v-347a64d2]:after{content:"";position:absolute;right:0;bottom:0;left:0;height:%?2?%;background:#e5e5e5}.aca-cell .label[data-v-347a64d2]{width:%?120?%}.aca-cell .content[data-v-347a64d2]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:right}.aca-cell .content .input[data-v-347a64d2]{width:100%;text-align:right;font-size:%?30?%}.aca-cell .content .arrow-right[data-v-347a64d2]{margin-left:%?18?%;color:#aaa}.app-btn[data-v-347a64d2]{margin-top:%?140?%;text-align:center;line-height:%?94?%}',""])},f116:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"app-content"},[i("aca-nav-bar",{attrs:{level:2,title:"编辑资料"}}),i("bht-layout-container",{attrs:{"bg-color":"#fff"}},[i("v-uni-view",{staticClass:"profile-content"},[i("v-uni-view",{staticClass:"aca-cell"},[i("v-uni-view",{staticClass:"label"},[e._v("姓名")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入姓名"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1)],1),i("v-uni-view",{staticClass:"aca-cell"},[i("v-uni-view",{staticClass:"label"},[e._v("性别")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-radio-group",{on:{change:function(t){t=e.$handleEvent(t),e.flagRadioChange(t)}}},[i("v-uni-label",{staticClass:"radio"},[i("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"I",checked:"男"===e.formData.sex,color:"#ff3333"}}),e._v("男")],1),i("v-uni-label",{staticClass:"radio"},[i("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"E",checked:"女"===e.formData.sex,color:"#ff3333"}}),e._v("女")],1)],1)],1)],1),i("v-uni-view",{staticClass:"aca-cell"},[i("v-uni-view",{staticClass:"label"},[e._v("国籍")]),i("v-uni-picker",{attrs:{value:e.nationIndex,range:e.nationArr},on:{change:function(t){t=e.$handleEvent(t),e.pickerNationalityChange(t)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-input",{staticClass:"input",attrs:{type:"text",value:e.formData.nationality,disabled:"",display:"",placeholder:"请选择国籍"}}),i("v-uni-view",{staticClass:"arrow-right"},[i("v-uni-view",{staticClass:"iconfont aca-youjiantou"})],1)],1)],1)],1),i("v-uni-view",{staticClass:"aca-cell"},[i("v-uni-view",{staticClass:"label"},[e._v("证件类型")]),i("v-uni-picker",{attrs:{value:e.idTypeIndex,range:e.idTypeArr},on:{change:function(t){t=e.$handleEvent(t),e.pickerIdTypeChange(t)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-input",{staticClass:"input",attrs:{type:"text",value:e.formData.idType,disabled:"",display:"",placeholder:"请选择证件类型"}}),i("v-uni-view",{staticClass:"arrow-right"},[i("v-uni-view",{staticClass:"iconfont aca-youjiantou"})],1)],1)],1)],1),i("v-uni-view",{staticClass:"aca-cell"},[i("v-uni-view",{staticClass:"label"},[e._v("证件号码")]),i("v-uni-view",{staticClass:"content"},[i("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"请输入证件号码"},model:{value:e.formData.idCode,callback:function(t){e.$set(e.formData,"idCode",t)},expression:"formData.idCode"}})],1)],1),i("v-uni-view",{staticClass:"aca-cell"},[i("v-uni-view",{staticClass:"label"},[e._v("隶属海关")]),i("v-uni-view",{staticClass:"content",on:{click:function(t){t=e.$handleEvent(t),e.showRegion(t)}}},[i("v-uni-input",{staticClass:"input",attrs:{type:"text",value:e.regionText,disabled:"",placeholder:"请选择隶属海关"}}),i("v-uni-view",{staticClass:"arrow-right"},[i("v-uni-view",{staticClass:"iconfont aca-youjiantou"})],1)],1)],1),i("v-uni-view",{staticClass:"app-btn",on:{click:function(t){t=e.$handleEvent(t),e.handleUpdate(t)}}},[e._v("提交")])],1)],1),i("mp-picker",{ref:"regionPicker",attrs:{mode:"multiLinkageSelector",pickerValueDefault:e.regionDef,pickerValueArray:e.regionPickerArry,deepLength:2},on:{onConfirm:function(t){t=e.$handleEvent(t),e.regionConfirm(t)}}})],1)},r=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return r})},f144:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'.pickerMask[data-v-9a404584]{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,.6)}.mpvue-picker-content[data-v-9a404584]{position:fixed;bottom:0;left:0;width:100%;-webkit-transition:all .3s ease;-o-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%);z-index:3000}.mpvue-picker-view-show[data-v-9a404584]{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.mpvue-picker__hd[data-v-9a404584]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:9px 15px;background-color:#fff;position:relative;text-align:center;font-size:17px}.mpvue-picker__hd[data-v-9a404584]:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;-ms-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5)}.mpvue-picker__action[data-v-9a404584]{display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;color:#1aad19;font-size:17px}.mpvue-picker__action[data-v-9a404584]:first-child{text-align:left;color:#888}.mpvue-picker__action[data-v-9a404584]:last-child{text-align:right;color:#007aff}.picker-item[data-v-9a404584]{text-align:center;line-height:40px;font-size:16px}.mpvue-picker-view[data-v-9a404584]{position:relative;bottom:0;left:0;width:100%;height:238px;background-color:#fff}',""])}}]);