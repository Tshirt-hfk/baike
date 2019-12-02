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
      <div class="subjectIntro" v-for="entry in entrys" :key="entry.id">
        <entryCard
          :id="entry.id"
          :name="entry.name"
          :imageUrl="entry.imageUrl"
          :intro="entry.intro"
        ></entryCard>
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
  watch: {
    category: function(n, o) {
      this.init();
    }
  },
  data() {
    return {
      entrys: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get("/data/recommendByCategory", {
          params: {
            category: this.category
          }
        })
        .then(res => {
          if (res.data) {
            this.entrys.splice(0, this.entrys.length);
            for (let entry of res.data) {
              this.entrys.push({
                id: entry["info"]["id"],
                name: entry["page_name"],
                intro: entry["info"]["intro"],
                imageUrl: entry["info"]["imageUrl"]
              });
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