import { getToken, isNullOrWhitespace } from '@/utils'

const WHITE_LIST = ['/login', '/404']
export function createPermissionGuard(router) {
    router.beforeEach(async (to) => {
        const token = getToken()
        /** 没有 token 的情况 */
        if (isNullOrWhitespace(token) ) {
            if (WHITE_LIST.includes(to.path)) return true
            return { path: 'login', query: { ...to.query, redirect: to.path } }
        }

        /** 有 token 的情况 */
        if (to.path === '/login') return { path: '/' }

        return true
    })
}
