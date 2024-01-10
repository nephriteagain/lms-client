import axios from "axios";
import { constants, dev } from "@/constants";
import type { Member, P } from "@/schemas";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getMembers({request}:LoaderFunctionArgs): P<Member[]> {
    const url = new URL(request.url);
    const params = url.toString().split('?').length === 1 ? '' : ('?' + url.toString().split('?')[1])

    try {
        const response = await axios.get(`${constants.server}/members${params}`);

        // Access the response data directly
        const members: Member[] = response.data;

        return members;
    } catch (error) {
        dev.error(error);
    }

    return [];
}
