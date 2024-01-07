import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.tsx";

import RootLayout from "./layouts/RootLayout.tsx";
import Login from "./pages/Login.tsx";
import Books from "./pages/Books.tsx";
import Book from "./pages/Book.tsx";
import BookUpdate from "./pages/BookUpdate.tsx";
import Inventory from "./pages/Inventory.tsx";
import InventoryUpdate from "./pages/InventoryUpdate.tsx";
import Members from "./pages/Members.tsx";
import MemberDelete from "./pages/MemberDelete.tsx";

import { getBooks } from "./loaders/getBooks.ts";
import { getBook } from "./loaders/getBook.ts";
import { getInventory } from "./loaders/getInventory.ts";
import { getMembers } from "./loaders/getMembers.ts";

import { createBook } from "./actions/newBook.ts";
import { updateBook } from "./actions/updateBook.ts";
import { updateInventory } from "./actions/updateInventory.ts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route
            index
            element={<Books />}
            loader={getBooks}
            action={createBook}
            />
            <Route path="/books/:id" element={<Book />} loader={getBook} />
            <Route
            path="/books/:id/update"
            element={<BookUpdate />}
            action={updateBook}
            />
            <Route 
            path="inventory" 
            element={<Inventory />} 
            loader={getInventory}
            >
                <Route 
                path="update/:id" 
                element={<InventoryUpdate />} 
                action={updateInventory}
                />
            </Route>
            <Route path="members" element={<Members />} loader={getMembers}>
                <Route path=":id/delete" element={<MemberDelete />} />
            </Route>
            <Route path="login" element={<Login />} 
            />
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);
