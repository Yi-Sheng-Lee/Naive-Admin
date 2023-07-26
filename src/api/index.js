import { request } from '@/utils'

export default {
    // auth
    login: (data) => request.post('/login', data, { noNeedToken: true }),
    refreshToken: () => request.post('/login/refresh', null, { needRefreshToken: true }),

    // user
    getUser: (user_uid) => request.get(`/user/${user_uid}`),
    getUserList: (data = {}) => request.post('/users', data),
    getUserMenu: (params) => request.get('/users/menu', { params }),
    addUser: (data) => request.post('/user', data),
    editUser: (user_uid, payload) => request.put(`/user/${user_uid}`, payload),
    deleteUser: (data = {}) => request.delete('/users', { data }),
    

    // role
    getRoleMenu: (params) => request.get('/roles/menu', { params })
}
