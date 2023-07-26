const Layout = () => import('@/layout/index.vue')

export default {
    name: 'Regex',
    path: '/regex',
    component: Layout,
    redirect: '',
    meta: {
        title: '正規化日誌管理',
        icon: 'catalog',
        role: ['admin'],
        requireAuth: true,
        order: 3,
    },
    children: [
        {
            name: 'RegexSearch',
            path: 'search',
            component: () => import('./search/RegexSearch.vue'),
            meta: {
                title: '正規化日誌搜尋',
                icon: 'database-search',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 1
            },
        },
        {
            name: 'RegexSchedule',
            path: 'schedule',
            component: () => import('./schedule/RegexSchedule.vue'),
            meta: {
                title: '正規化搜尋排程管理',
                icon: 'schedule',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 2
            },
        },
    ]
}