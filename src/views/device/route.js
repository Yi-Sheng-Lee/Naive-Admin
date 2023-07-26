const Layout = () => import('@/layout/index.vue')

export default {
    name: 'Device',
    path: '/device',
    component: Layout,
    redirect: '',
    meta: {
        title: '設備管理',
        icon: 'device',
        role: ['admin'],
        requireAuth: true,
        order: 4,
    },
    children: [
        {
            name: 'DeviceAsset',
            path: 'asset',
            component: () => import('./asset/DeviceAsset.vue'),
            meta: {
                title: '設備管理',
                icon: 'asset',
                role: ['admin'],
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
            name: 'DeviceAssetGroup',
            path: 'asset_group',
            component: () => import('./asset_group/DeviceAssetGroup.vue'),
            meta: {
                title: '設備群組管理',
                icon: 'asset-group',
                role: ['admin'],
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
            name: 'DeviceAgent',
            path: 'agent',
            component: () => import('./agent/DeviceAgent.vue'),
            meta: {
                title: 'Agent管理',
                icon: 'shield-key',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 3
            },
        },
        {
            name: 'DeviceParser',
            path: 'parser',
            component: () => import('./parser/DeviceParser.vue'),
            meta: {
                title: 'Parser Plugin 管理',
                icon: 'puzzle',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 4
            },
        },
        {
            name: 'DeviceMonitor',
            path: 'monitor',
            component: () => import('./monitor/DeviceMonitor.vue'),
            meta: {
                title: '設備收容監控',
                icon: 'monitor',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 5
            },
        },
        {
            name: 'DeviceUnmonitored',
            path: 'unmonitored',
            component: () => import('./unmonitored/DeviceUnmonitored.vue'),
            meta: {
                title: '未列管設備管理',
                icon: 'unmonitored',
                role: ['admin'],
                requireAuth: true,
                keepAlive: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                order: 6
            },
        },
    ]
}