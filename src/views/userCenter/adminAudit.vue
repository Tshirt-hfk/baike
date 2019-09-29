<template>
    <div class="adminaudit-layout">
        <div class="uc-adminaudit-title">管理审核</div>
        <div class="uc-adminaudit-layout">
          <div class="uc-adminaudit-navbtn">
            <el-radio-group class="uc-adminaudit-button" v-model="tabSelection" v-on:change="change">
              <el-radio-button label="left">词条审核</el-radio-button>
              <el-radio-button label="right">制作人审核</el-radio-button>
            </el-radio-group>
          </div>
          <el-card style="width: 1200px;min-height:560px">  <!--高度后期需要自适应 -->
            <router-view/>
          </el-card>
        </div>
    </div>
</template>

<script>

export default {
    name: "adminAudit",
    data() {
        return{
            tabSelection: 'left',
        };
    },
    mounted(){
      if(this.$router.history.current.name=="entryAudit")
        this.tabSelection="left"
      else if(this.$router.history.current.name=="subjectMakerAudit")
        this.tabSelection="right"
    },
    methods:{
        change() {
          if(this.tabSelection=="left")
            this.$router.push("./entryAudit")
          else if(this.tabSelection=="right")
            this.$router.push("./subjectMakerAudit")
        },
    }
}
</script>

<style>
.adminaudit-layout{
  width: 100%;
  margin: 0 auto;
  margin-top: 2px;
  min-height:800px;
  padding: 20px 0 50px;
}
.uc-adminaudit-title{
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 34px;
  color: #666;
  margin: 0;
  padding: 0;
}
.uc-adminaudit-layout{
  width: 1200px;
  margin: 0 auto;
}
.uc-adminaudit-navbtn{
  height: 60px;
  width: 100%;
  margin-bottom: 30px;
}
.uc-adminaudit-button{
  margin-left: 500px;
  margin-top: 10px;
}
</style>