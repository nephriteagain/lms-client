import { constants, dev } from "@/constants";
import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

export async function getInventoryItem({ params }: LoaderFunctionArgs) {
    const id = params.id;
    try {
        if (!id) {
            throw new Error("missing params");
        }
        const response = await axios.get(`${constants.server}/inventory/${id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        dev.error(error);
    }
    return null;
}
