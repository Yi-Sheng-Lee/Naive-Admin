import { resolveToken } from '../utils'

const users = {
    admin: {
        id: 1,
        name: '荷馬辛普森 (admin)',
        avatar: 'https://pic.616pic.com/ys_b_img/00/39/19/KlGimmMvGM.jpg',
        email: 'Ronnie@123.com',
        role: ['admin'],
    },
    editor: {
        id: 2,
        name: '大脸怪(editor)',
        avatar: 'https://pic.616pic.com/ys_b_img/00/39/19/KlGimmMvGM.jpg',
        email: 'Ronnie@123.com',
        role: ['editor'],
    },
    guest: {
        id: 3,
        name: '访客(guest)',
        avatar: 'https://pic.616pic.com/ys_b_img/00/39/19/KlGimmMvGM.jpg',
        role: [],
    },
}
export default [
    {
        url: '/mssp/api/1.0/user',
        method: 'get',
        response: ({ headers }) => {
            const token = resolveToken(headers?.authorization)
            return {
                status: true,
                data: {
                    ...(users[token] || users.admin),
                },
            }
        },
    },
]
