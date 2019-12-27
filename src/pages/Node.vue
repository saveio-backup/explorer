<template>
	<div id="node">
		<map-component
			class="node-map"
			ref="nodeMap"
			:mapNodes="mapNodes"
		>
		</map-component>
		<h3 class="no-user-select">
			DNS
		</h3>
		<section class="dns-wrapper relative" ref="dnsWrapper">
			<el-table
				:data="dnsList"
				style="width:100%;"
			>
				<el-table-column
					fixed
					label="No."
					type="index"
					min-width="50"
				>
				</el-table-column>
				<el-table-column
					prop="Alias"
					label="DNS Node"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					prop="Region"
					label="Region"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					prop="ChannelCount"
					label="Channels"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					label="Stake"
					min-width="120"
				>
					<template slot-scope="scope">
						<div>
							{{util.effectiveNumber(scope.row.Stake)}} ONI
						</div>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<h3 class="no-user-select">
			FS
		</h3>
		<section class="fs-wrapper relative" ref="fsWrapper">
			<el-table
				:data="fsList"
				style="width: 100%;"
			>
				<el-table-column
					fixed
					label="No."
					prop="Index"
					min-width="50"
				>
				</el-table-column>
				<el-table-column
					prop="IP"
					label="DNS Node"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					prop="Region"
					label="Region"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					label="Storage"
					min-width="150"
				>
					<template slot-scope="scope">
						<div>
							{{util.bytesToSize(scope.row.Storage*1000)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="ProfitFormat"
					label="Profit(ONI)"
					width="150"
				>
					<template slot-scope="scope">
						<div>
							{{util.effectiveNumber(scope.row.ProfitFormat)}}
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="Address"
					min-width="220"
					:show-overflow-tooltip="true"
				>
					<template slot-scope="scope">
						<div
							class="fontImportant"
							:title="scope.row.walletAddr"
						>
							<router-link
								class="tb-link"
								:to="`/address?address=${scope.row.walletAddr}`"
							>
								{{scope.row.walletAddr}}
							</router-link>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				@current-change="currentChange"
				background
				layout="prev, pager, next"
				:page-size="5"
				:total="total"
			>
			</el-pagination>
		</section>
	</div>
</template>
<script>
import util from "../assets/config/util";
import mapComponent from "../components/MapComponent.vue";
export default {
	name: "Node",
	components: {
		mapComponent
	},
	data() {
		return {
			util,
			nodeObj: null,
			currentPage: 1,
			mapNodes: [],
			loading: {
				dnsList: null,
				fsList: null,
			}
		};
	},
	computed: {
		dnsList() {
			if (!this.nodeObj) return [];
			return this.nodeObj.DNS;
		},
		fsList() {
			if (!this.nodeObj) return [];
			return this.nodeObj.FS.slice(
				(this.currentPage - 1) * 5,
				this.currentPage * 5
			);
		},
		total() {
			if (!this.nodeObj) return 0;
			return this.nodeObj.FS.length;
		}
	},
	methods: {
		currentChange(page) {
			this.currentPage = page;
		},
		init() {
			this.getNodes();
		},
		async getNodes() {
			// add loading
			this.loading.dnsList = this.$loading.show({
				container: this.$refs.dnsWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});
			this.loading.fsList = this.$loading.show({
				container: this.$refs.fsWrapper,
				opacity: 0.5,
				backgroundColor: 'rgba(0,0,0,0)',
				loader: 'dots',
				color: '#ffffff',
				width: 45,
				height: 45
			});

			// get data
			let res = await this.$api2.getNodes();

			// close loading
			this.loading.dnsList && this.loading.dnsList.hide();
			this.loading.fsList && this.loading.fsList.hide();

			if(res.error === 0) {
				for (let i = 0; i < res.result.FS.length; i++) {
					let item = res.result.FS[i];
					item["Index"] = i + 1;
				}
				this.nodeObj = res.result;
				this.filterNodeObj(this.nodeObj);
			}
		},
		filterNodeObj() {
			let arr = [];
			for(let value of this.nodeObj.DNS) {
				arr.push(Object.assign(value, {type: 'dns'}))
			}
			for(let value of this.nodeObj.FS) {
				arr.push(Object.assign(value, {type: 'fs'}));
			}
			this.mapNodes = arr;
		}
	},
	mounted() {
		this.init();
	}
};
</script>
<style lang="scss">
#node {
	padding-top: 65px;
	max-width: 1170px;
	margin: 0 auto;
	width: calc(100% - 30px);

	.node-map {
		height: 520px;
		margin-top: 73px;
		margin-bottom: 14px;
		background: #2a2a2b;
		// border: 1px solid white;
		// .map {
		//   width: 100%;
		//   height: 100%;
		// }
	}

	h3 {
		height: 24px;
		font-size: 20px;
		color: white;
		margin-bottom: 24px;
		margin-top: 32px;
	}

	.dns-wrapper {
		width: 100%;
		height: 345px;
		padding: 10px 25px;
		overflow-y: auto;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
	}

	.fs-wrapper {
		width: 100%;
		height: 400px;
		position: relative;
		padding: 10px 25px;
		overflow-y: auto;
		background: #2a2a2b;
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 4px;
		margin-bottom: 80px;

		.pagination {
			position: absolute;
			bottom: 25px;
			right: 25px;
		}
	}
}
</style>