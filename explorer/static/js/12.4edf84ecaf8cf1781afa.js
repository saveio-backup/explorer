webpackJsonp([12],{C2pn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("lC5x"),i=a.n(r),o=a("J0Oq"),l=a.n(o),n=a("g1sz"),s=a.n(n),c={name:"AllNetProfit",data:function(){return{allNetProfitChart:null,selectTime:0,allNetProfitList:null,allNetProfitListMonth:null,currentPage:1,loading:{profitStatChart:null,profitStatTb:null}}},computed:{tbList:function(){var t=0===this.selectTime?this.allNetProfitList:this.allNetProfitListMonth;if(!t)return[];var e=10*(this.currentPage-1),a=e+10>t.length?t.length:e+10;return t.slice(e,a)},total:function(){var t=0===this.selectTime?this.allNetProfitList:this.allNetProfitListMonth;return t?t.length:0},screenWidth:function(){return this.$store.state.Home.screenWidth}},watch:{screenWidth:function(){this.allNetProfitChart.resize()}},methods:{init:function(){this.getProfitStat()},currentChange:function(t){this.currentPage=t},getProfitStat:function(){var t=this;return l()(i.a.mark(function e(){var a,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t.selectTime,r=void 0,t.loading.profitStatChart=t.$loading({target:".all-net-profit-chart.loading-content"}),t.loading.profitStatTb=t.$loading({target:".all-net-profit-tb.loading-content"}),0!==t.selectTime){e.next=10;break}return e.next=7,t.$api2.getProfitStat({type:0});case 7:r=e.sent,e.next=13;break;case 10:return e.next=12,t.$api2.getProfitStat({limit:12,type:1});case 12:r=e.sent;case 13:t.loading.profitStatChart&&t.loading.profitStatChart.close(),t.loading.profitStatTb&&t.loading.profitStatTb.close(),0===r.error&&(0===a?t.allNetProfitList=r.result:t.allNetProfitListMonth=r.result,t.setAllNetProfitChart());case 16:case"end":return e.stop()}},e,t)}))()},setAllNetProfitChart:function(){for(var t=0===this.selectTime?this.allNetProfitList:this.allNetProfitListMonth,e=[],a=[],r=[],i=[],o=0;o<t.length;o++){var l=t[o],n=1e3*l.UpdatedAt,c=void 0;c=0===this.selectTime?this.$dateFormat.formatMonthDayByTimestamp(n):this.$dateFormat.formatYearMonthByTimestamp(n),i.unshift(c),e.unshift(l.IndexProfitFormat),a.unshift(l.ChannelProfitFormat),r.unshift(l.StorageProfitFormat)}var f={legend:{data:["Index","Flow","Storage"],left:"center",bottom:"4%",textStyle:{color:"#ffffff"}},tooltip:{trigger:"axis",formatter:function(t){if(!t)return"";for(var e=t[0].name,a=0;a<t.length;a++){var r=t[a];e+="<br/>"+r.marker+r.seriesName+": "+r.value+" SAVE"}return e},axisPointer:{type:"shadow"}},grid:{left:"13%",right:"4%",bottom:"18%"},xAxis:{type:"category",data:i,axisLine:{lineStyle:{color:"rgba(255,255,255, 0.4)"}}},yAxis:{type:"value",splitLine:{lineStyle:{color:"rgba(255,255,255, 0.2)"}},axisLabel:{formatter:"{value} SAVE"},axisLine:{lineStyle:{color:"rgba(255,255,255, 0.4)"}}},dataZoom:[{type:"inside",start:0===this.selectTime?100*(1-(29.5/t.length>1?1:29.5/t.length)):100*(1-(11.5/t.length>1?1:11.5/t.length)),end:100},{start:0,end:30,bottom:"8%",dataBackground:{areaStyle:{color:"rgba(255,255,255, 0.4)"}},handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.3)",shadowOffsetX:2,shadowOffsetY:2}}],series:[{name:"Index",type:"bar",stack:"Total",barMaxWidth:30,data:e,itemStyle:{color:"#0387E3"}},{name:"Flow",type:"bar",stack:"Total",barMaxWidth:30,data:a,itemStyle:{color:"#3ABAA4"}},{name:"Storage",type:"bar",stack:"Total",barMaxWidth:30,data:r,itemStyle:{color:"#ABCC59"}}]},h=document.getElementById("allNetProfitChart");this.allNetProfitChart=s.a.init(h),this.allNetProfitChart.setOption(f,!0)},setSelectTime:function(t){this.selectTime=t,this.currentPage=1,0===this.selectTime&&!this.allNetProfitList||1===this.selectTime&&!this.allNetProfitListMonth?this.getProfitStat():this.setAllNetProfitChart()}},mounted:function(){this.init()}},f=a("W5g0");var h=function(t){a("i/MI")},d=Object(f.a)(c,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"allNetProfit"}},[a("div",{staticClass:"all-net-profit-chart-wrapper"},[a("div",{staticClass:"all-net-profit-exchange"},[a("p",{staticClass:"all-net-profit-chart-btn ml10",class:{select:1===t.selectTime},on:{click:function(e){return e.stopPropagation(),t.setSelectTime(1)}}},[t._v("Month")]),t._v(" "),a("p",{staticClass:"all-net-profit-chart-btn",class:{select:0===t.selectTime},on:{click:function(e){return e.stopPropagation(),t.setSelectTime(0)}}},[t._v("Day")])]),t._v(" "),a("div",{staticClass:"all-net-profit-chart loading-content",attrs:{id:"allNetProfitChart"}})]),t._v(" "),a("div",{staticClass:"all-net-profit-tb loading-content"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tbList}},[a("el-table-column",{attrs:{fixed:"",label:"Date","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===t.selectTime?a("div",[t._v("\n\t\t\t\t\t\t"+t._s(t.$dateFormat.formatYearMonthDayByTimestamp(1e3*e.row.UpdatedAt))+"\n\t\t\t\t\t")]):a("div",[t._v("\n\t\t\t\t\t\t"+t._s(t.$dateFormat.formatYearMonthByTimestamp(1e3*e.row.UpdatedAt))+"\n\t\t\t\t\t")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"IndexProfitFormat",label:"Index Profit(SAVE)",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ChannelProfitFormat",label:"Flow Profit(SAVE)",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"StorageProfitFormat",label:"Storage Profit(SAVE)",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{label:"Total(SAVE)",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(Number(e.row.IndexProfitFormat)+Number(e.row.ChannelProfitFormat)+Number(e.row.StorageProfitFormat))+"\n\t\t\t\t")]}}])})],1),t._v(" "),a("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.currentChange}})],1)])},[],!1,h,"data-v-502193b8",null);e.default=d.exports},"i/MI":function(t,e){}});
//# sourceMappingURL=12.4edf84ecaf8cf1781afa.js.map