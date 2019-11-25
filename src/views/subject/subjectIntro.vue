<template>
  <div>
    <div class="subject-category-header">
      <span class="subject-category-header-text">全部专题</span>
    </div>
    <div>
      <div v-for="category in categories" :key="category.name">
        <subjectCategoryCard :category="category.name" :id="category.id"></subjectCategoryCard>
      </div>
    </div>
  </div>
</template>

<script>
import subjectCategoryCard from "./subjectIntro/subjectCategoryCard";

export default {
  name: "subjectIntro",
  components: {
    subjectCategoryCard
  },
  data() {
    return {
      categories: [
        {
          name: "计算机科学与技术",
          id: 0,
        }
      ]
    };
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