# FH (BETA-1.0) 
## 配置环境
1. 先用终端或者cmd进入工程的目录中（或者在编辑器的Terminal进入）

2. npm install 或者 yarn install一下

3. 完成后输入umi dev 或者 yarn start 启动项目 浏览器输入localhost:8000/welcome 即可

4. 第二步只需要运行一次，运行过了以后，下次只需要直接走第三步
## 开发指南
### 目录说明
主要区域为src文件夹

页面在src/pages

组件在src/components

公用组件在src/components/widgets

静态资源在src/assets

基本框架在src/layouts

业务逻辑在src/models

详细说明见https://umijs.org/zh/guide/app-structure.html#dist

### 路由
由于是使用约定式的路由，在src/pages下的所有文件的创建都有约定，命名的方式将决定了路由

详细规则见 https://umijs.org/zh/guide/router.html#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1

简单说明：

比如src/pages/welcome 下的index.jsx文件（名字为index）默认映射路由为/welcome
如果是src/pages/welcome 下有login.jsx文件 则这个文件映射路由为/welcome/login 
（还有一种写法就是在src/pages/welcome下创建login文件夹 
在文件夹里面创建index.jsx文件 这个文件也会自动映射路由为welcome/login）

路由的对应说明在help/routes.js下

### 页面 (如何入手)

以任务大厅为例子

页面在pages/mission_hall下的index.jsx里面

首先引入React 

定义一个类继承React的纯组件,类
名才用首字母大写的驼峰式命名 如果是页面就加上View

在末尾export这个组件

return函数里面返回jsx风格的html(注意 只能return一个标签，所以全部的内容都要被一个div包裹起来 这个div作为这个页面的root)

例子里面 我用一个className叫做mission_hall的div包裹全部的标签

然后用row和col控制filter和表格的比例大概为4 6开

然后左边就写filter的条件
右边的missionList写因为要自己写
所以放到component里面写 写好后引用

http://localhost:8000/mission_hall 可以见到效果
###样式(Sass的编写)
sass后缀名为.scss 和css的规则差不多，不过是编程向的css
在sass里面可以用嵌套来代表父子关系

详细百度或者看代码例子

一般的组件的话直接用antd的就好

用import {xxx,xxx,xxx}from 'anrd'的方式引入，组件的样式如果不是预期的，自己写样式去覆盖掉原生的，具体做法为在Chrome检查
控件代码，找到控制样式的classname然后自己写css 用一样的classname去覆盖





