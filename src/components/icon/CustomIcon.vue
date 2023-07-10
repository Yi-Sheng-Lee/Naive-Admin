<script setup>
/** 自定義 icon */
const props = defineProps({
    /** icon 名稱 (assets/svg下的文件名) */
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
})
</script>

<template>
    <TheIcon v-bind="props" />
</template>
