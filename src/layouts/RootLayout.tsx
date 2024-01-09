import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";
import Navbar from "../components/utils/Navbar";

export default function RootLayout() {
    // TODO: auto login using cookies
    const { userData } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate("/login", { replace: true });
        }
    }, [userData]);

    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <Navbar />
            <div className="px-12 py-6">
                <Outlet />
            </div>
        </div>
    );
}
