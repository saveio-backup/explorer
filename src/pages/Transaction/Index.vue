<template>
	<div id="transaction-index">
		<h2>TRANSACTIONS</h2>
		<p>A total of <span class="fontImportant">23921</span> blocks</p>
		<section class="transaction-wrapper">
			<el-table
				:data="transactionList"
				style="width: 100%;"
			>
				<el-table-column
					fixed
					prop="Hash"
					label="Hash"
					min-width="100"
				>
				</el-table-column>
				<el-table-column
					prop="Token"
					label="Token"
					width="180"
				>
				</el-table-column>
				<el-table-column
					prop="Status"
					label="Status"
					width="100"
				>
					<template slot-scope="scope">
						<span class="fontImportant">{{scope.row.Status}}</span>
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
						<span class="fontImportantThree">{{scope.row.From}}</span>
					</template>
				</el-table-column>
				<el-table-column
					label="To"
					min-width="200"
				>
					<template slot-scope="scope">
						<span class="fontImportantThree">{{scope.row.To}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="Time"
					label="Time"
					min-width="180"
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
export default {
	name: "TransactionIndex",
	data() {
		return {
			transactionList: [
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				},
				{
					Hash: "123123",
					Token: 1241241,
					Status: "Confirmed",
					Height: 12312,
					From: "fabasfibvshakjfahskjdfalsdf",
					To: "sbjkgahsdfbajsbdfjabsdf",
					Time: "2019-06-12 01:45:26"
				}
			]
		};
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