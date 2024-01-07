import { constants } from '@/constants'
import { Member , P } from '@/schemas'

export async function getMembers() : P<Member[]> {
    const res = await fetch(`${constants.server}/members`, {
        method: 'GET'
    })
    const members = await res.json() as Member[]
    return members
}