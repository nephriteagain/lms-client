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

import { getBooks } from "./loaders/getBooks.ts";
import { getBook } from "./loaders/getBook.ts";

import { createBook } from "./actions/newBook.ts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Books />} loader={getBooks} action={createBook} />
            <Route path="/books/:id" element={<Book />} loader={getBook} />            
            <Route path="/books/:id/update" element={<BookUpdate />} />
            <Route path="login" element={<Login />} />
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
