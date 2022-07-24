import Vue from "vue"
import Router from 'vue-router'
import Graph from '@/view/Graph'
import KnowledgeMents from "@/view/KnowledgeMents";
import testView from "../view/testView";

Vue.use(Router)

export default new Router(
    {
        //修改模式
        mode: "history",
        routes : [
            {
                path: '/',
                name: 'Index',
                component: Graph,
                // children: [
                //     {
                //         path: "/list",name:"lists",component: Lists,meta: {requiresAuth: true}
                //     }
                // ]
            },
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: login
            // },
            {
                path: '/KM',
                name : 'know',
                component: KnowledgeMents,
            },
            {
                path: '/test',
                name: 'test',
                component:testView,
            },
        ],
        active:function (transaction){
            transaction.next()
        },
        // beforeEach:function (to,from,next){
        //     to.query.timestamp = new Date().getTime();
        //     if (to.path === from.path && Object.keys(to.query).length === 1 && !flag){
        //         Store.dispatch("setRouterAlive",false);
        //     }
        //     next();
        //     flag = false;
        // }
    })
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
