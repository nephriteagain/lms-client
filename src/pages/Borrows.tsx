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

import { useLoaderData, Link, Outlet, useNavigate } from "react-router-dom";

import { numberToDateString } from "@/lib/utils";
import TableCellCopy from "@/components/utils/TableCellCopy";
import SearchBar from "@/components/utils/SearchBar";
import EmptyTable from "@/components/utils/EmptyTable";

import { Option } from "@/schemas";
import { GiReturnArrow } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";

const borrowOptions = [
    {
        value: "_id",
        text: "ID",
    },
    {
        value: "title",
        text: "TITLE",
    },
    {
        value: "borrower",
        text: "BORROWER ID",
    },
    {
        value: "approvedBy",
        text: "APPROVED BY",
    },
    {
        value: "bookId",
        text: "BOOK ID",
    },
] as const satisfies Option[];

export default function Borrows() {
    const borrows = useLoaderData() as Borrow[];
    const navigate = useNavigate();

    return (
        <div className="py-12 flex flex-col items-center gap-4">
            <div className="pb-10">
                <Link
                    to="new"
                    className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-md hover:rounded-xl shadow-md hover:shadow-xl px-3 py-1 text-xl font-bold hover:scale-105 active:scale-95 transition-all duration-200"
                >
                    New Borrow Entry
                </Link>
            </div>
            <div className="w-full flex flex-row justify-end">
                <SearchBar options={borrowOptions} />
            </div>
            <Table className="w-screen xs:w-[576px]">
                <TableCaption>A record of borrowed books.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/12">title</TableHead>
                        <TableHead className="w-2/12">id</TableHead>
                        <TableHead className="w-2/12">date borrowed</TableHead>
                        <TableHead className="w-1/12">borrower id</TableHead>
                        <TableHead className="w-2/12">
                            promised return date
                        </TableHead>
                        <TableHead className="w-2/12">book id</TableHead>
                        <TableHead className="w-1/12">return</TableHead>
                    </TableRow>
                </TableHeader>
                { borrows.length > 0 ? <TableBody>
                    {borrows.map(
                        ({
                            _id,
                            title,
                            bookId,
                            borrower,
                            date,
                            promisedReturnDate,
                            isReturned
                            
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
                                    {   isReturned ?
                                        
                                        <TableCell className="relative">
                                            <FaCheck  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl fill-green-600 group-hover:scale-125 group-active:scale-95 transition-all duration-200 drop-shadow-md group-hover:drop-shadow-lg" />
                                        </TableCell> :
                                        <TableCell
                                        className="group relative hover:bg-blue-200"
                                        onClick={() =>
                                            navigate(`return/${_id}`)
                                        }
                                        >
                                            <GiReturnArrow className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl fill-blue-600 group-hover:scale-125 group-active:scale-95 transition-all duration-200 drop-shadow-md group-hover:drop-shadow-lg" />
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        },
                    )}
                </TableBody> :
                <EmptyTable />
                }
            </Table>
            <Outlet />
        </div>
    );
}
