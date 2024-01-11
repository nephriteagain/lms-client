import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useState, useRef, useEffect } from "react";
import { generateRandomString, getAllChildInputs } from "@/lib/utils";
import { useFetcher } from "react-router-dom";

import InputList from "@/components/utils/InputList";
import Button from "@/components/utils/Button";

export default function NewBook() {
    const fetcher = useFetcher({ key: "book_create" });
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
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>New Book Entry</AlertDialogTitle>
                </AlertDialogHeader>
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
                    <AlertDialogFooter className="pt-8">
                        <Button
                            className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-lg hover:rounded-xl px-4 py-1 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-150"
                            disabled={fetcher.state === "submitting"}
                            loading={fetcher.state === "submitting"}
                        >
                            Save changes
                        </Button>
                    </AlertDialogFooter>
                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
