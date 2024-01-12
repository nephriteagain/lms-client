import { FunctionComponent, ReactNode, useState, HTMLAttributes } from "react";
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

import { ReactDispatch } from "@/schemas";
import { constants } from "@/constants";

type ComboBoxProps<T> = {
    setSelected: ReactDispatch<T & any>;
    to: string;
    searchCriteria: ("title" | "name" | "_id" | "email") & keyof T;
    searchPlaceholder: string;
    selectPlaceholder: string;
    notFoundText: string;
} & HTMLAttributes<HTMLDivElement>;

export default function ComboBox<T>({
    setSelected,
    to,
    searchCriteria,
    searchPlaceholder,
    selectPlaceholder,
    notFoundText,
    className,
    ...props
}: ComboBoxProps<T>) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const items = useAxiosGet<(T & { _id: string })[]>(
        `${constants.server}/${to}/search?q=${query}`,
        [],
    );

    const item = items.find((i) => i[searchCriteria] === value);
    const v = item ? item[searchCriteria] : selectPlaceholder;

    return (
        <div className={cn(`ps-8`, className)} {...props}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {v as ReactNode}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput
                            placeholder={searchPlaceholder}
                            onChangeCapture={(e) =>
                                setQuery(e.currentTarget.value)
                            }
                        />
                        <CommandEmpty>{notFoundText}</CommandEmpty>
                        <CommandGroup>
                            {items.map((i) => (
                                <CommandItem
                                    key={i._id}
                                    value={i[searchCriteria] as string}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue,
                                        );
                                        const item =
                                            items.find(
                                                (i) =>
                                                    i[searchCriteria] ===
                                                    currentValue,
                                            ) ?? null;
                                        setSelected(item as T);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === i[searchCriteria]
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {i[searchCriteria] as ReactNode}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
