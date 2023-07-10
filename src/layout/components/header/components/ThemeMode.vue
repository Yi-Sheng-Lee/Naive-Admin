<script setup>
import { useAppStore } from '@/store'
import { useDark, useToggle } from '@vueuse/core'

const appStore = useAppStore()
const isDark = useDark()
const toggleDark = () => {
    appStore.toggleDark()
    useToggle(isDark)()
}
</script>

<template>
    <!-- <div mr20 cursor-pointer>
        
    </div> -->
    <TheIcon :icon="isDark ? 'moon' : 'sunny'" :size="18" @click="toggleDark"/>
    <!--  -->
    <!-- <n-icon  cursor-pointer >
        <icon-mdi-moon-waning-crescent v-if="isDark" />
        <icon-mdi-white-balance-sunny v-else />
        <the-icon :icon="isDark ? 'moon' : 'sunny'" :size="18"/>
    </n-icon> -->
</template>