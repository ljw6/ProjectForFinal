## 线性代数知识图谱可视化系统

### 前端部署
#### 打包
前端使用Vue框架，可在前端项目目录里使用`yarn build`或`npm run build`命令打包项目，打包后产生dist文件夹
#### 运行项目（测试用）
在win平台，可进入dist目录使用`serve`命令直接运行项目
在linux平台，可使用nginx部署再运行，具体nginx部署详见下
#### linux部署
推荐使用nginx部署项目，下载nginx并配置后，修改linux的配置文件

```
http{
    include /etc/ng inx/conf.d/*.conf ;
    include /etc/ng inx/s ites-enabled/*;
    
    server 
    listen 8080;
    server name loca lhost ;
    location / {
            #root为dist路径
            root /A1Pro/front/dist;
            index index.html index.htm;
            #此处try_files为避免vue-router配置中history配置项问题
            try_files $uri $uri/ /index.html;
            location /static/ {
                root /A1Pro/front/dist ;
            }
    }
}
```
配置好后，进入nginx目录使用`./nginx -t`命令启动nginx，便可访问前端页面。

### 后端部署
后端推荐使用idea打包项目。
进入idea后，使用meaven工具构建打包项目，打包后产生可执行的jar包。
#### meaven工具构建过程
1. 在idea中打开项目目录，点击右上角的`maven`按钮。
2. 先选择`clean`清除缓存，再使用`compile`编译，最后选择`package`打包。
3. 在`target`目录下，可以看到打包后的jar包。
#### 部署到linux环境中
将jar包放置在back目录中，使用`nohup java -jar`命令启动项目即可。



### 数据库建立

该系统使用Mysql + gStore 管理数据

#### mysql

mysql数据库中一共建立三个表，分别为：

表 3‑2 用户表

| 字段   | 字段类型          | 默认为Null | 主键 | 描述         |
| ------ | ----------------- | ---------- | ---- | ------------ |
| id     | varchar(11)       | no         | yes  | 用户唯一标识 |
| name   | varchar(255)      | no         | no   | 用户名       |
| age    | int               | no         | no   | 用户年龄     |
| gender | enum(male,female) | no         | no   | 用户性别     |
| prefer | set               | no         | no   | 用户兴趣     |

表 3‑3 最小知识表

| 字段     | 字段类型     | 默认为Null | 主键 | 描述           |
| -------- | ------------ | ---------- | ---- | -------------- |
| id       | varchar(11)  | no         | yes  | 知识点唯一标识 |
| content  | varchar(255) | no         | no   | 知识点内容     |
| relation | varchar(255) | no         | no   | 链接关系       |
| url      | varchar(255) | no         | no   | 索引路径       |
| expand   | set          | no         | no   | 知识点拓展     |

表 3‑4 知识索引表

| 字段 | 字段类型     | 默认为null | 主键 | 描述           |
| ---- | ------------ | ---------- | ---- | -------------- |
| id   | varchar(11)  | no         | yes  | 知识点唯一标识 |
| name | varchar(255) | no         | no   | 知识点名称     |

​                               

图 3‑5 知识图谱最小知识点数据库

  ![image-20220714193905523](C:\Users\Duke\AppData\Roaming\Typora\typora-user-images\image-20220714193905523.png)

图 3‑6 所有知识点数据库

  ![image-20220714193924251](C:\Users\Duke\AppData\Roaming\Typora\typora-user-images\image-20220714193924251.png)

图 3‑7 用户信息数据库

![image-20220714193934382](C:\Users\Duke\AppData\Roaming\Typora\typora-user-images\image-20220714193934382.png)

其中，用户表在开发系统中是未实现的用户登录控制功能所需表，故在重构系统时可以忽略

#### gStore

使用gStore数据库管理数据时，需要使用固定格式的.nt文件构建数据库（格式请参照data.nt文件），将data.nt文件放入路径data/al/下，使用build命令构建数据库

​	另，gStore支持Sparql查询，具体语句请查阅教程[RDF查询语言SPARQL - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/32703794)

### 关于师大云计算平台使用方法

#### 推荐使用SSH工具连接实例

连接用户名为root，密码为jerry2022@snnu，若忘记密码可在平台中对实例进行重置密码

