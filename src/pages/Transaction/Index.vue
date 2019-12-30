<template>
	<div id="transaction-index">
		<h2 class="no-user-select">{{$t('TRANSACTIONS')}}</h2>
		<p class="no-user-select">{{$t('AtotalOf')}} <span class="fontImportant">{{total}}</span> {{$t('transactionsu')}}</p>
		<section class="transaction-wrapper relative" ref="transactionWrapper">
			<el-table
				:data="transactionList"
				style="width: 100%;"
			>
				<el-table-column
					fixed
					:label="$t('hash')"
					min-width="300"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
            <div class="white tb-link" :title="scope.row.Hash">
              <router-link class="click-active" :to="`/transactions/detail?hash=${scope.row.Hash}`">
                {{scope.row.Hash}}
              </router-link>
            </div>
          </template>
				</el-table-column>
				<el-table-column
					:label="$t('token')"
					min-width="100"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<div>
							{{ util.effectiveNumber(scope.row.Amount) }} {{scope.row.Asset}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					:label="$t('status')"
					width="100"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<span class="fontImportant">
              {{scope.row.Status === 1 ? $t('confirmed') : $t('unConfirmed')}}
						</span>
					</template>
				</el-table-column>
				<el-table-column
					:label="$t('height')"
					width="100"
					:show-overflow-tooltip="true"
				>
				<template slot-scope="scope">
					<div>
						{{'#'+scope.row.Height}}
					</div>
				</template>
				</el-table-column>
				<el-table-column
					:label="$t('from')"
					width="150"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<div class="fontImportantThree tb-link" :title="scope.row.From">
							<router-link class="click-active" :to="`/address?address=${scope.row.From}`">
								{{util.getStart6ToEnd6(scope.row.From)}}
							</router-link>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					:label="$t('to')"
					width="150"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<div class="fontImportantThree tb-link" :title="scope.row.To">
							<router-link class="click-active" :to="`/address?address=${scope.row.To}`">
								{{util.getStart6ToEnd6(scope.row.To)}}
							</router-link>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					:label="$t('time')"
					width="170"
					:show-overflow-tooltip="true"
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
import util from './../../assets/config/util'
export default {
	name: "TransactionIndex",
	data() {
		return {
			util,
			transactionList: [],
			total: 0,
			currentPage: 1,
			loading: {
				transactions: null
			}
		};
	},
	methods: {
		init() {
			this.getTransactions()
		},
		currentChange(page) {
      this.currentPage = page;
      this.getTransactions();
    },
		async getTransactions() {
			// add loading
			this.loading.transactions = this.$loading.show({
				container: this.$refs.transactionWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getTransactions({offset: (this.currentPage - 1) * 10, limit: 10});

      // close loading
			this.loading.transactions && this.loading.transactions.hide();
			
			if(res.error === 0) {
				this.transactionList = res.result['Detail'];
				this.total = res.result['Total'];
			} else {
				this.$message.error(this.$t(`error['${res.error}']`));
			}
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