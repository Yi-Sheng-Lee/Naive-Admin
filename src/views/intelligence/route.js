const Layout = () => import('@/layout/index.vue')

export default {
    name: 'Intelligence',
    path: '/intelligence',
    component: Layout,
    redirect: '',
    meta: {
        title: '情資管理',
        icon: 'virus',
        role: ['admin'],
        requireAuth: true,
        order: 6,
    },
    children: [
        {
            name: 'LogIntelligence',
            path: 'log',
            component: () => import('./log/LogIntelligence.vue'),
            meta: {
                title: '日誌情資整合',
                icon: 'virus-search',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 1
            },
        },
    ]
}