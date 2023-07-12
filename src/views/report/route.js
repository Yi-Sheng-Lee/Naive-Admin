const Layout = () => import('@/layout/index.vue')

export default {
    name: 'Report',
    path: '/report',
    component: Layout,
    redirect: '',
    meta: {
        title: '報表管理',
        icon: 'report',
        role: ['admin'],
        requireAuth: true,
        order: 5,
    },
    children: [
        {
            name: 'ReportStatistics',
            path: 'statistics',
            component: () => import('./statistics/ReportStatistics.vue'),
            meta: {
                title: '統計報表',
                icon: 'report-search',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 1
            },
        },
        {
            name: 'ReportSchedule',
            path: 'schedule',
            component: () => import('./schedule/ReportSchedule.vue'),
            meta: {
                title: '報表排程',
                icon: 'report-schedule',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 2
            },
        },
        {
            name: 'ReportConfig',
            path: 'config',
            component: () => import('./config/ReportConfig.vue'),
            meta: {
                title: '報表設定',
                icon: 'rule',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 3
            },
        },
    ]
}