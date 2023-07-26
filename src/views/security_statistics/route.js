const Layout = () => import('@/layout/index.vue')

export default {
    name: 'SecurityStatistics',
    path: '/security_statistics',
    component: Layout,
    redirect: '',
    meta: {
        title: '資安事件統計',
        icon: 'document-security',
        role: ['admin'],
        requireAuth: true,
        order: 3,
    },
    children: [
        {
            name: 'WindowsSecurityStatistics',
            path: 'windows',
            component: () => import('./windows/WindowsSecurityStatistics.vue'),
            meta: {
                title: 'Windows 事件統計',
                icon: 'windows',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 1
            },
        },
        {
            name: 'LinuxSecurityStatistics',
            path: 'linux',
            component: () => import('./linux/LinuxSecurityStatistics.vue'),
            meta: {
                title: 'Linux 事件統計',
                icon: 'linux',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 2
            },
        },
        {
            name: 'FirewallSecurityStatistics',
            path: 'firewall',
            component: () => import('./firewall/FirewallSecurityStatistics.vue'),
            meta: {
                title: '防火牆事件統計',
                icon: 'firewall',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                order: 3
            },
        },
    ]
}