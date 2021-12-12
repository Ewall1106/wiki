# 设置 keep-alive 按需缓存

## 啥是 keep-alive？

- 就是**缓存**，我们还是来看看具体的使用场景。

- 首先简单一点，第一种比较普遍的场景，当我们从`首页`-->`列表页`-->`商详页`-->`再返回`，这时候列表页应该是需要`keep-alive`的。

- 然后第二种，当我们从`首页`-->`列表页`-->`商详页`-->`返回到列表页(需要缓存)`-->`返回到首页(需要缓存)`-->`再次进入列表页(不需要缓存)`，这时候就是按需来控制页面的`keep-alive`了。

<img src="~@img/keep-alive.gif">

- 下面我们来说说在`vue`中如何具体实现，我会说两种方式。

## meta 路由元信息

### 介绍

- 第一种就是使用 `vue-router` 提供的 `meta` 对象，给需要缓存如首页、列表页、商详等添加一个字段，用来判断用户是前进还是后退以及是否需要 `keep-alive`

- 文章推荐：[-->vue 路由按需 keep-alive](https://juejin.im/post/5cdcbae9e51d454759351d84)

### 实现

- 首先我们需要在[router.js](https://github.com/Ewall1106/mall/blob/master/src/router/index.js)的`meta`对象里定义两个值：
  1. `keepAlive`：这个路由是否需要缓存
  2. `deepth`：深度，也就是页面之间的前进后退的层次关系

```js
  // 首页
  {
    path: '*',
    name: 'Home',
    // 路由懒加载：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
    // webpackPreload：https://www.jianshu.com/p/bbdcfeee7fbc
    component: () => import(/* webpackPreload: true */ '@/views/home'),
    meta: {
      keepAlive: true,
      deepth: 1
    }
  },
  // 商品列表
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/product'),
    meta: {
      keepAlive: true,
      deepth: 2
    }
  },
  // 商品详情
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail'),
    meta: {
      keepAlive: true,
      deepth: 3
    }
  },
```

- 然后我们在[app.vue](https://github.com/Ewall1106/mall/blob/master/src/App.vue)中根据 meta 对象定义一下：

```html
<template>
  <div id="app">
    <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
```

- 最后我们需要实时的监听路由：

```js
export default {
  data() {
    return {
      include: [],
    };
  },
  watch: {
    $route(to, from) {
      // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退：
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    },
  },
};
```

- 上面这个就实现的主要步骤，一共其实就两步：`设置meta`、`监听路由并判断`。

- 这里一定要注意的是：**你的路由中定义的 name 和页面中定义的 name 一定要全等，并区分大小写！！！**

```js
 // router.js
{
    path: '*',
    name: 'Home', // name要大小写要一致
    component: () => import(/ '@/views/home'),
    meta: {
      keepAlive: true,
      deepth: 1
    }
}

// home.vue
export default {
    name: 'Home', // name要大小写要一致
}
```

## Hack 手法

### 问题

- 从上面我们可以看到，其实设置起来还是挺严格的，就拿`name`一致来说，如果团队里面大家**从一开始**就都统一了规范那还好说，但是往往大家就`name`保持一致这个就可能很难。

### 实现

- 所以我们可以这样设置，首先我们肯定还是要利用`meta.keeAlive`字段来进行判断的，但是不用定义`deepth`深度了。

```js
  // 首页
  {
    path: '*',
    name: 'Home',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: true
    }
  },
  // 商品列表
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/product'),
    meta: {
      keepAlive: true
    }
  },
  // 商品详情
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/views/detail'),
    meta: {
      keepAlive: true
    }
  },
```

- 进入到[app.vue](https://github.com/Ewall1106/mall/blob/master/src/App.vue)页面中我们为`<router-view>`添加一个`key`，这个`key`就像是我们使用`v-for`循环所定义的一样，大家都知道，`key`的作用就是一个标识对吧，作用于`vue`在虚拟 dom 进行`diff`算法，提高渲染效率。

```html
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key" />
  </div>
</template>

<script>
  export default {
    computed: {
      key() {
        return this.$route.fullPath;
      },
    },
  };
</script>
```

- 然后我们对其需要强制刷新的页面参数里加个时间戳，这样就可以实现按需`keep-alive`了。

```js
  onClick() {
      this.$router.push({
        path: '/product',
        query: {
          t: +new Date()
        }
      })
  }
```

## 小结

- 两者相比，我觉得可能第二种更加的实用，比一种简单，但是更丑，因为会带串时间戳字符串如：`http://localhost:8081/#/product?t=1585898137794`

- 第一种算是比较完美，其实设置起来也不难，只是对团队人员的规范性要求比较高。

- 我们[panda-mall](https://github.com/Ewall1106/mall)项目中使用第二种方案,大家可以根据自己的需求任意选择一种方案。
