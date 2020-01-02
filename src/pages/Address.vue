<template>
	<div id="address">
		<h2>
			<!-- ADDRESS -->
			{{$t('ADDRESS')}}
			<span>{{address}}</span>
		</h2>
		<section class="address-info-wrapper relative" ref="addressInfoWrapper">
			<div class="address-info-balance">
				<h4>
					<!-- Balance -->
					{{$t('balance')}}
				</h4>
				<p>{{transactionObj && transactionObj.BalanceFormat}}</p>
			</div>
			<div class="address-info-usd">
				<h4>{{$t('USDValue')}}</h4>
				<p>{{transactionObj && transactionObj.BalanceFormat + '$'}}</p>
			</div>
			<div class="address-info-total">
				<h4>{{$t('createdTime')}}</h4>
				<p>{{transactionObj && $dateFormat.formatTimeByTimestamp(transactionObj.CreatedAt*1000)}}</p>
			</div>
			<div class="address-info-channels">
				<h4>{{$t('channels')}}</h4>
				<p>{{transactionObj && transactionObj.ChannelCount}}</p>
			</div>
		</section>
		<h3>
			<!-- Transactions -->
			{{$t('transactions')}}
		</h3>
		<section class="transaction-wrapper relative" ref="transactionWrapper">
			<el-table :data="list" min-height="250" max-height="1050" :empty-text="$t('noData')">
				<el-table-column
					fixed
					:label="$t('hash')"
					min-width="300"
					:show-overflow-tooltip="true"
				>
          <template slot-scope="scope">
            <div class="tb-link white" :title="scope.row.Hash">
              <router-link :to="`/transactions/detail?hash=${scope.row.Hash}`">
                {{scope.row.Hash}}
              </router-link>
            </div>
          </template>
				</el-table-column>
				<el-table-column
					:label="$t('status')"
					width="100"
					:show-overflow-tooltip="true"
				>
          <template slot-scope="scope">
            <div class="fontImportant">
              {{scope.row.Status === 0 ? 'Unconfirmed' : 'Confirmed'}}
            </div>
          </template>
				</el-table-column>
				<el-table-column
					:label="$t('amount')"
					min-width="120"
					:show-overflow-tooltip="true"
				>
        <template slot-scope="scope">
          <div>
            {{ util.effectiveNumber(scope.row.Amount) }} {{scope.row.Asset}}
          </div>
        </template>
				</el-table-column>
				<el-table-column
					:label="$t('from')"
					min-width="140"
					:show-overflow-tooltip="true"
				>
        <template slot-scope="scope">
          <div :title="scope.row.From" @click.stop="goAddress(scope.row.From)" class="tb-link fontImportantThree">
            {{util.getStart6ToEnd6(scope.row.From)}}
          </div>
        </template>
				</el-table-column>
				<el-table-column
					:label="$t('to')"
					min-width="140"
					:show-overflow-tooltip="true"
				>
          <template slot-scope="scope">
            <div :title="scope.row.To" @click.stop="goAddress(scope.row.To)" class="tb-link fontImportantThree">
              {{util.getStart6ToEnd6(scope.row.To)}}
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
				:page-size="20"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
		</section>
	</div>
</template>
<script>
import util from './../assets/config/util'
export default {
	name: "Address",
	data() {
		return {
			util,
      transactionObj: null,
			// address: '',
			transactionList: [],
			loading: {
				transactionInfo: null,
				transactionList: null
			},
			currentPage: 1
		};
	},
	computed: {
		total() {
			return this.transactionList.length
		},
		list() {
			const vm = this;
			const PAGE_NUMBER = 20;
			let start = (vm.currentPage - 1) * PAGE_NUMBER;
			let end = vm.currentPage * PAGE_NUMBER;
			return vm.transactionList.slice(start, end);
		},
		address() {
			return this.$route.query.address;
		}
	},
	watch: {
		address() {
			this.init();
		}
	},
  methods: {
    init() {
			this.currentPage = 1;
			this.getTransactionByAddress();
		},
		currentChange(page) {
      this.currentPage = page;
    },
		async getTransactionByAddress() {
			// add loading
			this.loading.transactionInfo = this.$loading.show({
				container: this.$refs.addressInfoWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
			this.loading.transactionList = this.$loading.show({
				container: this.$refs.transactionWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
			
			// get data
			let res = await this.$api2.getTransactionByAddress(this.address);

			// close loading
			this.loading.transactionInfo && this.loading.transactionInfo.hide();
			this.loading.transactionList && this.loading.transactionList.hide();

			if(res.error === 0) {
				this.transactionObj = res.result;
				this.transactionList = res.result.Txs;
			} else {
				this.$message.error(this.$t(`error['${res.error}']`));
			}
		},
    goAddress(address) {
      if(address === this.address) return;
			this.$router.push({path:`/address?address=${address}`});
			this.transactionObj = null;
			this.transactionList = [];
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
#address {
	padding-top: 65px;
	width: 1170px;
	margin: 0 auto;
	max-width: 100%;

	& > h2 {
		font-size: 32px;
		color: white;
		margin-top: 75px;
		margin-bottom: 24px;

		& > span {
			font-size: 20px;
			font-weight: 500;
			color: #cddc39;
			margin-left: 16px;
		}
	}

	.address-info-wrapper {
		width: 100%;
		height: 166px;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		display: flex;
		align-items: center;

		& > div {
			height: 74px;
			border-right: 1px solid #3f3f40;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			&.address-info-balance {
				width: 350px;
			}

			&.address-info-usd {
				min-width: 311px;
				width: auto;
			}

			&.address-info-total {
				width: 394px;
			}

			&.address-info-channels {
				width: 194px;
				border: 0;
			}

			h4 {
				font-size: 16px;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.4);
			}

			p {
				color: #cddc39;
				font-size: 32px;
				font-weight: 500;
				padding-left: 2px;
				padding-right: 2px;
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
		min-height: 345px;
		height: auto;
		position: relative;
		overflow-y: auto;
    height: auto;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		padding: 15px 32px 80px;
		margin-bottom: 80px;

		.pagination {
			position: absolute;
			bottom: 25px;
			right: 25px;
		}
	}
}
</style>