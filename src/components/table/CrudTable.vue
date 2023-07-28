<template>
    <QueryBar
        v-if="$slots.queryBar"
        mb-30
        @search="handleSearch"
        @reset="handleReset"
    >
        <slot name="queryBar" />
    </QueryBar>

    <n-data-table
        :remote="remote"
        :loading="loading"
        :scroll-x="scrollX"
        :columns="columns"
        :data="tableData"
        :row-key="(row) => row[rowKey]"
        :row-props="rowProps"
        :pagination="isPagination ? pagination : false"
        @update:checked-row-keys="onChecked"
        @update:page="onPageChange"
        @update:page-size="onPageSizeChange"

    />
    <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="x"
        :y="y"
        :options="options"
        :show="showDropdown"
        @clickoutside="onClickOutside"
        @select="handleSelect"
    />
</template>

<script setup>
const options = [
    {
        label: 'Edit',
        key: 'edit',
        props: {
            onClick: () => { console.log(rightClickData.value)}
        }
    },
    {
        label: () => h('span', { style: { color: 'red' } }, 'Delete'),
        key: 'delete'
    }
]
const props = defineProps({
    /**
     * @remote true: 後端分頁  false： 前端分页
     */
    remote: {
        type: Boolean,
        default: true,
    },
    /**
     * @remote 是否分頁
     */
    isPagination: {
        type: Boolean,
        default: true,
    },
    scrollX: {
        type: Number,
        default: 1200,
    },
    rowKey: {
        type: String,
        default: 'id',
    },
    columns: {
        type: Array,
        required: true,
    },
    /** queryBar中的参数 */
    queryItems: {
        type: Object,
        default() {
            return {}
        },
    },
    /** 补充参数（可选） */
    extraParams: {
        type: Object,
        default() {
            return {}
        },
    },
    /**
     * ! 定義接口輸入輸出參數
     * * 分頁模式需要定義分頁街口的輸入參數
     *    @pageSize 分頁參數：一頁顯示幾筆，預設 10 筆
     *    @pageNo   分頁參數：頁數，預設 第 1 頁
     * * 需约定接口出参
     *    @pageData 分頁模式（必填）,非分頁模式，如果沒有 data 則取當前接回來資訊做為 data
     *    @total    分頁模式（必填），分頁模式如果沒有 total 則取 data.length
     */
    getData: {
        type: Function,
        required: true,
    },
})
const route = useRoute()
// const router = useRouter()
const emit = defineEmits(['update:queryItems', 'onChecked'])
const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])
const x = ref(0)
const y = ref(0)
const showDropdown = ref(false)
const rightClickData = ref(null)
const pagination = reactive({ page: parseInt(route.query?.page) || 1, pageSize: parseInt(route.query?.per_page) || 10, pageSizes: [10, 20, 50, 100], showSizePicker: true,  })

watch(
    () => pagination,
    (val) => {
        console.log(val)
        // route.value.query = {...route.query, page: val.page,  per_page: val.pageSize}
    },
    { deep: true}
)

function rowProps (row) {
    return {
        onContextmenu: async (e) => {
            $message.success(JSON.stringify(row, null, 2))
            rightClickData.value = row
            e.preventDefault()
            showDropdown.value = false
            await nextTick()
            showDropdown.value = true
            x.value = e.clientX
            y.value = e.clientY
        }
    }
}

function handleSelect() {
    showDropdown.value = false
}

async function handleQuery() {
    try {
        loading.value = true
        let paginationParams = {}

        // 如果非分頁模式或使用前端分頁,則不用傳分頁參數
        if (props.isPagination && props.remote) {
            paginationParams = {
                pageNo: pagination.page,
                pageSize: pagination.pageSize,
            }
        }
        const res = await props.getData({
            ...props.queryItems,
            ...props.extraParams,
            ...paginationParams,
        })
        tableData.value = res?.data || res
        pagination.itemCount = res.total ?? res.length
    } catch (error) {
        tableData.value = []
        pagination.itemCount = 0
    } finally {
        loading.value = false
    }
}
function handleSearch() {
    pagination.page = 1
    handleQuery()
}
async function handleReset() {
    const queryItems = { ...props.queryItems }
    for (const key in queryItems) {
        queryItems[key] = ''
    }
    emit('update:queryItems', { ...queryItems, ...initQuery })
    await nextTick()
    pagination.page = 1
    handleQuery()
}
function onPageChange(currentPage) {
    pagination.page = currentPage
    if (props.remote) handleQuery()
}

function onPageSizeChange(currentPageSize) {
    pagination.pageSize = currentPageSize
    if (props.remote) handleQuery()
}

function onChecked(rowKeys) {
    if (props.columns.some((item) => item.type === 'selection')) {
        emit('onChecked', rowKeys)
    }
}

function onClickOutside () {
    showDropdown.value = false;
    rightClickData.value = null
}

defineExpose({
    tableData,
    handleSearch,
    handleReset,
})
</script>
