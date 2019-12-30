<template>
	<div id="addressPosition">
		<div class="address-position-wrapper pt30 relative" ref="addressPositionWrapper">
			<!-- <div class="mock-data">Mock Data</div> -->
			<div class="flex white between ft14 mb20 address-position-desc">
        <div>
					<span class="op07">
						<!-- Address Total -->
						{{$t('addressTotal')}}: 
					</span>
					<span class="fontImportant">
						{{addressPositionObj && addressPositionObj.Total}}
					</span>
				</div>
        <div>
					<span class="op07">
						<!-- New Address in 7 Day -->
						{{$t('newAddressIn7Day')}}: 
					</span>
					<span class="fontImportant">
						{{addressPositionObj && addressPositionObj.NewAddrIn7D}}
					</span>
				</div>
        <div>
					<span class="op07">
						<!-- New Address in 30 Day -->
						{{$t('newAddressIn30Day')}}:
					</span>
					<span class="fontImportant">
					 {{addressPositionObj && addressPositionObj.NewAddrIn30D}}
					</span>
				</div>
      </div>
			<div
				class="address-position-number-chart"
				id="addressPositionNumberChart"
			></div>
			<div
				class="address-position-balance-chart"
				id="addressPositionBalanceChart"
			></div>
		</div>
		<div class="address-position-tb relative" ref="addressPositionTb">
			<el-table
				style="width: 100%;"
				:data="tbList"
			>
				<el-table-column
					fixed
					prop="Number"
					label="#"
					width="100"
				>
				</el-table-column>
				<el-table-column
					prop="Address"
					:label="$t('address')"
					min-width="180"
				>
				</el-table-column>
				<el-table-column
					prop="BalanceFormat"
					:label="`${$t('balance')}(ONI)`"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="TransferCountIn30D"
					:label="$t('transferCountIn30Day')"
					width="180"
				>
				</el-table-column>
				<el-table-column
					:label="$t('firstTransferDate')"
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
	name: "AddressPosition",
	data() {
		return {
			addressPositionNumberChart: null,
			addressPositionBalanceChart: null,
			addressPositionObj: null,
			currentPage: 1,
			loading: {
				addressPositionWrapper: null,
				addressPositionTb: null
			}
		};
	},
	computed: {
		tbList() {
			if (!this.addressPositionObj) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end =
				_start + 10 > this.addressPositionObj.Details.length
					? this.addressPositionObj.Details.length
					: _start + 10;
			let list = this.addressPositionObj.Details.slice(_start, _end);
			return list;
		},
		total() {
			if (!this.addressPositionObj) return 0;
			return this.addressPositionObj.Details.length;
		},
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		},
		lang() {
			return this.$t("lang");
		}
	},
	watch: {
		screenWidth() {
			if(this.addressPositionNumberChart) {
				this.addressPositionNumberChart.resize();
			}
			if(this.addressPositionBalanceChart) {
				this.addressPositionBalanceChart.resize();
			}
		},
		lang() {
			if(this.addressPositionNumberChart) {
				this.setAddressPositionNumberChart();
			}
			if(this.addressPositionBalanceChart) {
				this.setAddressPositionBalanceChart();
			}
		}
	},
	methods: {
		init() {
			this.getAddressStat();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		async getAddressStat() {
			// add loading
			this.loading.addressPositionWrapper = this.$loading.show({
				container: this.$refs.addressPositionWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
			this.loading.addressPositionTb = this.$loading.show({
				container: this.$refs.addressPositionTb,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getAddressStat();

			// close loading
			this.loading.addressPositionWrapper && this.loading.addressPositionWrapper.hide();
			this.loading.addressPositionTb && this.loading.addressPositionTb.hide();

			if(res.error === 0) {
				for (let i = 0; i < res.result.Details.length; i++) {
					let item = res.result.Details[i];
					item.Number = i + 1;
				}
				this.addressPositionObj = res.result;
				this.setAddressPositionNumberChart();
				this.setAddressPositionBalanceChart();
			} else {
				this.$message.error(this.$t(`error['${res.error}']`));
			}
		},
		setAddressPositionNumberChart() {
			const vm = this;
			let addressPositionNumArr = [];
			let addressPositionRatioArr = [];
			let scopeArr = [];
			for (let item of this.addressPositionObj.AddrCountList) {
				addressPositionNumArr.push(item.Count);
				addressPositionRatioArr.push(item.Ratio * 100);
				scopeArr.push(item.Range);
			}
			let option = {
				title: {
					text: vm.$t('addressDistribution'),
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
						let desc = params[0].name + " ONI";
						for (let i = 0; i < params.length; i++) {
							let value = params[i];
							if (value.seriesName === vm.$t('ratio')) {
								desc += `<br/>${value.marker}${value.seriesName}: ${parseFloat(value.value.toFixed(4))}%`;
							} else {
								desc += `<br/>${value.marker}${value.seriesName}: ${value.value}`;
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
						name:  vm.$t('count'),
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
						name: vm.$t('ratio'),
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
						name: vm.$t('count'),
						type: "bar",
						data: addressPositionNumArr,
						barMaxWidth: 30,
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						name: vm.$t('ratio'),
						itemStyle: {
							color: "#15A4C6"
						},
						type: "line",
						yAxisIndex: 1,
						data: addressPositionRatioArr
					}
				]
			};
			let dom = document.getElementById("addressPositionNumberChart");
			this.addressPositionNumberChart = echarts.init(dom);
			this.addressPositionNumberChart.setOption(option, true);
		},
		setAddressPositionBalanceChart() {
			const vm = this;
			let addressPositionBalanceArr = [];
			let addressPositionRatioArr = [];
			let scopeArr = [];
			for (let item of this.addressPositionObj.AmountCountList) {
				addressPositionBalanceArr.push(item.Count);
				addressPositionRatioArr.push(item.Ratio * 100);
				scopeArr.push(item.Range);
			}
			let option = {
				title: {
					text: vm.$t('balanceDistribution'),
					left: "center",
					top: "20",
					textStyle: {
						color: "#ffffff",
						fontSize: "16",
						fontWeight: "normal"
					}
				},
				grid: {
					left: "130px"
				},
				tooltip: {
					trigger: "axis",
					formatter: function(params) {
						if (!params) return "";
						let desc = params[0].name + " ONI";
						for (let i = 0; i < params.length; i++) {
							let value = params[i];
							if (value.seriesName === vm.$t('ratio')) {
								desc += `<br/>${value.marker}${value.seriesName}: ${parseFloat(value.value.toFixed(4))}%`;
							} else {
								desc += `<br/>${value.marker}${value.seriesName}: ${value.value} ONI`;
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
						name: vm.$t('balance'),
						axisLabel: {
							formatter: "{value} ONI"
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
						name: vm.$t('ratio'),
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
						name: vm.$t('balance'),
						type: "bar",
						data: addressPositionBalanceArr,
						barMaxWidth: 30,
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						name: vm.$t('ratio'),
						itemStyle: {
							color: "#15A4C6"
						},
						type: "line",
						yAxisIndex: 1,
						data: addressPositionRatioArr
					}
				]
			};
			let dom = document.getElementById("addressPositionBalanceChart");
			this.addressPositionBalanceChart = echarts.init(dom);
			this.addressPositionBalanceChart.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#addressPosition {
	width: 100%;
	height: auto;
	.address-position-wrapper {
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 72px auto 0;
		height: 914px;
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		transition: width 0.5s;
		position: relative;

		.mock-data {
			width: 120px;
			height: 26px;
			border-radius: 13px;
			opacity: 0.1;
			border: 1px solid #ffffff;
			font-size: 16px;
			color: #ffffff;
			user-select: none;
			position: absolute;
			top: -45px;
			right: 0;
			text-align: center;
			line-height: 26px;
			font-weight: 500;
		}

		.address-position-desc {
			width: 80%;
			margin: 0 auto;
		}

		.address-position-number-chart,
		.address-position-balance-chart {
			height: 427px;
			padding: 5px 32px;
		}
	}

	.address-position-tb {
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