<template>
  <header class="header" id="header">
    <div class="header-middle">
      <div class="header-l">
        <div @click="toIndex" class="header-l-title1">众智化词条系统</div>
        <div class="header-l-title2">国家重点研发计划-专业内容知识服务众智平台与应用示范子课题项目</div>
      </div>
      <div class="header-r">
        <template v-if="status==='0'">
          <!-- 未登陆 -->
          <el-link @click="toLogin" style="float:left; margin-top:8px">登录</el-link>
          <div class="header-login-line"> </div>
          <el-link @click="toRegister" style="float:left;margin-left:7px;margin-top:8px">注册</el-link>
        </template>
        <template v-else-if="status==='1'">
          <!-- 普通用户 -->
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
                <div class="header-icon">
                    <img src="https://static.hdslb.com/images/member/noface.gif" class="header-face-user">
                </div>
                  {{userName}} 
                <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">我的专题</el-dropdown-item>
                <el-dropdown-item command="2">我的词条</el-dropdown-item>
                <el-dropdown-item command="3">我的任务</el-dropdown-item>
                <el-dropdown-item command="4" divided>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link @click="loginOut" style="margin-left:10px; margin-bottom: 2px; margin-right:12px"
            :underline="false">消息</el-link>
          <el-dropdown @command="handleCommand">
            <div style="margin-top: 8px" class="el-dropdown-link">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="5">账号设置</el-dropdown-item>
                <el-dropdown-item command="6">资料设置</el-dropdown-item>
                <el-dropdown-item command="7">消息设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template v-else-if="status==='2'">
          <!-- 专题制作人 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <div class="header-icon">
                <img src="https://static.hdslb.com/images/member/noface.gif" class="header-face">
              </div>  
                {{userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">我的专题</el-dropdown-item>
                <el-dropdown-item command="2">我的词条</el-dropdown-item>
                <el-dropdown-item command="3">我的任务</el-dropdown-item>
                <el-dropdown-item command="4" divided>登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link @click="loginOut" style="margin-left:10px; margin-bottom:3px; margin-right:12px">消息</el-link>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="5">账号设置</el-dropdown-item>
                <el-dropdown-item command="6">资料设置</el-dropdown-item>
                <el-dropdown-item command="7">消息设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link @click="toSubject" class="header-createsubject">创建专题</el-link>
        </template>
        <template v-else-if="status==='3'">
          <!-- 管理员 -->
          <div style="margin-top: 2px">
          <el-button size="mini" @click="entryAudit">管理审核</el-button>
          <el-button size="mini" @click="loginOut">登出</el-button>
          </div>
        </template>
      </div>
    </div>
    <div class="header-line"></div>
  </header>
</template>


<script>

export default {
  name: "myHeader",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"]
    };
  },
  mounted() {
    this.identifyAuth();
  },
  computed: {
    status() {
      return this.$store.state.status;
    },
    userName() {
      return this.$store.state.name;
    }
  },
  methods: {
    identifyAuth: function() {
      this.$axios
        .get("/api/user/islogin")
        .then(res => {
          if (res.data.data) {
            this.$store.commit("status", res.data.data.status);
            this.$store.commit("name", res.data.data.name);
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
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
    entryAudit(){
      this.$router.push("/adminAudit/entryAudit");
    },
    toIndex() {
      this.$router.push("/");
    },
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    loginOut() {
      this.$store.commit("status", "0");
      localStorage.clear();
      this.$message({
        message: "success!"
      });
      this.$router.push("/");
    },
    toSubject() {
      if(this.status == '1'){
        this.$alert('您还没有专题创建权限', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
      }else
        this.$router.push("/subjectcreate");
    },
    search() {
      //TODO
    },
    handleCommand(command){
        if(command == '1')
            this.$router.push("/usercenter/mysubject/joinedsubject");
        else if(command == '2')
            this.$router.push("/usercenter/myentry");
        else if(command == '3')
            this.$router.push("/usercenter/mytask");
        else if(command == '4')
            this.loginOut();
    }
  }
};
</script>

<style scoped>
.el-button{
  margin: 0 auto;
}
.header {
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  width: 100%;
}
.header-middle {
  margin: 0 auto;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  height: 50px;
}
.header-l{
  float: left;
  height: 50px;
}
.header-l-title1{
  color: #409eff;
  font-weight: 300;
  font-size: 21px;
  margin-top: 4px;
  cursor: pointer
}
.header-l-title2{
  color: #8a8a8a;
  font-size: 10px;
}
.header-m{
  width: 900px;
  height: 35px;
  margin-right:250px;
  margin-top: 6px;
}
.header-link{
  color: #707070;
  font-size: 14px;
  margin-left: 10px;
}
.header-r {
  float: right;
  font-size: 18px;
  margin-top: 7px;
}
.header-line{
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.header-login-line{
  float:left;
  border-right: 1px solid #707070;
  height: 20px;
  margin-left: 7px;
  margin-top: 8px;
}
.header-icon{
  float: left;
  width: 30px;
  height: 30px;
  left: 0;
  top: 0;
  margin-top: -5px;
  margin-right: 7px;
}
.header-face-user{
  border: 1px solid #8bbb0f;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-top: -1px;
}
.header-face{
  border: 1px solid #8bbb0f;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.el-dropdown :hover{
  color: #409EFF;
}
.el-dropdown-link{
  cursor: pointer;
}
.el-icon-arrow-down{
  font-size: 12px;
}
.header-createsubject{
    width: 80px;
    height: 35px;
    background-color: #409EFF;
    line-height: 42px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 6px;
    margin-left: 10px;
}
.header-createsubject:hover{
  color: #fff;
  opacity: 0.85;
}
</style>

