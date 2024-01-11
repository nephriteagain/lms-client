import { NewBookSchema, NewBook } from "@/schemas";
import { constants, dev } from "@/constants";
import { redirect } from "react-router-dom";

import { sleep } from "@/lib/utils";
import axios from "axios";
export async function newBook({ request }: { request: Request }) {
    await sleep(2000);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const newBookEntry = {} as any;
    for (const key in data) {
        const regex = new RegExp(`author`, "g");
        if (regex.test(key)) {
            const authorName = data[key];
            if (!newBookEntry.hasOwnProperty("authors")) {
                newBookEntry.authors = [authorName];
                continue;
            }
            newBookEntry.authors.push(authorName);
            continue;
        }
        newBookEntry[key] = data[key];
    }
    for (const k in newBookEntry) {
        if (k === "total" || k === "yearPublished") {
            newBookEntry[k] = parseInt(newBookEntry[k]);
        }
    }
    const schema = newBookEntry as NewBook;
    try {
        NewBookSchema.parse(schema);

        const response = await axios.post(`${constants.server}/books`, schema);
        if (response.status === 201) {
            const path = new URL(request.url).pathname;

            return redirect(
                `${path.startsWith("/books") ? "/books" : "/inventory"}`,
            );
        }
    } catch (error) {
        dev.error(error);
    }

    return null;
}
