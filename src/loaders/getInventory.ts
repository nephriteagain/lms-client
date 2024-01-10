import axios from "axios";
import { constants, dev } from "@/constants";
import type { BookInventory, P } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getInventory({request}: LoaderFunctionArgs): P<BookInventory[]> {
    const url = new URL(request.url);
    const params = url.toString().split('?').length === 1 ? '' : ('?' + url.toString().split('?')[1])

    try {
        const response = await axios.get(`${constants.server}/inventory${params}`, {
            withCredentials: true,
        });

        const inventory: BookInventory[] = response.data;

        return inventory;
    } catch (error) {
        dev.error(error);
    }
    return [];
}
