import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Borrow } from "@/schemas";

import { useLoaderData } from "react-router-dom";

import { numberToDateString } from "@/lib/utils";
import TableCellCopy from "@/components/utils/TableCellCopy";

export default function Borrows() {
    const borrows = useLoaderData() as Borrow[];

    return (
        <div className="py-12">
            <Table className="w-screen xs:w-[576px]">
                <TableCaption>A record of borrowed books.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/12">title</TableHead>
                        <TableHead className="w-2/12">id</TableHead>
                        <TableHead className="w-2/12">date borrowed</TableHead>
                        <TableHead className="w-2/12">borrower id</TableHead>
                        <TableHead className="w-2/12">
                            promised return date
                        </TableHead>
                        <TableHead className="w-2/12">book id</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {borrows.map(
                        ({
                            _id,
                            title,
                            bookId,
                            borrower,
                            date,
                            promisedReturnDate,
                        }) => {
                            return (
                                <TableRow key={_id}>
                                    <TableCell className="w-2/12">
                                        {title.length > 20
                                            ? `${title.substring(0, 20)}...`
                                            : title}
                                    </TableCell>
                                    <TableCellCopy item={_id} />
                                    <TableCell className="w-2/12">
                                        {numberToDateString(date)}
                                    </TableCell>
                                    <TableCellCopy item={borrower} />
                                    <TableCell className="w-2/12">
                                        {numberToDateString(promisedReturnDate)}
                                    </TableCell>
                                    <TableCellCopy item={bookId} />
                                </TableRow>
                            );
                        },
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
