import { constants, dev } from "@/constants";
import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getMember({ params }: LoaderFunctionArgs) {
    const id = params.id;
    try {
        if (!id) {
            throw new Error("missing params");
        }
        const response = await axios.get(`${constants.server}/members/${id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        dev.error(error);
    }

    return null;
}
