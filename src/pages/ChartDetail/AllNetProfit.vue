<template>
  <div id="allNetProfit">
    <div class="all-net-profit-chart-wrapper">
      <div class="all-net-profit-exchange">
        <p
          class="all-net-profit-chart-btn ml10"
          :class="{'select': selectTime === 'm'}"
          @click.stop="setSelectTime('m')"
        >月收益</p>
        <p
          @click.stop="setSelectTime('d')"
          class="all-net-profit-chart-btn"
          :class="{'select': selectTime === 'd'}"
        >日收益</p>
      </div>
      <div id="allNetProfitChart" class="all-net-profit-chart"></div>
    </div>
    <div class="all-net-profit-tb">
      <el-table
        style="width: 100%;"
        :data="allNetProfitList"
      >
        <el-table-column
          fixed
          prop="month"
          label="月份"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="indexProfit"
          label="索引收益(SAVE)"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="flowProfit"
          label="流量收益(SAVE)"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="saveProfit"
          label="存储收益(SAVE)"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="total"
          label="总量(SAVE)"
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
import echarts from 'echarts'
export default {
  name: "AllNetProfit",
  data() {
    return {
      allNetProfitChart: null,
      selectTime: 'm', // m, d (m is month,d is day) 
      allNetProfitList: [
        {
          month: '2019/12',
          indexProfit: 23276,
          flowProfit: 23276,
          saveProfit: 2222,
          total: 123123
        },
        {
          month: '2019/12',
          indexProfit: 23276,
          flowProfit: 23276,
          saveProfit: 2222,
          total: 123123
        }
      ]
    }
  },
  methods: {
    init() {
      this.setAllNetProfitChart()
    },
    setAllNetProfitChart() {
      let xAxisData = [];
			let data1 = [];
			for (var i = 0; i < 100; i++) {
				xAxisData.push("类目" + i);
				data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
			}
			let option = {
				legend: {
					data: ['索引', '流量','存储'],
					left: 'center',
					bottom: '4%',
					textStyle: {
						color: '#ffffff'
					}
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: "13%",
					right: "4%",
					bottom: "18%",
				},
				xAxis: {
					type: "category",
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
				series: [
					{
						name: "索引",
						type: "bar",
						stack: "总量",
						data: [320, 302, 301, 334, 390, 330, 320],
						itemStyle: {
							color: "#0387E3"
						}
					},
					{
						name: "流量",
						type: "bar",
						stack: "总量",
						data: [120, 132, 101, 134, 90, 230, 210],
						itemStyle: {
							color: "#3ABAA4"
						}
					},
					{
						name: "存储",
						type: "bar",
						stack: "总量",
						data: [220, 182, 191, 234, 290, 330, 310],
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
    }
  },
  mounted() {
    this.init();
  }
}
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
        border-radius:4px 4px 0px 0px;
        transition: 0.2s all ease;
        cursor: pointer;
        float: right;
        text-align: center;
        color: #ffffff;
        line-height: 32px;
        font-size: 14px;

        &.select,&:hover {
          background: rgba(205,220,57,0.7);
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
    background:#2A2A2B;
    box-shadow:0px -4px 40px 0px rgba(0,0,0,0.32);
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