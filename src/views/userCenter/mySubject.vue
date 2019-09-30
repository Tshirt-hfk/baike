<template>
    <div class="uc-section-mysubject">
      <div class="uc-section-task-mine">
        <div class="uc-tasmine-title">专题任务</div>
        <div class="uc-tasmine-layout">
          <div class="uc-tasmine-navbtn">
            <el-radio-group class="uc-tasmine-button" v-model="tabSelection" v-on:change="change">
              <el-radio-button label="left">我参加的</el-radio-button>
              <el-radio-button label="right">我创建的</el-radio-button>
            </el-radio-group>
            <div v-if="status == '1'" class="uc-apply-info">
                  <a class="uc-btn-apply" @click="applyFlag = true;checked = false">申请专题制作人权限</a>
                  <p style="font-style:normal;font-size: 10px; margin-top: 13px;">获得众智化系统认证，享受更多权限!</p>
            </div>
          </div>
          <el-card style="width: 1200px;min-height:560px">  <!--高度后期需要自适应 -->
            <router-view ></router-view>
          </el-card>
        </div>
        <el-dialog
          :visible.sync="applyFlag"
          width="1000px"
          center
          :show-close=false
          top = 12vh>
          <div class="apply-title">
            <div class="apply-title-main">制作人申请须知</div>
            <div class="apply-title-notice">欢迎进行专题制作人权限申请，为了您能更好地通过审核，您需要认真阅读以下要求</div>
          </div>
          <div class="apply-body">
            1、专题内容符合社会主义核心价值观，弘扬正能量 <br>
            2、对专题内词条的审核积极正面，不带有个人情感色彩，仅从学术严谨度出发 <br>
            3、禁止利用网站进行非法活动 <br>
            4、 <br>
            5、 <br>
          </div>
          <div class="apply-checkBox">
            <el-checkbox v-model="checked">我已认真阅读并同意以上条款</el-checkbox>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="applyFlag = false">取 消</el-button>
            <el-button id="confirm" type="primary" @click="apply" 
            :disabled="checked == false" :autofocus=true>申 请</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>

export default {
    name: "mySubject",
    data() {
        return{
            status: this.$store.state.status,
            tabSelection: 'left',
            applyFlag: false,
            checked: false,
        };
    },
    mounted(){
      if(this.$router.history.current.name=="joinedSubject")
        this.tabSelection="left"
      else if(this.$router.history.current.name=="createdSubject")
        this.tabSelection="right"
      
    },
    methods:{
        change() {
          if(this.tabSelection=="left")
            this.$router.push("./joinedsubject")
          else if(this.tabSelection=="right")
            this.$router.push("./createdsubject")
        },
        apply(){
          this.applyFlag = false;
          this.$axios
            .post("/api/user/applyAuthority", {
              affair : 1 // 表示申请专题制作人
            })
            .then(res => {
              if (res.data) {
                this.$message({
                  message: res.data.msg
                });
              }
            })
            .catch(error => {
              if (error.response) {
                this.$message({
                  message: error.response.data.msg,
                  type: "warning"
                });
              }
            });
        },
    }
}
</script>

<style>
.uc-tasmine-title{
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 34px;
  color: #666;
  margin: 0;
  padding: 0;
}
.uc-tasmine-layout{
  width: 1200px;
  margin: 0 auto;
}
.uc-tasmine-navbtn{
  height: 60px;
  width: 100%;
  margin-bottom: 30px;
}
.uc-tasmine-button{
  margin-left: 500px;
  margin-top: 10px;
}
.uc-apply-info{
  padding: 15px 20px 0;
  float: right;
}
.uc-btn-apply{
  color: #fff;
  border: solid 1px #f18167;
  border-radius: 6px;
  background: #f18167;
  text-align: center;
  padding: 5px 5px 4px;
  font-size: 15px;
  text-decoration: none;
  margin-left: 25px; 
}
.uc-btn-apply:hover{
  cursor: pointer;
  opacity: 0.8;
}
.uc-section-task-mine{
  padding: 20px 0 50px;
}
.apply-title{
  margin-top: -20px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.apply-title-main{
  font-size: 25px;
  color: #333;
}
.apply-title-notice{
  margin-top: 10px;
  padding-bottom: 10px;
  color: #a9a9a9;
}
.apply-body{
  font-size: 16px;
  line-height: 30px;
  margin: 25px 25px 25px 50px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}
.apply-checkBox{
  text-align: center;
}
</style>