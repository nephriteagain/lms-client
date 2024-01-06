import { constants, dev } from "@/constants";
import { Book, BookInventory } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getBook({
    params,
}: LoaderFunctionArgs): Promise<[Book, BookInventory]> {
    if (!params?.id) {
        throw new Error("missing id");
    }
    dev.log("get book loader");

    const book = fetch(`${constants.server}/books/${params.id}`);
    const bookSupply = fetch(`${constants.server}/inventory/${params.id}`);

    const [bookRes, bookSupplyRes] = await Promise.all([book, bookSupply]);
    const [bookInfo, inventory]: [Book, BookInventory] = await Promise.all([
        bookRes.json(),
        bookSupplyRes.json(),
    ]);
    return [bookInfo, inventory];
}
