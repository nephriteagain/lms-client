import { useLoaderData } from "react-router-dom";
import { Book } from "../schemas";

import BookTable from "@/components/Books/Table";
import SearchBar from "@/components/Books/SearchBar";
import NewBookEntryBtn from "@/components/Books/NewBookEntry";

export default function Books() {
    const books = useLoaderData() as Awaited<Book[]>;

    return (
        <div>
            <div className="flex justify-center py-12">
                <NewBookEntryBtn />
            </div>
            <div className="flex flex-row justify-end">
                <SearchBar />
            </div>
            <div className="py-4">
                <BookTable books={books} />
            </div>
        </div>
    );
}
