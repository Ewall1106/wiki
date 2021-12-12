# Charles

抓包与真机调试工具。

## 安装

- 进入官网[下载](https://www.charlesproxy.com/download/)你电脑所对应的版本。
- 网盘下载：[charles-v4.5.6-破解版](https://pan.baidu.com/s/19W73305KuaufZ0IyHlw0ww) 密码：`q1tt`
- 下载好了按照提示安装即可（有能力还是支持正版吧）。

## 代理配置

- 打开 `Charles` 安装客户端证书。

<img class="zoom" width="650" src="~@img/charles_1.jpg" />

- 点击 `install` 后会弹出钥匙串，并其证书设置为信任：

<img class="zoom" width="650" src="~@img/charles_2.jpg" />

- 设置代理的`端口号`。

> ⚠️ 不能被电脑上的其它应用占用该端口号

<img class="zoom" width="650" src="~@img/charles_3.jpg" />

## 抓包地址设置

- 这里主要就是通过添加 `ip地址`+`端口号` 告诉 `charles` 需要抓包的地址。
  - 比如我这里 `172.172.1.36` 就是需要抓包的地址。
  - 使用 `*` 通配符表示抓所有端口。

<img class="zoom" width="650" src="~@img/charles_4.jpg" />

- 点击 `add` 添加一个你所需要抓包的地址。
  - 可以都填 `*` 通配符，这样就表示抓所有的域名和端口。

<img class="zoom" width="400" src="~@img/charles_5.jpg" />

## 移动端证书配置

- 需要在手机端配置证书，这样 `charles` 才有权力去抓取你手机的数据。

- 在 `Help` - `SSL Proxying` 中下载移动端的证书：

<img class="zoom" width="650" src="~@img/charles_6.jpg" />
<br/>
<img class="zoom" width="650" src="~@img/charles_7.jpg" />

- 打开手机，先在浏览器中输入 `chls.pro/ssl` 下载好证书。

- 然后在 `Wi-Fi` 那里配置代理。
  - 先下载证书然后设置手机代理
  - 安卓、IOS 设置都差不多

<img class="zoom" width="350" src="~@img/charles_8.jpg" />

## 抓包演示

- 当你设置好 `wi-fi` 代理之后，点击 `保存` 按钮，桌面 `Charles` 工具就会弹出一个确认框，我们选择 `Allow`：

<img class="zoom" width="650" src="~@img/charles_9.jpg" />

- 然后我们在手机浏览器中输入一个网址，以 `baidu.com` 为例，就可以看到各种抓包数据了。

<img class="zoom" width="650" src="~@img/charles_10.jpg" />

- 可以用这个工具来做很多事情，大家自行去探索吧，如：
  - 模拟慢速网络
  - 修改网络请求参数
  - 修改服务器的返回内容

## 手机调试

- 我们也可以用这个工具来进行手机页面的调试。

- 比如我们将`panda-mall`项目跑起来，然后在手机浏览器中输入这个链接就可以访问了。

<img class="zoom" width="350" src="~@img/charles_11.jpg" />
<br/>
<img class="zoom" width="350" src="~@img/charles_12.jpg" />
