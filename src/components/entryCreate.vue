<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="词条名称">
      <el-autocomplete
        v-model="form.name"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入词条名称"
        @select="handleSelect"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="词条分类">
      <entryCategorySelector v-bind:category.sync="form.category" placeholder="请选择词条分类"></entryCategorySelector>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import entryCategorySelector from "./entryCategorySelector";

export default {
  name: "entryCreate",
  components: {
    entryCategorySelector
  },
  data() {
    return {
      form: {
        name: "",
        category: ""
      }
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      // this.$axios
      //   .post("/api/user/searchSubject", {
      //     keyword: query
      //   })
      //   .then(res => {
      //     if (res.data.data) {
      //       this.options = res.data.data.subjects;
      //     } else {
      //     }
      //     this.loading = false;
      //   })
      //   .catch(error => {});
    },
    handleSelect(item) {},
    onSubmit() {
        window.console.log(this.form.category)
    }
  }
};
</script>