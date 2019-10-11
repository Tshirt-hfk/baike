<template>
  <el-autocomplete
    :fetch-suggestions="querySearch"
    placeholder="请输入词条名称"
    :trigger-on-focus="false"
    @select="handleSelect"
    :value="value"
    @input="input"
  ></el-autocomplete>
</template>

<script>
export default {
  name: "entrySearch",
  props: {
    placehilder: String,
    value: String
  },
  data() {
    return {
      loading: false,
      options: []
    };
  },
  methods: {
    input(value) {
      window.console.log(value);
      this.$emit("update:value", value);
    },
    querySearch(query, cb) {
      this.loading = true;
      this.value = query;
      this.$axios
        .get("/data/getSimilarPageName", {
          params: {
            nameList: query,
            mode: "es"
          }
        })
        .then(res => {
          if (res.data.data) {
            this.options = res.data.data.subjects;
          } else {
          }
          this.loading = false;
        })
        .catch(error => {});
    },
    handleSelect(item) {}
  }
};
</script>
