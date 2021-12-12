# better-scroll 滑动

实现手淘金刚区类目列表的 `scroll` 滑动效果，我也不知道这种 css 效果的专业术语是什么，就先这么叫吧。

## 前言

- 在 h5 开发的过程中，轮播图下面放个类目的 list（产品术语叫金刚区）是电商产品中很常见的布局，以前都是一行或两行排完，但是随着类目越来越多，出现了这么几种设计：

  - 1、最后一个类目为查看更多，点击跳转去一个新的页面；
  - 2、用 `swiper` 包裹，将多个类目当轮播图展示；
  - 3、类目 `scroll` 可滑动展示。最后一种展现设计方式出现的最晚，也是现在较为主流的展现方式，所以今天我们来实现下。

- 我们借助[better-scroll 库](https://better-scroll.github.io/docs/zh-CN/guide/)来实现，先看看手淘的效果：

![手淘](~@img/mall_scroll_1.gif)

## BetterScroll

- [better-scroll 库](https://better-scroll.github.io/docs/zh-CN/guide/)是一个很优秀的库，在作者 `2.0` 的版本中，我们实现一个基本的滚动只需引入它的核心滚动，体积也很小。更多可以去官网看看。

- 安装一下：

```bash
$ npm install @better-scroll/core@next --save
```

## 实现

- 实现效果其实很简单，利用`better-scroll`暴露出的两个特性、`translateX`、`Math`对象：

  - [maxScrollX](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#maxscrollx)：最大横向滚动位置，也就是整个宽度的大小，offsetLeft 的感觉。
  - [scroll](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#on-type-fn-context)：监听 scroll 的方法，告诉你滚到哪里了。
  - `translateX`：定义 X 轴的值，这里我们用百分比。
  - `Math.abs`：将负数转为正数

- 用 `better-scroll` 提供的方法计算出目前列表滚动位置占整个宽度的百分比比，然后赋予 `translateX`，就可以实现两者实时的同步滚动了。代码：

```vue
<template>
  <div class="home-category">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content" ref="test">
        <div class="scroll-item" v-for="(item, index) in cateList" :key="index">
          <p class="text">{{ item }}</p>
        </div>
      </div>
    </div>
    <div class="dot-wrapper">
      <div class="dot" :style="{ transform: `translateX(${rate})` }"></div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';

export default {
  data() {
    return {
      rate: 0,
      cateList: [1, 2, 3, 4, 5, 6, 7],
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        click: true,
        probeType: 3, // listening scroll hook
      });

      const totalX = Math.abs(this.bs.maxScrollX);

      this._registerHooks(['scroll'], (pos) => {
        const currentX = Math.abs(pos.x);
        this.rate = `${Number((currentX / totalX) * 100).toFixed(2)}%`;
      });
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.bs.on(name, handler);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-category {
  .scroll-wrapper {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
  .scroll-content {
    display: inline-block;
    .scroll-item {
      // box-sizing: content-box;
      height: 50px;
      font-size: 24px;
      display: inline-block;
      text-align: center;
      background: red;
      padding: 0 32px;
      line-height: 50px;
      margin: 0 10px;
      .text {
        width: 88px;
      }
    }
  }
  .dot-wrapper {
    width: 80px;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
    .dot {
      box-sizing: border-box;
      width: 40px;
      height: 4px;
      background: #f96c1d;
      transition: all 0.4s linear;
    }
  }
}
</style>
```

## 小结

- 最后看看我们的实现效果，大致框架就是如此，效果自由发挥吧：

![效果](~@img/mall_scroll_2.gif)

- 我们 panda-mall 首页中也使用了这个常见的布局方式[-->首页分类 icon 滑动](https://github.com/Ewall1106/mall/blob/master/src/views/home/index.vue)
