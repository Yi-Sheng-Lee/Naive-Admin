<template>
    <TheIcon class="mr-20" :icon="isFullscreen ? 'expand-exit' : 'expand'" :size="18" style="cursor: pointer" @click="toggle" />
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>
