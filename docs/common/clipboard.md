# 复制粘贴 Vue-clipboard

简单的文字复制粘贴的功能。

## 安装

- 地址：[Vue-clipboard2](https://github.com/Inndy/vue-clipboard2)

```bash
$ npm install vue-clipboard2  --save
```

## 使用

- `main.js`中引入，当然你也可以在单个页面中引入。

<img class="zoom" src="~@img/mall_clipboard_1.jpg" />

- 随便试试：

```html
<template>
  <button class="btn" @click="doCopy">button</button>
</template>
```

```js
doCopy() {
  this.$copyText('这里放入要粘贴的内容').then((e) => {
      // success
      console.log(e);
  }, (e) => {
      // fail
      console.log(e);
  });
}
```
