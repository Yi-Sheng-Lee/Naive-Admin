const Layout = () => import('@/layout/index.vue')

export default {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {
            name: 'Dashboard',
            path: 'dashboard',
            component: () => import('./Dashboard.vue'),
            meta: {
                title: '儀表板',
                icon: 'dashboard',
                role: ['admin'],
                // order: 0,
                requireAuth: true,
                keepAlive: true,
            },
        }
    ],
}
