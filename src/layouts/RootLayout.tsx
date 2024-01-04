import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";
import Navbar from "../components/utils/Navbar";

export default function RootLayout() {

    const { accessToken } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken) {
            navigate('/login', {replace: true})
        }
    }, [])


    return (
        <div className="w-screen h-screen flex flex-col">
                <Navbar />
                <Outlet />
        </div>
        
    )
}