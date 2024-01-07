import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Member as MemberType } from "@/schemas";

import { useLocation, Link } from "react-router-dom";

export default function Member() {
    const { state } = useLocation() as { state: MemberType };
    const { _id, name, age, joinDate, approvedBy } = state;

    return (
        <AlertDialog open={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Member Info</AlertDialogTitle>
                </AlertDialogHeader>

                <div>
                    <p>{`${name}, ${age}, member since ${new Date(joinDate)
                        .toDateString()
                        .split(" ")
                        .splice(1)
                        .join(", ")}`}</p>
                </div>
                <div className="flex flex-row items-center justify-around">
                    {/* TODO: complete this after this two endpoint is completed */}
                    <Link to={`/borrow/${_id}`}>Borrow</Link>
                    <Link to={`/return/${_id}`}>Return</Link>
                </div>
                <AlertDialogFooter>
                    <AlertDialogDescription className="flex flex-row gap-2">
                        <p>Approved by: </p>
                        <p>{approvedBy}</p>
                    </AlertDialogDescription>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
