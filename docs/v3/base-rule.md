# 开发规范

安装配置 `eslint + prettier` 保存时自动根据规则格式化代码以及代码错误的校检和提示。

## Eslint 配置

### 安装

- 使用脚手架构建一个新的 `vue` 项目的时候，默认使用 `eslint + prettier` 来初始化项目。

<img width="600" class="zoom" src="~@img/rules_1.png"/>

- 如果项目中没有安装，那就手动安装一下。[-->Eslint 官网](https://github.com/eslint/eslint)

```bash
$ npm install eslint -D
```

- 在 `vscode` 中安装 `eslint` 扩展，使用其它 IDE 编辑器自行搜索安装即可。

<img class="zoom" src="~@img/mall_eslint_2.jpg" alt="eslint扩展"/>

### 配置 eslint

- 然后在[.eslintrc.js](https://github.com/Ewall1106/mall/blob/master/.eslintrc.js)中可以配置你的规则，在我们脚手架初始化项目的时候，这些东西都已经默认生成好了。

- 你可以根据自己的喜好自己去配置`rules`。（一般不用修改，使用默认的就好）

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
```

- 在[.eslintignore](https://github.com/Ewall1106/mall/blob/master/.eslintignore)中可以设置你要忽略的文件：

```js
build/*.js
src/assets
public
dist
```

## Prettier 配置

- 在 `vscode` 中安装 `prettier` 插件。

- 新建 [.prettierrc](https://github.com/Ewall1106/mall/blob/master/.prettierrc) 配置文件，配置一下代码的风格。

- 更多配置参见官网：[Options](https://prettier.io/docs/en/options.html)

```json
{
  "printWidth": 80, // 一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 2, // 间隔tab代表几个空格数
  "semi": false, // 是否行位添加分号
  "singleQuote": true, // 是否使用单引号
  "bracketSpacing": true, // 对象的括号之间是否空格，如{ foo: 123 }
  "trailingComma": "none", // 是否使用尾逗号
  "arrowParens": "avoid" // 设置always如(x) => x 设置avoid如x => x
}
```

- 最后新建 `.vscode` 文件，设置在保存的时候就自动格式化代码。

```json
{
  "editor.formatOnSave": true
}
```

- 当你完成了如上所有的配置以后，当你`command+s（ctrl+s）`点击保存的时候，便会自动格式化代码风格。

<img width="500" class="zoom" src="~@img/mall_eslint_4.gif"/>
