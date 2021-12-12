module.exports = [
  {
    title: "基本指南",
    collapsable: false,
    sidebarDepth: 1,
    children: [
      {
        title: "介绍",
        // 默认路径：README.md
        path: "/",
      },
      {
        title: "开发规范",
        path: "/v2/base-rule",
      },
      {
        title: "样式处理",
        path: "/v2/base-styles",
      },
      {
        title: "移动端适配",
        path: "/base/mobile-adaptation",
      },
      {
        title: "浏览器兼容",
        path: "/base/mobile-compatible",
      },
      {
        title: "在vscode中调试vue",
        path: "/other/vscode-debugger",
      },
    ],
  },
  {
    title: "组件相关",
    collapsable: false,
    sidebarDepth: 1,
    children: [
      {
        title: "vant组件库",
        path: "/base/vant",
      },
      {
        title: "骨架屏",
        path: "/base/skeleton",
      },
      {
        title: "scroll滑动",
        path: "/common/scroll",
      },
      {
        title: "关于vant中的sku组件",
        path: "/other/vant-sku",
      },
    ],
  },
  {
    title: "扩展功能",
    collapsable: false,
    sidebarDepth: 1,
    children: [
      {
        title: "axios封装及使用",
        path: "/base/axios",
      },
      {
        title: "跨域与代理转发",
        path: "/base/proxy",
      },
      {
        title: "keep-alive缓存",
        path: "/base/keep-alive",
      },
      {
        title: "过滤器vue-filters",
        path: "/base/vue-filters",
      },
      {
        title: "复制粘贴",
        path: "/common/clipboard",
      },
    ],
  },
  {
    title: "其它",
    collapsable: false,
    sidebarDepth: 2,
    children: [
      {
        title: "常用的npm包推荐",
        path: "/other/npm-recommend",
      },
      {
        title: "vscode插件推荐",
        path: "/other/vscode-plugin",
      },
      {
        title: "charles抓包与调试",
        path: "/other/charles",
      },
    ],
  },
];
