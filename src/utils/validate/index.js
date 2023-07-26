import { i18n } from '@/i18n'
import { EMAIL, IPORSEGMENT } from './regExp'


// 必填
export const required = {
    required: true,
    trigger: ['input', 'blur'],
    renderMessage: () => {
        return i18n.global.t('validation.required')
    }
}

// IP
export const ip = {
    validator: (rule, value) => {
        if (!value.match(IPORSEGMENT)) return false
    },
    trigger: ['input', 'blur'],
    renderMessage: () => {
        return i18n.global.t('validation.ip')
    }
}

// 網段格式 (IP)
export const ipSegment = {
    validator: (rule, value) => {
        if (!value.match(IPORSEGMENT)) return false
    },
    trigger: ['input', 'blur'],
    renderMessage: () => {
        return i18n.global.t('validation.ipSegment')
    }
}

// email 格式
export const email = {
    validator: (rule, value) => {
        if (!value.match(EMAIL)) return false
    },
    trigger: ['input', 'blur'],
    renderMessage: () => {
        return i18n.global.t('validation.email')
    }
}

