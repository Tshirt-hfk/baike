<template>
  <div class="contorlBoard-layout">
    <div>
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
  width: 80%;
  margin: 0 auto;
  margin-top: 2px;
  position: absolute;
  top: 35px;
  left: 320px;
}
.controlBoard-header {
    width: 170px;
    opacity: 0.8;
    background: #666;
    border-bottom: solid 1px #409eff;
    border-radius: 5px;
    margin-top: 80px;
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
  background:rgba(255, 255, 255,0.1);
  color: #409eff;
}
.cb-body-wrapper{
  width: 1100px;
  position: absolute;
  top: 0px;
  left: 180px;
  right: 0px;
  bottom: 0px;
}
</style>
