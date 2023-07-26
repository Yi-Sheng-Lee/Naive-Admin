import { lStorage } from '@/utils'
import api from '@/api'

// const DURATION = 6 * 60 * 60
const TOKEN_CODE = 'lm_info'

export function getToken() {
    return lStorage.get(TOKEN_CODE)
}

export function setToken(token) {
    lStorage.set(TOKEN_CODE, {...token})
}

export function removeToken() {
    lStorage.remove(TOKEN_CODE)
}

export async function refreshAccessToken() {
    const tokenItem = lStorage.getItem(TOKEN_CODE)
    if (!tokenItem) {
        return
    }
    try {
        const res = await api.refreshToken()
        const currentToken = getToken()
        currentToken.access_token = res.access_token
        setToken({...currentToken})
    } catch (error) {}
}
