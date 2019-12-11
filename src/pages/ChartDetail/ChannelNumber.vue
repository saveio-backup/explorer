<template>
	<div id="channelNumber">
		<div class="channel-number-chart-wrapper">
			<div
				class="channel-number-chart loading-content"
				id="channelNumberChart"
			>
			</div>
		</div>
		<div class="channel-number-tb">
			<el-table
				style="width: 100%;"
				:data="tbList"
			>
				<el-table-column
					fixed
					label="Date"
					min-width="100"
				>
					<template slot-scope="scope">
						<div>
							{{$dateFormat.formatTimeByTimestamp(scope.row.UpdatedAt*1000)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="New"
					label="New"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="Close"
					label="Close"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="Total"
					label="Total"
					width="180"
				>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				@current-change="currentChange"
				background
				layout="prev, pager, next"
				:total="total"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import echarts from "echarts";
export default {
	name: "ChannelNumber",
	data() {
		return {
			channelNumberChart: null,
			channelNumberList: null,
			currentPage: 1
		};
	},
	computed: {
		tbList() {
			if (!this.channelNumberList) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end =
				_start + 10 > this.channelNumberList.length
					? this.channelNumberList.length
					: _start + 10;
			let list = this.channelNumberList.slice(_start, _end);
			return list;
		},
		total() {
			if (!this.channelNumberList) return 0;
			return this.channelNumberList.length;
		},
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.channelNumberChart.resize();
		}
	},
	methods: {
		init() {
			this.getChannelStat();
			// this.setChannelNumberChart();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		async getChannelStat() {
			let res = await this.$api2.getChannelStat({});
			if(res.error === 0) {
				this.channelNumberList = res.result;
				this.setChannelNumberChart();
			}
			// this.$axios
			// 	.get(
			// 		`${this.$api.getchannelstat}/0`,
			// 		{},
			// 		{
			// 			loading: {
			// 				text: "Loading...",
			// 				target: ".loading-content.channel-number-chart"
			// 			}
			// 		}
			// 	)
			// 	.then(data => {
			// 		let res = data.data
			// 		if (res.Error === 0) {
			// 			this.channelNumberList = res.Result["Details"];
			// 			this.setChannelNumberChart();
			// 		}
			// 	});
		},
		setChannelNumberChart() {
			let channelNumArr = [];
			let timeArr = [];
			for (let item of this.channelNumberList) {
				channelNumArr.unshift(item.Total);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let _scale =
				(1 -
					(29.5 / this.channelNumberList.length > 1
						? 1
						: 29.5 / this.channelNumberList.length)) *
				100;
			let option = {
				itemStyle: {
					color: "#CDDC39"
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "16%"
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
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985"
						}
					}
				},
				dataZoom: [
					{
						type: "inside",
						start: _scale,
						end: 100
					},
					{
						start: 0,
						end: 30,
						bottom: "4%",
						dataBackground: {
							areaStyle: {
								color: "rgba(255,255,255, 0.4)"
							}
						},
						handleIcon:
							"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
						handleSize: "80%",
						handleStyle: {
							color: "#fff",
							shadowBlur: 3,
							shadowColor: "rgba(0, 0, 0, 0.3)",
							shadowOffsetX: 2,
							shadowOffsetY: 2
						}
					}
				],
				series: [
					{
						data: channelNumArr,
						type: "line",
						areaStyle: {
							color: "rgba(205, 220, 57, 0.2)"
						}
					}
				]
			};
			let dom = document.getElementById("channelNumberChart");
			this.channelNumberChart = echarts.init(dom);
			this.channelNumberChart.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#channelNumber {
	width: 100%;
	height: auto;
	.channel-number-chart-wrapper {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 720px;
		margin-top: 72px;
		.channel-number-chart {
			width: 100%;
			height: 100%;
		}
	}

	.channel-number-tb {
		height: 630px;
		position: relative;
		margin: 66px auto 80px;
		width: 100%;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		padding: 15px 32px;
		box-sizing: border-box;
		max-width: 1170px;
		width: calc(100% - 30px);
	}

	.pagination {
		position: absolute;
		bottom: 25px;
		right: 25px;
	}
}
</style>