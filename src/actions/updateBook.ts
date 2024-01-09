import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { sleep } from "@/lib/utils";
import { constants } from "@/constants";

import { UpdateBookSchema, UpdateBook } from "@/schemas";
import axios from "axios";

export async function updateBook({ request, params }: LoaderFunctionArgs) {
    await sleep(2000);
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData);

    const newBookEntry = {} as any;
    for (const key in formObj) {
        const regex = new RegExp(`author`, "g");
        if (regex.test(key)) {
            const authorName = formObj[key];
            if (!newBookEntry.hasOwnProperty("authors")) {
                newBookEntry.authors = [authorName];
                continue;
            }
            newBookEntry.authors.push(authorName);
            continue;
        }
        newBookEntry[key] = formObj[key];
    }
    for (const k in newBookEntry) {
        if (k === "yearPublished") {
            newBookEntry[k] = parseInt(newBookEntry[k]);
        }
    }

    const schema = newBookEntry as UpdateBook;
    UpdateBookSchema.parse(schema);

    const response = await axios.patch(
        `${constants.server}/books/${params.id}`,
        schema,
        {
            withCredentials: true,
        },
    );
    if (response.status === 200) {
        return redirect(`/books/${params.id}`);
    }

    return null;
}
