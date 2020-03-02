(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/staff/borderer-jc-statistics"],{"01cc":function(t,a,e){"use strict";var n,i=function(){var t=this,a=t.$createElement;t._self._c},r=[];e.d(a,"b",function(){return i}),e.d(a,"c",function(){return r}),e.d(a,"a",function(){return n})},"28a1":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=s(e("a34a")),i=s(e("33fb")),r=e("f0d2");function s(t){return t&&t.__esModule?t:{default:t}}function u(t,a,e,n,i,r,s){try{var u=t[r](s),o=u.value}catch(c){return void e(c)}u.done?a(o):Promise.resolve(o).then(n,i)}function o(t){return function(){var a=this,e=arguments;return new Promise(function(n,i){var r=t.apply(a,e);function s(t){u(r,n,i,s,o,"next",t)}function o(t){u(r,n,i,s,o,"throw",t)}s(void 0)})}}var c=function(){return e.e("components/staff/stat-date-picker").then(e.bind(null,"de23"))},l=null,f=null,h={components:{StatDatePicker:c},data:function(){return{tabsData:[{title:"票次",flag:"quantityData"},{title:"货运量",flag:"weightData"},{title:"货运值",flag:"amountData"},{title:"车辆",flag:"vehicleData"}],activeTab:"quantityData",inAndOutData:{},chartData:{},totalCount:0,showPicker:!1,curYear:(new Date).getFullYear(),startDate:new Date("2014-01-01").toDateString()}},onLoad:function(){var t=o(n.default.mark(function t(){var a,e;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.reqChartData();case 2:a=this.getPieChartData(),this.totalStatisticsRing("all_statistics_pie",a),e=this.getLineChartData(),this.trendStatisticsLine("trend_statistics_line",e);case 6:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}(),watch:{activeTab:function(t,a){this.updateDataDynamically()}},methods:{changeTabItem:function(t){this.activeTab=t},showPickerEvent:function(){this.showPicker=!0},changePickerDate:function(t){var a=t.year;this.queryYear=a,this.reqChartData(),this.updateDataDynamically()},reqChartData:function(){var t=o(n.default.mark(function t(){var a;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.inAndOutReq)({queryYear:this.queryYear});case 2:a=t.sent,this.totalCount=0,this.chartData=a;case 5:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}(),getPieChartData:function(){var t=this,a=this.chartData[this.activeTab].totalData,e=[];a.axisValues.forEach(function(a,n){e.push({data:a}),t.totalCount+=a}),a.xAxis.forEach(function(t,a){e[a].name=t});for(var n={series:e},i=function(a){n.series[a].format=function(){switch(t.activeTab){case"quantityData":return n.series[a].name+":"+n.series[a].data+"票";case"weightData":return n.series[a].name+":"+n.series[a].data+"KG";case"amountData":return n.series[a].name+":"+n.series[a].data+"万元";case"vehicleData":return n.series[a].name+":"+n.series[a].data+"车次";default:break}}},r=0;r<n.series.length;r++)i(r);return n},getLineChartData:function(){var t=this.chartData[this.activeTab].trendData,a={categories:t.xAxis,series:[{name:"进口",data:t.axisValues[0],legendShape:"circle"},{name:"出口",data:t.axisValues[1],legendShape:"circle"}]};return a},updateDataDynamically:function(){var t=this.getPieChartData();switch(this.activeTab){case"quantityData":t.title={name:"总票数"},t.subtitle={name:this.totalCount+"票"};break;case"weightData":t.title={name:"总货运量"},t.subtitle={name:this.totalCount+"KG"};break;case"amountData":t.title={name:"总货运值"},t.subtitle={name:this.totalCount+"万元"};break;case"vehicleData":t.title={name:"总车次"},t.subtitle={name:this.totalCount+"车次"};break;default:break}l.updateData(t);var a=this.getLineChartData();f.updateData(a)},totalStatisticsRing:function(a,e){var n=this;l=new i.default({$this:n,canvasId:a,type:"ring",fontSize:11,padding:[0,0,0,0],colors:["#FE7735","#7B4FFC"],title:{name:"总票数",color:"#868686",fontSize:t.upx2px(25)},subtitle:{name:n.totalCount+"票",color:"#3399CC",fontSize:t.upx2px(30)},legend:{show:!0,position:"top",float:"left",padding:5,lineHeight:11,margin:0,fontColor:"#6B6B6B"},extra:{pie:{offsetAngle:-95,ringWidth:20}},background:"#FFFFFF",pixelRatio:1,series:e.series,animation:!0,width:t.upx2px(750),height:t.upx2px(338),disablePieStroke:!0,dataLabel:!0})},trendStatisticsLine:function(a,e){var n=this;f=new i.default({$this:n,canvasId:a,type:"line",padding:[0,0,0,0],colors:["#FE7735","#7B4FFC"],fontSize:11,legend:{show:!0,position:"top",float:"left",padding:5,lineHeight:11,margin:0,fontColor:"#6B6B6B"},dataPointShape:!0,background:"#FFFFFF",pixelRatio:1,categories:e.categories,series:e.series,animation:!0,xAxis:{disableGrid:!0,boundaryGap:"justify"},yAxis:{disableGrid:!0,format:function(t){return""}},width:t.upx2px(650),height:t.upx2px(402),extra:{line:{type:"straight"}}})}}};a.default=h}).call(this,e("6e42")["default"])},4720:function(t,a,e){"use strict";e.r(a);var n=e("01cc"),i=e("e47c");for(var r in i)"default"!==r&&function(t){e.d(a,t,function(){return i[t]})}(r);e("7976");var s,u=e("f0c5"),o=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);a["default"]=o.exports},"51f0":function(t,a,e){},"585c":function(t,a,e){"use strict";(function(t){e("f146"),e("921b");n(e("66fd"));var a=n(e("4720"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},7976:function(t,a,e){"use strict";var n=e("51f0"),i=e.n(n);i.a},e47c:function(t,a,e){"use strict";e.r(a);var n=e("28a1"),i=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(a,t,function(){return n[t]})}(r);a["default"]=i.a}},[["585c","common/runtime","common/vendor"]]]);