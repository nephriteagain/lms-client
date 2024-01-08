import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { constants, dev } from "../constants";

import type { P } from "@/schemas";

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

/**
 * @param t milliseconds
 * @description this function only works on dev mode
 */
export async function sleep(t: number) {
    if (import.meta.env.PROD) {
        return;
    }

    await new Promise((res) => {
        setTimeout(() => {
            res("artificial sleep");
        }, t);
    });
}

export async function copyToClipboard(textToCopy: string): P<void> {
    try {
        await navigator.clipboard.writeText(textToCopy);
        dev.log("copied");
    } catch (error) {
        dev.error(error);
    }
}

//---------------------------------------------------------//
/**
 * @description returns all <input> elements inside
 * @param element the target parent element
 * @returns array of input elements, possibly empty
 */
export function getAllChildInputs(
    element: ElementWithChildren,
): HTMLInputElement[] {
    if (!element) {
        throw new Error("invalid input");
    }
    const inputArr = [] as HTMLInputElement[];
    traverseAndFindInputElements(element, inputArr);
    return inputArr;
}

interface ElementWithChildren extends Element {
    children: HTMLCollectionOf<ElementWithChildren>;
}

/**
 * @description recursive checks an element and its children and appends inputArray with <input> elements
 * @param el the element to be processed
 * @param inputArr the array to be modified
 */
function traverseAndFindInputElements(
    el: ElementWithChildren,
    inputArr: HTMLInputElement[],
) {
    if (el.tagName === "INPUT") {
        inputArr.push(el as HTMLInputElement);
    }

    for (let i = 0; i < el.children.length; i++) {
        traverseAndFindInputElements(
            el.children[i] as ElementWithChildren,
            inputArr,
        );
    }
}
//-------------------------------------------------------------//


export function numberToDateString(num:number) : string {
    return new Date(num).toDateString().split(' ').splice(1).join(', ')
}