<template>
    <n-dropdown
        :show="show"
        :options="options"
        :x="x"
        :y="y"
        placement="bottom-start"
        @clickoutside="handleHideDropdown"
        @select="handleSelect"
    />
</template>

<script setup>
import { useTagsStore, useAppStore } from '@/store'
import { renderCustomIcon } from '@/utils'

const { t } = useI18n()

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    currentPath: {
        type: String,
        default: '',
    },
    x: {
        type: Number,
        default: 0,
    },
    y: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['update:show'])

const tagsStore = useTagsStore()
const appStore = useAppStore()

const options = computed(() => [
    {
        label: t('action.reload'),
        key: 'reload',
        disabled: props.currentPath !== tagsStore.activeTag,
        icon: renderCustomIcon('refresh', { size: '14px' }),
    },
    {
        label: t('action.close'),
        key: 'close',
        disabled: tagsStore.tags.length <= 1,
        icon: renderCustomIcon('close', { size: '14px' }),
    },
    {
        label: t('action.closeOther'),
        key: 'close-other',
        disabled: tagsStore.tags.length <= 1,
        icon: renderCustomIcon('arrow-expand-horizontal', { size: '14px' }),
    },
    {
        label: t('action.closeLeft'),
        key: 'close-left',
        disabled:
            tagsStore.tags.length <= 1 ||
            props.currentPath === tagsStore.tags[0].path,
        icon: renderCustomIcon('arrow-expand-left', { size: '14px' }),
    },
    {
        label: t('action.closeRight'),
        key: 'close-right',
        disabled:
            tagsStore.tags.length <= 1 ||
            props.currentPath ===
                tagsStore.tags[tagsStore.tags.length - 1].path,
        icon: renderCustomIcon('arrow-expand-right', { size: '14px' }),
    },
])

const route = useRoute()
const actionMap = new Map([
    [
        'reload',
        () => {
            if (route.meta?.keepAlive) {
                // 重置keepAlive
                appStore.setAliveKeys(route.name, +new Date())
            }
            appStore.reloadPage()
        },
    ],
    [
        'close',
        () => {
            tagsStore.removeTag(props.currentPath)
        },
    ],
    [
        'close-other',
        () => {
            tagsStore.removeOther(props.currentPath)
        },
    ],
    [
        'close-left',
        () => {
            tagsStore.removeLeft(props.currentPath)
        },
    ],
    [
        'close-right',
        () => {
            tagsStore.removeRight(props.currentPath)
        },
    ],
])

function handleHideDropdown() {
    emit('update:show', false)
}

function handleSelect(key) {
    const actionFn = actionMap.get(key)
    actionFn && actionFn()
    handleHideDropdown()
}
</script>
