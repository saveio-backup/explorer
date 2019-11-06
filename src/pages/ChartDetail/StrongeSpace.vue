<template>
  <div id="strongeSpace">
    <div class="all-net-profit-chart">
      <div class="all-net-profit-chart-circle" id="allNetProfitChartCircle"></div>
      <div class="all-net-profit-chart-line" id="allNetProfitChartLine"></div>
    </div>
    <div class="all-net-profit-tb">
      <el-table
        style="width: 100%;"
        :data="strongeSpaceList"
      >
        <el-table-column
          fixed
          prop="month"
          label="月份"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="leisure"
          label="空闲(PB)"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="occupation"
          label="占用(PB)"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="total"
          label="总空间(PB)"
          width="180"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "StrongeSpace",
  data() {
    return {
      allNetProfitChartCircle: null,
      allNetProfitChartLine: null,
      strongeSpaceList: [
        {
          month: '2019/12',
          leisure: 155,
          occupation: 65.7,
          total: 220.7
        },
        {
          month: '2019/12',
          leisure: 155,
          occupation: 65.7,
          total: 220.7
        },
        {
          month: '2019/12',
          leisure: 155,
          occupation: 65.7,
          total: 220.7
        },
        {
          month: '2019/12',
          leisure: 155,
          occupation: 65.7,
          total: 220.7
        },
        {
          month: '2019/12',
          leisure: 155,
          occupation: 65.7,
          total: 220.7
        }
      ]
    }
  },
  methods: {
    init() {
      this.setAllNetProfitChartCircle();
      this.setAllNetProfitChartLine();
    },
    setAllNetProfitChartCircle() {
      let option = {
				//饼图名的名称、位置及样式
				// title: {
				// 	text: "全网空间",
				// 	left: "center",
				// 	top: "20",
				// 	textStyle: {
				// 		color: "#ffffff",
				// 		fontSize: "16",
				// 		fontWeight: "normal"
				// 	}
				// },
				//提示框的样式、提示框显示什么数据
				tooltip: {
					show: true,
					trigger: "item",
					//有a,b,c,d四种
					//a代表系列名称(在这里就是USDJPY)，b代表数据项名称(在这里就是上涨或下跌)，
					//c代表数据(在这里就是335或310)，
					//d代表数据项所占的百分比数(在这里就是40.04或59.96，要显示百分比样子要自己加百分号)
					formatter: "{d}%",
					padding: [10, 10],
					backgroundColor: "#FFFFFF",
					textStyle: {
						color: "#333",
						fontSize: "16"
					}
				},
				//系列列表
				series: [
					{
						name: "USDJPY",
						//图标类型，pie是饼图
						type: "pie",
						//内外半径
						radius: ["32%", "60%"],
						center: ["50%", "60%"],
						//是否启用防止标签重叠策略,默认是true，一般圆环圆设为false
						avoidLabelOverlap: false,
						//饼图图形上的文本标签(在这里是上涨或下跌)是否在中心环中显示
						label: {
							normal: {
								show: true,
								formatter: "{b}: {c}PZ",
								textStyle: {
									fontSize: "14"
								}
								// position: "center"
							}
						},
						//系列中的数据内容数组
						data: [
							{
								//数据值
								value: 335,
								//数据项名称
								name: "已占用",
								//图形样式
								itemStyle: {
									normal: {
										show: true,
										borderColor: "#3F3F40",
										borderWidth: 10,
										//渐变色，一共五个参数，前四个0,0,0,1代表渐变色从正上方开始
										//第5个参数则是一个数组, 用于配置颜色的渐变过程; 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置, color不用多说肯定是表示颜色了. 像示例代码的配置则表示:
										color: "#CDDC39"
									}
								}
							},
							{
								value: 310,
								name: "剩余空间",
								//定义数据项的样式
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
			var dom = document.getElementById("allNetProfitChartCircle");
			this.allNetProfitChartCircle = echarts.init(dom);
			this.allNetProfitChartCircle.setOption(option, true);
    },
    setAllNetProfitChartLine() {
      	let option = {
				// title: {
				// 	text: "全网地址持仓",
				// 	left: "center",
				// 	top: "20",
				// 	textStyle: {
				// 		color: "#ffffff",
				// 		fontSize: "16",
				// 		fontWeight: "normal"
				// 	}
				// },
				grid: {
					left: "100",
					right: "4%",
					bottom: "18%",
				},
				legend: {
					data:['占用','空闲'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
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
				tooltip : {
					trigger: 'axis',
					axisPointer: {
							type: 'cross',
							label: {
									backgroundColor: '#6a7985'
							}
					}
				},
				series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: "line",
						name: "占用",
						itemStyle: {
							color: "#CDDC39"
						}
					},
					{
						data: [2820, 1932, 1901, 93, 190, 2330, 130],
						type: "line",
						name: "空闲",
						itemStyle: {
							color: "#15A4C6"
						}
					}
				]
			};
			let dom = document.getElementById("allNetProfitChartLine");
			this.allNetProfitChartLine = echarts.init(dom);
			this.allNetProfitChartLine.setOption(option, true);
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="scss" scoped>
  #strongeSpace {
    width: 100%;
    height: auto;

    .all-net-profit-chart {
      background: rgba(42, 42, 43, 1);
      box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
      max-width: 1170px;
      width: calc(100% - 30px);
      margin: 0 auto;
      height: 1020px;
      margin-top: 72px;

      .all-net-profit-chart-circle {
        width: 100%;
        height: 520px;
      }

      .all-net-profit-chart-line {
        width: 100%;
        height: 500px;
      }
    }

    .all-net-profit-tb {
      height: 630px;
      position: relative;
      margin: 66px auto 80px;
      width: 100%;
      background:#2A2A2B;
      box-shadow:0px -4px 40px 0px rgba(0,0,0,0.32);
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