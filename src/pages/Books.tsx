import { useLoaderData, Outlet, Link } from "react-router-dom";
import { Book } from "../schemas";

import BookTable from "@/components/Books/Table";
import SearchBar from "@/components/Books/SearchBar";

export default function Books() {
    const books = useLoaderData() as Awaited<Book[]>;

    return (
        <div>
            <div className="flex justify-center py-12">
                <Link
                    to="/books/new"
                    className="bg-green-300 hover:bg-green-400 active:bg-green-400 rounded-md hover:rounded-xl shadow-md hover:shadow-xl px-3 py-1 text-xl font-bold hover:scale-105 transition-all duration-200"
                >
                    Add New Book
                </Link>
            </div>
            <div className="flex flex-row justify-end">
                <SearchBar />
            </div>
            <div className="py-4">
                <BookTable books={books} />
            </div>
            <Outlet />
        </div>
    );
}
