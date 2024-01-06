import { NewBookSchema, NewBook } from "@/schemas";
import { constants } from "@/constants";
import { injectJwtToken } from "@/lib/utils";
import { redirect } from "react-router-dom";

import { sleep } from "@/lib/utils";
export async function createBook({ request }: { request: Request }) {
    await sleep(200);

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
    NewBookSchema.parse(schema);
    await fetch(`${constants.server}/books`, {
        method: "POST",
        body: JSON.stringify(schema),
        headers: injectJwtToken(constants.jsonHeaders),
    });

    return redirect("/");
}
