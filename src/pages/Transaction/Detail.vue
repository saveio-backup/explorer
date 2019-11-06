<template>
  <div id="transaction-detail">
    <h2>TRANSACTION</h2>
    <section class="transaction-content-wrapper">
      <div>
        <p class="content-title">Hash:</p>
        <p class="content-info">aasfewsvs</p>
      </div>
      <div>
        <p class="content-title">Token:</p>
        <p class="content-info">2000 SAVE</p>
      </div>
      <div>
        <p class="content-title">Blokc:</p>
        <p class="content-info">22324</p>
      </div>
      <div>
        <p class="content-title">Type:</p>
        <p class="content-info">Smart Contract</p>
      </div>
      <div>
        <p class="content-title">Fee:</p>
        <p class="content-info">0.01 SAVE</p>
      </div>
      <div>
        <p class="content-title">Timestamp:</p>
        <p class="content-info">10 min ago [2019-02-28 09:03:23]</p>
      </div>
      <div class="no-boder">
        <p class="content-title">Status:</p>
        <p class="content-info fontImportant">Confirmed</p>
      </div>
    </section>
    <ul class="transaction-detail-wrapper">
      <li v-for="(item,index) in transactionDetailList" :class="{'no-border': index === (transactionDetailList.length -1)}" :key="index">
        <div class="transaction-detail-from fontImportantThree">
          {{item.from}}
        </div>
        <div class="transaction-detail-num">
          {{item.amount}} SAVE
        </div>
        <span class="transaction-point-to">
          <i class="ofont el-icon-d-arrow-right"></i>
        </span>
        <div class="transaction-detail-to fontImportantThree">
          {{item.to}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TransactionDetail',
  data() {
    return {
      transactionDetailList: [
        {
          from: 'TKbShEGwnaY8H8S8ZdhYPnA7sRN8vsaqK1',
          to: 'TKbShEGwnaY8H8S8ZdhYPnA7sRN8vsaqK1',
          amount: 2000
        },
        {
          from: 'TKbShEGwnaY8H8S8ZdhYPnA7sRN8vsaqK1',
          to: 'TKbShEGwnaY8H8S8ZdhYPnA7sRN8vsaqK1',
          amount: 210
        }
      ]
    }
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