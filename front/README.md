### 线性代数知识图谱可视化系统——前端部分

此部分为Vue项目
目录结构如下

```
│  .gitignore
│  babel.config.js
│  dist.zip
│  package-lock.json
│  package.json
│  pro.txt
│  README.md
│  vue.config.js
│  yarn.lock
           
├─public
│      favicon.ico
│      index.html
│      
└─src
    │  App.vue
    │  main.js
    │  
    ├─assets
    │      logo.png
    │      
    ├─models
    ├─router
    │      index.js
    │      
    ├─Utils
    │      axios.js
    │      CallUtils.js
    │      filter.js
    │      MathJax.js
    │      store.js
    │      
    └─view
            Graph.vue
            KnowledgeMents.vue
            testView.vue
```
其中，`public`目录为项目的入口文件，`src`目录为项目的源代码目录，`assets`目录为项目的资源目录。
在`router`目录下，有一个index.js文件，里面定义了项目的路由。当每次在`src`目录下添加新的页面时，需要在router配置添加对应的路由。
在`view`目录下，有三个文件，分别为`Graph.vue`、`KnowledgeMents.vue`和`testView.vue`。
`Graph.vue`定义了知识图谱的页面，`KnowledgeMents.vue`定义了知识点的页面，`testView.vue`定义了视图测试页面。

在`Graph.vue`中引入Relation-Graph库可视化知识图谱数据，并使用Vue.js渲染。

在`KnowledgeMents.vue`中定义最小知识点的内容，并且使用`v-html`标签将从后端获取到的内容数据显示在页面上。

在`axios.js`文件中，定义了一个axios对象，用于向后端发送请求，并且获取后端返回的数据。
`filter.js`作为过滤器，用于将来自后端的所有知识条目，分为一级、二级、三级知识点。
`MathJax.js`用于将tex公式渲染并显示在页面上。