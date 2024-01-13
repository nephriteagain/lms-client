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
    const borrowData = useLoaderData() as null|BorrowReturnLoaderType

    if (!borrowData) {
        throw new Error('borrow data not found')
    }

    const { name, date, promisedReturnDate, title } = borrowData


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
                    <div>
                        <p>title: {title}</p>
                        <p>borrower: {name}</p>
                        <p>borrow date: {numberToDateString(date)}</p>
                        <p>promised return date: {numberToDateString(promisedReturnDate)}</p>
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
