<template>
  <div id="address">
    <h2>
      ADDRESS
      <span>TKbShEGwnaY8H8S8ZdhYPnA7sRN8vsaqK1</span>
    </h2>
    <section class="address-info-wrapper">
      <div class="address-info-balance">
        <h4>
          Balance
        </h4>
        <p>1,24123.123123</p>
      </div>
      <div class="address-info-usd">
        <h4>Usd value</h4>
        <p>312 $</p>
      </div>
      <div class="address-info-total">
        <h4>CREATION TIME</h4>
        <p>28-02-2019 09:02:34</p>
      </div>
      <div class="address-info-channels">
        <h4>Channels</h4>
        <p>22</p>
      </div>
    </section>
    <h3>
      Transactions
    </h3>
    <section class="transaction-wrapper">
      <el-table
        :data="transactionList"
      >
        <el-table-column
          prop="Hash"
          label="Hash"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="Status"
          label="Status"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="Amount"
          label="Amount"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="From"
          label="From"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="To"
          label="To"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="Time"
          label="Time"
          width="180"
        >
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Address',
  data() {
    return {
      transactionList: [
        {
          Hash: 'asfasjfjaggk',
          Status: 'Confirmed',
          Amount: -2312,
          From: 'asfsadgkds',
          To: 'dghajdskghldf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: 'asfasjfjaggk',
          Status: 'Confirmed',
          Amount: -2312,
          From: 'asfsadgkds',
          To: 'dghajdskghldf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: 'asfasjfjaggk',
          Status: 'Confirmed',
          Amount: -2312,
          From: 'asfsadgkds',
          To: 'dghajdskghldf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: 'asfasjfjaggk',
          Status: 'Confirmed',
          Amount: -2312,
          From: 'asfsadgkds',
          To: 'dghajdskghldf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: 'asfasjfjaggk',
          Status: 'Confirmed',
          Amount: -2312,
          From: 'asfsadgkds',
          To: 'dghajdskghldf',
          Time: '2019-06-12 01:45:26'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  #address {
    padding-top: 65px;
    width: 1170px;
    margin: 0 auto;
    max-width: 100%;

    & > h2 {
      font-size:32px;
      color: white;
      margin-top: 75px;
      margin-bottom: 24px;

      & > span {
        font-size:20px;
        font-weight:500;
        color:#CDDC39;
        margin-left: 16px;
      }
    }

    .address-info-wrapper {
      width: 100%;
      height: 166px;
      background: #2A2A2B;
      box-shadow: 0px -4px 40px 0px rgba(0,0,0,0.32);
      border-radius: 4px;
      display: flex;
      align-items: center;

      & > div {
        height: 74px;
        border-right: 1px solid #3F3F40;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.address-info-balance {
          width: 350px;
        }

        &.address-info-usd {
          width: 191px;
        }

        &.address-info-total {
          width: 404px;
        }

        &.address-info-channels {
          width: 194px;
          border: 0;
        }

        h4 {
          font-size:16px;
          font-weight:500;
          color: rgba(255,255,255,.4);
        }
  
        p {
          color: #CDDC39;
          font-size:32px;
          font-weight:500;
        }
      }

    }

    & > h3 {
      font-size: 20px;
      color: white;
      margin-top: 32px;
      margin-bottom: 24px;
    }

    .transaction-wrapper {
      width: 100%;
      height: 345px;
      background: #2A2A2B;
      box-shadow: 0px -4px 40px 0px rgba(0,0,0,0.32);
      border-radius: 4px;
      padding: 15px 32px;
      margin-bottom: 80px;
    }
  }
</style>