<template>
  <div id="blocks-index">
    <h2 class="blocks-title no-user-select">{{$t('BLOCKS')}}</h2>
    <p class="blocks-desc no-user-select">{{$t('AtotalOf')}} <span class="fontImportant">{{total}}</span> {{$t('blocksu')}}</p>
    <section class="block-list-wrapper relative" ref="blockListWrapper">
      <el-table
        :data="blockList"
        style="width: 100%;"
        :empty-text="$t('noData')"
      >
        <el-table-column
          fixed
          :label="$t('height')"
          min-width="120"
        >
          <template slot-scope="scope">
            <div class="white tb-link">
              <router-link class="click-active" :to="`/blocks/detail?height=${scope.row.Height}`">
                {{'#'+scope.row.Height}}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="TxCount"
          :label="$t('txns')"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="Size"
          :label="$t('size')"
          min-width="180"
        >
          <template slot-scope="scope">
            <div>
              {{util.bytesToSize(scope.row.Size * 1024)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('confirmed')"
          min-width="130"
        >
          <template slot-scope="scope">
            <span class="fontImportant">
              {{scope.row.Status === 1 ? $t('confirmed') : $t('unConfirmed')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('time')"
          width="240"
        >
          <template slot-scope="scope">
            <div>
              {{$dateFormat.formatTimeByTimestamp(scope.row.CreatedAt*1000)}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
				@current-change="currentChange"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </section>
  </div>
</template>
<script>
import util from '../../assets/config/util'
export default {
  name: 'BlokcsIndex',
  data() {
    return {
      util,
      blockList: [],
      total: 0,
      currentPage: 1,
      loading: {
        blockChart: null
      }
    }
  },
  methods: {
    init() {
      this.getBlocks();
    },
    currentChange(page) {
      this.currentPage = page;
      this.getBlocks();  
    },
    async getBlocks() {
      // add loading
      this.loading.blockChart = this.$loading.show({
				container: this.$refs.blockListWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

      // get data
      let res = await this.$api2.getBlocks({offset: ((this.currentPage - 1) * 10 + 1), limit: 10});

      // close loading
			this.loading.blockChart && this.loading.blockChart.hide();

      if(res.error === 0) {
        this.blockList = res.result['Detail'];
        this.total = res.result['Total'];
      } else {
				this.$message.error(this.$t(`error['${res.error}']`));
			}
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="scss" scoped>
  #blocks-index {
    padding-top: 65px;
    max-width: 1170px;
    width: calc(100% - 30px);
    margin: 0 auto;

    & > .blocks-title {
      width:154px;
      height:39px;
      font-size:32px;
      color:white;
      margin-top: 75px;
    }

    & > .blocks-desc {
      width: 100%;
      height: 19px;
      font-size: 16px;
      color: white;
      line-height: 19px;
      margin-top: 16px;
    }

    .block-list-wrapper {
      height: 630px;
      position: relative;
      margin: 24px auto 80px;
      width: 100%;
      background:#2A2A2B;
      box-shadow:0px -4px 40px 0px rgba(0,0,0,0.32);
      border-radius: 4px;
      padding: 15px 32px;
      box-sizing: border-box;

      .pagination {
        position: absolute;
        bottom: 25px;
        right: 25px;
      }
    }
  }
</style>