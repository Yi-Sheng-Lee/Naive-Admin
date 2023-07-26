<template>
    <CommonPage show-footer title="使用者管理">
        <template #action>
            <n-space>
                <n-button type="primary" @click.prevent="handleDelete(selectionArray)">
                    {{ $t('action.delete', 2) }}
                </n-button>
                <n-button type="primary" @click="handleAdd">
                    {{ $t('action.add', { name: $t('utils.user')}) }}
                </n-button>
            </n-space>  
        </template>

        <CrudTable
            ref="$userTable"
            v-model:query-items="queryItems"
            row-key="uid"
            :extra-params="{}"
            :columns="columns"
            :remote="false"
            :get-data="api.getUserList"
            @on-checked="onChecked"
        >
            <template #queryBar>
                <QueryBarItem :label="$t('userManage.name')" :label-width="80">
                    <n-input
                        v-model:value="queryItems.name"
                        type="text"
                        :placeholder="$t('placeholder.username')"
                        @keydown.enter="$userTable?.handleSearch"
                    />
                    
                </QueryBarItem>
                <QueryBarItem :label="$t('userManage.roleName')" :label-width="80">
                    <n-select
                        v-model:value="queryItems.role_uid"
                        default-value=""
                        :placeholder="$t('select.role')"
                        :options="roleMenu"
                        @update:value="$userTable?.handleSearch"
                    />
                </QueryBarItem>
                <QueryBarItem label="E-mail" :label-width="50">
                    <n-input
                        v-model:value="queryItems.email"
                        type="text"
                        :placeholder="$t('placeholder.email')"
                        @keydown.enter="$userTable?.handleSearch"
                    />
                </QueryBarItem>
            </template>
        </CrudTable>
    </CommonPage>
</template>
<script setup>
import api from '@/api'
import { deepClone, formatDateTime, sortByString, renderCustomIcon } from  '@/utils'
import { useMenuStore } from '@/store'

const router = useRouter()
const route = useRoute()
const i18n = useI18n()

const $userTable = ref(null)
const queryItems = ref({})
const selectionArray = ref([])
const deleteNameArray = ref([])

const roleMenu = computed(() => {
    const menu = deepClone(useMenuStore().menu?.role)
    if (menu)
        menu.unshift({
            label: i18n.t('select.none'),
            value: '',
        })
    return menu
})

const columns = computed(() => {
    return [
        {   type: 'selection', fixed: 'left',
            disabled(row) {
                return row.name === 'Admin' || row.is_admin
            }
        },
        {
            title: i18n.t('userManage.name'),
            key: 'name',
            sorter: (a, b) => { return sortByString(a.name, b.name) }
        },
        {
            title: i18n.t('userManage.roleName'),
            key: 'role_name',
            render(row) {
                return h('span', row['role']['name'])
            },
            sorter: (a, b) => { return sortByString(a.role.name, b.role.name) }
        },
        {
            title: 'E-mail',
            key: 'email',
            sorter: (a, b) => { return sortByString(a.email, b.email) }
        },
        {
            title: i18n.t('userManage.lastLogin'),
            key: 'last_login',
            render(row) {
                return h('span', formatDateTime(row['last_login']) == 'Invalid Date' ? '-' : formatDateTime(row['last_login']))
            },
            sorter: (a, b) => { return sortByString(a.last_login, b.last_login, 'datetime') }
        },
        {
            title: i18n.t('action.name'),
            key: 'actions',
            fixed: 'right',
            width: 160,
            render (row) {
                const actionArr = [
                    h(renderCustomIcon('edit', { size: '20px' }), {
                        class: 'cursor-pointer',
                        onClick: () => {
                            handleEdit(row.uid)
                        }
                    }),
                    h(renderCustomIcon('email', { size: '20px' }), {
                        style: 'margin-left: 15px',
                        class: 'cursor-pointer',
                        onClick: () => {
                            handleSendTestMail(row.uid)
                        }
                    }),
                    h(renderCustomIcon('delete', { size: '20px' }), {
                        class: 'cursor-pointer',
                        style: 'margin-left: 15px',
                        onClick: () => {
                            handleDelete([row.uid], row.name)
                        }
                    })   
                ]
                if (row.name === 'Admin' || row.is_admin) actionArr.pop()
                return actionArr
            }
        }
    ]
})

onMounted(async() => {
    $userTable.value?.handleSearch()
    await useMenuStore().getRoleMenu()
})

function onChecked(rowKeys) {
    selectionArray.value = rowKeys
}

// 新增使用者
function handleAdd () {
    router.push({
        path: '/system/user/add',
        query: route.query
    })
}

// 修改使用者
// userUid => String
function handleEdit(userUid) {
    router.push({
        path: `/system/user/edit/${userUid}`,
        query: route.query
    })
}

// 刪除使用者
// usersUid => Array
function handleDelete(usersUid, username = '') {
    if (usersUid.length == 0) {
        $message.error('請勾選使用者')
        return
    }

    let content = `${i18n.t('message.confirmDelete')} \n\r`
    if (username) content += username
    else {
            usersUid.forEach(el => {
            createDeleteNameArray(el)
        })
        content += deleteNameArray.value.join(' \n\r')
    }

    const d = $dialog.confirm({
        title: i18n.t('action.delete', { name: '使用者' }),
        type: 'info',
        content,
        positiveText: i18n.t('action.confirm'),
        confirm: async() => {
            try {
                d.loading = true
                d.closable = false
                d.negativeButtonProps  = {
                    class: 'n-button--disabled'
                }
                await api.deleteUser({users: usersUid})
                $userTable.value?.handleSearch()
                $message.success('刪除成功')
            } catch (error) {
                d.loading = false
                d.closable = true
                d.negativeButtonProps = {}
                deleteNameArray.value = []
            }
        },
        cancel() {
            try {
                return new Promise((resolve, reject) => {
                    return d.loading ? reject() : resolve()
                })
            } catch {}
            
        },
        negativeText: i18n.t('action.cancel')
    })

}

// 寄送測試信
// userUid => String
function handleSendTestMail (userUid) {
    alert(userUid)
}

// 將選取出來的
function createDeleteNameArray (uid) {
    const currentData = $userTable.value?.tableData.find(el => el.uid === uid)
    deleteNameArray.value.push(currentData.name)
}
</script> 