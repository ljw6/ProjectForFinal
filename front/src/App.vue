<template>
  <div>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <a href="/" ><div class="logo" ><span>{{collapsed?'ALKG':'线代知识图谱'}}</span></div></a>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline" @click="handleMenuClick" @select="select">
<!--        <a-sub-menu key="keyWords" @titleClick="subClick">-->
<!--          <span slot="title"><a-icon type="home" /><span>关键词索引</span></span>-->
<!--          <a-menu-item v-for="(item,i) in wordList" v-bind:key="i+1">{{item}}</a-menu-item>-->

<!--        </a-sub-menu>-->
        <a-sub-menu key="lib" @titleClick="subClick">
          <span slot="title"><a-icon type="appstore" /><span>章节索引</span></span>
          <a-sub-menu v-for="(item,i) in libList" v-bind:key="i" v-bind:title="item"><a-menu-item v-for="(ite,index) in SecondList[i]" v-bind:key="getSecondKey(i,index)" >{{ite}} </a-menu-item></a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="application" @titleClick="subClick">
          <span slot="title"><a-icon type="user" /><span>实例索引</span></span>
          <a-menu-item key="aa">
            工程应用
          </a-menu-item>
          <a-menu-item key="bb">
            逻辑应用
          </a-menu-item>
          <a-menu-item key="cc">
            学科研究
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
<!--        <a-input-search placeholder="input search text" enter-button @search="onSearch" style="position: absolute;width: 150px;right: 200px;margin-top: 15px" />-->
        <span style="position: absolute;right: 65px">
          <a-dropdown>
      <a-menu slot="overlay">
        <a-menu-item key="1" @click="turnToPushGoods('Pushgoods')"> <a-icon type="user" /> GETD </a-menu-item>
        <a-menu-item key="2" @click="turnToPushGoods('Pushservices')"> <a-icon type="user" /> HypE </a-menu-item>
        <a-menu-item key="3" @click="turnToPushGoods('Pushservices')"> <a-icon type="user" /> RAM </a-menu-item>
        <a-menu-item key="4" @click="turnToPushGoods('Pushservices')"> <a-icon type="user" /> HINGE </a-menu-item>
        <a-menu-item key="5" @click="turnToPushGoods('Pushservices')"> <a-icon type="user" /> NeuInfer </a-menu-item>
        <a-menu-item key="6" @click="turnToPushGoods('Pushservices')"> <a-icon type="user" /> DeepKE </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px"> 选择算法 <a-icon type="down" /> </a-button>
    </a-dropdown>
        </span>
        <span style="position: absolute; right: 20px">
            <a v-if="isLogin" href="/user">
          <a-avatar style="color: #1088e9;background-color: white;" size="large">
            <a-icon slot="icon" type="user"/>
          </a-avatar>
              </a>
          <a v-else href="#" @click="showModal">
          <a-avatar style="color: #1088e9;background-color: white;" size="large">
            <a-icon slot="icon" type="user"/>
          </a-avatar>
              </a>
        </span>
      </a-layout-header>
<!--      路由视图-->
      <a-modal v-model="visible" title="请登录" ok-text="登录" cancel-text="取消" @ok="NoLogin">
        <p>访问用户中心，请登录系统，否则只能以游客身份访问本页！</p>
      </a-modal>
      <router-view style="height: 100vh" ref="graph"/>
    </a-layout>
    <div id="components-back-top-demo-custom">
      <a-back-top>
        <div class="ant-back-top-inner">
          UP
        </div>
      </a-back-top>
    </div>
  </a-layout>
</div>
</template>

<script>
// import {Menu} from "ant-design-vue";
// const SubMenu={
//   template: '<a-sub-menu key'
// };
import {Axios} from "./Utils/axios";
import CallUtils from "./Utils/CallUtils";
export default {
  name: 'App',

  data() {
    return {
      collapsed: true,
      openKeys:['keyWords'],
      keynum:1,
      wordList:[],
      libList:["行列式","矩阵","向量","线性方程组","特征值与特征向量","二次型"],
      SecondList:[],
      isLogin: false,
      visible: false,
    }
  },
  created(){
    this.constructA2ZList();
    this.constructSecondList(this.libList)
  },
  watch:{
    openKeys(val){
      console.log('keys',val);
      this.keynum = 1;
    }
  },
  methods:{
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
    getSecondKey(parentIndex,Index){
      return parentIndex.toString()+"-"+Index.toString();
    },
    constructSecondList(list){
      Axios.get("/getList").then(res=>{
        let all_list = res.data;
        let secondList = [];
        list.forEach(function (l){
          let temp = [];
          all_list.forEach(function (item){
            if (item.nodeHead.value === l){
              temp.push(item.nodeTail.value);
            }
          });
          secondList.push(temp);
        });
        this.SecondList = secondList;
      })
    },
    constructA2ZList(){
      for (let i = 0;i<26;i++){
        this.wordList.push(String.fromCharCode(65+i));
      }
      console.log(this.wordList);
    },
    handleMenuClick(val){
      let sa = val.keyPath[0].split("-")
      let name = this.SecondList[parseInt(sa[0])][parseInt(sa[1])];
      console.log(name)
      Axios.get("/getId/"+name).then(res=>{
        CallUtils.$emit("locate",res.data);
        //存疑：emit on 组件通信失败
        // this.$refs.graph.$refs.seeksRelationGraph.focusNodeById(res.data);
      })
      // console.log(val.keyPath[1]);
      // this.$router.replace({path:"/lists",query:{tabTag:val.keyPath[1],tagVal:val.keyPath[0]}});
      // this.$router.go(0);
    },
    turnToPushGoods(url){
      console.log(url);
      // this.$router.push({path:"/test"});
    },
    subClick(val){
      console.log("sub",val);
    },
    select(val){
      console.log("select",val);
    },
    addItems() {
    },
    NoLogin(){
      window.location.href = "/login"
    },
    // onSearch(data){
    //
    // }
  },
}
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#components-back-top-demo-custom .ant-back-top{
  bottom: 50px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  /*position: fixed;*/
  /*right: 50px;*/
  /*bottom: 50px;*/
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
.logo{
  text-align: center;
  color: white;
}
.logo span{
  vertical-align: middle;
}
.header{
  background-color: #001529;
  padding-bottom: 5px;
}
</style>
