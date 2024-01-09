import axios from 'axios';
import { constants } from "@/constants";

import type { Borrow } from "@/schemas";

export async function getBorrows(): Promise<Borrow[]> {
    const response = await axios.get(`${constants.server}/borrow`, {
        withCredentials:true
    });

    return response.data as Borrow[];
}