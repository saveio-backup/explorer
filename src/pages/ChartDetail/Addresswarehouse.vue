<template>
	<div id="addressWarehouse">
		<div class="address-warehouse-wrapper">
			<div
				class="address-warehouse-number-chart"
				id="addressWarehouseNumberChart"
			></div>
			<div
				class="address-warehouse-balance-chart"
				id="addressWarehouseBalanceChart"
			></div>
		</div>
		<div class="address-warehouse-tb">
			<el-table
				style="width: 100%;"
				:data="addressWarehouseList"
			>
				<el-table-column
					fixed
					prop="number"
					label="#"
					min-width="100"
				>
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="balance"
					label="余额(SAVE)"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="transactionNum"
					label="近30天交易"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="firstTransaction"
					label="首次交易时间"
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
	name: "Addresswarehouse",
	data() {
		return {
			addressWarehouseNumberChart: null,
			addressWarehouseBalanceChart: null,
			addressWarehouseList: [
				{
					number: 0,
					address: "sfasafasfeukgbkjskjd1213123",
					balance: 12123,
					transactionNum: 151,
					firstTransaction: "2018-10-18 20:59:18"
				},
				{
					number: 0,
					address: "sfasafasfeukgbkjskjd1213123",
					balance: 12123,
					transactionNum: 151,
					firstTransaction: "2018-10-18 20:59:18"
				},
				{
					number: 0,
					address: "sfasafasfeukgbkjskjd1213123",
					balance: 12123,
					transactionNum: 151,
					firstTransaction: "2018-10-18 20:59:18"
				}
			]
		};
	},
	methods: {
		init() {
			this.setAddressWarehouseNumberChart();
			this.setAddressWarehouseBalanceChart();
		},
		setAddressWarehouseNumberChart() {
			let option = {
				title: {
					text: "地址数量分布",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
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
				xAxis: [
					{
						type: "category",
						data: [
							"0-0.00001",
							"0.00001-0.0001",
							"0.0001-0.001",
							"0.001-0.01",
							"0.01-0.1",
							"0.1-1",
							"1-10",
							"10-100",
							"100-1000",
							"1000-10000",
							"10000-100000"
						],
						axisPointer: {
							type: "shadow"
						},
						axisLine: {
							lineStyle: {
								color: "rgba(255,255,255, 0.4)"
							}
						}
					}
				],
				yAxis: [
					{
						type: "value",
						name: "数量",
						axisLabel: {
							formatter: "{value} ml"
						},
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
					{
						type: "value",
						name: "百分比",
						axisLabel: {
							formatter: "{value} %"
						},
						splitLine: {
							lineStyle: {
								color: "rgba(255,255,255, 0.2)",
								type: "dashed"
							}
						},
						axisLine: {
							lineStyle: {
								color: "rgba(255,255,255, 0.4)"
							}
						}
					}
				],
				series: [
					{
						name: "a数据",
						type: "bar",
						data: [
							2.0,
							4.9,
							7.0,
							23.2,
							25.6,
							76.7,
							135.6,
							162.2,
							32.6,
							20.0,
							6.4
						],
						barMaxWidth: 30,
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						name: "b数据",
						itemStyle: {
							color: "#15A4C6"
						},
						type: "line",
						yAxisIndex: 1,
						data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0]
					}
				]
			};
			let dom = document.getElementById("addressWarehouseNumberChart");
			this.addressWarehouseNumberChart = echarts.init(dom);
			this.addressWarehouseNumberChart.setOption(option, true);
		},
		setAddressWarehouseBalanceChart() {
			let option = {
				title: {
					text: "地址余额分布",
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
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
				xAxis: [
					{
						type: "category",
						data: [
							"0-0.00001",
							"0.00001-0.0001",
							"0.0001-0.001",
							"0.001-0.01",
							"0.01-0.1",
							"0.1-1",
							"1-10",
							"10-100",
							"100-1000",
							"1000-10000",
							"10000-100000"
						],
						axisPointer: {
							type: "shadow"
						},
						axisLine: {
							lineStyle: {
								color: "rgba(255,255,255, 0.4)"
							}
						}
					}
				],
				yAxis: [
					{
						type: "value",
						name: "数量",
						axisLabel: {
							formatter: "{value} ml"
						},
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
					{
						type: "value",
						name: "百分比",
						axisLabel: {
							formatter: "{value} %"
						},
						splitLine: {
							lineStyle: {
								color: "rgba(255,255,255, 0.2)",
								type: "dashed"
							}
						},
						axisLine: {
							lineStyle: {
								color: "rgba(255,255,255, 0.4)"
							}
						}
					}
				],
				series: [
					{
						name: "a数据",
						type: "bar",
						data: [
							2.0,
							4.9,
							7.0,
							23.2,
							25.6,
							76.7,
							135.6,
							162.2,
							32.6,
							20.0,
							6.4
						],
						barMaxWidth: 30,
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						name: "b数据",
						itemStyle: {
							color: "#15A4C6"
						},
						type: "line",
						yAxisIndex: 1,
						data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0]
					}
				]
			};
			let dom = document.getElementById("addressWarehouseBalanceChart");
			this.addressWarehouseBalanceChart = echarts.init(dom);
			this.addressWarehouseBalanceChart.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#addressWarehouse {
	width: 100%;
	height: auto;
	.address-warehouse-wrapper {
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 72px auto 0;
		height: 854px;
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		transition: width 0.5s;

		.address-warehouse-number-chart,
		.address-warehouse-balance-chart {
			height: 427px;
			padding: 5px 32px;
		}
	}

	.address-warehouse-tb {
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