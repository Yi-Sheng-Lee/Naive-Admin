import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { useTagsStore, usePermissionStore } from '@/store'
import { getToken, removeToken, toLogin } from '@/utils'
import api from '@/api'

export const useUserStore = defineStore('user', {
    state() {
        return {
            userInfo: {},
        }
    },
    getters: {
        userUid() {
            return this.userInfo?.uid
        },
        name() {
            return this.userInfo?.name
        },
        isAdmin() {
            return this.userInfo?.is_admin
        },
        role() {
            return this.userInfo?.auth || {}
        },
        roleName() {
            return this.userInfo?.role_name
        },
        locale() {
            return this.userInfo?.locale || 'zh_tw'
        }
    },
    actions: {
        async getUserInfo() {
            try {
                const user_uid = getToken()['uid']
                const res = await api.getUser(user_uid)
                const authList = {}
                
                this.userInfo = res
                res.auth.forEach(auth => {

                    if (!Object.keys(authList).includes(auth.p_name)) {
                        authList[auth.p_name] = []
                    }
                    authList[auth.p_name].push(auth.o_name)
                })

                delete this.userInfo['permissions']

                this.setUserInfo({auth: authList})
                
                return Promise.resolve(res.data)
            } catch (error) {
                return Promise.reject(error)
            }
        },
        async logout() {
            const { resetTags } = useTagsStore()
            const { resetPermission } = usePermissionStore()
            removeToken()
            resetTags()
            resetPermission()
            resetRouter()
            this.$reset()
            toLogin()
        },
        setUserInfo(userInfo = {}) {
            this.userInfo = { ...this.userInfo, ...userInfo }
        }
    },
})
