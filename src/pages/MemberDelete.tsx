import { Link, useNavigate, useLocation, useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MemberDelete() {
    const [disableBtn, setDisableBtn] = useState(true);
    const [seconds, setSeconds] = useState(3);
    const { state } = useLocation();
    const { name } = state as { name: string };
    const navigate = useNavigate();
    const fetcher = useFetcher();

    useEffect(() => {
        if (seconds === 0) {
            setDisableBtn(false);
            return;
        }
        const timeout = setTimeout(() => {
            setSeconds((s) => s - 1);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [seconds]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <AlertDialog open={true}>
                <AlertDialogContent className="bg-slate-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the user data from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <fetcher.Form method="delete" action="">
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => navigate("..")}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                disabled={
                                    disableBtn || fetcher.state === "submitting"
                                }
                                className="bg-red-600 hover:bg-red-700 transition-all"
                                type="submit"
                            >
                                {disableBtn
                                    ? `Disabled for ${seconds} ${
                                          seconds === 0 ? "second" : "seconds"
                                      }`
                                    : `Delete ${name}`}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </fetcher.Form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
