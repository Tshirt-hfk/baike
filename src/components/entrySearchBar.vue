<template>
  <div class="preview-searchbar">
    <div class="preview-logo-headl">
      <a title="首页" href="/">
        <img src="/static/image/name.png" />
      </a>
    </div>
    <div class="preview-search">
      <entrySearch style="width: 440px" v-bind:value.sync="value" placeholder="请输入词条名称"></entrySearch>
      <el-button type="primary" @click="search" style="margin-left: 10px">搜索词条</el-button>
    </div>
  </div>
</template>

<script>

import entrySearch from "../components/entrySearch";

export default {
	name: "entrySearchBar",
	components: {
		entrySearch
	},
	data() {
		return {
			value: "",
		}
	},
	methods: {
		search() {
			this.$emit("search", this.value);
		}
	}
}
</script>

<style scoped>
.preview-searchbar {
  width: 808px;
  height: 105px;
  margin: 0 auto;
  position: relative;
  font-family: arial;
}
.preview-logo-headl {
  padding: 25px 0 35px;
  float: left;
  line-height: 1;
}
.preview-search {
  float: left;
  padding: 37px 0;
}
</style>