import { constants, dev } from "@/constants";
import { Book, BookInventory } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";

export async function getBook({
    params,
}: LoaderFunctionArgs): Promise<[Book, BookInventory]> {
    if (!params?.id) {
        throw new Error("missing id");
    }
    dev.log("get book loader");

    const [bookRes, bookSupplyRes] = await Promise.all([
        axios.get(`${constants.server}/books/${params.id}`, {
            withCredentials: true,
        }),
        axios.get(`${constants.server}/inventory/${params.id}`, {
            withCredentials: true,
        }),
    ]);

    const [bookInfo, inventory]: [Book, BookInventory] = await Promise.all([
        bookRes.data,
        bookSupplyRes.data,
    ]);

    return [bookInfo, inventory];
}
