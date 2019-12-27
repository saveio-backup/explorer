<template>
  <div id="transaction-detail">
    <h2 class="no-user-select">TRANSACTION</h2>
    <section class="transaction-content-wrapper relative" ref="transactionContentWrapper">
      <div>
        <p class="content-title no-user-select">Hash:</p>
        <p class="content-info">{{hash}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Token:</p>
        <p class="content-info">{{transactionDetailObj && transactionDetailObj.Amount}} {{transactionDetailObj && transactionDetailObj.Asset}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Block:</p>
        <p class="content-info link-fontImportant">
          <template v-if="transactionDetailObj">
            <router-link :to="`/blocks/detail?height=${transactionDetailObj.Height}`">
              {{'#'+transactionDetailObj.Height}}
            </router-link>
          </template>
        </p>
      </div>
      <div>
        <p class="content-title no-user-select">Type:</p>
        <p class="content-info">{{transactionDetailObj && (transactionDetailObj.Type === 0 ? 'Ordinary Transfer' : 'Smart Contract')}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Fee:</p>
        <p class="content-info">{{transactionDetailObj && util.effectiveNumber(transactionDetailObj.Fee)}} {{transactionDetailObj && transactionDetailObj.Asset}}</p>
      </div>
      <div>
        <p class="content-title no-user-select">Timestamp:</p>
        <p class="content-info">
            {{transactionDetailObj && $dateFormat.formatTimeByTimestamp(transactionDetailObj.CreatedAt*1000)}}
        </p>
      </div>
      <div class="no-boder">
        <p class="content-title no-user-select">Status:</p>
        <p class="content-info fontImportant">
          {{transactionDetailObj && (transactionDetailObj.Status === 1 ? 'Confirmed' : 'Unconfirmed')}}
        </p>
      </div>
    </section>
    <ul class="transaction-detail-wrapper">
      <li v-for="(item,index) in transactionDetailList" :class="{'no-border': index === (transactionDetailList.length -1)}" :key="index">
        <div class="transaction-detail-from fontImportantThree tb-link" :title="item.From">
          <router-link class="click-active" :to="`/address?address=${item.From}`">
            {{item.From}}
          </router-link>
        </div>
        <div class="transaction-detail-num">
          {{util.effectiveNumber(item.Amount)}} {{item.Asset}}
        </div>
        <span class="transaction-point-to">
          <i class="ofont el-icon-d-arrow-right"></i>
        </span>
        <div class="transaction-detail-to fontImportantThree tb-link" :title="item.To">
          <router-link class="click-active" :to="`/address?address=${item.To}`">
            {{item.To}}
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import util from './../../assets/config/util'
export default {
  name: 'TransactionDetail',
  data() {
    return {
      util,
      transactionDetailObj: null,
      hash: '',
      loading: {
        transactionsInfo: null
      }
    }
  },
  computed: {
    transactionDetailList() {
      if(!this.transactionDetailObj) return [];
      return this.transactionDetailObj.Details;
    }
  },
  methods: {
    init() {
      this.hash = this.$route.query.hash;
      this.getTransactionByHash();
    },
    async getTransactionByHash() {
      // add loading
      this.loading.transactionsInfo = this.$loading.show({
				container: this.$refs.transactionContentWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
      
      let res = await this.$api2.getRawTransactionJson(this.hash);

      // close loading
			this.loading.transactionsInfo && this.loading.transactionsInfo.hide();

      if(res.error === 0) {
        this.transactionDetailObj = res.result;
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="scss">
  #transaction-detail {
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

    .transaction-content-wrapper {
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

    .transaction-detail-wrapper {
      width: 100%;
      padding: 0 32px;
      background:rgba(42,42,43,1);
      box-shadow:0px -4px 40px 0px rgba(0,0,0,0.32);
      border-radius:4px;
      margin: 24px auto 80px;

      li {
        height: 80px;
        display: flex;
        line-height: 80px;
        border-bottom: 1px solid #3F3F40;

        &.no-border {
          border: 0;
        }

        .transaction-detail-from {
          width: 45%;
          font-size: 14px;
        }

        .transaction-detail-num {
          width: 20%;
          font-size:16px;
          color:white;
        }

        .transaction-point-to {
          width: 5%;
          color: white;
          opacity: .7;
        }

        .transaction-detail-to {
          width: 35%;
          font-size: 14px;
        }
      }
    }
  }
</style>