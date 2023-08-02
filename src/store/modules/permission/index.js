import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'

function hasPermission(route, role) {
    // * 不需要權限直接回 true
    if (!route.meta?.requireAuth) return true

    const routeRole = route.meta?.role ? route.meta.role : []

    // * 登入的用戶沒有角色或路由沒有設置角色判定沒有該權限
    if (!role.length || !routeRole.length) return false

    // * 路由指定的角色包含任一登入用戶角色判定有權限
    return role.some((item) => routeRole.includes(item))
}

function filterAsyncRoutes(routes = [], role) {
    const ret = []
    routes.forEach((route) => {
        if (hasPermission(route, role)) {
            const curRoute = {
                ...route,
                children: [],
            }
            if (route.children && route.children.length) {
                curRoute.children = filterAsyncRoutes(route.children, role)
            } else {
                Reflect.deleteProperty(curRoute, 'children')
            }
            ret.push(curRoute)
        }
    })
    return ret
}

export const usePermissionStore = defineStore('permission', {
    state() {
        return {
            accessRoutes: [],
        }
    },
    getters: {
        routes() {
            return basicRoutes.concat(this.accessRoutes)
        },
        menus() {
            return this.routes.filter((route) => route.name && !route.isHidden)
        },
    },
    actions: {
        generateRoutes(role = []) {
            const roleList = []
            Object.entries(role).forEach(([auth, operations]) => {
                operations.forEach(operation => {
                    roleList.push(`${auth}_${operation}`)
                })
            })
            const accessRoutes = filterAsyncRoutes(asyncRoutes, roleList)
            this.accessRoutes = accessRoutes
            return accessRoutes
        },
        resetPermission() {
            this.$reset()
        },
    },
})
