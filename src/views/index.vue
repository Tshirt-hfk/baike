<template>
  <div class="index-layout">
    <entrySearchBar v-on:search="search"></entrySearchBar>
    <div class="index-navbar">
      <div class="index-navbar-menu">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#459df5"
          text-color="#fff"
          active-text-color="#fff"
          style="float: left;"
        >
          <el-menu-item
            index="/"
            style="width: 150px; text-align: center;font-size: large;letter-spacing:12px;text-indent:10px"
            @click="toIndex"
          >首页</el-menu-item>
          <el-submenu index="2" style="width : 150px; text-align: center;font-size: large;">
            <template slot="title">
              <span style="font-size: large;letter-spacing:12px;text-indent:20px">分 类</span>
            </template>
            <el-menu-item
              v-for="category in categories"
              :key="category"
              :index="category"
              style="padding-left: 20px"
              @click="toCategory(category)"
            >{{category}}</el-menu-item>
          </el-submenu>
          <el-menu-item
            index="3"
            style="width: 150px; text-align: center;font-size: large;letter-spacing:12px;text-indent:10px"
            @click="toSubjects"
          >专 题</el-menu-item>
        </el-menu>
        <div class="index-navbar-usercenter">
          <div class="line"></div>
          <a class="index-navbar-usercenter-link" @click="toUserCenter">
            <i class="el-icon-user-solid"></i>
            个 人 中 心
          </a>
        </div>
      </div>
    </div>
    <div class="index-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import entrySearchBar from "../components/entrySearchBar";

export default {
  name: "index",
  components: {
    entrySearchBar
  },
  data() {
    return {
      status: this.$store.state.status,
      categories: [
        "艺术",
        "科学",
        "自然",
        "文化",
        "地理",
        "社会",
        "生活",
        "人物",
        "经济",
        "体育",
        "历史"
      ]
    };
  },
  methods: {
    search(value) {
      var { href } = this.$router.resolve({
        name: "entryPreview",
        params: {
          name: value
        }
      });
      window.open(href, "_blank");
      this.value = "";
    },
    toUserCenter() {
      if (this.status == "0") this.$router.push("/login");
      else if (this.status == "3") this.$router.push("/adminAudit");
      else this.$router.push("/usercenter/mysubject");
    },
    toSubjects() {
      this.$router.push("/subjects");
    },
    toCategory(value) {
      this.$router.push({
        name: "category",
        params: {
          name: value
        }
      });
    },
    toIndex(){
      this.$router.push('/index');
    }
  }
};
</script>

<style scoped>
h2,
p,
h3 {
  margin: 0;
  padding: 0;
}
.index-layout {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.index-searchbar {
  width: 700px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  font-family: arial;
}
.logo-headl {
  padding: 25px 0 35px;
  float: left;
  line-height: 1;
}
.index-search {
  float: left;
  padding: 37px 0;
  margin-left: 10px;
}
.index-navbar {
  position: relative;
  background-color: #459df5;
  width: 100%;
  height: 61px;
  margin-top: 18px;
}
.index-navbar-menu {
  margin: 0 auto;
  width: 1050px;
  height: 61px;
}
.line {
  border-right: 1px solid #ddd;
  height: 50px;
  float: left;
  margin-top: 6px;
}
.index-navbar-usercenter {
  height: 61px;
  float: right;
}
.index-navbar-usercenter-link {
  font-size: large;
  color: #f5f5f5;
  text-decoration: none;
  cursor: pointer;
  width: 200px;
  float: left;
  margin-top: 17px;
  margin-left: 35px;
}
.index-focus-intro {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 710px;
  height: 100px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
.index-focus-summary {
  bottom: 5px;
  left: 0;
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
}
.index-focus-summary h2 {
  font-size: 24px;
  line-height: 40px;
  color: #fff;
  font-weight: 400;
}
.index-focus-summary a {
  cursor: pointer;
  text-decoration: none;
}
.index-focus-summary a:hover {
  text-decoration: underline;
}
.index-focus-summary p {
  font-size: 14px;
  font-weight: 400;
  height: 50px;
  overflow: hidden;
  line-height: 22px;
  color: #ddd;
}
.index-side-wrap {
  width: 320px;
  float: right;
}
.index-side-rightbox {
  background-color: #fafafa;
  padding: 10px 20px;
}
.index-side-rightbox-title {
  position: relative;
  margin-top: 15px;
  text-align: center;
  font-weight: 400;
}
.index-side-rightbox-title .name {
  margin-bottom: 10px;
  line-height: 1.2;
  font-size: 30px;
  color: #459df5;
}
.index-side-rightbox-title .slogan {
  margin-bottom: 25px;
  line-height: 1;
  font-size: 18px;
  color: #459df5;
}
.index-side-rightbox-title .number {
  margin-bottom: 20px;
  line-height: 1;
  font-size: 18px;
  color: #459df5;
}
.index-side-rightbox a {
  position: relative;
  display: block;
  margin: 10px auto 0;
  width: 204px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 3px;
  background: #409eff;
  cursor: pointer;
}
.index-side-rightbox a:hover {
  opacity: 0.9;
}
.index-side-recom {
  background-color: #fafafa;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 10px 20px;
}
.classification-content {
  margin-top: 20px;
}
.index-main {
  width: 1200px;
  margin: 0 auto;
}
</style>
