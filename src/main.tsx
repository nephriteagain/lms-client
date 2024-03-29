import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
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
import BookNew from "./pages/BookNew.tsx";
import BookUpdate from "./pages/BookUpdate.tsx";
import Inventory from "./pages/Inventory.tsx";
import InventoryUpdate from "./pages/InventoryUpdate.tsx";
import Members from "./pages/Members.tsx";
import MemberDelete from "./pages/MemberDelete.tsx";
import MemberCreate from "./pages/MemberCreate.tsx";
import Borrows from "./pages/Borrows.tsx";
import BorrowNew from "./pages/BorrowNew.tsx";
import Returns from "./pages/Returns.tsx";
import Member from "./pages/Member.tsx";
import Penalty from "./pages/Penalty.tsx";
import Error from "./components/utils/Error.tsx";
import BorrowReturn from "./pages/BorrowReturn.tsx";
import Register from "./pages/Register.tsx";

import { getBooks } from "./loaders/books/books.ts";
import { getBook } from "./loaders/books/book.ts";
import { getInventory } from "./loaders/inventory/inventory.ts";
import { getInventoryItem } from "./loaders/inventory/inventoryItem.ts";
import { getMembers } from "./loaders/members/members.ts";
import { getBorrows } from "./loaders/borrow/borrows.ts";
import { getReturns } from "./loaders/return/returns.ts";

import { newBook } from "./actions/newBook.ts";
import { updateBook } from "./actions/updateBook.ts";
import { updateInventory } from "./actions/updateInventory.ts";
import { createMember } from "./actions/newMember.ts";
import { getPenalties } from "./loaders/penalty/penalties.ts";
import { deleteMember } from "./actions/deleteMember.ts";
import { getMember } from "./loaders/members/member.ts";
import { newBorrow } from "./actions/newBorrow.ts";
import { newReturn } from "./actions/newReturn.ts";
import { getBorrow } from "./loaders/borrow/borrow.ts";
import { registerAction } from "./actions/register.ts";

/**
 * global axios config
 */
axios.defaults.withCredentials = true;

const router = createBrowserRouter(
    // TODO: handle each route error independently
    createRoutesFromElements(
        <Route path="" element={<RootLayout />} errorElement={<Error />}>
            <Route path="books" element={<Books />} loader={getBooks}>
                <Route path="new" element={<BookNew />} action={newBook} />
                <Route
                    path=":id/update"
                    element={<BookUpdate />}
                    loader={getBook}
                    action={updateBook}
                />
                <Route path=":id" element={<Book />} loader={getBook} />
            </Route>

            <Route
                path="inventory"
                element={<Inventory />}
                loader={getInventory}
            >
                <Route path="new" element={<BookNew />} action={newBook} />
                <Route
                    path="update/:id"
                    element={<InventoryUpdate />}
                    loader={getInventoryItem}
                    action={updateInventory}
                />
            </Route>
            <Route path="members" element={<Members />} loader={getMembers}>
                <Route
                    path=":id/delete"
                    element={<MemberDelete />}
                    action={deleteMember}
                />
                <Route
                    path="new"
                    element={<MemberCreate />}
                    action={createMember}
                />
                <Route path=":id" element={<Member />} loader={getMember} />
            </Route>
            <Route path="borrow" element={<Borrows />} loader={getBorrows}>
                <Route path="new" element={<BorrowNew />} action={newBorrow} />
                <Route
                    path="return/:id"
                    element={<BorrowReturn />}
                    loader={getBorrow}
                    action={newReturn}
                />
            </Route>
            <Route path="return" element={<Returns />} loader={getReturns} />
            <Route path="penalty" element={<Penalty />} loader={getPenalties} />
            <Route path="login" element={<Login />} />
            <Route
                path="register"
                element={<Register />}
                action={registerAction}
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
