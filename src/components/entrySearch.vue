<template>
  <el-autocomplete
    :fetch-suggestions="querySearch"
    :placeholder="placeholder"
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
    placeholder: String,
    value: String
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    input(value) {
      // window.console.log(value);
      this.$emit("update:value", value);
    },
    querySearch(query, cb) {
      if (!query) return;
      this.$axios
        .get("/data/getSimilarPageName", {
          params: {
            nameList: query,
            mode: "es"
          }
        })
        .then(res => {
          // window.console.log(res.data.data);
          if (res.data.data) {
            cb(res.data.data);
          }
        })
        .catch(error => {});
    },
    handleSelect(item) {
      this.$emit("handleSelect", item)
    }
  }
};
</script>
