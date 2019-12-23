<template>
	<div id="home">
		<section class="base-info loading-content">
			<ul>
				<li>
					<h4>
						Block Height
					</h4>
					<p ref="homeBlockHeight" class="relative">
						<template v-if="countStat">
							<router-link
								class="link-fontImportant"
								:to="`/blocks/detail?height=${countStat.BlockHeight}`"
							>
								{{countStat.BlockHeight}}
							</router-link>
						</template>
					</p>
				</li>
				<li class="relative" ref="homeTransactionTotal">
					<h4>
						Total Transactions
					</h4>
					<p>
						<template v-if="countStat">
							<router-link class="link-fontImportant" to="/transactions/index">
								{{transactionsLength}}
							</router-link>
						</template>
					</p>
				</li>
				<li>
					<h4>
						Nodes
					</h4>
					<p ref="homeNode" class="relative">
						<template v-if="countStat">
							<router-link to="/node" class="link-fontImportant">
								{{countStat.NodeCount}}
							</router-link>
						</template>
					</p>
				</li>
				<li class="loading-content home-address-length">
					<h4>Total Address</h4>
					<p ref="homeAddressLength" class="relative">
						<template v-if="countStat">
							<router-link to="/chartDetail/Addresswarehouse" class="link-fontImportant">
								{{totalAddrs}}
							</router-link>
						</template>
					</p>
				</li>
				<li class="last-child">
					<h4>Channels</h4>
					<p ref="homeChannel" class="relative">
						<template v-if="countStat">
							<router-link to="/chartDetail/channelNumber" class="link-fontImportant">
								{{countStat.TotalChannels}}
							</router-link>
						</template>
					</p>
				</li>
			</ul>
		</section>
	<p class="ft14 chart-more">
			<router-link
				to="/chartMore"
				class="click-link no-user-select"
				title="More"
			>
				More <i class="ofont el-icon-d-arrow-right ft14"></i>
			</router-link>
		</p>
		<charts-component :type="1"></charts-component>
		<section class="home-other-info">
			<section class="blocks home-info relative" ref="blocks">
				<div class="info-top ft16">
					<h3 class="no-user-select">Blocks</h3>
						<router-link
							to="/blocks"
						>
							<i class="more-content-icon el-icon-d-arrow-right"></i>
						</router-link>
				</div>
				<ul class="blocks-list home-info-list">
					<li
						v-for="(item,index) in blockList"
						:key="index"
					>
						<div class="block-left-area">
							<h4 class="link-fontImportant click-link">
								<router-link
									:to="`/blocks/detail?height=${item.Height}`"
									:title="item.Height"
								>
									{{ item.Height }}
								</router-link>
							</h4>
							<p>{{ util.bytesToSize(item.Size*1024) }}</p>
						</div>
						<div class="block-right-area">
							<p>{{item.TxCount}} Txns</p>
							<p>{{item.ago || 'Computing'}}</p>
						</div>
					</li>
				</ul>
			</section>
			<section class="transactions home-info relative" ref="homeTransaction">
				<div class="info-top ft16">
					<h3 class="no-user-select">Transactions</h3>
					<router-link
						to="/transactions"
					>
						<i class="more-content-icon el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<ul class="blocks-list home-info-list">
					<li
						v-for="(item, index) in transactionsList"
						:key="index"
					>
						<div class="block-left-area">
							<h4
								:title="item.Hash"
								class="link-fontImportant click-link"
							>
								<router-link
									:to="`transactions/detail?hash=${item.Hash}`"
									:title="item.Hash"
								>
									{{item.Hash.slice(0,7)+'...'+item.Hash.slice(item.Hash.length - 8)}}
								</router-link>
							</h4>
							<p>Invoke Smart Contract</p>
						</div>
						<div class="block-right-area">
							<p>{{item.ago || 'Computing'}}</p>
						</div>
					</li>
				</ul>
			</section>
		</section>
	</div>
</template>

