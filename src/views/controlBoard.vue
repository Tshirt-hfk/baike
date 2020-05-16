<template>
  <div class="contorlBoard-layout">
    <div class="cb-main-header">
      <div class="controlBoard-header">
        <a @click="pageSelection(1)">专题管理</a>
        <a @click="pageSelection(2)">词条管理</a>
        <a @click="pageSelection(3)">本体管理</a>
        <a @click="pageSelection(4)">人员管理</a>
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

import subjectManagement from "./controlBoard/subjectManagement"
import entryManagement from "./controlBoard/entryManagement"
import entrySearch from "../components/entrySearch";

export default {
  name: "controlBoard",
  components:{
    subjectManagement,
    entryManagement,
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
        this.$router.push('/controlBoard/subjectManagement')
      else if(page == '2')
        this.$router.push('/controlBoard/entryManagement')
      else if(page == '3')
        this.$router.push('/controlBoard/entityManagement')
      else if(page == '4')
        this.$router.push('/controlBoard/userManagement')
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
    top: 0px;
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
</style>
