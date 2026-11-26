# 组件



## 简介

常说的 SFC 组件，即 `Single file component` ，也就是我们的vue组件

组件是将HTML、CSS以及JavaScript封装成了一个 `*.vue` 文件

分别是：`<script>`、`<template>`、`<style>`

::: tip 说明
* JavaScript 对应：`<script>`

* HTML 对应：`<template>`

* CSS 对应：`<style>`
:::



## 安装

::: tip 说明
已安装过的无视，按 `CTRL+C` 退出开发预览模式后安装
:::

::: code-group
```sh [pnpm]
pnpm add -D vue
```

```sh [yarn]
yarn add -D vue
```

```sh [npm]
npm i vue
```

```sh [bun]
bun add -D vue
```
:::


## 使用

在 `theme` 目录中 创建 `components`文件夹，然后创建 `Mycomponent.vue`

```md{5-6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ Mycomponent.vue
│  │   └─ index.ts
└─ index.md
```

然后将下面代码粘贴在 `Mycomponent.vue` 中

::: tip 说明
如果没有css样式可以不写 `<style>`
:::

```vue
<script setup>
// 这里是JavaScript
</script>

<template>
<!-- 这里是HTML -->
</template>

<style>
/* 这里是CSS */
</style>
```


然后，在 `theme\index.ts` 中注册全局组件


```md{7}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ Mycomponent.vue
│  │   └─ index.ts
└─ index.md
```

```ts{2,6-9}
/* .vitepress/theme/index.ts */
import Mycomponent from "./components/Mycomponent.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('Mycomponent' , Mycomponent)
  }
}
```


## 演示


### 标题下添加时间

文档页有个 `lastUpdated` 通过 `git log` 的方式自动更新时间，我们直接获取同步，不用手动填那不香香！

开干！在查询了 [官网的API接口：useData](https://vitepress.dev/zh/reference/runtime-api#usedata)，发现 `lastUpdated` 在 `page` 属性中

```ts{13,40}
interface VitePressData<T = any> {
  /**
   * 站点级元数据
   */
  site: Ref<SiteData<T>>
  /**
   * .vitepress/config.js 中的 themeConfig
   */
  theme: Ref<T>
  /**
   * 页面级元数据
   */
  page: Ref<PageData> // [!code focus]
  /**
   * 页面 frontmatter
   */
  frontmatter: Ref<PageData['frontmatter']>
  /**
   * 动态路由参数
   */
  params: Ref<PageData['params']>
  title: Ref<string>
  description: Ref<string>
  lang: Ref<string>
  isDark: Ref<boolean>
  dir: Ref<string>
  localeIndex: Ref<string>
}

interface PageData {
  title: string
  titleTemplate?: string | boolean
  description: string
  relativePath: string
  filePath: string
  headers: Header[]
  frontmatter: Record<string, any>
  params?: Record<string, any>
  isNotFound?: boolean
  lastUpdated?: number // [!code focus]
}
```

我们直接在 `theme/components` 文件夹，新建 `update.vue` 组件编写


```md{6}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ update.vue
│  │   └─ index.ts
└─ index.md
```

在 `update.vue` 填入如下代码，保存

::: tip 说明
在 [JavaScript Date](https://www.runoob.com/jsref/jsref-obj-date.html) 对象中，可以根据自己需求选择显示的时间

* toLocaleString()：显示日期和时间 `默认`

* toLocaleDateString()：仅显示日期

* toLocaleTimeString()：仅显示时间
:::

::: code-group
```vue{13} [update.vue]
<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
const { page } = useData()

const date = computed(
  () => new Date(page.value.lastUpdated!)
)
</script>

<template>
  <div class="LastUpdated">
    <p>更新时间: {{ date.toLocaleString() }}</p>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>
```
:::


然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress\theme\index.ts */
import DefaultTheme from 'vitepress/theme'
import update from "./components/update.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('update' , update)
  }
}
```

最后回到首页或者其他页面，插入组件即可

::: details 为什么不用插槽
目前位置最佳的 [插槽]() 是 `doc-before`

但是在标题上方，不是太喜欢，所以选择组件，你也可以自己找

* 区别：插槽不用手动添加；组件需要手动添加
:::

::: details 本地开发显示 更新时间: Invalid Date
请确保你的 `config.mts` 配置和 Frontmatter 中，已开启 `lastUpdated: true,`
:::

::: details 可以添加显示作者吗
官方没有提供这个接口，在 [官方的issues中](https://github.com/vuejs/vitepress/issues/3001) 你可以找到答案，添加贡献者并尝试
:::

```md
<!-- index.md -->
<update />
```




---



### 字数及阅读时间

这里使用了 [@shiheme/appbeebee](https://github.com/shiheme/appbeebee/) 博客组件

在 `theme/components` 文件夹，新建 `ArticleMetadata.vue`

以及 `theme/untils` 文件夹，新建 `functions.ts`


```md{6,8}
docs
├─ .vitepress
│  └─ config.mts
│  └─ theme
│  │   ├─ components
│  │   │   └─ ArticleMetadata.vue
│  │   ├─ untils
│  │   │   └─ functions.ts
│  │   └─ index.ts
└─ index.md
```

在 `ArticleMetadata.vue` 和 `functions.ts` 填入如下代码，保存

::: tip 说明
此处我将 [更新时间](#标题下添加时间) 也加入了进入
:::

::: code-group
```vue [ArticleMetadata.vue]
<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'
import { countWord } from '../untils/functions'

