<template>
	<div class="chart-detail">
		<charts-component :type="0"></charts-component>
		<h3>Address Warehouse</h3>
		<section
			class="address-warehouse loading-content"
			@click.stop="goPage('/chartDetail/Addresswarehouse')"
		>
			<section
				class="address-number-distribution"
				id="addressNumberDistributionChart"
			></section>
			<section
				class="address-balance-distribution"
				id="addressBalanceDistributionChart"
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
			addressNumberDistributionChart: null,
			addressBalanceDistributionChart: null,
			addressStat: null,
			addrCountList: null,
			amountCountList: null
		};
	},
	computed: {
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.addressNumberDistributionChart.resize();
			this.addressBalanceDistributionChart.resize();
		}
	},
	methods: {
		goPage(path) {
			this.$router.push({
				path: path
			});
		},
		init() {
			this.getAddressStat();
		},
		getAddressStat() {
			this.$axios
				.get(
					this.$api.getaddressstat,
					{},
					{
						loading: {
							text: "Loading...",
							target: ".loading-content.address-warehouse"
						}
					}
				)
				.then(data => {
					let res = data.data
					if (res.Error === 0) {
						this.addrCountList = res.Result["AddrCountList"];
						this.amountCountList = res.Result["AmountCountList"];
						this.setAddressNumberDistribution();
						this.setAddressBalanceDistribution();
					}
				});
		},
		setAddressNumberDistribution() {
			let addrCountArr = [];
			let addrCountRatioArr = [];
			let scopeArr = [];
			for (let item of this.addrCountList) {
				addrCountArr.push(item.Count);
				addrCountRatioArr.push(item.Ratio * 100);
				scopeArr.push(item.Range);
			}
			let option = {
				title: {
					text: "Address Count Distribution",
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
					formatter: function(params) {
						if(!params) return '';
						let desc = params[0].name + ' ONI';
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value}`
							if(value.seriesName === 'Ratio') {
								desc += '%';
							}
						}
						return desc
					},
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
						data: scopeArr,
						axisLabel: {
							formatter: "{value} ONI"
						},
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
						name: "Count",
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
						name: "Ratio",
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
						name: "Count",
						type: "bar",
						data: addrCountArr,
						barMaxWidth: 30,
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						name: "Ratio",
						itemStyle: {
							color: "#15A4C6"
						},
						type: "line",
						yAxisIndex: 1,
						data: addrCountRatioArr
					}
				]
			};
			let dom = document.getElementById("addressNumberDistributionChart");
			this.addressNumberDistributionChart = echarts.init(dom);
			this.addressNumberDistributionChart.setOption(option, true);
		},
		setAddressBalanceDistribution() {
			let amountCountArr = [];
			let amountCountRatioArr = [];
			let scopeArr = [];
			for (let item of this.amountCountList) {
				amountCountArr.push(item.Count);
				amountCountRatioArr.push(item.Ratio * 100);
				scopeArr.push(item.Range);
			}
			let option = {
				title: {
					text: "Address Balance Distribution",
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
					formatter: function(params) {
						if(!params) return '';
						let desc = params[0].name + ' ONI';
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value}`
							if(value.seriesName === 'Ratio') {
								desc += '%';
							} else {
								desc += ' ONI';
							}
						}
						return desc
					},
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
						data: scopeArr,
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
						name: "Balance",
						axisLabel: {
							formatter: "{value}"
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
						name: "Ratio",
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
						name: "Balance",
						type: "bar",
						data: amountCountArr,
						barMaxWidth: 30,
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						name: "Ratio",
						itemStyle: {
							color: "#15A4C6"
						},
						type: "line",
						yAxisIndex: 1,
						data: amountCountRatioArr
					}
				]
			};
			let dom = document.getElementById("addressBalanceDistributionChart");
			this.addressBalanceDistributionChart = echarts.init(dom);
			this.addressBalanceDistributionChart.setOption(option, true);
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