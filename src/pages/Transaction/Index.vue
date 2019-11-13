<template>
	<div id="transaction-index">
		<h2 class="no-user-select">TRANSACTIONS</h2>
		<p class="no-user-select">A total of <span class="fontImportant">{{total}}</span> blocks</p>
		<section class="transaction-wrapper">
			<el-table
				:data="transactionList"
				style="width: 100%;"
			>
				<el-table-column
					fixed
					label="Hash"
					min-width="100"
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
					prop="Token"
					label="Token"
					width="180"
				>
					<template slot-scope="scope">
						<div>
							{{scope.row.Amount}} {{scope.row.Asset}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="Status"
					label="Status"
					width="100"
				>
					<template slot-scope="scope">
						<span class="fontImportant">
              {{scope.row.Status === 1 ? 'Confirmed' : 'UnConfirmed'}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="Height"
					label="Height"
					width="100"
				>
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
					min-width="180"
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
				:total="total"
			>
			</el-pagination>
		</section>
	</div>
</template>
<script>
export default {
	name: "TransactionIndex",
	data() {
		return {
			transactionObj: [],
			total: 0,
			currentPage: 1
		};
	},
	computed: {
		transactionList() {
			if(!this.transactionObj) return [];
			return this.transactionObj.Txs;
		}
	},
	methods: {
		init() {
			this.getTransactions()
		},
		currentChange(page) {
      this.currentPage = page;
      this.getTransactions();
    },
		getTransactions() {
			 this.$axios.get(`${this.$api.gettransactions}/${(this.currentPage - 1) * 10}/10`, {}, {
        loading: {
          text: "Loading...",
          target: ".loading-content.block-list-wrapper"
        }
      }).then(res => {
        if(res.Error === 0) {
          this.transactionObj = res.Result;
          this.total = res.Result['Total'];
        }
      })
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
#transaction-index {
	padding-top: 65px;
	max-width: 1170px;
	width: calc(100% - 30px);
	margin: 0 auto;
	max-width: 100%;

	& > h2 {
		font-size: 32px;
		color: white;
		margin-top: 75px;
		margin: 75px auto 0;
		max-width: 1170px;
		width: calc(100% - 30px);
	}

	p {
		font-size: 16px;
		color: white;
		margin-top: 16px;
		margin: 16px auto 0;
		max-width: 1170px;
		width: calc(100% - 30px);
	}

	.transaction-wrapper {
		width: 100%;
		height: 626px;
		margin: 24px auto 80px;
		// padding: 10px 25px;
		padding: 15px 32px;
		position: relative;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
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