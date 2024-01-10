import axios from "axios";
import { constants, dev } from "@/constants";

import type { Borrow } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getBorrows({request}:LoaderFunctionArgs): Promise<Borrow[]> {
    const url = new URL(request.url);
    const params = url.toString().split('?').length === 1 ? '' : ('?' + url.toString().split('?')[1])

    try {
        const response = await axios.get(`${constants.server}/borrow${params}`, {
            withCredentials: true,
        });
        return response.data as Borrow[];
    } catch (error) {
        dev.error(error);
    }
    return [];
}
