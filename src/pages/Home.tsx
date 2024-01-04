import { useLoaderData } from "react-router-dom"
import { Book } from "../types"

export default function Home() {
    const books = useLoaderData() as Awaited<Book[]>

    return (
        <div>
            <table>
                <thead>
                    <th className="border-2 border-black">title</th>                
                    <th className="border-2 border-black">author</th>
                    <th className="border-2 border-black">year published</th>                
                    <th className="border-2 border-black">date added</th>                
                </thead>
                <tbody>
                    {books.map(({_id, title, author, yearPublished, dateAdded}) => {
                        return (
                            <tr>
                                <td className="border border-black" >{title}</td>
                                <td className="border border-black" >{author}</td>
                                <td className="border border-black" >{yearPublished}</td>
                                <td className="border border-black" >{new Date(dateAdded).toDateString().split(' ').splice(1).join(' ')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}