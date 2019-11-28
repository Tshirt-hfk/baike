<template>
  <div>
    <el-input
      style="width: 300px; float: right;margin-bottom: 10px;"
      v-model="searchValue"
      placeholder="请输入关键词"
    ></el-input>
    <el-table
      ref="multipleTable"
      :data="displayData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="getId"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="词条名称" width="100"></el-table-column>
      <el-table-column prop="field" label="领域" width="200"></el-table-column>
      <el-table-column label="保存时间" width="160">
        <template slot-scope="scope">{{ scope.row.saveTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="结束时间" width="160">
        <template slot-scope="scope">{{ scope.row.endTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="版本" show-overflow-tooltip width="50">
        <template>
          <span class="admitentry-version">
            <a @click="toEntryExhibition">版本</a>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="jumpToEdit(scope.row.source)">编辑</el-button>
          <el-button size="mini" type="primary" @click="getTaskContent(scope.row.id, scope.row.source)">预览</el-button>
          <el-button size="mini" type="success" @click="getReason(scope.$index)">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="toadmit-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="tableData.length"
        style="width: 540px;margin: 0 auto"
      ></el-pagination>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="deleteFlag = true">放弃</el-button>
    </div>
    <el-dialog title="修改原因" :visible.sync="admitFlag" width="600px" top="20vh">
      <span>
        <el-button
          v-for="item in modifyReason"
          :key="item"
          size="mini"
          @click="reason=item"
          plain
        >{{item}}</el-button>
        <div style="margin: 15px 0;"></div>
        <el-input type="textarea" v-model="reason" maxlength="30" show-word-limit></el-input>
        <div style="margin: 10px 0;"></div>
        <el-alert title="请在提交前确认" type="warning" description="提交后无法更改" show-icon :closable="false"></el-alert>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="admitFlag = false">返 回</el-button>
        <el-button type="primary" @click="admitEntry">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="deleteFlag" width="30%">
      <span>放弃选中词条？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteFlag = false">取 消</el-button>
        <el-button type="primary" @click="deleteEntry">确 定</el-button>
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
import moment from "moment";
import entryReview from "../../../../components/entryReview";

export default {
  name: "toBeAdmittedEntry",
  components: {
    entryReview
  },
  watch: {
    searchValue: {
      handler(n, o) {
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
      searchValue: "",
      timeout: null,
      currentPage: 1,
      pagesize: 5,
      entries: [],
      tableData: [],
      displayData: [],
      multipleSelection: [],
      disabledFlag: true,
      admitFlag: false,
      deleteFlag: false,
      entryId: 0,
      modifyReason: [],
      reason: "",
      tag: 0,
    };
  },
  mounted() {
    this.init();
  },
  filters: {
    formatDate: function(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    init() {
      this.$axios
        .post("/api/user/getEntry", {
          type: 3
        })
        .then(res => {
          if (res.data.data) {
            this.entries = res.data.data.assignments;
            this.tableData = res.data.data.assignments;
            this.displayData = res.data.data.assignments.slice(0, 5);
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
    getId(row) {          //有必要么？
      this.entryId = row.id;
    },
    jumpToEdit(source) {
      this.$router.push({ path: "/entryedit", query: { id: this.entryId , source: source} });
    },
    getReason(index) {
      this.modifyReason = this.displayData[index].modifyReason;
      if(this.displayData[index].source==2)
        this.isTask = true;
      else
        this.isTask = false;
      this.tag = index;
      this.admitFlag = true;
    },
    admitEntry() {
      var array = new Array();
      array.push(this.tableData[this.tag].id);
      this.$axios
        .post("/api/user/admitEntry", {
          entryIds: array,
          reason: this.reason,
          isTask: this.isTask
        })
        .then(res => {
          if (res.data) {
            this.admitFlag = false;
            this.init();
            this.stateChange(4);
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
    deleteEntry() {
      var array = new Array();
      var isTaskArray = new Array();
      for (var i = 0; i < this.multipleSelection.length; i++) {
        array.push(this.multipleSelection[i].id);
        isTaskArray.push(this.multipleSelection[i].isTask);
      }
      this.$axios
        .post("/api/user/giveUpTask", {
          entryIds: array,
          isTaskArray: isTaskArray
        })
        .then(res => {
          if (res.data) {
            this.deleteFlag = false;
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
    toEntryExhibition() {
      //TODO
    },
    stateChange(state) {
      this.$emit("stateChange", state);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      let indexleft = val - 1;
      let size = this.pagesize;
      this.displayData = this.tableData.slice(indexleft * size, val * size);
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
    getTaskContent(id, source) {
        this.$axios
          .post("/api/user/getTaskContent", {
            taskId: new Number(id),
            source: source
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.admitentry-version {
  text-decoration: underline;
  cursor: pointer;
  color: #1296db;
}
.toadmit-page {
  width: 100%;
  margin-top: 25px;
}
</style>