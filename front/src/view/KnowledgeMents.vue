<template>
  <div id="km" >
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Title"
        sub-title="This is a subtitle"
        @back="backto"
    />
    <p v-html="tex" style="margin-left: 10%"></p>
  </div>
</template>
<script>
import router from "@/router";
import MathJax from "@/Utils/MathJax";
import {Axios} from "@/Utils/axios";
export default {
  name:"KnowledgeMents",
  data(){
    return{
      tex:null
    };
  },
  methods:{
    backto(){
      router.back();
    },
    getContent(){
      let indexUrl = this.$route.params.indexUrl;
      Axios.get("/getContent/"+indexUrl).then(res=>{
        this.tex = res.data;
      })
    },
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
    // formatHandle(){
    //   let str =
    //   if()
    // }
  },
  created() {
    this.getContent();
    this.formatMath();
  }
};
</script>

<style scoped>

</style>