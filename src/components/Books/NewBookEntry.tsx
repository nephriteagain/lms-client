import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import { useState, useRef, useEffect } from "react";
import { generateRandomString, getAllChildInputs } from "@/lib/utils";
import { useFetcher } from "react-router-dom";

import InputList from "../utils/InputList";
import Button from "../utils/Button";

export default function NewBookEntryBtn() {
    const fetcher = useFetcher({ key: "create_book" });
    const [inputList, setInputList] = useState([generateRandomString()]);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formRef.current) return;
        if (fetcher.state === "loading") {
            const inputs = getAllChildInputs(formRef.current);
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
        }
    }, [fetcher.state]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-md hover:rounded-xl shadow-md hover:shadow-xl px-3 py-1 text-xl font-bold hover:scale-105 transition-all duration-200">
                    Add New Book
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Book Entry</DialogTitle>
                </DialogHeader>
                <fetcher.Form action="" method="post" ref={formRef}>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-start">
                            <p className="font-semibold text-lg">Title</p>
                            <input
                                type="text"
                                placeholder="title"
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                                name="title"
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="font-semibold text-lg">Authors</p>
                            <InputList
                                inputList={inputList}
                                setInputList={setInputList}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="font-semibold text-lg">
                                Year Published
                            </p>
                            <input
                                type="number"
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                                placeholder="year"
                                name="yearPublished"
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="font-semibold text-lg">
                                Total Inventory
                            </p>
                            <input
                                type="number"
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                                placeholder="total"
                                name="total"
                            />
                        </div>
                    </div>
                    <DialogFooter className="pt-8">
                        <Button
                            className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-lg hover:rounded-xl px-4 py-1 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-150"
                            disabled={fetcher.state === "submitting"}
                            loading={fetcher.state === "submitting"}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                    <DialogClose />
                </fetcher.Form>
            </DialogContent>
        </Dialog>
    );
}
