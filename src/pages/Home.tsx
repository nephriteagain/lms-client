import { useLoaderData } from "react-router-dom";
import { Book } from "../types";

import BookTable from "../components/Home/Table";
import SearchBar from "@/components/Home/SearchBar";
import NewBookEntryBtn from "@/components/Home/NewBookEntry";

export default function Home() {
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
