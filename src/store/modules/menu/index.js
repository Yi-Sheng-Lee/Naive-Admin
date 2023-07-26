import { defineStore } from 'pinia'
// import { i18n } from '@/i18n'
import api from '@/api'

export const useMenuStore = defineStore('menu', {
    state() {
        return {
            menu: {}
        }
    },
    getters: {
        user() {
            return this.menu?.user
        },
        role() {
            return this.menu?.role
        }
    },
    actions: {
        async getUserMenu() {
            try {
                const res = await api.getUserMenu()
                this.menu.user = res.map(el => {
                    return {
                        label: el.name,
                        value: el.uid
                    }
                })

                // this.menu.role.unshift({
                //     label: i18n.t('userManage.name'),
                //     value: ''
                // })
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async getRoleMenu() {
            try {
                const res = await api.getRoleMenu()
                this.menu.role = res.map(el => {
                    return {
                        label: el.name,
                        value: el.uid
                    }
                })
                // console.log(i18n.global.t('userManage.name'))
                // this.menu.role.unshift({
                //     label: i18n.global.t('userManage.name'),
                //     value: ''
                // })
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})