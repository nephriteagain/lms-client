import { Book } from "../../schemas";
import { Link } from "react-router-dom";

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
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.length > 0 ? (
                    books.map((book) => {
                        return <BookTableRow {...book} key={book._id} />;
                    })
                ) : (
                    <div className="py-8  flex items-center justify-center gap-4">
                        <p className="text-lg font-semibold">
                            No Result Found...
                        </p>
                        <Link
                            to={"/"}
                            className="border-b border-black hover:text-green-800 hover:border-green transition-all duration-150"
                        >
                            go back
                        </Link>
                    </div>
                )}
            </TableBody>
        </Table>
    );
}

function BookTableRow({ title, authors, yearPublished, dateAdded }: Book) {
    return (
        <TableRow className="hover:bg-slate-300">
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
        </TableRow>
    );
}
