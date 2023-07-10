<template>
    <n-config-provider
        wh-full
        :theme-overrides="naiveThemeOverrides"
        :theme="appStore.isDark ? darkTheme : undefined"
    >
        <slot />
    </n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui'
import { useCssVar } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
import { naiveThemeOverrides } from '~/settings'
import { useAppStore } from '@/store'

const appStore = useAppStore()

function setupCssVar() {
    const common = naiveThemeOverrides.common
    for (const key in common) {
        useCssVar(`--${kebabCase(key)}`, document.documentElement).value =
            common[key] || ''
        if (key === 'primaryColor')
            window.localStorage.setItem('__THEME_COLOR__', common[key] || '')
    }
}
setupCssVar()
</script>
