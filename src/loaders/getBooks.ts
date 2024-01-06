import { constants } from "../constants";
import { injectJwtToken } from "../lib/utils";
import { Book } from "../schemas";
export async function getBooks({
    request,
}: {
    request: Request;
}): Promise<Book[]> {
    console.log("loader running");
    const url = new URL(request.url);
    const title = url.searchParams.get("title");
    const authors = url.searchParams.get("authors");

    const server = title
        ? `${constants.server}/books?title=${title}`
        : authors
          ? `${constants.server}/books?authors=${authors}`
          : `${constants.server}/books`;

    const response = await fetch(server, {
        method: "GET",
        headers: injectJwtToken(constants.jsonHeaders),
    });
    if (response.ok) {
        const books: Book[] = await response.json();
        return books;
    }
    return [];
}
