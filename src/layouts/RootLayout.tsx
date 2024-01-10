import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";
import Navbar from "../components/utils/Navbar";

export default function RootLayout() {
    // TODO: auto login using cookies
    const path = useLocation().pathname
    const { userData } = useAuthContext();
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!userData) {
            navigate("/login", { replace: true });
            return;
        }
        if (path.startsWith('/login')) {
            navigate("/books", { replace: true })
        }
    }, [userData]);

    // TODO: create an actual home page
    useEffect(() => {
        if (path === '/') {
            navigate('/books', { replace: true })
        }
    }, [path])


    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <Navbar />
            <div className="px-12 py-6">
                <Outlet />
            </div>
        </div>
    );
}
