<template>
  <div class="subjects">
    <div class="subject-header">
      <span class="subject-category">分类精选</span>
      <el-link type="primary" :underline="false" class="subject-op">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </el-link>
    </div>
    <div>
      <div class="subjectIntro" v-for="subject in subjects" :key="subject.id">
        <entryCard :id="subject.id" :name="subject.name" :imageUrl="subject.imageUrl" :intro="subject.intro"></entryCard>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import entryCard from "./entryCard";

export default {
  name: "categoryCard",
  props: {
	  category: String
  },
  components: {
    entryCard
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
      // this.$axios
      //   .post("/api/entry/getRecommendSubjectByName", {
      //     field: this.category
      //   })
      //   .then(res => {
      //     if (res.data.data) {
      //       for(let subject of res.data.data){
      //         this.subjects.push(subject)
      //       }
      //     }
      //   })
      //   .catch(error => {
      //     if (error.response) {
      //     }
      //   });
    }
  }
};
</script>

<style scoped>
.subjects {
  width: 1200px;
}
.subject-header {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 24px;
  border: 1px solid #409eff;
  border-left: 5px solid #409eff;
  height: 30px;
}
.subject-category {
  float: left;
  margin-left: 10px;
  margin-top: 3px;
}
.subject-op {
  float: right;
  margin-right: 15px;
  margin-top: 4px;
}
.subjectIntro {
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
.clear {
  clear: both;
}
</style>