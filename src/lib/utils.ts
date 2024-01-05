import { type ClassValue, clsx } from "clsx"
import { twMerge } from 'tailwind-merge'
import { constants } from '../constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function injectJwtToken(headerObj: typeof constants.jsonHeaders) : typeof constants.jsonHeaders| typeof constants.jsonHeaders & {Authorization: `Bearer ${string}`}  {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
        console.error('missing jwt!')
        return headerObj
    }
    return {
        ...headerObj,
        'Authorization': `Bearer ${jwt}`
    }
} 

