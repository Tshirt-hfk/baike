<template>
  <div class="em-layout">
    <div class="uc-myentry-title">专题管理</div>
    <el-button type="primary" icon="el-icon-plus" @click="toSubject">新建专题</el-button>
    <el-input style="width: 300px; float: right;margin-bottom: 10px;" v-model="searchValue" placeholder="请输入关键词"></el-input>
    <el-table :data="displayData" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="专题大类" width="150">
        <template slot-scope="scope">{{ scope.row.name}}</template>
      </el-table-column>
      <el-table-column prop="field" label="专题名" width="150">
        <template slot-scope="scope">{{ scope.row.field}}</template>
      </el-table-column>
      <el-table-column label="总词条数" width="150">
        <template slot-scope="scope">{{ scope.row.saveTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getTaskContent(scope.row.id)">查看</el-button>
          <el-button type="primary" @click="audit(scope.row, true)">通 过</el-button>
          <el-button type="danger" @click="reason='';rejectFlag = true">拒绝</el-button>
          <el-dialog title="未通过原因" :visible.sync="rejectFlag" width="600px">
            <span>
              <div style="margin: 15px 0;"></div>
              <el-input type="textarea" v-model="reason" maxlength="30" show-word-limit></el-input>
              <div style="margin: 10px 0;"></div>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="rejectFlag = false">返 回</el-button>
              <el-button type="danger" @click="audit(scope.row, false);rejectFlag=false">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="passed-page">
      <el-pagination @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pagesize"
        layout="total, prev, pager, next, jumper" :total="tableData.length" 
        style="width: 300px; max-width: 550px;margin: 0 auto"> </el-pagination>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: "subjectManagement",
  components:{
    
  },
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
      rejectFlag: false,
      searchValue: '',
      drawerFlag: false,
      relationData: [],
      reason:"",
      form: {
        entryName: "",
        field: [],
        imageUrl: "",
        intro: "",
        infoBox: [],
        content: "",
        reference: []
      },
      timeout: null,
      currentPage: 1,
      pagesize: 5,
      applications: [],
      tableData: [],
      displayData: [],
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
        .post("/api/admin/getRecord")
        .then(res => {
          if (res.data.data) {
            this.applications = res.data.data.records;
            this.tableData = res.data.data.records;
            this.displayData = res.data.data.records.slice(0, 5);
          } else {
            //this.$message({
              //message: res.data.msg
            //});
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
    getTaskContent(id){
        this.$axios
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
    audit(row, pass) {
      this.$axios
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
  margin: 0 0 40px 0;
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