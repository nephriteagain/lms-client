import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Member, Option } from "@/schemas";
import { useLoaderData, useNavigate, Outlet, Link } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import TableCellCopy from "@/components/utils/TableCellCopy";
import SearchBar from "@/components/utils/SearchBar";
import EmptyTable from "@/components/utils/EmptyTable";

const memberOptions = [
    {
        value: "name",
        text: "NAME",
    },
    {
        value: "_id",
        text: "ID",
    },
] as const satisfies Option[];

export default function Members() {
    const members = useLoaderData() as Member[];

    const navigate = useNavigate();

    return (
        <div className="py-12 flex flex-col items-center gap-4">
            <div className="pb-8 flex justify-center">
                <Link
                    to="new"
                    className="text-xl bg-green-300 px-4 py-2 font-bold rounded-lg hover:rounded-xl active:rounded-xl shadow-lg hover:shadow-xl active:shadow-xl hover:scale-105 active:scale-95 transition-all duration-150"
                >
                    New Member
                </Link>
            </div>
            <div className="w-full flex flex-row justify-end">
                <SearchBar options={memberOptions} />
            </div>
            <Table className="bg-slate-100 rounded-xl shadow-lg w-[95%] xs:w-[500px] sm:w-[600px] md:w-[700px] overflow-hidden">
                <TableCaption>list of current members.</TableCaption>
                <TableHeader className="bg-slate-200">
                    <TableRow>
                        <TableHead>name</TableHead>
                        <TableHead>id</TableHead>
                        <TableHead className="text-center">age</TableHead>
                        <TableHead className="text-center">join date</TableHead>
                        <TableHead className="text-center">
                            approved By
                        </TableHead>
                        <TableHead className="text-center">delete</TableHead>
                    </TableRow>
                </TableHeader>
                {members.length > 0 ? (
                    <TableBody>
                        {members.map((member) => {
                            const { _id, name, age, joinDate, approvedBy } =
                                member;
                            return (
                                <TableRow
                                    key={_id}
                                    tabIndex={5}
                                    className="hover:bg-slate-300 cursor-pointer"
                                    onClick={() => navigate(`${_id}`)}
                                >
                                    <TableCell className="text-left w-4/12 font-medium">
                                        {name}
                                    </TableCell>
                                    <TableCellCopy item={_id} />
                                    <TableCell className="text-center w-1/12">
                                        {age}
                                    </TableCell>
                                    <TableCell className="text-center w-3/12">
                                        {new Date(joinDate)
                                            .toDateString()
                                            .split(" ")
                                            .splice(1)
                                            .join(", ")}
                                    </TableCell>
                                    <TableCellCopy item={approvedBy} />
                                    <TableCell
                                        className="w-1/12 relative hover:bg-red-300 active:bg-red-300 transition-all duration-200 cursor-hover"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`${_id}/delete`, {
                                                state: { name },
                                            });
                                        }}
                                    >
                                        <MdDelete className="fill-red-600 hover:fill-red-700 active:fill-red-700 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 active:scale-105 transition-all duration-200" />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                ) : (
                    <EmptyTable />
                )}
            </Table>
            <Outlet />
        </div>
    );
}
