import axios from "axios";
import { constants, dev } from "@/constants";
import type { P, Return } from "@/schemas";

export async function getReturns(): P<Return[]> {
    try {
        const response = await axios.get(`${constants.server}/return`, {
            withCredentials: true,
        });

        // Access the response data directly
        const returns: Return[] = response.data;

        return returns;
    } catch (error) {
        dev.error(error);
    }
    return [];
}
