# vue2移动H5项目

> **前言**
>
> 此项目是类似头条、新闻、资讯类的移动端项目。
>
> 技术栈：vue2全家桶 + Vant + axios + Socket.io。
>
> 在线地址: [点此访问](https://project.icehim.com/toutiao-mobile/index.html#/login)，F12打开手机模拟可完整展示。
>
> 账号：13911111111
> 密码：246810

> **安装环境：**
>
> 需要在node环境下，在package.json所在的文件夹中npm i下载依赖，下载完成后npm run serve 启动项目在`localhost:8080`即刻访问

## 项目展示

### 登录页

![image-20230306195134175](https://cos.icehim.com/typora/image-20230306195134175.png)

### 首页

> 下拉刷新，上拉无线加载内容，频道列表选择和编辑，同时切换对应的内容

![toutiao-home](https://cos.icehim.com/typora/toutiao-home.gif)

### 文章详情页面

![image-20230306195836575](https://cos.icehim.com/typora/image-20230306195836575.png)

### 评论

![image-20230306195932628](https://cos.icehim.com/typora/image-20230306195932628.png)

### 搜索页面

> 双向绑定获取搜索关键词,搜索关键词调用后台接口,为了避免用户输入期间，多次调用联想词接口，进行了函数防抖处理。记录搜索关键词到本地 localStorage 中

![image-20230306200012787](https://cos.icehim.com/typora/image-20230306200012787.png)

### 搜索结果页面

![image-20230306200217468](https://cos.icehim.com/typora/image-20230306200217468.png)

### 我的页面

![image-20230306200251317](https://cos.icehim.com/typora/image-20230306200251317.png)

### 编辑资料页面

![image-20230306200452562](https://cos.icehim.com/typora/image-20230306200452562.png)

### 聊天机器人页面

![image-20230306200523841](https://cos.icehim.com/typora/image-20230306200523841.png)