<template>
  <div id="block-detail">
    <h2 class="no-user-select">BLOCKS</h2>
    <section class="block-content-wrapper loading-content">
      <div>
        <p class="content-title no-user-select">Height:</p>
        <p class="content-info">{{height || 0}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Hash:</p>
        <p class="content-info link-fontImportant">
          <template v-if="transactionObj">
            <router-link :to="`/transactions/detail?hash=${transactionObj.Hash}`">
              {{transactionObj.Hash}}
            </router-link>
          </template>
        </p>
      </div>
      <div>
        <p class="content-title no-user-select">Timestamp:</p>
        <p class="content-info">{{transactionObj && $dateFormat.formatTimeByTimestamp(transactionObj.CreatedAt*1000)}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Produced By:</p>
        <p class="content-info fontImportantThree">{{transactionObj && transactionObj.Miner}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Status:</p>
        <p class="content-info fontImportant">{{transactionObj && (transactionObj.Status === 1 ? 'Confirmed' : 'Unconfirmed')}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Transactions:</p>
        <p class="content-info">{{transactionList.length}} transactions</p>
      </div>
      <div class="no-boder">
        <p class="content-title no-user-select">Size:</p>
        <p class="content-info">{{transactionObj && util.bytesToSize(transactionObj.Size*1024)}}</p>
      </div>
    </section>
    <h3 class="no-user-select">Transactions</h3>
    <section class="transactions-wrapper loading-content">
      <el-table
        :data="transactionList"
        style="width: 100%;"
      >
        <el-table-column
          fixed
          label="Hash"
          width="120"
        >
          <template slot-scope="scope">
            <div class="white tb-link" :title="scope.row.Hash">
              <router-link :to="`/transactions/detail?hash=${scope.row.Hash}`">
                {{scope.row.Hash}}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Token"
          width="120"
        >
        <template slot-scope="scope">
          <div>
            {{scope.row.Amount}} {{scope.row.Asset}}
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="Status"
          width="100"
        >
          <template>
            <span class="fontImportant">{{transactionObj && (transactionObj.Status === 1 ? 'Confirmed' : 'Unconfirmed')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Height"
          width="100"
        >
          <template>
            {{height || 0}}
          </template>
        </el-table-column>
        <el-table-column
          label="From"
          min-width="200"
        >
          <template slot-scope="scope">
            <div class="fontImportantThree tb-link" :title="scope.row.From">
              <router-link :to="`/address?address=${scope.row.From}`">
                {{scope.row.From}}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="To"
          min-width="200"
        >
          <template slot-scope="scope">
            <div class="fontImportantThree tb-link" :title="scope.row.To">
              <router-link :to="`/address?address=${scope.row.To}`">
                {{scope.row.To}}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Time"
          width="200"
        >
        <template>
          <div>
            {{transactionObj && $dateFormat.formatTimeByTimestamp(transactionObj.CreatedAt*1000)}}
          </div>
        </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
import util from '../../assets/config/util'
export default {
  name: 'BlockDetail',
  data() {
    return {
      util,
      transactionObj: null,
      height: null,
      transactionList: [],
      loading: {
        blockInfo: null,
        blockTransaction: null
      }
    }
  },
  methods: {
    init() {
      this.height = parseInt(this.$route.query.height);
      this.getBlockbyHeight()
      this.getTransactionbyHeight()
    },
    async getBlockbyHeight() {
      // add loading
			this.loading.blockInfo = this.$loading({
				target: ".block-content-wrapper.loading-content",
      });

      // get data
      let res = await this.$api2.getBlockbyHeight(this.height);

      // close loading
			this.loading.blockInfo && this.loading.blockInfo.close();
  
      if(res.error === 0) {
        this.transactionObj = res.result;
      }
    },
    async getTransactionbyHeight() {      
      // add loading
      this.loading.blockTransaction = this.$loading({
				target: ".transactions-wrapper.loading-content",
      });

      // get data
      let res = await this.$api2.getTransactionbyHeight(this.height);

      // close loading
			this.loading.blockTransaction && this.loading.blockTransaction.close();

      if(res.error === 0) {
        this.transactionList = res.result;
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="scss" scoped>
  #block-detail {
    padding-top: 65px;
    width: 1170px;
    margin: 0 auto;
    max-width: calc(100% - 30px);

    & > h2 {
      height: 39px;
      font-size:32px;
      color:white;
      line-height: 39px;
      margin-top: 75px;
    }

    .block-content-wrapper {
      width: 100%;
      height: auto;
      background: rgba(42,42,43,1);
      box-shadow: 0px -4px 40px 0px rgba(0,0,0,0.32);
      border-radius: 4px;
      padding: 12px 30px;
      margin-top: 24px; 

      & > div {
        height: auto;
        display: flex;
        line-height: 40px;
        border-bottom: 1px solid #3F3F40;
        color: rgba(255,255,255,.4);

        @media (max-width: 1024px) {
          flex-direction: column;
          line-height: 20px;
          padding: 7px 0;
        }

        &.no-boder {
          border: 0;
        }
        
        & > .content-title {
          width: 170px;
          font-size: 14px;
          color: white;
        }

        & > .content-info {
          font-size:14px;
        }
      }
    }

    & > h3 {
      font-size:20px;
      color:white;
      font-weight: 400;
      margin-top: 32px;
      margin-bottom: 24px;
    }

    .transactions-wrapper {
      height:345px;
      margin-bottom: 60px;
      padding: 10px 25px;
      background:#2A2A2B;
      box-shadow: 0px -4px 40px 0px rgba(0,0,0,0.32);
      border-radius: 4px;
    }
  }
</style>