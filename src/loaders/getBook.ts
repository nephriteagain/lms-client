import { constants } from "@/constants";
import { Book, BookInventory, P } from "@/schemas";

export async function getBook({ params} : {request: Request, params: {id:string}})  {
        
    const book = fetch(`${constants.server}/books/${params}`)
    const bookSupply =  fetch(`${constants.server}/inventory/${params}`)

    const [bookRes, bookSupplyRes] = await Promise.all([book, bookSupply])
    const [ bookInfo, inventory ] : [Book, BookInventory]  = (await Promise.all([bookRes.json(), bookSupplyRes.json()]))
    return {
        bookInfo,
        inventory
    }
}