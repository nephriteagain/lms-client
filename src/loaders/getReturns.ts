import { constants } from "@/constants";
import { P, Return } from "@/schemas";

export async function getReturns() : P<Return[]> {
    const res = await fetch(`${constants.server}/return`, {method: 'GET'})
    const returns = await res.json() as Return[];
    return returns
}