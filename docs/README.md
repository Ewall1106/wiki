<img width="100" height="100" src="https://s3.ax1x.com/2021/01/05/skqq8f.png">

## Vue-H5-Template

<p>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
  </a>
  </a>
    <a href="https://youzan.github.io/vant/#/zh-CN/">
    <img src="https://img.shields.io/badge/vant-2.7.0-brightgreen.svg" alt="vant">
  </a>
  <a href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/npm-6.9.0-blue.svg" alt="npm">
  </a>
  <a href="https://github.com/Ewall1106/panda-vue-template/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

`Vue-H5-Template` 项目以小商城作为基本的内容演示，使用 `Vue3.0+Typescript+Vant` 搭建 `移动端h5页面` 开发所需的基础模板，并提供一些通用型的解决方案及扩展功能。

## 基本说明

- [文档说明](https://docs.xwhx.top/mall)
- [接口文档](https://yapi.xwhx.top)
- [电脑预览](https://mall.xwhx.top)
- [更新日志](https://github.com/Ewall1106/mall/blob/master/changelog.md)

部分页面预览：

|              首页               |              商详               |              购物车               |              我的               |
| :-----------------------------: | :-----------------------------: | :-------------------------------: | :-----------------------------: |
| ![首页](~@img/mall_index_1.jpg) | ![商详](~@img/mall_index_2.jpg) | ![购物车](~@img/mall_index_3.jpg) | ![我的](~@img/mall_index_4.jpg) |

手机扫码预览：

<img width="200" class="zoom" src="~@img/mall_preview.png">

- 涵盖内容举例：

开发规范：
eslint 校检及错误提示
prettier 统一代码风格
styleLint 统一样式风格

初始化配置：
vw 移动端适配
css 预处理器
浏览器默认样式处理
promise 降级
fast-click 处理

基础功能：
vuex 模块话使用
路由配置及权限控制
axios 封装及请求

实用工具：

- **基础功能** - 动态路由，权限验证、`vuex`、`eslint`
- **数据交互** - `axios` 封装及请求、跨域、`API` 接口封装、数据 `mock`
- **实用工具** - `scroll` 滑动、复制粘贴
- **常用功能** - 骨架屏、图像验证码、`svg` 图标
- **业务组件** - 弹窗、红包雨、倒计时等等。。。

## 前端相关

- 技术栈主要使用 `vue+vant+axios` 来实现。

  - [项目地址](https://github.com/Ewall1106/mall)
  - [文档说明](https://docs.xwhx.top/mall/)
  - [接口文档](https://yapi.xwhx.top/)
  - [更新日志](https://github.com/Ewall1106/mall/blob/master/changelog.md)

:::tip 提示
因个人服务器保存数据能力有限，所以 `yapi` 服务不提供注册功能，查看接口文档请使用以下提供的账号密码登录：账号：`visitor` 密码：`visitor`
:::

- 安装使用

- 下载项目很慢，将 github.com 进行替换 原本的网站中的`github.com` 进行替换为`github.com.cnpmjs.org`

```bash
# 项目下载
$ git clone git@github.com:Ewall1106/mall.git

# 安装运行
$ npm install
$ npm run dev
```

- 目录结构

```bash
|-- public                // public
|-- src
|   |-- api               // 接口列表
|   |-- assets            // 图片资源
|   |-- components        // 公共组件
|   |-- icons             // svg图标
|   |-- router            // 路由
|   |-- store             // vuex
|   |-- styles            // 公共样式
|   |-- utils             // 工具函数
|   |-- views             // 具体页面
|   |-- App.vue           // 主页面
|   |-- main.js           // 入口文件
|   |-- permission.js     // 权限控制逻辑
|-- package.json          // 客户端依赖
|-- .eslint.xx            // eslint处理
|-- babel.config.js       // babel配置文件
|-- postcss.config.js     // postcss配置文件
|-- vue.config.js         // vue相关配置文件
|-- ...
```

## 后端服务

- 商城的后端项目，技术栈主要使用 `node+koa+mongodb` 来实现。

  - [项目地址](https://github.com/Ewall1106/panda-server)
  - [文档说明](https://docs.xwhx.top/backend/)
  - [更新日志](https://github.com/Ewall1106/panda-server/blob/master/changelog.md)

- 安装使用

```bash
# 下载到本地
$ git clone git@github.com:Ewall1106/panda-server.git

# 客户端运行
$ npm install
$ npm run dev
```

::: warning 警告
运行前请先自行配置 `config/index.js` 文件。
:::

## 协议

[MIT](https://github.com/Ewall1106/mall/blob/master/LICENSE)

Copyright (c) 2020-present Ewall&熊猫
