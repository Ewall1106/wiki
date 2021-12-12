# 样式处理

在用脚手架初始化一个项目以后，我们还需要根据我们的项目来进行一些样式相关的基本处理。

## 浏览器默认样式

- 大家都知道各个浏览器的默认样式都有一定的差异性，而我们需要抹掉这部分的差异，引入 [normalize.css](https://github.com/Ewall1106/mall/blob/master/src/styles/normalize.scss) 抹平个浏览器中标签样式的差异性。

- `normalize.css` 只是在浏览器的样式差异上打了几个补丁来抹平这些差异，所以我们还是需要添加了一份[reset.css](https://github.com/Ewall1106/mall/blob/master/src/styles/reset.scss)样式来对其进行补充。

- 对于浏览器默认样式的这部分处理，我们先用 `normalize.css` 来抹平各浏览器的差异，然后使用一份 `reset.css` 定制化的对其进行相应的处理。

## css 预编译

### 使用 dart-sass

- 使用 `vue-cli` 脚手架初始化项目的时候选择使用 `dart-sass`，不要使用 `node-sass` 这种模式，不然会有很多奇怪的难以安装的问题。

- 如果正在使用 `node-sass` 的项目，那么可以卸载掉 `node-sass`，然后安装 `dart-sass`。

```bash
$ npm uninstall node-sass
$ npm install sass -D
```

- **请注意**：使用 `dart-sass` 之后，项目中对于深度处理器 `/deep/`的这种用法就不支持了，要改为 `::v-deep` 的写法。

```css
/* 不可用 */
.a {
  /deep/ {
    .b {
      color: red;
    }
  }
}

/* 要改为 */
.a {
  ::v-deep {
    .b {
      color: red;
    }
  }
}
```

### 使用 node-sass

::: warning 注意
推荐使用上面的 dart-sass 模式。
:::

```bash
# 安装sass
$ npm install node-sass sass-loader -D
```

- 安装 `sass` 可能你会遇到点问题，老是安装不上？按下列步骤排查一下：

  1. 有可能是网络问题，使用淘宝镜像处理一下；
  2. mac 用户`sudo`一下试试；
  3. `node-sass`还是安装不上，切换淘宝镜像源啊什么的都不行，那么试下这行命令。[-->相关 issue](https://github.com/sass/node-sass/issues/2824)

```bash
$ sudo npm i --unsafe-perm node-sass -D
```

## 1px 边框问题

- 产生的原因：

  - 因为一个东西--`DPR(DevicePixelRatio)`称`设备像素比`，是一个`手机物理像素 /CSS像素`的比值。
  - 但是自从 retina 屏以来，不同的手机有不同的像素密度，css 中的`1px`并不等于移动设备中的`1px`， 最直接的表现就是 `1px` 边框问题；简单说就是你给 border 的 css 写个`1px`，到手机上却变粗了显示成`2px`。

- 很多文章的解决办法都是用`postcss-write-svg`这个插件来处理这个问题，其实不太好用额，网上搜了下，觉得这篇文章讲的比较 ok，其中比较推荐使用伪元素来解决这个问题：[-->移动端 1px 解决方案](https://juejin.im/post/5d19b729f265da1bb2774865#heading-0)。

```css
/* 设置上边框 */
.setOnePx {
  position: relative;
  &::after {
    position: absolute;
    content: '';
    background-color: #e5e5e5;
    display: block;
    width: 100%;
    height: 1px;
    transform: scale(1, 0.5);
    top: 0;
    left: 0;
  }
}
```

- 本项目中默认使用`vant`组件库，所以可以使用 vant 团队提供的[1px 边框解决方案](https://youzan.github.io/vant/#/zh-CN/style#1px-bian-kuang)。

```html
<!-- 为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。-->
<!-- 上边框 -->
<div class="van-hairline--top"></div>

<!-- 下边框 -->
<div class="van-hairline--bottom"></div>

<!-- 左边框 -->
<div class="van-hairline--left"></div>

<!-- 右边框 -->
<div class="van-hairline--right"></div>

<!-- 上下边框 -->
<div class="van-hairline--top-bottom"></div>

<!-- 全边框 -->
<div class="van-hairline--surround"></div>
```
