import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Member as MemberType } from "@/schemas";

import { Link, useLoaderData } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { copyToClipboard } from "@/lib/utils";

export default function Member() {
    const { _id, name, age, joinDate, approvedBy, email } =
        useLoaderData() as MemberType;

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold text-xl">
                        Member Info
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex flex-col gap-2 bg-zinc-200 p-4 shadow-inner shadow-gray-400 rounded-lg">
                    <div className="font-semibold text-lg">
                        <p>
                            {`${name}, ${age}, member since ${new Date(joinDate)
                                .toDateString()
                                .split(" ")
                                .splice(1)
                                .join(", ")}`}
                        </p>
                        <p className="flex flex-row gap-2">
                            <span>{email}</span>
                            <span
                                className="hover:scale-125 p-1 rounded-full shadow-sm active:scale-95 hover:bg-gray-200 active:bg-gray-200 transition-all duration-150"
                                onClick={(e) => copyToClipboard(e, email)}
                            >
                                <IoCopyOutline />
                            </span>
                        </p>
                    </div>
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
                <div className="flex flex-row items-center justify-end gap-4">
                    {/* TODO: complete this after this two endpoint is completed */}
                    <Link
                        to={`/borrow?borrower=${_id}`}
                        className="bg-slate-600 hover:bg-slate-700 active:bg-slate-700 text-white px-4 py-1 text-lg rounded-lg shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-200"
                    >
                        borrows
                    </Link>
                    <Link
                        to={`/return?borrower=${_id}`}
                        className="bg-slate-600 hover:bg-slate-700 active:bg-slate-700 text-white px-4 py-1 text-lg rounded-lg shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-200"
                    >
                        returns
                    </Link>
                </div>
                {/* <div className="flex flex-row items-center justify-around">
                    <Link
                        to={`/borrow/new?state=${_id}`}
                        className="bg-slate-600 hover:bg-slate-700 active:bg-slate-700 text-white px-4 py-1 text-lg rounded-lg shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-200"
                    >
                        new borrow
                    </Link>
                    <Link
                        to={`/return/new?state=${_id}`}
                        className="bg-slate-600 hover:bg-slate-700 active:bg-slate-700 text-white px-4 py-1 text-lg rounded-lg shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-200"
                    >
                        new return
                    </Link>
                </div> */}
                <AlertDialogFooter className="flex flex-row gap-2">
                    <div>Approved by: </div>
                    <div>{approvedBy}</div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
