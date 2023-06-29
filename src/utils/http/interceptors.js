import { getToken } from '@/utils'
import { resolveResError } from './helpers'

export function reqResolve(config) {
    // 處理不需要 token 的請求
    if (config.noNeedToken) {
        return config
    }

    const token = getToken()
    if (!token) {
        return Promise.reject({
            status: false,
            data: 'CE40103',
            code: 401,
            message: '登录已过期，请重新登录！',
        })
    }

    /**
     * * 加上 token
     * ! 認證方式: JWT Bearer
     */
    config.headers.Authorization =
        config.headers.Authorization || 'Bearer ' + token

    return config
}

export function reqReject(error) {
    return Promise.reject(error)
}

export function resResolve(response) {
    // TODO: 處理不同的 response.headers
    console.log(response)
    const { data, status, config, statusText } = response
    if (data?.status !== true) {
        // const code = data?.code ?? status

        /** 根據 data error code 回傳處理後的 message */
        // const message = resolveResError(code, data?.message ?? statusText)
        const message = data?.data ?? "NE5001"

        /** 需要錯誤提醒，以 message 形式顯示 */
        !config.noNeedTip && $message.error(message)
        return Promise.reject(data)
    }
    return Promise.resolve(data)
}

export function resReject(error) {
    console.log(error)
    if (!error || !error.response) {
        // const code = error?.code
        /** 根據 data error code 回傳處理後的 message */
        // const message = resolveResError(code, error.message)
        const message = error?.data || "NE5001"
        $message?.error(message)
        return Promise.reject({ message, error })
    }
    const { data, status, config } = error.response
    console.log(error.response)
    // const code = data?.code ?? status
    // const message = resolveResError(code, data?.message ?? error.message)
    const message = data?.data ?? "NE5001"
    /** 需要錯誤提醒，以 message 形式顯示 */
    !config?.noNeedTip && $message.error(message)
    return Promise.reject({
        data: error.response?.data || error.response,
    })
}
