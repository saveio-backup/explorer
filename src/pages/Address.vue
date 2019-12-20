<template>
	<div id="address">
		<h2>
			ADDRESS
			<span>{{address}}</span>
		</h2>
		<section class="address-info-wrapper loading-content">
			<div class="address-info-balance">
				<h4>
					Balance
				</h4>
				<p>{{transactionObj && transactionObj.BalanceFormat}}</p>
			</div>
			<div class="address-info-usd">
				<h4>Usd value</h4>
				<p>{{transactionObj && transactionObj.BalanceFormat}}$</p>
			</div>
			<div class="address-info-total">
				<h4>Created Time</h4>
				<p>{{transactionObj && $dateFormat.formatTimeByTimestamp(transactionObj.CreatedAt*1000)}}</p>
			</div>
			<div class="address-info-channels">
				<h4>Channels</h4>
				<p>{{transactionObj && transactionObj.ChannelCount}}</p>
			</div>
		</section>
		<h3>
			Transactions
		</h3>
		<section class="transaction-wrapper loading-content">
			<el-table :data="transactionList">
				<el-table-column
					label="Hash"
					width="180"
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
					label="Status"
					width="120"
				>
          <template slot-scope="scope">
            <div class="fontImportant">
              {{scope.row.Status === 0 ? 'Unconfirmed' : 'Confirmed'}}
            </div>
          </template>
				</el-table-column>
				<el-table-column
					label="Amount"
					width="180"
				>
        <template slot-scope="scope">
          <div>
            {{scope.row.Amount}} {{scope.row.Asset}}
          </div>
        </template>
				</el-table-column>
				<el-table-column
					label="From"
					min-width="180"
				>
        <template slot-scope="scope">
          <div :title="scope.row.From" @click.stop="goAddress(scope.row.From)" class="tb-link fontImportantThree">
            {{scope.row.From}}
          </div>
        </template>
				</el-table-column>
				<el-table-column
					label="To"
					min-width="180"
				>
          <template slot-scope="scope">
            <div :title="scope.row.To" @click.stop="goAddress(scope.row.To)" class="tb-link fontImportantThree">
              {{scope.row.To}}
            </div>
          </template>
				</el-table-column>
				<el-table-column
					label="Time"
					width="180"
				>
        <template slot-scope="scope">
          <div>
            {{$dateFormat.formatTimeByTimestamp(scope.row.CreatedAt*1000)}}
          </div>
        </template>
				</el-table-column>
			</el-table>
		</section>
	</div>
</template>
<script>
export default {
	name: "Address",
	data() {
		return {
      transactionObj: null,
			address: '',
			transactionList: [],
			loading: {
				transactionInfo: null,
				transactionList: null
			}
		};
	},
  methods: {
    init() {
      this.address = this.$route.query.address;
			this.getTransactionByAddress();
    },
		async getTransactionByAddress() {
			// add loading
      this.loading.transactionInfo = this.$loading({
				target: ".address-info-wrapper.loading-content",
			});
			this.loading.transactionList = this.$loading({
				target: ".transaction-wrapper.loading-content",
			});
			
			// get data
			let res = await this.$api2.getTransactionByAddress(this.address);

			// close loading
			this.loading.transactionInfo && this.loading.transactionInfo.close();
			this.loading.transactionList && this.loading.transactionList.close();

			if(res.error === 0) {
				this.transactionObj = res.result;
				this.transactionList = res.result.Txs;
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
				min-width: 291px;
				width: auto;
			}

			&.address-info-total {
				width: 404px;
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
		max-height: 800px;
		overflow-y: auto;
    height: auto;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		padding: 15px 32px;
		margin-bottom: 80px;
	}
}
</style>