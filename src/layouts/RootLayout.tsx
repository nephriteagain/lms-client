import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="w-screen h-screen flex flex-col">
                <nav>nav here</nav>
                <Outlet />
        </div>
        
    )
}