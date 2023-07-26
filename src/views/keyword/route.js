const Layout = () => import('@/layout/index.vue')

export default {
    name: 'Keyword',
    path: '/keyword',
    component: Layout,
    redirect: '',
    meta: {
        title: '關鍵字告警管理',
        icon: 'alert',
        role: ['admin'],
        requireAuth: true,
        order: 4,
    },
    children: [
        {
            name: 'KeywordRule',
            path: 'rule',
            component: () => import('./rule/KeywordRule.vue'),
            meta: {
                title: '關鍵字規則管理',
                icon: 'rule',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 1
            },
        },
        {
            name: 'KeywordAlarm',
            path: 'alarm',
            component: () => import('./alarm/KeywordAlarm.vue'),
            meta: {
                title: '關鍵字告警管理',
                icon: 'alert-channel',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 2
            },
        },
        {
            name: 'KeywordAlarmHistorySearch',
            path: 'alarm_history_search',
            component: () => import('./alarm_history_search/KeywordAlarmHistorySearch.vue'),
            meta: {
                title: '關鍵字告警歷史紀錄查詢',
                icon: 'history',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 3
            },
        },
    ]
}