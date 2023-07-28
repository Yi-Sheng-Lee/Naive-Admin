const roleList = [
    {
        'description': '2023-07-18 11:25:09',
        'name': 'aadmn',
        'uid': '2076fa80-e2ab-37e0-b9dc-1ff122fffacc',
        'user_count': 8
    },
    {
        'description': '管理員2',
        'name': '管理員2',
        'uid': 'c8f6c229-1fbd-44ab-918d-26c158775946',
        'user_count': 2
    },
    {
        'description': 'test002',
        'name': 'test002',
        'uid': '0e08f908-afa2-43c9-832d-5e48a3dae144',
        'user_count': 0
    },
    {
        'description': '只有 role',
        'name': '只有 role',
        'uid': '4552af7c-c03b-44da-bd9c-d0f82411c30b',
        'user_count': 1
    },
    {
        'description': '只有 user',
        'name': '只有 user',
        'uid': '969ed589-ee26-4479-ae08-5af84bd9b972',
        'user_count': 4
    },
    {
        'description': '只有 user1',
        'name': '只有 user1',
        'uid': '7ed4f06f-277c-47e7-97ab-56b6dea37cf3',
        'user_count': 1
    }
]

export default [
    {
        url: '/api/1.0/roles/menu',
        method: 'get',
        response: () => {
            const data = roleList.map(el => {
                const { name, uid } = el
                return { name, uid }
            })
            return {
                status: true,
                data,
            }
        },
    },
]