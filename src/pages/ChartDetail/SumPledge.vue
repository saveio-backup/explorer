<template>
	<div id="sumPledge">
		<div class="sum-pledge-wrapper">
			<div
				class="sum-pledge-chart"
				id="sumPledgeChart"
			>
			</div>
		</div>
		<div class="sum-pledge-tb">
			<el-table
				style="width: 100%;"
				:data="sumPledgeList"
			>
				<el-table-column
					fixed
					prop="date"
					label="月份"
					min-width="100"
				>
				</el-table-column>
				<el-table-column
					prop="dnsPledge"
					label="DNS质押(SAVE)"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="fsPledge"
					label="FS质押(SAVE)"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="total"
					label="质押总量(SAVE)"
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
	name: "SumPledge",
	data() {
		return {
			sumPledgeChart: null,
			sumPledgeList: [
				{
					date: "9/18",
					dnsPledge: 1400,
					fsPledge: 1412,
					total: 124124
				},
				{
					date: "9/18",
					dnsPledge: 1400,
					fsPledge: 1412,
					total: 124124
				},
				{
					date: "9/18",
					dnsPledge: 1400,
					fsPledge: 1412,
					total: 124124
				},
				{
					date: "9/18",
					dnsPledge: 1400,
					fsPledge: 1412,
					total: 124124
				}
			]
		};
	},
	methods: {
		init() {
			this.setSumPledgeChart();
		},
		setSumPledgeChart() {
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
			let dom = document.getElementById("sumPledgeChart");
			this.sumPledgeChart = echarts.init(dom);
			this.sumPledgeChart.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#sumPledge {
	width: 100%;
	height: auto;

	.sum-pledge-wrapper {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 720px;
		margin-top: 72px;

		.sum-pledge-chart {
			width: 100%;
			height: 100%;
		}
	}

	.sum-pledge-tb {
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

		.pagination {
			position: absolute;
			bottom: 25px;
			right: 25px;
		}
	}
}
</style>
