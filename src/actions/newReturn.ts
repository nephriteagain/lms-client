import { constants, dev } from "@/constants";
import { sleep } from "@/lib/utils";
import axios from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export async function newReturn({ params }: LoaderFunctionArgs) {
    const id = params.id;
    try {
        if (!id) throw new Error("missing id");
        await sleep(2000);
        const res = await axios.post(`${constants.server}/return/${id}`);
        if (res.status === 201) {
            return redirect("/borrow");
        }
    } catch (error) {
        dev.error(error);
    }

    return null;
}
