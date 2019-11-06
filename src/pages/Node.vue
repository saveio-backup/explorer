<template>
	<div id="node">
    <!-- <map-component class="node-map">
    </map-component> -->
		<h3>
			DNS
		</h3>
		<section class="dns-wrapper">
			<el-table :data="dnsList" style="width:100%;">
				<el-table-column
					fixed
					label="No."
					type="index"
					min-width="50"
				>
				</el-table-column>
				<el-table-column
					prop="DNSNode"
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
					prop="Channels"
					label="Channels"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					label="Pledge"
					min-width="120"
				>
					<template slot-scope="scope">
						<div>
							{{scope.row.Pledge}} SAVE
						</div>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<h3>
			FS
		</h3>
		<section class="fs-wrapper">
			<el-table :data="fsList" style="width: 100%;">
				<el-table-column
					fixed
					label="No."
					type="index"
					min-width="50"
				>
				</el-table-column>
				<el-table-column
					prop="DNSNode"
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
					prop="Storage"
					label="Storage"
					min-width="120"
				>
				</el-table-column>
				<el-table-column
					prop="Profit"
					label="Profit"
					width="120"
				>
				</el-table-column>
				<el-table-column
					prop="Address"
					label="Address"
					min-width="220"
				>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				background
				layout="prev, pager, next"
				:total="100"
			>
			</el-pagination>
		</section>
	</div>
</template>
<script>
// import MapComponent from "../components/MapComponent.vue";
export default {
	name: "Node",
	// components: {
	// 	MapComponent
	// },
	data() {
		return {
			dnsList: [
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Channels: 145124,
					Pledge: 123123
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Channels: 145124,
					Pledge: 123123
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Channels: 145124,
					Pledge: 123123
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Channels: 145124,
					Pledge: 123123
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Channels: 145124,
					Pledge: 123123
				}
			],
			fsList: [
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Storage: "100TB",
					Profit: 1000,
					Address: "gangdabubewjsbjkasdkjfajksdfa"
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Storage: "100TB",
					Profit: 1000,
					Address: "gangdabubewjsbjkasdkjfajksdfa"
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Storage: "100TB",
					Profit: 1000,
					Address: "gangdabubewjsbjkasdkjfajksdfa"
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Storage: "100TB",
					Profit: 1000,
					Address: "gangdabubewjsbjkasdkjfajksdfa"
				},
				{
					DNSNode: "Mixar",
					Region: "Europ",
					Storage: "100TB",
					Profit: 1000,
					Address: "gangdabubewjsbjkasdkjfajksdfa"
				}
			],
		};
	},
	methods: {
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
		height: 471px;
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
		max-height: 345px;
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