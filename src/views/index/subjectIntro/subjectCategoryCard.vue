<template>
  <div class="subjects">
    <el-card class="subject-header">
      <span class="subject-category">{{category}}</span>
      <el-link type="primary" :underline="false" class="subject-op">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </el-link>
    </el-card>
    <div class="subject-main">
      <div class="subjectIntro" v-for="subject in subjects" :key="subject.id">
        <subjectIntroCard :id="subject.id" :name="subject.name" :imageUrl="subject.imageUrl" :intro="subject.intro"></subjectIntroCard>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import subjectIntroCard from "./subjectIntroCard";

export default {
  name: "subjectCategoryCard",
  props: {
	  category: String
  },
  components: {
    subjectIntroCard
  },
  data() {
    return {
      subjects: [
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .post("/api/subject/getRecommendSubjectByName", {
          field: this.category
        })
        .then(res => {
          if (res.data.data) {
            for(let subject of res.data.data){
              this.subjects.push(subject)
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
.subjects {
  width: 1200px;
}
.subject-header {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}
.subject-category {
  margin: 0;
  padding: 0;
  border-left: 5px solid #4d95dc;
  padding-left: 10px;
  font-size: 15px;
}
.subject-op {
  float: right;
  margin-right: 15px;
  margin-top: 4px;
}
.subject-main{
  width: 90%;
  margin: 0 auto;
}
.subjectIntro {
  float: left;
  margin-top: 10px;
}
.clear {
  clear: both;
}
</style>