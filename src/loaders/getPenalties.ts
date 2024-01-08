import { constants } from "@/constants";
import { P, Penalty } from "@/schemas";

export async function getPenalties() : P<Penalty[]> {

    const res = await fetch(`${constants.server}/penalty`);
    const penaltyList = await res.json() as Penalty[];

    return penaltyList
}