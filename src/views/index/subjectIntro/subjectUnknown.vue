<template>
  <el-card class="unknown-card" :body-style="{ padding: '10px' }">
    <div slot="header" class="clearfix">
      <span style="font-size: 18px">{{name}}</span>
      <el-button style="float: right; padding: 3px 0" type="text">查看</el-button>
    </div>
    <div>
      <div class="subjectEntry" v-for="entry in entrys" :key="entry.id">{{entry.name}}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "subjectUnknown",
  props: {
    id: Number,
    imageUrl: String,
    name: String,
    intro: String
  },
  data() {
    return {
      entrys: [
        {
          id: 0,
          name: "黄河",
        },
        {
          id: 1,
          name: "长江",
        },
        {
          id: 2,
          name: "爱河",
        },
      ]
    };
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
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.unknown-card {
  width: 370px;
  height: 150px;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
.el-card__header {
  padding: 12px 15px;
}
.subjectEntry{
  float: left;
  margin-left: 5px;
}
</style>