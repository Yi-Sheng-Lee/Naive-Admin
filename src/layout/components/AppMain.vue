<template>
    <router-view v-slot="{ Component, route }">
        <KeepAlive :include="keepAliveRouteNames">
            <component
                :is="Component"
                v-if="appStore.reloadFlag"
                :key="appStore.aliveKeys[route.name] || route.fullPath"
            />
        </KeepAlive>
    </router-view>
    <n-back-top z-3 :right="30" :visibility-height="10"/>
</template>

<script setup>
import { useAppStore } from '@/store'
import { useRouter } from 'vue-router'
const appStore = useAppStore()
const router = useRouter()

const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
    return allRoutes
        .filter((route) => route.meta?.keepAlive)
        .map((route) => route.name)
})
</script>
