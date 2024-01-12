import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import Button from "@/components/utils/Button";


import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import DatePicker from "@/components/Borrow/Datepicker";
import ComboBox from "@/components/utils/ComboBox";
import { BookSearchResults, MemberSearchResults } from "@/schemas";

export default function BorrowNew() {
    const fetcher = useFetcher({ key: "borrow_create" });
    const [ bookSearchBy, setBookSearchBy ] = useState<'title'|'_id'>('title')
    const [ memberSearchBy, setMemberSearchBy ] = useState<'name'|'_id'|'email'>('name')
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
                    <div className="w-full flex flex-col gap-2 font-semibold bg-zinc-200 p-4 shadow-inner shadow-gray-500">                        
                        <p className="text-lg">Book</p>
                        <p className="ps-4 text-sm opacity-70" >searching by: {bookSearchBy}</p>
                        <RadioGroup defaultValue="title" className="ps-4 flex flex-row gap-2">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="r1">Title</Label>
                                <RadioGroupItem value="title" id="r1" onClick={() => setBookSearchBy('title')} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="r2">Id</Label>
                                <RadioGroupItem value="_id" id="r2" onClick={() => setBookSearchBy('_id')} />
                            </div>                            
                        </RadioGroup>
                        <ComboBox
                        setSelected={setSelectedBook}
                        to="books"
                        searchCriteria={bookSearchBy}
                        searchPlaceholder="Search Books"
                        selectPlaceholder="Select a Book"
                        notFoundText="No Books found."
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2 font-semibold bg-gray-200 p-4 shadow-inner shadow-gray-500">
                        <p className="text-lg">Member</p>
                        <p className="ps-4 text-sm opacity-70" >searching by: {memberSearchBy}</p>
                        <RadioGroup defaultValue="name" className="ps-4 flex flex-row gap-2">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="r1">Name</Label>
                                <RadioGroupItem value="name" id="r1" onClick={() => setMemberSearchBy('name')} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="r2">Email</Label>
                                <RadioGroupItem value="email" id="r2" onClick={() => setMemberSearchBy('email')} />
                            </div>  
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="r2">Id</Label>
                                <RadioGroupItem value="_id" id="r2" onClick={() => setMemberSearchBy('_id')} />
                            </div>                           
                        </RadioGroup>
                        <ComboBox
                            setSelected={setSelectedMember}
                            to="members"
                            searchCriteria={memberSearchBy}
                            searchPlaceholder="Search Members..."
                            selectPlaceholder="Select a Member"
                            notFoundText="No Members found."
                        />
                    </div>                   
                    <div className="w-full flex flex-col gap-1 font-semibold bg-neutral-200 p-4 shadow-inner shadow-gray-500">
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
