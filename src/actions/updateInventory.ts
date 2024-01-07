import { ActionFunctionArgs, redirect } from "react-router-dom";
import { constants } from "@/constants";
import { sleep } from "@/lib/utils";
import { UpdateInventorySchema } from "@/schemas";

export async function updateInventory({request, params}: ActionFunctionArgs) {
    await sleep(2000)    
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData) as Record<string,string>

    const newInventoryEntry = {} as any;
    for (const k in formObj) {
        newInventoryEntry[k] = parseInt(formObj[k])
    }
    UpdateInventorySchema.parse(newInventoryEntry)
    
    await fetch(`${constants.server}/inventory/${params.id}`, {
        method: 'PATCH',
        headers: constants.jsonHeaders,
        body: JSON.stringify(newInventoryEntry)
    })
    

    return redirect('/inventory')
}