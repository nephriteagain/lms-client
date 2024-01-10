import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Member as MemberType } from "@/schemas";

import { Link, useLoaderData } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { copyToClipboard } from "@/lib/utils";

export default function Member() {
    const { _id, name, age, joinDate, approvedBy } =
        useLoaderData() as MemberType;

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Member Info</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col gap-2">
                    <div className="font-semibold text-lg">{`${name}, ${age}, member since ${new Date(
                        joinDate,
                    )
                        .toDateString()
                        .split(" ")
                        .splice(1)
                        .join(", ")}`}</div>
                    <div className="flex flex-row gap-2 items-center">
                        <span>id:</span>
                        <span>{_id}</span>
                        <span
                            className="hover:scale-125 p-1 rounded-full shadow-sm active:scale-95 hover:bg-gray-200 active:bg-gray-200 transition-all duration-150"
                            onClick={(e) => copyToClipboard(e, _id)}
                        >
                            <IoCopyOutline />
                        </span>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-around">
                    {/* TODO: complete this after this two endpoint is completed */}
                    <Link
                        to={`/borrow`}
                        className="bg-slate-600 hover:bg-slate-700 active:bg-slate-700 text-white px-4 py-1 text-lg rounded-lg shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-200"
                    >
                        borrows
                    </Link>
                    <Link
                        to={`/return`}
                        className="bg-slate-600 hover:bg-slate-700 active:bg-slate-700 text-white px-4 py-1 text-lg rounded-lg shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-200"
                    >
                        returns
                    </Link>
                </div>
                <AlertDialogFooter className="flex flex-row gap-2">
                    <div>Approved by: </div>
                    <div>{approvedBy}</div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
