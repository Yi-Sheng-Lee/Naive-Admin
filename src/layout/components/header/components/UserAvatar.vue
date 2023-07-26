<template>
    <n-dropdown :options="options" @select="handleSelect">
        <div flex items-center cursor-pointer>
            <!-- <img :src="userStore.avatar" mr10 w-35 h-35 rounded-full /> -->
            <span>{{ userStore.name }} ({{ userStore.roleName}})</span>
        </div>
    </n-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderCustomIcon } from '@/utils'

const userStore = useUserStore()
const i18n = useI18n()

const options = [
    {
        label: '登出',
        key: 'logout',
        icon: renderCustomIcon('logout', { size: '14px' }),
    },
]

function handleSelect(key) {
    if (key === 'logout') {
        $dialog.confirm({
            title: '提示',
            type: 'info',
            content: '確認登出？',
            positiveText: i18n.t('action.confirm'),
            confirm: async() => {
                await userStore.logout()
                $message.success('登出成功')
            },
            negativeText: i18n.t('action.cancel')
        })
    }
}
</script>
