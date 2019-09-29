<template>
  <div>
    <el-input style="width: 300px; float: right;margin-bottom: 10px;" v-model="searchValue" placeholder="请输入关键词"></el-input>
    <el-table :data="displayData" style="width: 100%">
      <el-table-column prop="name" label="申请人ID" width="250"> </el-table-column>
      <el-table-column prop="field" label="词条优质版本" width="250"> </el-table-column>
      <el-table-column label="词条通过率" width="250">
        <template slot-scope="scope">{{ scope.row.saveTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="audit(scope.row, true)">通 过</el-button>
          <el-button type="danger" @click="rejectFlag = true">拒绝</el-button>
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
          <entryReview
            :relationData="relationData"
            :form="form"
            :drawerFlag="drawerFlag"
            v-on:handleClose="handleClose"
          ></entryReview>
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
import entryReview from "../../../components/entryReview"

export default {
  name: "subjectMakerAudit",
  components:{
    entryReview,
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
      searchValue: '',
      drawerFlag: false,
      relationData: [],
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
      entries: [],
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
        .post("/api/admin/getApplication", { 
          affair : 1  // 表示专题制作人权限申请
        })
        .then(res => {
          if (res.data.data) {
            this.entries = res.data.data.applications;
            this.tableData = res.data.data.applications;
            this.displayData = res.data.data.applications.slice(0, 5);
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
    handleCurrentChange(val) {
      this.currentPage = val;
      let indexleft = val - 1;
      let size = this.pagesize;
      this.displayData = this.tableData.slice(indexleft*size, val*size);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.tableData = this.entries.filter(entry => {
          return entry.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.displayData = this.tableData.slice(0, this.pagesize);
      } else {
        this.tableData = this.entries;
        this.displayData = this.tableData.slice(0, this.pagesize);
      }
    },
    audit(row, pass) {
      this.$axios
        .post("/api/admin/auditApplication", {
          applicationId: row.id,
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

<style>
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