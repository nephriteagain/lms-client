import axios from 'axios';
import { constants } from "@/constants";
import type { P, Return } from "@/schemas";

export async function getReturns(): P<Return[]> {
    const response = await axios.get(`${constants.server}/return`, {
        withCredentials: true
    });

    // Access the response data directly
    const returns: Return[] = response.data;

    return returns;
}
