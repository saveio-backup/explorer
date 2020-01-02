<template>
	<div id="allNetProfit">
		<div class="all-net-profit-chart-wrapper">
			<div class="all-net-profit-exchange">
				<p
					class="all-net-profit-chart-btn ml10"
					:class="{'select': selectTime === 1}"
					@click.stop="setSelectTime(1)"
				>{{$t('month')}}</p>
				<p
					@click.stop="setSelectTime(0)"
					class="all-net-profit-chart-btn"
					:class="{'select': selectTime === 0}"
				>{{$t('day')}}</p>
			</div>
			<div
				id="allNetProfitChart"
				class="all-net-profit-chart relative"
				ref="allNetProfitChart"
			></div>
		</div>
		<div class="all-net-profit-tb relative" ref="allNetProfitTb">
			<el-table
				style="width: 100%;"
				:data="tbList"
				:empty-text="$t('noData')"
			>
				<el-table-column
					fixed
					:label="$t('date')"
					min-width="180"
				>
					<template slot-scope="scope">
						<div v-if="selectTime === 0">
							{{$dateFormat.formatYearMonthDayByTimestamp(scope.row.UpdatedAt*1000)}}
						</div>
						<div v-else>
							{{$dateFormat.formatYearMonthByTimestamp(scope.row.UpdatedAt*1000)}}
						</div>
					</template>
				</el-table-column>
				<!-- <el-table-column
					prop="IndexProfitFormat"
					:label="`${$t('indexProfit')}(ONI)`"
					min-width="180"
				>
				</el-table-column>
				<el-table-column
					prop="ChannelProfitFormat"
					:label="`${$t('flowProfit')}(ONI)`"
					min-width="180"
				>
				</el-table-column> -->
				<el-table-column
					prop="StorageProfitFormat"
					:label="`${$t('storageProfit')}(ONI)`"
					min-width="180"
				>
				</el-table-column>
				<el-table-column
					:label="`${$t('totalProfit')}(ONI)`"
					min-width="180"
				>
					<template slot-scope="scope">
						{{Number(scope.row.IndexProfitFormat) + Number(scope.row.ChannelProfitFormat) + Number(scope.row.StorageProfitFormat)}}
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
	name: "AllNetProfit",
	data() {
		return {
			allNetProfitChart: null,
			selectTime: 0, // 0, 1 (1 is month,0 is day)
			allNetProfitList: null,
			allNetProfitListMonth: null,
			currentPage: 1,
			loading: {
				profitStatChart: null,
				profitStatTb: null,
			}
		};
	},
	computed: {
		tbList() {
			let date =
				this.selectTime === 0
					? this.allNetProfitList
					: this.allNetProfitListMonth;
			if (!date) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end = _start + 10 > date.length ? date.length : _start + 10;
			let list = date.slice(_start, _end);
			return list;
    },
    total() {
      let date =
				this.selectTime === 0
					? this.allNetProfitList
          : this.allNetProfitListMonth;
      if (!date) return 0;
      return date.length;        
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
			if(this.allNetProfitChart) {
				this.allNetProfitChart.resize();
			}
		},
		lang() {
			if(this.allNetProfitChart) {
				this.setAllNetProfitChart();
			}
		}
	},
	methods: {
		init() {
			this.getProfitStat();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		async getProfitStat() {
			let selectTime = this.selectTime;
			let res;

			// add loading
			this.loading.profitStatChart = this.$loading.show({
				container: this.$refs.allNetProfitChart,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
			this.loading.profitStatTb = this.$loading.show({
				container: this.$refs.allNetProfitTb,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			if(this.selectTime === 0) {
				res = await this.$api2.getProfitStat({type: 0});
			} else {
				res = await this.$api2.getProfitStat({limit: 12, type: 1});
			}

			//close loading
			this.loading.profitStatChart && this.loading.profitStatChart.hide();
			this.loading.profitStatTb && this.loading.profitStatTb.hide();

			if(res.error === 0) {
				if (selectTime === 0) {
					this.allNetProfitList = res.result;
				} else {
					this.allNetProfitListMonth = res.result;
				}
				this.setAllNetProfitChart();
			} else {
				this.$message.error(this.$t(`error['${res.error}']`));
			}
		},
		setAllNetProfitChart() {
			const vm = this;
			let date =
				this.selectTime === 0
					? this.allNetProfitList
					: this.allNetProfitListMonth;
			// let indexArr = [];
			// let channelArr = [];
			let storageArr = [];
      let timeArr = [];
      let _scale;
      
			for (let i = 0; i < date.length; i++) {
				let item = date[i];
				let _timestamp = item.UpdatedAt * 1000;
				let timeFormat;
				if (this.selectTime === 0) {
					timeFormat = this.$dateFormat.formatMonthDayByTimestamp(_timestamp);
				} else {
					timeFormat = this.$dateFormat.formatYearMonthByTimestamp(_timestamp);
				}
				timeArr.unshift(timeFormat);
				// indexArr.unshift(item.IndexProfitFormat);
				// channelArr.unshift(item.ChannelProfitFormat);
				storageArr.unshift(item.StorageProfitFormat);
      }
      if(this.selectTime === 0) {
        _scale = (1 - (29.5 / date.length > 1 ? 1 : 29.5 / date.length)) * 100;
      } else {
        _scale = (1 - (11.5 / date.length > 1 ? 1 : 11.5 / date.length)) * 100;
      }
			let option = {
				// legend: {
				// 	data: ["Index", "Flow", "Storage"],
				// 	left: "center",
				// 	bottom: "4%",
				// 	textStyle: {
				// 		color: "#ffffff"
				// 	}
				// },
				tooltip: {
					trigger: "axis",
					formatter: function(params) {
						if(!params) return '';
						let desc = params[0].name;
						for(let i = 0;i < params.length;i ++) {
							let value = params[i];
							desc += `<br/>${value.marker}${value.seriesName}: ${value.value} ONI`
						}
						return desc
					},
					
					// "{a0}: {c0} ONI<br/>{a1}: {c1} ONI<br/>{a2}: {c2} ONI",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "18%"
				},
				xAxis: {
					type: "category",
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
				dataZoom: [
					{
						type: "inside",
						start: _scale,
						end: 100
					},
					{
						start: 0,
						end: 30,
						bottom: "8%",
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
					// {
					// 	name: "Index",
					// 	type: "bar",
					// 	stack: "Total",
					// 	barMaxWidth: 30,
					// 	data: indexArr,
					// 	itemStyle: {
					// 		color: "#0387E3"
					// 	}
					// },
					// {
					// 	name: "Flow",
					// 	type: "bar",
					// 	stack: "Total",
					// 	barMaxWidth: 30,
					// 	data: channelArr,
					// 	itemStyle: {
					// 		color: "#3ABAA4"
					// 	}
					// },
					{
						name: vm.$t('storage'),
						type: "bar",
						stack: "Total",
						barMaxWidth: 30,
						data: storageArr,
						itemStyle: {
							color: "#ABCC59"
						}
					}
				]
			};
			let dom = document.getElementById("allNetProfitChart");
			this.allNetProfitChart = echarts.init(dom);
			this.allNetProfitChart.setOption(option, true);
		},
		setSelectTime(value) {
			this.selectTime = value;
			this.currentPage = 1;
			if (
				(this.selectTime === 0 && !this.allNetProfitList) ||
				(this.selectTime === 1 && !this.allNetProfitListMonth)
			) {
				this.getProfitStat();
			} else {
				this.setAllNetProfitChart();
			}
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#allNetProfit {
	width: 100%;
	height: auto;

	.all-net-profit-chart-wrapper {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 720px;
		margin-top: 72px;
		position: relative;

		.all-net-profit-chart {
			width: 100%;
			height: 100%;
		}

		.all-net-profit-exchange {
			width: 100%;
			height: 32px;
			position: absolute;
			top: -32px;

			.all-net-profit-chart-btn {
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

	.all-net-profit-tb {
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