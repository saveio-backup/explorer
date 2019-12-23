<template>
	<div id="storageSpace">
		<div class="all-net-storage-chart relative" ref="allNetStorageChart">
			<div
				class="all-net-storage-chart-circle"
				id="allNetStorageChartCircle"
			></div>
			<div
				class="all-net-storage-chart-line"
				id="allNetStorageChartLine"
			></div>
		</div>
		<div class="all-net-storage-tb relative" ref="allNetStorageTb">
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
							{{$dateFormat.formatYearMonthDayByTimestamp(scope.row.UpdatedAt*1000)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="Remain(PB)"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{util.bytesToSize(scope.row.Remain * 1024)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="Used(PB)"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{util.bytesToSize(scope.row.Used * 1024)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="total"
					label="Total(PB)"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{util.bytesToSize((scope.row.Used * 1024) + (scope.row.Remain * 1024))}}
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				background
				layout="prev, pager, next"
				:total="total"
				@current-change="currentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import echarts from "echarts";
import util from "../../assets/config/util";
export default {
	name: "StorageSpace",
	data() {
		return {
			util,
			allNetStorageChartCircle: null,
			allNetStorageChartLine: null,
			storageSpaceList: null,
			currentPage: 1,
			loading: {
				storageStatChart: null,
				storageStatTb: null,
			}
		};
	},
	computed: {
		tbList() {
			if (!this.storageSpaceList) return [];
			let _start = (this.currentPage - 1) * 10;
			let _end =
				_start + 10 > this.storageSpaceList.length
					? this.storageSpaceList.length
					: _start + 10;
			let list = this.storageSpaceList.slice(_start, _end);
			return list;
		},
		total() {
			if (!this.storageSpaceList) return 0;
			return this.storageSpaceList.length;
		},
		screenWidth() {
			return this.$store.state.Home.screenWidth;
		}
	},
	watch: {
		screenWidth() {
			this.allNetStorageChartCircle.resize();
			this.allNetStorageChartLine.resize();
		}
	},
	methods: {
		init() {
			this.getStorageStat();
		},
		currentChange(page) {
			this.currentPage = page;
		},
		async getStorageStat() {
			// add loading
			this.loading.storageStatChart = this.$loading.show({
				container: this.$refs.allNetStorageChart,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});
			this.loading.storageStatTb = this.$loading.show({
				container: this.$refs.allNetStorageTb,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});

			// get data
			let res = await this.$api2.getStorageStat();

			// close loading
			this.loading.storageStatChart && this.loading.storageStatChart.hide();
			this.loading.storageStatTb && this.loading.storageStatTb.hide();

			if(res.error === 0) {
				this.storageSpaceList = res.result['Details'];
				this.setAllNetStorageChartCircle();
				this.setAllNetStorageChartLine();
			}
		},
		setAllNetStorageChartCircle() {
			const vm = this;
			let usedData = this.storageSpaceList[0].Used;
			let remainData = this.storageSpaceList[0].Remain;
			let option = {
				tooltip: {
					show: true,
					trigger: "item",
					// a: name b: serice value，
					// c: data，
					// d: percentage
					formatter: "{d}%",
					padding: [10, 10],
					backgroundColor: "#FFFFFF",
					textStyle: {
						color: "#333",
						fontSize: "16"
					}
				},
				// serice list
				series: [
					{
						name: "USDJPY",
						type: "pie",
						radius: ["32%", "60%"],
						center: ["50%", "60%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								formatter: function(params) {
									if (!params) return "";
									return `${params.name}:${vm.util.bytesToSize(
										params.value * 1024
									)}`;
								},
								textStyle: {
									fontSize: "14"
								}
							}
						},
						data: [
							{
								value: usedData,
								name: "Used",
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										color: "#CDDC39"
									}
								}
							},
							{
								value: remainData,
								name: "Remain",
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										color: "rgba(255,255,255,0.3)"
									}
								}
							}
						]
					}
				]
			};
			var dom = document.getElementById("allNetStorageChartCircle");
			this.allNetStorageChartCircle = echarts.init(dom);
			this.allNetStorageChartCircle.setOption(option, true);
		},
		setAllNetStorageChartLine() {
			const vm = this;
			let remainArr = [];
			let usedArr = [];
			let timeArr = [];
			for (let item of this.storageSpaceList) {
				remainArr.unshift(item.Remain);
				usedArr.unshift(item.Used);
				let timeFormat = this.$dateFormat.formatMonthDayByTimestamp(
					item.UpdatedAt * 1000
				);
				timeArr.unshift(timeFormat);
			}
			let _scale =
				(1 -
					(29.5 / this.storageSpaceList.length > 1
						? 1
						: 29.5 / this.storageSpaceList.length)) *
				100;
			let option = {
				grid: {
					left: "100",
					right: "4%",
					bottom: "25%"
				},
				legend: {
					data: ["Used", "Remain"],
					left: "center",
					bottom: "4%",
					textStyle: {
						color: "#ffffff"
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
						formatter: function(params) {
							return vm.util.bytesToSize(params * 1024);
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
					formatter: function(params) {
						if (!params) return "";
						let desc = params[0].name;
						for (let i = 0; i < params.length; i++) {
							let value = params[i];
							desc += `<br/>${value.marker}${
								value.seriesName
							}: ${vm.util.bytesToSize(value.value * 1024)}`;
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
				dataZoom: [
					{
						type: "inside",
						start: _scale,
						end: 100
					},
					{
						start: 0,
						end: 30,
						bottom: "11%",
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
						data: usedArr,
						type: "line",
						name: "Used",
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						data: remainArr,
						type: "line",
						name: "Remain",
						itemStyle: {
							color: "#15A4C6"
						}
					}
				]
			};
			let dom = document.getElementById("allNetStorageChartLine");
			this.allNetStorageChartLine = echarts.init(dom);
			this.allNetStorageChartLine.setOption(option, true);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#storageSpace {
	width: 100%;
	height: auto;

	.all-net-storage-chart {
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 0 auto;
		height: 1020px;
		margin-top: 72px;

		.all-net-storage-chart-circle {
			width: 100%;
			height: 520px;
		}

		.all-net-storage-chart-line {
			width: 100%;
			height: 500px;
		}
	}

	.all-net-storage-tb {
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