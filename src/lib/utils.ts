import { constants } from '../constants'

export function injectJwtToken(headerObj: typeof constants.jsonHeaders) {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
        throw new Error('missing jwt!')
    }
    return {
        ...headerObj,
        'Authorization': `Bearer ${jwt}`
    }
}