<template>
  <div>
    <div style="margin-top:5px;width: calc(100% - 10px);height: 100vh">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" />
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
// import router from '@/router'
import {Axios} from "@/Utils/axios";
import router from "@/router";
import CallUtils from "../Utils/CallUtils";
export default {
  name: 'Graph',
  components: { SeeksRelationGraph },
  data() {
    return {
      graph_json_data:null,
      g_loading: true,
      demoname: '---',
      checked_sex: '',
      checked_isgoodman: '',
      graphOptions: {
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        // allowShowMiniView:true, //mini 视图
        allowSwitchJunctionPoint: true,
        // allowShowMiniNameFilter:true,
        defaultLineShape: 1,
        isMoveByParentNode: true,
        'layouts': [
          {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
          }
        ],
        defaultJunctionPoint: 'border',
        defaultExpandHolderPosition: "left"
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  created() {
    this.setGraphData();
    // this.TestGraph();
  },
  destroyed() {
    CallUtils.$off("locate");
  },
  mounted() {
    this.demoname = this.$route.params.demoname

    CallUtils.$on("locate",(id)=>{
      this.locatNode(id);
    })
    // this.TestGraph();
  },
  methods: {
    TestGraph(){
      let Data = {"nodes":[{"id":"2","text":"2"},{"id":"1","text":"1"},{"id":"3","text":"3"},{"id":"4","text":"4"},{"id":"5","text":"5"},{"id":"6","text":"6"}],"links":[{"from":"2","to":"1","text":"21"},{"from":"2","to":"3","text":"23"},{"from":"6","to":"4","text":"64"},{"from":"6","to":"5","text":"65"}]};
      this.$refs.seeksRelationGraph.setJsonData(Data,(seeks)=>{
        setTimeout(()=>{
          seeks.graphSetting.layouter.stop()
        },1000);
      })
      },

    setGraphData() {
      Axios.get("/getGraph").then((res=>{
        this.$refs.seeksRelationGraph.setJsonData(res.data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
          setTimeout(() => {
            seeksRGGraph.graphSetting.layouter.stop()
          }, 1000)
      });

      }));
    },
    filterMapper(obj){
      return obj.head.value;
    },
    onNodeClick(nodeObject) {
      Axios.get("/getFilter").then(res=>{
        let filter = res.data.map(function (obj){return obj.head.value});
        let n_index = filter.indexOf(nodeObject.id);
        if ( n_index !== -1){
          router.push({
            name:"know",
            params:{
              indexUrl:res.data[n_index].tail.value
            }
          })
          // router.push({path:"/KM"})
        }
        else{
          this.locatNode(nodeObject.id)
        }
      })
    },
    locatNode(id) {//定位
      var graph = this.$refs.seeksRelationGraph
      graph.focusNodeById(id)
      // graph.getNodeById(id).className = "c-my-node"
      // graph.getNodeById(id).borderColor = '#00ced1 !important'
      // graph.getNodeById(id).fontColor = '#000000'
      // graph.getNodeById(id).animation = 'myFlash 600ms infinite'
      // graph.getNodeById(id).webkit.animation = 'myFlash 600ms infinite'
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.c-my-node2{
  border:none;
  background-position: center center;
  background-size: 100%;
  height:74px;
  width:74px;
  border-radius: 40px;

}
.c-node-name2{
  width:160px;margin-left:-40px;text-align:center;margin-top:85px;
  position: absolute;
}
@keyframes myFlash {
  from {
    opacity: 1.0;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1.0;
  }
}
@-webkit-keyframes myFlash {
  from {
    opacity: 1.0;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1.0;
  }
}
/*.c-my-node2{*/
/*  background-color: #00ced1 !important;*/
/*  animation: myFlash 600ms infinite;*/
/*  -webkit-animation: myFlash 600ms infinite;*/
/*}*/
.c-my-node{
  background-color: #00ced1 !important;
  animation: myFlash 600ms infinite;
  -webkit-animation: myFlash 600ms infinite;
}
</style>