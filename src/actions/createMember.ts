import { ActionFunctionArgs, redirect } from "react-router-dom";
import { NewMember, NewMemberSchema } from "@/schemas";
import { constants } from "@/constants";
import { injectJwtToken, sleep } from "@/lib/utils";

export async function createMember({request}: ActionFunctionArgs) {
    await sleep(2000)
    const formData = await request.formData()
    const formObj = Object.fromEntries(formData) as Record<string,string>

    const newMember = {} as NewMember;

    for (const k in formObj) {
        if (k === 'age') {
            newMember[k] = parseInt(formObj[k])
            continue;
        }
        if (k === 'name') {
            newMember[k] = formObj[k]
        }
    }

    NewMemberSchema.parse(newMember)
    
    await fetch(`${constants.server}/members`, {
        method: 'POST',
        headers: injectJwtToken(constants.jsonHeaders),
        body: JSON.stringify(newMember)
    })
    

    return redirect('/members')
}