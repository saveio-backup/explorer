<template>
	<div class="charts-component">
		<section class="charts-list-top">
			<section
				@click.stop="goPage('/chartDetail/strongeSpace')"
				class="charts-item chart-first-div loading-content"
				id="chartFirstDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/allNetProfit')"
				class="charts-item chart-second-div loading-content"
				id="chartSecondDiv"
			></section>
		</section>
		<section class="chars-list-center">
			<section
				@click.stop="goPage('/chartDetail/fileTotal')"
				class="charts-item"
				id="chartThirdDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/ChannelNumber')"
				class="charts-item"
				id="chartFourthDiv"
			></section>
		</section>
		<section class="chars-list-bottom" v-if="type === 0">
			<section
				@click.stop="goPage('/chartDetail/SumPledge')"
				class="charts-item"
				id="chartFifthDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/Addresswarehouse')"
				class="charts-item"
				id="chartSixthDiv"
			></section>
		</section>
	</div>
</template>
<script>
import echarts from "echarts";
export default {
	props: {
		type: {
			type: Number, // 0 is all charts; 1 is four charts
			default: 1
		}
	},
	data() {
		return {
			storageStat: null,
			profitStat: null,
			chartFirst: null,
			chartSecond: null,
			chartThird: null,
			chartFourth: null,
			chartFifth: null,
			chartSixth: null,
		};
	},
	methods: {
		init() {
			this.getAllNetSpace();
			this.getProfitStat();
			// this.loadChartFirst();
			// this.loadChartSecond();
			// this.loadChartThird();
			// this.loadChartFourth();
			// if (this.type === 0) {
			// 	this.loadChartFifth();
			// 	this.loadChartSixth();
			// }
		},
		getAllNetSpace() {
			this.$axios.get(this.$api.getstoragestat, {}, 
			{
				loading: {
					text: '加载中...',
					target: ".loading-content.chart-first-div"
				}
			}).then(res => {
				if(res.Error === 0) {
					this.storageStat = {
						Used: res.Result.Used,
						Remain: res.Result.Remain
					}
					this.loadChartFirst();
				}
			})
		},
		loadChartFirst() {
			const vm = this;
			let option = {
				//饼图名的名称、位置及样式
				title: {
					text: "全网空间",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				//提示框的样式、提示框显示什么数据
				tooltip: {
					show: true,
					trigger: "item",
					//有a,b,c,d四种
					//a代表系列名称(在这里就是USDJPY)，b代表数据项名称(在这里就是上涨或下跌)，
					//c代表数据(在这里就是335或310)，
					//d代表数据项所占的百分比数(在这里就是40.04或59.96，要显示百分比样子要自己加百分号)
					formatter: "{d}%",
					padding: [10, 10],
					backgroundColor: "#FFFFFF",
					textStyle: {
						color: "#333",
						fontSize: "16"
					}
				},
				series: [
					{
						name: "USDJPY",
						type: "pie",
						radius: ["32%", "60%"],
						center: ["50%", "60%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								formatter: "{b}(PB): {c} ({d}%)",
								textStyle: {
									fontSize: "14"
								}
							}
						},
						data: [
							{
								value: vm.storageStat.Used,
								name: "已占用",
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										color: "#CDDC39"
									}
								}
							},
							{
								value: vm.storageStat.Remain,
								name: "剩余空间",
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										color: "rgba(255,255,255,0.3)"
									}
								}
							}
						]
					}
				]
			};
			var dom = document.getElementById("chartFirstDiv");
			this.chartFirst = echarts.init(dom);
			this.chartFirst.setOption(option, true);
		},
		getProfitStat() {
			let _endTimestamp = Date.parse(new Date())/1000;
			let sevenDayTimestamp = 3600 * 24 * 7;
			let params = {
				type: 0,
				start: (_endTimestamp - sevenDayTimestamp),
				end: _endTimestamp
			}
			this.$axios.get(this.$api.getprofitstat, params, {
				loading: {
					text: '加载中...',
					target: ".loading-content.chart-second-div"
				}
			}).then(res => {
				this.profitStat = res.Result.Details;
				this.loadChartSecond();
			})
		},
		loadChartSecond() {
			let indexArr = [];
			let channelArr = [];
			let storageArr = [];
			for (let i = 0; i < 7; i++) {
				let item = this.profitStat[i];
				indexArr.unshift(item.IndexProfitFormat);
				channelArr.unshift(item.ChannelProfitFormat);
				storageArr.unshift(item.StorageProfitFormat);
			}
			let option = {
				title: {
					text: "全网日收益",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				legend: {
					data: ['索引', '流量','存储'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
					}
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "18%",
				},
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				yAxis: {
					type: "value",
					splitLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.2)"
						}
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				series: [
					{
						name: "索引",
						type: "bar",
						stack: "总量",
						data: indexArr,
						itemStyle: {
							color: "#0387E3"
						}
					},
					{
						name: "流量",
						type: "bar",
						stack: "总量",
						data: channelArr,
						itemStyle: {
							color: "#3ABAA4"
						}
					},
					{
						name: "存储",
						type: "bar",
						stack: "总量",
						data: storageArr,
						itemStyle: {
							color: "#ABCC59"
						}
					}
				]
			};
			console.dir(option);
			let dom = document.getElementById("chartSecondDiv");
			this.chartSecond = echarts.init(dom);
			this.chartSecond.setOption(option, true);
		},
		loadChartThird() {
			let option = {
				title: {
					text: "全网文件数量",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				itemStyle: {
					color: "#CDDC39"
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "12%",
				},
				tooltip : {
					trigger: 'axis',
					axisPointer: {
							type: 'cross',
							label: {
									backgroundColor: '#6a7985'
							}
					}
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				yAxis: {
					type: "value",
					splitLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.2)"
						}
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: "line",
						areaStyle: {
							color: 'rgba(205, 220, 57, 0.2)'
						}
					}
				]
			};
			let dom = document.getElementById("chartThirdDiv");
			this.chartThird = echarts.init(dom);
			this.chartThird.setOption(option, true);
		},
		loadChartFourth() {
			let option = {
				title: {
					text: "全网Channel总资产",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				itemStyle: {
					color: "#CDDC39"
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "12%",
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				yAxis: {
					type: "value",
					splitLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.2)"
						}
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				tooltip : {
					trigger: 'axis',
					axisPointer: {
							type: 'cross',
							label: {
									backgroundColor: '#6a7985'
							}
					}
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: "line",
						areaStyle: {
							color: 'rgba(205, 220, 57, 0.2)'
						}
					}
				]
			};
			let dom = document.getElementById("chartFourthDiv");
			this.chartFourth = echarts.init(dom);
			this.chartFourth.setOption(option, true);
		},
		loadChartFifth() {
			let option = {
				title: {
					text: "全网质押量",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				itemStyle: {
					color: "#CDDC39"
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "12%",
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				yAxis: {
					type: "value",
					splitLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.2)"
						}
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				tooltip : {
					trigger: 'axis',
					axisPointer: {
							type: 'cross',
							label: {
									backgroundColor: '#6a7985'
							}
					}
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: "line",
						areaStyle: {
							color: 'rgba(205, 220, 57, 0.2)'
						}
					}
				]
			};
			let dom = document.getElementById("chartFifthDiv");
			this.chartFifth = echarts.init(dom);
			this.chartFifth.setOption(option, true);
		},
		loadChartSixth() {
			let option = {
				title: {
					text: "全网地址持仓",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "18%",
				},
				legend: {
					data:['DNS质押','FS质押'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
					}
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				yAxis: {
					type: "value",
					splitLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.2)"
						}
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				tooltip : {
					trigger: 'axis',
					axisPointer: {
							type: 'cross',
							label: {
									backgroundColor: '#6a7985'
							}
					}
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: "line",
						name: "DNS质押",
						areaStyle: {
							color: 'rgba(205, 220, 57, 0.2)'
						},
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						data: [2820, 1932, 1901, 93, 190, 2330, 130],
						type: "line",
						name: "FS质押",
						areaStyle: {
							color: 'rgba(21, 164, 198, 0.24)'
						},
						itemStyle: {
							color: "#15A4C6"
						}
					}
				]
			};
			let dom = document.getElementById("chartSixthDiv");
			this.chartSixth = echarts.init(dom);
			this.chartSixth.setOption(option, true);
		},
		goPage(path) {
			this.$router.push({
				path: path
			})
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
.charts-component {
	width: 100%;
	height: auto;

	.charts-list-top,
	.chars-list-center,
	.chars-list-bottom {
		max-width: 1170px;
		width: calc(100% - 30px);
		height: auto;
		margin: 0px auto;
		display: flex;
		justify-content: space-between;

		@media (max-width: 1200px) {
			display: block;
			margin: 0 auto;
		}

		.charts-item {
			width: 573px;
			height: 360px;
			background: rgba(42, 42, 43, 1);
			box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
			border-radius: 4px;
			transition: width 0.5s;
			cursor: pointer;

			@media (max-width: 1200px) {
				width: 100%;
				margin-top: 16px;
			}
		}
	}
	.chars-list-center,
	.chars-list-bottom {
		margin-top: 24px;
	}
}
</style>