import { constants, dev } from "@/constants";
import { RegisterSchema } from "@/schemas";
import axios from "axios";
import { ActionFunctionArgs, redirect } from "react-router-dom";

export async function registerAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const formObj = Object.fromEntries(formData) as any;

    formObj["age"] = parseInt(formObj["age"]);

    try {
        RegisterSchema.parse(formObj);
        const { secret, ...user } = formObj;

        const res = await axios.post(`${constants.server}/auth/register`, {
            user,
            secret,
        });
        if (res.status === 201) {
            return redirect("/login");
        }
    } catch (error) {
        dev.error(error);
    }

    return null;
}
