import axios from 'axios';
import { constants } from "@/constants";
import type { BookInventory, P } from "@/schemas";

export async function getInventory(): P<BookInventory[]> {
    const response = await axios.get(`${constants.server}/inventory`, {
        withCredentials: true
    });

    const inventory: BookInventory[] = response.data;

    return inventory;
}