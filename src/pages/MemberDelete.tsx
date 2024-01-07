import { dev } from "@/constants";
import { Link, useLocation } from "react-router-dom";

export default function MemberDelete() {
    const {state} = useLocation()
    dev.log(state)

    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <Link to='..' className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[95%] xs:w-[500px] bg-slate-200">
                {JSON.stringify(state)}
            </div>
        </div>
    )
}