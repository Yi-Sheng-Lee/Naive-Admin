const Layout = () => import('@/layout/index.vue')

export default {
    name: 'System',
    path: '/system',
    component: Layout,
    redirect: '',
    meta: {
        title: '系統設定',
        icon: 'system-setting',
        role: ['admin'],
        requireAuth: true,
        order: 4,
    },
    children: [
        {
            name: 'UserManage',
            path: 'user',
            component: () => import('./user/UserManage.vue'),
            meta: {
                title: '使用者管理',
                icon: 'user',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 1
            },
        },
        {
            name: 'RoleManage',
            path: 'role',
            component: () => import('./role/RoleManage.vue'),
            meta: {
                title: '角色權限管理',
                icon: 'role',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 2
            },
        },
        {
            name: 'SystemInfo',
            path: 'info',
            component: () => import('./info/SystemInfo.vue'),
            meta: {
                title: '系統資訊',
                icon: 'system-info',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 3
            },
        },
        {
            name: 'SystemService',
            path: 'service',
            component: () => import('./service/SystemService.vue'),
            meta: {
                title: '服務狀態',
                icon: 'system-service',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 4
            },
        },
        {
            name: 'SystemBackup',
            path: 'backup',
            component: () => import('./backup/SystemBackup.vue'),
            meta: {
                title: '備份管理',
                icon: 'backup',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 5
            },
        },
        {
            name: 'SystemAudit',
            path: 'audit',
            component: () => import('./audit/SystemAudit.vue'),
            meta: {
                title: '操作記錄管理',
                icon: 'audit',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 6
            },
        },
        {
            name: 'SystemCluster',
            path: 'cluster',
            component: () => import('./cluster/SystemCluster.vue'),
            meta: {
                title: '叢集狀態',
                icon: 'cluster',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
                order: 7
            },
        }
    ],
}
