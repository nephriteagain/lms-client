import { constants, dev } from "../constants";
import { Book } from "../schemas";
import axios from "axios";

export async function getBooks({
    request,
}: {
    request: Request;
}): Promise<Book[]> {
    dev.log("getbooks loader");
    const url = new URL(request.url);
    const title = url.searchParams.get("title");
    const authors = url.searchParams.get("authors");

    const server = title
        ? `${constants.server}/books?title=${title}`
        : authors
          ? `${constants.server}/books?authors=${authors}`
          : `${constants.server}/books`;

    try {
        const response = await axios.get(server, {
            withCredentials: true,
        });
        if (response.status === 200) {
            return response.data as Book[];
        }
    } catch (error) {
        dev.error(error);
    }

    return [];
}
