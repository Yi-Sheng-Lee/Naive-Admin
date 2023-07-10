const Layout = () => import('@/layout/index.vue')

export default {
    name: 'System',
    path: '/system',
    component: Layout,
    redirect: '',
    meta: {
        title: '系統',
        icon: 'system',
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
            },
        }
    ],
}
