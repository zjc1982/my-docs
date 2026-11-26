# 插件





## 代码组图标

使用的是 [@yuyinws/vitepress-plugin-group-icons](https://github.com/yuyinws/vitepress-plugin-group-icons)

参照教程安装：https://vpgi.vercel.app/

::: code-group
```sh [pnpm]
pnpm add -D vitepress-plugin-group-icons
```

```sh [yarn]
yarn add -D vitepress-plugin-group-icons
```

```sh [npm]
npm install vitepress-plugin-group-icons
```

```sh [bun]
bun add -D vitepress-plugin-group-icons
```
:::


然后在 `config.mts` 中配置

::: tip `groupIconMdPlugin` 报错？
请备份配置及文件后，重新安装VitePress
:::

```ts{3,8-10,13-17}
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons' // [!code focus]

export default defineConfig({

  markdown: {
    config(md) { // [!code focus:3]
      md.use(groupIconMdPlugin) //代码组图标
    },
  },

  vite: { // [!code focus:5]
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
  },

})
```

最后还需要再 `index.ts` 中引入样式

```ts{4}
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'

import 'virtual:group-icons.css' //代码组样式 // [!code focus]

export default {
  extends: DefaultTheme,
}
```


使用时，请确保代码后有对应的文字触发

````md{2,6,10}
::: code-group
```sh [pnpm]
pnpm -v
```

```sh [yarn]
yarn -v
```

```sh [bun]
bun -v
```
:::
````

已经内置的常用图标有

```ts
export const builtInIcons: Record<string, string> = {
  // package manager
  pnpm: 'logos:pnpm',
  npm: 'logos:npm-icon',
  yarn: 'logos:yarn',
  bun: 'logos:bun',
  // framework
  vue: 'logos:vue',
  svelte: 'logos:svelte-icon',
  angular: 'logos:angular-icon',
  react: 'logos:react',
  next: 'logos:nextjs-icon',
  nuxt: 'logos:nuxt-icon',
  solid: 'logos:solidjs-icon',
  // bundler
  rollup: 'logos:rollupjs',
  webpack: 'logos:webpack',
  vite: 'logos:vitejs',
  esbuild: 'logos:esbuild',
}
```

那么如何自定义呢，我们先在 [iconify](https://icon-sets.iconify.design/) 中找到中意的图标

::: tip 说明
* 本地图标格式：只能使用相对路径

* 远程图标格式：必须是 `logos:***`
:::

图标名复制后，可以在 `config.mts` 中配置


```ts{3,15-20}
// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons' // [!code focus]

export default defineConfig({

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin) //代码组图标
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin({ // [!code focus:6]
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          js: 'logos:javascript', //js图标
          md: 'logos:markdown', //markdown图标
          css: 'logos:css-3', //css图标
        },
      })
    ],
  },

})
```

来吧看看，效果如何

::: code-group
```ts [ts]
console.log("I'm TypeScript");
```

```js [js]
console.log("I'm JavaScript");
```

```md [md]
Markdown图标演示
```

```css [css]
h1 {
  background: red;
}
```

:::


