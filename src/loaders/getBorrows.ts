import axios from "axios";
import { constants, dev } from "@/constants";

import type { Borrow } from "@/schemas";

export async function getBorrows(): Promise<Borrow[]> {
    try {
        const response = await axios.get(`${constants.server}/borrow`, {
            withCredentials: true,
        });
        return response.data as Borrow[];
    } catch (error) {
        dev.error(error);
    }
    return [];
}
