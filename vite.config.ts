import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        minify:true,
        pages:[
          {   //給開發時使用，切換env檔案，按下npm run dev 就會自動抓取不同入口
            entry:mode === 'development' ?`src/pages/${env.VITE_TEMPLATE}/main.ts` : resolve(`src/pages/${env.VITE_TEMPLATE}/main.ts`),  //為template注入entry入口檔案( 所以該html檔案就不需要寫script囉! )
            filename:'index.html',
            template:'src/index.html',   //要使用哪一個檔案作為模板
            injectOptions:{
              data:{
                title:env.VITE_TITLE
              }
            }
          },
          { //配置main
            entry:mode === 'development' ?`src/pages/main/main.ts` : resolve(`src/pages/main/main.ts`),  //為template注入entry入口檔案( 所以該html檔案就不需要寫script囉! )
            filename:'main.html', 
            template:'src/main.html',   //要使用哪一個檔案作為模板
            injectOptions:{
              data:{
                title:env.VITE_TITLE
              }
            }
          },
          { //配置template2
            entry:mode === 'development' ?`src/pages/template2/main.ts` : resolve(`src/pages/template2/main.ts`),  //為template注入entry入口檔案( 所以該html檔案就不需要寫script囉! )
            filename:'template2.html',
            template:'src/template2.html',   //要使用哪一個檔案作為模板
            injectOptions:{
              data:{
                title:env.VITE_TITLE
              }
            }
          },
        ]
      })
    ],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    root:mode === 'development' ? '':resolve(__dirname, ''),
    base: env.VITE_BASE_URL,
    build: {
      outDir:resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          // index:resolve('src/index.html'),  //index這個檔案是給開發時候切換版面用的，因此打包時不需要包出去。若想要包出去，就打開註解
          main: resolve('src/main.html'),
          template2: resolve('src/template2.html')
        }
      }
    }
  })
}
