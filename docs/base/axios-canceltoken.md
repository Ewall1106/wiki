Axios 取消重复请求

## 有什么用？

- 当用户频繁点击在短时间内发送多个 `ajax` 请求，但是由于网络原因服务器数据无法及时响应返回，这时候，就会有可能造成前端页面数据不匹配的情况。

- 具体场景来说，在用户网速不好的情况下的比如搜索框 `onchange` 事件的模糊搜索、触底刷新请求列表数据、`tab` 栏的高频切换等等。

- 再者，这样也浪费服务器资源，也是性能优化的一种必要手段。

## 基本使用

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

## 具体使用

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
