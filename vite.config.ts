import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { VarletUIResolver, TDesignResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver(), VarletUIResolver(), TDesignResolver({
        library:'mobile-vue'
      })],
    }),
    autoImport({
      resolvers:[VarletUIResolver({autoImport: true}), TDesignResolver({
        library:'mobile-vue'
      })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
