<template>
  <el-card class="box-card" :body-style="{ padding: '10px' }">
    <div slot="header" class="clearfix">
      <span>{{name}}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="toEntryIndex">查看</el-button>
    </div>
    <div>
      <div class="image">
        <img :src="imageUrl" width="180" height="180" alt="词条图片" />
      </div>
      <div class="intro text" ref="intro"></div>
    </div>
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
}
.intro {
  width: 150px;
  float: right;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 370px;
  height: 255px;
}
.el-card__header {
  padding: 12px 15px;
}
</style>