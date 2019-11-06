<template>
	<header class="scroll">
		<div class="header-wrapper">
			<div class="header-left">
				<img
					src="./../assets/images/logo.svg"
					class="logo"
				>
				<nav class="top-nav">
					<ul class="ft16">
						<li :class="{'select': belong.home.indexOf(routerName) >= 0}">
							<router-link to="/home">
								Explorer
							</router-link>
						</li>
						<li :class="{'select': belong.blocks.indexOf(routerName) >= 0}">
							<router-link to="/blocks">
								Blokcs
							</router-link>
						</li>
						<li :class="{'select': belong.transactions.indexOf(routerName) >= 0}">
							<router-link to="/transactions">
								Transactions
							</router-link>
						</li>
						<li :class="{'select': belong.node.indexOf(routerName) >= 0}">
							<router-link to="/node">
								Node
							</router-link>
						</li>
						<li>
							TestNet
						</li>
					</ul>
				</nav>
			</div>
			<div class="header-right">
				<el-input
					class="search-input"
					placeholder="ONR ID,Block,TX Hash,Contract Hash,Address"
					prefix-icon="el-icon-search"
					v-model="searchContent"
				></el-input>
				<el-select
					v-model="value"
					style='width: 65px'
					@change="setLanguage"
					placeholder="Please Select"
				>
					<el-option
						v-for="item in langRange"
						:key="item.title"
						:label="item.title"
						:value="item.lang"
					>
					</el-option>
				</el-select>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
      value: localStorage.getItem("lang") || "en",
      searchContent: "",
			langRange: [
				{
					title: "中文",
					lang: "zh"
				},
				{
					title: "En",
					lang: "en"
				}
			],
			routerName: this.$route.name,
			belong: {
				home: ["Home"],
				blocks: ["Blocks", "BlocksIndex", "BlocksDetail"],
				transactions: ["Transactions", "TransactionIndex", "TransactionDetail"],
				node: ["Node"]
			}
		};
	},
	watch: {
		$route(val, old) {
			this.routerName = this.$route.name;
		}
	},
	methods: {
		setLanguage(lang) {
			localStorage.setItem("lang", lang || "en");
		}
	}
};
</script>

<style lang="scss">
header {
	width: 100%;
	height: 65px;
  z-index: 999;
	position: fixed;

	&.scroll {
		background: rgba(32, 32, 32, .8);
	}

	.header-wrapper {
		width: 1170px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		display: flex;
		color: white;
		top: 0;

		.header-left {
			width: 50%;
			display: flex;
			justify-content: space-between;
			user-select: none;

			.logo {
				width: 110px;
			}
			.top-nav {
				width: calc(100% - 130px);
				ul {
					height: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					li {
						&.select {
							a {
								color: #cddc39;
							}
						}

						a {
							cursor: pointer;
							&:hover {
								color: #cddc39;
							}
							&:active {
								opacity: 0.7;
							}
						}
					}
				}
			}
		}

		.header-right {
			width: 50%;
			display: flex;
			justify-content: flex-end;    
			align-items: center;

			.search-input {
				width: 460px;
				height: 40px;
				margin-right: 20px;
				input {
					border-radius: 27px;
					border: 1px solid rgba(255,255,255,0.2);
					color: #FFFFFF;
					background: rgba(0, 0, 0, 0);
					font-size: 14px;
					padding-left: 30px;
					padding-right: 20px;

					&:focus {
						border-color: white;
					}

					&::placeholder {
						color: rgba(255, 255, 255, .4);
					}
				}
			}

			.el-select {
				.el-input {
					input {
						font-size: 16px;
					}

					.el-select__caret {
						color: #fff;
					}

					.el-input__inner {
						padding-left: 0px;
						padding-right: 0px;
						border: none !important;
						background: none;
						color: rgb(255, 255, 255) !important;
					}
				}

				&:hover {
					.el-input {
						.el-input__inner,.el-select__caret {
							color: #cddc39 !important;
						}
					}
				}
			}
		}
	}

}
</style>