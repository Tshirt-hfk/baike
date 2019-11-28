<template>
  <div class="classification-content">
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
  </div>
</template>

<script>

export default {
  name: "classificationEntry",
  props: ["field"],
  watch :{
      field:{
        handler(n, o){
          this.fieldName = n;
          this.init();
        }
      }
    },
  data() {
    return {
        fieldName: '',
        entrys: [
            {
                id: '1',
                name: '屠呦呦',
                intro: '“共和国勋章”获得者屠呦呦——与青蒿结缘 用中医药造福世界',
                img_url: '/static/image/tuyouyou.jpg'
            },{
                id: '2',
                name: '杨振宁',
                intro: '杨振宁的真正地位曝光，《自然》评出物理史最强，活着的只剩一位',
                img_url: '/static/image/yangzhenning.jpg'
            },{
                id: '3',
                name: '贝索斯',
                intro: '贝索斯过去3天狂抛18亿美元亚马逊股票 创历史纪录',
                img_url: '/static/image/beisuosi.png'
            },{
                id: '4',
                name: '马化腾',
                intro: '国资委主任会见马化腾，鼓励中央企业与互联网企业深化合作',
                img_url: '/static/image/mahuateng.jpg'
            }         
        ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // init() {
    //   // 初始化数据
    //   this.$axios
    //     .post("/user/getClassificationEntry",{
    //         field: this.fieldName
    //     })
    //     .then(res => {
    //       if (res.data.data) 
    //         this.entrys = res.data.data.entrys.splice(0, 4);
    //     })
    //     .catch(error => {
    //       if (error.response) {
    //       }
    //     });
    // },
    init(){
      if(this.fieldName === '科技'){
        this.entrys.splice(0, this.entrys.length);
        this.entrys.push({
                id: '1',
                name: '5G',
                intro: '5G时代，万物互联网背后的机遇和隐患',
                img_url: '/static/image/5G.png'
            });
        this.entrys.push({
                id: '2',
                name: '自动驾驶',
                intro: '自动驾驶标准争夺激烈，驶入大结盟时代',
                img_url: '/static/image/zidongjiashi.jpg'
            });
        this.entrys.push({
                id: '3',
                name: '区块链',
                intro: 'aelf先后上架亚马逊AWS和微软Azure，构建区块链+云计算蓝图',
                img_url: '/static/image/qukuailian.jpg'
            });
        this.entrys.push({
                id: '4',
                name: '神经网络',
                intro: '超大规模图神经网络系统将赋予机器常识',
                img_url: '/static/image/shenjingwangluo.png'
            });
      }else if(this.fieldName === '自然'){
        this.entrys.splice(0, this.entrys.length);
        this.entrys.push({
                id: '1',
                name: '垃圾分类',
                intro: '上海实施垃圾分类“满月”:绿色消费理念推广普及游客',
                img_url: '/static/image/lajifenlei.jpg'
            });
        this.entrys.push({
                id: '2',
                name: '宇宙',
                intro: '宇宙星系之间区域并不空旷:气体物质与流浪恒星',
                img_url: '/static/image/yuzhou.jpg'
            });
        this.entrys.push({
                id: '3',
                name: '虫洞',
                intro: '科学家研究发现,虫洞或许真实存在,但它可能不是时空隧道',
                img_url: '/static/image/chongdong.jpg'
            });
        this.entrys.push({
                id: '4',
                name: '开普勒望远镜',
                intro: '开普勒望远镜又一发现!环双星系统“塔图因”发现第三颗行星',
                img_url: '/static/image/kaipulewangyuanjing.jpg'
            });
      }else if(this.fieldName === '文化'){
        this.entrys.splice(0, this.entrys.length);
        this.entrys.push({
                id: '1',
                name: '中华文化',
                intro: '推动数字文化高质量发展 共同打造中国文化符号',
                img_url: '/static/image/zhonghuawenhua.jpg'
            });
        this.entrys.push({
                id: '2',
                name: '奥运会',
                intro: '2008年8月8日至 24日，29届奥林匹克运动会在中国首都北京举行',
                img_url: '/static/image/aoyunhui.jpg'
            });
        this.entrys.push({
                id: '3',
                name: '博物馆',
                intro: '“庆八一,迎大庆”军地联欢会在中国国家博物馆举行',
                img_url: '/static/image/bowuguan.jpg'
            });
        this.entrys.push({
                id: '4',
                name: '建军节',
                intro: '建军节,首艘国产航母再出海',
                img_url: '/static/image/bayijianjunjie.jpg'
            });
      }else{
        this.entrys.splice(0, this.entrys.length);
        this.entrys.push({
                id: '1',
                name: '屠呦呦',
                intro: '“共和国勋章”获得者屠呦呦——与青蒿结缘 用中医药造福世界',
                img_url: '/static/image/tuyouyou.jpg'
            });
        this.entrys.push({
                id: '2',
                name: '杨振宁',
                intro: '杨振宁的真正地位曝光，《自然》评出物理史最强，活着的只剩一位',
                img_url: '/static/image/yangzhenning.jpg'
            });
        this.entrys.push({
                id: '3',
                name: '贝索斯',
                intro: '贝索斯过去3天狂抛18亿美元亚马逊股票 创历史纪录',
                img_url: '/static/image/beisuosi.png'
            });
        this.entrys.push({
                id: '4',
                name: '马化腾',
                intro: '国资委主任会见马化腾，鼓励中央企业与互联网企业深化合作',
                img_url: '/static/image/mahuateng.jpg'
            });   
      }
    },
    toEntryExhibition(entryName){
      this.$emit('toEntryExhibition', entryName);
    }
  }
};
</script>

<style scope>
h4,p{
    margin: 0;
    padding: 0;
}
.classification-content li{
    float: left;
    margin: 10px 0 0 30px;
    width: 293px;
    height: 89px;
    border-bottom: 1px solid #e9e7e6;
    zoom: 1;
    list-style: none;
}
.classification-content-img{
    float: left;
    width: 88px;
    height: 80%;
    margin-right: 10px;
    border: 1px solid #cacaca;
}
.classification-content-img:hover{
    cursor: pointer;
}
.classification-lemma-content{
    float: left;
    width: 193px;
}
.classification-lemma-content h4{
    float: left;
    font-size: 15px;
    margin-bottom: 18px;
}
.classification-lemma-content h4:hover{
    color: #459df5;
    text-decoration: underline;
    cursor: pointer;
}
.classification-lemma-content p{
    float: left;
    height: 36px;
    overflow: hidden;
    font-size: 13px;
    color: #888;
    word-break: break-word;
    text-overflow: ellipsis;
}
</style>