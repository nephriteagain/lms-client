import { NavLink, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../providers/AuthProvider";
import Button from "./Button";

// TODO: fix navlink className

const pages = [
    {
        name: "Books",
        link: "",
    },
    {
        name: "Inventory",
        link: "inventory",
    },
    {
        name: "Members",
        link: "members",
    },
    {
        name: "Borrows",
        link: "borrow",
    },
    {
        name: "Returns",
        link: "return"
    }
] as const;

export default function Navbar() {
    const { accessToken, logout } = useAuthContext();
    const navigate = useNavigate();

    function logoutUser() {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <div className="z-10 bg-slate-100 sticky top-0 left-0 px-4 py-2 w-full flex flex-row items-center gap-4 border-b shadow-md">
            {pages.map(({ name, link }) => {
                return (
                    <NavLink
                        key={link}
                        to={link}
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-2 font-semibold text-lg  border-black hover:border-black transition-all duration-150"
                                : "border-b-2 font-semibold text-lg  border-transparent hover:border-black transition-all duration-150"
                        }
                    >
                        {name}
                    </NavLink>
                );
            })}
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
