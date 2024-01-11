"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useAxiosGet } from "@/hooks/useAxios";

import { BookSearchResults, ReactDispatch } from "@/schemas";
import { constants } from "@/constants";

type TitleComboboxType = {
    selectedBook: BookSearchResults | null;
    setSelectedBook: ReactDispatch<BookSearchResults | null>;
};

export default function TitleCombobox({
    selectedBook,
    setSelectedBook,
}: TitleComboboxType) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const books = useAxiosGet<BookSearchResults[]>(
        `${constants.server}/books/search?q=${query}`,
        [],
    );

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? books.find(
                                  (b) => b.title === value || b._id === value,
                              )?.title
                            : "Select a Book..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search Books..."
                            onChangeCapture={(e) =>
                                setQuery(e.currentTarget.value)
                            }
                        />
                        <CommandEmpty>No Books found.</CommandEmpty>
                        <CommandGroup>
                            {books.map((b) => (
                                <CommandItem
                                    key={b._id}
                                    value={b.title}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue,
                                        );
                                        const book =
                                            books.find(
                                                (b) => b.title === currentValue,
                                            ) ?? null;
                                        setSelectedBook(book);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === b.title
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {b.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
