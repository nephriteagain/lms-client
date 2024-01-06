import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";

import {  Dispatch, SetStateAction, useState } from "react";
import { generateRandomString } from "@/lib/utils";
import {  useFetcher,  } from "react-router-dom";

import Button from "../utils/Button";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function NewBookEntryBtn() {
    const [inputList, setInputList] = useState([generateRandomString()]);    
    const fetcher = useFetcher({key: 'create_book'})
        


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
            <fetcher.Form action='' method="post"  >
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-start">
                            <p className="font-semibold text-lg">Title</p>
                            <input
                                type="text"
                                placeholder="title"
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1"
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
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1"
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
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1"
                                placeholder="total"
                                name="total"
                            />
                        </div>
                    </div>
                        <DialogFooter className="pt-8">
                            <Button
                                className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-lg hover:rounded-xl px-4 py-1 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-150"
                                disabled={fetcher.state === 'submitting'}
                                loading={fetcher.state === 'submitting'}
                            >
                                    Save changes
                            </Button>
                        </DialogFooter>                        
                        <DialogClose  />
                    </fetcher.Form>
                    
                </DialogContent>
        </Dialog>
    );
}

type InputListProps = {
    inputList: string[]
    setInputList: Dispatch<SetStateAction<string[]>>;
};

function InputList({ inputList, setInputList }: InputListProps) {
    function addInput() {
        setInputList((list) => [
            ...list,
            generateRandomString(),
        ]);
    }
    function removeInput(id: string) {
        if (inputList.length === 1) {
            return;
        }
        setInputList((list) => list.filter((li) => li !== id));
    }


    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2">
                {inputList.map((id, index) => {
                    return (
                        <li key={id} className="flex flex-row gap-2">
                            <input
                                type="text"                                
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1"
                                placeholder={`author #${index+1}`}
                                name={`author-${id}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeInput(id)}
                                className=" bg-red-300 hover:bg-red-400 active:bg-red-400 aspect-square text-sm rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-150"
                            >
                                <FiMinus />
                            </button>
                        </li>
                    );
                })}
            </div>
            <div>
                <button
                    type="button"
                    onClick={addInput}
                    className=" bg-green-300 hover:bg-green-400 active:bg-green-400 aspect-square text-sm rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-150"
                >
                    <FiPlus />
                </button>
            </div>
        </div>
    );
}
