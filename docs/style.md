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

### 主题色

在 `theme` 目录下新建 `style` 文件夹，然后新建 `index.css` 和 `var.css`

```md{7-8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ var.css
│  └─ index.md
└─ node_modules
```

分别复制代码并粘贴

::: code-group

```css [index.css]
/* index.css */
@import './var.css';
```

```css [var.css]
/* var.css */
:root {
  --vp-c-brand-1: #18794e;
  --vp-c-brand-2: #299764;
  --vp-c-brand-3: #30a46c;
}

.dark {
  --vp-c-brand-1: #3dd68c;
  --vp-c-brand-2: #30a46c;
  --vp-c-brand-3: #298459;
}
/* 以前的vp-c-brand已弃用 */

:root {
  /* hero标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);

  /*hero logo背景渐变色 */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

/* 也可自行单独修改brand按钮 */
/* :root {
  --vp-button-brand-border: #F6CEEC;
  --vp-button-brand-text: #F6CEEC;
  --vp-button-brand-bg: #D939CD;

  --vp-button-brand-hover-border: #F6CEEC;
  --vp-button-brand-hover-text: #fff;
  --vp-button-brand-hover-bg: #D939CD;

  --vp-button-brand-active-border: #F6CEEC;
} */
```

:::

然后将修改好的样式引入 `index.ts`

```ts{3}
/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css' // [!code focus]

export default {
  extends: DefaultTheme,
}
```

---

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

### 彩虹背景动画

