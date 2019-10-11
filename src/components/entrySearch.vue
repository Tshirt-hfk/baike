<template>
  <el-autocomplete
    :fetch-suggestions="querySearch"
    :placeholder="placehilder"
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
      options: []
    };
  },
  methods: {
    input(value) {
      window.console.log(value);
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
          window.console.log(res.data.similar_pages);
          if (res.data) {
            let options = [];
             res.data.similar_pages.forEach(element => {
               options.push({
                 value: element
               })
             });
            cb(options);
          } else {

          }
        })
        .catch(error => {});
    },
    handleSelect(item) {}
  }
};
</script>
