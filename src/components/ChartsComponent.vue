<template>
	<div class="charts-component">
		<section class="charts-list-top">
			<section
				@click.stop="goPage('/chartDetail/storageSpace')"
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
				class="charts-item chart-third-div loading-content"
				id="chartThirdDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/ChannelNumber')"
				class="charts-item chart-fourth-div loading-content"
				id="chartFourthDiv"
			></section>
		</section>
		<section class="chars-list-bottom" v-if="type === 0">
			<section
				@click.stop="goPage('/chartDetail/dayTransaction')"
				class="charts-item chart-fifth-div loading-content"
				id="chartFifthDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/SumPledge')"
				class="charts-item chart-sixth-div loading-content"
				id="chartSixthDiv"
			></section>
		</section>
	</div>
</template>
<script>
import echarts from "echarts";
import util from "../assets/config/util";
import Buffer from "Buffer";
export default {
	props: {
		type: {
			type: Number, // 0 is all charts; 1 is four charts
			default: 1
		}
	},
	data() {
		return {
			util,
			storageStat: null,
			profitStat: null,
			fileState: null,
			channelStat: null,
			transactionStat: null,
			stakeStat: null,
			chartFirst: null,
			chartSecond: null,
			chartThird: null,
			chartFourth: null,
			chartFifth: null,
			chartSixth: null,
		};
	},
	computed: {
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.chartFirst.resize();
			this.chartSecond.resize();
			this.chartThird.resize();
			this.chartFourth.resize();
			if (this.type === 0) {
				this.chartFifth.resize();
				this.chartSixth.resize();
			}
		}
	},
	methods: {
		init() {
			this.getAllNetSpace();
			this.getProfitStat();
			this.getFileState();
			this.getChannelStat();
			if (this.type === 0) {
				this.getTransactionStat();
				this.getStakeStat()
			}
		},
		async getAllNetSpace() {
			let currentheight = await this.$api2.getBlockHeight();
			let res = await this.$api2.getStorageStat(currentheight);
			if(res.error === 0) {
				this.storageStat = res.result
				this.loadChartFirst();
			}
			// this.$axios.get(this.$api.getstoragestat, {}, 
			// {
			// 	loading: {
			// 		text: 'Loading...',
			// 		target: ".loading-content.chart-first-div"
			// 	}
			// }).then(data => {
			// 	let res = data.data;
			// 	if(res.Error === 0) {
			// 		this.storageStat = {
			// 			Used: res.Result.Used,
			// 			Remain: res.Result.Remain
			// 		}
			// 		this.loadChartFirst();
			// 	}
			// })
		},
		loadChartFirst() {
			const vm = this;
			let option = {
				//饼图名的名称、位置及样式
				title: {
					text: "All Network Space",
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
								formatter: function(params) {
									if(!params) return '';
									return `${params.name}:${vm.util.bytesToSize(params.value * 1024)}`
								},
								textStyle: {
									fontSize: "14"
								}
							}
						},
						data: [
							{
								value: vm.storageStat.Used,
								name: "Used",
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
								name: "Remain",
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
		async getProfitStat() {
			let res = await this.$api2.getProfitStat({limit: 7, type: 0});
			console.log(res);
			if(res.error === 0) {
				this.profitStat = res.result;
				this.loadChartSecond();
			}
			// let _endTimestamp = Date.parse(new Date())/1000;
			// this.$axios.get(`${this.$api.getprofitstat}/0/0/0/0/7`, {}, {
			// 	loading: {
			// 		text: 'Loading...',
			// 		target: ".loading-content.chart-second-div"
			// 	}
			// }).then(data => {
				// let res = data.data
				// this.profitStat = res.Result.Details;
				// this.loadChartSecond();
			// })
		},
		loadChartSecond() {
			// get data
			let indexArr = [];
			let channelArr = [];
			let storageArr = [];
			let timeArr = [];
			for (let i = 0; i < 7; i++) {
				let item = this.profitStat[i];
				indexArr.unshift(item.IndexProfitFormat);
				channelArr.unshift(item.ChannelProfitFormat);
				storageArr.unshift(item.StorageProfitFormat);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "All Net Day Profit",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				legend: {
					data: ['Index', 'Flow','Storage'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
					}
				},
				tooltip: {
					trigger: "axis",
					formatter: function(params) {
						if(!params) return '';
						let desc = params[0].name;
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value*1024} SAVE`
						}
						return desc
					},
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: "110px",
					right: "4%",
					bottom: "18%",
				},
				xAxis: {
					type: "category",
					data: timeArr,
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
					axisLabel: {
            formatter: '{value} SAVE'
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				series: [
					{
						name: "Index",
						type: "bar",
						stack: "Total",
						data: indexArr,
						barMaxWidth: 30,
						itemStyle: {
							color: "#0387E3"
						}
					},
					{
						name: "Flow",
						type: "bar",
						stack: "Total",
						barMaxWidth: 30,
						data: channelArr,
						itemStyle: {
							color: "#3ABAA4"
						}
					},
					{
						name: "Storage",
						type: "bar",
						stack: "Total",
						barMaxWidth: 30,
						data: storageArr,
						itemStyle: {
							color: "#ABCC59"
						}
					}
				]
			};
			let dom = document.getElementById("chartSecondDiv");
			this.chartSecond = echarts.init(dom);
			this.chartSecond.setOption(option, true);
		},
		async getFileState() {
			let res = await this.$api2.getFileState({days: 7});
			if(res.error === 0) {
				this.fileState = res.result;
				this.loadChartThird();
			}
			// this.$axios.get(`${this.$api.getfilestat}/0/0/0/0/7`, {}, {
			// 	loading: {
			// 		text: 'Loading...',
			// 		target: ".loading-content.chart-third-div"
			// 	}
			// }).then(data => {
			// 	let res = data.data
			// 	if(res.Error === 0) {
			// 		this.fileState = res.Result['Details'];
			// 		this.loadChartThird();
			// 	}
			// })
		},
		loadChartThird() {
			let fileNumArr = [];
			let timeArr = [];
			for (let i = 0; i < 7; i++) {
				let item = this.fileState[i];
				fileNumArr.unshift(item.Total);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "All Net File Count",
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
					data: timeArr,
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
						data: fileNumArr,
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
		async getChannelStat() {
			let res = await this.$api2.getChannelStat({days: 7});
			if(res.error === 0) {
				this.channelStat = res.result;
				this.loadChartFourth();
			}
			// this.$axios.get(`${this.$api.getchannelstat}/0/0/0/0/7`, {}, {
			// 	loading: {
			// 		text: 'Loading...',
			// 		target: ".loading-content.chart-fourth-div"
			// 	}
			// }).then(data => {
			// 	let res = data.data
			// 	if(res.Error === 0) {
			// 		this.channelStat = res.Result['Details'];
			// 		this.loadChartFourth();
			// 	}
			// })
		},
		loadChartFourth() {
			let channelNumArr = [];
			let timeArr = [];
			for (let i = 0; i < 7; i++) {
				let item = this.channelStat[i];
				channelNumArr.unshift(item.Total);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "全网Channel数量",
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
					data: timeArr,
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
						data: channelNumArr,
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
		async getTransactionStat() {
			let res = await this.$api2.getTransactionStat({days: 7});
			if(res.error === 0) {
				this.transactionStat = res.result;
				this.loadChartFifth();
			}
			// this.$axios.get(`${this.$api.gettransactionstat}/0/0/0/0/7`, {}, {
			// 	loading: {
			// 		text: 'Loading...',
			// 		target: ".loading-content.chart-fifth-div"
			// 	}
			// }).then(data => {
			// 	let res = data.data
			// 	if(res.Error === 0) {
			// 		this.transactionStat = res.Result['Details'];
			// 		this.loadChartFifth();
			// 	}
			// })
		},
		loadChartFifth() {
			let transactionArr = [];
			let timeArr = [];
			// let currentTimestamp = Date.parse(new Date());
			for (let i = 0; i < 7; i++) {
				let item = this.transactionStat[i];
				// let transactionTotal = item.Onchain + item.Offchain;
				// transactionArr.unshift(transactionTotal);
				transactionArr.unshift(item.Total);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "Day Transaction",
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
					data: timeArr,
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
						data: transactionArr,
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
		async getStakeStat() {
			let res = await this.$api2.getStakeStat({days: 7});
			if(res.error === 0) {
				this.stakeStat = res.result;
				this.loadChartSixth();
			}
			// this.$axios.get(`${this.$api.getstakestat}/0/0/0/0/7`, {}, {
			// 	loading: {
			// 		text: 'Loading...',
			// 		target: ".loading-content.chart-sixth-div"
			// 	}
			// }).then(data => {
			// 	let res = data.data
			// 	if(res.Error === 0) {
			// 		this.stakeStat = res.Result['Details'];
			// 		this.loadChartSixth();
			// 	}
			// })
		},
		loadChartSixth() {
			let dnsStakeArr = [];
			let fsStakeArr = [];
			let timeArr = [];
			for (let i = 0; i < 7; i++) {
				let item = this.stakeStat[i];
				dnsStakeArr.unshift(item.DNSFormat);
				fsStakeArr.unshift(item.FSFormat);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "Pledge Total",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				grid: {
					left: "110px",
					right: "4%",
					bottom: "18%",
				},
				legend: {
					data:['DNS Pledge','FS Pledge'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
					}
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: timeArr,
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
					axisLabel: {
            formatter: '{value} SAVE'
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				tooltip : {
					trigger: 'axis',
					formatter: function(params) {
						console.log(params);
						if(!params) return '';
						let desc = params[0].name;
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value} SAVE`
						}
						return desc
					},
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				series: [
					{
						data: dnsStakeArr,
						type: "line",
						name: "DNS Pledge",
						areaStyle: {
							color: 'rgba(205, 220, 57, 0.2)'
						},
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						data: fsStakeArr,
						type: "line",
						name: "FS Pledge",
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