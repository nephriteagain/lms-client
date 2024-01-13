import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/components/utils/Button";
import { numberToDateString } from "@/lib/utils";
import { BorrowReturnLoaderType } from "@/schemas";

import { useFetcher, useNavigate, useLoaderData } from "react-router-dom";

export default function BorrowReturn() {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const borrowData = useLoaderData() as null | BorrowReturnLoaderType;

    if (!borrowData) {
        throw new Error("borrow data not found");
    }

    const { name, date, promisedReturnDate, title } = borrowData;

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <fetcher.Form action="" method="post">
                    <AlertDialogHeader>
                        <AlertDialogTitle>CONFIRM RETURN</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">                      
                        <div className="bg-zinc-300 p-2 rounded-md shadow-inner shadow-zinc-500">
                            <p className="flex gap-6">
                                <span className="font-semibold opacity-80">title: </span>
                                <span className="font-bold">{title}</span>
                            </p>
                            <p className="flex gap-6">
                                <span className="font-semibold opacity-80">borrower: </span>
                                <span className="font-bold">{name}</span>
                            </p>
                            <p className="flex gap-6">
                                <span className="font-semibold opacity-80">borrow date: </span>
                                <span className="font-bold">{numberToDateString(date)}</span>
                            </p>
                            <p className="flex gap-6">
                                <span className="font-semibold opacity-80">promised return date:</span>
                                <span className="font-bold">{numberToDateString(promisedReturnDate)}</span>
                            </p>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            type="button"
                            onClick={() => navigate("..")}
                            className="hover:scale-105 active:scale-95"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            type="submit"
                            className="text-sm font-semibold"
                            loading={fetcher.state === "submitting"}
                        >
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
