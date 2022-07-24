import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button} from "ant-design-vue";
import {PageHeader} from "ant-design-vue";
import {Icon} from "ant-design-vue";
import {Result} from 'ant-design-vue'
import {Menu} from 'ant-design-vue'
import {Affix} from "ant-design-vue";
import {Layout} from "ant-design-vue";
import {BackTop} from "ant-design-vue";
import {Badge} from "ant-design-vue";
import {Avatar} from "ant-design-vue";
import {Tabs} from "ant-design-vue";
import {Collapse} from "ant-design-vue";
import {Row} from "ant-design-vue";
import {Col} from "ant-design-vue";
import {Dropdown} from "ant-design-vue";
import {List} from "ant-design-vue";
import {Card} from "ant-design-vue";
import {Input} from "ant-design-vue";
import {Popover} from "ant-design-vue";
import {Modal} from "ant-design-vue";
import MathJax from "@/Utils/MathJax";
import {Axios} from "@/Utils/axios";
import {store} from "./Utils/store";
Vue.config.productionTip = false
Vue.use(Input)
Vue.use(Button)
Vue.use(Modal)
Vue.use(PageHeader)
Vue.use(Card)
Vue.use(List)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(Tabs)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(BackTop)
Vue.use(Layout)
Vue.use(Affix)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Result)
Vue.use(Menu)
Vue.use(Popover)
new Vue({
  render: h => h(App),
  router,
  store,
  MathJax,
  Axios,
}).$mount('#app')
