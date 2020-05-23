<template>
  <div>
    <el-card class="subject-category-header">
      <span class="subject-category-header-text">全部专题</span>
    </el-card>
    <div>
      <div v-for="category in categories" :key="category">
        <subjectCategoryCard :category="category"></subjectCategoryCard>
      </div>
    </div>
    <div class="subjectUnknown">
      <el-card class="subjectUnknown-header">
        <span class="subjectUnknown-header-text">开放分类</span>
      </el-card>
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
      ],
      subjects: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get("/api/subject/getSubjectCategory")
        .then(res => {
          if (res.data.data) {
            for(let category of res.data.data){
              this.categories.push(category)
            }
          }
        })
        .catch(error => {
          if (error.response) {
          }
        });
    }
  }
};
</script>

<style scoped>
.subject-category-header {
  margin-top: 20px;
}
.subject-category-header-text {
  margin: 0;
  padding: 0;
  border-left: 5px solid #4d95dc;
  padding-left: 20px;
  font-size: 25px;
}
.subjectUnknown {
  width: 1200px;
}
.subjectUnknown-header {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}
.subjectUnknown-header-text {
  margin: 0;
  padding: 0;
  border-left: 5px solid #4d95dc;
  padding-left: 10px;
  font-size: 15px;
}
</style>