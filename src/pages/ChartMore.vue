<template>
	<div class="chart-detail">
		<charts-component :type="0"></charts-component>
		<h3>地址持仓</h3>
		<section class="address-warehouse">
			<section
				class="address-number-distribution"
				id="addressNumberDistribution"
			></section>
			<section
				class="address-balance-distribution"
				id="addressBalanceDistribution"
			></section>
		</section>
	</div>
</template>
<script>
import chartsComponent from "./../components/ChartsComponent";
import echarts from "echarts";
export default {
	name: "ChartMore",
	components: {
		chartsComponent
	},
	data() {
		return {
			addressNumberDistribution: null
		};
	},
	methods: {
		init() {
			this.setAddressNumberDistribution();
			this.setAddressBalanceDistribution();
		},
		setAddressNumberDistribution() {
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
			let dom = document.getElementById("addressNumberDistribution");
			this.addressNumberDistribution = echarts.init(dom);
			this.addressNumberDistribution.setOption(option, true);
		},
		setAddressBalanceDistribution() {
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
			let dom = document.getElementById("addressBalanceDistribution");
			this.addressBalanceDistribution = echarts.init(dom);
			this.addressBalanceDistribution.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
.chart-detail {
	padding-top: 200px;
	padding-bottom: 80px;

	h3 {
		font-size: 16px;
		color: white;
		margin: 60px auto 30px;
		text-align: center;
	}

	.address-warehouse {
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 20px auto;
		height: 854px;
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		transition: width 0.5s;

		.address-number-distribution,
		.address-balance-distribution {
			height: 427px;
			padding: 5px 32px;
		}
	}
}
</style>