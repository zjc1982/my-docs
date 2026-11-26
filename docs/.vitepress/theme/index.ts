/* .vitepress/theme/index.ts */
/// <reference types="vitepress/client" />

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// 样式
import 'virtual:group-icons.css' //代码组样式
import './style/index.css' //自定义样式

// 组件
import update from "./components/update.vue" // 更新时间
import ArticleMetadata from "./components/ArticleMetadata.vue" //字数阅读时间

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Update', update)
    app.component('ArticleMetadata', ArticleMetadata)
  },
} satisfies Theme