在 [UnoCSS](https://unocss.dev/) 首页中，它的hero标题和图片背景有类似彩虹的渐变色动画

我们通过修改css样式实现，在 `theme/style` 新建 `rainbow.css` 文件

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ rainbow.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `rainbow.css` 中

::: details 点我查看代码
```css
/* 彩虹动画 */
@keyframes rainbow {
  0% {
    --vp-c-brand-1: #009ff7;
    --vp-c-brand-light: #5ac5ff;
    --vp-c-brand-lighter: #8ceeff;
    --vp-c-brand-dark: #007ace;
    --vp-c-brand-darker: #0057a6;
    --vp-c-brand-next: #c76dd1;
  }
  1.25% {
    --vp-c-brand-1: #009dfa;
    --vp-c-brand-light: #5ac3ff;
    --vp-c-brand-lighter: #8decff;
    --vp-c-brand-dark: #0078d0;
    --vp-c-brand-darker: #0055a8;
    --vp-c-brand-next: #cf69c9;
  }
  2.5% {
    --vp-c-brand-1: #009bfc;
    --vp-c-brand-light: #5bc1ff;
    --vp-c-brand-lighter: #8de9ff;
    --vp-c-brand-dark: #0076d2;
    --vp-c-brand-darker: #0053aa;
    --vp-c-brand-next: #d566c2;
  }
  3.75% {
    --vp-c-brand-1: #0098fd;
    --vp-c-brand-light: #5bbfff;
    --vp-c-brand-lighter: #8ee7ff;
    --vp-c-brand-dark: #0074d3;
    --vp-c-brand-darker: #0051ab;
    --vp-c-brand-next: #dc63ba;
  }
  5% {
    --vp-c-brand-1: #0096fd;
    --vp-c-brand-light: #5bbcff;
    --vp-c-brand-lighter: #8ee4ff;
    --vp-c-brand-dark: #0071d4;
    --vp-c-brand-darker: #004fab;
    --vp-c-brand-next: #e160b3;
  }
  6.25% {
    --vp-c-brand-1: #0093fd;
    --vp-c-brand-light: #5bb9ff;
    --vp-c-brand-lighter: #8ee1ff;
    --vp-c-brand-dark: #006fd3;
    --vp-c-brand-darker: #004dab;
    --vp-c-brand-next: #e65eab;
  }
  7.5% {
    --vp-c-brand-1: #2e90fc;
    --vp-c-brand-light: #69b6ff;
    --vp-c-brand-lighter: #99deff;
    --vp-c-brand-dark: #006cd2;
    --vp-c-brand-darker: #004baa;
    --vp-c-brand-next: #e95ca2;
  }
  8.75% {
    --vp-c-brand-1: #4d8dfa;
    --vp-c-brand-light: #7eb3ff;
    --vp-c-brand-lighter: #abdbff;
    --vp-c-brand-dark: #0069d1;
    --vp-c-brand-darker: #0048a9;
    --vp-c-brand-next: #ed5a9a;
  }
  10% {
    --vp-c-brand-1: #638af8;
    --vp-c-brand-light: #8fb0ff;
    --vp-c-brand-lighter: #bbd7ff;
    --vp-c-brand-dark: #3066cf;
    --vp-c-brand-darker: #0045a7;
    --vp-c-brand-next: #ef5992;
  }
  11.25% {
    --vp-c-brand-1: #7587f5;
    --vp-c-brand-light: #9fadff;
    --vp-c-brand-lighter: #cad4ff;
    --vp-c-brand-dark: #4963cc;
    --vp-c-brand-darker: #0941a4;
    --vp-c-brand-next: #f15989;
  }
  12.5% {
    --vp-c-brand-1: #8583f1;
    --vp-c-brand-light: #aea9ff;
    --vp-c-brand-lighter: #d8d1ff;
    --vp-c-brand-dark: #5b5fc8;
    --vp-c-brand-darker: #2e3ea1;
    --vp-c-brand-next: #f25981;
  }
  13.75% {
    --vp-c-brand-1: #9280ed;
    --vp-c-brand-light: #bca6ff;
    --vp-c-brand-lighter: #e6cdff;
    --vp-c-brand-dark: #6a5cc4;
    --vp-c-brand-darker: #413a9d;
    --vp-c-brand-next: #f25a79;
  }
  15% {
    --vp-c-brand-1: #9f7ce9;
    --vp-c-brand-light: #c8a2ff;
    --vp-c-brand-lighter: #f2c9ff;
    --vp-c-brand-dark: #7758c0;
    --vp-c-brand-darker: #503598;
    --vp-c-brand-next: #f25c71;
  }
  16.25% {
    --vp-c-brand-1: #aa78e3;
    --vp-c-brand-light: #d39eff;
    --vp-c-brand-lighter: #fec6ff;
    --vp-c-brand-dark: #8354bb;
    --vp-c-brand-darker: #5c3193;
    --vp-c-brand-next: #f15e69;
  }
  17.5% {
    --vp-c-brand-1: #b574dd;
    --vp-c-brand-light: #de9bff;
    --vp-c-brand-lighter: #ffc2ff;
    --vp-c-brand-dark: #8d50b5;
    --vp-c-brand-darker: #662c8e;
    --vp-c-brand-next: #ef6061;
  }
  18.75% {
    --vp-c-brand-1: #be71d7;
    --vp-c-brand-light: #e897ff;
    --vp-c-brand-lighter: #ffbfff;
    --vp-c-brand-dark: #964baf;
    --vp-c-brand-darker: #6f2688;
    --vp-c-brand-next: #ed635a;
  }
  20% {
    --vp-c-brand-1: #c76dd1;
    --vp-c-brand-light: #f194fa;
    --vp-c-brand-lighter: #ffbcff;
    --vp-c-brand-dark: #9e47a9;
    --vp-c-brand-darker: #772082;
    --vp-c-brand-next: #eb6552;
  }
  21.25% {
    --vp-c-brand-1: #cf69c9;
    --vp-c-brand-light: #f991f2;
    --vp-c-brand-lighter: #ffb9ff;
    --vp-c-brand-dark: #a643a2;
    --vp-c-brand-darker: #7e197c;
    --vp-c-brand-next: #e8694b;
  }
  22.5% {
    --vp-c-brand-1: #d566c2;
    --vp-c-brand-light: #ff8deb;
    --vp-c-brand-lighter: #ffb6ff;
    --vp-c-brand-dark: #ac3f9b;
    --vp-c-brand-darker: #841075;
    --vp-c-brand-next: #e46c44;
  }
  23.75% {
    --vp-c-brand-1: #dc63ba;
    --vp-c-brand-light: #ff8be3;
    --vp-c-brand-lighter: #ffb3ff;
    --vp-c-brand-dark: #b23b94;
    --vp-c-brand-darker: #89046f;
    --vp-c-brand-next: #e06f3d;
  }
  25% {
    --vp-c-brand-1: #e160b3;
    --vp-c-brand-light: #ff88db;
    --vp-c-brand-lighter: #ffb1ff;
    --vp-c-brand-dark: #b7378c;
    --vp-c-brand-darker: #8d0068;
    --vp-c-brand-next: #db7336;
  }
  26.25% {
    --vp-c-brand-1: #e65eab;
    --vp-c-brand-light: #ff86d2;
    --vp-c-brand-lighter: #ffaffb;
    --vp-c-brand-dark: #bb3485;
    --vp-c-brand-darker: #910060;
    --vp-c-brand-next: #d77630;
  }
  27.5% {
    --vp-c-brand-1: #e95ca2;
    --vp-c-brand-light: #ff84ca;
    --vp-c-brand-lighter: #ffadf2;
    --vp-c-brand-dark: #be317d;
    --vp-c-brand-darker: #940059;
    --vp-c-brand-next: #d17a2a;
  }
  28.75% {
    --vp-c-brand-1: #ed5a9a;
    --vp-c-brand-light: #ff83c1;
    --vp-c-brand-lighter: #fface9;
    --vp-c-brand-dark: #c12f75;
    --vp-c-brand-darker: #970052;
    --vp-c-brand-next: #cc7d24;
  }
  30% {
    --vp-c-brand-1: #ef5992;
    --vp-c-brand-light: #ff82b8;
    --vp-c-brand-lighter: #ffabe0;
    --vp-c-brand-dark: #c32d6d;
    --vp-c-brand-darker: #98004b;
    --vp-c-brand-next: #c6811e;
  }
  31.25% {
    --vp-c-brand-1: #f15989;
    --vp-c-brand-light: #ff82af;
    --vp-c-brand-lighter: #ffabd7;
    --vp-c-brand-dark: #c52d65;
    --vp-c-brand-darker: #9a0043;
    --vp-c-brand-next: #bf8418;
  }
  32.5% {
    --vp-c-brand-1: #f25981;
    --vp-c-brand-light: #ff82a7;
    --vp-c-brand-lighter: #ffabce;
    --vp-c-brand-dark: #c52e5e;
    --vp-c-brand-darker: #9a003c;
    --vp-c-brand-next: #b98713;
  }
  33.75% {
    --vp-c-brand-1: #f25a79;
    --vp-c-brand-light: #ff839e;
    --vp-c-brand-lighter: #ffacc5;
    --vp-c-brand-dark: #c62f56;
    --vp-c-brand-darker: #9a0035;
    --vp-c-brand-next: #b28a0f;
  }
  35% {
    --vp-c-brand-1: #f25c71;
    --vp-c-brand-light: #ff8496;
    --vp-c-brand-lighter: #ffadbc;
    --vp-c-brand-dark: #c5314e;
    --vp-c-brand-darker: #99002e;
    --vp-c-brand-next: #ab8d0c;
  }
  36.25% {
    --vp-c-brand-1: #f15e69;
    --vp-c-brand-light: #ff868d;
    --vp-c-brand-lighter: #ffaeb4;
    --vp-c-brand-dark: #c43447;
    --vp-c-brand-darker: #980027;
    --vp-c-brand-next: #a3900b;
  }
  37.5% {
    --vp-c-brand-1: #ef6061;
    --vp-c-brand-light: #ff8885;
    --vp-c-brand-lighter: #ffb0ab;
    --vp-c-brand-dark: #c3373f;
    --vp-c-brand-darker: #970020;
    --vp-c-brand-next: #9c920d;
  }
  38.75% {
    --vp-c-brand-1: #ed635a;
    --vp-c-brand-light: #ff8a7d;
    --vp-c-brand-lighter: #ffb2a3;
    --vp-c-brand-dark: #c13b38;
    --vp-c-brand-darker: #940619;
    --vp-c-brand-next: #949510;
  }
  40% {
    --vp-c-brand-1: #eb6552;
    --vp-c-brand-light: #ff8d76;
    --vp-c-brand-lighter: #ffb59b;
    --vp-c-brand-dark: #be3e31;
    --vp-c-brand-darker: #921111;
    --vp-c-brand-next: #8b9715;
  }
  41.25% {
    --vp-c-brand-1: #e8694b;
    --vp-c-brand-light: #ff8f6e;
    --vp-c-brand-lighter: #ffb794;
    --vp-c-brand-dark: #bb4229;
    --vp-c-brand-darker: #8f1908;
    --vp-c-brand-next: #83991b;
  }
  42.5% {
    --vp-c-brand-1: #e46c44;
    --vp-c-brand-light: #ff9367;
    --vp-c-brand-lighter: #ffba8c;
    --vp-c-brand-dark: #b74622;
    --vp-c-brand-darker: #8c1f00;
    --vp-c-brand-next: #7a9b21;
  }
  43.75% {
    --vp-c-brand-1: #e06f3d;
    --vp-c-brand-light: #ff9661;
    --vp-c-brand-lighter: #ffbd86;
    --vp-c-brand-dark: #b44a1a;
    --vp-c-brand-darker: #882500;
    --vp-c-brand-next: #719d27;
  }
  45% {
    --vp-c-brand-1: #db7336;
    --vp-c-brand-light: #ff995a;
    --vp-c-brand-lighter: #ffc17f;
    --vp-c-brand-dark: #af4e11;
    --vp-c-brand-darker: #842a00;
    --vp-c-brand-next: #679e2e;
  }
  46.25% {
    --vp-c-brand-1: #d77630;
    --vp-c-brand-light: #ff9c54;
    --vp-c-brand-lighter: #ffc47a;
    --vp-c-brand-dark: #ab5206;
    --vp-c-brand-darker: #802f00;
    --vp-c-brand-next: #5da035;
  }
  47.5% {
    --vp-c-brand-1: #d17a2a;
    --vp-c-brand-light: #fea04f;
    --vp-c-brand-lighter: #ffc774;
    --vp-c-brand-dark: #a55600;
    --vp-c-brand-darker: #7b3300;
    --vp-c-brand-next: #51a13c;
  }
  48.75% {
    --vp-c-brand-1: #cc7d24;
    --vp-c-brand-light: #f8a34a;
    --vp-c-brand-lighter: #ffca70;
    --vp-c-brand-dark: #a05900;
    --vp-c-brand-darker: #773700;
    --vp-c-brand-next: #44a244;
  }
  50% {
    --vp-c-brand-1: #c6811e;
    --vp-c-brand-light: #f2a646;
    --vp-c-brand-lighter: #ffce6c;
    --vp-c-brand-dark: #9b5d00;
    --vp-c-brand-darker: #713b00;
    --vp-c-brand-next: #34a44b;
  }
  51.25% {
    --vp-c-brand-1: #bf8418;
    --vp-c-brand-light: #ebaa42;
    --vp-c-brand-lighter: #ffd168;
    --vp-c-brand-dark: #956000;
    --vp-c-brand-darker: #6c3e00;
    --vp-c-brand-next: #1ba553;
  }
  52.5% {
    --vp-c-brand-1: #b98713;
    --vp-c-brand-light: #e4ad3f;
    --vp-c-brand-lighter: #ffd466;
    --vp-c-brand-dark: #8e6300;
    --vp-c-brand-darker: #674100;
    --vp-c-brand-next: #00a65b;
  }
  53.75% {
    --vp-c-brand-1: #b28a0f;
    --vp-c-brand-light: #ddb03d;
    --vp-c-brand-lighter: #ffd764;
    --vp-c-brand-dark: #886600;
    --vp-c-brand-darker: #614400;
    --vp-c-brand-next: #00a663;
  }
  55% {
    --vp-c-brand-1: #ab8d0c;
    --vp-c-brand-light: #d5b33c;
    --vp-c-brand-lighter: #ffda63;
    --vp-c-brand-dark: #816900;
    --vp-c-brand-darker: #5b4700;
    --vp-c-brand-next: #00a76c;
  }
  56.25% {
    --vp-c-brand-1: #a3900b;
    --vp-c-brand-light: #cdb63c;
    --vp-c-brand-lighter: #f8dd63;
    --vp-c-brand-dark: #7a6b00;
    --vp-c-brand-darker: #554900;
    --vp-c-brand-next: #00a874;
  }
  57.5% {
    --vp-c-brand-1: #9c920d;
    --vp-c-brand-light: #c5b83d;
    --vp-c-brand-lighter: #f0e064;
    --vp-c-brand-dark: #736e00;
    --vp-c-brand-darker: #4e4b00;
    --vp-c-brand-next: #00a87d;
  }
  58.75% {
    --vp-c-brand-1: #949510;
    --vp-c-brand-light: #bdbb3e;
    --vp-c-brand-lighter: #e7e366;
    --vp-c-brand-dark: #6c7000;
    --vp-c-brand-darker: #474d00;
    --vp-c-brand-next: #00a985;
  }
  60% {
    --vp-c-brand-1: #8b9715;
    --vp-c-brand-light: #b4bd41;
    --vp-c-brand-lighter: #dee668;
    --vp-c-brand-dark: #647200;
    --vp-c-brand-darker: #404f00;
    --vp-c-brand-next: #00a98e;
  }
  61.25% {
    --vp-c-brand-1: #83991b;
    --vp-c-brand-light: #abc045;
    --vp-c-brand-lighter: #d4e86c;
    --vp-c-brand-dark: #5c7400;
    --vp-c-brand-darker: #385100;
    --vp-c-brand-next: #00a996;
  }
  62.5% {
    --vp-c-brand-1: #7a9b21;
    --vp-c-brand-light: #a2c249;
    --vp-c-brand-lighter: #cbea70;
    --vp-c-brand-dark: #537600;
    --vp-c-brand-darker: #2f5200;
    --vp-c-brand-next: #00a99f;
  }
  63.75% {
    --vp-c-brand-1: #719d27;
    --vp-c-brand-light: #98c44e;
    --vp-c-brand-lighter: #c1ec75;
    --vp-c-brand-dark: #4a7700;
    --vp-c-brand-darker: #255300;
    --vp-c-brand-next: #00a9a7;
  }
  65% {
    --vp-c-brand-1: #679e2e;
    --vp-c-brand-light: #8ec654;
    --vp-c-brand-lighter: #b7ee7a;
    --vp-c-brand-dark: #407900;
    --vp-c-brand-darker: #185500;
    --vp-c-brand-next: #00a9b0;
  }
  66.25% {
    --vp-c-brand-1: #5da035;
    --vp-c-brand-light: #84c75a;
    --vp-c-brand-lighter: #acf080;
    --vp-c-brand-dark: #357a0a;
    --vp-c-brand-darker: #015600;
    --vp-c-brand-next: #00a9b8;
  }
  67.5% {
    --vp-c-brand-1: #51a13c;
    --vp-c-brand-light: #79c961;
    --vp-c-brand-lighter: #a1f287;
    --vp-c-brand-dark: #277b16;
    --vp-c-brand-darker: #005700;
    --vp-c-brand-next: #00a9c0;
  }
  68.75% {
    --vp-c-brand-1: #44a244;
    --vp-c-brand-light: #6dca68;
    --vp-c-brand-lighter: #96f48e;
    --vp-c-brand-dark: #117c1f;
    --vp-c-brand-darker: #005700;
    --vp-c-brand-next: #00a8c7;
  }
  70% {
    --vp-c-brand-1: #34a44b;
    --vp-c-brand-light: #60cc70;
    --vp-c-brand-lighter: #89f595;
    --vp-c-brand-dark: #007d28;
    --vp-c-brand-darker: #005801;
    --vp-c-brand-next: #00a8cf;
  }
  71.25% {
    --vp-c-brand-1: #1ba553;
    --vp-c-brand-light: #51cd77;
    --vp-c-brand-lighter: #7cf69d;
    --vp-c-brand-dark: #007e30;
    --vp-c-brand-darker: #00590d;
    --vp-c-brand-next: #00a7d5;
  }
  72.5% {
    --vp-c-brand-1: #00a65b;
    --vp-c-brand-light: #48ce80;
    --vp-c-brand-lighter: #75f7a6;
    --vp-c-brand-dark: #007f38;
    --vp-c-brand-darker: #005917;
    --vp-c-brand-next: #00a6dc;
  }
  73.75% {
    --vp-c-brand-1: #00a663;
    --vp-c-brand-light: #48cf88;
    --vp-c-brand-lighter: #75f8ae;
    --vp-c-brand-dark: #008040;
    --vp-c-brand-darker: #005a20;
    --vp-c-brand-next: #00a6e2;
  }
  75% {
    --vp-c-brand-1: #00a76c;
    --vp-c-brand-light: #49cf91;
    --vp-c-brand-lighter: #76f9b7;
    --vp-c-brand-dark: #008049;
    --vp-c-brand-darker: #005b28;
    --vp-c-brand-next: #00a4e7;
  }
  76.25% {
    --vp-c-brand-1: #00a874;
    --vp-c-brand-light: #49d099;
    --vp-c-brand-lighter: #76f9c0;
    --vp-c-brand-dark: #008151;
    --vp-c-brand-darker: #005c30;
    --vp-c-brand-next: #00a3ec;
  }
  77.5% {
    --vp-c-brand-1: #00a87d;
    --vp-c-brand-light: #49d0a2;
    --vp-c-brand-lighter: #77fac9;
    --vp-c-brand-dark: #008159;
    --vp-c-brand-darker: #005c37;
    --vp-c-brand-next: #00a2f1;
  }
  78.75% {
    --vp-c-brand-1: #00a985;
    --vp-c-brand-light: #4ad1ab;
    --vp-c-brand-lighter: #77fad3;
    --vp-c-brand-dark: #008261;
    --vp-c-brand-darker: #005d3f;
    --vp-c-brand-next: #00a0f4;
  }
  80% {
    --vp-c-brand-1: #00a98e;
    --vp-c-brand-light: #4ad1b4;
    --vp-c-brand-lighter: #78fadc;
    --vp-c-brand-dark: #008269;
    --vp-c-brand-darker: #005d47;
    --vp-c-brand-next: #009ff7;
  }
  81.25% {
    --vp-c-brand-1: #00a996;
    --vp-c-brand-light: #4bd1bd;
    --vp-c-brand-lighter: #79fbe5;
    --vp-c-brand-dark: #008371;
    --vp-c-brand-darker: #005e4f;
    --vp-c-brand-next: #009dfa;
  }
  82.5% {
    --vp-c-brand-1: #00a99f;
    --vp-c-brand-light: #4cd1c6;
    --vp-c-brand-lighter: #7afbee;
    --vp-c-brand-dark: #00837a;
    --vp-c-brand-darker: #005e56;
    --vp-c-brand-next: #009bfc;
  }
  83.75% {
    --vp-c-brand-1: #00a9a7;
    --vp-c-brand-light: #4dd1cf;
    --vp-c-brand-lighter: #7bfbf8;
    --vp-c-brand-dark: #008382;
    --vp-c-brand-darker: #005e5e;
    --vp-c-brand-next: #0098fd;
  }
  85% {
    --vp-c-brand-1: #00a9b0;
    --vp-c-brand-light: #4ed1d7;
    --vp-c-brand-lighter: #7dfaff;
    --vp-c-brand-dark: #00838a;
    --vp-c-brand-darker: #005e65;
    --vp-c-brand-next: #0096fd;
  }
  86.25% {
    --vp-c-brand-1: #00a9b8;
    --vp-c-brand-light: #4fd1e0;
    --vp-c-brand-lighter: #7efaff;
    --vp-c-brand-dark: #008391;
    --vp-c-brand-darker: #005e6d;
    --vp-c-brand-next: #0093fd;
  }
  87.5% {
    --vp-c-brand-1: #00a9c0;
    --vp-c-brand-light: #50d0e8;
    --vp-c-brand-lighter: #7ffaff;
    --vp-c-brand-dark: #008399;
    --vp-c-brand-darker: #005e74;
    --vp-c-brand-next: #2e90fc;
  }
  88.75% {
    --vp-c-brand-1: #00a8c7;
    --vp-c-brand-light: #51d0f0;
    --vp-c-brand-lighter: #81f9ff;
    --vp-c-brand-dark: #0082a0;
    --vp-c-brand-darker: #005e7b;
    --vp-c-brand-next: #4d8dfa;
  }
  90% {
    --vp-c-brand-1: #00a8cf;
    --vp-c-brand-light: #52cff7;
    --vp-c-brand-lighter: #82f8ff;
    --vp-c-brand-dark: #0082a7;
    --vp-c-brand-darker: #005e81;
    --vp-c-brand-next: #638af8;
  }
  91.25% {
    --vp-c-brand-1: #00a7d5;
    --vp-c-brand-light: #53cfff;
    --vp-c-brand-lighter: #84f8ff;
    --vp-c-brand-dark: #0081ae;
    --vp-c-brand-darker: #005d87;
    --vp-c-brand-next: #7587f5;
  }
  92.5% {
    --vp-c-brand-1: #00a6dc;
    --vp-c-brand-light: #55ceff;
    --vp-c-brand-lighter: #85f7ff;
    --vp-c-brand-dark: #0081b4;
    --vp-c-brand-darker: #005d8d;
    --vp-c-brand-next: #8583f1;
  }
  93.75% {
    --vp-c-brand-1: #00a6e2;
    --vp-c-brand-light: #56cdff;
    --vp-c-brand-lighter: #87f6ff;
    --vp-c-brand-dark: #0080b9;
    --vp-c-brand-darker: #005c93;
    --vp-c-brand-next: #9280ed;
  }
  95% {
    --vp-c-brand-1: #00a4e7;
    --vp-c-brand-light: #57ccff;
    --vp-c-brand-lighter: #88f4ff;
    --vp-c-brand-dark: #007fbf;
    --vp-c-brand-darker: #005b98;
    --vp-c-brand-next: #9f7ce9;
  }
  96.25% {
    --vp-c-brand-1: #00a3ec;
    --vp-c-brand-light: #58caff;
    --vp-c-brand-lighter: #89f3ff;
    --vp-c-brand-dark: #007ec3;
    --vp-c-brand-darker: #005b9c;
    --vp-c-brand-next: #aa78e3;
  }
  97.5% {
    --vp-c-brand-1: #00a2f1;
    --vp-c-brand-light: #58c9ff;
    --vp-c-brand-lighter: #8af1ff;
    --vp-c-brand-dark: #007dc8;
    --vp-c-brand-darker: #0059a0;
    --vp-c-brand-next: #b574dd;
  }
  98.75% {
    --vp-c-brand-1: #00a0f4;
    --vp-c-brand-light: #59c7ff;
    --vp-c-brand-lighter: #8bf0ff;
    --vp-c-brand-dark: #007bcb;
    --vp-c-brand-darker: #0058a3;
    --vp-c-brand-next: #be71d7;
  }
  100% {
    --vp-c-brand-1: #009ff7;
    --vp-c-brand-light: #5ac5ff;
    --vp-c-brand-lighter: #8ceeff;
    --vp-c-brand-dark: #007ace;
    --vp-c-brand-darker: #0057a6;
    --vp-c-brand-next: #c76dd1;
  }
}

:root {
  --vp-c-brand-1: #009ff7;
  --vp-c-brand-light: #5ac5ff;
  --vp-c-brand-lighter: #8ceeff;
  --vp-c-brand-dark: #007ace;
  --vp-c-brand-darker: #0057a6;
  --vp-c-brand-next: #c76dd1;
  animation: rainbow 40s linear infinite;
}

:root {
    /* hero标题渐变色 */
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-next));
    /*hero logo背景渐变色 */
    --vp-home-hero-image-background-image: linear-gradient(-45deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-next));
    --vp-home-hero-image-filter: blur(80px);
}
```
:::

本来直接在代码中加入 `animation` 即可生效，但是由于颜色代码过多，渲染页面会很卡顿，换个方式不卡的方式来实现

在 `theme/index.ts` 中写入代码中，保存

```md{9}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ rainbow.css
│  │     └─ index.ts
│  └─ index.md
└─ node_modules
```

```ts{2-3,10-17,22-39}
/* .vitepress/theme/index.ts */ // [!code focus:3] 
// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  enhanceApp({app , router }) {
    // [!code focus:8]
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

  },
}
// [!code focus:18]
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
```

最后在 `index.css` 中引入生效，回到主页看效果

::: details 为什么我的没效果？

- 自身问题：请仔细检查代码颜色色卡，是否正确配置
- 电脑问题：我的电脑 - 右键 `属性` - `高级系统设置` - 在系统属性页卡中 `高级` - 性能 `设置`，默认为 调整为最佳外观，将 `窗口内的动画控件和元素` 打勾，确定（如果电脑字体变化，请调整为其他，只要确保勾选此项即可）
:::

```css
/* .vitepress/theme/style/index.css */
@import './rainbow.css';
```

---


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


### 代码块带标题

在 `.vitepress/theme/style` 目录新建一个 `vp-code-title.css` 文件

::: warning 注意
使用前，必须先[安装 代码组图标 插件](./plugin.md#代码组图标) 才可以生效
:::

```md{8}
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mts
│  │  └─ theme
│  │     └─ style
│  │        └─ index.css
│  │        └─ vp-code-title.css
│  └─ index.md
└─ node_modules
```

复制下面代码，粘贴到 `vp-code-title.css` 保存

::: tip 说明
本次代码感谢 [@Aurorxa](https://github.com/Aurorxa) 提供，本人在此基础上进行一些修改
:::

```css
/* .vitepress/theme/style/vp-code-title.css */

/* 整体容器样式（带阴影和圆角） */
.vp-code-block-title {
  background-color: var(--vp-code-block-bg);
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.4); /* 添加阴影 */
  overflow: hidden;
  position: relative; /* 确保小圆点定位 */
}

/* Mac 风格的小圆点，放在容器顶部 */
.vp-code-block-title::before {
  content: '';
  position: absolute;
  top: 12px; /* 圆点距离容器顶部的距离 */
  left: 12px;
  width: 12px;
  height: 12px;
  background-color: #fc625d; /* 红色圆点 */
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b; /* 黄色和绿色圆点 */
  z-index: 1;
}

/* 标题栏样式 */
.vp-code-block-title .vp-code-block-title-bar {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: bold;
}

/* 代码块标题：修正倒角、阴影、边距 */
.vp-code-block-title div[class*="language-"] {
  border-radius: 8px;
  box-shadow: none;
  padding-top: 0px;
  margin-bottom: 0px;
}

/* 代码块标题：隐藏小圆点 */
.vp-code-block-title div[class*="language-"]::before {
  display: none;
}

/* 代码块标题：修正行号位置 */
.vp-code-block-title .line-numbers-mode .line-numbers-wrapper {
  padding-top: 20px;
}

/* 代码块标题：修正行号右侧竖线位置 */
.vp-code-block-title .line-numbers-mode .line-numbers-wrapper::after {
  top: 20px;
  height: calc(100% - 40px);
}

/* 代码块标题（无行号）：修正倒角、阴影、边距 */
.vp-code-block-title div[class*="language-"].vp-adaptive-theme {
  border-radius: 8px;
  box-shadow: none;
  padding-top: 0px;
}

/* 代码块标题（无行号）：隐藏小圆点 */
.vp-code-block-title div[class*="language-"].vp-adaptive-theme::before {
  display: none;
}
```

然后在 `index.css` 中引入生效

```css
/* .vitepress/theme/style/index.css */
@import './vp-code-title.css';
```

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














