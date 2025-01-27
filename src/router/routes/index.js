// const Layout = () => import('@/layout/index.vue')

export const basicRoutes = [
    {
        name: '404',
        path: '/404',
        component: () => import('@/layout/components/error-page/404.vue'),
        isHidden: true,
    },

    {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        isHidden: true,
        meta: {
            title: '登入',
        },
    }
]

export const NOT_FOUND_ROUTE = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    isHidden: true,
}

export const EMPTY_ROUTE = {
    name: 'Empty',
    path: '/:pathMatch(.*)*',
    component: null,
}


// 引入所有 /src/views/**/route.js
const modules = import.meta.glob('@/views/**/route.js', { eager: true })
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
    asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }
