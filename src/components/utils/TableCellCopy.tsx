import { TableCell } from "../ui/table";
import ClipboardCopy from "./ClipboardCopy";
import { TdHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TableCellCopyProps = TdHTMLAttributes<HTMLTableCellElement> & {
    item: string;
};

// bug, whenever there is two side by side of this the layout is
export default function TableCellCopy({
    item,
    className,
    ...props
}: TableCellCopyProps) {
    return (
        <TableCell className={cn("", className)} {...props}>
            <>
                <span>{item.substring(0, 5)}...</span>
                <ClipboardCopy copyItem={item} />
            </>
        </TableCell>
    );
}
