<template>
  <el-dialog :visible.sync="entryCreateFlag" width="1000px" center :show-close="false" top="12vh">
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="注意"></el-step>
      <el-step title="创建"></el-step>
    </el-steps>
    <div id="step1" style="display:inline">
      <div class="entryCreate-title">
        <div class="entryCreate-title-main">词条创建须知</div>
        <div class="entryCreate-title-notice">欢迎创建词条，为了您能更好地通过审核，您需要认真阅读以下要求</div>
      </div>
      <div class="entryCreate-body">
        1、词条内容符合社会主义核心价值观，弘扬正能量
        <br />2、词条内容的积极正面，不涉及违法犯罪活动
        <br />3、禁止编写虚假，恶搞的信息
        <br />4、
        <br />5、
        <br />
      </div>
      <div class="entryCreate-checkBox">
        <el-checkbox v-model="checked">我已认真阅读并同意以上条款</el-checkbox>
      </div>
    </div>
    <div id="step2" style="display:none">
      <div class="entryCreate-entryName">
        <span style="margin-right: 20px">词条名:</span>
        <el-autocomplete
          v-model="form.name"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入词条名称"
          @select="handleEntrySelect"
        ></el-autocomplete>
      </div>
      <div class="entryCreate-entryCate">
        <span style="margin-right: 15px">词条类别:</span>
        <entryCategorySelector v-bind:category.sync="form.category" placeholder="请选择词条分类"></entryCategorySelector>
      </div>
      <el-alert
        title="为了提高您的创建成功率，还需注意"
        type="warning"
        show-icon
        :closable="false"
        center
        style="width: 500px; margin-left: 210px"
      ></el-alert>
      <div class="entryCreate-notice">
        1、信息栏属性应基于描述词条最重要的部分
        <br />2、内容描述应详尽充分且符实
        <br />3、参考资料要权威来证明内容的真实性
        <br />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="initEntryCreate" :disabled="stepActive == 0">上一步</el-button>
      <el-button
        id="next"
        type="primary"
        @click="next"
        :disabled="checked == false"
        :autofocus="true"
      >下一步</el-button>
      <el-button id="confirm" type="primary" @click="next" :autofocus="true">创建</el-button>
      <el-button @click="entryCreateFlag = false">退出</el-button>
    </span>
  </el-dialog>
</template>

<script>
import entryCategorySelector from "./entryCategorySelector";

export default {
  name: "entryCreate",
  components: {
    entryCategorySelector
  },
  data() {
    return {
      stepActive: 0,
      entryCreateFlag: false,
      form: {
        name: "",
        category: ""
      }
    };
  },
  methods: {
    initEntryCreate() {
      if (this.status == "0") this.$router.push("/login");
      else {
        this.entryCreateFlag = true;
        this.stepActive = 0;
        this.checked = false;
        document.getElementById("next").style.display = "inline";
        document.getElementById("confirm").style.display = "none";
        document.getElementById("step1").style.display = "inline";
        document.getElementById("step2").style.display = "none";
      }
    },
    next() {
      if (this.stepActive == 0) {
        document.getElementById("next").style.display = "none";
        document.getElementById("confirm").style.display = "inline";
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "inline";
      } else if (this.stepActive == 1) {
        this.entryField.push(this.form.category);
        this.$axios
          .post("/api/user/createEntry", {
            entryName: this.form.name,
            field: this.entryField
          })
          .then(res => {
            if (res.data.data) {
              this.$router.push({
                path: "/entryedit",
                query: { id: res.data.data.id, source: 1 }
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
      }
      this.stepActive++;
    }
  }
};
</script>

<style scoped>
.entryCreate-title{
  margin-top: 20px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.entryCreate-title-main{
  font-size: 25px;
  color: #333;
}
.entryCreate-title-notice{
  margin-top: 10px;
  padding-bottom: 10px;
  color: #a9a9a9;
}
.entryCreate-body{
  font-size: 16px;
  line-height: 30px;
  margin: 25px 25px 25px 50px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}
.entryCreate-checkBox{
  text-align: center;
}
.entryCreate-entryName{
  margin-top: 25px;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  font-size: 18px;
}
.entryCreate-entryCate{
  margin-top: 30px;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  font-size: 18px;
}
.entryCreate-notice{
  display: block;
  margin-left: 340px;
  margin-top: 10px;
  color: #333;
  line-height: 2;
  font-size: 15px;
}
</style>