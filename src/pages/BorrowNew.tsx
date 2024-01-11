import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import Button from "@/components/utils/Button";


import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { BookSearchResults, MemberSearchResults } from "@/schemas";
import DatePicker from "@/components/Borrow/Datepicker";
import ComboBox from "@/components/utils/ComboBox";

export default function BorrowNew() {
    const fetcher = useFetcher({ key: "borrow_create" });
    const [selectedBook, setSelectedBook] = useState<BookSearchResults | null>(
        null,
    );
    const [selectedMember, setSelectedMember] =
        useState<MemberSearchResults | null>(null);
    const [date, setDate] = useState<Date | undefined>();
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (date) {
            const picked = date.getTime();
            const now = Date.now();
            if (picked <= now) {
                setDisabled(true);
                return;
            }
        }
        if (!date || !selectedBook || !selectedMember) {
            setDisabled(true);
            return;
        }
        setDisabled(false);
    }, [date, selectedBook, selectedMember]);

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription className="opacity-80 italic tex-sm text-right">
                        all related data will update automatically
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <fetcher.Form
                    className="flex flex-col items-start gap-8"
                    action=""
                    method="post"
                >                    
                    <div className="flex flex-col gap-1 font-semibold">
                        <p>title</p>
                        <ComboBox
                        setSelected={setSelectedBook}
                        to="books"
                        searchCriteria="title"
                        searchPlaceholder="Search Books..."
                        selectPlaceholder="Select a Book"
                        notFoundText="No Books found."

                        />
                    </div>
                    <div className="flex flex-col gap-1 font-semibold">
                        <p>member</p>
                        <ComboBox
                            setSelected={setSelectedMember}
                            to="members"
                            searchCriteria="name"
                            searchPlaceholder="Search Members..."
                            selectPlaceholder="Seleect a Member"
                            notFoundText="No Members found."
                        />
                    </div>                   
                    <div className="flex flex-col gap-1 font-semibold">
                        <p>date</p>
                        <DatePicker date={date} setDate={setDate} />
                        <p className="h-4 text-red-600 text-sm">
                            {Boolean(date && date.getTime() <= Date.now()) &&
                                "Please choose a future date."}
                        </p>
                    </div>                    
                    <div>
                        <Button
                            type="submit"
                            disabled={disabled}
                            loading={fetcher.state === "submitting"}
                            className="text-xl font-semibold shadow-md hover:shadow-lg active:shadow-md"
                        >
                            SAVE
                        </Button>
                    </div>
                    {/* NOTE: this is created for the useFetcher action */}
                    <div className="absolute hidden">
                        <input
                            type="text"
                            name="book"
                            value={JSON.stringify(selectedBook)}
                            readOnly
                            tabIndex={-1}
                        />
                        <input
                            type="text"
                            name="member"
                            value={JSON.stringify(selectedMember)}
                            readOnly
                            tabIndex={-1}
                        />
                        <input
                            type="text"
                            name="date"
                            value={JSON.stringify(date?.getTime())}
                            readOnly
                            tabIndex={-1}
                        />
                    </div>
                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
