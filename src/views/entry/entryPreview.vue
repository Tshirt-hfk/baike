<template>
  <div class="preview-layout">
    <entrySearchBar v-on:search="search"></entrySearchBar>
    <div>
      <div>
        <div v-if="entryContentVisible == true" class="preview-main">
          <div class="preview-divideline">
            <span class="preview-tit" style="font-size: 25px;">词条内容</span>
          </div>
          <!-- <div v-if="" class="preview-polysemy">

          </div>-->
          <el-card class="preview-intro">
            <div class="preview-main-wrap">
              <div class="preview-tool-bar">
                <div class="tool-bar-collect">
                  <i class="el-icon-star-off"></i>
                  <span>收藏</span>
                </div>
                <div class="tool-bar-line"></div>
                <div class="tool-bar-like">
                  <i class="el-icon-thumb"></i>
                  <span>{{likeNum}}</span>
                </div>
              </div>
              <div class="clearfloat"></div>
              <div class="preview-entryName">
                <h1>{{form.entryName}}</h1>
                <h2 v-for="item in form.field" :key="item">({{item}})</h2>
                <el-button style="margin-left: 10px;" size="mini" @click="toEntryEdit()">编辑</el-button>
              </div>
              <div class="preview-entryintro" v-html="form.intro"></div>
              <div class="preview-entry-attribute">
                <div class="preview-basicinfo-title">
                  <h2 class="preview-basicinfo-h2">基本信息</h2>
                </div>
                <dl class="preview-attribute-left">
                  <div v-for="(prop, index) in form.infoBox" :key="index">
                    <div v-if="index % 2 == 0">
                      <dt>{{prop.key}}</dt>
                      <span style="float:left;line-height: 24px;margin-right: 5px;">:</span>
                      <dd>{{prop.value}}</dd>
                      <div style="clear: both"></div>
                    </div>
                  </div>
                </dl>
                <dl class="preview-attribute-right">
                  <div v-for="(prop, index) in form.infoBox" :key="index">
                    <div v-if="index % 2 !== 0">
                      <dt>{{prop.key}}</dt>
                      <span style="float:left;line-height: 24px;margin-right: 5px;">:</span>
                      <dd>{{prop.value}}</dd>
                      <div style="clear: both"></div>
                    </div>
                  </div>
                </dl>
              </div>
              <div class="preview-catalog">
                <div class="preview-catalog-title">
                  <h2 class="preview-title-h2">目录</h2>
                </div>
                <div class="preview-cataloglist">
                  <ol v-for="n in columns" :key="n">
                    <li v-for="(cata, index) in catalog.slice((n-1)*12)" :key="index">
                      <div v-if="index < 12">
                        <template v-if="cata.type == 1">
                          <span class="catalog-index1">{{cata.index}}</span>
                          <span class="catalog-text1">
                            <a :href="'#t'+cata.index">{{cata.title}}</a>
                          </span>
                        </template>
                        <template v-else>
                          <span class="catalog-index2">▪</span>
                          <span class="catalog-text2">
                            <a :href="'#t'+cata.index">{{cata.title}}</a>
                          </span>
                        </template>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
              <div class="preview-content" id="mainContent">
                <div ref="editor" class="ck-content"></div>
              </div>
            </div>
            <div class="preview-side-wrap">
              <div class="preview-picture">
                <img style="margin: 0 auto" width="269px" height="246px" :src="form.imageUrl" />
              </div>
              <!-- 上下位关系-->
              <div class="preview-relation">
                <div class="relation-title">
                  <h3 style="margin-left: 50px">词条名</h3>
                  <h3 style="margin-left: 80px">关系</h3>
                </div>
                <ul>
                  <li v-for="item in tableData" :key="item.name">
                    <div
                      class="preview-relation-table"
                      style="cursor:pointer;color:blue"
                      @click="toEntryPage(item.name)"
                    >{{item.name}}</div>
                    <div class="preview-relation-table">{{item.relation}}</div>
                  </li>
                </ul>
              </div>
              <div
                class="preview-side-catalog"
                style="visibility: hidden;bottom: 10px;"
                id="sideRoller"
              >
                <div class="preview-side-bar">
                  <i class="el-icon-help circle-start"></i>
                  <i class="el-icon-help circle-end"></i>
                </div>
                <div class="preview-side-roller">
                  <div class="inner-container">
                    <ol class="preview-side-catalist">
                      <li v-for="(cata, index) in catalog" :key="index">
                        <template v-if="cata.type == 1">
                          <a class="side-cata-pointer"></a>
                          <span class="side-index1">{{cata.index}}</span>
                          <span class="side-text1">
                            <a :href="'#t'+cata.index">{{cata.title}}</a>
                          </span>
                        </template>
                        <template v-else>
                          <span class="side-index2">{{cata.index}}</span>
                          <span class="side-text2">
                            <a :href="'#t'+cata.index">{{cata.title}}</a>
                          </span>
                        </template>
                      </li>
                    </ol>
                  </div>
                </div>
                <div class="preview-side-button">
                  <div class="preview-side-up" @click="toPageTop">UP</div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div v-else class="preview-none">
          <el-card class="preview-none-card">
            <div class="preview-none-apolo">
              <span>抱歉，还未收录"</span>
              <span style="color:#E6A23C">{{this.name}}</span>
              <span>"词条</span>
            </div>
            <div class="preview-none-welcom">
              <span>欢迎您来</span>
              <span @click="entryCreateFlag = true" class="preview-none-create">创建</span>
            </div>
          </el-card>
        </div>
      </div>
      <div>
        <vue-live2d :modelPath="modelPath"></vue-live2d>
      </div>
    </div>
    <entryCreate :entryCreateFlag.sync="entryCreateFlag"></entryCreate>
  </div>
