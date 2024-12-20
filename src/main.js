import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入 Pinia 状态持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/styles/normalize.css'
import '@arco-design/web-vue/dist/arco.css'
// 导入Unocss样式
import 'uno.css'

// 公共样式
import '@/assets/css/index.css'

import { getConfig } from '@/config/index'
console.log(getConfig('appCode'))
console.log(getConfig('projectName'))
console.log(import.meta.env.VITE_APP_ENV)

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()
// 使用 Pinia 状态持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
