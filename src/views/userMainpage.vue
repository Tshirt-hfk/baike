<template>
  <div class="contorlBoard-layout">
    <div class="preview-searchBar">
        <div class="preview-search">
        <entrySearch style="width: 440px" :value.sync="value" placeholder="请输入词条名称"></entrySearch>
        <el-button type="primary" @click="search" style="margin-left: 10px">搜索词条</el-button>
        </div>
    </div>
    <div class="cb-main-header">
      <div class="controlBoard-header">
        <a @click="pageSelection(1)">我的动态</a>
        <a @click="pageSelection(2)">我的词条</a>
        <a @click="pageSelection(3)">草稿箱</a>
        <a @click="pageSelection(4)">我的专题</a>
        <a @click="pageSelection(5)">我的标签</a>
        <a @click="pageSelection(6)">我的收藏</a>
        <a @click="pageSelection(7)">我的消息</a>
      </div>
      <div class="cb-body-wrapper">
        <router-view/>
      </div>
    </div>
    <!-- <div class="cb-body-wrapper">
      <router-view/>
    </div> -->
  </div>
</template>


<script>

import myActivity from "./userMainpage/myActivity"
import myEntity from "./userMainpage/myEntity"
import mySubject from "./userMainpage/mySubject"
import entrySearch from "../components/entrySearch";

export default {
  name: "userMainpage",
  components:{
    myActivity,
    myEntity,
    mySubject,
    entrySearch
  },
  data() {
    return {
      status: this.$store.state.status,
      userName: this.$store.state.name,
    };
  },
  methods: {
    pageSelection(page){
      if(page == '1')
        this.$router.push('/userMainpage/myActivity')
      else if(page == '2')
        this.$router.push('/userMainpage/myEntity')
      else if(page == '3')
        this.$router.push('/userMainpage/draftBox')
      else if(page == '4')
        this.$router.push('/userMainpage/mySubject')
      else if(page == '5')
        this.$routerl.push('/userMainpage/myLabel')
      else if(page == '6')
        this.$router.push('/userMainpage/myFavorite')
      else if(page == '7')
        this.$router.push('/userMainpage/myMessage')
    }
  }
};
</script>

<style scoped>
dd,dl,dt,ul,li{
  margin: 0;
  padding: 0;
}
.contorlBoard-layout {
  width: 100%;
  margin: 0 auto;
  margin-top: 2px;
  position: absolute;
  top: 35px;
  left: 0;
  bottom: 0;
}
.cb-main-header{
    width: 100%;
    position: absolute;
    top: 140px;
    left: 0px;
    bottom: 0px;
}
.controlBoard-header {
    width: 200px;
    height: 100%;
    background: #52a3f5;
    border-bottom: solid 1px #4C96E2;
    border-radius: 5px;
    float: left;
}
.controlBoard-header a{
  display: block;
  float: left;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #f2f9ff;
  font-size: 21px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  padding: 15px 0
}
.controlBoard-header a:hover{
  background:rgba(255, 255, 255,0.1)
}
.cb-body-wrapper{
    border-top: 1px solid #4C96E2;
    position: absolute;
    top: 0px;
    left: 200px;
    right: 0px;
    bottom: 0px;
}
.preview-searchBar {
  height: 105px;
  font-family: arial;
}
.preview-search {
    width: 600px;
    margin: 0 auto;
    padding-top: 30px;
}
</style>