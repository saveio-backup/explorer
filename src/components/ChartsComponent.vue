<template>
	<div class="charts-component">
		<section class="charts-list-top">
			<section
				@click.stop="goPage('/chartDetail/storageSpace')"
				class="charts-item relative"
				ref="chartFirstDiv"
				id="chartFirstDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/allNetProfit')"
				class="charts-item relative"
				ref="chartSecondDiv"
				id="chartSecondDiv"
			></section>
		</section>
		<section class="chars-list-center">
			<section
				@click.stop="goPage('/chartDetail/fileTotal')"
				class="charts-item relative"
				ref="chartThirdDiv"
				id="chartThirdDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/ChannelNumber')"
				class="charts-item relative"
				ref="chartFourthDiv"
				id="chartFourthDiv"
			></section>
		</section>
		<section class="chars-list-bottom" v-if="type === 0">
			<section
				@click.stop="goPage('/chartDetail/dayTransaction')"
				class="charts-item relative"
				ref="chartFifthDiv"
				id="chartFifthDiv"
			></section>
			<section
				@click.stop="goPage('/chartDetail/SumStake')"
				class="charts-item relative"
				ref="chartSixthDiv"
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
			loading: {
				allNetSpace: null,
				profitStat: null,
				fileStat: null,
				channelStat: null,
				stakeStat: null,
			}
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
				this.getStakeStat();
				this.$nextTick(() => {
					this.getTransactionStat();
				})
			}
		},
		async getAllNetSpace() {
			// add loading
			this.loading.allNetSpace = this.$loading.show({
				container: this.$refs.chartFirstDiv,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let currentheight = await this.$api2.getBlockHeight();
			let res = await this.$api2.getStorageStat(currentheight);

			// close loading
			this.loading.allNetSpace && this.loading.allNetSpace.hide();

			if(res.error === 0) {
				this.storageStat = res.result
				this.loadChartFirst();
			}
		},
		loadChartFirst() {
			const vm = this;
			let remainD = vm.storageStat.Remain / (vm.storageStat.Remain + vm.storageStat.Used);
			let remainVal = remainD < 0.02 ? 0.02 : remainD;
			let usedD = vm.storageStat.Used / (vm.storageStat.Remain + vm.storageStat.Used);
			let usedVal = usedD < 0.02 ? 0.02 : usedD;
			let option = {
				//饼图名的名称、位置及样式
				title: {
					text: "Storage Space",
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
					// formatter: "{d}%",
					formatter: function(params) {
						if(!params) return '';
						return `${parseFloat((params.data.realD * 100).toFixed(4))}%`;
					},
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
									return `${params.name}:${vm.util.bytesToSize(params.data.realVal * 1024)}`
								},
								textStyle: {
									fontSize: "14"
								}
							}
						},
						data: [
							{
								realVal: vm.storageStat.Remain,
								value: remainVal,
								realD: remainD,
								name: "Remain",
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										color: "rgba(255,255,255,0.3)",
									}
								}
							},
							{
								realVal: vm.storageStat.Used,
								realD: usedD,
								value: usedVal,
								name: "Used",
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										color: "#CDDC39",
									}
								}
							},
						]
					}
				]
			};
			var dom = document.getElementById("chartFirstDiv");
			this.chartFirst = echarts.init(dom);
			this.chartFirst.setOption(option, true);
		},
		async getProfitStat() {
			// add loading
			this.loading.profitStat = this.$loading.show({
				container: this.$refs.chartSecondDiv,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getProfitStat({limit: 7, type: 0});

			// close loading
			this.loading.profitStat && this.loading.profitStat.hide();

			if(res.error === 0) {
				this.profitStat = res.result;
				this.loadChartSecond();
			}
		},
		loadChartSecond() {
			// get data
			// let indexArr = [];
			// let channelArr = [];
			let storageArr = [];
			let timeArr = [];
			for (let i = 0; i < 7; i++) {
				let item = this.profitStat[i];
				// indexArr.unshift(item.IndexProfitFormat);
				// channelArr.unshift(item.ChannelProfitFormat);
				storageArr.unshift(item.StorageProfitFormat);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "Profit",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				// legend: {
				// 	data: ['Index', 'Flow','Storage'],
				// 	left: 'center',
				// 	bottom: '4%',
				// 	textStyle: {
				// 		color: '#ffffff'
				// 	}
				// },
				tooltip: {
					trigger: "axis",
					formatter: function(params) {
						if(!params) return '';
						let desc = params[0].name;
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value} ONI`
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
            formatter: '{value} ONI'
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				series: [
					// {
					// 	name: "Index",
					// 	type: "bar",
					// 	stack: "Total",
					// 	data: indexArr,
					// 	barMaxWidth: 30,
					// 	itemStyle: {
					// 		color: "#0387E3"
					// 	}
					// },
					// {
					// 	name: "Flow",
					// 	type: "bar",
					// 	stack: "Total",
					// 	barMaxWidth: 30,
					// 	data: channelArr,
					// 	itemStyle: {
					// 		color: "#3ABAA4"
					// 	}
					// },
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
			// add loading
			this.loading.fileStat = this.$loading.show({
				container: this.$refs.chartThirdDiv,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getFileState({days: 7});
			
			//close loading
			this.loading.fileStat && this.loading.fileStat.hide();


			if(res.error === 0) {
				this.fileState = res.result;
				this.loadChartThird();
			}
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
					text: "Number of Files",
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
			// add loading
			this.loading.channelStat = this.$loading.show({
				container: this.$refs.chartFourthDiv,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getChannelStat({days: 7});

			// close loading
			this.loading.channelStat && this.loading.channelStat.hide();

			if(res.error === 0) {
				this.channelStat = res.result;
				this.loadChartFourth();
			}
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
					text: "Number of Channels",
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
			// add loading
			this.loading.transactionStat = this.$loading.show({
				container: this.$refs.chartFifthDiv,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getTransactionStat({days: 7});

			// close loading
			this.loading.transactionStat && this.loading.transactionStat.hide();

			if(res.error === 0) {
				this.transactionStat = res.result;
				this.loadChartFifth();
			}
		},
		loadChartFifth() {
			let transactionArr = [];
			let timeArr = [];
			// let currentTimestamp = Date.parse(new Date());
			for (let i = 0; i < 7; i++) {
				let item = this.transactionStat[i];
				// let transactionTotal = item.Onchain + item.Offchain;
				// transactionArr.unshift(transactionTotal);
				let _total = item.Onchain + item.Offchain;
				transactionArr.unshift(_total);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let option = {
				title: {
					text: "Daily Transactions",
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
			// add loading
			this.loading.stakeStat = this.$loading.show({
				container: this.$refs.chartSixthDiv,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getStakeStat({days: 7});

			// close loading
			this.loading.stakeStat && this.loading.stakeStat.hide();

			if(res.error === 0) {
				this.stakeStat = res.result;
				this.loadChartSixth();
			}
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
					text: "Total Stake",
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
					data:['DNS Stake','FS Stake'],
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
            formatter: '{value} ONI'
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
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value} ONI`
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
						name: "DNS Stake",
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
						name: "FS Stake",
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