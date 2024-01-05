import { useLoaderData } from "react-router-dom"
import { Book } from "../types"

import BookTable from "../components/Home/Table"
import SearchBar from "@/components/Home/SearchBar"

export default function Home() {
    const books = useLoaderData() as Awaited<Book[]>

    return (
        <div>
            <div className="flex flex-col items-end">
                <SearchBar />
            </div>
            <div className="py-8">
                <BookTable books={books} />
            </div>
        </div>
    )
}