const { page } = useData()
const date = computed(
  () => new Date(page.value.lastUpdated!)
)

const wordCount = ref(0)
const imageCount = ref(0)

const wordTime = computed(() => {
    return ((wordCount.value / 275) * 60)
})

const imageTime = computed(() => {
    const n = imageCount.value
    if (imageCount.value <= 10) {
        // 等差数列求和
        return n * 13 + (n * (n - 1)) / 2
    }
    return 175 + (n - 10) * 3
})

// 阅读时间
const readTime = computed(() => {
    return Math.ceil((wordTime.value + imageTime.value) / 60)
})


function analyze() {
    document.querySelectorAll('.meta-des').forEach(v => v.remove())
    const docDomContainer = window.document.querySelector('#VPContent')
    const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
        '.content-container .main img'
    )
    imageCount.value = imgs?.length || 0
    const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
    wordCount.value = countWord(words)
}

onMounted(() => {
    // 初始化时执行一次
    analyze()
})
</script>


<template>
    <div class="word">
        <p>
            <svg t="1724572866572" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18131" width="16" height="16"><path d="M168.021333 504.192A343.253333 343.253333 0 0 1 268.629333 268.8a342.229333 342.229333 0 0 1 243.285334-100.778667A341.504 341.504 0 0 1 755.029333 268.8c9.856 9.898667 19.2 20.394667 27.733334 31.402667l-60.16 46.976a8.021333 8.021333 0 0 0 2.986666 14.122666l175.701334 43.008a8.021333 8.021333 0 0 0 9.898666-7.68l0.810667-180.906666a7.936 7.936 0 0 0-12.885333-6.314667L842.666667 253.44a418.858667 418.858667 0 0 0-330.922667-161.493333c-229.12 0-415.488 183.594667-419.797333 411.818666a8.021333 8.021333 0 0 0 8.021333 8.192H160a7.978667 7.978667 0 0 0 8.021333-7.808zM923.946667 512H864a7.978667 7.978667 0 0 0-8.021333 7.808 341.632 341.632 0 0 1-26.88 125.994667 342.186667 342.186667 0 0 1-73.685334 109.397333 342.442667 342.442667 0 0 1-243.328 100.821333 342.229333 342.229333 0 0 1-270.976-132.224l60.16-46.976a8.021333 8.021333 0 0 0-2.986666-14.122666l-175.701334-43.008a8.021333 8.021333 0 0 0-9.898666 7.68l-0.682667 181.034666c0 6.698667 7.68 10.496 12.885333 6.314667L181.333333 770.56a419.072 419.072 0 0 0 330.922667 161.408c229.205333 0 415.488-183.722667 419.797333-411.818667a8.021333 8.021333 0 0 0-8.021333-8.192z" fill="#8a8a8a" p-id="18132"></path></svg>
            更新: {{ date.toLocaleDateString() }}
            <svg t="1724571760788" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6125" width="16" height="16"><path d="M204.8 0h477.866667l273.066666 273.066667v614.4c0 75.093333-61.44 136.533333-136.533333 136.533333H204.8c-75.093333 0-136.533333-61.44-136.533333-136.533333V136.533333C68.266667 61.44 129.706667 0 204.8 0z m307.2 607.573333l68.266667 191.146667c13.653333 27.306667 54.613333 27.306667 61.44 0l102.4-273.066667c6.826667-20.48 0-34.133333-20.48-40.96s-34.133333 0-40.96 13.653334l-68.266667 191.146666-68.266667-191.146666c-13.653333-27.306667-54.613333-27.306667-68.266666 0l-68.266667 191.146666-68.266667-191.146666c-6.826667-13.653333-27.306667-27.306667-47.786666-20.48s-27.306667 27.306667-20.48 47.786666l102.4 273.066667c13.653333 27.306667 54.613333 27.306667 61.44 0l75.093333-191.146667z" fill="#777777" p-id="6126"></path><path d="M682.666667 0l273.066666 273.066667h-204.8c-40.96 0-68.266667-27.306667-68.266666-68.266667V0z" fill="#E0E0E0" opacity=".619" p-id="6127"></path></svg>
            字数: {{ wordCount }} 字
            <svg t="1724572797268" class="icon" viewBox="0 0 1060 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15031" width="16" height="16"><path d="M556.726857 0.256A493.933714 493.933714 0 0 0 121.929143 258.998857L0 135.021714v350.390857h344.649143L196.205714 334.482286a406.820571 406.820571 0 1 1-15.908571 312.649143H68.937143A505.819429 505.819429 0 1 0 556.726857 0.256z m-79.542857 269.531429v274.907428l249.197714 150.966857 42.422857-70.070857-212.114285-129.389714V269.787429h-79.542857z" fill="#8a8a8a" p-id="15032"></path></svg>
            时长: {{ readTime }} 分钟
        </p>
    </div>
