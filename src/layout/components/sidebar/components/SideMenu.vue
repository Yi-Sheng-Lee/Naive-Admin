<template>
    <n-menu
        class="side-menu"
        accordion
        :indent="18"
        :collapsed-icon-size="22"
        :collapsed-width="64"
        :options="menuOptions"
        :value="curRoute.meta?.activeMenu || curRoute.name"
        @update:value="handleMenuSelect"
    />
</template>

<script setup>
import { usePermissionStore, useAppStore } from '@/store'
import { renderCustomIcon, isExternal } from '@/utils'

const router = useRouter()
const curRoute = useRoute()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const i18n = useI18n()

const menuOptions = computed(() => {
    return permissionStore.menus
        .map((item) => getMenuItem(item))
        .sort((a, b) => a.order - b.order)
})

function resolvePath(basePath, path) {
    if (isExternal(path)) return path
    return (
        '/' +
        [basePath, path]
            .filter((path) => !!path && path !== '/')
            .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
            .join('/')
    )
}

function getMenuItem(route, basePath = '') {
    let menuItem = {
        label: (route.meta && i18n.t(route.meta.title[0])) || route.name,
        key: route.name,
        path: resolvePath(basePath, route.path),
        icon: getIcon(route.meta),
        order: route.meta?.order || 0,
    }

    if (route.meta?.query) menuItem.query = route.meta?.query

    const visibleChildren = route.children
        ? route.children.filter((item) => item.name && !item.isHidden)
        : []

    if (!visibleChildren.length) return menuItem

    if (visibleChildren.length === 1) {
        // 單個子路由處理
        const singleRoute = visibleChildren[0]
        menuItem = {
            label: i18n.t(singleRoute.meta?.title[0]) || singleRoute.name,
            key: singleRoute.name,
            path: resolvePath(menuItem.path, singleRoute.path),
            icon: getIcon(singleRoute.meta),
            order: menuItem.order,
        }
        const visibleItems = singleRoute.children
            ? singleRoute.children.filter((item) => item.name && !item.isHidden)
            : []

        if (visibleItems.length === 1) {
            menuItem = getMenuItem(visibleItems[0], menuItem.path)
        } else if (visibleItems.length > 1) {
            menuItem.children = visibleItems
                .map((item) => getMenuItem(item, menuItem.path))
                .sort((a, b) => a.order - b.order)
        }
    } else {
        menuItem.children = visibleChildren
            .map((item) => getMenuItem(item, menuItem.path))
            .sort((a, b) => a.order - b.order)
    }

    return menuItem
}

function getIcon(meta) {
    if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 })
    if (meta?.icon) return renderCustomIcon(meta.icon, { size: 18 })
    return null
}

function handleMenuSelect(key, item) {
    if (isExternal(item.path)) {
        window.open(item.path)
    } else {
        if (item.path === curRoute.path) {
            appStore.reloadPage()
        } else {
            router.push({
                path: item.path,
                query: item?.query || ''
            })
        }
    }
}
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
    .n-menu-item-content {
        &::before {
            left: 5px;
            right: 5px;
        }
        &.n-menu-item-content--selected,
        &:hover {
            &::before {
                border-left: 4px solid var(--primary-color);
            }
        }
    }
}
</style>
