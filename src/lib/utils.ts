import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { constants } from "../constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function injectJwtToken(
    headerObj: typeof constants.jsonHeaders,
):
    | typeof constants.jsonHeaders
    | (typeof constants.jsonHeaders & { Authorization: `Bearer ${string}` }) {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
        console.error("missing jwt!");
        return headerObj;
    }
    return {
        ...headerObj,
        Authorization: `Bearer ${jwt}`,
    };
}

export function generateRandomString() {
    const characters =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const length = 12;
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length),
        );
    }
    return result;
}
