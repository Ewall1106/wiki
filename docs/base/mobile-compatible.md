# 浏览器兼容

在移动端上一些兼容及降级的处理。

## FastClick 处理

- [fast-click](https://github.com/ftlabs/fastclick) 是一个简单易用的库，它消除了移动端浏览器上的物理点击和触发一个 `click` 事件之间的 `300ms` 的延迟。

- 目的就是在不干扰你目前的逻辑的同时，让你的应用感觉不到延迟，反应更加灵敏。

- 按照官方指导，在 [public/index.html](https://github.com/Ewall1106/mall/blob/master/public/index.html) 中配置一下。

```html
<head>
  <!-- ... -->
  <script src="https://cdn.bootcdn.net/ajax/libs/fastclick/1.0.6/fastclick.min.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener(
        'DOMContentLoaded',
        function() {
          FastClick.attach(document.body);
        },
        false
      );
    }
  </script>
  <!-- ... -->
</head>
```

- 配置完成了以后在浏览器中打开，点击 `button` 按钮我们会发现控制台有报错[-->相关 issue](https://github.com/ftlabs/fastclick/issues/510)。

::: danger
Error：Unable to preventDefault inside passive event listener due to target being treated as passive.
:::

- 我们再配置一下根样式属性即可。

```css
html {
  touch-action: manipulation;
}
```

## Promise 降级

- 考虑到如果当前环境如果不支持 `promise` 的情况，那么我们也需要引入一个 `promise` 函数文件做降级处理。

```html
<!-- public/index.html -->
<!-- .... -->
<script>
  if (!window.Promise) {
    document.writeln(
      '<script src="https://cdn.bootcdn.net/ajax/libs/es6-promise/4.2.8/es6-promise.min.js"' +
        '>' +
        '<' +
        '/' +
        'script>'
    );
  }
</script>
<!-- .... -->
```

## 浏览器前缀

- 为了保存个浏览器样式的兼容，我们需要借助[Autoprefixer](https://github.com/postcss/autoprefixer)来为我们编写的 `css` 样式自动添加浏览器前缀。

- 新的 `vue-cli` 脚手架初始化生成的项目已经默认配置了此插件，如果要配置目标浏览器，可在[.browserslistrc](https://github.com/Ewall1106/mall/blob/master/.browserslistrc)中设置即可。

```
> 1%
last 2 versions
not dead
```
