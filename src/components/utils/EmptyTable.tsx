import { Link } from "react-router-dom"

export default function EmptyTable() {
    return (
        <div className="py-8  flex items-center justify-center gap-4 w-[300px]">
            <p className="text-lg font-semibold">No Result Found...</p>
            <Link
                to={"/"}
                className="border-b border-black hover:text-green-800 hover:border-green transition-all duration-150"
            >
                go back
            </Link>
        </div>
)
}