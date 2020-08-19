<template>
  <el-card class="box-card" :body-style="{ padding: '15px' }" shadow="hover">
    <div class="image">
      <img :src="imageUrl" width="250" height="160" alt="词条图片" />
    </div>
    <div style="margin-bottom: 20px" class="clearfix">
      <span class="name">{{name}}</span>
      <span class="label">分类标签</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="toEntryIndex">查看</el-button>
    </div>
    <div class="intro text" ref="intro"></div>
  </el-card>
</template>

<script>
export default {
  name: "entryCard",
  props: {
    id: Number,
    imageUrl: String,
    name: String,
    intro: String
  },
  mounted() {
    this.$refs.intro.innerHTML = this.intro;
  },
  methods: {
    toEntryIndex() {
      var { href } = this.$router.resolve({
        name: "entryPreview",
        params: {
          name: this.name
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style scoped>
.image {
  float: left;
  width: 250px;
  height: 160px;
  margin-top: 5px;
  border-right: 1px solid #ddd;
  padding-right: 10px;
}
.intro {
  width: 750px;
  float: left;
  margin-left: 20px;
  word-wrap: break-word;
}
.text {
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
}
.text >>> p {
  margin-block-start: 0em;
  margin-block-end: 0em;
}

.box-card {
  width: 1080px;
  height: 200px;
  border: 1px solid #ccc;
}
.name{
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
}
.label{
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
  color: #4d95dc;
}
</style>