<script setup>
import { renderCustomIcon } from '@/utils'

const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        default: 14,
    },
    color: {
        type: String,
        default: undefined,
    },
    /** custom */
    type: {
        type: String,
        default: '',
    },
})

const iconCom = computed(() =>
    renderCustomIcon(props.icon, { size: props.size, color: props.color })
)
</script>

<template>
    <component :is="iconCom" />
</template>
