import { useRef, FormEvent } from "react";
import { SelectHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

import { IoSearchSharp } from "react-icons/io5";
import Button from "./Button";
import { cn } from "@/lib/utils";

type SearchBarProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: {
        text: string;
        value: string;
    }[];
    loading?: boolean;
};

export default function SearchBar({
    options,
    className,
    loading = false,
    ...props
}: SearchBarProps) {
    const navigate = useNavigate();

    const selectRef = useRef<HTMLSelectElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function search(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) return;
        const selectEl = selectRef.current;
        if (!selectEl) return;
        const inputEl = inputRef.current;
        if (!inputEl) return;
        const selectVal = selectEl.value;
        const searchVal = inputEl.value;

        try {
            if (!selectVal) {
                navigate("");
            }
            navigate(`?${selectVal}=${searchVal}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form
                onSubmit={search}
                className="flex flex-row justify-center gap-3"
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="bg-gray-200 px-2 py-1 text-sm rounded-md shadow-md"
                />
                <Button
                    className="bg-green-300  px-2 rounded-md shadow-md hover:scale-105 hover:bg-green-400 active:bg-green-400 transition-all duration-200"
                    type="submit"
                    disabled={loading}
                    loading={loading}
                >
                    <IoSearchSharp />
                </Button>
                <select
                    ref={selectRef}
                    defaultValue={options[0].value}
                    className={cn(
                        "bg-gray-300 text-sm px-1 rounded-md shadow-md",
                        className,
                    )}
                    {...props}
                >
                    {options.map(({ text, value }) => {
                        return (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        );
                    })}
                </select>
            </form>
        </div>
    );
}
