import { Book } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import TableCellCopy from "../utils/TableCellCopy";

import ClipboardCopy from "../utils/ClipboardCopy";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// TODO: pagination
export default function BookTable({ books }: { books: Book[] }) {
    return (
        <Table className="bg-slate-100 rounded-xl shadow-lg w-[95%] xs:w-[500px] sm:w-[600px] md:w-[700px] overflow-hidden">
            <TableCaption>List of Registered Books</TableCaption>
            <TableHeader className="bg-slate-200">
                <TableRow>
                    <TableHead>title</TableHead>
                    <TableHead>author/s</TableHead>
                    <TableHead>year</TableHead>
                    <TableHead>date added</TableHead>
                    <TableHead>id</TableHead>
                </TableRow>
            </TableHeader>
            {books.length > 0 ? (
                <TableBody>
                    {books.map((book) => {
                        return <BookTableRow {...book} key={book._id} />;
                    })}
                </TableBody>
            ) : (
                <div className="py-8  flex items-center justify-center gap-4">
                    <p className="text-lg font-semibold">No Result Found...</p>
                    <Link
                        to={"/"}
                        className="border-b border-black hover:text-green-800 hover:border-green transition-all duration-150"
                    >
                        go back
                    </Link>
                </div>
            )}
        </Table>
    );
}

function BookTableRow({ title, authors, yearPublished, dateAdded, _id }: Book) {
    const navigate = useNavigate();

    return (
        <TableRow
            tabIndex={5}
            className="hover:bg-slate-300 cursor-pointer"
            onClick={() => navigate(`books/${_id}`)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    e.currentTarget.click();
                }
            }}
        >
            <TableCell>{title}</TableCell>
            <TableCell>{authors.join()}</TableCell>
            <TableCell>{yearPublished}</TableCell>
            <TableCell>
                {new Date(dateAdded)
                    .toDateString()
                    .split(" ")
                    .splice(1)
                    .join(" ")}
            </TableCell>
            <TableCellCopy item={_id} />
        </TableRow>
    );
}
