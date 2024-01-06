import { useLoaderData, Link } from "react-router-dom"

import { BookData } from "@/schemas"

export default function Book() {
    const [ bookInfo, bookInventory ] = useLoaderData() as BookData
    
    console.log(bookInfo, bookInventory)
    const { title, authors, yearPublished, dateAdded } = bookInfo
    const { available, borrowed, total } = bookInventory

    return (
        <div className="py-12">
        <div className="flex flex-col gap-6 p-6 w-[95vw] xs:w-[500px] bg-slate-200 rounded-xl shadow-xl">
             <section className="flex flex-col gap-3 p-4 bg-zinc-200 rounded-lg shadow-inner shadow-gray-400">
                <div className="text-center">
                    <p className="font-bold text-xl">Title</p>
                    <p>{title}</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg">Author/s</p>
                    <p>{authors.join(', ')}</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold">Year published</p>
                    <p>{yearPublished}</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold">Date Added</p>
                    <p>{new Date(dateAdded).toDateString().split(' ').splice(1).join(' ')}</p>
                </div>
                <div className="text-center py-4">
                    <Link to={'update'} state={bookInfo} className="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-150">
                        UPDATE
                    </Link>
                </div>
            </section>
            <section className=" flex flex-row justify-center  items-center gap-3 p-4 bg-stone-200 rounded-lg shadow-inner shadow-gray-400">
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Total</p>
                    <p className="font-bold">{total}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Available</p>
                    <p className="font-bold">{available}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Borrowed</p>
                    <p className="font-bold">{borrowed}</p>
                </div>
            </section>
            <div className="flex justify-center">
            <Link to={'..'} className="font-semibold border-b border-black hover:border-b-2 active:border-b-2">back</Link>
            </div>
        </div>
        </div>

       
    )
}