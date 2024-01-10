import axios from "axios";
import { constants, dev } from "@/constants";
import type { P, Penalty } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getPenalties({
    request,
}: LoaderFunctionArgs): P<Penalty[]> {
    const url = new URL(request.url);
    const params =
        url.toString().split("?").length === 1
            ? ""
            : "?" + url.toString().split("?")[1];

    try {
        const response = await axios.get(
            `${constants.server}/penalty${params}`,
        );

        // Access the response data directly
        const penaltyList: Penalty[] = response.data;

        return penaltyList;
    } catch (error) {
        dev.error(error);
    }

    return [];
}
