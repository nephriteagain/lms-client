import { constants } from "@/constants"
import { BookInventory, P } from "@/schemas"

export async function getInventory() : P<BookInventory[]> {
    const res = await fetch(`${constants.server}/inventory`, {
        method: 'GET'
    })
    const inventory = await res.json() as BookInventory[]
    return inventory
}