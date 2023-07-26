const Layout = () => import('@/layout/index.vue')

export default {
    name: 'ES',
    path: '/es',
    component: Layout,
    redirect: '',
    meta: {
        title: '索引日誌管理',
        icon: 'catalog',
        role: ['admin'],
        requireAuth: true,
        order: 3,
    },
    children: [
        {
            name: 'EsSearch',
            path: 'search',
            component: () => import('./search/EsSearch.vue'),
            meta: {
                title: '索引日誌查詢',
                icon: 'database-search',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 1
            },
        },
        {
            name: 'EsSearchCondition',
            path: 'search_condition',
            component: () => import('./search_condition/EsSearchCondition.vue'),
            meta: {
                title: '常用搜尋條件管理',
                icon: 'manage-search',
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