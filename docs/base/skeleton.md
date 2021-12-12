# 骨架屏及首屏渲染

为了提升下用户体验，讲下项目中这个骨架屏的处理吧。

## 关于骨架屏

- 骨架屏就是可以由原来的在尚未加载前**转圈圈**变成先给用户展示出**页面的大致结构**，这样可以让用户有个更好的体验感。

- 把网速调低点，以我们的[mall 项目](https://github.com/Ewall1106/mall)的首页加载为例：

| 前                        | 后                        |
| ------------------------- | ------------------------- |
| ![](~@img/mall_skeleton_1.jpg) | ![](~@img/mall_skeleton_2.jpg) |

## 实现方式

### 1. 直接使用图片

- 就是直接麻烦设计切张图片，控制这张图片的隐藏和显示。

### 2. 饿了吗方案

- 第 2 种就是使用饿了吗的[page-skeleton-webpack-plugin](https://github.com/ElemeFE/page-skeleton-webpack-plugin/blob/master/docs/i18n/zh_cn.md)这个插件。我在项目首页中用了一下，效果不太理想，不知道是不是首页的元素太多了。

- 它的配置还是比较简简单的的，但是项目很久没维护了，还是有坑，你可以按照这篇文章的步骤**一步步**自己试一下[-->参考](https://segmentfault.com/a/1190000020416483)。

### 3. ssr 渲染

- 第三种方案就是一种 ssr 的思路，使用的是`vue-server-renderer`这个插件。
- 我们知道 vue 在渲染好后会挂载到指定的`#app`这个元素上，这个方案就是先生成一个骨架屏的样式文件，在`#app`中先占个位，达到在 vue 未挂载前有一个过渡效果。

```html
<div id="app">
  <!--vue-ssr-outlet-->
</div>
```

```javascript
// main.js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

- [vue 页面骨架屏](https://segmentfault.com/a/1190000014963269?utm_source=channel-hottest)这篇文章也讲的很清楚，我也是参考它试了一下，但是也是有问题。比如文章底部的这个提问：
  ![问题](~@img/mall_skeleton_3.jpg)

- 我们的`vue`挂载到了`#app`上面的这个渲染时间不是我们要解决目的所在，只是因为网络问题数据迟迟没到所以造成页面不完整，所以需要骨架屏。不知道看到这里的看官对这个方案有没有什么好的解决办法。

### 4. 借助 Puppeteer 自动生成骨架屏

- 这个是利用 chrome 的[puppeteer](https://github.com/puppeteer/puppeteer)来获取页面的 DOM 结构，然后来生成骨架屏。考拉就是利用的这个方案，[-->详见](https://zhuanlan.zhihu.com/p/114362353)。
- 当你看完了以后，你就会发现最后也是生成一张`base64`为的图片做替换而已，还挺麻烦的，再个是 puppeteer 我不会啊。

### 5. vue-content-loader 库

- 最后，我们[mall](https://github.com/Ewall1106/mall)项目中还是使用了这个比较简单直接的方案。第`5`种其实就是第 1 种的衍生，使用[vue-content-loader](https://github.com/egoist/vue-content-loader)这个插件自己按照设计稿画出一个大致的`svg`图，然后控制其显示隐藏。

## 具体实现

- 先安装下这个吧：

```bash
$ sudo npm install vue-content-loader -S

# 切换镜像以后还是报错？
$ sudo npm install --unsafe-perm vue-content-loader -S
```

- 以首页为例，你可以参考设计稿把大概的轮廓画出就可以了。[-->Skeleton.vue](https://github.com/Ewall1106/mall/blob/master/src/views/home/modules/Skeleton.vue)

- 然后讲下如何控制它的显示与隐藏达到最好的一个首屏展示效果。

## 首屏渲染

- 以我们项目中的[首页](https://github.com/Ewall1106/mall/blob/master/src/views/home/index.vue)的为例，一共有从上到下一共四个区域：`轮播图`、`金刚区`、`精选会场`、`推荐列表`。

- 由于前三个区域是用户直接可见的，所以前三项的数据请求优先于最后一项，所以我们使用`promise`保证一下优先级以及骨架屏的隐藏显示。

```javascript
mounted() {
    Promise.all([this.getBanner(), this.getCategory(), this.getSession()])
      .then(() => {
        this.isSkeletonShow = false
        this.getGoodsList()
      })
}
```

- 使用`preloading`加载将首页路由的优先级提高一下：

```javascript
const routes = [
  {
    path: "*",
    name: "Home",
    component: () => import(/* webpackPreload: true */ "@/views/home")
  }
];
```

- 最后我们把接口返回数据的时间 delay，网速调低，刷新首页后看到其实效果还可以：

![骨架屏效果](~@img/mall_skeleton_4.gif)

## 小结

- 综上所述，目前我能想到的骨架屏解决方案就是这样的了，`mall`项目中也是这样写的，麻烦的地方就是需要骨架屏的页面都需要自己去定位然后写下骨架屏，不够自动化，但是我觉得也还好吧，其实一个项目中几个主要的页面走下骨架屏就行了，并不需要每个页面都骨架屏。

- 但是不管怎样，这都是我的一种解决方案吧，不够自动化确实是它的缺点，但从结果上和产出投入比来看，我觉得可以。
