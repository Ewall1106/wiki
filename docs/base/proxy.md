# 跨域问题处理与代理转发功能

## 接口管理

- 接口管理及数据 `mock` 我们使用[yapi](https://hellosean1025.github.io/yapi/index.html)这个接口管理平台，这样的话既可以进行数据的 `mock`，又可以维护一份 `api` 文档。

  - 这是我们这个项目的的接口文档：[panda-mall](https://yapi.xwhx.top/)
  - 因个人服务器保存数据能力有限，所以不提供注册功能，查看接口文档请使用下方账号密码登录：
  - 账号：`visitor` 密码：`visitor`

## 代理转发

- 其实代理转发就是配置下 webpack 的`devServer`，详见[webpack 从 0 到 1-devServer 初探](https://www.jianshu.com/p/a59ee9d14617)。

- 而在`vue-cli3.x+`的脚手架生成了项目中，因为隐藏了 `webpack` 的配置文件，所以需要在 `vue.config.js` 文件中进行相应的[config 配置](https://cli.vuejs.org/zh/config/#devserver)修改，原理还是一样的。

```javascript
const mockUrl = "https://yapi.xwhx.top/mock/11";

module.exports = {
  // ...
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/dev-api": {
        target: mockUrl,
        pathRewrite: { "^/dev-api": "" },
        secure: false,
        changeOrigin: true
      }
    }
  }
  // ...
};
```

## 关于跨域

- 很多同学本地 mock、跟后端同学联调啊什么的不成功，很多情况都是因为跨域问题报错，其实处理跨域问题一般就是两种方案。

  - 一种就是上文中的使用 webpack 的 `devServer`，配置一下实现代理转发，这个其实就是一点 webpack 的基础知识，感兴趣的话大家可以去看看[webpack 从 0 到 1-devServer 初探](https://www.jianshu.com/p/a59ee9d14617)。
  - 一种就是`CORS`，就是让服务端去设置一下 `nginx` 的反向代理，设置 `Access-Control-Allow-Methods`、`Access-Control-Allow-Origin`、`Access-Control-Allow-Headers` 预请求相关的响应头。

- 两者原理都是一样，都是起个中转服务器来规避同源协议的问题。
