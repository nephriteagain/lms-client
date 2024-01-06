import { useLoaderData } from "react-router-dom"

export default function Book() {
    const bookData = useLoaderData()
    
    console.log(bookData)

    return (
        <div>
            book page
        </div>
    )
}