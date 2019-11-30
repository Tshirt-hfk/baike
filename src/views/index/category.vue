<template>
  <div>
    <div class="subject-category-header">
      <span class="subject-category-header-text">{{name}}</span>
    </div>
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
.subject-category-header {
  margin-top: 10px;
  border: 1px solid #409eff;
  border-left: 5px solid #409eff;
  height: 36px;
}
.subject-category-header-text {
  float: left;
  margin-left: 15px;
  margin-top: 4px;
  font-size: 20px;
}
</style>