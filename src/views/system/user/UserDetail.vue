<template>
    <CommonPage show-footer :title="$t(`action.${type}`, { name: $t('utils.user')})">
        <template #action>
            <n-space
                v-if="!isUndef(uid)"
                size="small"
            >
                <n-switch
                    v-model:value="passwordSwitch"
                    size="small"
                /> 修改密碼
            </n-space>
        </template>
        <n-form
            ref="userFormRef"
            :label-width="80"
            :model="userForm"
            :rules="userRoles"
        >
            <n-row :gutter="24">
                <n-col :span="12">
                    <n-form-item
                        :label="$t('userManage.name')"
                        label-width="auto"
                        path="name"
                        first
                    >
                        <n-input
                            v-model:value="userForm.name"
                            :placeholder="$t('placeholder.username')"
                            :disabled="!isUndef(uid)"
                        />
                    </n-form-item>
                </n-col>
                <n-col :span="12">
                    <n-form-item
                        :label="$t('userManage.roleName')"
                        path="role_uid"
                        first
                    >
                        <n-select
                            v-model:value="userForm.role_uid"
                            default-value=""
                            :placeholder="$t('select.role')"
                            :options="roleMenu" 
                        />
                    </n-form-item>
                </n-col>
                <n-col :span="12">
                    <n-form-item
                        :label="$t('userManage.email')"
                        path="email"
                        first
                    >
                        <n-input
                            v-model:value="userForm.email"
                            :placeholder="$t('placeholder.email')"
                        />
                    </n-form-item>
                </n-col>
                <n-col :span="12"></n-col>
                <n-col v-if="isUndef(uid)" :span="12">
                    <n-form-item
                        :label="$t('userManage.password')"
                        type="password"
                        path="password"
                        first
                    >
                        <n-input
                            v-model:value="userForm.password"
                            :placeholder="$t('placeholder.password')"
                            show-password-on="click"
                            type="password"
                            @input="handlePasswordInput"
                            @keydown.enter.prevent
                        />
                    </n-form-item>
                </n-col>
                <n-col v-if="!isUndef(uid) && passwordSwitch" :span="12">
                    <n-form-item
                        :label="$t('userManage.newPassword')"
                        type="password"
                        path="new_password"
                        first
                    >
                        <n-input
                            v-model:value="userForm.new_password"
                            :placeholder="$t('placeholder.newPassword')"
                            show-password-on="click"
                            type="password"
                            @input="handlePasswordInput"
                            @keydown.enter.prevent
                        />
                    </n-form-item>
                </n-col>
                <n-col v-if="isUndef(uid) || passwordSwitch" :span="12">
                    <n-form-item
                        ref="userFormOfCheckPasswordRef"
                        :label="$t('userManage.checkPassword')"
                        path="check_password"
                        first
                    >
                        <n-input
                            v-model:value="userForm.check_password"
                            :placeholder="$t('placeholder.checkPassword')"
                            show-password-on="click"
                            type="password"
                        />
                    </n-form-item>
                </n-col>
                <n-col :span="24">
                    <n-space justify="end">
                        <n-button @click.prevent="handleCancel">{{ $t('action.cancel') }}</n-button>
                        <n-button type="info" @click.prevent="handleSubmit">{{ $t(`action.${type}`) }}</n-button>
                    </n-space>
                </n-col>
            </n-row>
        </n-form>
    </CommonPage>
</template>
<script setup>
import { isUndef, deepClone, required, email } from '@/utils'
import { useMenuStore } from '@/store'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const i18n = useI18n()

const type = ref('')
const uid = ref(undefined) // undefined => 新增模式，反之為修改模式
const passwordSwitch = ref(false)
const userFormRef = ref(null)
const userFormOfCheckPasswordRef = ref(null)

const userForm = reactive({
    name: 'test01',
    email: 'test01@billows.com.tw',
    role_uid: '969ed589-ee26-4479-ae08-5af84bd9b972',
    password: '',
    new_password: '',
    check_password: '',

})

// 驗證 密碼驗證欄位開頭、長度 是否與 密碼 / 新密碼相同
// 此 function 會綁在 密碼驗證欄位
function validatePasswordStartWith (rule, value) {
    if (isUndef(uid.value))
        return !!userForm.password && userForm.password.startsWith(value) && userForm.password.length >= value.length;
    return !!userForm.new_password && userForm.new_password.startsWith(value) && userForm.new_password.length >= value.length;
}

// 驗證 密碼驗證欄位 是否與 密碼 / 新密碼一樣
// 此 function 會綁在 密碼驗證欄位
function validatePasswordSame (rule, value) {
    if (isUndef(uid.value)) return value === userForm.password
    return value === userForm.new_password
}

// 當密碼 / 新密碼更改時會一起驗證 check_password 欄位
// 此 function 會綁定在 密碼 / 新密碼 欄位的 @input 事件上
function handlePasswordInput () {
    if (userForm.check_password) userFormOfCheckPasswordRef.value?.validate({ trigger: 'password-input'})
}

const userRoles = reactive({
    name: [required],
    email: [required, email],
    role_uid: [],
    password: [required],
    new_password: [required],
    check_password: [required,
        { validator: validatePasswordStartWith, trigger: ['input'], renderMessage: () => {
            return i18n.t('validation.checkPassword')
        }},
        { validator: validatePasswordSame, trigger: ['blur', 'password-input'], renderMessage: () => {
            return i18n.t('validation.checkPassword')
        }}
    ],
})

const roleMenu = computed(() => {
    const menu = deepClone(useMenuStore().menu?.role)
    if (menu)
        menu.unshift({
            label: i18n.t('select.none'),
            value: '',
        })
    return menu
})

onMounted(() => {
    uid.value = route.params?.uid
    type.value = isUndef(uid.value) ? 'add' : 'edit'
    useMenuStore().getRoleMenu()
    if (!isUndef(uid.value)) getUserInfo()

})


// 取得使用者資訊
async function getUserInfo () {
    const res = await api.getUser(uid.value)
    Object.keys(userForm).forEach(el => {
        if (el in res) userForm[el] = res[el]
    })
}

// 新增/修改
function handleSubmit () {
    userFormRef.value?.validate(error => {
        if (!error) !isUndef(uid.value) ? handleEditUser() : handleAddUser()
    })
}

// 取消功能
function handleCancel () {
    router.push({
        path: '/system/user',
        query: route.query
    })
}

// 新增使用者
async function handleAddUser () {
    const payload = deepClone(userForm)

    delete payload['new_password']
    delete payload['check_password']

    try {
        await api.addUser(payload)
        $message.success(i18n.t('action.add', { name: i18n.t('utils.success')}))
        router.push({
            path: '/system/user',
            query: route.query
        })
    } catch {}

}

// 修改使用者
async function handleEditUser () {
    const payload = deepClone(userForm)

    if (!passwordSwitch.value) delete payload['new_password']
    delete payload['password']
    delete payload['check_password']
    console.log(payload)

    try {
        await api.editUser(uid.value, payload)
        $message.success(i18n.t('action.edit', { name: i18n.t('utils.success')}))
        router.push({
            path: '/system/user',
            query: route.query
        })
    } catch {}
}
</script>