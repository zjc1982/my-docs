# Markdown



> 如果你还不了解 `Markdown` ，请先了解下 `Markdown` 的简单用法
>
> VitePress 中的链接可以直接渲染



## 基础功能

VitePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 作为解析器，并使用 [Shiki](https://shiki.matsu.io/) 来突出显示语言语法


### 基本配置

```ts
export default defineConfig({
  markdown:{
      //这里填配置项
  },
})
```

### 标题锚 {#title-anchor}

::: tip 说明
`[]` 中括号内文字随便输，`()` 括号里的填一个 `#` 号加标题

无论是几级标题，都是一个 `#` 号
:::

**输入**

```md
[点我跳转：基础功能](#基础功能)
```

**输出**

[点我跳转：基础功能](#基础功能)

---

**自定义锚点，以应对中文无法正确跳转的问题**

首先需要在标题后，添加英文锚点

```md
### 使用自定义锚点 {#title-anchor}
```

**输入**

```md
[点我跳转：使用自定义锚点](#title-anchor)
```

**输出**

[点我跳转：使用自定义锚点](#title-anchor)


### Emoji

**输入**

```md
:tada: :100:
```

**输出**

:tada: :100:

Emoji大全：https://www.emojiall.com/zh-hans/


### 表格

输入：

```
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```


输出：

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |


::: tip 说明
更详细的使用方式，我在 [Markdown教程](https://yiov.top/computer/markdown.html#%E8%A1%A8%E6%A0%BC) 里也说到过

也可使用 Execl 生成 Markdwon：https://tableconvert.com/zh-cn/
:::



## 容器

### 基础使用

容器可以通过其类型、标题和内容来定义

**输入**

```md
::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字
:::
```

**输出**

::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字

还可以加入代码块

```md
Hello, VitePress!
```
:::


> 为什么和我不一样？
>
> 我对样式进行了修改，请查看 [样式美化 - 容器颜色](./style.md#容器颜色)


::: details 不喜欢添加在后面，可以直接在配置中自定义标题

```ts{4-12}
// .vitepress/config.mts
export default defineConfig({

  markdown: { // [!code focus:9]
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }

})
```
:::


### GitHub风格警报

你也可以使用 [GitHub 风格的警报](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)，只是书写方式不同，使用上是一样的


**输入**

```md
> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```


**输出**

> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。



::: details 如果你是 Typora 的用户，本地不生效

使用下面代码进行配置，本代码由 [Aurorxa](https://github.com/Aurorxa) 提供

```ts{4-25}
// .vitepress/config.mts
export default defineConfig({

  markdown: {
    config: (md) => {
      // 创建 markdown-it 插件
      md.use((md) => {
        const defaultRender = md.render
        md.render = function (...args) {

          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          defaultContent = defaultContent
                .replace(/NOTE/g, '提醒')
                .replace(/TIP/g, '建议')
                .replace(/IMPORTANT/g, '重要')
                .replace(/WARNING/g, '警告')
                .replace(/CAUTION/g, '注意')
          // 返回渲染的内容
          return defaultContent
        }
      })
    }
  },

})
```
:::

### Badge组件

徽章可让您向标题添加状态

**输入**

```md
* 标题 <Badge type="info" text="default" />
* 标题 <Badge type="tip" text="^1.9.0" />
* 标题 <Badge type="warning" text="beta" />
* 标题 <Badge type="danger" text="caution" />
```


**输出**

* 标题 <Badge type="info" text="default" />
* 标题 <Badge type="tip" text="^1.9.0" />
* 标题 <Badge type="warning" text="beta" />
* 标题 <Badge type="danger" text="caution" />

你也可以自定义 `children`

**输入**

```md
* 标题 <Badge type="info">custom element</Badge>
```

**输出**

* 标题 <Badge type="info">custom element</Badge>


您可以通过覆盖 css 变量来自定义徽章的 `background-color`

默认值：

::: details 点击查看css变量 

var的值都改程颜色代码即可

例如：`--vp-badge-info-border: #ffffff;`

```css
:root {
  --vp-badge-info-border: transparent;
  --vp-badge-info-text: var(--vp-c-text-2);
  --vp-badge-info-bg: var(--vp-c-default-soft);

  --vp-badge-tip-border: transparent;
  --vp-badge-tip-text: var(--vp-c-tip-1);
  --vp-badge-tip-bg: var(--vp-c-tip-soft);

  --vp-badge-warning-border: transparent;
  --vp-badge-warning-text: var(--vp-c-warning-1);
  --vp-badge-warning-bg: var(--vp-c-warning-soft);

  --vp-badge-danger-border: transparent;
  --vp-badge-danger-text: var(--vp-c-danger-1);
  --vp-badge-danger-bg: var(--vp-c-danger-soft);
}
```
:::


## 代码块

### 语法高亮

VitePress 使用 [Shiki](https://github.com/shikijs/shiki) 在 Markdown 代码块中使用彩色文本实现语法高亮。Shiki 支持多种编程语言。需要做的就是将有效的语言别名附加到代码块的开头：

**输入**

````
```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

**输出**

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```


```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

### 行高亮

**输入**

````
```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

**输出**

```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```

除了单行之外，还可以指定多个单行、多行，或两者均指定：

- 多行：例如 `{5-8}`、`{3-10}`、`{10-17}`
- 多个单行：例如 `{4,7,9}`
- 多行与单行：例如 `{4,7-13,16,23-27,40}`

**输入**

````
```ts{2-3,5}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

**输出**

```ts{2-3,5}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```


也可以使用 `// [!code highlight]`


**输入**

````md
```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例", // [!!code highlight]
})
```
````


**输出**

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例", // [!code highlight]
})
```


也可以通过 `// [!code highlight:<lines>]` 连续行号

**输入**

````md
```ts
export default defineConfig({
  lang: 'zh-CN', // [!!code highlight:3]
  title: "VitePress Lab",
  description: "文档测试与插件示例",
})
```
````


**输出**

```ts
export default defineConfig({
  lang: 'zh-CN', // [!code highlight:3]
  title: "VitePress Lab",
  description: "文档测试与插件示例",
})
```


### 聚焦代码

在某一行后添加 `// [!code focus]` 注释会聚焦该行，并模糊代码的其他部分。

此外，可以使用 `// [!code focus:<lines>]` 定义要聚焦的行数。


**输入**

````
```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例", // [!!code focus]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

**输出**

```ts{4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress Lab",
  description: "文档测试与插件示例", // [!code focus]
  titleTemplate: '另起标题覆盖title' ,
})
```

如果你要聚焦连续多行，可以使用 `// [!code focus:<lines>]`

::: tip 说明
从添加行的位置开始，输入最终聚焦的行号即可

分散的行，请单独添加使用
:::

**输入**


````
```ts{2-5}
export default defineConfig({
  lang: 'zh-CN', // [!!code focus:4]
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

**输出**

```ts{2-5}
export default defineConfig({
  lang: 'zh-CN', // [!code focus:4]
  title: "VitePress Lab",
  description: "文档测试与插件示例",
  titleTemplate: '另起标题覆盖title' ,
})
```


### 增减差异

在某一行上添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。

**输入**

````
```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress Lab", 
  description: "文档测试与插件示例", // [!!code --]
  description: "更详细的vitpress中文文档教程", // [!!code ++]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

**输出**

```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress Lab", 
  description: "文档测试与插件示例", // [!code --]
  description: "更详细的vitpress中文文档教程", // [!code ++]
  titleTemplate: '另起标题覆盖title' ,
})
```


### 错误和警告

在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。

**输入**

````
```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress Lab", 
  description: "文档测试与插件示例", // [!!code error]
  description: "更详细的vitpress中文文档教程", // [!!code warning]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

**输出**

```ts{4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress Lab", 
  description: "文档测试与插件示例", // [!code error]
  description: "更详细的vitpress中文文档教程", // [!code warning]
  titleTemplate: '另起标题覆盖title' ,
})
```


### 行号显示

可以通过以下配置为每个代码块启用行号：

```ts{2-6}
export default defineConfig({
  //markdown配置 // [!code focus:6]
  markdown: {
    //行号显示
    lineNumbers: true, //false关闭
  },
})
```

可以在代码块中添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖在配置中的设置。

如果你在某个代码块不想使用，可以通过 `ts:no-line-numbers` 来临时关闭

还可以通过在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块中的行号从 2 开始。

**输入**

````md
```ts:no-line-numbers {1}
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 默认启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

**输出**

```ts:no-line-numbers {1}
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// 默认启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```


### 代码组

可以像这样对多个代码块进行分组与 Vuepress 不同，我们用 `code-group` 包裹

```
::: code-group
:::
```

**输入**

````
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

**输出**


::: tip 为什么我的有小圆点
因为我对 [代码组样式](./style.md#代码组) 进行了美化，可以按需配置
:::


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


### 代码块嵌套

比如我们想展示代码块的写法，但是反引号已经用了

那么我们就用4个反引号 ```` ，以此类推即可

::: tip 说明
这个使用方法，其实我在 [Markdown教程](https://yiov.top/computer/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97%E5%B5%8C%E5%A5%97) 里已经说过了
:::

输入：

`````md
````
```
pnpm run docs:dev
```
````
`````

输出：


````sh
```
pnpm run docs:dev
```
````


### 代码块带标题

**输入**

````md
```c [HelloWorld.c]
#include <stdio.h>

int main(){

  printf("Hello World !!!");

  return 0;
}

```
````

**输出**

```c [HelloWorld.c]
#include <stdio.h>

int main(){

  printf("Hello World !!!");

  return 0;
}
```

::: danger 如何做到的呢
请参考 [样式美化-代码块带标题](./style.md#代码块带标题) 教程
:::


