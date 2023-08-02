const Layout = () => import('@/layout/index.vue')

export default {
    name: 'System',
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
        title: ['menu.system'],
        icon: 'system-setting',
        // role: [],
        requireAuth: false,
        order: 5,
    },
    children: [
        {
            name: 'UserManage',
            path: 'user',
            component: () => import('./users/UsersManage.vue'),
            meta: {
                title: ['components.systemUsers'],
                icon: 'user',
                role: ['USER_MANAGE_VIEW'],
                requireAuth: true,
                keepAlive: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 1
            },
        },
        {
            name: 'AddUserDetail',
            path: 'user/add',
            component: () => import('./users/UserDetail.vue'),
            isHidden: true,
            meta: {
                title: ['action.add', 'components.systemUsers'],
                icon: 'user',
                role: ['USER_MANAGE_CREATE'],
                requireAuth: true,
                keepAlive: false,
                order: 1
            },
        },
        {
            name: 'EditUserDetail',
            path: 'user/edit/:uid',
            component: () => import('./users/UserDetail.vue'),
            isHidden: true,
            meta: {
                title: ['action.edit', 'components.systemUsers'],
                icon: 'user',
                role: ['USER_MANAGE_UPDATE'],
                requireAuth: true,
                keepAlive: false,
                order: 1
            },
        },
        {
            name: 'RoleManage',
            path: 'role',
            component: () => import('./role/RoleManage.vue'),
            meta: {
                title: ['components.systemRoles'],
                icon: 'role',
                role: ['ROLE_MANAGE_VIEW'],
                requireAuth: true,
                keepAlive: false,
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
                keepAlive: false,
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
                keepAlive: false,
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
                keepAlive: false,
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
                keepAlive: false,
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
                keepAlive: false,
                order: 7
            },
        }
    ],
}
