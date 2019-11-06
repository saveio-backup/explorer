<template>
	<div id="channelNumber">
		<div class="channel-number-chart-wrapper">
			<div
				class="channel-number-chart"
				id="channelNumberChart"
			>
			</div>
		</div>
		<div class="channel-number-tb">
			<el-table
				style="width: 100%;"
				:data="channelNumberList"
			>
				<el-table-column
					fixed
					prop="month"
					label="月份"
					min-width="100"
				>
				</el-table-column>
				<el-table-column
					prop="newAdd"
					label="新增"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="close"
					label="关闭"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="num"
					label="数量"
					width="180"
				>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				background
				layout="prev, pager, next"
				:total="100"
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
			channelNumberList: [
				{
					month: "9/18",
					newAdd: 344,
					close: 32,
					num: 2321
				},
				{
					month: "9/18",
					newAdd: 344,
					close: 32,
					num: 2321
				},
				{
					month: "9/18",
					newAdd: 344,
					close: 32,
					num: 2321
				}
			]
		};
	},
	methods: {
		init() {
			this.setChannelNumberChart();
		},
		setChannelNumberChart() {
			let option = {
				itemStyle: {
					color: "#CDDC39"
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "12%"
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
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985"
						}
					}
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
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