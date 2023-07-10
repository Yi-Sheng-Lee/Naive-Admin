import { request } from '@/utils'

export default {
    login: (data) => request.post('/login', data, { noNeedToken: true }),
}
