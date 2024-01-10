import axios from "axios";
import { constants, dev } from "@/constants";
import type { P, Return } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getReturns({ request }: LoaderFunctionArgs): P<Return[]> {
    const url = new URL(request.url);
    const params =
        url.toString().split("?").length === 1
            ? ""
            : "?" + url.toString().split("?")[1];
    try {
        const response = await axios.get(`${constants.server}/return${params}`);

        // Access the response data directly
        const returns: Return[] = response.data;

        return returns;
    } catch (error) {
        dev.error(error);
    }
    return [];
}