</template>

<style>
.word {
  color: var(--vp-c-text-2);
  font-size: 15px;
}

.icon {
    display: inline-block;
    transform: translate(0px , 2px);
}
</style>
```

```ts [functions.ts]
const pattern
    = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export function countWord(data: string) {
    const m = data.match(pattern)
    let count = 0
    if (!m) {
        return 0
    }
    for (let i = 0; i < m.length; i += 1) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
        }
        else {
            count += 1
        }
    }
    return count
}
```
:::

然后，在 `index.ts` 中注册全局组件

```ts{3,7-10}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from "./components/ArticleMetadata.vue" // [!code focus]

export default {
  extends: DefaultTheme,
  enhanceApp({app}) { // [!code focus:4]
    // 注册全局组件
    app.component('ArticleMetadata' , ArticleMetadata)
  }
}
```

使用上，在拜读了 [查尔斯的知识库](https://blog.charles7c.top/) 后，找到了答案

将其写在 H1标题 下即可，参照官网 [Markdown的高级配置](https://vitepress.dev/zh/guide/markdown#advanced-configuration) 在 `config.mts` 中配置

::: info 说明
如果你觉得组件在 H1标题 之上的位置，才是最合适的，建议使用 [doc-before 插槽]() 位置

不要像上方一样使用 `enhanceApp` 方式注册组件，请参考 [h函数的配置]() 使用
:::

```ts{8-15}
/* .vitepress/config.mts */
import { defineConfig } from 'vitepress'

export default defineConfig({

  //markdown配置
  markdown: {
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; // [!code focus]
          return htmlResult;
      }
    }
  }

})
```



