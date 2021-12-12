# axios 封装及使用

引入下 `axios`，然后对 `axios` 做下基本的封装。

## 安装

```
$ npm install axios --save
```

## 基本封装

- 我们简单的在`src/utils/request.js`文件中简单的进行了一下[axios 封装](https://github.com/Ewall1106/mall/blob/master/src/utils/request.js)。

```javascript
import axios from 'axios';
import { Toast, Dialog } from 'vant';

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 这里做些发送请求前的事情
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 与后端约定的错误码
    if (res.code !== 200) {
      Toast.fail(res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    console.log('err' + error);
    Toast.fail(error.message);
    return Promise.reject(error);
  }
);

export default service;
```

## 环境区分

### 使用 vue 中的模式

- 对于环境的不同判断，比如**开发环境**、**测试环境**、**灰度环境**、**线上环境**等等，在`@vue/cli3.x`以上的脚手架中，通过新建一个`.env.[xxx]`的文件来维护[-->环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

```javascript
// .env.development
# base api
VUE_APP_BASE_API = '/dev-api'
```

```javascript
// .env.production
# base api
VUE_APP_BASE_API = '/prod-api'
```

- 然后我们就可以使用 `process.env.VUE_APP_BASE_API` 来取到不同环境下的所定义的值。

### 使用 cross-env 包

- 就为了区分一下环境，却需要在主目录下根据环境新建多个`.env.[xxx]`的文件，为了使主目录看起来更加简洁一点，所以项目中使用了 [cross-env](https://www.npmjs.com/package/cross-env#usage) 这个包来区分环境。

- 安装它：

```bash
$ npm install cross-env --save-dev
```

- 在 `package.json` 中配置 `scripts` 脚本命令的时候指定一下环境。

```json
"scripts": {
  "build": "cross-env NODE_ENV=production vue-cli-service build",
  "dev": "cross-env NODE_ENV=development vue-cli-service serve",
}
```

- 然后我们就可以使用 `process.env.NODE_ENV` 来取到不同环境下的所定义的值。

## 接口调用

- 以我们首页中获取 banner 数据为例，首先我们新建了一个`src/api`文件夹用于维护接口，在该文件夹下定义了一个[getBanner](https://github.com/Ewall1106/mall/blob/master/src/api/home.js)请求方法：

```js
import request from '@/utils/request';

export function getBanner() {
  return request({
    url: '/home/banner',
    method: 'get',
  });
}
```

- 然后我们在首页[home.vue](https://github.com/Ewall1106/mall/blob/master/src/views/home/index.vue)中引入并使用它：

```js
import { getBanner } from '@/api/home'

getBanner() {
  getBanner().then(res => {
    console.log('get banner data', res)
  })
}
```

## 取消请求

### 有什么用？

- 当用户频繁点击在短时间内发送多个 `ajax` 请求，但是由于网络原因服务器数据无法及时响应返回，这时候，就会有可能造成前端页面数据不匹配的情况。

- 具体场景来说，在用户网速不好的情况下的比如搜索框 `onchange` 事件的模糊搜索、触底刷新请求列表数据、`tab` 栏的高频切换等等。

- 再者，这样也浪费服务器资源，也是性能优化的一种必要手段。

### 基本使用

- 官网地址：[Axios-CancelToken](https://github.com/axios/axios#cancellation)

- 官网的基本示例如下。

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});

// cancel the request
cancel();
```

### 具体使用

- 利用 `axios` 的拦截器，在请求拦截的时候将当前 `request url` 和 `取消函数c` 以 `key-value` 的形式保存下来。

- 在响应拦截器时将这个 `key` 删除，如果重复请求了就会调用取消请求函数。

```js
// https://github.com/Ewall1106/mall/blob/master/src/utils/request.js
import axios from 'axios';

const CancelToken = axios.CancelToken;
const pendingReq = {};

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 取消请求
      const key = config.url + '&' + config.method;
      pendingReq[key] && pendingReq[key]('操作太频繁了~');
      config.cancelToken = new CancelToken((c) => {
        pendingReq[key] = c;
      });
      // ...
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 取消请求
    const key = response.config.url + '&' + response.config.method;
    pendingReq[key] && delete pendingReq[key];

    // ...
  },
  (error) => {
    console.log('err' + error);
    Toast.fail(error.message);
    return Promise.reject(error);
  }
);

export default service;
```
