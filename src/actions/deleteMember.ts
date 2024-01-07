import { constants } from "@/constants";
import { injectJwtToken } from "@/lib/utils";
import { ActionFunctionArgs, redirect } from "react-router-dom";

// TODO: test this after done making createMember
export async function deleteMember({params}: ActionFunctionArgs) {    
    const id = params.id
    if (!id) {
        throw new Error('missing id')
    }
    await fetch(`${constants.server}`, {
        method: 'DELETE',
        headers: injectJwtToken(constants.jsonHeaders)
    })

    return redirect('/members')
}