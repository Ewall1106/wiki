# 数据 mock

## 关于 yapi

- `yapi`就是一个接口管理平台了，顺带做些数据 mock。

- [官方地址](https://github.com/ymfe/yapi)

## 简单使用

- 怎么用看 `yapi` 文档，官方文档还是讲的比较清晰的，我这里就以项目中使用了的来举几个列子。

- 登录注册一个账号以后，你可以创建一些分类，对接口分门别类，这样的话就比较清晰，也利于维护。

![界面概览](~@img/mall_yapi_1.jpg)

- 然后可以去新建一个接口，点击编辑什么的就可以定义你所返回的数据了，以我们项目中的`获取用户信息`为例。

![新建接口](~@img/mall_yapi_2.jpg)

## 高级 mock

- 一般我不用`普通mock`来进行编写，因为太繁琐了，还要一个个去输入框里输入，所以基本上我们 `panda-mall` 项目中在 yapi 上的 mock 都是使用的`高级mock`功能。

- 还是以我们的`获取用户信息`这个接口为例，让我们进入`高级mock`这个 tab 栏中，输入：

![高级mock](~@img/mall_yapi_3.jpg)

- 就是这么简单，`mockJson`就是定义的我们请求返回的数据，看看官网的 `yapi` 的 [高级 mock 的教程](https://hellosean1025.github.io/yapi/documents/adv_mock.html)。

- 因为`高级mock`用的是[mockJS](https://github.com/nuysoft/Mock/wiki)的语法，所以可以满足数据 mock 的很多需求，如实现分页啊、随机数、时间戳啊等等。

## mock 优先级

- 对于一个接口，如果既定义了`普通mock`，又定义了`高级mock`，那么优先级呢？

- 请求 Mock 数据时，规则匹配优先级：**Mock 期望 > 自定义 Mock 脚本 > 项目全局 mock 脚本 > 普通 Mock**。

- **如果前面匹配到 Mock 数据，后面 Mock 则不返回**。
