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
    <TheIcon class="mr-20 cursor-pointer" :icon="isDark ? 'moon' : 'sunny'" :size="18" @click="toggleDark"/>
</template>