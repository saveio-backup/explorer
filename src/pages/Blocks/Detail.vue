<template>
  <div id="block-detail">
    <h2>BLOCKS</h2>
    <section class="block-content-wrapper">
      <div>
        <p class="content-title">Height:</p>
        <p class="content-info">233432</p>
      </div>
      <div>
        <p class="content-title">Hash:</p>
        <p class="content-info">eafsafjkhsf</p>
      </div>
      <div>
        <p class="content-title">Timestamp:</p>
        <p class="content-info">10 min ago [2019-02-28]</p>
      </div>
      <div>
        <p class="content-title">Produced By:</p>
        <p class="content-info fontImportantThree">TKhasbdghasdfasdf</p>
      </div>
      <div>
        <p class="content-title">Status:</p>
        <p class="content-info fontImportant">Confirmed</p>
      </div>
      <div>
        <p class="content-title">Transactions:</p>
        <p class="content-info">28 transactions</p>
      </div>
      <div class="no-boder">
        <p class="content-title">Size:</p>
        <p class="content-info">2332 bytes</p>
      </div>
    </section>
    <h3>Transactions</h3>
    <section class="transactions-wrapper">
      <el-table
        :data="transactionList"
        style="width: 100%;"
      >
        <el-table-column
          fixed
          prop="Hash"
          label="Hash"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="Token"
          label="Token"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="Status"
          width="100"
        >
          <template slot-scope="scope">
            <span class="fontImportant">{{scope.row.Status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Height"
          prop="Height"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="From"
          min-width="200"
        >
          <template slot-scope="scope">
            <span class="fontImportantThree">{{scope.row.From}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="To"
          min-width="200"
        >
          <template slot-scope="scope">
            <span class="fontImportantThree">{{scope.row.To}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Time"
          label="Time"
          width="200"
        >
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<script>
export default {
  name: 'BlockDetail',
  data() {
    return {
      transactionList: [
        {
          Hash: '123123',
          Token: 1241241,
          Status: 'Confirmed',
          Height: 12312,
          From: 'fabasfibvshakjfahskjdfalsdf',
          To: 'sbjkgahsdfbajsbdfjabsdf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: '123123',
          Token: 1241241,
          Status: 'Confirmed',
          Height: 12312,
          From: 'fabasfibvshakjfahskjdfalsdf',
          To: 'sbjkgahsdfbajsbdfjabsdf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: '123123',
          Token: 1241241,
          Status: 'Confirmed',
          Height: 12312,
          From: 'fabasfibvshakjfahskjdfalsdf',
          To: 'sbjkgahsdfbajsbdfjabsdf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: '123123',
          Token: 1241241,
          Status: 'Confirmed',
          Height: 12312,
          From: 'fabasfibvshakjfahskjdfalsdf',
          To: 'sbjkgahsdfbajsbdfjabsdf',
          Time: '2019-06-12 01:45:26'
        },
        {
          Hash: '123123',
          Token: 1241241,
          Status: 'Confirmed',
          Height: 12312,
          From: 'fabasfibvshakjfahskjdfalsdf',
          To: 'sbjkgahsdfbajsbdfjabsdf',
          Time: '2019-06-12 01:45:26'
        }
      ]
    }
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