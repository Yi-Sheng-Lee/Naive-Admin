import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state() {
        return {
            reloadFlag: true,
            collapsed: false,
            /** keepAlive 路由的 key，重新給值可重置 keepAlive */
            aliveKeys: {},
        }
    },
    actions: {
        async reloadPage() {
            $loadingBar.start()
            this.reloadFlag = false
            await nextTick()
            this.reloadFlag = true

            setTimeout(() => {
                document.documentElement.scrollTo({ left: 0, top: 0 })
                $loadingBar.finish()
            }, 100)
        },
        switchCollapsed() {
            this.collapsed = !this.collapsed
        },
        setCollapsed(collapsed) {
            this.collapsed = collapsed
        },
        setAliveKeys(key, val) {
            this.aliveKeys[key] = val
        },
    },
})
