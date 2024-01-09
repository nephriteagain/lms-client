import { ActionFunctionArgs, redirect } from "react-router-dom";
import { constants } from "@/constants";
import { sleep } from "@/lib/utils";
import { UpdateInventorySchema } from "@/schemas";
import axios from "axios";

export async function updateInventory({ request, params }: ActionFunctionArgs) {
    await sleep(2000);
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData) as Record<string, string>;

    const newInventoryEntry = {} as any;
    for (const k in formObj) {
        newInventoryEntry[k] = parseInt(formObj[k]);
    }
    UpdateInventorySchema.parse(newInventoryEntry);

    const response = await axios.patch(`${constants.server}/inventory/${params.id}`, newInventoryEntry, {
        withCredentials: true
    })

    if (response.status === 200) {
        return redirect("/inventory")
    }

    return null
}
