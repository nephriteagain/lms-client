import { constants, dev } from "../../constants";
import { Book } from "../../schemas";
import axios from "axios";

export async function getBooks({
    request,
}: {
    request: Request;
}): Promise<Book[]> {
    const url = new URL(request.url);
    const params = url.toString().split('?').length === 1 ? '' : ('?' + url.toString().split('?')[1])

    try {
        const response = await axios.get(`${constants.server}/books${params}`);
        if (response.status === 200) {
            return response.data as Book[];
        }
    } catch (error) {
        dev.error(error);
    }

    return [];
}
