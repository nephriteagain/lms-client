import { constants, dev } from "@/constants";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { NewBorrowSchema } from "@/schemas";
import axios from "axios";
import { sleep } from "@/lib/utils";

export async function newBorrow({ request }: LoaderFunctionArgs) {
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData) as Record<
        "book" | "date" | "member",
        string
    >;

    await sleep(2000);

    try {
        const bookId = JSON.parse(formObj.book)._id;
        const borrower = JSON.parse(formObj.member)._id;
        const promisedReturnDate = parseInt(formObj.date);
        if (isNaN(promisedReturnDate)) {
            throw new Error("invalid date");
        }
        NewBorrowSchema.parse({ bookId, borrower, promisedReturnDate });
        const response = await axios.post(`${constants.server}/borrow`, {
            bookId,
            borrower,
            promisedReturnDate,
        });
        if (response.status === 201) {
            return redirect(`/borrow`);
        }
    } catch (error) {
        dev.error(error);
    }

    return null;
}
