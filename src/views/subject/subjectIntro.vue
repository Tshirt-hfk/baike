<template>
  <div>
    <div class="subject-category-header">
      <span class="subject-category-header-text">全部专题</span>
    </div>
    <div>
      <div v-for="category in categories" :key="category.name">
        <subjectCategoryCard :category="category.name"></subjectCategoryCard>
      </div>
    </div>
    <div class="subjectUnknown">
      <div class="subjectUnknown-header">
        <span class="subjectUnknown-category">开放分类</span>
      </div>
      <div>
        <div class="subjectUnknownIntro" v-for="subject in subjects" :key="subject.id">
          <subjectUnknown :id="subject.id" :name="subject.name" :imageUrl="subject.imageUrl" :intro="subject.intro"></subjectUnknown>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import subjectCategoryCard from "./subjectIntro/subjectCategoryCard";
import subjectUnknown from "./subjectIntro/subjectUnknown"

export default {
  name: "subjectIntro",
  components: {
    subjectCategoryCard,
    subjectUnknown
  },
  data() {
    return {
      categories: [
        {
          name: "计算机科学与技术"
        }
      ],
      subjects: [
        {
          id: 0,
          name: "河流",
          imageUrl: "http://101.200.34.92:8081/resource/image/260ca63909524fb593be134d31d2b3ee.png",
          intro: "啊啊"
        },
        {
          id: 1,
          name: "海洋",
          imageUrl: "http://101.200.34.92:8081/resource/image/260ca63909524fb593be134d31d2b3ee.png",
          intro: "啊啊"
        },
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
.subjectUnknown {
  width: 1200px;
}
.subjectUnknown-header {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 24px;
  border: 1px solid #bfbfbf;
  height: 35px;
}
.subjectUnknown-category {
  float: left;
  margin-left: 20px;
  margin-top: 3px;
  font-size: 20px;
  color: #409eff;
}
.subjectUnknown-header::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 37px;
  background-color: #4d95dc;
  position: absolute;
  margin-top: -1px;
}
</style>