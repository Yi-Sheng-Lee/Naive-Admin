const Layout = () => import('@/layout/index.vue')

export default {
    name: 'Demo',
    path: '/demo',
    component: Layout,
    redirect: '/demo/crud-table',
    isHidden: true,
    meta: {
        title: '示例页面',
        customIcon: 'logo',
        requireAuth: false,
        order: 3,
    },
    children: [
        {
            name: 'CrudTable',
            path: 'crud-table',
            component: () => import('./table/index.vue'),
            meta: {
                title: 'CRUD表格',
                icon: 'ic:baseline-table-view',
                requireAuth: false,
                keepAlive: false,
            },
        }
    ],
}
