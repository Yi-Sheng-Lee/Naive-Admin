import { resolveToken } from '../utils'

// const token = {
//     admin: 'admin',
//     editor: 'editor',
// }

export default [
    {
        url: '/api/1.0/login',
        method: 'post',
        response: ({ body }) => {
            if (['admin', 'editor', 'eason'].includes(body?.username)) {
                return {
                    // code: 0,
                    status: true,
                    access_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    refresh_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                }
            } else {
                return {
                    // code: -1,
                    status: false,
                    data: 'CE40001',
                }
            }
        },
    },
    {
        url: '/api/1.0/login/refresh',
        method: 'post',
        response: ({ headers }) => {
            return {
                code: 0,
                data: {
                    access_token: resolveToken(headers?.authorization),
                },
            }
        },
    },
]
