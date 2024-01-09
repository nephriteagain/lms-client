import axios from 'axios';
import { constants } from "@/constants";
import type { P, Penalty } from "@/schemas";

export async function getPenalties(): P<Penalty[]> {
    const response = await axios.get(`${constants.server}/penalty`, {
        withCredentials: true
    });

    // Access the response data directly
    const penaltyList: Penalty[] = response.data;

    return penaltyList;
}
