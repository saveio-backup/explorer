<template>
	<div
		class="scroll-bg"
		:class="{scroll:scroll,pop:pop}"
	>
		<img
			class="logo no-user-select"
			@click.stop="goHome"
			src="./../assets/images/logo.svg"
			alt=""
		>
		<nav class="navoni top-nav">
			<div
				class="menu-line"
				:class="{pop:pop}"
				@click="pop =!pop"
			>
				<span
					class="top-line line"
					:class="{scroll:scroll,pop:pop}"
				></span>
				<span
					class="mid-line line"
					:class="{scroll:scroll,pop:pop}"
				></span>
				<span
					class="bottom-line line"
					:class="{scroll:scroll,pop:pop}"
				></span>
			</div>
			<ul
				@touchstart.stop='stopPenetrate'
				class="nav_ul"
				:class="{pop:pop}"
			>
				<li class="search-input-li search-input-li-mobile">
					<el-input
						class="search-input"
						placeholder="ONR ID,Block,TX Hash,Contract Hash,Address"
						prefix-icon="el-icon-search"
						v-model="searchContent"
					></el-input>
				</li>
				<li class="no-user-select" @click.stop="goPage('/home')" :class="{'select': belong.home.indexOf(routerName) >= 0}">
          Explorer
				</li>
				<li class="no-user-select" @click.stop="goPage('/blocks/index')" :class="{'select': belong.blocks.indexOf(routerName) >= 0}">
          Blocks
				</li>
				<li class="no-user-select" @click.stop="goPage('/transactions/index')" :class="{'select': belong.transactions.indexOf(routerName) >= 0}">
          Transactions
				</li>
				<li class="no-user-select" @click.stop="goPage('/node')" :class="{'select': belong.node.indexOf(routerName) >= 0}">
          Node
				</li>
				<li class="no-user-select">
					<el-select
						:class="{scroll:scroll}"
						v-model="net"
						style='width: 85px'
						placeholder="请选择"
						@click.stop=""
					>
						<el-option
							v-for="item in netList"
							:key="item"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>

				</li>
				<li class="search-input-li">
					<el-input
						class="search-input"
						placeholder="ONR ID,Block,TX Hash,Contract Hash,Address"
						prefix-icon="el-icon-search"
						v-model="searchContent"
					></el-input>
				</li>
				<li @click.stop="setLangOpen"  class="no-user-select">
					<el-select
						@change="setLanguage"
						:class="{scroll:scroll}"
						v-model="value"
						style='width: 50px'
						placeholder="请选择"
						ref="setLanguageId"
						@click.stop=""
					>
						<el-option
							v-for="item in langRange"
							:key="item.title"
							:label="item.title"
							:value="item.lang"
						>
						</el-option>
					</el-select>
				</li>
			</ul>
		</nav>
	</div>

</template>
<script>
export default {
	data() {
		const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
		return {
			value: localStorage.getItem("lang") || "en",
			net: 'TestNet',
			netList: ['TestNet'],
			searchContent: "",
			scroll: scrollTop > 0 ? true : false,
      pop: false,
			routerName: this.$route.name,
			timeoutObj: null,
			belong: {
				home: ["Home",'ChartMore','Addresswarehouse','AllNetProfit','ChannelNumber','DayTransaction','FileTotal','StorageSpace','SumPledge'],
				blocks: ["Blocks", "BlocksIndex", "BlocksDetail"],
				transactions: ["Transactions", "TransactionIndex", "TransactionDetail"],
				node: ["Node"]
			},
			langRange: [
				{
					title: "中文",
					lang: "zh"
				},
				{
					title: "En",
					lang: "en"
				}
			]
		};
  },
  watch: {
		$route(val, old) {
      this.routerName = this.$route.name;
      this.pop = false;      
		}
	},
	mounted() {
		const vm = this;
		document.addEventListener("scroll", () => {
			const scrollTop =
				document.documentElement.scrollTop || window.pageYOffset;
			if (scrollTop > 0) {
				this.scroll = true;
			} else {
				this.scroll = false;
			}
		});
		window.onresize = function(){
			clearTimeout(vm.timeoutObj);
			vm.timeoutObj = setTimeout(() => {
				vm.changeScreenWidth();
			}, 300);
		}
	},
	methods: {
		changeScreenWidth() {
			let width = document.body.clientWidth;
			this.$store.commit('SET_SCREEN_WIDTH', width);
		},
		stopPenetrate(e) {
			console.log(e);
			console.log("stop");
		},
		closePop() {
			this.pop = false;
		},
		setLanguage(lang) {
			localStorage.setItem("lang", lang || "en");
			this.$i18n.locale = localStorage.getItem("lang");
		},
		goHome() {
			// window.location = "/";
			this.$router.push({
				path: '/'
			})
    },
    goPage(path) {
			if(this.$route.path === path) return;
      this.$router.push({path: path});
    },
		setLangOpen() {
			this.$refs['setLanguageId'].focus();
		}
	}
};
</script>
<style lang="scss">
$themeColor: #202020;

