# 專案使用 Vue 3 + Typescript + Vite + TailwindCss

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

# 專案指令
### 運行專案
```
npm run dev
```
### 產出專案
```
npm run build
```
# 多頁面配置
## vite.config.ts 配置打包輸出選項
build的設置，在打包時，會抓取該html進行打包輸出
```javascript
root:mode === 'development' ? '':resolve(__dirname, ''),
base: env.VITE_BASE_URL,
build: {
  outDir:resolve(__dirname, 'dist'),
  emptyOutDir: true,
  rollupOptions: {
      input: {
        main: resolve(__dirname,'src/main.html'),
        template2: resolve(__dirname,'src/template2.html')
      }
    }
}
```
## 讓HTML可以接收env參數- 使用 vite-plugin-html
檔案結構如下 : 
src----
  pages----
    main----
      APP.vue
      main.ts
    template2----
      APP.vue
      main.ts
  index.html
  main.html
  template2.html

```javascript
import { createHtmlPlugin } from 'vite-plugin-html'

***********
 plugins: [
      vue(),
      createHtmlPlugin({
        minify:true,
        pages:[
         {
            entry:mode === 'development' ?`src/pages/main/main.ts` : resolve(`src/pages/main/main.ts`),  //為template注入entry入口檔案( 所以該html檔案就不需要寫script囉! )
            filename:'main.html',  //只能用index.html
            template:'src/main.html',   //要使用哪一個檔案作為模板
            injectOptions:{
              data:{
                title:env.VITE_TITLE
              }
            }
          },
          {
            entry:mode === 'development' ?`src/pages/template2/main.ts` : resolve(`src/pages/template2/main.ts`),  //為template注入entry入口檔案( 所以該html檔案就不需要寫script囉! )
            filename:'template2.html',  //只能用index.html
            template:'src/template2.html',   //要使用哪一個檔案作為模板
            injectOptions:{
              data:{
                title:env.VITE_TITLE
              }
            }
          },
          {   //給開發時使用，切換env檔案，按下npm run dev 就會自動抓取不同入口
            entry:mode === 'development' ?`src/pages/${env.VITE_TEMPLATE}/main.ts` : resolve(`src/pages/${env.VITE_TEMPLATE}/main.ts`),  //為template注入entry入口檔案( 所以該html檔案就不需要寫script囉! )
            filename:'index.html',  //只能用index.html
            template:'src/index.html',   //要使用哪一個檔案作為模板
            injectOptions:{
              data:{
                title:env.VITE_TITLE
              }
            }
          },
        ]
      })
    ],
```



# Tailwind 使用
## 安裝
```
npm install tailwindcss autoprefixer postcss
```
### 1.將tailwind導入到CSS檔案中
```css
@tailwind base; 
@tailwind components;
@tailwind utilities;
```
### 2.建立 postcss.config.js檔案
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
### 3.建立tailwind的設定檔
```
npx tailwindcss init

//獲得完整版的設定檔案
npx tailwindcss init --full

```
### 4.修改設定檔的content
```javascript
//tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
}
```
## 推薦安裝VS code套件 : tailwindcss

# vue 風格指南
## 務必遵守 : 
### 1. v-for 要搭配 key值
```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
### 2. 元件命名-多單詞
```javascript
//錯誤示範
Vue.component('todo', {
  // ...
})

//正確示範
Vue.component('todo-item', {
  // ...
})

```
## 強烈推薦 : 
### 1. 盡可能的元件化 
例如，todoList就可以拆成，todoList.vue、todoItem.vue
### 2. 絕對不要使用縮寫命名
### 3. 元件命名規範 : 
#### (1)單詞的組合應以 較為高層次的抽象概念 作為開頭
```
//錯誤
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue

//正確
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```
#### (2)用The前綴表示 唯一 的元件
通常這種元件只會在某頁面出現一次，且應該不屬於"展示用元件"，所以不應使用prop傳值。
例如 : Header、SideBar、Nav等元件
```
components/
|- TheHeading.vue
|- TheSidebar.vue
```
#### (3)用父元件名稱作為子元件命名前綴
```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```
### 4. 元件的attributem原則
#### 一行、且須帶引號 (安裝插件Prettire進行格式化即可)
```html
<!-- 錯誤示範 -->
<input type=text>
<MyComponent foo="a" bar="b" baz="c"/>

<!-- 正確示範 -->
<input type="text">
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```
### 5.盡量讓template只做渲染，不做複雜邏輯
```
//錯誤
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}

//正確
{{ normalizedFullName }}
//請寫在computed裡面
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
### 6. 統一使用縮寫指令 : 
用 : 表示 v-bind:、 <br>用 @ 表示 v-on: <br>用 # 表示 v-slot: <br>
### 7. props的名稱使用
在js中使用 camelCase ； 在HTML中使用 kebab-case
```javascript
props: {
  greetingText: String
}
//在模板中使用
<WelcomeMessage greeting-text="hi"/>
```
