# Vant 组件库

## 安装

- 按照的官网的步骤安装即可[--> vant 安装](https://www.jianshu.com/p/053daebdd866)。

```bash
$ npm i vant@next -S
```

- 如果你使用的是 `Vue2` 项目，参考官网即可。

## 按需引入

- 因为我们项目在使用 `typescript`，所以需要使用 `ts-import-plugin` 实现按需引入。

```bash
# 安装 ts-import-plugin
$ yarn add ts-import-plugin -D
```

- 在 [vue.config.js](https://github.com/Ewall1106/mall/blob/master/vue.config.js) 中配置，这样就可以在编译过程中将 `import` 的写法自动转换为按需引入的方式。

```js
// ....
chainWebpack(config) {
  config.module
    .rule('ts')
    .use('ts-loader')
    .tap(options => {
      options = merge(options, {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'vant',
              libraryDirectory: 'es',
              style: true
            })
          ]
        }),
        compilerOptions: {
          module: 'es2015'
        }
      })
      return options
    })
}
// ...
```

- 如果你项目中没有使用 typescript 的话，那么就按照官网的[教程](https://youzan.github.io/vant/#/zh-CN/quickstart#yin-ru-zu-jian)在 `babel.config.js` 中配置一下。

```javascript
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // vant引入：
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
};
```

## 统一管理

- 但在我们的项目开发中，随着按需引入的 vant 组件越来越多，所以专门在[src/components/Vant](https://github.com/Ewall1106/mall/blob/master/src/components/Vant/index.js)文件夹下维护了一份组件引入的 `js` 文件。

```ts
import { App } from 'vue';
import { Button, List, Tabbar, TabbarItem } from 'vant';

// https://vant-contrib.gitee.io/vant/v3/#/zh-CN
const plugins = [Button, List, Tabbar, TabbarItem];

export default {
  install: function(vm: App) {
    plugins.forEach((item) => {
      vm.component(item.name, item);
    });
  },
};
```

- 然后在 `main.js` 中统一引入，然后在全局任意文件中都可以使用了。

```js
import { createApp } from 'vue';
import App from './App.vue';

import vant from '@/components/Vant';

createApp(App)
  .use(vant)
  .mount('#app');
```

