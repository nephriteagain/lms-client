import axios from "axios";
import { constants, dev } from "@/constants";
import type { Member, P } from "@/schemas";

export async function getMembers(): P<Member[]> {
    try {
        const response = await axios.get(`${constants.server}/members`, {
            withCredentials: true,
        });

        // Access the response data directly
        const members: Member[] = response.data;

        return members;
    } catch (error) {
        dev.error(error);
    }

    return [];
}
