import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,
      include: path.resolve(__dirname, './path/to/src/locales/**')
    })
  ]
})
