import { constants } from "@/constants";

import type { Borrow } from "@/schemas";

export async function getBorrows() : Promise<Borrow[]> {
    const res = await fetch(`${constants.server}/borrow`, {method: 'GET'})
    const borrows = await res.json() as Borrow[]    
    return borrows
}