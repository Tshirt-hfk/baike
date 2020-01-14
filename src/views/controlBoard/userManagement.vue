<template>
  <div class="em-layout">
    <div class="uc-myentry-title">用户管理</div>
    <el-button type="primary" icon="el-icon-plus" @click="userCreateFlag=true">新建用户</el-button>
    <!-- <userCreate :entryCreateFlag.sync="userCreateFlag"></userCreate> -->
    <el-input style="width: 300px; float: right;margin-bottom: 10px;" v-model="searchValue" placeholder="请输入关键词"></el-input>
    <el-table :data="displayData" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="用户名" width="150">
        <template slot-scope="scope">{{ scope.row.name}}</template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="150">
        <template slot-scope="scope">{{ scope.row.email}}</template>
      </el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="150">
        <template slot-scope="scope">{{ scope.row.userGroup}}</template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="250">
        <template slot-scope="scope">{{ scope.row.role}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="userDelete(scope.row.name)">删除</el-button>
          <el-button size="mini" type="text" @click="audit(scope.row, true)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="passed-page">
      <el-pagination @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pagesize"
        layout="total, prev, pager, next, jumper" :total="tableData.length" 
        style="width: 300px; max-width: 550px;margin: 0 auto"> </el-pagination>
        <!-- <el-pagination @current-change="handleCurrentChange"
        :current-page="1" 
        :page-size="1"
        layout="total, prev, pager, next, jumper" :total="tableData.length" 
        style="width: 300px; max-width: 550px;margin: 0 auto"> </el-pagination> -->
    </div>
  </div>
</template>

<script>

import moment from 'moment'
// import entryCreate from "../../components/userCreate";

export default {
  name: "userManagement",
//   components:{
//     userCreate,

//   },
  watch:{
    searchValue:{
      handler(n, o){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.remoteMethod(n);
        }, 300);
      }
    }
  },
  data() {
    return {
      userCreateFlag: false,
    //   rejectFlag: false,
      searchValue: '',
    //   drawerFlag: false,
    //   relationData: [],
    //   reason:"",
      form: {
        name: "",
        email: "",
        userGroup: "",
        role: ""
      },
      timeout: null,
      currentPage: 1,
      pagesize: 5,
      applications: [],
    //   tableData: [],
      displayData: [],
      tableData: [
          {
            name: "sxc",
            email: "887283y@qq.com",
            userGroup: "外包A",
            role: "普通用户"
          },
          {
            name: "石原里美",
            email: "21092830@qq.com",
            userGroup: "外包A",
            role: "普通用户"
          },
          {
            name: "新垣结衣",
            email: "eq8wueqwu@qq.com",
            userGroup: "外包A",
            role: "普通用户"
          },
          {
            name: "长泽雅美",
            email: "887283y@qq.com",
            userGroup: "外包A",
            role: "普通用户"
          },
          {
            name: "妻夫木聪",
            email: "21092830@qq.com",
            userGroup: "外包A",
            role: "普通用户"
          },
          {
            name: "柏原崇",
            email: "eq8wueqwu@qq.com",
            userGroup: "外包A",
            role: "普通用户"
          }

      ],
    };
  },
  mounted() {
    this.init();
  },
  filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
  },
  methods: {
    init() {
      this.$axios
        // 需要改成user获取接口
        .post("/api/admin/getRecord")
        .then(res => {
          if (res.data.data) {
            this.applications = res.data.data.records;
            this.tableData = res.data.data.records;
            this.displayData = res.data.data.records.slice(0, 5);
          } else {
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
    stateChange(state){
      this.$emit('stateChange', state)
    },
    // 分页功能
    handleCurrentChange(val) {
      this.currentPage = val;
      let indexleft = val - 1;
      let size = this.pagesize;
      this.displayData = this.tableData.slice(indexleft*size, val*size);
    },
    // filter
    remoteMethod(query) {
      if (query !== "") {
        this.tableData = this.applications.filter(entry => {
          return entry.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.displayData = this.tableData.slice(0, this.pagesize);
      } else {
        this.tableData = this.applications;
        this.displayData = this.tableData.slice(0, this.pagesize);
      }
    },
    userDelete(name){
        this.$axios
            // 改成用户删除接口
          .post("/api/user/getTaskContent", {
              taskId: new Number(id),
              source: 1
          })
          .then(res => {
            if (res.data.data) {
              this.form.entryName = res.data.data.entryName;
              this.form.imageUrl = res.data.data.imageUrl;
              this.form.intro = res.data.data.intro;
              this.form.field.splice(0, this.form.field.length);
              for (var field of res.data.data.field) {
                this.form.field.push(field);
              }
              this.form.infoBox.splice(0, this.form.infoBox.length);
              for (var info of res.data.data.infoBox) {
                this.form.infoBox.push(info);
              }
              this.form.content = res.data.data.content;
              this.drawerFlag = true;
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
    audit(row, pass) {
      this.$axios
        //改成用户修改接口
        .post("/api/admin/auditRecord", {
          recordId: row.id,
          reason: this.reason,
          pass: pass
        })
        .then(res => {
          if (res.data) {
            this.init();
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
    handleClose(done) {
      this.drawerFlag = false;
    }
  }
};
</script>

<style scoped>
.em-layout{
    width: 80%;
    height: 100%;
    margin: 0 auto;
}
.uc-myentry-title{
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 34px;
  color: #666;
  margin: 0;
  padding: 25px 0 0 0;
}
.passentry-version{
  text-decoration: underline;
  cursor: pointer;
  color: #1296db;
}
.passed-page{
  width: 100%;
  margin-top: 25px;
}
</style>