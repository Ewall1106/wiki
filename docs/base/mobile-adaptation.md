# 移动端适配

目前移动端的适配方案一般就是两种，一个是 `rem` 方案，一个就是 `vw` 的方案。

## vw 方案

### 安装

- 要实现使用 `vw` 来实现移动端的适配，我们首先需要安装 [postcss](https://postcss.org/) 这个工具。

- 因为我们使用 `webpack` 来作为打包工具，所以还需要安装官方提供的 [postcss-loader](https://github.com/webpack-contrib/postcss-loader) ，但是由于我们的项目是用最新的 `vue-cli4.x` 来构建了，初始化项目内部默认就安装了它，所以这一步可以省略。

```bash
$ npm install postcss -D
```

- 安装 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 这个插件，它可以将我们设置`px`值自动转化为相应的`vw`、`vh`之类的值。

```bash
$ npm install postcss-px-to-viewport --D
```

### 配置

- 新建一个[postcss.config.js](https://github.com/Ewall1106/mall/blob/master/postcss.config.js)来配置转换规则。关于各参数的含义：[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)。

```javascript
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 3,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    },
  },
};
```

- 然后因为是移动端的网页，所以我们应该在 `public/index.html` 中添加 `meta` 元信息标签禁止用户缩放页面。

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
/>
```

## rem 方案

::: tip 提示
不推荐使用！
:::

- 一般是使用手淘的[lib-flexible.js](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Famfe%2Flib-flexible)，但是这个作为一种过渡方案已经被废弃了，目前已**不推荐**在你的新项目中使用这个方案来解决手机适配问题。

- 实现方案移步[-->手机适配问题之 rem 和 lib-flexible](https://www.jianshu.com/p/6edffcd890e9)来解决手机适配问题。
