import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

import { ElectronDevPlugin } from './plugins/vite.electron.dev'
import { ElectronBuildPlugin } from './plugins/vite.electron.build'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElectronDevPlugin(),
    ElectronBuildPlugin()
  ],
  base: './',
  resolve: {
    alias: {
      '@' : path.resolve(__dirname,'src')
    }
  }
})
