<template>
    <n-dropdown
        :options="options"
        @select="handleSelect"
    >
        <div f-c-c mr-20>
            <TheIcon class="mr-5" :icon="userStore?.locale.split('_')[1] || 'tw'" :size="24" color="white"/>
            <span class="cursor-pointer">{{ $t(`language.${userStore.locale}`) }}</span>
        </div>
    </n-dropdown>
</template>
<script setup>
import { useUserStore } from '@/store'
import { renderCustomIcon } from '@/utils'

const i18n = useI18n()
const route = useRoute()
const userStore = useUserStore()

const options = computed(() => genLanguageMenu()) || []

function genLanguageMenu () {
    let locales = i18n.availableLocales
    locales = locales.map(lang => {
        return {
            label: i18n.t(`language.${lang}`),
            key: lang,
            icon: renderCustomIcon(lang.split('_')[1], {size: 30, color: 'white'})
        }
    })
    return locales
}

function handleSelect (key) {
    userStore.setUserInfo({ locale: key })
    i18n.locale.value = key
    const pageTitle = route.meta?.title
    const baseTitle = import.meta.env.VITE_TITLE
    if (pageTitle) {
        document.title =
            `${pageTitle.length > 1 ? i18n.t(pageTitle[0], { name: i18n.t(pageTitle[1])}) : i18n.t(pageTitle[0]) } | ${baseTitle}`
    } else {
        document.title = baseTitle
    }
    console.log(i18n.locale.value)
}
</script>