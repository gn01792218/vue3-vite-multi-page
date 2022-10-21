import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')
const root = resolve(__dirname,'src')
const outDir = resolve(__dirname,'dist')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define:{
    'process.env':{}
  },
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  },
  build:{
    outDir,
    emptyOutDir:true,
    rollupOptions: {
      input:{
        //第一個參數是根目錄，第二個參數是資料夾路徑，第三個參數是入口檔案
        main: resolve(root,'pages/main','index.html'),
        template2: resolve(root,'pages/template2/','index.html')
      }
    }
  }
})
