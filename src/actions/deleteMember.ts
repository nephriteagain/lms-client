import { constants, dev } from "@/constants";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import axios from "axios";
import { sleep } from "@/lib/utils";

// TODO: test this after done making createMember
export async function deleteMember({ params }: ActionFunctionArgs) {
    await sleep(2000)
    const id = params.id;
    console.log(id);

    try {
        if (!id) {
            throw new Error("missing id");
        }
    
        const response = await axios.delete(`${constants.server}/members/${id}`, {
            withCredentials: true,
        });
        if (response.status === 200) {
            return redirect("/members");
        }
    } catch (error) {
        dev.error(error)
    }
    

    return null;
}
