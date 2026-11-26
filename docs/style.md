# 样式美化


## 主题目录(必看)

::: tip 说明
要修改样式，建议还是按此方式，无论怎样修改都不影响源文件
:::

在 `.vitepress` 中新建文件夹 `theme`，看目录

```md{5-6}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ index.mts 或者 index.ts
│  └─ index.md
└─ node_modules
```

然后在 `theme` 目录下新建 `index.ts` 并填入如下代码

```ts
/* .vitepress/theme/index.ts */
/// <reference types="vitepress/client" />
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
}
```

## 主题美化

### H1标题颜色

::: warning 当然
同理，你也可以改H2-H6的标题，不过我感觉没必要，这样太花里胡哨了
:::

最简单的修改就是，比如改成红色

```css
/* .vitepress/theme/style/var.css */
.VPDoc h1 {
  color: red;
}
```

但是这样并不太好看，我们可以弄一个渐变色

```css
/* .vitepress/theme/style/var.css */
.VPDoc h1 {
  background: -webkit-linear-gradient(10deg, #bd34fe 5%, #e43498 15%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

::: tip 说明
background: 采用了一个线性渐变

background-clip: 使文本的背景颜色与渐变效果相同

text-fill-color：将文字透明
:::

---

### 链接下划线

新版本更新后，文字跳转链接就多了一个下划线

不习惯的可以修改，我们在 `var.css` 中添加下面代码就行了

```css
/* var.css */
.vp-doc a {
    text-decoration: none;
}
```

[参考：MDN Web Docs 社区](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)

---

### 首页特性悬停效果

给首页特性VPFeature加一个hover效果，添加如下代码即可

```css
/* .vitepress/theme/style/var.css */

/* VPFeatures 页卡悬浮效果 */
.VPFeatures .items .item {
  transition: transform 0.3s;
}

.VPFeatures .items .item:hover {
  transform: translateY(-5px);
}
```

---

### 主题其他美化

太多了，我们可以参照源文件来进行修改

```
node_modules\vitepress\dist\client\theme-default\styles\var.css
```

## 其他美化

### 引用颜色

在 Markdown 中，我们常用的引用符号是 `>`，我们可以稍微改动一下

在 `theme/style` 新建 `blockquote.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ blockquote.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `blockquote.css` 中

```css
/* .vitepress/theme/style/blockquote.css */
.vp-doc blockquote {
    border-radius: 10px;
    padding: 18px 20px 20px 15px;
    position: relative;
    background-color: var(--vp-c-gray-soft);
    border-left: 6px solid var(--vp-c-green-2);
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './blockquote.css';
```

**输入**

```md
> 更新时间：2026年
```

**输出**

> 更新时间：2026年

---

### 容器颜色

随着版本更新迭代，现在这 `info` `tip` `warning` `danger` 颜色和 `details` 旋转箭头真的想吐槽，好丑！

