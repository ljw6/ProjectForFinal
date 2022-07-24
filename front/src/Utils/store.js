import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

export const store =new Vuex.Store({
    state:{
        keyWords:null,
        nodeList: [],
    },
    getters:{
        getKey : (state)=>{
            return state.keyWords
        },
        getList : (state)=>{
            return state.nodeList;
        }
    },
    mutations:{
        setKey : (state,keyWord)=>{
            state.keyWords = keyWord;
        },
        setList: (state,nodeList)=>{
            state.nodeList = nodeList;
        }
    },
    actions:{
        setKeys(context,data){
            context.commit("setKey",data);
        },
        setLists(context,data){
            context.commit("setList",data);
        }
    }
})