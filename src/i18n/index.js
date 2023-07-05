import { createI18n } from 'vue-i18n'

export async function setupI18n(app) {
    const i18n = {
        legacy: false,
        globalInjection: true, // 全域注入，讓你在 <template> 可以使用 $t
        locale: 'zh_tw', // 初始的語言，之後可以實作把他按照情境替換成en
        messages: {},
    }
    
    /** 動態載入 /src/i18n/lang/*json 檔案 */
    const modules = import.meta.glob('@/i18n/lang/*.json', { eager: true })

    Object.entries(modules).forEach(([path, module]) => {
        console.log(path, module)
        const key = path.split('/').pop().split('.')[0]
        i18n.messages[key] = module
    })


    console.log(modules)

    
    app.use(createI18n(i18n))
}