<template>
  <div id="blocks-index">
    <h2 class="blocks-title">BLOCKS</h2>
    <p class="blocks-desc">A total of <span class="fontImportant">23921</span> blocks</p>
    <section class="block-list-wrapper">
      <el-table
        :data="blockList"
        style="width: 100%;"
      >
        <el-table-column
          fixed
          prop="height"
          label="Height"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="txns"
          label="Txns"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="size"
          label="Size"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          label="Confirmed"
          width="120"
        >
          <template slot-scope="scope">
            <span class="fontImportant">
              {{scope.row.confirmed}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="Time"
          width="240"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </section>
  </div>
</template>
<script>
export default {
  name: 'BlokcsIndex',
  data() {
    return {
      blockList: [
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        },
        {
          height: 233,
          txns: 23,
          size: 22333,
          confirmed: 'Confirmed',
          time: '2019-06-12 01:45:26'
        }
      ]
    }
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
      width: 190px;
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