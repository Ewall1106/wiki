const path = require('path');
const v2 = require('./sidebar/v2');
const v3 = require('./sidebar/v3');
// const sidebarBackend = require('./sidebar/backend');
// const sidebarTest = require('./sidebar/test');
// const sidebarVueAnalysis = require('./sidebar/vue-analysis');

module.exports = {
  title: 'Vue-H5-Template',
  description: '手把手教你搭建vue小商城',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  base: '/v2/',
  dest: '../dist/',
  markdown: {
    lineNumbers: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': path.resolve(__dirname, '../assets'),
      },
    },
  },
  plugins: [
    'vuepress-plugin-smooth-scroll',
    [
      '@vuepress/medium-zoom',
      {
        selector: 'img.zoom',
        // medium-zoom options here
        // See: https://github.com/francoischalifour/medium-zoom#options
        options: {
          margin: 16,
        },
      },
    ],
  ],
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      // 下拉列表
      { text: '2.x', link: '/' },
      { text: '3.x', link: '/v3/' },
      {
        text: "版本",
        items: [
          {
            text: "vue2.x",
            link: "/",
          },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/Ewall1106/mall' },
    ],
    sidebar: {
      '/': v2,
      '/v3/': v3,
      // '/backend/': sidebarBackend,
      // '/vue-analysis/': sidebarVueAnalysis,
      // '/custom-path/': sidebarTest, 
    },
  },
};
