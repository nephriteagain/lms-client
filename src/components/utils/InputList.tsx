import { Dispatch, SetStateAction } from "react";
import { generateRandomString } from "@/lib/utils";

import { FiMinus, FiPlus } from "react-icons/fi";

type InputListProps = {
    inputList: string[]
    setInputList: Dispatch<SetStateAction<string[]>>;
    // this props is used to update an existing authors array
    defaultValue?: string[]
};

export default function InputList({ inputList, setInputList, defaultValue }: InputListProps) {
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

                    const val = {defaultValue: (defaultValue && defaultValue[index]) ? defaultValue[index] : undefined}

                    return (
                        <li key={id} className="flex flex-row gap-2">
                            <input
                                type="text"                                
                                className="bg-gray-200 w-5/6 rounded-md px-3 py-1 shadow-md"
                                placeholder={`author #${index+1}`}
                                name={`author-${id}`}
                                {...val}
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