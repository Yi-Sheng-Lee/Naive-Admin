import { request, getToken, refreshAccessToken, removeToken, toLogin } from '@/utils'
// import { resolveResError } from './helpers'

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
        config.headers.Authorization || `Bearer ${config.needRefreshToken ? token.refresh_token : token.access_token}`
    return config
}

export function reqReject(error) {
    return Promise.reject(error)
}

export async function resResolve(response) {
    // TODO: 處理不同的 response.headers
    console.log(response)
    const { data, config } = response
    if (data?.status !== true) {
        // const code = data?.code ?? status

        /** 根據 data error code 回傳處理後的 message */
        // const message = resolveResError(code, data?.message ?? statusText)
        const message = data?.data ?? 'NE5001'

        /** 需要錯誤提醒，以 message 形式顯示 */
        if (data.data !== 'CE40103' && !config.noNeedTip) $message.error(message)
        console.log(data.data)

        // 置換 token
        if (data.data === 'CE40103') {
            const originalConfig = config
            await refreshAccessToken()
            const token = getToken()
            originalConfig.headers.Authorization = `Bearer ${token.access_token}`
            return await request(originalConfig)
        } else if (data.data === 'CE40104') {
            removeToken()
            toLogin()
            return
        }
        return Promise.reject(data.data)
    }
    return Promise.resolve(data.data)
}

export function resReject(error) {
    console.log(error)
    if (!error || !error.response) {
        // const code = error?.code
        /** 根據 data error code 回傳處理後的 message */
        // const message = resolveResError(code, error.message)
        const message = error?.data || 'NE5001'
        $message?.error(message)
        return Promise.reject({ message, error })
    }
    const { data, config } = error.response
    console.log(error.response)
    // const code = data?.code ?? status
    // const message = resolveResError(code, data?.message ?? error.message)
    const message = data?.data ?? 'NE5001'
    /** 需要錯誤提醒，以 message 形式顯示 */
    !config?.noNeedTip && $message.error(message)
    return Promise.reject({
        data: error.response?.data || error.response,
    })
}
