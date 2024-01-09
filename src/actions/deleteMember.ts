import { constants } from "@/constants";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import axios from "axios";

// TODO: test this after done making createMember
export async function deleteMember({ params }: ActionFunctionArgs) {
    const id = params.id;
    console.log(id);
    if (!id) {
        throw new Error("missing id");
    }

    const response = await axios.delete(`${constants.server}/members/${id}`, {
        withCredentials: true,
    });
    if (response.status === 200) {
        return redirect("/members");
    }

    return null;
}
