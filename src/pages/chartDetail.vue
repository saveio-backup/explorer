<template>
	<div id="chartDetail">
		<section class="chart-detail-list">
			<p
				@click.stop="goPage('/chartDetail/allNetProfit')"
				:class="{'chart-detail-select': routerName === 'AllNetProfit'}"
			>Profit</p>
			<p
				@click.stop="goPage('/chartDetail/storageSpace')"
				:class="{'chart-detail-select': routerName === 'StorageSpace'}"
			>Storage Space</p>
			<p
				@click.stop="goPage('/chartDetail/fileTotal')"
				:class="{'chart-detail-select': routerName === 'FileTotal'}"
			>Number of Files</p>
			<p
				@click.stop="goPage('/chartDetail/channelNumber')"
				:class="{'chart-detail-select': routerName === 'ChannelNumber'}"
			>Number of Channels</p>
			<p
				@click.stop="goPage('/chartDetail/sumStake')"
				:class="{'chart-detail-select': routerName === 'SumStake'}"
			>Total Stake</p>
			<p
				@click.stop="goPage('/chartDetail/dayTransaction')"
				:class="{'chart-detail-select': routerName === 'DayTransaction'}"
			>Daily Transactions</p>
			<p
				@click.stop="goPage('/chartDetail/AddressPosition')"
				:class="{'chart-detail-select': routerName === 'AddressPosition'}"
			>Address Position</p>
		</section>
		<!-- <keep-alive> -->
		<router-view></router-view>
		<!-- </keep-alive> -->
	</div>
</template>
<script>
export default {
	name: "ChartDetail",
	data() {
		return {
			routerName: this.$route.name
		};
	},
	watch: {
		$route(val, old) {
			this.routerName = this.$route.name;
		}
	},
	methods: {
		goPage(path) {
			this.$router.push({
				path: path
			});
		}
	}
};
</script>
<style lang="scss" scoped>
#chartDetail {
	padding-top: 200px;
	width: 100%;
	height: auto;

	.chart-detail-list {
		max-width: 1170px;
		width: calc(100% - 30px);
		height: 80px;
		border-radius: 4px;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		display: flex;
		font-size: 16px;
		justify-content: space-around;
		margin: 0 auto;

		p {
			height: 80px;
			line-height: 80px;
			text-align: center;
			color: #fff;
			position: relative;
			cursor: pointer;

			&::before {
				content: "";
				position: absolute;
				height: 2px;
				width: 0%;
				bottom: 0;
				left: 0;
				background: #cddc39;
				transition: 0.2s width;
			}

			&:hover,
			&.chart-detail-select {
				color: #cddc39;
				&::before {
					width: 100%;
				}
			}

			&:active {
				opacity: 0.7;
			}
		}
	}
}
</style>