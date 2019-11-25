<template>
  <div class="subjects">
    <div class="subject-header">
      <span class="subject-category">{{category}}</span>
      <el-link type="primary" :underline="false" class="subject-op">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </el-link>
    </div>
    <div>
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
        {
          id: 0,
          name: "aa ",
          imageUrl: "http://101.200.34.92:8081/resource/image/260ca63909524fb593be134d31d2b3ee.png",
          intro: "啊啊"
        },
        {
          id: 1,
          name: "aa ",
          imageUrl: "http://101.200.34.92:8081/resource/image/260ca63909524fb593be134d31d2b3ee.png",
          intro: "啊啊"
        },
        {
          id: 2,
          name: "aa ",
          imageUrl: "http://101.200.34.92:8081/resource/image/260ca63909524fb593be134d31d2b3ee.png",
          intro: "啊啊"
        }
      ]
    };
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