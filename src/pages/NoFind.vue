<template>
  <div id="no-find">
    <div class="no-find-wrapper flex column ai-center">
      <img class="search-img" width="180" src="./../assets/images/search.png">
      <el-input
        ref="searchInput"
        class="search-input"
        placeholder="Block,TX Hash,Contract Hash,Address"
        prefix-icon="el-icon-search"
        @keyup.enter.native="toSearch"
        v-model="searchContent">
      </el-input>
      <p class="no-find-desc">Your search did not match any records, please change the keywords and try again.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoFind',
  data() {
    return {
      searchContent: ''
    }
  },
  methods: {
    async toSearch() {
      const vm = this;
			let content = this.searchContent.trim();
			if(content.length === 0) {
				this.$router.push({path:'/noFind'});
				return;
			}
			let res = await this.$api2.getTypeByContent(content);
			switch(res) {
				case 0:
					this.$router.push({path:'/noFind'});
					break;
				case 1:
					this.$router.push({path:'/address',query: {address: content}});
					break;
				case 2:
					this.$router.push({path:'/transactions/detail',query: {hash: content}});
					break;
				case 3:
					this.$router.push({path:'/blocks/detail',query: {height: content}});
					break;
				default:
					this.$router.push({path:'/noFind'});
			}
    }
  },
  mounted() {
    this.$refs.searchInput.focus();
  }
}
</script>

<style lang="scss">
#no-find {
	padding-top: 200px;

  .no-find-wrapper {
    max-width: 1170px;
		width: calc(100% - 30px);
		height: 577px;
		background: rgba(42, 42, 43, 1);
		box-shadow: 0px -4px 40px 0px rgba(0, 0, 0, 0.32);
		border-radius: 2px;
		margin: 0 auto 80px;
		padding: 60px 0;

    .search-img {
      margin-bottom: 60px;
    }

    .search-input {
      width: 594px;
      height: 40px;

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

    .no-find-desc {
      font-size:14px;
      color:rgba(255,255,255,0.4);
      margin-top: 20px;
    }
  }
}
</style>