webpackJsonp([7],{"5rPH":function(t,e){},R7bS:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("HzJ8"),r=n.n(a),l=n("lC5x"),i=n.n(l),o=n("J0Oq"),c=n.n(o),s=n("g1sz"),h=n.n(s),u={name:"ChannelNumber",data:function(){return{channelNumberChart:null,channelNumberList:null,currentPage:1,loading:{channelStatChart:null,channelStatTb:null}}},computed:{tbList:function(){if(!this.channelNumberList)return[];var t=10*(this.currentPage-1),e=t+10>this.channelNumberList.length?this.channelNumberList.length:t+10;return this.channelNumberList.slice(t,e)},total:function(){return this.channelNumberList?this.channelNumberList.length:0},screenWidth:function(){return this.$store.state.Home.screenWidth}},watch:{screenWidth:function(){this.channelNumberChart.resize()}},methods:{init:function(){this.getChannelStat()},currentChange:function(t){this.currentPage=t},getChannelStat:function(){var t=this;return c()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading.channelStatChart=t.$loading({target:".channel-number-chart.loading-content"}),t.loading.channelStatTb=t.$loading({target:".channel-number-tb.loading-content"}),e.next=4,t.$api2.getChannelStat({});case 4:n=e.sent,t.loading.channelStatChart&&t.loading.channelStatChart.close(),t.loading.channelStatTb&&t.loading.channelStatTb.close(),0===n.error&&(t.channelNumberList=n.result,t.setChannelNumberChart());case 8:case"end":return e.stop()}},e,t)}))()},setChannelNumberChart:function(){var t=[],e=[],n=!0,a=!1,l=void 0;try{for(var i,o=r()(this.channelNumberList);!(n=(i=o.next()).done);n=!0){var c=i.value;t.unshift(c.Total);var s=this.$dateFormat.formatMonthDayByTimestamp(1e3*c.UpdatedAt);e.unshift(s)}}catch(t){a=!0,l=t}finally{try{!n&&o.return&&o.return()}finally{if(a)throw l}}var u={itemStyle:{color:"#CDDC39"},grid:{left:"13%",right:"4%",bottom:"16%"},xAxis:{type:"category",boundaryGap:!1,data:e,axisLine:{lineStyle:{color:"rgba(255,255,255, 0.4)"}}},yAxis:{type:"value",splitLine:{lineStyle:{color:"rgba(255,255,255, 0.2)"}},axisLine:{lineStyle:{color:"rgba(255,255,255, 0.4)"}}},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},dataZoom:[{type:"inside",start:100*(1-(29.5/this.channelNumberList.length>1?1:29.5/this.channelNumberList.length)),end:100},{start:0,end:30,bottom:"4%",dataBackground:{areaStyle:{color:"rgba(255,255,255, 0.4)"}},handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.3)",shadowOffsetX:2,shadowOffsetY:2}}],series:[{data:t,type:"line",areaStyle:{color:"rgba(205, 220, 57, 0.2)"}}]},d=document.getElementById("channelNumberChart");this.channelNumberChart=h.a.init(d),this.channelNumberChart.setOption(u,!0)}},mounted:function(){this.init()}},d=n("W5g0");var b=function(t){n("5rPH")},m=Object(d.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"channelNumber"}},[t._m(0),t._v(" "),n("div",{staticClass:"channel-number-tb loading-content"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tbList}},[n("el-table-column",{attrs:{fixed:"",label:"Date","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",[t._v("\n\t\t\t\t\t\t"+t._s(t.$dateFormat.formatYearMonthDayByTimestamp(1e3*e.row.UpdatedAt))+"\n\t\t\t\t\t")])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"New",label:"New",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"Close",label:"Close",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"Total",label:"Total",width:"180"}})],1),t._v(" "),n("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.currentChange}})],1)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"channel-number-chart-wrapper"},[e("div",{staticClass:"channel-number-chart loading-content",attrs:{id:"channelNumberChart"}})])}],!1,b,"data-v-959b64cc",null);e.default=m.exports}});
//# sourceMappingURL=7.d3be9cfa03e020506102.js.map