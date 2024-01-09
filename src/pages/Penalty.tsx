import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TableCellCopy from "@/components/utils/TableCellCopy";
import { Penalty as PenaltyType } from "@/schemas";
import ClipboardCopy from "@/components/utils/ClipboardCopy";
import { useLoaderData } from "react-router-dom";

export default function Penalty() {
    const penaltyList = useLoaderData() as PenaltyType[];

    return (
        <div className="py-12">
            <Table className="w-screen xs:w-[576px]">
                <TableCaption>A record of book returns.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/12">id</TableHead>
                        <TableHead className="w-2/12">bookId</TableHead>
                        <TableHead className="w-2/12">borrower</TableHead>
                        <TableHead className="w-2/12">penalty</TableHead>
                        <TableHead className="w-2/12">approvedBy</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {penaltyList.map(
                        ({ _id, bookId, borrower, penalty, approvedBy }) => {
                            return (
                                <TableRow key={_id}>
                                    <TableCellCopy item={_id} />
                                    <TableCellCopy item={bookId} />
                                    <TableCellCopy item={borrower} />
                                    <TableCell className="w-2/12">
                                        {penalty}
                                    </TableCell>
                                    <TableCellCopy item={approvedBy} />
                                </TableRow>
                            );
                        },
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
