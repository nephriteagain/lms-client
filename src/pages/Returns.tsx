import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLoaderData } from "react-router-dom";
import { numberToDateString } from "@/lib/utils";

import { Return } from "@/schemas";
import TableCellCopy from "@/components/utils/TableCellCopy";
import SearchBar from "@/components/utils/SearchBar";

const returnOptions = [
    {
        value: '_id',
        text: 'ID',
    },
    {
        value: 'bookId',
        text: 'BOOK ID'
    },
    {
        value: 'borrower',
        text: 'BORROWER ID',        
    },
]

export default function Returns() {
    const returns = useLoaderData() as Return[];

    // TODO: where is the Borrow ID????
    return (
        <div className="py-12 flex flex-col items-center gap-4">
            <div className="w-full flex flex-row justify-end">
                <SearchBar options={returnOptions} />
            </div>
            <Table className="w-screen xs:w-[576px]">
                <TableCaption>A record of book returns.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>id</TableHead>
                        <TableHead>book id</TableHead>
                        <TableHead>date borrowed</TableHead>
                        <TableHead>borrower id</TableHead>
                        <TableHead>promised return date</TableHead>
                        <TableHead>approved by</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {returns.map(
                        ({
                            _id,
                            bookId,
                            borrower,
                            returnDate,
                            borrowDate,
                            approvedBy,
                        }) => {
                            return (
                                <TableRow key={_id}>
                                    <TableCellCopy item={_id} />
                                    {/* TODO: add title schema for returns */}
                                    {/* <TableCell>title</TableCell> */}
                                    <TableCellCopy item={bookId} />
                                    <TableCell>
                                        {numberToDateString(borrowDate)}
                                    </TableCell>
                                    <TableCellCopy item={borrower} />
                                    <TableCell>
                                        {numberToDateString(returnDate)}
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
