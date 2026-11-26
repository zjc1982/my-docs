/* .vitepress/theme/index.ts */
/// <reference types="vitepress/client" />

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue' // 需要引入 watch

// 样式
import 'virtual:group-icons.css' //代码组样式
import './style/index.css' //自定义样式

// 组件
import update from "./components/update.vue" // 更新时间
import ArticleMetadata from "./components/ArticleMetadata.vue" //字数阅读时间

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  enhanceApp({app , router }) {
    // 注册全局组件
    app.component('Update', update)
    app.component('ArticleMetadata', ArticleMetadata)

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  },
  
} satisfies Theme


// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

