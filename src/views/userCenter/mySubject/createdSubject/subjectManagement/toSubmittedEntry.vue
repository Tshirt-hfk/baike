<template>
  <div>
    <el-input style="width: 300px; float: right;" v-model="searchValue" placeholder="请输入关键词"></el-input>
    <el-table
      ref="multipleTable"
      :data="displayData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column label="名称" width="150">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="领域" width="250">
        <template slot-scope="scope">
          <span v-for="item in scope.row.field" :key="item">{{item}},</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="getAssignmentContent(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="submit-page">
      <el-pagination @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pagesize"
        layout="total, prev, pager, next, jumper" :total="tableData.length" 
        style="width: 540px;margin: 0 auto"> </el-pagination>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="toSubmitDatabase">提交</el-button>
      <el-button @click="publishFlag = true">重新发布</el-button>
    </div>
    <el-dialog title="发布原因" :visible.sync="publishFlag" width="800px" top="30vh" center>
      <div style="width: 100%; text-align: center">
        <el-tag
          style="font-size: 16px"
          :key="tag"
          v-for="tag in dynamicReasons"
          closable
          :disable-transitions="false"
          @close="handleTagClose(tag)">
          {{tag}}</el-tag>
        <el-cascader
          class="select-new-tag"
          v-if="selectVisible"
          placeholder="请选择原因"
          ref="saveTagSelect"
          :options="reasonOptions"
          v-model="selectValue"
          :props="{ multiple: true, checkStrictly: true, emitPath: false }"
          :show-all-levels="false"
          filterable
          clearable
          @change="addReason"
        ></el-cascader>
        <el-button v-else class="button-new-tag" size="small" @click="showSelect">添加原因</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="publishFlag = false">返 回</el-button>
        <el-button type="primary" @click="publishEntry">提 交</el-button>
      </span>
    </el-dialog>
    <entryReview
      :relationData="relationData"
      :form="form"
      :drawerFlag="drawerFlag"
      v-on:handleClose="handleClose"
    ></entryReview>
  </div>
</template>


<script>

import entryReview from "../../../../../components/entryReview"

export default {
  name: "toSubmittedEntry",
  props: ["subjectId"],
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
      multipleSelection: [],
      publishFlag: false,
      dynamicReasons: [],
      selectValue: '',
      selectVisible: false,
      reasonOptions: [
          {
            value: "词条新建",
            label: "词条新建",
          },
          {
            value: "目录",
            label: "目录",
            children: [
              {
                value: "目录缺失",
                label: "目录缺失",
              },
              {
                value: "目录结构不合理",
                label: "目录结构不合理",
              }
            ]
          },
          {
            value: "基本信息栏",
            label: "基本信息栏",
            children: [
              {
                value: "基本信息缺失",
                label: "基本信息缺失",
              },
              {
                value: "基本信息不合理",
                label: "基本信息不合理",
              }
            ]
          },
          {
            value: "概述",
            label: "概述",
            children: [
              {
                value: "概述图缺失",
                label: "概述图缺失",
              },
              {
                value: "概述图不清晰",
                label: "概述图不清晰",
              },
              {
                value: "概述缺失",
                label: "概述缺失",
              },
              {
                value: "概述过短",
                label: "概述过短",
              }
            ]
          },
          {
            value: "正文",
            label: "正文",
            children: [
              {
                value: "正文缺少图片",
                label: "正文缺少图片",
              },
              {
                value: "存在重复内容",
                label: "存在重复内容",
              },
              {
                value: "描述不准确",
                label: "描述不准确",
              }
            ]
          },
          {
            value: "参考资料",
            label: "参考资料",
            children: [
              {
                value: "参考资料缺失",
                label: "参考资料缺失",
              },
              {
                value: "参考资料错误",
                label: "参考资料错误",
              }
            ]
          },
      ],
      inputValue: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .post("/api/subjectMaker/getAssignment", {
          subjectId: new Number(this.subjectId),
          type: 5
        })
        .then(res => {
          if (res.data.data) {
            this.entries = res.data.data.assignments;
            this.tableData = res.data.data.assignments;
            this.displayData = res.data.data.assignments.slice(0, 5);
          } else {
            //this.$message({
            //  message: res.data.msg
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    toSubmitDatabase(){
      var array = new Array();
      for (var i = 0; i < this.multipleSelection.length; i++) {
        array.push(this.multipleSelection[i].id);
      }
      this.$axios
        .post("/api/subjectMaker/submitEntry", {
          entryIds: array,
          subjectId: new Number(this.subjectId),
        })
        .then(res => {
          if (res.data) {
            this.init();
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
    publishEntry() {
      var array = new Array();
      for (var i = 0; i < this.multipleSelection.length; i++) {
        array.push(this.multipleSelection[i].id);
      }
      this.$axios
        .post("/api/subjectMaker/publishAssignment", {
          entryIds: array,
          subjectId: new Number(this.subjectId),
          reason: this.dynamicReasons,
        })
        .then(res => {
          if (res.data) {
            this.init();
            this.stateChange(2);
            this.publishFlag = false;
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
    handleTagClose(tag) {
      this.dynamicReasons.splice(this.dynamicReasons.indexOf(tag), 1);
    },
    getAssignmentContent(id){
        this.$axios
          .post("/api/subjectMaker/getAssignmentContent", {
              assignmentId: new Number(id)
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
    },
    showSelect() {
      this.selectVisible = true;
    },
    addReason(){
      let selectValue = this.selectValue;
      if (selectValue) {
        this.dynamicReasons.push(selectValue[0]);
      }
      this.selectVisible = false;
      this.selectValue = '';
    },
  }
};
</script>

<style>
.submit-page{
  width: 100%;
  margin-top: 25px;
}
</style>