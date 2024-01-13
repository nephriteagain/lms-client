import { useState } from "react";
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

import { ReactDispatch, MemberSearchResults } from "@/schemas";
import { constants } from "@/constants";

type MemberComboBox = {
    selectedMember: MemberSearchResults | null;
    setSelectedMember: ReactDispatch<MemberSearchResults | null>;
};

export default function MemberCombobox({ setSelectedMember }: MemberComboBox) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const members = useAxiosGet<MemberSearchResults[]>(
        `${constants.server}/members/search?q=${query}`,
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
                            ? members.find((m) => m.name === value)?.name
                            : "Select a Member..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search Members..."
                            onChangeCapture={(e) =>
                                setQuery(e.currentTarget.value)
                            }
                        />
                        <CommandEmpty>No Members found.</CommandEmpty>
                        <CommandGroup>
                            {members.map((m) => (
                                <CommandItem
                                    key={m._id}
                                    value={m.name}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ""
                                                : currentValue,
                                        );
                                        const member =
                                            members.find(
                                                (m) => m.name === currentValue,
                                            ) ?? null;
                                        setSelectedMember(member);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === m.name
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {m.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
