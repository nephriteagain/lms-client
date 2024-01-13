import { constants, dev } from "@/constants";
import { BorrowReturnLoaderType, BorrowSchemaType, P } from "@/schemas";
import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getBorrow({params}: LoaderFunctionArgs) : P<BorrowReturnLoaderType|null>{
    const id = params.id;
    try {
        if (!id) {
            throw new Error('missing id!')
        }
        const response = await axios.get<BorrowSchemaType>(`${constants.server}/borrow/${id}`)
        const { borrower, date, promisedReturnDate, title } = response.data
        const { data : { data: name } } = await axios.get<{data:string}>(`${constants.server}/members/find/name?_id=${borrower}`)
        const { data: { penalty } } = await axios.get<{penalty:number}>(`${constants.server}/penalty/`)
        return {
            name, 
            date, 
            promisedReturnDate,            
            title,
            penalty
        }

    } catch (error) {
        dev.error(error)        
    }
    return null;
}