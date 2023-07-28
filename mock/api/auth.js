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
            if (['admin', 'Admin', 'Eason', 'Benson'].includes(body?.username)) {
                return {
                    // code: 0,
                    status: true,
                    data: {
                        access_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjkwNDIyMTIyLCJqdGkiOiIwOGZiZjY3YS1iZWY4LTRmODktOWY5NS1iMGQyMmE5MDBmNDUiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMjA3NmZhODAtZTJhYi0zN2UwLWI5ZGMtMWZmMTIyZmZmYTJiIiwibmJmIjoxNjkwNDIyMTIyLCJleHAiOjM0OTA0MjIxMjIsInVzZXJfY2xhaW1zIjp7InVzZXIiOiJBZG1pbiIsInVzZXJfdWlkIjoiMjA3NmZhODAtZTJhYi0zN2UwLWI5ZGMtMWZmMTIyZmZmYTJiIiwiaXNfYWRtaW4iOnRydWV9fQ.drrwP2ZzUlgX_WO2ulRRVEnjK0wdS70gRf5rFnmB9nI',
                        refresh_token:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDQyMjEyMiwianRpIjoiYzJmNjM3MGUtMDFlNS00ZTVlLWFlNzQtYWE4NzA3ZTc4ZjU2IiwidHlwZSI6InJlZnJlc2giLCJzdWIiOiIyMDc2ZmE4MC1lMmFiLTM3ZTAtYjlkYy0xZmYxMjJmZmZhMmIiLCJuYmYiOjE2OTA0MjIxMjIsImV4cCI6NzA5MDQyMjEyMiwidXNlcl9jbGFpbXMiOnsidXNlciI6IkFkbWluIiwidXNlcl91aWQiOiIyMDc2ZmE4MC1lMmFiLTM3ZTAtYjlkYy0xZmYxMjJmZmZhMmIiLCJpc19hZG1pbiI6dHJ1ZX19.nswVoM6tlJz7uxUwBIqw7kLDd0iKiTPHG9H3y2TvDEU',
                        uid: '2076fa80-e2ab-37e0-b9dc-1ff122fffa2b'
                    }
                }
            } else {
                return {
                    // code: -1,
                    status: false,
                    data: 'SE60002',
                }
            }
        },
    },
    {
        url: '/api/1.0/login/refresh',
        method: 'post',
        response: ({ headers }) => {
            return {
                data: {
                    access_token: resolveToken(headers?.authorization),
                },
            }
        },
    },
]
