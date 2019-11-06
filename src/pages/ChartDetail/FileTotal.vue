<template>
	<div id="fileTotal">
		<div class="file-total-chart-wrapper">
			<div
				class="file-total-chart"
				id="fileTotalChart"
			>
			</div>
		</div>
		<div class="file-total-tb">
			<el-table
				style="width: 100%;"
				:data="fileTotalList"
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
					label="新增(个)"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="total"
					label="总量(个)"
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
	name: "FileTotal",
	data() {
		return {
			fileTotalChart: null,
			fileTotalList: [
				{
					month: "9/18",
					newAdd: 231,
					total: 412312
				},
				{
					month: "9/18",
					newAdd: 231,
					total: 412312
				},
				{
					month: "9/18",
					newAdd: 231,
					total: 412312
				},
				{
					month: "9/18",
					newAdd: 231,
					total: 412312
				}
			]
		};
	},
	methods: {
		init() {
			let option = {
				itemStyle: {
					color: "#CDDC39"
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "12%"
				},
				// dataZoom: [
				// 	{
				// 		show: true,
				// 		realtime: true,
				// 		start: 65,
				// 		end: 85
				// 	},
				// 	{
				// 		type: "inside",
				// 		realtime: true,
				// 		start: 65,
				// 		end: 85
				// 	}
				// ],
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross",
						label: {
							backgroundColor: "#6a7985"
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
							color: "rgba(205, 220, 57, 0.2)"
						}
					}
				]
			};
			let dom = document.getElementById("fileTotalChart");
			this.fileTotalChart = echarts.init(dom);
			this.fileTotalChart.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#fileTotal {
	width: 100%;
	height: auto;
	.file-total-chart-wrapper {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 720px;
		margin-top: 72px;

		.file-total-chart {
			width: 100%;
			height: 100%;
		}
	}

	.file-total-tb {
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