import { ActionFunctionArgs, redirect } from "react-router-dom";
import { NewMember, NewMemberSchema } from "@/schemas";
import { constants, dev } from "@/constants";
import { sleep } from "@/lib/utils";
import axios from "axios";

// TODO: use zod transform functions for some of the schematypes
export async function createMember({ request }: ActionFunctionArgs) {
    await sleep(2000);
    const formData = await request.formData();
    const formObj = Object.fromEntries(formData) as Record<string, string>;

    const newMember = {} as NewMember;

    for (const k in formObj) {
        if (k === "age") {
            newMember[k] = parseInt(formObj[k]);
            continue;
        }
        if (k === "name") {
            newMember[k] = formObj[k];
        }
        if (k === "email") {
            newMember[k] = formObj[k];
        }
    }
    try {
        NewMemberSchema.parse(newMember);

        const response = await axios.post(
            `${constants.server}/members`,
            newMember,
        );
        if (response.status === 201) {
            return redirect("/members");
        }
    } catch (error) {
        dev.error(error);
    }

    return null;
}
