import axios from "axios";
import { constants, dev } from "@/constants";
import type { BookInventory, P } from "@/schemas";

export async function getInventory(): P<BookInventory[]> {
    try {
        const response = await axios.get(`${constants.server}/inventory`, {
            withCredentials: true,
        });

        const inventory: BookInventory[] = response.data;

        return inventory;
    } catch (error) {
        dev.error(error);
    }
    return [];
}
