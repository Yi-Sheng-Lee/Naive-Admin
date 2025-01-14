/** 重置样式 */
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupI18n } from '@/i18n'
import App from './App.vue'
import { setupNaiveDiscreteApi } from './utils'

async function setupApp() {
    const app = createApp(App)

    await setupI18n(app)
    setupStore(app)
    setupNaiveDiscreteApi()
    await setupRouter(app)
    
    app.mount('#app')
}

setupApp()
