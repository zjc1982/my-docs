import { defineConfig } from 'vitepress'
import pkg from 'vitepress/package.json' with { type: 'json' }
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  cleanUrls: true, //开启纯净链接无html

  // #region fav
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //markdown配置
  markdown: {
    // 组件插入h1标题下
    config: (md) => {
      // 组件插入h1标题下
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      },

        md.use(groupIconMdPlugin) //代码组图标
    },

    codeCopyButton: {
      tooltipText: '复制代码',
      copiedText: '已复制'
    },

    // 行号显示
    lineNumbers: true, // false关闭

    // toc显示一级标题
    toc: { level: [1, 2, 3] },

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code
            .replaceAll('[!!code', '[!code')
            .replaceAll('@@include', '@include')
        }
      }
    ],

  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          js: 'logos:javascript', //js图标
          md: 'logos:markdown', //markdown图标
          css: 'logos:css-3', //css图标
        },
      })
    ],
  },

  //主题配置
  themeConfig: {
    //左上角logo
    logo: '/logo.png',

    //导航栏
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        // 分组标题1
        text: '介绍',
        items: [
          { text: '前言', link: '/preface' },
        ],
      },
      {
        text: '🍉指南',
        items: [
          {
            // 分组标题2
            text: '进阶玩法',
            items: [
              { text: 'Markdown', link: '/markdown-examples' },
              { text: '样式美化', link: '/style' },
              { text: '插件', link: '/plugin' },
              { text: '组件', link: '/components' },
            ],
          },
        ],
      },
      {
        text: `v${pkg.version}`, // 建议加上 "v" 前缀更清晰
        link: 'https://vitepress.dev/zh/',
        noIcon: true
      },
    ],

    //侧边栏
    sidebar: [
      {
        //分组标题1
        text: '介绍',
        collapsed: false,
        items: [
          { text: '前言', link: '/preface' },
        ],
      },
      {
        //分组标题2
        text: '进阶玩法',
        collapsed: false,
        items: [
          { text: 'Markdown', link: '/markdown-examples' },
          { text: '样式美化', link: '/style' },
          { text: '插件', link: '/plugin' },
          { text: '组件', link: '/components' },
        ],
      },
    ],

    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { // 如果你想翻译默认语言，请将此处设为 `root`
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
    },

    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    //编辑本页
    editLink: {
      pattern: 'https://github.com/zjc1982/my-docs.git', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },

    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    //页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">浙****号</a>`,
    },

    //电脑端深浅模式切换文字修改
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',

    //返回顶部 菜单 文字修改(移动端)
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',

  }
})
