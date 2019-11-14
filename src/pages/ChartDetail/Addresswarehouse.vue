<template>
	<div id="addressWarehouse">
		<div class="address-warehouse-wrapper loading-content pt30">
			<div class="flex white between ft14 mb20 address-warehouse-desc">
        <div>
					<span class="op07">
						Address Total: 
					</span>
					<span class="fontImportant">
						{{addressWarehouseObj && addressWarehouseObj.Total}}
					</span>
				</div>
        <div>
					<span class="op07">
						New Address in 7 Day: 
					</span>
					<span class="fontImportant">
						{{addressWarehouseObj && addressWarehouseObj.NewAddrIn7D}}
					</span>
				</div>
        <div>
					<span class="op07">
						New Address in 30 Day:
					</span>
					<span class="fontImportant">
					 {{addressWarehouseObj && addressWarehouseObj.NewAddrIn30D}}
					</span>
				</div>
      </div>
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
				:data="tbList"
			>
				<el-table-column
					fixed
					prop="Number"
					label="#"
					min-width="100"
				>
				</el-table-column>
				<el-table-column
					prop="Address"
					label="Address"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="BalanceFormat"
					label="Balance(SAVE)"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="TransferCountIn30D"
					label="Transfer Count In 30 Day"
					width="180"
				>
				</el-table-column>
				<el-table-column
					label="First Transfer Date"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{$dateFormat.formatTimeByTimestamp(scope.row.FirstTransferDate*1000)}}
						</div>
					</template>
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
	name: "Addresswarehouse",
	data() {
		return {
			addressWarehouseNumberChart: null,
			addressWarehouseBalanceChart: null,
			addressWarehouseObj: null,
			currentPage: 1
		};
	},
	computed: {
		tbList() {
			if (!this.addressWarehouseObj) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end =
				_start + 10 > this.addressWarehouseObj.Details.length
					? this.addressWarehouseObj.Details.length
					: _start + 10;
			let list = this.addressWarehouseObj.Details.slice(_start, _end);
			return list;
		},
		total() {
			if (!this.addressWarehouseObj) return 0;
			return this.addressWarehouseObj.Details.length;
		},
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.addressWarehouseNumberChart.resize();
			this.addressWarehouseBalanceChart.resize();
		}
	},
	methods: {
		init() {
			this.getAddressStat();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		getAddressStat() {
			this.$axios
				.get(
					this.$api.getaddressstat,
					{},
					{
						loading: {
							text: "Loading...",
							target: ".loading-content.day-transaction-chart"
						}
					}
				)
				.then(res => {
					if (res.Error === 0) {
						for (let i = 0; i < res.Result.Details.length; i++) {
							let item = res.Result.Details[i];
							item.Number = i + 1;
						}
						this.addressWarehouseObj = res.Result;
						this.setAddressWarehouseNumberChart();
						this.setAddressWarehouseBalanceChart();
					}
				});
		},
		setAddressWarehouseNumberChart() {
			let addressWarehouseNumArr = [];
			let addressWarehouseRatioArr = [];
			let scopeArr = [];
			for (let item of this.addressWarehouseObj.AddrCountList) {
				addressWarehouseNumArr.push(item.Count);
				addressWarehouseRatioArr.push(item.Ratio * 100);
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
						if (!params) return "";
						let desc = params[0].name + " SAVE";
						for (let i = 0; i < params.length; i++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value}`;
							if (value.seriesName === "比例") {
								desc += "%";
							}
						}
						return desc;
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
							formatter: "{value} SAVE"
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
						data: addressWarehouseNumArr,
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
						data: addressWarehouseRatioArr
					}
				]
			};
			let dom = document.getElementById("addressWarehouseNumberChart");
			this.addressWarehouseNumberChart = echarts.init(dom);
			this.addressWarehouseNumberChart.setOption(option, true);
		},
		setAddressWarehouseBalanceChart() {
			let addressWarehouseBalanceArr = [];
			let addressWarehouseRatioArr = [];
			let scopeArr = [];
			for (let item of this.addressWarehouseObj.AmountCountList) {
				addressWarehouseBalanceArr.push(item.Count);
				addressWarehouseRatioArr.push(item.Ratio * 100);
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
						if (!params) return "";
						let desc = params[0].name + " SAVE";
						for (let i = 0; i < params.length; i++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value}`;
							if (value.seriesName === "Ratio") {
								desc += "%";
							} else {
								desc += " SAVE";
							}
						}
						return desc;
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
							formatter: "{value} SAVE"
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
						data: addressWarehouseBalanceArr,
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
						data: addressWarehouseRatioArr
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
		height: 914px;
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		transition: width 0.5s;

		.address-warehouse-desc {
			width: 80%;
			margin: 0 auto;
		}

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