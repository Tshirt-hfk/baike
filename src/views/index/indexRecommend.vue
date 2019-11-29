<template>
	<div class="index-main">
      <div class="index-main-wrap">
        <el-carousel height="350px" indicator-position="outside" :interval="rollingTime">
          <el-carousel-item v-for="item in homePageEntry" :key="item.id">
            <img
              style="width: 710px; height: 350px;cursor:pointer"
              :src="item.src"
              @click="toEntryExhibition(item.name)"
            />
            <div class="index-focus-intro">
              <div class="index-focus-summary">
                <h2>
                  <a @click="toEntryExhibition(item.name)">{{item.name}}</a>
                </h2>
                <p>{{item.intro}}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="index-main-classification">
          <div class="classification-title">
            <h2>分类推荐</h2>
            <el-tabs v-model="field">
              <el-tab-pane name="人物">
                <span slot="label">人物</span>
              </el-tab-pane>
              <el-tab-pane name="自然">
                <span slot="label">自然</span>
              </el-tab-pane>
              <el-tab-pane name="文化">
                <span slot="label">文化</span>
              </el-tab-pane>
              <el-tab-pane name="科技">
                <span slot="label">科技</span>
              </el-tab-pane>
            </el-tabs>
            <div class="classification-content">
              <classificationEntry :field="field" v-on:toEntryExhibition="toEntryExhibition"></classificationEntry>
            </div>
          </div>
        </div>
      </div>
      <div class="index-side-wrap">
        <div class="index-side-rightbox">
          <div class="index-side-rightbox-title">
            <div class="name">众智化词条</div>
            <div class="slogan">集大家智慧认识世界</div>
            <div class="number">
              共收录
              <span style="font-size: 27px">4,135,935</span>
              个词条
            </div>
          </div>
          <a @click="entryCreateFlag=true">创建词条</a>
        </div>
        <entryCreate :entryCreateFlag.sync="entryCreateFlag"></entryCreate>
        <div class="index-side-recom">
          <div class="index-side-recom-title">
            <h3>推荐专题</h3>
          </div>
          <div class="index-side-recom-subject" v-for="item in recommendSubject" :key="item.id">
            <div class="subject-title">
              <span class="subject-identification">推荐</span>
              <a class="title-name" @click="toSubjectExhibition(item.id)">{{item.name}}</a>
            </div>
            <div class="subject-description">
              <img
                style="width: 133px;height: 100px;cursor: pointer"
                :src="item.imgUrl"
                @click="toSubjectExhibition(item.id)"
              />
              <div class="subject-ctn">
                <p>{{item.intro}}</p>
                <a
                  style="margin-left: 5px"
                  v-for="fieldItem in item.field"
                  :key="fieldItem"
                >{{fieldItem}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import entryCreate from "../../components/entryCreate";
import entrySearchBar from "../../components/entrySearchBar";
import classificationEntry from "../classificationEntry";

export default {
  name: "indexRecommend",
  components: {
    entryCreate,
    entrySearchBar,
    classificationEntry
  },
  data() {
    return {
      entryCreateFlag: false,
      entryField: [],
      status: this.$store.state.status,
      rollingTime: 5000,
      searchResult: [],
      timeout: null,
      field: "人物",
      //数据都要从数据库取
      homePageEntry: [
        {
          id: "1",
          name: "建军节",
          intro: "八一建军节致敬中国军人，中国军人二十四小时展露英雄本色",
          src: "/static/image/jianjunjie.jpg"
        },
        {
          id: "2",
          name: "小红书",
          intro: "种草神器出事了，小红书被下架，启动整改全面排查",
          src: "/static/image/xiaohongshu.jpg"
        },
        {
          id: "3",
          name: "迪斯尼",
          intro: "迪士尼影业年度票房创纪录，全年有望突破100亿美元",
          src: "/static/image/disini.jpg"
        },
        {
          id: "4",
          name: "小行星",
          intro: "险！一颗小行星擦过地球，科学家只提前1天发现",
          src: "/static/image/xiaoxingxing.jpg"
        },
        {
          name: "垃圾分类",
          intro: "上海实施垃圾分类“满月”:绿色消费理念推广普及游客",
          src: "/static/image/laji.jpg"
        }
      ],
      recommendSubject: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .post("/api/user/getRecommendSubject", {})
        .then(res => {
          if (res.data.data) {
            this.recommendSubject = res.data.data.subjects.splice(0, 3);
          }
        })
        .catch(error => {
          if (error.response) {
          }
        });
    },
    toEntryExhibition(entryName) {
      var { href } = this.$router.resolve({
        name: "entryPreview",
        params: {
          name: entryName
        }
      });
      window.open(href, "_blank");
    },
    toSubjectExhibition(id) {
      var { href } = this.$router.resolve({
        path: "/subject",
        query: {
          id: id
        }
      });
      window.open(href, "_blank");
    },
  }
};
</script>

<style scoped>
h2,
p,
h3 {
  margin: 0;
  padding: 0;
}
.index-main {
  width: 1050px;
  margin: 0 auto;
  min-height: 700px;
  margin-top: 10px;
}
.index-main-wrap {
  float: left;
  width: 710px;
}
.index-focus-intro {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 710px;
  height: 100px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
.index-focus-summary {
  bottom: 5px;
  left: 0;
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
}
.index-focus-summary h2 {
  font-size: 24px;
  line-height: 40px;
  color: #fff;
  font-weight: 400;
}
.index-focus-summary a {
  cursor: pointer;
  text-decoration: none;
}
.index-focus-summary a:hover {
  text-decoration: underline;
}
.index-focus-summary p {
  font-size: 14px;
  font-weight: 400;
  height: 50px;
  overflow: hidden;
  line-height: 22px;
  color: #ddd;
}
.index-side-wrap {
  width: 320px;
  float: right;
}
.index-side-rightbox {
  background-color: #fafafa;
  padding: 10px 20px;
}
.index-side-rightbox-title {
  position: relative;
  margin-top: 15px;
  text-align: center;
  font-weight: 400;
}
.index-side-rightbox-title .name {
  margin-bottom: 10px;
  line-height: 1.2;
  font-size: 30px;
  color: #459df5;
}
.index-side-rightbox-title .slogan {
  margin-bottom: 25px;
  line-height: 1;
  font-size: 18px;
  color: #459df5;
}
.index-side-rightbox-title .number {
  margin-bottom: 20px;
  line-height: 1;
  font-size: 18px;
  color: #459df5;
}
.index-side-rightbox a {
  position: relative;
  display: block;
  margin: 10px auto 0;
  width: 204px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border-radius: 3px;
  background: #409eff;
  cursor: pointer;
}
.index-side-rightbox a:hover {
  opacity: 0.9;
}
.index-side-recom {
  background-color: #fafafa;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 10px 20px;
}
.index-side-recom-title {
  border-bottom: #e6e8eb solid 2px;
  height: 28px;
  line-height: 28px;
}
.index-side-recom-title h3 {
  font-weight: 400;
  font-size: 17px;
  display: inline-block;
  border-bottom: #4d95dc solid 3px;
  line-height: 1.1;
  padding-bottom: 5px;
}
.index-side-recom-subject {
  min-height: 95px;
  margin-top: 15px;
}
.index-side-recom-subject .subject-title {
  position: relative;
  overflow: hidden;
  height: 22px;
  line-height: 22px;
  font-size: 22px;
}
.index-side-recom-subject .subject-identification {
  position: absolute;
  top: 2px;
  left: 0;
  padding: 0 3px;
  color: #f5f5f5;
  font-size: 13px;
  line-height: 1.5;
  background-color: #f18167;
}
.index-side-recom-subject .title-name {
  margin-left: 48px;
  color: #333;
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
}
.index-side-recom-subject .title-name:hover {
  color: #409eff;
}
.index-side-recom-subject .subject-description {
  margin-top: 15px;
  position: relative;
  width: 280px;
  height: 100px;
}
.index-side-recom-subject .subject-ctn {
  float: right;
  width: 130px;
}
.index-side-recom-subject .subject-ctn p {
  height: 60px;
  overflow: hidden;
  line-height: 20px;
  font-size: 14px;
  color: #888;
  font-family: Arial, Helvetica, sans-serif;
}
.index-side-recom-subject .subject-ctn a {
  color: #666;
  border: solid 1px #e2e2e2;
  border-radius: 2px;
  background: #fff;
  text-align: center;
  line-height: 1;
  padding: 5px 8px;
  font-size: 14px;
  float: right;
  margin-top: 14px;
  cursor: pointer;
}
.index-side-recom-subject .subject-ctn a:hover {
  color: #409eff;
  border: solid 1px #409eff;
}
.index-main-classification {
  margin-top: 25px;
  width: 710px;
}
.classification-title {
  height: 28px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e2e2;
}
.classification-title h2 {
  float: left;
  margin-right: 50px;
  margin-top: 6px;
  padding-bottom: 1px;
  font-size: 16px;
  line-height: 30px;
  color: #336;
  border-bottom: 3px solid #336;
}
.classification-content {
  margin-top: 20px;
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