.el-select-dropdown {
	font-family: "SF Pro SC", "HanHei SC", "SF Pro Text", "Myriad Set Pro",
		"SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial",
		sans-serif;
	text-align: center;
}

.scroll-bg {
	position: fixed;
	z-index: 98;
	top: 0px;
	// left: 0px;
	width: 100%;
	padding: 30px 0;
	transition: all 0.5s;
	color: #fff;

	@media (max-width: 1170px) {
		width: 100%;
	}

	@media (max-width: 1024px) {
		padding: 26px 0;
	}

	& > .logo {
		position: absolute;
		top: 28px;
		left: calc(50% - 585px);
		transition: all 0.5s;
		z-index: 99;
		cursor: pointer;
		width: 110px;

		@media (max-width: 1170px) {
			left: 10px;
		}

		@media (max-width: 1024px) {
			left: calc(50% - 40px);
			width: 80px;
		}
	}

	&.pop {
		background: $themeColor;
		color: #fff !important;
		padding: 24px 0;
		box-shadow: 0 -4px 2px 6px rgba(125, 125, 125, 0.1);
	}

	&.scroll {
		background: rgba(0, 0, 0, 0.3);
		color: #fff !important;
		padding: 16px 0;
		box-shadow: 0 -4px 2px 6px rgba(32, 32, 32, 0.1);

		.logo {
			top: 12px;
		}

		@media (max-width: 1024px) {
			padding: 14px 0;
			
			&.pop {
				background: rgba(32, 32, 32, 1);
			}
		}
	}
}