</template>

<script>
import entrySearchBar from "../../components/entrySearchBar";
import entryCategorySelector from "../../components/entryCategorySelector";
import entryCreate from "../../components/entryCreate";

export default {
  name: "entryPreview",
  components: {
    entrySearchBar,
    entryCategorySelector,
    entryCreate
  },
  computed: {
    // columns:function(){
    // }
  },
  data() {
    return {
      name: this.$route.params.name,
      entryContentVisible: true,
      checked: false,
      stepActive: 0,
      entryCreateFlag: false,
      likeNum: "0",
      columns: 4,
      tableData: [],
      form: {
        originEntryId: -1,
        entryName: "",
        field: "",
        imageUrl: "",
        intro: "",
        filed: "",
        infoBox: [],
        content: "",
        reference: []
      },
      catalog: [],
      modelPath: [
        {
          order: 1,
          path: "/static/live2d/live2d-widget-model-z16/assets/z16.model.json",
        }
      ]
    };
  },
  mounted() {
    this.init();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    init() {
      this.$axios
        .get("/data/algoInterface", {
          params: {
            nameList: this.name
          }
        })
        .then(res => {
          // TODO 处理同名词条
          if (res.data && res.data.length > 0) {
            let data = res.data[0].info;
            if (data == null) this.entryContentVisible = false;
            this.form.field = data.field;
            this.form.originEntryId = data.id;
            this.form.entryName = data.entryName;
            this.form.intro = data.intro;
            this.form.infoBox.splice(0, this.form.infoBox.length);
            for (var info of data.infoBox) {
              this.form.infoBox.push(info);
            }
            this.form.content = data.content;
            this.form.imageUrl = data.imageUrl;
            this.initContent();
            this.refreshCatalog();
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

      this.$axios
        .get("/data/getHyponymyHypernymy", {
          params: {
            page_name: this.name
          }
        })
        .then(res => {
          if (res.data) {
            let hypernym_pages = res.data.hypernym_pages;
            let hyponym_pages = res.data.hyponym_pages;
            this.tableData.splice(0, this.tableData.length);
            for (let page of hypernym_pages) {
              this.tableData.push({
                name: page,
                relation: "上位词"
              });
            }
            for (let page of hyponym_pages) {
              this.tableData.push({
                name: page,
                relation: "下位词"
              });
            }
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
    initContent() {
      this.$refs.editor.innerHTML = this.form.content;
    },
    toEntryEdit() {
      if (this.$store.state.status == "0") {
        this.$router.push("/login");
      } else {
        this.$axios
          .post("/api/user/exitUserRecord", {
            originId: this.form.originEntryId
          })
          .then(res => {
            window.console.log(res.data.data);
            if (res.data.data) {
              if (res.data.data.state == 1) {
                this.$confirm(
                  "您已有该词条版本正在编辑，是否前往查看?",
                  "提示",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                  }
                )
                  .then(() => {
                    window.console.log(res.data.data);
                    this.$router.push({
                      path: "/entryedit",
                      query: { id: res.data.data.id, source: 1 }
                    });
                  })
                  .catch(() => {});
              } else if (res.data.data.state == 0) {
                this.$router.push({
                  path: "/entryedit",
                  query: { id: this.form.originEntryId, source: 0 }
                });
              } else {
                // TODO 审核提示
                this.$confirm("您已有该词条版本正在审核！", "提示", {
                  confirmButtonText: "确定",
                  type: "warning",
                  center: true
                });
              }
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
    },
    search(value) {
      window.console.log(value);
      this.name = value;
      this.init();
      this.$router.push({
        name: "entryPreview",
        params: {
          name: value
        }
      });
    },
    toPageTop() {
      header.scrollIntoView();
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#mainContent").offsetTop;
      if (scrollTop > offsetTop) {
        var fbox = document.getElementById("sideRoller");
        fbox.style.visibility = "visible";
      } else {
        var fbox = document.getElementById("sideRoller");
        fbox.style.visibility = "hidden";
      }
    },
    refreshCatalog() {
      var nodes = this.$refs.editor.childNodes;
      this.catalog.splice(0, this.catalog.length);
      var i1 = 0;
      var i2 = 0;
      for (var node of nodes) {
        var type;
        if (node.tagName == "H1") {
          type = 1;
          i1 = i1 + 1;
          i2 = 0;
        } else if (node.tagName == "H2") {
          type = 2;
          i2 = i2 + 1;
        } else {
          continue;
        }
        var index = i1.toString();
        if (i2 != 0) index = index + "." + i2.toString();
        node.id = "t" + index;
        var title = node.textContent;
        this.catalog.push({
          title: title,
          index: index,
          type: type
        });
      }
    },
    querySearch(query, cb) {},
    toEntryPage(entryName) {
      var { href } = this.$router.resolve({
        name: "entryPreview",
        params: {
          name: entryName
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style src="../../style/content-style.css" scoped>
</style>
<style scoped>
dl,
dd,
ol,
ul,
h1,
h2,
h3,
h4,
p {
  margin: 0;
  padding: 0;
}
.ck-content {
  margin: 0;
  padding: 0;
}
.preview-content >>> h1 {
  font-size: 26px;
  font-weight: 400;
  line-height: 28px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  font-family: Arial;
  color: #000;
  margin: 30px 0 15px 0;
  clear: both;
}
.preview-content >>> h1::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 28px;
  background-color: #4d95dc;
  position: absolute;
  margin-left: -50px;
  margin-top: 2px;
}
.preview-content >>> h2 {
  font-size: 20px;
  font-family: Arial;
  line-height: 22px;
  font-weight: 400;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 12px;
  color: #333;
}
.preview-content >>> p {
  font-size: 15px;
  font-family: Arial;
  word-wrap: break-word;
  color: #333;
  margin: 0;
  margin-bottom: 5px;
  text-indent: 2em;
  line-height: 24px;
  zoom: 1;
}
.preview-layout {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.preview-main {
  width: 1170px;
  margin: 0 auto;
  min-height: 700px;
  margin-top: 10px;
}
.preview-intro {
  margin-top: 45px;
}
.preview-divideline {
  height: 28px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 28px;
  text-align: center;
}
.preview-divideline .preview-tit {
  line-height: 56px;
  padding: 0 20px;
  margin-right: 415px;
  background: #fff;
}
.preview-main-wrap {
  float: left;
  width: 790px;
  padding: 0 29px 0;
}
.preview-tool-bar {
  float: right;
}
.tool-bar-collect {
  height: 18px;
  float: right;
  cursor: pointer;
}
.tool-bar-collect:hover {
  color: #1296db;
}
.tool-bar-line {
  float: left;
  border-right: 1px solid #707070;
  height: 18px;
  margin-left: 5px;
  margin-right: 5px;
  float: right;
}
.tool-bar-like {
  height: 18px;
  float: right;
  cursor: pointer;
}
.tool-bar-like:hover {
  color: #1296db;
}
.clearfloat {
  width: 0;
  height: 0;
  clear: both;
}
.preview-entryName {
  margin: 0 0 10px;
  width: 700px;
}
.preview-entryName h1 {
  margin: 0 5px 0 0;
  display: inline;
  font-size: 34px;
  line-height: 1.15;
  font-weight: 400;
  vertical-align: sub;
}
.preview-entryName h2 {
  margin-right: 5px;
  display: inline;
  font-weight: 400;
  font-size: 20px;
  vertical-align: sub;
}
.preview-entryintro {
  clear: both;
  font-size: 15px;
  word-wrap: break-word;
  color: #333;
  margin-top: 20px;
  margin-bottom: 15px;
  text-indent: 2em;
  line-height: 24px;
}
.preview-picture {
  width: 268px;
  height: 245px;
  border: solid 1px #ddd;
  margin-bottom: 20px;
  box-shadow: 1px 1px 1px #ccc;
  position: relative;
}
.preview-side-wrap {
  width: 270px;
  float: right;
}
.preview-entry-attribute {
  margin: 20px 0 35px;
  clear: both;
  background: #fafcff;
  min-height: 200px;
}
.preview-basicinfo-title {
  display: block;
  clear: both;
  zoom: 1;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  background: #fff;
  margin: 35px 0 10px 0;
}
.preview-basicinfo-h2 {
  float: left;
  display: block;
  line-height: 28px;
  font-size: 26px;
  font-weight: 400;
  color: #000;
  background: #fff;
}
.preview-basicinfo-h2::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 28px;
  background-color: #4d95dc;
  position: absolute;
  margin-left: -50px;
  margin-top: 2px;
}
.preview-attribute-left {
  width: 395px;
  float: left;
  margin-bottom: 25px;
}
.preview-attribute-right {
  width: 395px;
  float: right;
  margin-bottom: 25px;
}
.preview-entry-attribute dt {
  display: block;
  width: 90px;
  font-weight: 700;
  color: #999;
  line-height: 26px;
  padding: 0;
  margin: 0;
  margin: 0 5px 0 12px;
  float: left;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.preview-entry-attribute dd {
  color: #333;
  width: 275px;
  float: left;
  position: relative;
  word-break: break-all;
  line-height: 26px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.preview-catalog {
  margin-bottom: 15px;
  float: left;
  border-bottom: 1px solid #ddd;
  background: #fbfbfb;
}
.preview-catalog-title {
  display: block;
  clear: both;
  zoom: 1;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  background: #fff;
}
.preview-title-h2 {
  float: left;
  display: block;
  line-height: 28px;
  font-size: 26px;
  font-weight: 400;
  color: #000;
  background: #fff;
}
.preview-title-h2::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 28px;
  background-color: #4d95dc;
  position: absolute;
  margin-left: -50px;
  margin-top: 2px;
}
.preview-cataloglist {
  display: block;
  float: left;
  width: 790px;
  position: relative;
  overflow: hidden;
  padding-top: 15px;
  padding-bottom: 20px;
  background-color: #fff;
}
.catalog-index1 {
  display: inline-block;
  width: 18px;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 8px;
  margin-bottom: 10px;
  vertical-align: top;
  text-align: right;
  color: #63a0df;
}
.catalog-text1 {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  background-color: #fff;
  vertical-align: top;
  width: 120px;
  margin-bottom: 10px;
}
.catalog-index2 {
  display: inline-block;
  padding-left: 41px;
  padding-right: 5px;
  width: 5px;
  font-size: 12px;
  vertical-align: top;
  color: #ccc;
}
.catalog-text2 {
  display: inline-block;
  font-size: 12px;
  width: 115px;
  vertical-align: top;
}
.preview-cataloglist a {
  color: #136ec2;
  text-decoration: none;
}
.preview-cataloglist ol {
  width: 195px;
  list-style: none;
  border-left: 1px solid #f5f5f5;
  float: left;
}
.preview-cataloglist a:hover {
  text-decoration: underline;
}
.preview-content {
  clear: both;
  overflow: hidden;
  zoom: 1;
  font-size: 14px;
  line-height: 25px;
  word-wrap: break-word;
  min-height: 1000px;
}
.preview-side-catalog {
  width: 270px;
  height: 456px;
  position: fixed;
  bottom: 10px;
  font-size: 14px;
  font-family: 宋体;
  line-height: 19px;
}
.preview-side-bar {
  position: absolute;
  top: 0;
  width: 0;
  height: 353px;
  background-color: #eaeaea;
  border: 1px solid #eaeaea;
  border-top: 0;
  border-bottom: 0;
  left: 5px;
  font-size: 10px;
}
.circle-start {
  top: 0;
  position: absolute;
  left: -5.5px;
  top: -8px;
  width: 11px;
  height: 11px;
  color: #bfbfbf;
  zoom: 1;
  overflow: hidden;
}
.circle-end {
  margin: 0;
  bottom: 0;
  position: absolute;
  left: -5.5px;
  bottom: -8px;
  width: 11px;
  height: 11px;
  color: #bfbfbf;
  zoom: 1;
  overflow: hidden;
}
.preview-side-roller {
  padding-top: 10px;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 210px;
  height: 330px;
  overflow: hidden;
}
.inner-container {
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
}
.preview-side-catalist {
  width: 210px;
  height: 330px;
  position: relative;
}
.preview-side-catalist a {
  color: #136ec2;
  text-decoration: none;
}
.preview-side-catalist a:hover {
  text-decoration: underline;
}
.side-cata-pointer {
  font-size: 10px;
  background: #136ec2;
  border-radius: 15px;
  position: absolute;
  display: block;
  width: 8px;
  height: 8px;
  cursor: pointer;
  margin-top: -17px;
  left: 2px;
}
.preview-side-button {
  position: absolute;
  bottom: 45px;
  height: 50px;
  width: 100%;
}
.preview-side-up {
  margin-top: 10px;
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  width: 50px;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 50px;
  color: #1989fa;
  cursor: pointer;
}
.preview-side-up:hover {
  background: rgba(82, 163, 245, 0.1);
}
.preview-relation {
  position: relative;
  width: 270px;
  border: solid 1px #e3e3e6;
}
.preview-relation-table {
  float: left;
  width: 135px;
  text-align: center;
  font-size: 14px;
  line-height: 39px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.relation-title {
  height: 40px;
  border-bottom: 2px dashed #e3e3e6;
  text-align: center;
}
.relation-title h3 {
  height: 38px;
  line-height: 38px;
  font-size: 18px;
  float: left;
  margin-top: 2px;
}
.preview-relation li {
  height: 38px;
  border-bottom: 1px solid #e9e7e6;
  list-style: none;
}
.preview-relation h4 {
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  font-weight: 400;
  float: left;
  margin-top: 2px;
}
.side-index1 {
  display: inline-block;
  width: 18px;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 8px;
  vertical-align: top;
  text-align: right;
  color: #63a0df;
  margin-top: 5px;
}
.side-text1 {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  background-color: #fff;
  color: #555;
  vertical-align: top;
  width: 120px;
  margin-top: 5px;
}
.side-index2 {
  display: inline-block;
  padding-left: 41px;
  padding-top: 7px;
  width: 25px;
  font-size: 14px;
  vertical-align: top;
  color: #63a0df;
}
.side-text2 {
  display: inline-block;
  font-size: 14px;
  width: 115px;
  vertical-align: top;
  padding-top: 7px;
}
.preview-none {
  width: 1170px;
  margin: 0 auto;
  min-height: 700px;
  margin-top: 10px;
}
.preview-none-card {
  margin-top: 50px;
}
.preview-none-apolo {
  text-align: center;
  font-size: 20px;
}
.preview-none-welcom {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}
.preview-none-create {
  color: #409eff;
  cursor: pointer;
}
.entryCreate-title {
  margin-top: 20px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.entryCreate-title-main {
  font-size: 25px;
  color: #333;
}
.entryCreate-title-notice {
  margin-top: 10px;
  padding-bottom: 10px;
  color: #a9a9a9;
}
.entryCreate-body {
  font-size: 16px;
  line-height: 30px;
  margin: 25px 25px 25px 50px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}
.entryCreate-checkBox {
  text-align: center;
}
.entryCreate-entryName {
  margin-top: 25px;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  font-size: 18px;
}
.entryCreate-entryCate {
  margin-top: 30px;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  font-size: 18px;
}
.entryCreate-notice {
  display: block;
  margin-left: 340px;
  margin-top: 10px;
  color: #333;
  line-height: 2;
  font-size: 15px;
}
</style>


