# 过滤器 vue.filters

::: warning 警告
`Vue3` 移除了 `filters`，官方建议使用方法或者计算属性来实现过滤。
:::

## 全局方法

- 写项目的时候，有一些方法我们是需要全局使用的，比如数字的四色五入保留小数点啊、一些工具方法、字符的格式化啊等等。这些很多页面需要用的、使用频率极高的方法，我们一般会将其封装为全局的方法。

- 封装一个全局方法有这么几种方式：

### 挂载到 `vue.prototype`

- 在`main.js`入口文件中挂载到`vue.prototype`，如我们封装一个获取时间戳的函数。

```js
Vue.prototype.now =
  Date.now ||
  function() {
    return new Date().getTime();
  };
```

- 然后就可以在`.vue`页面中使用了

```html
<script>
  export default {
    mounted() {
      console.log('now:' + this.now());
    },
  };
</script>
```

### 全局混入 `mixins`

- 同样也还是在`main.js`中。

- `mixins`的全局注入规则大家应该都懂，如果组件中没有这个`getTime`方法，那么就会在页面中注入这个方法。

```js
Vue.mixin({
  data() {},
  methods: {
    getTime() {
      return new Date().getTime();
    },
  },
});
new App({
  el: '#app',
  // ...
});
```

## 关于 vue.filters

### 问题

- 前面两种方法弊端有很多，比如一般将全局变量挂载到`prototype`总是不太好的，状态管理我们用`vuex`；第二个全局混入的话，子组件中也会混入这些方法等等；最大的弊端就是代码的可读性和维护问题，如果项目体积大了，复用的方法多了，总不能都挂到`prototye`上去对吧？

- 这个时候，`vue.filters`过滤器就能够较好的解决这个问题。

### 使用

- 先看一波官网[-->传送门](https://cn.vuejs.org/v2/guide/filters.html)

- ok，看完了，基本了解了过滤器的概念和基本使用方式以后，我们具体到项目中的使用。

- 新建一个`filters`文件夹，丢一行代码（很常用的一行代码，就是对数字做一些四舍五入的处理）

<img class="zoom" src="~@img/vue-filters.png" />

- `main.js`中引入

```js
// global filters
import Vue from 'vue';
import * as filters from '@/filters';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
```

- 然后页面中就可以使用了。

```html
<div>{{num | formatAmountFixed2}}</div>

<script>
  data(){
      return {
          num: 11111
      }
  }
</script>
```
