import { useLoaderData, Outlet, useNavigate } from "react-router-dom"
import type { BookInventory } from "@/schemas"


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Inventory() {
    const inventory = useLoaderData() as BookInventory[]
    const navigate = useNavigate()

    return (
        <div className="py-12">
            <Table className="bg-slate-100 rounded-xl shadow-lg w-[95%] xs:w-[500px] sm:w-[600px] md:w-[700px] overflow-hidden">
                <TableCaption>list of book inventory.</TableCaption>
                <TableHeader className="bg-slate-200">
                    <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Borrowed</TableHead>
                    <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inventory.map((item) => {
                        const {_id, title, available, borrowed, total} = item
                    return (<TableRow 
                    key={_id}
                    tabIndex={5}
                    className="hover:bg-slate-300 cursor-pointer"
                    onClick={() => navigate(`update/${_id}`, {state: item})}
                    >
                        <TableCell className="text-left w-8/12 font-medium">{title}</TableCell>
                        <TableCell className="text-center w-1/12">{available}</TableCell>
                        <TableCell className="text-center w-1/12">{borrowed}</TableCell>
                        <TableCell className="text-center w-1/12 ">{total}</TableCell>
                    </TableRow>)
                    })}
                </TableBody>
            </Table>
            {/* this is where the /inventory/update/:id will go */}
            <Outlet />
        </div>
    )
}