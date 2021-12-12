# 在 vscode 中调试 vue

如何使用 `Debugger for Chrome` 这个插件在 `vscode` 中进行 `debugger` 调试。

## 安装插件

- 在 `vscode` 中安装这个扩展。

<img class="zoom" width="600" src="~@img/vscode_1.jpg"/>

## 开启 sourceMap

- 如果你是使用 `vue-cli3.x+` 以上脚手架构建的项目，需要在 `vue.config.js` 中配置。

```js
configureWebpack: {
  devtool: 'source-map';
}
```

- 如果你是 `低版本` 脚手架构建的项目，需要先自行设置 `source-map` 的开启。

```js
devtool: 'source-map';
```

## 配置调试

- 选择新建一个 `launch.json` 的文件，选择 `Chrome` 环境。

<img class="zoom" width="800" src="~@img/vscode_2.jpg"/>

- 然后将生成的 `launch.json` 的配置内容改为如下：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Panda-mall debugger",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": false,
      "sourceMapPathOverrides": {
        "webpack:///./*": "${webRoot}/*",
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## 启动调试

- 我们在任意位置打个断点测试一下（如下图的`51`行）。

- 当你点击那个绿色的 `play` 按钮启动调试的时候，会自动在浏览器中打开 `http://localhost:8080` 实例，然后`vscode` 中设置的断点就被命中了。

<img class="zoom" width="800" src="~@img/vscode_3.jpg"/>

- 同样，浏览器中也会处于断点调试的状态。

<img class="zoom" width="800" src="~@img/vscode_4.jpg"/>

## 参考

- [https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)
