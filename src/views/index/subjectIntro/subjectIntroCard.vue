<template>
  <el-card class="box-card" :body-style="{ padding: '10px' }">
    <div slot="header" class="clearfix">
      <span>{{name}}</span>
      <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
    </div>
    <div>
      <div class="image">
        <img :src="imageUrl" width="185" height="185" alt="专题图片" />
      </div>
      <div class="intro text">{{intro}}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "subjectIntroCard",
  props: {
    id: Number,
    imageUrl: String,
    name: String,
    intro: String
  }
};
</script>

<style>
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
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
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