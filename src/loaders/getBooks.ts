import { constants } from "../constants";
import { injectJwtToken } from "../lib/utils";
import {  Book } from '../types'
export async function getBooks() : Promise<Book[]> {    
    const response  = await fetch(`${constants.server}/books`, {
        method: 'GET',
        headers: injectJwtToken(constants.jsonHeaders)
    })
    if (response.ok) {
        const books : Book[] = await response.json()        
        return books
    }
    return []

}