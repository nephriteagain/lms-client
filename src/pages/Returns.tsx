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

export default function Returns() {
    const returns = useLoaderData() as Return[];

    return (
        <div className="py-12">
            <Table className="w-screen xs:w-[576px]">
                <TableCaption>A record of book returns.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/12">title</TableHead>
                        <TableHead className="w-2/12">book id</TableHead>
                        <TableHead className="w-2/12">borrower</TableHead>
                        <TableHead className="w-2/12">date borrowed</TableHead>
                        <TableHead className="w-2/12">
                            promised return date
                        </TableHead>
                        <TableHead className="w-2/12">borrow id</TableHead>
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
                                    <TableCell className="w-2/12">
                                        {_id.substring(0, 5)}...
                                    </TableCell>
                                    <TableCell className="w-2/12">
                                        {bookId.substring(0, 5)}...
                                    </TableCell>
                                    <TableCell className="w-2/12">
                                        {borrower.substring(0, 5)}...
                                    </TableCell>
                                    <TableCell className="w-2/12">
                                        {numberToDateString(borrowDate)}
                                    </TableCell>
                                    <TableCell className="w-2/12">
                                        {numberToDateString(returnDate)}
                                    </TableCell>
                                    <TableCell className="w-2/12">
                                        {approvedBy.substring(0, 5)}...
                                    </TableCell>
                                </TableRow>
                            );
                        },
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
