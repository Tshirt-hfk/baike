<template>
  <div class="subjects">
    <el-card class="category-entry-header">
      <span class="category-entry-header-text">分类精选</span>
      <el-link type="primary" :underline="false" class="category-entry-op">
        更多
        <i class="el-icon-d-arrow-right"></i>
      </el-link>
    </el-card>
    <div class="category-entry-main">
      <div class="category-entry-content" v-for="entry in entrys" :key="entry.id">
        <entryCard
          :id="entry.id"
          :name="entry.name"
          :imageUrl="entry.imageUrl"
          :intro="entry.intro"
        ></entryCard>
      </div>
      <div class="clear"></div>
    </div>
    <el-card class="category-entry-header">
      <span class="category-entry-header-text">更多分类</span>
    </el-card>
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
.category-entry-header{
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
}
.category-entry-header-text {
  margin: 0;
  padding: 0;
  border-left: 5px solid #4d95dc;
  padding-left: 10px;
  font-size: 15px;
}
.category-entry-op {
  float: right;
  margin-right: 15px;
  margin-top: 4px;
}
.category-entry-main{
  width: 90%;
  margin: 0 auto;
}
.category-entry-content{
  float: left;
  margin-top: 10px;
}
.clear {
  clear: both;
}
</style>