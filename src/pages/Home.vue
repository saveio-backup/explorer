<template>
	<div id="home">
		<section class="base-info loading-content">
			<ul>
				<li>
					<h4>
						Block Height
					</h4>
					<p>
						{{countStat && countStat.BlockHeight}}
					</p>
				</li>
				<li>
					<h4>
						Total Transactions
					</h4>
					<p>
						<!-- 8,395,962 -->
						{{countStat && countStat.TotalTxCount}}
					</p>
				</li>
				<li>
					<h4>
						Nodes
					</h4>
					<p>
						<!-- 288 -->
						{{countStat && (countStat.DNSNodeCount + countStat.FSNodeCount)}}
					</p>
				</li>
				<li>
					<h4>Total Address</h4>
					<p>{{countStat && countStat.TotalAddrs}}</p>
				</li>
				<li class="last-child">
					<h4>Channels</h4>
					<p>{{countStat && countStat.TotalChannels}}</p>
				</li>
			</ul>
		</section>
		<p class="ft14 chart-more">
			<router-link to="/chartMore">
				更多 <i class="ofont el-icon-d-arrow-right ft14"></i>
			</router-link>
		</p>
		<charts-component :type="1"></charts-component>
		<section class="home-other-info">
			<section class="blocks loading-content home-info">
				<div class="info-top ft16">
					<h3>Blocks</h3>
					<router-link to="/blocks">
						<i class="more-content-icon el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<ul class="blocks-list home-info-list">
					<li v-for="(item,index) in blockList" :key="index">
						<div class="block-left-area">
							<h4>{{ item.Height }}</h4>
							<p>{{ util.bytesToSize(item.Size*1024) }}</p>
						</div>
						<div class="block-right-area">
							<p>{{item.TxCount}} Txns</p>
							<p>32s ago</p>
						</div>
					</li>
				</ul>
			</section>
			<section class="transactions loading-content home-info">
				<div class="info-top ft16">
					<h3>Transactions</h3>
					<router-link to="/transactions">
						<i class="more-content-icon el-icon-d-arrow-right"></i>
					</router-link>
				</div>
				<ul class="blocks-list home-info-list">
					<li v-for="(item, index) in transactionsList" :key="index">
						<div class="block-left-area">
							<h4>{{item.Hash.slice(0,7)+'...'+item.Hash.slice(item.Hash.length - 8)}}</h4>
							<p>Invoke Smart Contract</p>
						</div>
						<div class="block-right-area">
							<p>32s ago</p>
						</div>
					</li>
				</ul>
			</section>
		</section>
	</div>
</template>

<script>
import chartsComponent from './../components/ChartsComponent'
import util from "../assets/config/util";
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
			// block data
			blockList: [],
			transactionsList: []
		};
	},
	methods: {
		init() {
			this.getCountStat();
			this.getBlocksStat();
			this.getTransactions();
		},
		getCountStat() {
			this.$axios.get(this.$api.getcountstat,{},
			{
				loading: {
					text: '加载中...',
					target: ".loading-content.base-info"
				}
			}).then(res => {
				console.log(res);
				if(res.Error === 0) {
					this.countStat = res.Result;
				} else {
					this.$message.error('数据加载失败');
				}
			})
		},
		getBlocksStat() {
			this.$axios.get(this.$api.getblocks + '/0/5' , {}, 
			{
				loading: {
					text: '加载中...',
					target: ".loading-content.blocks"
				}
			}).then(res => {
				if(res.Error === 0) {
					this.blockList = res.Result['Blocks'];
				}
			})
		},
		getTransactions() {
			this.$axios.get(this.$api.gettransactions + '/0/5' , {}, 
			{
				loading: {
					text: '加载中...',
					target: ".loading-content.transactions"
				}
			}).then(res => {
				if(res.Error === 0) {
					this.transactionsList = res.Result['Txs'];
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
		transition: width 0.5s;

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

					@media (max-width: 1024px) {
						font-size: 22px;
					}
				}
			}
		}
	}

	.chart-more {
		color: #CDDC39;
		max-width: 1170px;
		width: calc(100% - 30px);
		margin: 60px auto 30px;
		text-align: right;
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}

		&:active {
			opacity: 1;
		}
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
			transition: width 0.5s;

			@media (max-width: 1200px) {
				width: 100%;
			}

			.info-top {
				height: 55px;
				display: flex;
				justify-content: space-between;
				color: white;
				align-items: center;
				border-bottom: 1px solid #d8d8d8;

				.more-content-icon {
					&:hover {
						color: #CDDC39;
					}

					&:active {
						opacity: 0.7;
					}
				}
			}

			.home-info-list {
				li {
					border-bottom: 1px solid #d8d8d8;
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
            justify-content: center;
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