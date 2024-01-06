import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import Button from "../utils/Button";

// TODO: make caching for searches
export default function SearchBar() {
    const [searchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string>("title");

    const navigate = useNavigate();

    function searchBooks(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            if (!searchVal) {
                navigate("/");
            }
            navigate(`/?${selected}=${searchVal}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form
                onSubmit={searchBooks}
                className="flex flex-row justify-center gap-3"
            >
                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.currentTarget.value)}
                    className="bg-gray-200 px-2 py-1 text-sm rounded-md shadow-md"
                />
                <Button
                    className="bg-green-300 px-2 rounded-md shadow-md hover:scale-105 hover:bg-green-400 active:bg-green-400 transition-all duration-200"
                    type="submit"
                    disabled={loading}
                    loading={loading}
                >
                    <IoSearchSharp />
                </Button>
                <select
                    defaultValue={selected}
                    onChange={(e) => setSelected(e.currentTarget.value)}
                    className="bg-gray-300 text-sm px-1 rounded-md shadow-md"
                >
                    <option value="title">TITLE</option>
                    <option value="authors">AUTHOR</option>
                </select>
            </form>
        </div>
    );
}
