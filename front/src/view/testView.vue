<template>
  <div id="test" >
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Title"
        sub-title="This is a subtitle"
        @back="backto"
    />
    <p v-html="tex" style="margin-left: 10%"></p>
    <p style="margin-left: 12px">特征向量相关知识点推荐</p>
    <a-popover style="margin-left: 6px;margin-right: 6px" v-for="(item,i) in recomList" v-bind:key="i" v-bind:title="item.name">
      <template #content>
        <a v-bind:href="item.url">{{item.name}}</a>
      </template>
      <a-button type="primary">{{item.name}}</a-button>
    </a-popover>
  </div>
</template>
<script>
import router from "@/router";
import MathJax from "@/Utils/MathJax";
// import {Axios} from "@/Utils/axios";
export default {
  name:"testView",
  data(){
    return{
      tex:"性质：<br>（1）不同特征值的特征向量线性无关<br>（2）\\(k\\)重特征值最多\\(k\\)个线性无关的特征向量\\(1≤n-r(λ_i E-A)≤k_i\\),<br>（3）设\\(A\\)的特征值为\\(λ_1,λ_2,\\dots,λ_n\\)，则\\(|A|= \\prod{\\lambda_i} \\)，\\(\\sum \\lambda_i = \\sum a_{ii}\\)<br>（4）当\\(R(A)=1\\)，即\\(A=αβ^T \\)，其中\\(α,β\\)均为n维非零列向量，则\\(A\\)的特征值为\\(λ_1=\\sum a_{ii} =α^T β=β^T α,λ_2=\\dots=λ_n=0\\) <br>（5）设\\(α\\)是矩阵\\(A\\)属于特征值\\(λ\\)的特征向量，则<br><img src=\"https://img1.imgtp.com/2022/02/07/n7jRl7k9.png\">",
      recomList:[
        {url:"https://zhuanlan.zhihu.com/p/158584611",
         name:"PCA图像识别"
        },
        {url:"https://www.icourse163.org/course/SJTU-1205779816",
          name:"振动力学"
        },
        {url:"https://zhuanlan.zhihu.com/p/29849122",
          name:"谱聚类算法"
        },
        {url:"https://zhuanlan.zhihu.com/p/390904182",
          name:"马尔可夫矩阵和过程"
        },
      ],
    };
  },
  methods:{
    backto(){
      router.back();
    },
    // getContent(){
    //   let indexUrl = this.$route.params.indexUrl;
    //   Axios.get("/getContent/"+indexUrl).then(res=>{
    //     this.tex = res.data;
    //   })
    // },
    formatMath() {
      let that = this;
      setTimeout(function () {
        that.$nextTick(function () {
          if(MathJax.isMathjaxConfig){//判断是否初始配置，若无则配置。
            MathJax.initMathjaxConfig();
          }
          MathJax.MathQueue("km");//传入组件id，让组件被MathJax渲染
        })
      },500);
    },
  },
  created() {
    this.getContent();
    this.formatMath();
  }
};
</script>

<style scoped>

</style>