<template>
  <el-dialog
    id="preDialog"
    title="词条预览"
    :visible.sync="drawerFlag"
    :before-close="handleClose"
    @opened="handleOpen"
    style="font-family: normal;"
    width="1210px"
    center
    destroy-on-close
  >
    <el-card class="preview-intro" id="preContent">
      <div class="preview-main-wrap">
        <div class="clearfloat"></div>
        <div class="preview-entryName">
          <h1>{{form.entryName}}</h1>
          <h2 v-for="item in form.field" :key="item">({{item}})</h2>
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
              <li
                v-for="(cata, index) in catalog.slice((n-1)*12)"
                :key="index"
              >
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
                      <a :href="'#t'+cata.index" style="color: #555;">{{cata.title}}</a>
                    </span>
                  </template>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div class="preview-content" id="mainContent">
          <div ref="previewEntry" v-html="form.content" class="ck-content"></div>
        </div>
      </div>
      <div class="preview-side-wrap">
        <div class="preview-picture">
          <img style="margin: 0 auto;width: 268px;height: 245px" :src="form.imageUrl" />
        </div>
        <!-- 上下位关系-->
        <div class="preview-relation">
          <div class="relation-title">
            <h3 style="margin-left: 50px">词条名</h3>
            <h3 style="margin-left: 80px">关系</h3>
          </div>
          <ul>
            <li v-for="item in form.relation" :key="item.name">
              <div>
                <h4 style="margin-left: 60px">{{item.name}}</h4>
                <h4 style="margin-left: 88px">{{item.relation}}</h4>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="preview-side-catalog"
          style="visibility: hidden;bottom: 10px;z-index: 9999;"
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
                      <a :href="'#t'+cata.index" style="color: #555;font-weight: 600;">{{cata.title}}</a>
                    </span>
                  </template>
                  <template v-else>
                    <span class="side-index2">{{cata.index}}</span>
                    <span class="side-text2">
                      <a :href="'#t'+cata.index" style="color: #666;">{{cata.title}}</a>
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
  </el-dialog>
</template>

<script>
let indexNum = 1;
let sideIndex = 1;

export default {
  name: "entryReview",
  props: ["form", "drawerFlag"],
  watch: {
    drawerFlag: function(n, o) {
      indexNum = 1;
      sideIndex = 1;
      this.visible = n;
    }
  },
  data() {
    return {
      visible: false,
      sideIndex: 1,
      columns: 4,
      entryId: 1,
      catalog: []
    };
  },
  mounted() {
    document
      .getElementById("preDialog")
      .addEventListener("scroll", this.handleScroll);
  },
  methods: {
    toPageTop() {
      preContent.scrollIntoView();
    },
    handleScroll() {
      var scrollTop = document.getElementById("preDialog").scrollTop;
      var offsetTop = document.querySelector("#mainContent").offsetTop + 150;
      if (scrollTop > offsetTop) {
        var fbox = document.getElementById("sideRoller");
        fbox.style.visibility = "visible";
      } else {
        var fbox = document.getElementById("sideRoller");
        fbox.style.visibility = "hidden";
      }
    },
    refreshCatalog() {
      var nodes = this.$refs.previewEntry.childNodes;
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
    handleClose(done) {
      this.$emit("handleClose", done);
    },
    handleOpen() {
      this.refreshCatalog();
    }
  }
};
</script>

<style src="../style/content-style.css">
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
  margin-bottom: 15px;
  text-indent: 2em;
  line-height: 24px;
  zoom: 1;
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
}
.preview-attribute-right {
  width: 395px;
  float: right;
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
  vertical-align: top;
  text-align: right;
  color: #63a0df;
  margin-bottom: 10px;
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
  padding-top: 7px;
  width: 5px;
  font-size: 14px;
  vertical-align: top;
  color: #ccc;
}
.catalog-text2 {
  display: inline-block;
  font-size: 14px;
  width: 115px;
  vertical-align: top;
  padding-top: 7px;
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
  height: 300px;
  width: 270px;
  border: solid 1px #e3e3e6;
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
</style>