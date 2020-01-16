<template>
  <!-- <div class="classification-content">
    <ul>
        <li v-for="entry in entrys" :key="entry.id">
            <a class="classification-content-img" @click="toEntryExhibition(entry.name)">
                <img :src="entry.img_url" style="width: 88px;height: 74px">
            </a>
            <div class="classification-lemma-content">
                <h4 @click="toEntryExhibition(entry.name)">{{entry.name}}</h4>
                <p>{{entry.intro}}</p>
            </div>
        </li>      
    </ul>
  </div> -->
    <el-tree
        :data="catalogueData"
        node-key="id"
        :expand-on-click-node="false">
        
    </el-tree>
</template>

<script>
export default {
    name:"entityCatalogueTab",
    props:["catalogue"],
    watch :{
      catalogue:{
        handler(n, o){
          this.catalogueName = n;
          this.init();
        }
      }
    },

    data(){
        const tempData = [{
              id:1,
              label: "基本资料",
              children:[{
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
            }],
            },
        ]

        return{
            catalogueName:'',
            catalogueData:JSON.parse(JSON.stringify(tempData))

        }
    },
    mounted() {
    this.init();
    },

    methods:{
        init(){
            if(this.catalogueName==='电影'){
                const temp = [
                    {
                    id:1,
                    label: "基本资料",
                    children:[{
                        id:2,
                        label: "主演",
                        children:[],
                    },
                    {
                        id:3,
                        label: "导演",
                        children:[],
                    },
                    {
                        id:4,
                        label: "获奖荣誉",
                        children:[],
                    }],
                }
                ]
                this.catalogueData = JSON.parse(JSON.stringify(temp))
            }else if(this.catalogueName==='汽车'){
                const temp = [
                    {
                    id:1,
                    label: "基本资料",
                    children:[{
                        id:2,
                        label: "型号",
                        children:[],
                    },
                    {
                        id:3,
                        label: "汽车2",
                        children:[],
                    },
                    {
                        id:4,
                        label: "汽车3",
                        children:[],
                    }],
                }
                ]
                this.catalogueData = JSON.parse(JSON.stringify(temp))
            }else if(this.catalogueName==='科技'){
                const temp = [
                    {
                    id:1,
                    label: "基本资料",
                    children:[{
                        id:2,
                        label: "科技1",
                        children:[],
                    },
                    {
                        id:3,
                        label: "科技2",
                        children:[],
                    },
                    {
                        id:4,
                        label: "科技3",
                        children:[],
                    }],
                }
                ]
                this.catalogueData = JSON.parse(JSON.stringify(temp))
            }
        }
    }
}
</script>