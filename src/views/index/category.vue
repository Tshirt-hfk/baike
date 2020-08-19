<template>
  <div>
    <el-card class="category-header">
      <span class="category-header-text">{{name}}</span>
      <span class="category-header-text-sub">发现世界的美</span>
    </el-card>
    <div>
        <categoryCard :category="name"></categoryCard>
    </div>
  </div>
</template>

<script>
import categoryCard from "./category/categoryCard";

export default {
  name: "category",
  components: {
    categoryCard
  },
  watch: {
    $route: function(to ,from){
      this.name = to.params.name
      window.console.log(this.name)
    }
  },
  data() {
    return {
      name: this.$route.params.name,
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped>
.category-header{
  margin-top: 20px;
}
.category-header-text {
  margin: 0;
  padding: 0;
  border-left: 5px solid #4d95dc;
  padding-left: 20px;
  font-size: 25px;
}
.category-header-text-sub{
  color: #8a8a8a;
  font-size: 18px;
  margin-left: 25px;
}
</style>