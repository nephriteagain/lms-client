import { useLoaderData, Outlet, useNavigate } from "react-router-dom";
import type { BookInventory } from "@/schemas";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TableCellCopy from "@/components/utils/TableCellCopy";
import SearchBar from "@/components/utils/SearchBar";

const inventoryOptions = [
    {
        value: "title",
        text: "TITLE",
    },
    {
        value: "_id",
        text: "ID",
    },
];

export default function Inventory() {
    const inventory = useLoaderData() as BookInventory[];
    const navigate = useNavigate();

    return (
        <div className="py-12 flex flex-col items-center gap-4">
            <div className="w-full flex flex-row justify-end">
                <SearchBar options={inventoryOptions} />
            </div>

            <Table className="bg-slate-100 rounded-xl shadow-lg w-[95%] xs:w-[500px] sm:w-[600px] md:w-[700px] overflow-hidden">
                <TableCaption>list of book inventory.</TableCaption>
                <TableHeader className="bg-slate-200">
                    <TableRow>
                        <TableHead>title</TableHead>
                        <TableHead>id</TableHead>
                        <TableHead>available</TableHead>
                        <TableHead>borrowed</TableHead>
                        <TableHead>total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inventory.map((item) => {
                        const { _id, title, available, borrowed, total } = item;
                        return (
                            <TableRow
                                key={_id}
                                tabIndex={5}
                                className="hover:bg-slate-300 cursor-pointer"
                                onClick={() => navigate(`update/${_id}`)}
                            >
                                <TableCell className="text-left w-8/12 font-medium">
                                    {title}
                                </TableCell>
                                <TableCellCopy item={_id} />
                                <TableCell className="text-center w-1/12">
                                    {available}
                                </TableCell>
                                <TableCell className="text-center w-1/12">
                                    {borrowed}
                                </TableCell>
                                <TableCell className="text-center w-1/12 ">
                                    {total}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {/* this is where the /inventory/update/:id will go */}
            <Outlet />
        </div>
    );
}
