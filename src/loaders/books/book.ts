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
        axios.get(`${constants.server}/books/${params.id}`),
        axios.get(`${constants.server}/inventory/${params.id}`),
    ]);
    const bookInfo = bookRes.data;
    const inventory = bookSupplyRes.data;

    return [bookInfo, inventory];
}