<script>
import chartsComponent from "./../components/ChartsComponent";
import util from "../assets/config/util";
import moment from 'moment'
export default {
	name: "Home",
	components: {
		chartsComponent
	},
	data() {
		return {
			util,
			countStat: null,
			storageStat: null,
			blockList: [],
			transactionsLength: "",
			totalAddrs: "",
			transactionsList: [],
			timeAgoIntervalObj: null,
			loading: {
				countStatBlockHeight: null,
				countStatNode: null,
				countStatChannel: null,
				transactionList: null,
				transactionTotal: null,
				addressLength: null,
			}
		};
	},
	methods: {
		init() {
			this.getCountStat();
			this.getBlocksStat();
			this.getTransactions();
			this.getAddressLength();
			
			clearTimeout(this.timeAgoIntervalObj);
			this.toGetTimeAgo();
			this.timeAgoIntervalObj = setInterval(() => {
				this.toGetTimeAgo();
			}, 1000);
		},

		async getAddressLength() {
			// add loading
			this.loading.addressLength = this.$loading.show({
				container: this.$refs.homeAddressLength,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});

			// get data
			let res = await this.$api2.getAddressLength();

			// close loading
			this.loading.addressLength && this.loading.addressLength.hide();

			if(res.error === 0) {
				this.totalAddrs = res.result;
			}
		},

		async getCountStat() {
			// add loading
			this.loading.countStatBlockHeight = this.$loading.show({
				container: this.$refs.homeBlockHeight,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});
			this.loading.countStatNode = this.$loading.show({
				container: this.$refs.homeNode,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});
			this.loading.countStatChannel = this.$loading.show({
				container: this.$refs.homeChannel,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});

			// get data
			let res = await this.$api2.getCountStat();

			// close loading
			this.loading.countStatBlockHeight && this.loading.countStatBlockHeight.hide();
			this.loading.countStatNode && this.loading.countStatNode.hide();
			this.loading.countStatChannel && this.loading.countStatChannel.hide();

			if(res.error === 0) {
				this.countStat = res.result;
			} else {
				console.log('err',res)
			}
		},
		async getBlocksStat() {
			// add loading
			this.loading.blocksStat = this.$loading.show({
				container: this.$refs.blocks,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});

			// get data
			let res = await this.$api2.getBlocks({offset: 1, limit: 6});

			// close loading
			this.loading.blocksStat && this.loading.blocksStat.hide();
			
			if(res.error === 0) {
				this.blockList = res.result['Detail'];
			}
		},
		async getTransactions() {
			// add loading
			this.loading.transactionList = this.$loading.show({
				container: this.$refs.homeTransaction,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});
			this.loading.transactionTotal = this.$loading.show({
				container: this.$refs.homeTransactionTotal,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff'
			});

			// get data
			let res = await this.$api2.getTransactions({offset: 0, limit: 6});

			// close loading
			this.loading.transactionList && this.loading.transactionList.hide();
			this.loading.transactionTotal && this.loading.transactionTotal.hide();

			if(res.error === 0) {
				this.transactionsList = res.result['Detail'];
				this.transactionsLength = res.result['Total'];
			}
		},
		computedTimeAgo({currentTimestamp, timestamp}) {
			let result = '';
			let today = new Date()
			let yesterday = moment(new Date()).subtract(1, 'days')  // yestoday subtract function 
			if (moment(today).isSame(new Date(timestamp), 'day')) {  // judge isSame function
				let hours = parseInt(((currentTimestamp - timestamp) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				if (hours > 0) {
						return hours + " hours ago";
				};
				let minutes = parseInt(((currentTimestamp - timestamp) % (1000 * 60 * 60)) / (1000 * 60));
				if (minutes > 0) {
						return minutes + " minutes ago";
				};
				let seconds = parseInt(((currentTimestamp - timestamp) % (1000 * 60)) / 1000);
				return seconds + ' seconds ago'
			} else if (moment(yesterday).isSame(new Date(timestamp), 'day')) {
				return 'yesterday'
			} else {
				return moment(timestamp).format('YYYY-MM-DD');
			}
			return result;
		},
		toGetTimeAgo() {
			let currentTimestamp = new Date().getTime();
			for(let value of this.blockList) {
				let ago = this.computedTimeAgo({currentTimestamp, timestamp: value.CreatedAt*1000});
				value['ago'] = ago;
			}

			for(let value of this.transactionsList) {
				let ago = this.computedTimeAgo({currentTimestamp, timestamp: value.CreatedAt*1000});
				value['ago'] = ago;
			}
			this.$forceUpdate();
		}
	},
	mounted() {
		this.init();
	}
};
</script>

<style lang="scss" scoped>
#home {
	padding-top: 200px;

	.base-info {
		max-width: 1170px;
		width: calc(100% - 30px);
		height: 174px;
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 2px;
		margin: 0 auto;
		padding: 50px 0;
		transition: width 0.1s;

		@media (max-width: 1200px) {
			margin: 0 auto 35px;
		}

		@media (max-width: 1024px) {
			height: auto;
		}

		ul {
			width: 100%;
			height: 100%;
			display: flex;

			@media (max-width: 1024px) {
				overflow: hidden;
				display: block;
			}

			li {
				width: 20%;
				text-align: center;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				border-right: 1px solid #3f3f40;

				@media (max-width: 1024px) {
					width: 50%;
					height: 70px;
					float: left;
					margin-bottom: 25px;
					border-right: 0;
				}

				&:last-child {
					border: 0;

					@media (max-width: 1024px) {
						margin-bottom: 0;
					}
				}

				h4 {
					font-size: 16px;
					color: rgba(255, 255, 255, 0.4);
					user-select: none;

					@media (max-width: 1024px) {
						font-size: 18px;
					}
				}

				p {
					font-size: 32px;
					color: #cddc39;
					height: 100%;

					@media (max-width: 1024px) {
						font-size: 22px;
					}
				}
			}
		}
	}

	.chart-more {
		color: #cddc39;
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 60px auto 30px;
		text-align: right;
	}

	.home-other-info {
		max-width: 1170px;
		width: calc(100% - 30px);
		height: auto;
		display: flex;
		justify-content: space-between;
		margin: 60px auto 80px;

		@media (max-width: 1200px) {
			display: block;
		}

		.home-info {
			width: 573px;
			height: 473px;
			background: rgba(42, 42, 43, 1);
			box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
			border-radius: 4px;
			padding: 5px 32px;
			transition: width 0.1s;

			@media (max-width: 1200px) {
				width: 100%;
			}

			.info-top {
				height: 55px;
				display: flex;
				justify-content: space-between;
				color: white;
				align-items: center;
				border-bottom: 1px solid rgba(216, 216, 216, 0.4);

				.more-content-icon {
					&:hover {
						color: #cddc39;
					}

					&:active {
						opacity: 0.7;
					}
				}
			}

			.home-info-list {
				li {
					border-bottom: 1px solid rgba(216, 216, 216,0.1);
					height: 68px;
					padding: 10px 0;

					&:last-child {
						border-bottom: 0;
					}
				}
			}
		}

		.blocks {
			@media (max-width: 1200px) {
				margin-bottom: 20px;
			}
			.blocks-list {
				li {
					display: flex;
					justify-content: space-between;

					.block-left-area {
						display: flex;
						justify-content: space-between;
						flex-direction: column;

						h4 {
							font-size: 22px;
							font-weight: bold;
							color: rgba(205, 220, 57, 1);
							line-height: 27px;
						}

						p {
							font-size: 14px;
							font-weight: 400;
							color: rgba(175, 172, 172, 1);
							line-height: 18px;
						}
					}

					.block-right-area {
						display: flex;
						justify-content: space-between;
						flex-direction: column;

						p {
							font-size: 14px;
							font-weight: 400;
							color: rgba(175, 172, 172, 1);
							line-height: 18px;
							text-align: right;
						}
					}
				}
			}
		}

		.transactions {
			.blocks-list {
				li {
					display: flex;
					justify-content: space-between;

					.block-left-area {
						min-width: 150px;

						h4 {
							font-size: 16px;
							font-weight: 600;
							color: rgba(205, 220, 57, 1);
							line-height: 20px;
						}
						p {
							font-size: 14px;
							font-weight: 400;
							color: rgba(175, 172, 172, 1);
							line-height: 18px;
						}
					}

					.block-right-area {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 380px;

						p {
							font-size: 14px;
							font-weight: 400;
							color: rgba(175, 172, 172, 1);
							line-height: 18px;
							text-align: center;
						}
					}
				}
			}
		}
	}
}
</style>