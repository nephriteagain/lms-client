import { useState } from "react";
import { useFetcher } from "react-router-dom";
import Button from "@/components/utils/Button";

import TitleCombobox from "@/components/Borrow/TitleCombobox";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { BookSearchResults } from "@/schemas";

export default function BorrowNew() {
    const fetcher = useFetcher();
    const [ selectedBook, setSelectedBook ] = useState<BookSearchResults|null>(null)

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        new borrow entry
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <fetcher.Form>
                    <div>
                        <TitleCombobox 
                        selectedBook={selectedBook} 
                        setSelectedBook={setSelectedBook}  
                        />
                    </div>
                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
