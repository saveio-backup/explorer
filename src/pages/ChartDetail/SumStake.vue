<template>
	<div id="sumStake">
		<div class="sum-stake-wrapper">
			<div
				class="sum-stake-chart relative"
				ref="sumStakeChart"
				id="sumStakeChart"
			>
			</div>
		</div>
		<div class="sum-stake-tb relative" ref="sumStakeTb">
			<el-table
				style="width: 100%;"
				:data="tbList"
			>
				<el-table-column
					fixed
					label="Date"
					min-width="180"
				>
					<template slot-scope="scope">
						<div>
							{{$dateFormat.formatYearMonthDayByTimestamp(scope.row.UpdatedAt*1000)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="DNSFormat"
					label="DNS Stake(ONI)"
					min-width="180"
				>
				</el-table-column>
				<el-table-column
					prop="FSFormat"
					label="FS Stake(ONI)"
					min-width="180"
				>
				</el-table-column>
				<el-table-column
					prop="total"
					label="Total Stake(ONI)"
					min-width="180"
				>
					<template slot-scope="scope">
						<div>
							{{Number(scope.row.DNSFormat) + Number(scope.row.FSFormat)}}
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
	name: "SumStake",
	data() {
		return {
			sumStakeChart: null,
			sumStakeList: null,
			currentPage: 1,
			loading: {
				stakeStatChart: null,
				stakeStatTb: null,
			}
		};
	},
	computed: {
		tbList() {
			if (!this.sumStakeList) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end = _start + 10 > this.sumStakeList.length ? this.sumStakeList.length : _start + 10;
			let list = this.sumStakeList.slice(_start, _end);
			return list;
		},
		total() {
			if(!this.sumStakeList) return 0;
			return this.sumStakeList.length;
		},
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.sumStakeChart.resize();
		}
	},
	methods: {
		init() {
			this.getstakestat();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		async getstakestat() {
			// add loading
			this.loading.stakeStatChart = this.$loading.show({
				container: this.$refs.sumStakeChart,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
			this.loading.stakeStatTb = this.$loading.show({
				container: this.$refs.sumStakeTb,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getStakeStat({});

			// close loading
			this.loading.stakeStatChart && this.loading.stakeStatChart.hide();
			this.loading.stakeStatTb && this.loading.stakeStatTb.hide();

			if(res.error === 0) {
				this.sumStakeList = res.result;
				this.setSumStakeChart();
			}
		},
		setSumStakeChart() {
			let stakeFsNumArr = [];
			let stakeDnsNumArr = [];
			let timeArr = [];
			for(let item of this.sumStakeList) {
				stakeFsNumArr.unshift(item.FSFormat);
				stakeDnsNumArr.unshift(item.DNSFormat);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(item.UpdatedAt * 1000);
				timeArr.unshift(timeFormat);
			}
			let _scale = (1 - (29.5 / this.sumStakeList.length > 1 ? 1 : 29.5 / this.sumStakeList.length)) * 100;
			let option = {
				grid: {
					left: "13%",
					right: "4%",
					bottom: "24%"
				},
				legend: {
					data:['DNS Stake','FS Stake'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
					}
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
					axisLabel: {
            formatter: '{value} ONI'
					},
					axisLine: {
						lineStyle: {
							color: "rgba(255,255,255, 0.4)"
						}
					}
				},
				tooltip: {
					trigger: "axis",
					// formatter: "{b}<br/>{c} ONI",
					formatter: function(params) {
						console.log(params);
						if(!params) return '';
						let desc = params[0].name;
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value} ONI`
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
				dataZoom: [
					{
						type: "inside",
						start: _scale,
						end: 100
					},
					{
						start: 0,
						end: 30,
						bottom: "12%",
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
						name: "DNS Stake",
						data: stakeDnsNumArr,
						type: "line",
						areaStyle: {
							color: "rgba(205, 220, 57, 0.2)"
						},
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						data: stakeFsNumArr,
						type: "line",
						name: "FS Stake",
						areaStyle: {
							color: "rgba(21, 164, 198, 0.24)"
						},
						itemStyle: {
							color: "#15A4C6"
						}
					}
				]
			};
			let dom = document.getElementById("sumStakeChart");
			this.sumStakeChart = echarts.init(dom);
			this.sumStakeChart.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#sumStake {
	width: 100%;
	height: auto;

	.sum-stake-wrapper {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 720px;
		margin-top: 72px;

		.sum-stake-chart {
			width: 100%;
			height: 100%;
		}
	}

	.sum-stake-tb {
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
