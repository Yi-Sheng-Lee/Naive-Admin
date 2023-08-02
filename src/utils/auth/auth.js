import { router } from '@/router'
import { useUserStore } from '@/store'

export function toLogin() {
    const currentRoute = unref(router.currentRoute)
    const needRedirect =
        !currentRoute.meta.requireAuth &&
        !['/404', '/login'].includes(router.currentRoute.value.path)
    router.replace({
        path: '/login',
        query: needRedirect
            ? { ...currentRoute.query, redirect: currentRoute.path }
            : {},
    })
}

export function toFourZeroFour() {
    router.replace({
        path: '/404',
    })
}

export function authCheck (auth, operation) {
    return useUserStore().isAdmin || (auth in useUserStore().role && useUserStore.auth.includes(operation))
}
