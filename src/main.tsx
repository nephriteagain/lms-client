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
import Home from "./pages/Home.tsx";
import Book from "./pages/Book.tsx";

import { getBooks } from "./loaders/getBooks.ts";
import { createBook } from "./actions/newBook.ts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} loader={getBooks} action={createBook} />
            <Route path="/books/:id" element={<Book />} />
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
