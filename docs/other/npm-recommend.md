# 常用的 npm 包

总结记录一些常用的 `npm` 包。

## 工具

### [nrm](https://www.npmjs.com/package/nrm)

- npm 源管理器。

```bash
# 安装
$ npm install -g nrm
```

```bash
# 源列表
$ nrm ls

* npm -----  https://registry.npmjs.org/
  yarn ----- https://registry.yarnpkg.com
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/

# 切换源
$ nrm use taobao

# 添加源
$ nrm add xxx
```

### [yrm](https://www.npmjs.com/package/yrm)

- yarn 源管理器。
- 跟上面的 nrm 同理，用来管理使用 yarn 时的源，使用方式也一致。

### [dayjs](https://www.npmjs.com/package/dayjs)

- 时间日期处理工具，小巧。

### ~~[moment](https://www.npmjs.com/package/moment)~~

- 时间日期处理工具（官方已经不维护，推荐使用 `dayjs`）

### [uuid](https://www.npmjs.com/package/uuid)

- 生成一个唯一的标识码。

```js
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

### ~~[shortid](https://www.npmjs.com/package/shortid)~~

- **官方不推荐使用，推荐使用 `nanoid`**

- 生成无序的、较短的唯一 ID，比起 `uuid` 来说 id 更短，更适合做`用户id`之类的生成。

```bash
# 安装
$ npm i shortid --save
```

- 基本用法：

```js
const shortid = require('shortid');
console.log(shortid.generate()); // PPBqWA9
```

### [nanoid](https://github.com/ai/nanoid/)

- 也是生成一串无须友好的 ID

```js
import { nanoid } from 'nanoid';
model.id = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
```

- 可以自定义生成，如果有时候我们 `用户ID` 就想用纯数字表示。

```js
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 6);
nanoid(); //=> "436744"
```

### [qs](https://www.npmjs.com/package/qs)

- 可将 `URL` 解析成对象的形式，也可将对象序列化成 `URL` 的形式。

```js
const qs = require('qs');
let url = 'a=1&b=2&c=3';
console.log(qs.parse(url));
// {
//   a:1,
//   b:2,
//   c:3,
// }

const obj = {
  a: 1,
  b: 2,
  c: 3,
};
console.log(qs.stringify(obj)); // 'a=1&b=2&c=3'
```

### [bcrypt](https://www.npmjs.com/package/bcrypt)

- 一个可以对密码进行加密的库。

```bash
$ npm install bcrypt
```

- 基本使用：

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;
// 对密码进行加密
const hash = bcrypt.hashSync(123456, saltRounds); // $2b$05$osLNYg3W...
// 密码相等比较
bcrypt.compareSync(123456, hash); // true/false
```

### [husky](https://www.npmjs.com/package/husky)

- 一个 git 钩子库，可以让你在提交代码前或者其他时期做写操作。

### [inquirer.js](https://www.npmjs.com/package/inquirer)

- 提供一些交互的命令行，给用户提供了一个漂亮的界面和提出问题流的方式。

- 简单使用：

```js
const inquirer = require('inquirer');

const promptList = [
  {
    type: 'input',
    message: '请输入数据库名字',
    name: 'name',
  },
  {
    type: 'input',
    message: '年龄',
    name: 'age',
  },
];

inquirer.prompt(promptList).then((answers) => {
  console.log(answers);
});
```

### [commander](https://www.npmjs.com/package/commander)

- 帮我们简化命令行的开发的一个工具包。

- 简单使用：

```js
#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

program.version(require('../package.json').version);

program
  .command('init <name>')
  .description('init project')
  .action(require(path.resolve(__dirname, '../lib/init.js')));

program.parse(process.argv);
```

- 当我们开发一个脚手架工具时，`commander` 和 `inquirer` 一般是两个用来实现功能的常用包。

### [shelljs](https://www.npmjs.com/package/shelljs)

- 可以让我们在代码中编写 `shell` 命令并执行。

- 基本使用：

```js
const shell = require('shelljs');

shell.exec('npm run dev');
```

## 前端相关

### [fastclick](https://www.npmjs.com/package/fastclick)

- 解决移动端点击延迟的问题。

### [driverjs](https://github.com/kamranahmedse/driver.js)

- 可以实现页面的分步引导效果。

### [classnames](https://github.com/JedWatson/classnames)

- 一个简单的 `JS` 工具库，可以有条件地将 `className` 连接在一起。

```bash
# 安装
$ yarn add classnames
# typescript支持
$ yarn add @types/classnames
```

## Node 服务

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)：`JWT` 鉴权库。


execa