export function resolveToken(authorization) {
    /**
     * * jwt token
     * * Bearer + token
     * ! 認證方式: Bearer
     */
    const reqTokenSplit = authorization.split(' ')
    if (reqTokenSplit.length === 2) {
        return reqTokenSplit[1]
    }
    return ''
}
