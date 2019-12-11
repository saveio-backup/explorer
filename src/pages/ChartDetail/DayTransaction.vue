<template>
	<div id="dayTransaction">
		<div class="day-transaction-wrapper">
			<div class="day-transaction-exchange">
				<p
					@click.stop="setSelectTime(0)"
					class="day-transaction-chart-btn"
					:class="{'select': selectTime === 0}"
				>Off Chain</p>
				<p
					class="day-transaction-chart-btn ml10"
					:class="{'select': selectTime === 1}"
					@click.stop="setSelectTime(1)"
				>On Chain</p>
			</div>
			<div
				id="allNetProfitChart"
				class="all-net-profit-chart loading-content"
			></div>
			<div
				class="day-transaction-chart loading-content"
				id="dayTransactionChart"
			></div>
		</div>
		<div class="day-transaction-tb">
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
					label="On Chain Transaction"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{scope.row.Onchain}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="Off Chain Transaction"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{scope.row.Offchain}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="Total Chain Transaction"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{scope.row.Onchain + scope.row.Offchain}}
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
	name: "DayTransaction",
	data() {
		return {
			dayTransactionChart: null,
			dayTransactionList: null,
			currentPage: 1,
			selectTime: 1 // 0, 1 (1 is on chain,0 is off chain)
		};
	},
	computed: {
		tbList() {
			if (!this.dayTransactionList) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end =
				_start + 10 > this.dayTransactionList.length
					? this.dayTransactionList.length
					: _start + 10;
			let list = this.dayTransactionList.slice(_start, _end);
			return list;
		},
		total() {
			if (!this.dayTransactionList) return 0;
			return this.dayTransactionList.length;
		},
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.dayTransactionChart.resize();
		}
	},
	methods: {
		init() {
			this.getTransactionStat();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		getTransactionStat() {

			this.$axios
				.get(
					`${this.$api.gettransactionstat}/0`,
					{},
					{
						loading: {
							text: "Loading...",
							target: ".loading-content.day-transaction-chart"
						}
					}
				)
				.then(data => {
					let res = data.data
					if (res.Error === 0) {
						this.dayTransactionList = res.Result["Details"];
						this.setDayTransactionChart();
					}
				});
		},
		setDayTransactionChart() {
			let dayTransactionArr = [];
			let timeArr = [];
			for (let item of this.dayTransactionList) {
				// let total = item.Offchain + item.Onchain;
				let total = this.selectTime === 0 ? item.Offchain : item.Onchain;
				dayTransactionArr.unshift(total);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let _scale =
				(1 -
					(29.5 / this.dayTransactionList.length > 1
						? 1
						: 29.5 / this.dayTransactionList.length)) *
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
						data: dayTransactionArr,
						type: "line",
						areaStyle: {
							color: "rgba(205, 220, 57, 0.2)"
						}
					}
				]
			};
			let dom = document.getElementById("dayTransactionChart");
			this.dayTransactionChart = echarts.init(dom);
			this.dayTransactionChart.setOption(option, true);
		},
		setSelectTime(value) {
			this.selectTime = value;
			this.setDayTransactionChart();
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#dayTransaction {
	width: 100%;
	height: auto;
	.day-transaction-wrapper {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 720px;
		margin-top: 72px;
		position: relative;

		.day-transaction-chart {
			width: 100%;
			height: 100%;
		}

		.day-transaction-exchange {
			width: 100%;
			height: 32px;
			position: absolute;
			top: -32px;

			.day-transaction-chart-btn {
				width: 110px;
				height: 32px;
				border-radius: 4px 4px 0px 0px;
				transition: 0.2s all ease;
				cursor: pointer;
				float: right;
				text-align: center;
				color: #ffffff;
				line-height: 32px;
				font-size: 14px;

				&.select,
				&:hover {
					background: rgba(205, 220, 57, 0.7);
				}

				&:active {
					opacity: 0.7;
				}
			}
		}
	}

	.day-transaction-tb {
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