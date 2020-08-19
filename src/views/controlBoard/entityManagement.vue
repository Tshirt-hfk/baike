<template>
  <div class="em-layout">
    <div class="uc-myentry-title">本体管理</div>
    <div class="entityMan-main">
      <div class="entityMan-main-wrap">
        <el-card class="box-card">
          <div class="uc-entity-title">分类体系管理</div>
          <div style="margin-bottom: 20px; width: 500px">
            <el-input placeholder="输入关键字过滤" v-model="filterText" class="input-with-icon"></el-input>
          </div>
          <el-tree
            :data="data"
            icon="el-icon-circle-plus"
            node-key="id"
            :filter-node-method="filterNode"
            ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span v-show="!data.isEdit">
                <span>{{node.label}}</span> 
              </span>
              <span v-show="data.isEdit">
                <el-input class="slot-t-input" size="mini" autofocus
                  v-model="data.label" :ref="'slotTreeInput' + data.id" @blur.stop="edit(node, data)"
                  @keydown.native.enter="edit(node, data)">
                </el-input>
              </span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                  @click="inputFocus(data)">
                </el-button>
                <el-button
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  circle
                  @click="() => append(data)">
                </el-button>
                <el-button
                  type="text"
                  icon="el-icon-remove-outline"
                  @click="() => remove(node, data)">
                </el-button>
                </span>
              </span>
          </el-tree>
      </el-card>

      <el-card class="box-card">
        <div class="uc-entity-title2">描述模板管理</div>
        <el-button
            type="text"
            @click="() => editDesp()" style="float:right">
            编辑
        </el-button>
        <div class="entity-description-template ">
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane 
                :key="item.name"
                v-for="item in tabs"
                :label="item.label" :name="item.name">
                {{item.content}}
              </el-tab-pane>
            </el-tabs>
            <div class="classification-content">
            </div>
        </div>
      </el-card>

      <el-card class="box-card">
        <div class="uc-entity-title2">
          <div class="entity-catalogue-middle">
            <div class="entity-catalogue-l">目录模板管理</div>
            <div class="entity-catalogue-r"><el-button type="text">编辑</el-button></div>
          </div>
        </div>
        <div style="margin: 50px 0 10px 0; width: 500px">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-icon">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div class="entity-description-template ">
            <el-tabs v-model="activeName2" @tab-click="handleTabClick2">
              <el-tab-pane 
                :key="item.name"
                v-for="item in tabs2"
                :label="item.label" :name="item.name">
              </el-tab-pane>
            </el-tabs>
            <div class="classification-content">
              <entityCatalogueTab :catalogue="activeName2"></entityCatalogueTab>
            </div>
        </div>
      </el-card>
      
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import entityCatalogueTab from '../../components/entityCatalogueTab'


let id = 1000;

export default {
  name: "entityManagement",
  components:{
    entityCatalogueTab,

  },
  data() {
    const data = [{
        id: 1,
        label: '一级 1',
        isEdit: false,
        children: [{
          id: 4,
          label: '二级 1-1',
          isEdit: false,
          children: [{
            id: 9,
            label: '三级 1-1-1',
            isEdit: false,
          }, {
            id: 10,
            label: '三级 1-1-2',
            isEdit: false,
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        isEdit: false,
        children: [{
          id: 5,
          label: '二级 2-1',
          isEdit: false,
        }, {
          id: 6,
          label: '二级 2-2',
          isEdit: false,
        }]
      }, {
        id: 3,
        label: '一级 3',
        isEdit: false,
        children: [{
          id: 7,
          label: '二级 3-1',
          isEdit: false,
        }, {
          id: 8,
          label: '二级 3-2',
          isEdit: false,
        }]
      }];

      const temp = [
            {
              id:1,
              label: "基本资料",
              children:[],
            },
            {
              id:2,
              label: "生平",
              children:[],
            },
            {
              id:3,
              label: "荣誉",
              children:[],
            },
            {
              id:4,
              label: "参演作品",
              children:[],
            },
          ]
      return {
        data: JSON.parse(JSON.stringify(data)),
        // data: JSON.parse(JSON.stringify(data))
        activeName: "人物",
        activeName2: "人物",
        filterText: '',
        tabs:[
          {
            label: "人物",
            name: "人物",
            content:"方磊"
          },
          {
            label: "电影",
            name: "电影",
            content:"剧情片"
          },
          {
            label: "汽车",
            name: "汽车",
            content:"奥迪"
          },
          {
            label: "科技",
            name: "科技",
            content:"人工智能"
          },
        ],
        tabs2:[
          {
            label: "人物",
            name: "人物",
            content:"asdkasmc"
          },
          {
            label: "电影",
            name: "电影",
            content:"剧情片"
          },
          {
            label: "汽车",
            name: "汽车",
            content:"奥迪"
          },
          {
            label: "科技",
            name: "科技",
            content:"人工智能"
          },
        ],


      }
  
  },
  mounted() {
    this.init();
  },
  filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    inputFocus(data){
      data.isEdit = true
      this.$nextTick(() => {
        this.$refs['slotTreeInput' + data.id].$refs.input.focus()
      })
    },

    edit(Node, data) {
        console.log(Node, data);
        if (data.isEdit) {
          this.$set(data,'isEdit', false)  // 先把isEdit置为false
          this.$nextTick(() => {
            this.$refs['slotTreeInput' + data.id].$refs.input.focus()
          })
        }
    },

    append(data) {
      const newChild = { id: id++, label: '请输入分类', isEdit: false, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      this.$confirm('此操作将删除该分类分支, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    editDescp(){

    },

    handleTabClick2(tab, event) {
        // console.log(tab,event)
        if(tab.name=="人物"){

          console.log(tab.name)
        }
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
  margin: 0;
  padding: 25px 0 0 0;
}
.uc-entity-title{
  text-align: left;
  line-height: 80px;
  color: #666;
  margin: 0;
  padding: 0 0 0 0;
  font-size: 20px;
}
.uc-entity-title2{
  text-align: left;
  line-height: 80px;
  color: #666;
  margin: 0;
  padding: 0 0 0 0;
  font-size: 20px;
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
.entityMan-main {
  margin: 0 auto;
  min-height: 700px;
  margin-top: 10px;
}
.entityMan-main-wrap {
  float: left;
  width: 100%;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 0px;
}
.entity-description-template {
  width: 710px;
}

.entity-catalogue-middle {
  margin: 0 auto;
  /* width: 1200px; */
  display: flex;
  justify-content: space-between;
  height: 35px;
}
.entity-catalogue-l{
  float: left;
  height: 35px;
}
.entity-catalogue-r {
  float: right;
  /* font-size: 18px; */
}

.input-with-icon {
  width: 60%
}
.box-card{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>