.navoni {
	position: relative;
	margin: 0 auto;
	padding-left: 150px;
	box-sizing: border-box;
	width: 1170px;
	font-family: "PingFangSC-Semibold", "SF Pro SC", "HanHei SC", "SF Pro Text",
		"Myriad Set Pro", "SF Pro Icons", "PingFang SC", "Helvetica Neue",
		"Helvetica", "Arial", sans-serif;

	@media (max-width: 1170px) {
		width: 100%;
	}

	&.top-nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 0 auto;

		.menu-line {
			display: none;
		}

		.logo {
			font-size: 36px;
		}

		@media (max-width: 1024px) {
			width: 100%;

			.logo {
				flex: 1;
				text-align: center;
			}

			.menu-line {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				width: 28px;
				height: 28px;

				.line {
					transition: 0.3s all;
				}

				& > span {
					display: block;
					width: 100%;
					height: 3px;
					background: #fff;

					&.scroll,
					&.pop {
						background: #fff;
					}
				}

				&.pop {
					.top-line {
						transform: rotateZ(45deg) translateY(5px) translateX(10.2px);
					}

					.mid-line {
						opacity: 0;
					}

					.bottom-line {
						transform: rotateZ(-45deg) translateY(-4px) translateX(8px);
					}
				}
			}

			padding: 0px 30px;
		}
	}

	.nav_ul {
		position: relative;
		display: flex;
		flex: 1;
		font-size: 16px;
		justify-content: space-between;

		@media (max-width: 1024px) {
			transition: all 0.5s;
			transform: translateX(100%);

			&.pop {
				transform: translateX(0);
			}

			position: fixed;
			flex-direction: column;
			justify-content: flex-start;
			right: 0px;
			top: 56px;
			bottom: 0px;
			width: 100%;
			margin: 0px;
			background: $themeColor;
			color: #fff !important;
		}

		li {
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;

			@media (max-width: 1024px) {
				font-size: 14px;
				text-align: left;
				color: #fff;
				margin: 0 auto;
				width: calc(100% - 100px);
				justify-content: left;
				display: block;

				a {
					width: 100%;
				}

				&:not(.menu) {
					padding: 14px 0px;
					border-bottom: solid 1px rgba(204, 204, 204, 0.2);
				}

				&.menu {
					transition: 0.5s all;
					justify-content: flex-end;
					font-size: 36px;
					padding: 36px 30px 36px 0;

					&.scroll {
						padding: 24px 30px 24px 0;
					}
				}
			}

      &.select {
        color: #cddc39;
      }

      &:not(.search-input-li):hover {
        color: #cddc39;
      }

      &:not(.search-input-li):active {
        opacity: 0.7;
      }

			&.search-input-li {
				&.search-input-li-mobile {
					display: none;
					
					.search-input {
						max-width: calc(100% - 30px);
					}
				}

				@media (max-width: 1024px) {
					display: none;

					&.search-input-li-mobile{
						display: block;
						width: 100%;
						
						.search-input {
							display: flex;
							margin: 0 auto;
						}
					}
				}

				.search-input {
					width: 460px;
					height: 40px;
					margin-right: 20px;
					input {
						border-radius: 27px;
						border: 1px solid rgba(255, 255, 255, 0.2);
						color: #ffffff;
						background: rgba(0, 0, 0, 0);
						font-size: 14px;
						padding-left: 30px;
						padding-right: 20px;

						&:focus {
							border-color: white;
						}

						&::placeholder {
							color: rgba(255, 255, 255, 0.4);
						}
					}
				}
			}

			a {
				opacity: 0.7;

				&.nav-active {
					opacity: 1;
					color: #cddc39;
					// font-weight:bold;
				}

				&:hover {
					opacity: 1;
					color: #cddc39;
					// font-weight:bold;
				}
			}
		}
	}

	.el-select {
		&.scroll {
			.el-input__inner {
				color: #fff !important;
			}
		}

		.el-input {
			input {
				font-family: "PingFangSC-Semibold", "SF Pro SC", "HanHei SC",
					"SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "PingFang SC",
					"Helvetica Neue", "Helvetica", "Arial", sans-serif;
				font-size: 16px;
			}

			// .el-icon-arrow-up:before {
				// content: "" !important;
			// }

			.el-select__caret {
				color: #fff;

			// 	@media (max-width: 1024px) {
			// 		color: $themeColor;
			// 	}
			}

			.el-input__inner {
				padding-left: 0px;
				padding-right: 0px;
				text-align: left;
				border: none !important;
				background: none;
				color: rgba(255, 255, 255, 1) !important;

				@media (max-width: 1024px) {
					font-size: 16px;
					height: 22px;
					// line-height: 0%;
					cursor: pointer;
				}

			}

			@media (max-width: 1024px) {
				font-size: 16px;
				color: #fff;
				height: 22px;
				.el-select__caret {
					line-height: 100%;
				}
			}
		}

		&:hover {
			.el-input {
				.el-input__inner {
					color: #cddc39 !important;
				}
			}
			.el-select__caret {
				color: #cddc39 !important;
			}
		}
	}
}

.el-select-dropdown__item.selected {
	color: $themeColor !important;
}
</style>
