<template>
    <div class="uc-section-myentry">
        <div class="uc-myentry-title">我的版本</div>
        <div class="uc-myentry-layout">
          <el-radio-group class="uc-myentry-button" v-model="tabSelection" style="margin-bottom: 30px;">
            <el-radio-button label="1">待提交词条</el-radio-button>
            <el-radio-button label="2">待审核词条</el-radio-button>
            <el-radio-button label="3">已通过词条</el-radio-button>
            <el-radio-button label="4">未通过词条</el-radio-button>
          </el-radio-group>
          <el-card style="width: 1200px;">  <!--高度后期需要自适应 -->
            <div v-if="tabSelection == '1'">
              <toBeAdmittedEntry  ref="myBeAdmittedEntry"></toBeAdmittedEntry>
            </div>
            <div v-else-if="tabSelection == '2'">
              <toBeAuditedEntry ref="myBeAuditedEntry"></toBeAuditedEntry>
            </div>
            <div v-else-if="tabSelection == '3'">
              <passedEntry ref="myPassedEntry"></passedEntry>
            </div>
            <div v-else-if="tabSelection == '4'">
              <failPassEntry ref="myFailPassEntry"></failPassEntry>
            </div>
          </el-card>
        </div>
    </div>
</template>

<script>

import passedEntry from "./myEntry/entryManagement/passedEntry";
import toBeAuditedEntry from "./myEntry/entryManagement/toBeAuditedEntry";
import failPassEntry from "./myEntry/entryManagement/failPassEntry";
import toBeAdmittedEntry from "./myEntry/entryManagement/toBeAdmittedEntry";

export default {
    name: "myEntry",
    components :{
        passedEntry,
        toBeAuditedEntry,
        failPassEntry,
        toBeAdmittedEntry
    },
    data() {
        return{
            userName: this.$store.state.name,
            tabSelection: '1',
        };
    },
    methods:{

    }
}
</script>

<style>
.uc-section-myentry{
  padding: 20px 0 50px;
}
.uc-myentry-title{
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 34px;
  color: #666;
  margin: 0;
  padding: 0;
}
.uc-myentry-layout{
  width: 1200px;
  margin: 0 auto;
}
.uc-myentry-button{
  margin-left: 380px;
  margin-top: 10px;
}
</style>