import { request } from '@/utils'

export default {
    getUser: () => request.get('/user'),
    refreshToken: () =>
        request.post('/login/refresh', null, { noNeedTip: true }),
}
