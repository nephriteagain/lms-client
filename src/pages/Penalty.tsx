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
import { Option, Penalty as PenaltyType } from "@/schemas";
import { useLoaderData } from "react-router-dom";
import SearchBar from "@/components/utils/SearchBar";
import EmptyTable from "@/components/utils/EmptyTable";

const penaltyOptions = [
    {
        value: "_id",
        text: "ID",
    },
    {
        value: "bookId",
        text: "BOOK ID",
    },
    {
        value: "borrower",
        text: "BORROWER",
    },
    {
        value: "approvedBy",
        text: "APPROVED BY",
    },
] as const satisfies Option[];

export default function Penalty() {
    const penaltyList = useLoaderData() as PenaltyType[];

    return (
        <div className="py-12 flex flex-col items-center gap-4">
            <div className="w-full flex flex-row justify-end">
                <SearchBar options={penaltyOptions} />
            </div>
            <Table className="w-screen xs:w-[576px]">
                <TableCaption>A record of penalty.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/12">id</TableHead>
                        <TableHead className="w-2/12">bookId</TableHead>
                        <TableHead className="w-2/12">borrower</TableHead>
                        <TableHead className="w-2/12">penalty</TableHead>
                        <TableHead className="w-2/12">approvedBy</TableHead>
                    </TableRow>
                </TableHeader>
                {penaltyList.length > 0 ? (
                    <TableBody>
                        {penaltyList.map(
                            ({
                                _id,
                                bookId,
                                borrower,
                                penalty,
                                approvedBy,
                            }) => {
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
                ) : (
                    <EmptyTable />
                )}
            </Table>
        </div>
    );
}