[Vuepress/hope主题的容器颜色](https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html#%E6%BC%94%E7%A4%BA) 就不错，参考着弄一下

在 `theme/style` 新建 `custom-block.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ custom-block.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `custom-block.css` 中

::: details 点击查看 `custom-block.css` 代码
```css
/* .vitepress/theme/style/custom-block.css */
/* 深浅色卡 */
:root {
    --custom-block-info-left: #cccccc;
    --custom-block-info-bg: #fafafa;

    --custom-block-tip-left: #009400;
    --custom-block-tip-bg: #e6f6e6;

    --custom-block-warning-left: #e6a700;
    --custom-block-warning-bg: #fff8e6;

    --custom-block-danger-left: #e13238;
    --custom-block-danger-bg: #ffebec;

    --custom-block-note-left: #4cb3d4;
    --custom-block-note-bg: #eef9fd;

    --custom-block-important-left: #a371f7;
    --custom-block-important-bg: #f4eefe;

    --custom-block-caution-left: #e0575b;
    --custom-block-caution-bg: #fde4e8;
}

.dark {
    --custom-block-info-left: #cccccc;
    --custom-block-info-bg: #474748;

    --custom-block-tip-left: #009400;
    --custom-block-tip-bg: #003100;

    --custom-block-warning-left: #e6a700;
    --custom-block-warning-bg: #4d3800;

    --custom-block-danger-left: #e13238;
    --custom-block-danger-bg: #4b1113;

    --custom-block-note-left: #4cb3d4;
    --custom-block-note-bg: #193c47;

    --custom-block-important-left: #a371f7;
    --custom-block-important-bg: #230555;

    --custom-block-caution-left: #e0575b;
    --custom-block-caution-bg: #391c22;
}


/* 标题字体大小 */
.custom-block-title {
    font-size: 16px;
}

/* info容器:背景色、左侧 */
.custom-block.info {
    border-left: 5px solid var(--custom-block-info-left);
    background-color: var(--custom-block-info-bg);
}

/* info容器:svg图 */
.custom-block.info [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z' fill='%23ccc'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* 提示容器:边框色、背景色、左侧 */
.custom-block.tip {
    /* border-color: var(--custom-block-tip); */ 
    border-left: 5px solid var(--custom-block-tip-left);
    background-color: var(--custom-block-tip-bg);
}

/* 提示容器:svg图 */
.custom-block.tip [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23009400' d='M7.941 18c-.297-1.273-1.637-2.314-2.187-3a8 8 0 1 1 12.49.002c-.55.685-1.888 1.726-2.185 2.998H7.94zM16 20v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1h8zm-3-9.995V6l-4.5 6.005H11v4l4.5-6H13z'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -2px;
}

/* 警告容器:背景色、左侧 */
.custom-block.warning {
    border-left: 5px solid var(--custom-block-warning-left);
    background-color: var(--custom-block-warning-bg);
}

/* 警告容器:svg图 */
.custom-block.warning [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M576.286 752.57v-95.425q0-7.031-4.771-11.802t-11.3-4.772h-96.43q-6.528 0-11.3 4.772t-4.77 11.802v95.424q0 7.031 4.77 11.803t11.3 4.77h96.43q6.528 0 11.3-4.77t4.77-11.803zm-1.005-187.836 9.04-230.524q0-6.027-5.022-9.543-6.529-5.524-12.053-5.524H456.754q-5.524 0-12.053 5.524-5.022 3.516-5.022 10.547l8.538 229.52q0 5.023 5.022 8.287t12.053 3.265h92.913q7.032 0 11.803-3.265t5.273-8.287zM568.25 95.65l385.714 707.142q17.578 31.641-1.004 63.282-8.538 14.564-23.354 23.102t-31.892 8.538H126.286q-17.076 0-31.892-8.538T71.04 866.074q-18.582-31.641-1.004-63.282L455.75 95.65q8.538-15.57 23.605-24.61T512 62t32.645 9.04 23.605 24.61z' fill='%23e6a700'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
}

/* 危险容器:背景色、左侧 */
.custom-block.danger {
    border-left: 5px solid var(--custom-block-danger-left);
    background-color: var(--custom-block-danger-bg);
}

/* 危险容器:svg图 */
.custom-block.danger [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' fill='%23e13238'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* NOTE容器:背景色、左侧 */
.custom-block.note {
    border-left: 5px solid var(--custom-block-note-left);
    background-color: var(--custom-block-note-bg);
}

/* NOTE容器:svg图 */
.custom-block.note [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z' fill='%234cb3d4'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* IMPORTANT容器:背景色、左侧 */
.custom-block.important {
    border-left: 5px solid var(--custom-block-important-left);
    background-color: var(--custom-block-important-bg);
}

/* IMPORTANT容器:svg图 */
.custom-block.important [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M512 981.333a84.992 84.992 0 0 1-84.907-84.906h169.814A84.992 84.992 0 0 1 512 981.333zm384-128H128v-42.666l85.333-85.334v-256A298.325 298.325 0 0 1 448 177.92V128a64 64 0 0 1 128 0v49.92a298.325 298.325 0 0 1 234.667 291.413v256L896 810.667v42.666zm-426.667-256v85.334h85.334v-85.334h-85.334zm0-256V512h85.334V341.333h-85.334z' fill='%23a371f7'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* CAUTION容器:背景色、左侧 */
.custom-block.caution {
    border-left: 5px solid var(--custom-block-caution-left);
    background-color: var(--custom-block-caution-bg);
}

/* CAUTION容器:svg图 */
.custom-block.caution [class*="custom-block-title"]::before {
    content: '';
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' fill='%23e13238'/%3E%3C/svg%3E");
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-right: 4px;
    left: -5px;
    top: -1px;
}

/* summary容器:箭头 */
summary {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m9 18 6-6-6-6'/%3E%3C/svg%3E");
  list-style: none;
  position: relative;
  padding-left: 20px;
}

/* summary容器:下拉箭头 */
summary::before {
  content: "";
  position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16px;
  -webkit-mask: var(--icon) no-repeat;
  mask: var(--icon) no-repeat;
  -webkit-mask-size: 120% 120%;
  mask-size: 120% 120%;
  -webkit-mask-position: center;
  mask-position: center;
  color: var(--vp-c-text-2);
  background-color: currentColor;
  transition: transform 0.2s;
  vertical-align: text-bottom;
}

/* summary容器:点击转动箭头 */
details[open] > summary::before {
  transform: rotate(90deg);
}

```

:::

看看效果吧！！！

::: info 注释
注释是灰色
:::

::: tip 提示
提示是绿色
:::

::: warning 警告
警告是橘色
:::

::: danger 危险
危险是红色
:::

::: details 详细信息
详细信。
:::

---

### 代码块

将代码组改成Mac风格，三个小圆点

在 `.vitepress/theme/style` 目录新建一个 `vp-code.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ vp-code.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `vp-code.css` 保存

::: tip 说明
本次代码感谢 [@Aurorxa](https://github.com/Aurorxa) 提供，本人在此基础上进行一些修改
:::


```css
/* .vitepress/theme/style/vp-code.css */

/* 代码块：增加留空边距 增加阴影 */
.vp-doc div[class*=language-] {
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
  padding-top: 20px;
}

/* 代码块：添加macOS风格的小圆点 */
.vp-doc div[class*=language-]::before {
  content: "";
  display: block;
  position: absolute;
  top: 12px;
  left: 12px;
  width: 12px;
  height: 12px;
  background-color: #ff5f56;
  border-radius: 50%;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
  z-index: 1;
}

/* 代码块：下移行号 隐藏右侧竖线 */
.vp-doc .line-numbers-wrapper {
  padding-top: 40px;
  border-right: none;
}

/* 代码块：重建行号右侧竖线 */
.vp-doc .line-numbers-wrapper::after {
  content: "";
  position: absolute;
  top: 40px;
  right: 0;
  border-right: 1px solid var(--vp-code-block-divider-color);
  height: calc(100% - 60px);
}

.vp-doc div[class*='language-'].line-numbers-mode {
  margin-bottom: 20px;
}
```


然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './vp-code.css';
```

输入：

````md
```sh
#默认有行号
pnpm -v
```

```sh:no-line-numbers
#关闭行号
pnpm -v
```
````

输出：

```sh
#查询pnpm版本
pnpm -v
```

```sh:no-line-numbers
#关闭行号
pnpm -v
```

---

### 代码组

将代码组改成Mac风格，三个小圆点

在 `.vitepress/theme/style` 目录新建一个 `vp-code-group.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ vp-code-group.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `vp-code-group.css` 保存

::: tip 说明
本次代码感谢 [@Aurorxa](https://github.com/Aurorxa) 提供，本人在此基础上进行一些修改
:::


```css
/* .vitepress/theme/style/vp-code-group.css */

/* 代码组：tab间距 */
.vp-code-group .tabs {
  padding-top: 20px;
}

/* 代码组：添加样式及阴影 */
.vp-code-group {
  color: var(--vp-c-black-soft);
  border-radius: 8px;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

/* 代码组：添加macOS风格的小圆点 */
.vp-code-group .tabs::before {
  content: ' ';
  position: absolute;
  top: 12px;
  left: 12px;
  height: 12px;
  width: 12px;
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
}

/* 代码组：修正倒角、阴影、边距 */
.vp-code-group div[class*="language-"] {
  border-radius: 8px;
  box-shadow: none;
  padding-top: 0px;
}

/* 代码组：隐藏小圆点 */
.vp-code-group div[class*="language-"]::before {
  display: none;
}

/* 代码组：修正行号位置 */
.vp-code-group .line-numbers-mode .line-numbers-wrapper {
  padding-top: 20px;
}

/* 代码组：修正行号右侧竖线位置 */
.vp-code-group .line-numbers-mode .line-numbers-wrapper::after {
  top: 24px;
  height: calc(100% - 45px);
}

/* 代码组（无行号）：修正倒角、阴影、边距 */
.vp-code-group div[class*="language-"].vp-adaptive-theme {
  border-radius: 8px;
  box-shadow: none;
  padding-top: 0px;
}

/* 代码组（无行号）：隐藏小圆点 */
.vp-code-group div[class*="language-"].vp-adaptive-theme::before {
  display: none;
}
```



然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './vp-code-group.css';
```

输入：

````md
::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::
````

输出：

::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

:::

---

### 侧边栏样式美化

默认的侧边栏不太容易区分到底是目录还是文件，我们可以进行美化

在 `.vitepress/theme/style` 目录新建一个 `sidebarIcon.css` 文件


```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ sidebarIcon.css
│  └─ index.md
└─ node_modules
```

其内容是 ：

::: details 点击查看 `sidebarIcon.css` 代码
```css
/* .vitepress/theme/style/sidebarIcon.css */

/* 侧边栏缩放 */
.VPSidebarItem.level-0 .items {
  padding-left: 15px !important;
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  transition: background-color 0.25s;
}

/* 侧边栏图标 */
/* 选中所有 .VPSidebarItem 元素，排除带有 .is-link 类的 */
#VPSidebarNav .VPSidebarItem:not(.is-link).collapsed >.item {
    display: inline-flex;
    align-items: center;  /* 垂直居中对齐图标和文本 */
}

/* 为所有不带 .is-link 的 .VPSidebarItem 折叠状态添加图标 */
#VPSidebarNav .VPSidebarItem:not(.is-link).collapsed >.item::before {
    content: '';
    background-image: url('/svg/document.svg'); /* 设置图标路径 */
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;  /* 确保图标与文本垂直居中 */
    background-size: cover;
    margin-right: 4px;  /* 给图标和文本之间增加间距 */
}

#VPSidebarNav .VPSidebarItem:not(.is-link) >.item {
    display: inline-flex;
    align-items: center;  /* 垂直居中对齐图标和文本 */
}

/* 为所有不带 .is-link 的 .VPSidebarItem 非折叠状态添加图标 */
#VPSidebarNav .VPSidebarItem:not(.is-link) >.item::before {
    content: '';
    background-image: url('/svg/document-open.svg'); /* 设置图标路径 */
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;  /* 确保图标与文本垂直居中 */
    background-size: cover;
    margin-right: 4px;  /* 给图标和文本之间增加间距 */
}

/* 选中带有 .is-link 的 .VPSidebarItem 的直接子元素 .item */
#VPSidebarNav .VPSidebarItem.is-link > .item {
    display: inline-flex;
    align-items: center;  /* 垂直居中图标和文字 */
}

/* 为选中的 .item 添加图标 */
#VPSidebarNav .VPSidebarItem.is-link > .item::before {
    content: '';
    background-image: url('/svg/file.svg'); /* 图标路径 */
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    background-size: cover;
    margin-right: 4px;  /* 图标与文字间距 */
}
```
:::


然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './sidebarIcon.css';
```














