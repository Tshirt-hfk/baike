<template>
  <div>
    <el-input style="width: 300px; float: right;margin-bottom: 10px;" v-model="searchValue" placeholder="请输入关键词"></el-input>
    <el-table :data="displayData" style="width: 100%">
      <el-table-column prop="name" label="词条名称" width="200"> </el-table-column>
      <el-table-column prop="reason" label="未通过原因" width="250"> </el-table-column>
      <el-table-column label="提交时间" width="180">
        <template slot-scope="scope">{{ scope.row.saveTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="未通过时间" width="180">
        <template slot-scope="scope">{{ scope.row.judgeTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getTaskContent(scope.row.id)">预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fail-page">
      <el-pagination @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pagesize"
        layout="total, prev, pager, next, jumper" :total="tableData.length" 
        style="width: 540px;margin: 0 auto"> </el-pagination>
    </div>
    <entryReview
      :relationData="relationData"
      :form="form"
      :drawerFlag="drawerFlag"
      v-on:handleClose="handleClose"
    ></entryReview>
  </div>
</template>

<script>

import moment from 'moment'
import entryReview from "../../../../components/entryReview"

export default {
  name: "failPassEntry",
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
      searchValue: '',
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
        .post("/api/user/getEntry", {
          type: 6
        })
        .then(res => {
          if (res.data.data) {
            this.entries = res.data.data.assignments;
            this.tableData = res.data.data.assignments;
            this.displayData = res.data.data.assignments.slice(0, 5);
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
    getTaskContent(id){
        this.$axios
          .post("/api/user/getTaskContent", {
              taskId: new Number(id)
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
.fail-page{
  width: 100%;
  margin-top: 25px;
}
</style>