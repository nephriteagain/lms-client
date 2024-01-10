import { useState } from "react";
import { useFetcher, Link, useLoaderData } from "react-router-dom";
import { Book } from "@/schemas";

import { generateRandomString } from "@/lib/utils";

import InputList from "@/components/utils/InputList";
import Button from "@/components/utils/Button";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

export default function BookUpdate() {
    const fetcher = useFetcher();
    const [bookToUpdate] = useLoaderData() as [Book];

    const { title, authors, yearPublished } = bookToUpdate;
    const [inputList, setInputList] = useState(
        Array.from(authors, () => generateRandomString()),
    );

    const loading = Boolean(fetcher.state === "submitting");

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <fetcher.Form
                    className="flex flex-col gap-8"
                    method="patch"
                    action=""
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="font-semibold">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={title}
                            className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Authors</label>
                        <InputList
                            inputList={inputList}
                            setInputList={setInputList}
                            defaultValue={authors}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="yearPublished"
                            className="font-semibold"
                        >
                            Year Published
                        </label>
                        <input
                            type="number"
                            name="yearPublished"
                            defaultValue={yearPublished}
                            className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                        />
                    </div>
                    <div className="w-full flex flex-row items-center justify-between font-semibold">
                        <Button
                            type="submit"
                            className="bg-green-300 hover:bg-green-400 active:bg-green-400 px-3 py-2 rounded-md shadow-md hover:shadow-md hover:scale-105 transition-all duration-200"
                            loading={loading}
                            disabled={loading}
                        >
                            Save
                        </Button>
                        <Link
                            to=".."
                            className="bg-red-300 hover:bg-red-400 active:bg-red-400 px-3 py-2 rounded-md shadow-md hover:shadow-md hover:scale-105 transition-all duration-200"
                        >
                            Cancel
                        </Link>
                    </div>
                </fetcher.Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
