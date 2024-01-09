import axios from 'axios';
import { constants } from "@/constants";
import type { Member, P } from "@/schemas";

export async function getMembers(): P<Member[]> {
    const response = await axios.get(`${constants.server}/members`, {
        withCredentials: true
    });

    // Access the response data directly
    const members: Member[] = response.data;

    return members;
}
