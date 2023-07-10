const Layout = () => import('@/layout/index.vue')

export default {
    name: 'System',
    path: '/system',
    component: Layout,
    redirect: '',
    meta: {
        title: '系統',
        customIcon: 'logo',
        role: ['admin'],
        requireAuth: true,
        order: 4,
    },
    children: [
        {
            name: 'UserManage',
            path: 'user',
            component: () => import('./user/index.vue'),
            meta: {
                title: '使用者管理',
                icon: 'ic:baseline-table-view',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
            },
        },
        {
            name: 'RoleManage',
            path: 'role',
            component: () => import('./role/index.vue'),
            meta: {
                title: '角色權限管理',
                icon: 'ic:baseline-table-view',
                role: ['admin'],
                requireAuth: true,
                keepAlive: true,
            },
        },
        // {
        //     name: 'MDEditor',
        //     path: 'md-editor',
        //     component: () => import('./editor/md-editor.vue'),
        //     meta: {
        //         title: 'MD编辑器',
        //         icon: 'ri:markdown-line',
        //         role: ['admin'],
        //         requireAuth: true,
        //         keepAlive: true,
        //     },
        // },
    ],
}
