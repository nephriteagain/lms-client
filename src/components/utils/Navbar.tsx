import { NavLink, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../providers/AuthProvider";
import Button from "./Button";

// TODO: fix navlink className
export default function Navbar() {
    const { accessToken, logout } = useAuthContext();
    const navigate = useNavigate();

    function logoutUser() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className="px-4 py-2 w-full flex flex-row items-center gap-4 border-b shadow-md">
            <NavLink
                to={""}
                className={({ isActive }) =>
                    isActive
                        ? "border-b-2 font-semibold text-lg  border-transparent hover:border-black transition-all duration-150"
                        : "border-b font-semibold text-lg  border-black hover:border-black transition-all duration-150"
                }
            >
                Books
            </NavLink>
            {!!accessToken && (
                <Button
                    className="ms-auto bg-red-300 hover:bg-red-400 rounded-md hover:rounded-lg shadow-md hover:shadow-lg px-2 py-1 transition-all duration-150"
                    onClick={logoutUser}
                >
                    logout
                </Button>
            )}
        </div>
    );
}
