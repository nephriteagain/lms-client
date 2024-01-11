import { dev } from "@/constants";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function Error() {
    const error = useRouteError();

    useEffect(() => {
        dev.log(error);
    }, [error]);

    return (
        <div className="bg-slate-100 text-2xl flex flex-col items-center justify-center gap-2 w-screen h-screen absolute top-0 left-0">
            <h1>Something went wrong...</h1>
            <Link to="/" reloadDocument className="border-b-2 border-blue-600">
                Reload
            </Link>
        </div>
    );
}
